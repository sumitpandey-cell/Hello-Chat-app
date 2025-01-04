import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { Typography } from '@mui/material';
function ChatedPerson({
    name,
    message,
    src,
    onclick,
    status,
    homeClick,
    userId
})
{
    const handleClick = async() => {
        const userData = { name, message, src, userId };
        
        if (typeof onclick === 'function') {
          onclick(userData); // Ensure onClick is a function before calling it
        }
        homeClick()
      };

    return (
        <div
            onClick={handleClick}
            
            className='hover:bg-slate-100 w-full'
        >
            <Box component="section" 
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '12vh',
                possition: 'relative',
                cursor: 'pointer'
            }}>
                <div
                 className='h-[8vh] w-14'
                >
                <Avatar alt="Remy Sharp"
                    src={src}
                    sx={{
                        margin: 'auto',
                        height: '100%',
                        width: '100%',
                        minWidth: '50px',
                    }}
                />
                </div>
                <Typography
                    className='flex flex-col'
                >
                <Typography
                noWrap
                    sx={{
                        marginX: 2,
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                className='text-slate-400'
                noWrap
                    sx={{
                        marginX: 2,
                    }}
                >
                    {message}
                </Typography>
                </Typography>

                <Typography className={` absolute right-6 ${status==='online'?"text-red-700":'text-slate-400'}`}>{
                    status
                    }</Typography>
            </Box>
        </div>
    )
}
export default ChatedPerson