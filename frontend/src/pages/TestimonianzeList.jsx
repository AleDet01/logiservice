import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Rating,
  CircularProgress,
  Alert,
  Fab,
  Paper,
  Chip
} from '@mui/material';
import { Star, Add, FormatQuote } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TestimonianzeList = () => {
  const [testimonianze, setTestimonianze] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonianze = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/testimonials');
        setTestimonianze(response.data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento testimonianze:', err);
        setError('Errore nel caricamento delle testimonianze. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonianze();
  }, []);

  const getAvatarColor = (name) => {
    const colors = ['#1976d2', '#4caf50', '#ff9800', '#9c27b0', '#f44336', '#00bcd4'];
    return colors[name?.length % colors.length] || '#1976d2';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento testimonianze...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
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
            <Star sx={{ fontSize: 50, mr: 2 }} />
            <Typography variant="h3" component="h1" fontWeight="bold">
              Testimonianze Clienti
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Scopri cosa dicono i nostri clienti delle nostre soluzioni logistiche
          </Typography>
        </Paper>

        {/* Testimonials Grid */}
        {testimonianze.length === 0 ? (
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
            <Star sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nessuna testimonianza disponibile al momento.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sii il primo a condividere la tua esperienza!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {testimonianze.map((testimonianza, index) => {
              const authorName = testimonianza.clientName || testimonianza.author || `Cliente ${index + 1}`;
              const rating = testimonianza.rating || 5;
              
              return (
                <Grid item key={testimonianza._id || index} xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card 
                    elevation={4}
                    sx={{
                      height: 390, // Altezza aumentata per compensare la sezione autore più alta
                      width: 320, // Larghezza FISSA (non massima)
                      margin: '0 auto', // Centra la card
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid #e9ecef',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0, // Impedisce la riduzione della card
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${getAvatarColor(authorName)}, ${getAvatarColor(authorName)}88)`,
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: 3, 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      height: 350, // Altezza aumentata per compensare la sezione autore più alta
                      overflow: 'hidden' // Previene l'espansione oltre l'altezza fissa
                    }}>
                      {/* Quote Icon e Rating */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <FormatQuote sx={{ 
                          fontSize: 32, 
                          color: getAvatarColor(authorName), 
                          opacity: 0.3,
                          transform: 'rotate(180deg)'
                        }} />
                        <Chip 
                          label={`${rating}/5`}
                          size="small"
                          sx={{ 
                            bgcolor: rating >= 4 ? '#4caf50' : rating >= 3 ? '#ff9800' : '#f44336',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>

                      {/* Rating Stars */}
                      <Box sx={{ mb: 2 }}>
                        <Rating 
                          value={rating} 
                          readOnly 
                          size="small"
                          sx={{ 
                            '& .MuiRating-iconFilled': {
                              color: '#ffd700'
                            }
                          }}
                        />
                      </Box>

                      {/* Testimonial Content con altezza fissa */}
                      <Typography 
                        variant="body2" 
                        color="text.primary" 
                        sx={{ 
                          mb: 'auto',
                          fontStyle: 'italic',
                          lineHeight: 1.5,
                          fontSize: '0.9rem',
                          height: '5.5rem', // Altezza leggermente ridotta per compensare la sezione autore più alta
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        "{(testimonianza.content || testimonianza.message)?.length > 150 
                          ? `${(testimonianza.content || testimonianza.message).substring(0, 150)}...` 
                          : testimonianza.content || testimonianza.message}"
                      </Typography>

                      {/* Author Info con altezza fissa */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5, 
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid #f0f0f0',
                        height: '4.5rem', // Altezza aumentata per evitare il taglio
                        overflow: 'hidden' // Nasconde contenuto in eccesso
                      }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(authorName),
                            width: 36, 
                            height: 36,
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                          }}
                        >
                          {authorName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography 
                            variant="subtitle2" 
                            fontWeight="bold"
                            sx={{ 
                              fontSize: '0.85rem',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {authorName}
                          </Typography>
                          {testimonianza.company && (
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                fontSize: '0.75rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block'
                              }}
                            >
                              {testimonianza.company}
                            </Typography>
                          )}
                          {testimonianza.createdAt && (
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                fontSize: '0.7rem',
                                display: 'block'
                              }}
                            >
                              {formatDate(testimonianza.createdAt)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Floating Action Button to Add Testimonial */}
        <Fab
          color="primary"
          aria-label="aggiungi testimonianza"
          sx={{ 
            position: 'fixed', 
            bottom: 32, 
            right: 32,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              boxShadow: '0 8px 25px rgba(25, 118, 210, 0.4)',
            }
          }}
          onClick={() => navigate('/testimonianza/nuova')}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
};

export default TestimonianzeList;
