const validator=require('validator')

const validateSignup=(req)=>{
  const {firstName,lastName,email,password,age}=req.body

  if(!firstName || !lastName) throw new Error("Enter valid name")
  else if(!validator.isEmail(email)) throw new Error("Enter valid Email")
  else if(!validator.isStrongPassword(password)) throw new Error("Enter strong password")
else if(age<18) throw new Error("Your age is less than 18")
}

module.exports={
    validateSignup
}