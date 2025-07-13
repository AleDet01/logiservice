import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  IconButton,
  Chip
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Business,
  WhatsApp,
  LinkedIn,
  Language,
  Fax,
  Person,
  Work
} from '@mui/icons-material';

const Contatti = () => {
  const contactInfo = {
    company: 'LOGISERVICE',
    slogan: 'Soluzioni Logistiche d\'Eccellenza',
    address: 'Via Edoardo Orabona, 4',
    city: '70126 Bari BA',
    phone: '+39 080 574 2851',
    fax: '+39 080 574 2852',
    email: 'info@logiservice.it',
    pec: 'logiservice@pec.it',
    website: 'www.logiservice.it',
    hours: 'Lun-Ven: 8:00-18:00',
    saturday: 'Sabato: 8:00-13:00',
    partitaIva: 'IT08745621085',
    codiceFiscale: 'LGISRV85M15F839L'
  };

  const teamContacts = [
    {
      name: 'Marco Santoro',
      role: 'Direttore Commerciale',
      email: 'm.santoro@logiservice.it',
      phone: '+39 335 123 4567',
      icon: <Person sx={{ color: '#1976d2' }} />
    },
    {
      name: 'Giulia Rossi',
      role: 'Responsabile Tecnico',
      email: 'g.rossi@logiservice.it',
      phone: '+39 335 234 5678',
      icon: <Work sx={{ color: '#4caf50' }} />
    },
    {
      name: 'Andrea Bianchi',
      role: 'Project Manager',
      email: 'a.bianchi@logiservice.it',
      phone: '+39 335 345 6789',
      icon: <Business sx={{ color: '#ff9800' }} />
    }
  ];

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper 
          elevation={6}
          sx={{ 
            p: 5, 
            mb: 6, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Business sx={{ fontSize: 50, mr: 2 }} />
            <Typography variant="h3" component="h1" fontWeight="bold">
              Contatti
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            La tua partnership logistica di fiducia
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Biglietto da Visita Principale */}
          <Grid item xs={12} lg={8}>
            <Card
              elevation={8}
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                borderRadius: 4,
                border: '2px solid #e9ecef',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  background: 'linear-gradient(90deg, #1976d2, #42a5f5, #4caf50, #ff9800)',
                }
              }}
            >
              <CardContent sx={{ p: 5 }}>
                {/* Logo/Header */}
                <Box textAlign="center" mb={4}>
                  <Typography 
                    variant="h3" 
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    {contactInfo.company}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontStyle="italic">
                    {contactInfo.slogan}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label="Azienda Certificata" 
                      color="primary" 
                      size="small" 
                      sx={{ mr: 1, fontWeight: 'bold' }}
                    />
                    <Chip 
                      label="ISO 9001" 
                      color="success" 
                      size="small" 
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Contact Details Grid */}
                <Grid container spacing={3}>
                  {/* Indirizzo */}
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="flex-start" mb={3}>
                      <LocationOn sx={{ color: '#1976d2', mr: 2, fontSize: 28, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1.1rem" mb={0.5}>
                          Sede Legale
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {contactInfo.address}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {contactInfo.city}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Telefono */}
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="flex-start" mb={3}>
                      <Phone sx={{ color: '#4caf50', mr: 2, fontSize: 28, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1.1rem" mb={0.5}>
                          Telefono
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {contactInfo.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Fax: {contactInfo.fax}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="flex-start" mb={3}>
                      <Email sx={{ color: '#ff9800', mr: 2, fontSize: 28, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1.1rem" mb={0.5}>
                          Email
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {contactInfo.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          PEC: {contactInfo.pec}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Orari */}
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="flex-start" mb={3}>
                      <AccessTime sx={{ color: '#f44336', mr: 2, fontSize: 28, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1.1rem" mb={0.5}>
                          Orari di Apertura
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {contactInfo.hours}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {contactInfo.saturday}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Website */}
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="flex-start" mb={3}>
                      <Language sx={{ color: '#9c27b0', mr: 2, fontSize: 28, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1.1rem" mb={0.5}>
                          Website
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {contactInfo.website}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Dati Fiscali */}
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="flex-start" mb={3}>
                      <Fax sx={{ color: '#607d8b', mr: 2, fontSize: 28, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1.1rem" mb={0.5}>
                          Dati Fiscali
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          P.IVA: {contactInfo.partitaIva}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          C.F.: {contactInfo.codiceFiscale}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Social Links */}
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold" mb={3}>
                    Seguici sui Social Network
                  </Typography>
                  <Box>
                    <IconButton 
                      sx={{ 
                        mr: 2, 
                        bgcolor: '#25d366', 
                        color: 'white',
                        width: 56,
                        height: 56,
                        '&:hover': { 
                          bgcolor: '#20ba5a',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <WhatsApp sx={{ fontSize: 28 }} />
                    </IconButton>
                    <IconButton 
                      sx={{ 
                        mr: 2, 
                        bgcolor: '#0077b5', 
                        color: 'white',
                        width: 56,
                        height: 56,
                        '&:hover': { 
                          bgcolor: '#005582',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <LinkedIn sx={{ fontSize: 28 }} />
                    </IconButton>
                    <IconButton 
                      sx={{ 
                        bgcolor: '#1976d2', 
                        color: 'white',
                        width: 56,
                        height: 56,
                        '&:hover': { 
                          bgcolor: '#1565c0',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Email sx={{ fontSize: 28 }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Contacts */}
          <Grid item xs={12} lg={4}>
            <Paper 
              elevation={6}
              sx={{ 
                p: 4, 
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid #e9ecef',
                height: 'fit-content'
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={3} color="primary" textAlign="center">
                👥 Il Nostro Team
              </Typography>
              
              {teamContacts.map((contact, index) => (
                <Card 
                  key={index}
                  elevation={2}
                  sx={{ 
                    mb: 3,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box sx={{ mr: 2 }}>
                        {contact.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                          {contact.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {contact.role}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ ml: 5 }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Email sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {contact.email}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {contact.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>

          {/* Google Maps - Allineata con le sezioni sopra */}
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {/* Mappa che occupa lo stesso spazio del biglietto da visita */}
              <Grid item xs={12} lg={8}>
                <Paper 
                  elevation={6}
                  sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '2px solid #e9ecef',
                    height: '100%'
                  }}
                >
                  <Box sx={{ 
                    p: 3, 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    textAlign: 'center'
                  }}>
                    <LocationOn sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      🗺️ Come Raggiungerci
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt={1}>
                      {contactInfo.address}, {contactInfo.city}
                    </Typography>
                  </Box>
                  <Box sx={{ height: 450, position: 'relative' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.474286845239!2d16.871962!3d41.108632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347e23f8b8c8b8b%3A0x8b8c8b8b8c8b8b8b!2sVia%20Edoardo%20Orabona%2C%204%2C%2070126%20Bari%20BA!5e0!3m2!1sit!2sit!4v1639123456789!5m2!1sit!2sit"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Sede LogiService - Via Edoardo Orabona, 4, 70126 Bari BA"
                    ></iframe>
                  </Box>
                </Paper>
              </Grid>

              {/* Spazio vuoto per allineamento - stesso spazio del team */}
              <Grid item xs={12} lg={4}>
                <Paper 
                  elevation={6}
                  sx={{ 
                    p: 4, 
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid #e9ecef',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 533 // Altezza totale della mappa + header
                  }}
                >
                  <LocationOn sx={{ fontSize: 80, color: '#1976d2', opacity: 0.3, mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="primary" textAlign="center" mb={2}>
                    📍 Facilmente Raggiungibile
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
                    La nostra sede è strategicamente posizionata in una zona facilmente accessibile
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      🚗 <strong>In Auto:</strong> Parcheggio disponibile
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      🚌 <strong>Mezzi Pubblici:</strong> Fermata a 200m
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      ✈️ <strong>Aeroporto:</strong> 15 minuti
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🚢 <strong>Porto:</strong> 20 minuti
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contatti;
