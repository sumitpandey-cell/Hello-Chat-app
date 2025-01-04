import express from 'express';
import connect from './config/connection.js';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/index.js';


connect("mongodb://localhost:27017/Chat");
const PORT = 8000;

//Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.get('/login', (req, res)=>{
    res.send('Login page');
})

app.use('/api', router)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});