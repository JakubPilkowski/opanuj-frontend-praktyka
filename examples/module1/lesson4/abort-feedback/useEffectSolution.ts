import { useEffect, useState } from 'react';

import { API_URL } from './API_URL';

import UserData from './UserData';

export default function useEffectSolution() {
  const [userData, setUserData] = useState<UserData>({
    users: [],
    isLoading: true,
    error: null,
  });

  const { isLoading, error, users } = userData;

  // FETCHING state logic
  useEffect(() => {
    if (!isLoading) {
      return;
    }

    let messageController: NodeJS.Timeout | null = null;
    let fetchController = new AbortController();

    const fetchPromise = fetch(API_URL, { signal: fetchController.signal })
      .then((res) => {
        if (!res.ok) {
          setUserData({ users: [], isLoading: false, error: 'error' });
          return;
        }
        return res.json();
      })
      .then(({ users }) => {
        setUserData({ users, isLoading: false, error: null });
      });

    const messagePromise = new Promise(() => {
      messageController = setTimeout(() => {
        setUserData({ users: [], isLoading: false, error: 'timeout' });
      }, 5000);
    });

    Promise.race([fetchPromise, messagePromise]);

    return () => {
      if (fetchController !== null) {
        fetchController.abort();
      }
      if (messageController) {
        clearTimeout(messageController);
      }
    };
  }, [isLoading]);

  const onRetry = () => {
    setUserData({ users: [], isLoading: true, error: null });
  };

  return {
    users,
    isLoading,
    error,
    retry: onRetry,
  };
}
