import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import { 
  Home, 
  Inventory, 
  Support, 
  Star, 
  ContactPhone,
  PersonPin,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const isAdmin = user && user.role === 'admin';

  const menuItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Prodotti', path: '/prodotti', icon: <Inventory /> },
    { label: 'Consulenza', path: '/consulenza', icon: <Support /> },
    { label: 'Recensioni', path: '/recensioni', icon: <Star /> },
    { label: 'Contatti', path: '/contatti', icon: <ContactPhone /> },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #dee2e6'
      }}
    >
      <Toolbar sx={{ minHeight: '60px', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: isActivePath(item.path) ? '#1976d2' : '#6c757d',
                backgroundColor: isActivePath(item.path) ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                borderRadius: 2,
                px: 2.5,
                py: 1,
                mx: 0.5,
                fontWeight: isActivePath(item.path) ? 'bold' : 'medium',
                textTransform: 'none',
                fontSize: '0.95rem',
                border: isActivePath(item.path) ? '1px solid rgba(25, 118, 210, 0.3)' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: isActivePath(item.path) ? 'rgba(25, 118, 210, 0.15)' : 'rgba(108, 117, 125, 0.1)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {item.label}
            </Button>
          ))}

          {/* User Area Button */}
          {user && (
            <Button
              component={Link}
              to="/area-utente"
              startIcon={<PersonPin />}
              sx={{
                color: isActivePath('/area-utente') ? '#1976d2' : '#6c757d',
                backgroundColor: isActivePath('/area-utente') ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                borderRadius: 2,
                px: 2.5,
                py: 1,
                mx: 0.5,
                fontWeight: isActivePath('/area-utente') ? 'bold' : 'medium',
                textTransform: 'none',
                fontSize: '0.95rem',
                border: isActivePath('/area-utente') ? '1px solid rgba(25, 118, 210, 0.3)' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: isActivePath('/area-utente') ? 'rgba(25, 118, 210, 0.15)' : 'rgba(108, 117, 125, 0.1)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Area Utente
            </Button>
          )}

          {/* Admin Panel */}
          {isAdmin && (
            <Chip
              component={Link}
              to="/admin/consultazioni"
              icon={<AdminPanelSettings />}
              label="Admin"
              clickable
              color="primary"
              variant={isActivePath('/admin') ? 'filled' : 'outlined'}
              sx={{
                ml: 1,
                fontWeight: 'bold',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.3s ease'
              }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
