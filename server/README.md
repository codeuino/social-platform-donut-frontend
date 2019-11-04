## Server Side
**Installation:**

 1. Make Sure you have mongodb install in your system.
 2. Create a credential.js and add it to config folder(you will find config folder in the server folder), with structure like this.
<code> 
module.exports =  {
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
clientID: 'FB Client ID',
clientSecret: 'FB Client Secret'
},
VAPID_KEYS  :  {
Public:  "Vapid Keys",
Private:  "Vapid Keys"
}}</code>


note : generate vapid keys following this  link https://pusher.com/tutorials/push-notifications-node-service-workers

Add db url in this format  
 db:'mongodb://localhost/donut'

3.Write <code>npm install</code> in terminal in server directory, to install node modules.
4. Write <code>npm start</code>, to start server on PORT 3000.
5. Now Go to README.md file in the client folder.


