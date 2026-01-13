import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setOnline(Boolean(state.isConnected));
    });
    return unsub;
  }, []);

  return online;
};
