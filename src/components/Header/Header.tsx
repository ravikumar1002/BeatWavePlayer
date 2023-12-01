
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import AdbIcon from '@mui/icons-material/Adb';

const Header = () => {

    return (
        <AppBar position="static" sx={{
            background: "white",
            color: "purple",
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters className='p-6'>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Yfitops
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
