export const checkDeleteRights = (userId) => {
  const isAdmin = localStorage.getItem('admin');
  const userLoggedIn = JSON.stringify(localStorage.getItem('userId'))
  if(isAdmin === 'true' || userLoggedIn === JSON.stringify(userId)){
    return true
  }
  return false
}

export const checkRemoveRight = () => {
  const isAdmin = localStorage.getItem('admin')
  if(isAdmin === 'true'){
    return true
  }
  return false
}
