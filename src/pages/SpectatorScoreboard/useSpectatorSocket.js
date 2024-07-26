import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useScoreboardUpdate } from "../../contexts/ScoreboardContext";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";

export default function useSpectatorSocket() {
  const [socket, setSocket] = useState(null);
  const { matchId } = useParams();
  const { pushDelivery: pushDeliveryLocally, popDelivery: popDeliveryLocally } =
    useScoreboardUpdate();
  const { addError } = useErrorPortalUpdate();

  useEffect(() => {
    let newSocket = io(
      `${import.meta.env.VITE_SOCKET_SERVER_BASE_URL}/spectator`,
      {
        query: { matchId },
      }
    );
    setSocket(newSocket);
    console.log("Spectator socket connected");

    function handleOversUpdated({ action, position, delivery }) {
      if (action === "push") {
        pushDeliveryLocally(delivery, position);
      } else if (action === "pop") {
        popDeliveryLocally(position);
      } else {
        addError("Incorrect action. Disconnecting socket");
        newSocket.disconnect();
      }
    };

    function handleConnectError(err) {
      addError(err.message);
      console.log("Disconnecting socket");
      newSocket.disconnect();
    };

    function handleUmpireDisconnected() {
      addError("Umpire disconnected. Disconnecting socket");
      newSocket.disconnect();
    };

    newSocket.on("overs-updated", handleOversUpdated);
    newSocket.on("connect_error", handleConnectError);
    newSocket.on("umpire-disconnected", handleUmpireDisconnected);

    return () => {
      if (newSocket) {
        console.log("Closing spectator socket");
        newSocket.off("overs-updated", handleOversUpdated);
        newSocket.off("connect_error", handleConnectError);
        newSocket.off("umpire-disconnected", handleUmpireDisconnected);
        newSocket.close();
      }
      setSocket(null);
    };
  }, [matchId]);
}
