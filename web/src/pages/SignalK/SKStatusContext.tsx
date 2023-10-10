import { APP_CONFIG } from "config";
import { createContext, type JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

export const SKStatusContext = createContext<SKStatus>({
  connectionStatus: "unknown",
  numRxDeltas: 0,
  numTxDeltas: 0,
});

export interface SKStatus {
  connectionStatus: SKConnectionStatus;
  numRxDeltas: number;
  numTxDeltas: number;
}

export type SKConnectionStatus =
  | "connected"
  | "disconnected"
  | "connecting"
  | "unknown"
  | "unauthorized"
  | "error"
  | "authenticating"
  | "serverNotFound";

interface SKStatusProviderProps {
  children: React.ReactNode;
}

export function SKStatusProvider({
  children,
}: SKStatusProviderProps): JSX.Element {
  const [skStatus, setSKStatus] = useState<SKStatus>({
    connectionStatus: "unknown",
    numRxDeltas: 0,
    numTxDeltas: 0,
  });

  async function fetchStatus(): Promise<void> {
    try {
      const response = await fetch(`${APP_CONFIG.signalk_path}/status`);
      if (!response.ok) {
        setSKStatus({
          connectionStatus: "unknown",
          numRxDeltas: 0,
          numTxDeltas: 0,
        });
        return;
      }
      const json = await response.json();
      setSKStatus(json);
    } catch (error) {
      setSKStatus({
        connectionStatus: "serverNotFound",
        numRxDeltas: 0,
        numTxDeltas: 0,
      });
    }
  }

  useEffect(() => {
    void fetchStatus();
    const interval = setInterval(() => {
      void fetchStatus();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <SKStatusContext.Provider value={skStatus}>
        {children}
      </SKStatusContext.Provider>
    </>
  );
}
