const Validator=require('validator')
const isempty=require('./is-empty.js')
module.exports=function validateRegisterInput(data){
let error={};
data.name=!isempty(data.name)?data.name:'';
data.email=!isempty(data.email)?data.email:'';
data.password=!isempty(data.password)?data.password:'';


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

if(Validator.isEmpty(data.type))
{
  error.type = 'Type is required'
}

if(Validator.isEmpty(data.pass)) {
  error.password = 'Password is required'
}

return{
  error,
  isValid:isempty(error)
}
}
