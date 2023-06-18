const bcrypt = require('bcrypt-inzi')
const jwt = require('../middlewear/jwtMiddleware')
const User = require('../Model/User')


const authController = {
    async signup (req,res){
        try{
            const {name,email,password} = req.body;
            if (!name||!email||!password){
              return res.status(400).json({message:"all fields required"})
            }
            // Check if the user already exists
            const exitingUser = await User.findOne({email});
            if (exitingUser)
            {
                return res.status(400).json({message:"email already exist"})
            }
              // Hash the password
              const hashPaswd = await bcrypt.stringToHash(password,10)
              //create user
              const newUser = new User({
                name,
                email,
                password:hashPaswd
              })
              await newUser.save()
             
              const token = jwt.sign(req.body)
              return res.json({token})
        }
        catch(error){
                res.status(500).json({message:"internal server error",error:error.message})
        }
        
    },
    async getUser(req,res){
      const users = await User.find();
      // const transformedUsers = users.map(user => user.toJSON());
      
      return res.status(200).json(users);
    },
  
    
    async deleteUserByEmail (req, res){
      try {
        const {email} = req.body;
        const user = await userModel.findOneAndRemove({email});
        if (!user){
          return res.status(400).json({message: "No User Found with Email You Provide."});
        }
        return res.status(200).json({message: "User Successfully Deleted", user});
      }
      catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Deleting User by Email" : error});
      }
    },

    async updateUserByEmail(req, res){
      try {
          const {name, email, password} = req.body;
          const user = await userModel.findOneAndUpdate({email}, {name,password});
          if (!user){
              return res.status(400).json({message: "No User Found with Email You Provide."});
          }
          const updatedUser = await userModel.findOne({email});
          return res.status(200).json({message: "User Successfully Updated", updatedUser});
      }
      catch(error){
          const isEmpty = Object.keys(error).length === 0;
          return res.status(400).json({message: isEmpty ? "Error Occur while Updating User by Email" : error});
      }
  },
    

    async deleteUserById(req, res){
      try {
          const id = req.params.id;
          const user = await userModel.findByIdAndRemove(id);
          if (!user){
              return res.status(400).json({message: "No User Found with ID You Provide."});
          }
          return res.status(200).json({message: "User Successfully Deleted", user});
      }
      catch(error){
          const isEmpty = Object.keys(error).length === 0;
          return res.status(400).json({message: isEmpty ? "Error Occur while Deleting User by ID" : error});
      }
  }

  }
module.exports = authController