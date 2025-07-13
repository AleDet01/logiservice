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

app.use(cors());
app.use(express.json());

// Usa i router con i prefissi
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/testimonials', testimonialRoutes);

mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

database.once("open", () => {
  console.log("Connesso al DB");
  console.log("Host MongoDB:", database.host);
  app.listen(3000, () => {
    console.log("App in ascolto");
  });
});
