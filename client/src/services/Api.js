const path = require('path')
export default {
  Api: (url, body, method, params) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const dataBody = JSON.stringify(body)
    if (!params.isEmpty()) {
      headers[Object.keys(params)[0]] = params[Object.keys(params)[0]]
    }
    console.log(params)
    return fetch(path.join('http://localhost:3000', url),
      {
        method: method,
        headers: headers,
        body: dataBody
      }
    )
  }
}
