import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Divider
} from '@mui/material';
import { ArrowBack, ShoppingBag, Category, Euro } from '@mui/icons-material';

const ProdottoDettaglio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prodotto, setProdotto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdotto = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProdotto(response.data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento del prodotto:', err);
        setError('Prodotto non trovato o errore nel caricamento.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProdotto();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate('/prodotti');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Caricamento prodotto...
        </Typography>
      </Container>
    );
  }

  if (error || !prodotto) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleGoBack}
          sx={{ textTransform: 'none' }}
        >
          Torna ai Prodotti
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={handleGoBack}
        sx={{ mb: 4, textTransform: 'none' }}
      >
        Torna ai Prodotti
      </Button>

      {/* Product Details */}
      <Card elevation={3} sx={{ overflow: 'hidden' }}>
        <Grid container>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="div"
              sx={{
                height: { xs: 300, md: 500 },
                backgroundColor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                <ShoppingBag sx={{ fontSize: 120, color: 'grey.400' }} />
              )}
            </CardMedia>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4, height: '100%' }}>
              {/* Product Name */}
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                {prodotto.name}
              </Typography>

              {/* Category */}
              {prodotto.category && (
                <Box sx={{ mb: 3 }}>
                  <Chip 
                    icon={<Category />}
                    label={prodotto.category} 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
              )}

              {/* Price */}
              {prodotto.price && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Euro color="primary" />
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      € {prodotto.price}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Descrizione
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {prodotto.description || 'Nessuna descrizione disponibile per questo prodotto.'}
                </Typography>
              </Box>

              {/* Additional Details */}
              {(prodotto.specifications || prodotto.features) && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Dettagli Aggiuntivi
                  </Typography>
                  {prodotto.specifications && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Specifiche:</strong> {prodotto.specifications}
                    </Typography>
                  )}
                  {prodotto.features && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Caratteristiche:</strong> {prodotto.features}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Contact Button */}
              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/contatti')}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    py: 1.5
                  }}
                >
                  Contattaci per Informazioni
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProdottoDettaglio;
