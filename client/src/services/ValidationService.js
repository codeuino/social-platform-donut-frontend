
export default {
  isValidEmail: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())),
  isSamePassword: (first, second) => first.trim() === second.trim(),
  isAgeBetween: (age, lower, upper) => lower <= age && age <= upper
  ,
  isAddressUnderLimit: (addr, max) => addr.length() < max
}
