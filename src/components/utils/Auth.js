const Auth = {
  isAuthenticated: false,
  authenticate: async function() {
    const token = localStorage.getItem('token')
    const result = await fetch(`http://localhost:3001/api/secret`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      })
    this.isAuthenticated = result.status === 200 ? true : false
    return await Promise.resolve(this.isAuthenticated)
  },
  signout: function() {
    localStorage.removeItem('token')
    this.isAuthenticated = false
  }
}

export default Auth
