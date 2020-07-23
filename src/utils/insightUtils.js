const initAuth = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  return window.gapi.auth2.init({
    client_id:
      "802671430978-i00tspvkpgf7bi91vgvjinba9kism1ac.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  });
};

export const checkSignedIn = () => {
  return new Promise((resolve, reject) => {
    initAuth()
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        resolve(auth.isSignedIn.get());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const onSuccess = (googleUser) => {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
  console.error(error);
};

export const renderButton = () => {
  window.gapi.signin2.render("signin-button", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

export const signOut = () => {
  window.gapi.auth2.getAuthInstance().signOut();
};
