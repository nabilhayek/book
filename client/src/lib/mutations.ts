import { gql } from "@apollo/client";

const CREATE_USER = gql`
mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
        id
    }
}
`

const LOGIN_USER = gql`mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      refresh_token
      access_token
      user {
        email
        id
        name
      }
    }
  }`

const REMOVE_USER = gql`mutation RemoveUser($removeUserId: String!) {
  removeUser(id: $removeUserId) {
    email
    id
    name
    password
  }
}`

const REFRESH_ACCESS_TOKEN = gql`mutation Refresh($refreshInput: RefreshInput!) {
  refresh(refreshInput: $refreshInput) {
    access_token
  }
}`

export {CREATE_USER, LOGIN_USER, REMOVE_USER, REFRESH_ACCESS_TOKEN};