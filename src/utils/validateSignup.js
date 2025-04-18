const validator=require('validator')

const validateSignup=(req)=>{
  const {firstName,lastName,email,password,age}=req.body

  if(!firstName || !lastName) throw new Error("Enter valid name")
  else if(!validator.isEmail(email)) throw new Error("Enter valid Email")
  else if(!validator.isStrongPassword(password)) throw new Error("Enter strong password")
else if(age<18) throw new Error("Your age is less than 18")
}

const validateEditProfileData=(req)=>{
   const allowedEditFields=["firstName","lastName","email","age","gender","photoUrl","about","skills"]
        
  const isEditAllowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field))

 return isEditAllowed

  }

module.exports={
    validateSignup,
    validateEditProfileData
}