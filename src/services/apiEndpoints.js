const endpoints = {
  // Auth
  auth: {
    login: 'auth/token',
    refreshToken: 'auth/refreshtoken',
    resetPassword: 'auth/password',
    requestPasswordReset: 'auth/password/request',
  },
  investees: {
    _: 'investees',
    id: (id) => `investees/${id}`,
  }
}

export default endpoints