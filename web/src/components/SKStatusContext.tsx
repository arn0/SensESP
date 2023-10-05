import { createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { app_config } from "app_config";

export const SKStatusContext = createContext({});

export const SKStatusProvider = ({children}) => {
  const [skStatus, setSKStatus] = useState({});

  const fetchStatus = async () => {
    try {
      const response = await fetch(app_config.signalk_path + "/status");
      if (!response.ok) {
        setSKStatus("disconnected");
        return;
      }
      const json = await response.json();
      setSKStatus(json);
    } catch (error) {
      setSKStatus({});
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <SKStatusContext.Provider value={skStatus}>
      {children}
    </SKStatusContext.Provider>
    </>
  );
}
