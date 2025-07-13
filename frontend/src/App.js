import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProdottiList from './pages/ProdottiList';
import ProdottoDettaglio from './pages/ProdottoDettaglio';
import TestimonianzeList from './pages/TestimonianzeList';
import TestimonianzaForm from './pages/TestimonianzaForm';
import Consulenza from './pages/Consulenza';
import Contatti from './pages/Contatti';
import AreaUtente from './pages/AreaUtente';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import ConsultazioniList from './pages/ConsultazioniList';

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const { user } = useAuthContext();
  return user && user.role === 'admin' ? children : <Navigate to="/" />;
}

function AppContent() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Topbar onLoginOpen={() => setLoginOpen(true)} onRegisterOpen={() => setRegisterOpen(true)} />
      <Navbar />
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<ProdottiList />} />
        <Route path="/prodotti/:id" element={<ProdottoDettaglio />} />
        <Route path="/recensioni" element={<TestimonianzeList />} />
        <Route path="/testimonianza/nuova" element={<TestimonianzaForm />} />
        <Route path="/consulenza" element={<Consulenza />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/area-utente" element={
          <ProtectedRoute>
            <AreaUtente />
          </ProtectedRoute>
        } />
        <Route path="/admin/consultazioni" element={
          <AdminRoute>
            <ConsultazioniList />
          </AdminRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
