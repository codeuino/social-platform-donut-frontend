function validate() {
  const emailID = document.myForm.EMail.value;
  const atpos = emailID.indexOf('@');
  const dotpos = emailID.lastIndexOf('.');

  if (atpos < 1 || dotpos - atpos < 2) {
    alert('Please enter correct email ID');
    document.myForm.EMail.focus();
    return false;
  }
  const isChecked = document.getElementById('check').checked;
  if (!isChecked) {
    alert('Please accept the Code of Conduct to Sign Up');
    document.myForm.check.focus();
    return false;
  }
  const pass = document.getElementById('pass');
  const cpass = document.getElementById('cpass');
  if (pass != cpass) {
    alert('Password error. Retype Password.');
    return false;
  }
  return true;
}
