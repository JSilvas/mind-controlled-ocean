import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';

import { Notion } from '@neurosity/notion';

export function App() {
  const [notion, setNotion] = useState(null);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useLocalStorage("deviceId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deviceId) {
      const notion = new Notion({ deviceId }); // 😲
      setNotion(notion);
    } else {
      setLoading(false);
    }
  }, [deviceId]);


  useEffect(() => {
    if (!notion) {
      return;
    }
  
    const subscription = notion.onAuthStateChanged().subscribe(user => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
      setLoading(false);
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, [notion]);
  

  return (
    <Router>
      <Login
        path="/"
        notion={notion}
        user={user}
        setUser={setUser}
        setDeviceId={setDeviceId}
      />
      <Logout path="/logout" notion={notion} resetState={() => {
        setNotion(null);
        setUser(null);
        setDeviceId("");
      }} />
    </Router>
  );
}

export default App;
