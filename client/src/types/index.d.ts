interface UserType {
    id: string
    name: string
    email: string
    accessToken: string
    refreshToken: string
  };

interface UserContextType {
    state: UserType | null
    dispatch: React.Dispatch<any>
};

interface UserWithoutSensitiveData {
    id: string
    name: string
    email: string
  };

  interface LoginResult {
    login: any; // Modify 'any' with the appropriate type for the login response
  }

  
  interface QueryUserInput {
    findOneUserInput: {
      id: string;
    };
  }
  
  interface GetAllUsersResult {
    users: User[]; // Modify 'User[]' with the appropriate type for the users response
  }

export type {UserType, UserContextType, UserWithoutSensitiveData, LoginResult, QueryUserInput, GetAllUsersResult}