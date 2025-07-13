const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Importa i router
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

// Configurazione CORS per produzione
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? true // Permette tutti gli origin per il debug
    : ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint di test per verificare che il server funzioni
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: database.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Usa i router con i prefissi
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/testimonials', testimonialRoutes);

mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT);

database.on('error', (err) => {
  console.error('Database connection error:', err);
});

database.once("open", () => {
  console.log("Connesso al DB");
  console.log("Host MongoDB:", database.host);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
    console.log(`CORS configuration:`, corsOptions);
  });
});
