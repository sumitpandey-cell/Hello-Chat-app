import UserModel from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const checkEmailAndPassword = async(req, res) => {
    
    try {
        const {email, password} = req.body;
        
        const user = await UserModel.findOne({email})
        
        
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword){
            console.log('Invalid email or password');
            
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const payLoad = {
            _id: user._id,
            email: user.email
        }
        const token = jwt.sign(payLoad, process.env.JWT_TOKEN_SECRET, {expiresIn: '1d'});
        
        const cookieOptions = {
            httpOnly: true,
            secure: true,
        }

        res.cookie("token", token, cookieOptions).status(200).json({
            message: 'Login successful',
            data: {payLoad, token},
        });

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}

export default checkEmailAndPassword;