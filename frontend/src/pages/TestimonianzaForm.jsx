import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { Star, Send, ArrowBack } from '@mui/icons-material';

const TestimonianzaForm = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    message: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Controlla se l'utente è loggato
  if (!user || !token) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Devi essere loggato per poter inviare una testimonianza.
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/testimonianze')}
          sx={{ textTransform: 'none' }}
        >
          Torna alle testimonianze
        </Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      setError('Il contenuto della testimonianza è obbligatorio');
      return;
    }

    if (!formData.clientName.trim()) {
      setError('Il nome è obbligatorio');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/testimonials', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/testimonianze');
      }, 2000);
    } catch (err) {
      console.error('Errore nel salvataggio testimonianza:', err);
      setError('Errore nel salvataggio della testimonianza. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/testimonianze');
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Testimonianza inviata con successo! Grazie per il tuo feedback.
        </Alert>
        <Typography variant="body1" color="text.secondary">
          Verrai reindirizzato alla pagina delle testimonianze...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={handleGoBack}
        sx={{ mb: 4, textTransform: 'none' }}
      >
        Torna alle Testimonianze
      </Button>

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Star sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
          Condividi la Tua Esperienza
        </Typography>
        <Typography variant="h6" color="text.secondary">
          La tua opinione è importante per noi e per i futuri clienti
        </Typography>
      </Box>

      {/* Form */}
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Client Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="clientName"
                  label="Nome"
                  value={formData.clientName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Il tuo nome"
                  required
                />
              </Grid>

              {/* Company */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="company"
                  label="Azienda (opzionale)"
                  value={formData.company}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="La tua azienda"
                />
              </Grid>

              {/* Rating */}
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Valutazione
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Rating
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size="large"
                    />
                    <Typography variant="body1" color="text.secondary">
                      {formData.rating}/5 stelle
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Message */}
              <Grid item xs={12}>
                <TextField
                  name="message"
                  label="La tua testimonianza"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Condividi la tua esperienza con i nostri servizi..."
                  required
                  helperText="Racconta cosa ti è piaciuto di più dei nostri servizi"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    disabled={loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    {loading ? 'Invio in corso...' : 'Invia Testimonianza'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TestimonianzaForm;
