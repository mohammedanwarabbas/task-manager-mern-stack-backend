const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({"message": "User already exists"})

        //HashPassword
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        //createUser
        const user = new User({name,email,password:hashedPassword})
        await user.save();

        res.status(201).json({"message":"User registered sucessfully"})
    }
    catch(err){
        res.status(500).json({"message":err.message})
    }
}

// Login User// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found with this email" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Logged in successfully", token });

    } catch (err) {
        res.status(500).json({ message: `Error: ${err.message}` });
    }
};


// get user profile(protected)
const getUserProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    }
    catch(err){
        res.status(500).json({"message":"error : "+ err.message})
    }
}

module.exports = {registerUser, loginUser, getUserProfile}