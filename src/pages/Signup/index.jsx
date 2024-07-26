import React, { useState } from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { signup } from "../../services/auth";
import { useAuthUpdate } from "../../contexts/AuthContext";
import { profilePics } from "../../data/profilePics";
import ProfilePic from "./ProfilePic";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";

export default function Signup() {
  const [selectedProfilePic, setSelectedProfilePic] = useState("bee.png");
  const [umpireName, setUmpireName] = useState("");
  const [password, setPassword] = useState("");
  const signupFn = useAsyncFn(signup);
  const { login: loginLocally } = useAuthUpdate();
  const {addError} = useErrorPortalUpdate()

  function handleSubmit(e) {
    e.preventDefault();
    if (
      selectedProfilePic.trim().length === 0 ||
      umpireName.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return addError("All fields are required")
    }

    signupFn
      .execute({ profilePicUrl: selectedProfilePic, umpireName, password })
      .then((data) => loginLocally(data.umpire, data.token))
      .catch((message) => addError(message))
  }

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form className="input-box" onSubmit={handleSubmit}>
        <div className="profile-pics-container">
          {profilePics.map((profilePic) => {
            return (
              <ProfilePic
                key={profilePic}
                profilePic={profilePic}
                selectedProfilePic={selectedProfilePic}
                setSelectedProfilePic={setSelectedProfilePic}
              />
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Umpire name"
          value={umpireName}
          onChange={(e) => setUmpireName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={signupFn.loading}>submit</button>
      </form>
    </div>
  );
}
