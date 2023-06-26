import { useMutation, useQuery, QueryResult } from "@apollo/client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  GET_ALL_USERS,
  GET_USER,
} from "@/lib/queries";
import {
    LOGIN_USER,
  CREATE_USER,
  REMOVE_USER,
} from "@/lib/mutations";
import { GetAllUsersResult, LoginResult, QueryUserInput, UserWithoutSensitiveData } from "@/types";



// Custom hook for login functionality
const useLogin = (): {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error?: Error;
} => {
  const [loginUser, { data, loading, error }] =
    useMutation<LoginResult>(LOGIN_USER);

  const login = async (email: string, password: string): Promise<void> => {
    const { data } = await loginUser({
      variables: {
        loginInput: {
          username: email,
          password,
        },
      },
    });

    if (data && !error) {
      Cookies.set("currentUser", JSON.stringify(data.login));
    }
  };

  return { login, loading, error };
};

// Custom hook for retrieving the current user
const useCurrentUser = (): { user: UserWithoutSensitiveData | null } => {
  const [user, setUser] = useState<UserWithoutSensitiveData | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser).user);
    }
  }, []);

  return { user };
};

// Custom hook for retrieving a specific user
const useUser = (
  uuid: string
): QueryResult<{ user: UserWithoutSensitiveData }, QueryUserInput> => {
  return useQuery<{ user: any }, QueryUserInput>(GET_USER, {
    variables: {
      findOneUserInput: {
        id: uuid,
      },
    },
  });
};

// Custom hook for retrieving all users
const useGetAllUsers = (): QueryResult<GetAllUsersResult> => {
  return useQuery<GetAllUsersResult>(GET_ALL_USERS);
};

// Custom hook for user registration
const useRegister = (): {
  register: (email: string, name: string, password: string) => Promise<void>;
  loading: boolean;
  error?: Error;
} => {
  const [registerUser, { data, loading, error }] =
    useMutation<unknown>(CREATE_USER);

  const register = async (
    email: string,
    name: string,
    password: string
  ): Promise<void> => {
    await registerUser({
      variables: {
        createUserInput: {
          email,
          name,
          password,
        },
      },
    });
  };

  return { register, loading, error };
};

// Custom hook for retrieving all users
const useAllUsers = (): QueryResult<GetAllUsersResult> => {
  return useQuery<GetAllUsersResult>(GET_ALL_USERS);
};

// Custom hook for removing a user
const useRemoveUser = (): {
  remove: (id: string) => Promise<void>;
  loading: boolean;
  error?: Error;
} => {
  const [removeUser, { data, loading, error }] =
    useMutation<unknown>(REMOVE_USER);

  const remove = async (id: string): Promise<void> => {
    await removeUser({
      variables: {
        removeUserId: id,
      },
    });
  };

  return { remove, loading, error };
};

export {
  useLogin,
  useCurrentUser,
  useRegister,
  useAllUsers,
  useRemoveUser,
  useUser,
  useGetAllUsers,
};
