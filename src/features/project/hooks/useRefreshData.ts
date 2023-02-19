import { useEffect, useState } from "react";

export const useRefreshData = <T>(
  promise: Promise<T>,
  timeIntervalInSecond: number
): { data: T; lastUpdated: string } => {
  const today = new Date();
  const [data, setData] = useState<T>(null as T);
  const [lastUpdated, setLastUpdated] = useState<string>(today.toString());

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await promise;
      setData(response);
      setLastUpdated(today.toString());
    }, timeIntervalInSecond * 1000);

    console.log("check");

    return () => clearInterval(interval);
  }, [promise]);

  return { data, lastUpdated };
};
