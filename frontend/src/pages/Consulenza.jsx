import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  MenuItem, 
  Card, 
  CardContent,
  Alert
} from '@mui/material';
import {
  BusinessCenter,
  Engineering,
  Security,
  Send
} from '@mui/icons-material';
import axios from 'axios';

const companySizes = ['Piccola', 'Media', 'Grande'];

const Consulenza = () => {
  const [formData, setFormData] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    currentSituation: '',
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const services = [
    {
      icon: <Engineering sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Analisi Spazi',
      description: 'Valutazione completa dei tuoi spazi di stoccaggio e ottimizzazione layout'
    },
    {
      icon: <BusinessCenter sx={{ fontSize: 40, color: '#4caf50' }} />,
      title: 'Progettazione Custom',
      description: 'Soluzioni su misura per le tue specifiche esigenze logistiche'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#ff9800' }} />,
      title: 'Compliance & Sicurezza',
      description: 'Certificazioni di conformità e verifiche di sicurezza'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post('/api/consultations', formData);
      setMessage({ 
        type: 'success', 
        text: 'Richiesta inviata con successo! Ti contatteremo presto.' 
      });
      setFormData({
        company: '',
        contactPerson: '',
        email: '',
        phone: '',
        companySize: '',
        currentSituation: '',
        requirements: ''
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Errore nell\'invio della richiesta. Riprova più tardi.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header compatto */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Engineering sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" fontWeight="bold" mb={1} color="primary">
          Consulenza Tecnica
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={3}>
          Ottimizza i tuoi spazi con il supporto dei nostri esperti
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Sezione Servizi - Compatta */}
        <Grid item xs={12} lg={5}>
          <Paper elevation={2} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="primary" textAlign="center">
              I Nostri Servizi
            </Typography>
            <Grid container spacing={2}>
              {services.map((service, index) => (
                <Grid item xs={12} key={index}>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      p: 2,
                      height: 80, // Altezza fissa per uniformità
                      display: 'flex', 
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ mr: 2, flexShrink: 0 }}>
                      {service.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold" mb={0.5} sx={{ fontSize: '1rem' }}>
                        {service.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          fontSize: '0.85rem',
                          lineHeight: 1.3,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Form di Consulenza - Compatto */}
        <Grid item xs={12} lg={7}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
              Richiedi una Consulenza
            </Typography>
            
            {message.text && (
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome Azienda"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Persona di Contatto"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Dimensione Azienda"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    required
                    size="small"
                  >
                    {companySizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Spazio per equilibrare il layout */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Situazione Attuale"
                    name="currentSituation"
                    value={formData.currentSituation}
                    onChange={handleInputChange}
                    placeholder="Descrivi brevemente la tua situazione logistica attuale..."
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Requisiti e Obiettivi"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Cosa vuoi ottenere dalla consulenza?"
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      disabled={loading}
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      {loading ? 'Invio in corso...' : 'Invia Richiesta'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Consulenza;
