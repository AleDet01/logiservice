import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { ShoppingBag, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProdottiList = () => {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Array di gradient colorati per i prodotti
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
  ];

  const getGradient = (index) => {
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    const fetchProdotti = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products');
        setProdotti(response.data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento prodotti:', err);
        setError('Errore nel caricamento dei prodotti. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchProdotti();
  }, []);

  const handleViewProduct = (productId) => {
    navigate(`/prodotti/${productId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento prodotti...
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
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <ShoppingBag sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" fontWeight="bold" color="primary" gutterBottom>
          I Nostri Prodotti
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Scopri la nostra gamma di prodotti di alta qualità
        </Typography>
      </Box>

      {prodotti.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Nessun prodotto disponibile al momento.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {prodotti.map((prodotto, index) => (
            <Grid item key={prodotto._id} xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card 
                elevation={3}
                sx={{
                  height: 495, 
                  width: 320, 
                  margin: '0 auto', 
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  flexShrink: 0, 
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200, 
                    background: prodotto.imageUrl ? 'none' : getGradient(index),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {prodotto.imageUrl ? (
                    <img 
                      src={prodotto.imageUrl} 
                      alt={prodotto.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <ShoppingBag 
                      sx={{ 
                        fontSize: 50, 
                        color: 'rgba(255, 255, 255, 0.8)',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                      }} 
                    />
                  )}
                </CardMedia>

                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: 2.5, 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: 295, // Altezza aumentata per compensare titolo e specifiche più alti
                  overflow: 'hidden' // Previene l'espansione oltre l'altezza fissa
                }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      fontSize: '1rem', // Dimensione leggermente ridotta per evitare overflow
                      lineHeight: 1.2,
                      height: '4rem', // Altezza aumentata per 3 righe (era 3.2rem per 2 righe)
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // Aumentato a 3 righe
                      WebkitBoxOrient: 'vertical',
                      mb: 1.5
                    }}
                  >
                    {prodotto.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      height: '3.4rem', // Altezza leggermente ridotta per dare più spazio ad altre sezioni
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      fontSize: '0.875rem',
                      lineHeight: 1.3 // Line height leggermente ridotto
                    }}
                  >
                    {prodotto.description?.length > 100 
                      ? `${prodotto.description.substring(0, 100)}...` 
                      : prodotto.description || 'Nessuna descrizione disponibile'
                    }
                  </Typography>

                  {/* Sezione specifiche tecniche con altezza fissa */}
                  <Box sx={{ 
                    mb: 2, 
                    height: '5rem', // Altezza aumentata per evitare il taglio (era 4rem)
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.3, // Gap ridotto per utilizzare meglio lo spazio
                    overflow: 'hidden' // Nasconde il contenuto in eccesso
                  }}>
                    {prodotto.loadCapacityKg && (
                      <Typography variant="caption" color="text.secondary" sx={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        fontSize: '0.75rem' // Font leggermente più piccolo
                      }}>
                        📦 Capacità: {prodotto.loadCapacityKg} kg
                      </Typography>
                    )}
                    {prodotto.dimensions && (
                      <Typography variant="caption" color="text.secondary" sx={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        fontSize: '0.75rem' // Font leggermente più piccolo
                      }}>
                        📏 Dim: {prodotto.dimensions.height}×{prodotto.dimensions.width}×{prodotto.dimensions.depth}mm
                      </Typography>
                    )}
                    {prodotto.type && (
                      <Typography variant="caption" color="text.secondary" sx={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        fontSize: '0.75rem' // Font leggermente più piccolo
                      }}>
                        🏷️ Tipo: {prodotto.type}
                      </Typography>
                    )}
                  </Box>

                  {/* Sezione chips con altezza fissa */}
                  <Box sx={{ 
                    mb: 2, 
                    height: '2.5rem', // Altezza aumentata per evitare il taglio dei chip
                    display: 'flex', 
                    gap: 1, 
                    flexWrap: 'wrap',
                    overflow: 'hidden', // Nasconde chip in eccesso
                    alignItems: 'flex-start'
                  }}>
                    {prodotto.price && (
                      <Chip 
                        label={`€ ${prodotto.price}`} 
                        color="primary" 
                        size="small"
                        sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                      />
                    )}
                    {prodotto.inStock !== undefined && (
                      <Chip 
                        label={prodotto.inStock ? 'Disponibile' : 'Esaurito'}
                        color={prodotto.inStock ? 'success' : 'error'}
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Box>

                  {/* Pulsante sempre in fondo */}
                  <Button
                    variant="contained"
                    startIcon={<Visibility />}
                    fullWidth
                    size="small"
                    onClick={() => handleViewProduct(prodotto._id)}
                    sx={{ 
                      mt: 'auto',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      height: '2.5rem' // Altezza fissa per il bottone
                    }}
                  >
                    Visualizza Dettagli
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProdottiList;