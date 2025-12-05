import * as authResource from '@/services/auth/authResource'

export const initiate = () => {
  return authResource.initiate()
}

export const getUserData = () => {
  return authResource.getUserData()
}

export const signout = () => {
  return authResource.signout()
}
