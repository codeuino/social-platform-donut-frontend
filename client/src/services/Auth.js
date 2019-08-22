export default {
  Authenticate: function (self) {
    if (!self.$session.exists()) {
      self.$router.push('/login')
    }
  }
}
