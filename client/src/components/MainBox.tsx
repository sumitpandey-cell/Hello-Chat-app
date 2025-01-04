import React from 'react'
import { alpha, Avatar, Box, Grid2, InputBase, styled } from '@mui/material'


function MainBox({
    className,
    children,
}) {
    return (
            <Grid2
                item xs={4}
                className={`${className}`}
                sx={{
                    height: '100%',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    {children}
                </Box>
            </Grid2>
    )
}

export default MainBox