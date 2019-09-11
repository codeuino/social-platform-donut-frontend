## Server Side
**Installation:**

 1. Make Sure you have mongodb install in your system.
 2. Create a credential.js and add it to config folder, with structure like this.
<code>module.exports =  {
secret:'secret_key',
oauth:  {
clientID:  "GOOGLE SECRET Client ID",
clientSecret:  "google client secret"
},
db:  'DB URL',
github:  {
clientID:  'Github Client ID',
clientSecret:  'Github Client Secret'
},
facebook:  {
clientID:  'FB Client ID',
clientSecret:  'FB Client Secret'
},
VAPID_KEYS  :  {
Public:  "Vapid Keys",
Private:  "Vapid Keys"
}}</code>

3.Write <code>npm install</code> , to install node modules.
4. Write <code>npm run dev</code>, to start server on PORT 3000.


