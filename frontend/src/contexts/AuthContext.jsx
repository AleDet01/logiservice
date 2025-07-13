import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configurazione base per axios
axios.defaults.baseURL = 'http://localhost:3000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Configura l'header per le richieste future
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Verifica se il token è valido facendo una richiesta di test
          const res = await axios.get('/api/users/me');
          setUser(res.data);
        } catch (error) {
          // Token non valido, rimuovilo
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/users/login', { email, password });
      const { token: newToken, user: userData } = res.data;
      
      setToken(newToken);
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante il login');
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post('/api/users/register', { name, email, password });
      return await login(email, password);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Errore durante la registrazione');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
