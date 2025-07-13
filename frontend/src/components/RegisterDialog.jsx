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
  PersonAdd,
  Close,
  Person,
  Email,
  Lock,
  CheckCircle
} from '@mui/icons-material';
import { useAuthContext } from '../contexts/AuthContext';

const RegisterDialog = ({ open, onClose }) => {
  const { register } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Tutti i campi sono obbligatori');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Le password non coincidono');
      return false;
    }

    if (password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Inserisci un indirizzo email valido');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await register(name, email, password);
      setShowSuccessToast(true);
      setTimeout(() => {
        onClose();
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }, 1500);
    } catch (err) {
      setError('Errore nella registrazione. Email già in uso?');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
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
                  background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                  mr: 2
                }}
              >
                <PersonAdd sx={{ color: 'white', fontSize: 28 }} />
              </Paper>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Registrati
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <Close />
            </IconButton>
          </Box>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Crea il tuo account per accedere ai nostri servizi
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 4, pb: 2 }}>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Person sx={{ 
                position: 'absolute', 
                left: 12, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'text.secondary',
                zIndex: 1
              }} />
              <TextField 
                label="Nome Completo" 
                fullWidth 
                variant="outlined"
                value={name} 
                onChange={e => setName(e.target.value)}
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
                type="email"
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
                label="Conferma Password" 
                type="password" 
                fullWidth 
                variant="outlined"
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
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
            onClick={handleRegister} 
            variant="contained" 
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #388E3C 30%, #689F38 90%)',
              },
              '&:disabled': {
                background: 'linear-gradient(45deg, #A5D6A7 30%, #C5E1A5 90%)',
              }
            }}
          >
            {loading ? 'Registrazione...' : 'Registrati'}
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
          Registrazione completata! Benvenuto a bordo!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterDialog;
