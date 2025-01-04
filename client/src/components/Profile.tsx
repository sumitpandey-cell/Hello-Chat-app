import { Avatar, Container } from '@mui/material'
import React from 'react'

function Profile() {
    
    return (
        <Container>
            <Avatar
                src='https://www.w3schools.com/howto/img_avatar.png'
                sx={{
                    height: '30vh',
                    width: '30vh',
                    margin: 'auto',
                    marginTop: '5vh'
                }}
            />
            <h1 className='text-center'>Name</h1>
            <p className='text-center'>Email</p>
            <p className='text-center'>Phone</p>
            <p className='text-center'>Bio</p>
        </Container>
    )
}

export default Profile