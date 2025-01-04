import mongoose from "mongoose";

async function connect(url){
    try {
        await mongoose.connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error(err));
    } catch (error) {
        console.error(error);
    }
}
export default connect;