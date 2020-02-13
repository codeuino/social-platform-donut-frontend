import axios from "axios";

export const loginIn = body => {
  return axios.post("http://donut-api-prod.codeuino.org/auth/login", {
    email: body.email,
    password: body.password
  });
};

export const decodeResponse = response => {
  const parts = response.split(".");
  if (parts.length !== 3) {
    throw new Error(
      "Auth token must have 3 parts; " + parts.length + " provided."
    );
  }
  return {
    header: JSON.parse(_base64UrlDecode(parts[0])),
    payload: JSON.parse(_base64UrlDecode(parts[1])),
    signature: _base64UrlDecode(parts[2])
  };
};

function _base64UrlDecode(base64UrlString) {
  var base64String = base64UrlString
    .replace(/-/g, "+") // replace character 62
    .replace(/_/g, "/"); // replace character 63

  switch (base64String.length % 4) {
    case 0: {
      break;
    }
    case 2: {
      base64String += "==";
      break;
    }
    case 3: {
      base64String += "=";
      break;
    }
    default: {
      throw new Error("Illegal base64url string.");
    }
  }

  return window.atob(base64String);
}
