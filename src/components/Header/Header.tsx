
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Header = () => {

    return (
        <AppBar position="static" sx={{
            background: "white",
            color: "purple",
            filter: "drop-shadow(rgba(0, 0, 0, 0.08) 0px 4px 16px)",
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters className='p-6'>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            // display: { sm: 'none', md: 'flex' },
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
