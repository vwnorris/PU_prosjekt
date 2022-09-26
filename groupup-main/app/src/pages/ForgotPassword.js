import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "./../utils/firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  /**
   * Tries to send password reset mail
   * @param {*} email the email that needs a passowrd reset
   */
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");

      // Navigate back to home
      navigate("/");
    } catch (err) {
      // Send the user an alert with the error
      console.error(err);
      alert(err.message);
    }
  };

  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // When component is mounted (loaded)
  useEffect(() => {
    if (loading) return;
    // If user is logged in, navigate to home
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
