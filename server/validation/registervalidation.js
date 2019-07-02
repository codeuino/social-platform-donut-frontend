const Validator=require('validator')
const isempty=require('./is-empty.js')
module.exports=function validateRegisterInput(data){
let error={};
data.name=!isempty(data.name)?data.name:'';
data.email=!isempty(data.email)?data.email:'';
data.pass=!isempty(data.pass)?data.pass:'';


if(Validator.isEmpty(data.name))
{
  error.name="Name is required";
}

else if(Validator.isEmpty(data.email))
{
  error.email="Email is required";
}
if(!Validator.isEmail(data.email))
{
  error.email="Invalid email"
}
if(!Validator.isLength(data.pass,{min:6,max:30}))
{
  error.pass="Password must be of 6 digit";
}

return{
  error,
  isValid:isempty(error)
}
}
