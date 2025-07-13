import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Person,
  Business,
  History,
  Reviews,
  Dashboard,
  SupervisorAccount,
  Assessment,
  Settings,
  Email,
  Phone,
  CalendarToday,
  CheckCircle,
  Schedule,
  Cancel
} from '@mui/icons-material';
import { useAuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const AreaUtente = () => {
  const { user, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState(0);
  const [userConsultations, setUserConsultations] = useState([]);
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [allConsultations, setAllConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's consultations
      const consultationsRes = await axios.get('/api/consultations');
      const consultationsData = Array.isArray(consultationsRes.data) ? consultationsRes.data : [];
      const userConsults = consultationsData.filter(c => c.client?._id === user._id);
      setUserConsultations(userConsults);

      // Fetch user's testimonials
      const testimonialsRes = await axios.get('/api/testimonials');
      const testimonialsData = Array.isArray(testimonialsRes.data) ? testimonialsRes.data : [];
      const userTestims = testimonialsData.filter(t => t.client?._id === user._id);
      setUserTestimonials(userTestims);

      // If admin, fetch all consultations
      if (user.role === 'admin') {
        setAllConsultations(consultationsData);
      }
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'primary';
      case 'in_progress': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nuova';
      case 'in_progress': return 'In Corso';
      case 'completed': return 'Completata';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <Schedule />;
      case 'in_progress': return <Schedule />;
      case 'completed': return <CheckCircle />;
      default: return <Cancel />;
    }
  };

  if (!user) {
    return (
      <Container>
        <Alert severity="error">Non autorizzato - Effettua il login</Alert>
      </Container>
    );
  }

  const UserProfile = () => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            mr: 3,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
          }}
        >
          <Person sx={{ fontSize: 40 }} />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user.email}
          </Typography>
          <Chip 
            label={user.role === 'admin' ? 'Amministratore' : 'Cliente'} 
            color={user.role === 'admin' ? 'error' : 'primary'}
            sx={{ mt: 1 }}
          />
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card elevation={1} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <Email sx={{ color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">Email</Typography>
                <Typography variant="body2">{user.email}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={1} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
              <CalendarToday sx={{ color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">Membro dal</Typography>
                <Typography variant="body2">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString('it-IT')}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );

  const UserConsultations = () => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Le Mie Richieste di Consulenza
      </Typography>
      
      {userConsultations.length === 0 ? (
        <Alert severity="info">Non hai ancora inviato richieste di consulenza</Alert>
      ) : (
        <Grid container spacing={3}>
          {userConsultations.map((consultation) => (
            <Grid item xs={12} md={6} key={consultation._id}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Consulenza #{consultation._id.slice(-6)}
                    </Typography>
                    <Chip 
                      icon={getStatusIcon(consultation.status)}
                      label={getStatusText(consultation.status)}
                      color={getStatusColor(consultation.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Dimensione Azienda:</strong> {consultation.companySize}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Località:</strong> {consultation.location}
                  </Typography>
                  <Typography variant="body2" mb={2}>
                    {consultation.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Richiesta il: {new Date(consultation.requestedAt).toLocaleDateString('it-IT')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );

  const UserTestimonials = () => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Le Mie Recensioni
      </Typography>
      
      {userTestimonials.length === 0 ? (
        <Alert severity="info">Non hai ancora lasciato recensioni</Alert>
      ) : (
        <Grid container spacing={3}>
          {userTestimonials.map((testimonial) => (
            <Grid item xs={12} key={testimonial._id}>
              <Card elevation={2}>
                <CardContent>
                  <Box display="flex" justifyContent="between" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Recensione per {testimonial.company || 'LogiService'}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      {'⭐'.repeat(testimonial.rating || 5)}
                    </Box>
                  </Box>
                  <Typography variant="body1" mb={2}>
                    {testimonial.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Pubblicata il: {new Date(testimonial.createdAt).toLocaleDateString('it-IT')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );

  const AdminDashboard = () => (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard Amministratore
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <SupervisorAccount sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {allConsultations.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Totale Consulenze
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Schedule sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {allConsultations.filter(c => c.status === 'new').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nuove Richieste
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {allConsultations.filter(c => c.status === 'completed').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completate
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Tutte le Richieste di Consulenza
      </Typography>
      
      {allConsultations.length === 0 ? (
        <Alert severity="info">Nessuna richiesta di consulenza presente</Alert>
      ) : (
        <Grid container spacing={2}>
          {allConsultations.map((consultation) => (
            <Grid item xs={12} key={consultation._id}>
              <Card elevation={1}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        #{consultation._id.slice(-6)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {consultation.client?.name || 'Cliente sconosciuto'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2">
                        {consultation.companySize}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {consultation.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        {consultation.message?.substring(0, 100)}...
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Chip 
                        icon={getStatusIcon(consultation.status)}
                        label={getStatusText(consultation.status)}
                        color={getStatusColor(consultation.status)}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      py: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Container maxWidth="xl">
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              icon={<Person />} 
              label="Profilo" 
              iconPosition="start"
            />
            <Tab 
              icon={<Business />} 
              label="Mie Consulenze" 
              iconPosition="start"
            />
            <Tab 
              icon={<Reviews />} 
              label="Mie Recensioni" 
              iconPosition="start"
            />
            {user.role === 'admin' && (
              <Tab 
                icon={<Dashboard />} 
                label="Dashboard Admin" 
                iconPosition="start"
              />
            )}
          </Tabs>
        </Paper>

        <Box>
          {activeTab === 0 && <UserProfile />}
          {activeTab === 1 && <UserConsultations />}
          {activeTab === 2 && <UserTestimonials />}
          {activeTab === 3 && user.role === 'admin' && <AdminDashboard />}
        </Box>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={logout}
            size="large"
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AreaUtente;
