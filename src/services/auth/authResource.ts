import http from '@/utils/http'

export const initiate = () => {
  return http
    .post('/auth/initiate', {
      callbackUrl: 'http://localhost:3000/api/auth/callback',
    })
    .then(({ data }) => data)
}

export const getUserData = () => {
  return http.get('/auth/me').then(({ data }) => data)
}

export const signout = () => {
  return http.post('/auth/logout').then(({ data }) => data)
}
