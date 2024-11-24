import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios'; // Axios to make the API request

const drawerWidth = 240;
const navItems = ['Register', 'Login'];

function Login(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:4000/api/login', {
        email,
        password,
      });
  
      console.log('Response:', response); // Check the response structure
  
      if (response.status === 200 && response.data.token) {
        // Store the token or handle login response
        localStorage.setItem('token', response.data.token);
  
        // Check if 'redirectTo' exists, otherwise fallback to a default route
        const redirectTo = response.data.redirectTo || '/user_home'; 
        console.log(redirectTo);
        // Redirect based on the response
        window.location.href = redirectTo;
      } else {
        setError(response.data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      setError('An error occurred, please try again later.');
    }
  };
  

  

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <NavLink
                to={item === 'Register' ? '/' : `/${item.toLowerCase()}`}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'blue' : 'black',
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
              >
                <ListItemText primary={item} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              color: 'black',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            MBMS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 'auto' }}>
            {navItems.map((item) => (
              <Button
                key={item}
                component={NavLink}
                to={item === 'Register' ? '/' : `/${item.toLowerCase()}`}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&.active': {
                    color: 'yellow',
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Toolbar />
        <Paper
          elevation={3}
          sx={{
            maxWidth: 400,
            margin: 'auto',
            padding: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Employee Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

Login.propTypes = {
  window: PropTypes.func,
};

export default Login;
