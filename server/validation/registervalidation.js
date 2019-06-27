const Validator=require('validator')
const isempty=require('./is-empty.js')
module.exports=function validateRegisterInput(data){
let error={};
data.fname=!isempty(data.fname)?data.fname:'';
data.lname=!isempty(data.lname)?data.lname:'';
data.email=!isempty(data.email)?data.email:'';
data.password=!isempty(data.password)?data.password:'';
data.dd=!isempty(data.dd)?data.dd:'';
data.mm=!isempty(data.mm)?data.mm:'';
data.yy=!isempty(data.yy)?data.yy:'';
data.username=!isempty(data.username)?data.username:'';


if(Validator.isEmpty(data.fname))
{
  error.fname="First Name is required";
}
else if(!Validator.isLength(data.fname,{min:2,max:30}))
{
  error.fname="Firt Name must be between 2 and 30 character"
}

if(Validator.isEmpty(data.lname))
{
  error.lname="Last Name is required";
}

else if(Validator.isEmpty(data.email))
{
  error.email="Email is required";
}
if(!Validator.isEmail(data.email))
{
  error.email="Invalid email"
}
if(!Validator.isLength(data.password,{min:6,max:30}))
{
  error.password="Password must be of 6 digit";
}

if(Validator.isEmpty(data.dd))
{
  error.dd="Date is required";
}
if(Validator.isEmpty(data.mm))
{
  error.mm="Month is required";
}
if(Validator.isEmpty(data.yy))
{
  error.yy="Year is required";
}
if(Validator.isEmpty(data.username))
{
  error.username="Username is required";
}


return{
  error,
  isValid:isempty(error)
}
}
