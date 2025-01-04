import UserModel from '../models/user.js';
import bcrypt from 'bcryptjs';
async function registerUser(req, res) {
    try {
        const {username, email, password} = req.body;
        const profileUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const checkEmail = await UserModel.findOne({email});
        console.log(checkEmail);
        
        if(checkEmail){
            return res.status(400).json({message: 'Email already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const payLoad = {
            username,
            email,
            profileUrl,
            password: hashedPassword,
        }

        const user = new UserModel(payLoad);
        console.log(user);
        
        const savedUser = await user.save();

        res.status(201).json({
            message: 'User registered successfully',
             data: savedUser,
             success: true
            });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export default registerUser;