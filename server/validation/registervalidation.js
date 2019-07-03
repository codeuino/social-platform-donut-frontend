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


return{
  error,
  isValid:isempty(error)
}
}
