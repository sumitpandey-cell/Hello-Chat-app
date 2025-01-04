import { Avatar, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { UsernameValidation, EmailValidation, PasswordValidation } from '../utils/UsernameValidation';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/userSlice';

function Login() {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()  

    const usernameError = UsernameValidation(username)
    const emailError = EmailValidation(email)
    const passwordError = PasswordValidation(password)

    const [selectedImg, setSelectedImg] = useState(null);
    const [img, setImg] = useState('');

    const ValidityState = (e) => {
        if (usernameError || emailError || passwordError) {
            e.preventDefault()
            setError(usernameError || emailError || passwordError)
        }
        if (!usernameError && !emailError && !passwordError) {
            setError('')
        }
    }

    const handleImageChange = (e) => {
        setSelectedImg(URL.createObjectURL(e.target.files[0]))
        setImg(e.target.files[0])

    }

    const handleSignUp = async (e) => {
        console.log(img);
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profileUrl', img);
        console.log(...formData);
        
        try {
            const res = await axios.post('http://localhost:8000/api/registerUser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("$$$$$$$$$$$",res);
            
            if(res){
                dispatch(setCurrentUser(res.data))
                setIsLogin((prev) => !prev)
            }
        } catch (error) {
            console.log(error)
            
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[2].value
        try {
            const res = await axios.post('http://localhost:8000/api/login', { email, password });
            console.log(res);
            if (res.data.data) {
                localStorage.setItem('token', res.data.data.token)
                dispatch(setCurrentUser(res.data.data.payLoad)); // Set the current user in Redux
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }




    return (
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '35vw',
                    variant: 'outlined',
                    backgroundColor: 'black'
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                        margin: 2,
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    {isLogin ?
                        (
                            <>
                                <Typography variant="h3">LOGIN</Typography>
                                <form onSubmit={handleLogin}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        required
                                        margin='normal'
                                        name='email'
                                        fullWidth
                                    ></TextField>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        required
                                        name='password'
                                        margin='normal'
                                        fullWidth
                                    ></TextField>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type='submit'
                                    >Login</Button>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        fullWidth
                                        onClick={() => setIsLogin(false)}
                                    >Don't have an account? Signup</Button>
                                </form>
                            </>
                        ) :
                        (
                            <>
                                <form onSubmit={handleSignUp}  encType='multipart/form-data'>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',

                                        }}
                                    >
                                        <Avatar
                                            src={selectedImg}
                                            sx={{
                                                width: 200,
                                                height: 200,
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Button component="label"
                                            sx={{
                                                position: 'absolute',
                                                top: '78%',
                                                left: '52%',
                                                backgroundColor: '#00000080',
                                            }}
                                        >
                                            <AddPhotoAlternateTwoToneIcon />
                                            <input
                                                type="file"
                                                name='profileUrl'
                                                id='profileUrl'
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    </Stack>

                                    <TextField
                                        label="Username"
                                        type="text"
                                        name='username'
                                        required
                                        margin='normal'
                                        fullWidth
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                    ></TextField>
                                    <TextField
                                        label="Email"
                                        name='email'
                                        type="email"
                                        required
                                        margin='normal'
                                        fullWidth
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    ></TextField>
                                    <TextField
                                        label="Password"
                                        name='password'
                                        type="password"
                                        required
                                        margin='normal'
                                        fullWidth
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    ></TextField>
                                    <Button
                                        onClick={ValidityState}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type='submit'
                                    >SIGNUP</Button>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        fullWidth
                                        onClick={() => setIsLogin(true)}
                                    >Don't have an account? Login</Button>
                                    <span className='text-red-600 '>{error}</span>
                                </form>
                            </>
                        )
                    }
                </Paper>
            </Container>
    )
}

export default Login