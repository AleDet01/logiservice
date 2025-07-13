import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';

const ConsultazioniList = () => {
  const { user, token } = useAuthContext();
  const [consultazioni, setConsultazioni] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios.get('/api/consultations', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setConsultazioni(res.data));
  }, [user, token]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>Richieste di Consulenza</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Prodotto</TableCell>
            <TableCell>Dimensione Azienda</TableCell>
            <TableCell>Località</TableCell>
            <TableCell>Messaggio</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultazioni.map(c => (
            <TableRow key={c._id}>
              <TableCell>{c.client?.name || c.client}</TableCell>
              <TableCell>{c.product || '-'}</TableCell>
              <TableCell>{c.companySize}</TableCell>
              <TableCell>{c.location}</TableCell>
              <TableCell>{c.message}</TableCell>
              <TableCell>{c.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ConsultazioniList;
