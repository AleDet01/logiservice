# LogiService - Deployment su Render

## 🚀 Deploy Automatico

Questo progetto è configurato per il deployment automatico su Render usando il file `render.yaml`.

### Prerequisiti
1. Account Render gratuito
2. Repository Git collegato a Render
3. Account MongoDB Atlas (per database in produzione)

## 📋 Passi per il Deployment

### 1. Preparazione Database
1. Crea un cluster MongoDB Atlas gratuito
2. Ottieni la connection string nel formato:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/logiservice
   ```

### 2. Deploy su Render
1. Collega il repository GitHub a Render
2. Il file `render.yaml` configurerà automaticamente:
   - ✅ **Backend API** (Node.js service)
   - ✅ **Frontend** (Static site)
   - ✅ **Database** (MongoDB)

### 3. Configurazione Variabili d'Ambiente

#### Backend Service:
- `NODE_ENV`: `production`
- `JWT_SECRET`: (generato automaticamente da Render)
- `MONGODB_URI`: (collegato al database MongoDB)

#### Frontend Service:
- `REACT_APP_API_URL`: (collegato automaticamente al backend)

## 🔧 Struttura dei Servizi

```
┌─────────────────────┐
│   Frontend (React)  │  →  Static Site
│   Port: 443 (HTTPS) │
└─────────────────────┘
           │
           │ API Calls
           ▼
┌─────────────────────┐
│   Backend (Node.js) │  →  Web Service  
│   Port: 10000       │
└─────────────────────┘
           │
           │ Database Queries
           ▼
┌─────────────────────┐
│   MongoDB Atlas     │  →  External Database
│                     │
└─────────────────────┘
```

## 📡 URLs di Produzione

- **Frontend**: `https://logiservice-frontend.onrender.com`
- **Backend API**: `https://logiservice-backend.onrender.com`
- **Health Check**: `https://logiservice-backend.onrender.com/api/users`

## 🔒 Sicurezza

- ✅ HTTPS automatico
- ✅ CORS configurato per dominio specifico
- ✅ JWT Secret sicuro
- ✅ Variabili d'ambiente protette
- ✅ Database con autenticazione

## 🛠️ Troubleshooting

### Build Fallito
```bash
# Verifica le dipendenze
cd backend && npm install
cd frontend && npm install && npm run build
```

### Database Connection Error
- Verifica la connection string MongoDB
- Controlla che l'IP sia whitelistato in MongoDB Atlas
- Assicurati che le credenziali siano corrette

### CORS Error
- Verifica che il frontend URL sia aggiunto alla configurazione CORS
- Controlla che `REACT_APP_API_URL` punti al backend corretto

## 📝 Note Importanti

1. **Free Tier Limitations**: 
   - Backend può "dormire" dopo 15 minuti di inattività
   - Database MongoDB Atlas: 512MB limite

2. **Cold Start**: 
   - La prima richiesta dopo inattività può richiedere 30-60 secondi

3. **Monitoring**: 
   - Render fornisce logs in tempo reale
   - Health check automatico ogni 30 secondi

## 🚀 Deploy Locale per Testing

```bash
# Backend
cd backend
npm install
npm start

# Frontend  
cd frontend
npm install
npm start
```

Il progetto sarà disponibile su:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
