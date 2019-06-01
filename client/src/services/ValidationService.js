
export default {
  isValidEmail: (email) => {
    email = email.trim()
    // eslint-disable-next-line no-useless-escape
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    } else {
      return false
    }
  },
  isSamePassword: (first, second) => {
    first = first.trim()
    second = second.trim()
    if (first === second) {
      return true
    } else {
      return false
    }
  },
  isAgeBetween: (age, lower, upper) => lower <= age && age <= upper
  ,
  isAddressUnderLimit: (addr, max) => addr.length() < max
}
