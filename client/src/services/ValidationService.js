export default {
  // eslint-disable-next-line
  isValidEmail: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())),
  isSamePassword: (first, second) => first.trim() === second.trim(),
  isAgeBetween: (age, lower, upper) => lower <= age && age <= upper,
  isTextUnderLimit: (text, max) => text.length <= max,
  // eslint-disable-next-line
  isValidText: (text) => (/[1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(text.trim()))
}
