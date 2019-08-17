export default {
  Authenticate: function (self) {
    console.log(self)
    if (!self.$session.exists()) {
      self.$router.push('/login')
    }
  }
}
