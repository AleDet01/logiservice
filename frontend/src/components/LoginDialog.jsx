import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
  Paper
} from '@mui/material';
import {
  Login,
  Close,
  Email,
  Lock,
  CheckCircle
} from '@mui/icons-material';
import { useAuthContext } from '../contexts/AuthContext';

const LoginDialog = ({ open, onClose }) => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Inserisci email e password');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      setShowSuccessToast(true);
      setTimeout(() => {
        onClose();
        setEmail('');
        setPassword('');
      }, 1500);
    } catch (err) {
      setError('Credenziali non valide. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setPassword('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" sx={{ width: '100%', justifyContent: 'center' }}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 1, 
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  mr: 2
                }}
              >
                <Login sx={{ color: 'white', fontSize: 28 }} />
              </Paper>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Accedi
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <Close />
            </IconButton>
          </Box>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Inserisci le tue credenziali per accedere
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 4, pb: 2 }}>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Email sx={{ 
                position: 'absolute', 
                left: 12, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'text.secondary',
                zIndex: 1
              }} />
              <TextField 
                label="Email" 
                fullWidth 
                variant="outlined"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  '& .MuiInputBase-root': {
                    pl: 6,
                    borderRadius: 2,
                  }
                }}
                disabled={loading}
              />
            </Box>

            <Box sx={{ position: 'relative', mb: 3 }}>
              <Lock sx={{ 
                position: 'absolute', 
                left: 12, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'text.secondary',
                zIndex: 1
              }} />
              <TextField 
                label="Password" 
                type="password" 
                fullWidth 
                variant="outlined"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  '& .MuiInputBase-root': {
                    pl: 6,
                    borderRadius: 2,
                  }
                }}
                disabled={loading}
              />
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  '& .MuiAlert-message': {
                    fontWeight: 500
                  }
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 4, pt: 2 }}>
          <Button 
            onClick={handleClose} 
            size="large"
            sx={{ 
              mr: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600
            }}
            disabled={loading}
          >
            Annulla
          </Button>
          <Button 
            onClick={handleLogin} 
            variant="contained" 
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Login />}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
              },
              '&:disabled': {
                background: 'linear-gradient(45deg, #90CAF9 30%, #81D4FA 90%)',
              }
            }}
          >
            {loading ? 'Accesso...' : 'Accedi'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast di successo */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success"
          icon={<CheckCircle />}
          sx={{ 
            borderRadius: 2,
            fontWeight: 600,
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          Accesso effettuato con successo! Benvenuto!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginDialog;
