import { Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
// import { client, getAccount, getCurrentUser } from "./appwrite";

interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
  databaseId?: string;
  collectionId?: string;
  userId?: string;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
  databaseId,
  collectionId,
  userId,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);
  // const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         setCurrentUserId(res.accountId);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams: P) => await fetchData(newParams);

  // useEffect(() => {
  //   if (!currentUserId || currentUserId !== userId) return;

  //   console.log("Subscribing to Appwrite for user:", currentUserId);

  //   // Subscribe to Appwrite real-time updates
  //   const unsubscribe = client.subscribe(
  //     `databases.${databaseId}.collections.${collectionId}.documents`,
  //     (response) => {
  //       console.log("Appwrite real-time update:", response);
  //       refetch(params); // Auto-refetch for the current user
  //     }
  //   );

  //   // Cleanup function to unsubscribe when component unmounts
  //   return () => {
  //     if (unsubscribe) {
  //     console.log("Unsubscribing from Appwrite");
  //     unsubscribe(); // Properly close the stream
  //   }
  //   };
  // }, [currentUserId, userId, databaseId, collectionId, refetch]);

  return { data, loading, error, refetch };
};
