import { jwtDecode } from 'jwt-decode'

export function isTokenExpired (token) {
  return jwtDecode(token).exp < Date.now() / 1000
}