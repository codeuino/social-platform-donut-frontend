export default {
  Authenticate: function (self) {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
