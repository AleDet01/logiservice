import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Chip
} from '@mui/material';
import { 
  Business, 
  Login, 
  PersonAdd, 
  Logout, 
  AccountCircle 
} from '@mui/icons-material';
import { useAuthContext } from '../contexts/AuthContext';

const Topbar = ({ onLoginOpen, onRegisterOpen }) => {
  const { user, logout } = useAuthContext();
  
  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: '70px' }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Business sx={{ fontSize: 32, mr: 1.5, color: 'white' }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}
          >
            LOGISERVICE
          </Typography>
        </Box>

        {/* User Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Chip
                icon={<AccountCircle />}
                label={`Ciao, ${user.name || 'Utente'}`}
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '& .MuiChip-icon': {
                    color: 'white'
                  }
                }}
              />
              <Button 
                color="inherit" 
                onClick={logout}
                startIcon={<Logout />}
                sx={{
                  ml: 1,
                  borderRadius: 2,
                  px: 2,
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={onLoginOpen}
                startIcon={<Login />}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                onClick={onRegisterOpen}
                startIcon={<PersonAdd />}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  ml: 1,
                  fontWeight: 'bold',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.5)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Registrati
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
