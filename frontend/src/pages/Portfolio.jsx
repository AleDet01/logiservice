import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Portfolio = () => (
  <Container>
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Portfolio</Typography>
      <Typography>
        Alcuni dei nostri progetti realizzati per clienti in tutta Italia.
      </Typography>
    </Box>
  </Container>
);

export default Portfolio;
