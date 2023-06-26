import { gql } from "@apollo/client"

const GET_ALL_USERS = gql`query Users {
    users {
      email
      id
      name
    }
  }`

const GET_USER = gql`query Users($findOneUserInput: FindOneUserInput) {
  user(findOneUserInput: $findOneUserInput) {
    email
    id
    name
  }
}
`

const VALIDATE_TOKEN = gql`mutation ValidateToken($token: String!) {
  validateToken(token: $token) {
    valid
  }
}
`


export { GET_ALL_USERS, GET_USER, VALIDATE_TOKEN }