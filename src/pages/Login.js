import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";

export function Login({ notion, user, setUser, setDeviceId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function onLogin({ email, password, deviceId }) {
    if (email && password && deviceId) {
      setError("");
      setEmail(email);
      setPassword(password);
      setDeviceId(deviceId);
    } else {
      setError("Please fill the form");
    }
  }

  return (
    <LoginForm
      onLogin={onLogin}
      loading={isLoggingIn}
      error={error}
    />
  );
}