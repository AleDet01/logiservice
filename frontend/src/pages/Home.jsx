import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button
} from '@mui/material';
import {
  BusinessCenter,
  Engineering,
  Security,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Engineering sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'Scaffalature',
      description: 'Sistemi di stoccaggio robusti e affidabili'
    },
    {
      icon: <BusinessCenter sx={{ fontSize: 48, color: '#4caf50' }} />,
      title: 'Consulenza',
      description: 'Progettazione personalizzata per i tuoi spazi'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: '#ff9800' }} />,
      title: 'Sicurezza',
      description: 'Certificazioni e verifiche di conformità'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight="bold" mb={3} color="primary">
          LOGISERVICE
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={2}>
          Leader nelle soluzioni logistiche e scaffalature industriali
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Oltre 15 anni di esperienza nel settore
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/prodotti')}
            sx={{ py: 1.5, px: 3 }}
          >
            Scopri i Prodotti
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/consulenza')}
            sx={{ py: 1.5, px: 3 }}
          >
            Richiedi Consulenza
          </Button>
        </Box>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={5}>
          I Nostri Servizi
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent sx={{ py: 3 }}>
                  <Box mb={2}>{service.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Box sx={{ 
        py: 8, 
        bgcolor: 'primary.main', 
        color: 'white', 
        borderRadius: 4, 
        textAlign: 'center',
        mt: 4,
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)'
      }}>
        <Typography variant="h4" fontWeight="bold" mb={6}>
          🏆 I Nostri Numeri
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 4, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { 
                transform: 'translateY(-8px) scale(1.05)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h2" fontWeight="bold" sx={{ 
                mb: 2, 
                background: 'linear-gradient(45deg, #4fc3f7 30%, #29b6f6 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}>
                15+
              </Typography>
              <Typography variant="body1" fontWeight="medium" sx={{ opacity: 0.95 }}>
                Anni di Esperienza
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 4, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { 
                transform: 'translateY(-8px) scale(1.05)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h2" fontWeight="bold" sx={{ 
                mb: 2, 
                background: 'linear-gradient(45deg, #81c784 30%, #66bb6a 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}>
                500+
              </Typography>
              <Typography variant="body1" fontWeight="medium" sx={{ opacity: 0.95 }}>
                Progetti Completati
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 4, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { 
                transform: 'translateY(-8px) scale(1.05)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h2" fontWeight="bold" sx={{ 
                mb: 2, 
                background: 'linear-gradient(45deg, #ffb74d 30%, #ffa726 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}>
                100+
              </Typography>
              <Typography variant="body1" fontWeight="medium" sx={{ opacity: 0.95 }}>
                Clienti Soddisfatti
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 4, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { 
                transform: 'translateY(-8px) scale(1.05)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h2" fontWeight="bold" sx={{ 
                mb: 2, 
                background: 'linear-gradient(45deg, #e57373 30%, #ef5350 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}>
                24h
              </Typography>
              <Typography variant="body1" fontWeight="medium" sx={{ opacity: 0.95 }}>
                Tempo di Risposta
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
