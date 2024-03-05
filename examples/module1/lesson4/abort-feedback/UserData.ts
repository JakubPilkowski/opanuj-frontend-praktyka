type UserData =
  | {
      users: User[];
      isLoading: false;
      error: null;
    }
  | { users: []; isLoading: true; error: null }
  | { error: 'timeout' | 'error'; isLoading: false; users: [] };

export default UserData;
