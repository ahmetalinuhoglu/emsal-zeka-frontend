# 🚀 Deployment Guide

## Environment Configuration

### Development
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`

### Production  
- **Frontend**: Vercel (`https://your-app.vercel.app`)
- **Backend**: Railway (`https://your-app.railway.app`)

---

## 🎯 Frontend Deployment (Vercel)

### 1. Repository'yi Vercel'e Bağlayın
```bash
# Vercel CLI ile (opsiyonel)
npm i -g vercel
vercel
```

### 2. Environment Variables (Vercel Dashboard)
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
NEXT_PUBLIC_ENVIRONMENT=production
```

### 3. Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 🛤️ Backend Deployment (Railway)

### 1. Railway'e Deploy
```bash
# Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```

### 2. Environment Variables (Railway Dashboard)
```env
OPENAI_API_KEY=sk-your-openai-key-here
ENVIRONMENT=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=8000
```

### 3. Railway Settings
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Health Check**: `/health`

---

## 📋 Deployment Checklist

### Backend (Railway)
- [ ] Repository Railway'e bağlandı
- [ ] Environment variables ayarlandı
- [ ] OpenAI API key eklendi  
- [ ] FRONTEND_URL production URL'e güncellendi
- [ ] Health check çalışıyor (`/health`)

### Frontend (Vercel)
- [ ] Repository Vercel'e bağlandı
- [ ] `NEXT_PUBLIC_BACKEND_URL` Railway URL'ine ayarlandı
- [ ] Build başarılı
- [ ] Production'da backend'e bağlanıyor

### Testing
- [ ] Production frontend açılıyor
- [ ] Arama formu çalışıyor
- [ ] Backend'e istek gidiyor
- [ ] OpenAI API cevap veriyor
- [ ] Error handling çalışıyor

---

## 🔧 Configuration Files

### `src/lib/config.ts`
Otomatik environment detection:
```typescript
// Development: http://localhost:8000  
// Production: https://your-app.railway.app
```

### `backend/config.py`
Environment-aware CORS:
```python
# Development: localhost origins
# Production: Vercel + preview domains  
```

---

## 🐛 Troubleshooting

### CORS Errors
- Railway backend URL'ini Vercel env vars'a ekleyin
- Vercel URL'ini Railway env vars'a ekleyin

### OpenAI Errors
- API key'in doğru olduğunu kontrol edin
- API quota'nızı kontrol edin

### Build Errors
- Node.js versiyonunu kontrol edin (.nvmrc)
- Dependencies'leri kontrol edin

---

## 📞 URLs

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Production
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app` 
- API Docs: `https://your-app.railway.app/docs`

---

## 🔄 CI/CD

### Auto Deploy
- **Vercel**: Git push → auto deploy
- **Railway**: Git push → auto deploy

### Preview Deployments  
- **Vercel**: PR'lar için otomatik preview
- **Railway**: Branch deployments (opsiyonel) 