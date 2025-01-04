import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
const currentUser = async(token) => {
    try {
        if(!token){
            console.log('No token');
            return 
        }
        const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        
        const user = await UserModel.findOne({_id: decode }).select('-password');
        return user;
    } catch (error) {
        console.log(error.message);
        
        
    }
}

export default currentUser;