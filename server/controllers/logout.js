import currentUser from "../helpers/currentUser.js";
import UserModel from "../models/user.js";
const logout = async (req, res) => {
    try {
        const user = await currentUser(req.cookies.token);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.clearCookie('token').status(200).json({ message: 'User logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default logout;