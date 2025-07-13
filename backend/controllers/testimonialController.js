const Testimonial = require('../models/testimonial');

exports.createTestimonial = async (req, res) => {
  try {
    // Aggiungi l'ID dell'utente dal token JWT
    const testimonialData = {
      ...req.body,
      client: req.user.id // ID dell'utente dal token decodificato
    };
    
    const testimonial = new Testimonial(testimonialData);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};