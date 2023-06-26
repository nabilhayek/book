
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class LoginInput {
    username: string;
    password: string;
}

export class RefreshInput {
    userId: string;
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
    roles?: Nullable<Nullable<Role>[]>;
    refresh_token?: Nullable<string>;
}

export class UpdateUserInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    roles?: Nullable<Nullable<Role>[]>;
    refresh_token?: Nullable<string>;
}

export class FindOneUserInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
}

export class UserLoginResponse {
    id: string;
    name: string;
    email: string;
    refresh_token?: Nullable<string>;
}

export class LoginResponse {
    access_token: string;
    refresh_token: string;
    user: UserLoginResponse;
}

export class RefreshResponse {
    access_token: string;
}

export class ValidateTokenResponse {
    valid: boolean;
}

export abstract class IMutation {
    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract refresh(refreshInput: RefreshInput): RefreshResponse | Promise<RefreshResponse>;

    abstract validateToken(token: string): ValidateTokenResponse | Promise<ValidateTokenResponse>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    roles: Nullable<Role>[];
    refresh_token?: Nullable<string>;
}

export class UserWithoutSensitiveData {
    id: string;
    name: string;
    email: string;
}

export abstract class IQuery {
    abstract users(limit?: Nullable<number>): Nullable<UserWithoutSensitiveData>[] | Promise<Nullable<UserWithoutSensitiveData>[]>;

    abstract user(findOneUserInput?: Nullable<FindOneUserInput>): Nullable<UserWithoutSensitiveData> | Promise<Nullable<UserWithoutSensitiveData>>;
}

type Nullable<T> = T | null;