import UserModel from '../models/user.js';
import currentUser from '../helpers/currentUser.js';
const updateUserDetail = async (req, res) => {
    try {
        const user = await currentUser(req.cookies.token);
        if (!user) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const {username, profileUrl} = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {username, profileUrl}, {new: true});
        res.status(200).json({message: 'User updated successfully', data: updatedUser});
        await updatedUser.save();

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

export default updateUserDetail;