import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileBadge() {
  const { umpire } = useAuth();
  return (
    <div className="profile-badge">
      <div>
        <img
          src={`${window.location.origin}/assets/avatars/${umpire.profilePicUrl}`}
          alt="profile-image"
        />
      </div>
      <p>{umpire.umpireName}</p>
    </div>
  );
}