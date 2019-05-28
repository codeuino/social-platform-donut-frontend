
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
  isAgeBetween: (age, lower, upper) => {
    if (lower <= age && age <= upper) {
      return true
    } else {
      return false
    }
  },
  isAddressUnderLimit: (addr, max) => {
    if (length(addr) > max) {
      return false
    } else {
      return true
    }
  }
}
