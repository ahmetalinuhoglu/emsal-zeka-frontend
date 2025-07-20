# Emsal Zeka - AI-Powered Legal Case Search

Modern bir web uygulaması ile Yargıtay emsal kararlarında arama yapın. OpenAI GPT entegrasyonu ile akıllı arama ve analiz.

## 🚀 Özellikler

- 🔍 **Akıllı Arama**: OpenAI GPT ile desteklenen semantik arama
- ⚖️ **Hukuki Analiz**: Sorgunuza uygun hukuki değerlendirme ve öneriler  
- 🎯 **Gelişmiş Filtreler**: Daire, kategori, tarih bazlı filtreleme
- 📱 **Responsive Tasarım**: Modern, kullanıcı dostu arayüz
- 🌙 **Dark Mode**: Göz yormayan karanlık tema desteği

## 🛠️ Teknolojiler

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Radix UI** - UI components

### Backend  
- **Python FastAPI** - Modern API framework
- **OpenAI API** - GPT-3.5-turbo entegrasyonu
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## 📦 Kurulum

### 1. Repository'yi Clone Edin

```bash
git clone <repo-url>
cd emsal-zeka-frontend
```

### 2. Backend Kurulumu

```bash
cd backend

# Python virtual environment oluşturun (önerilir)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate     # Windows

# Paketleri yükleyin
pip install -r requirements.txt

# Environment dosyasını oluşturun
cat > .env << EOL
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
EOL

# OpenAI API key'inizi .env dosyasına ekleyin!
```

### 3. Frontend Kurulumu

```bash
# Ana dizinde
npm install

# Environment dosyası oluşturun (opsiyonel)
cat > .env.local << EOL
BACKEND_URL=http://localhost:8000
EOL
```

## 🚀 Çalıştırma

### 1. Backend Server'ı Başlatın

```bash
cd backend
python start_server.py
```

Backend şu adreste çalışacak: http://localhost:8000
API Docs: http://localhost:8000/docs

### 2. Frontend'i Başlatın

```bash
# Ana dizinde
npm run dev
```

Frontend şu adreste çalışacak: http://localhost:3000

## 📋 Kullanım

1. **Basit Arama**: Ana arama kutusuna anahtar kelimeleri girin
2. **Detaylı Arama**: Durumunuzu detaylı olarak açıklayın, AI size önerilerde bulunacak
3. **Filtreler**: Yargıtay dairesi, kategori ve tarih filtrelerini kullanın
4. **Sonuçlar**: Bulunan emsal kararları ve AI analizini inceleyin

## ⚙️ Yapılandırma

### Environment Variables

#### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local) - Opsiyonel
```env
BACKEND_URL=http://localhost:8000
```

## 🔧 Geliştirme

### Backend
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```bash
npm run dev
```

### Type Checking
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📝 API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `POST /api/search` - Ana arama endpoint'i

Detaylı API dokümantasyonu: http://localhost:8000/docs

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## ⚠️ Önemli Notlar

- OpenAI API key'i gereklidir
- Backend ve frontend'in aynı anda çalışması gerekir
- İlk kullanımda `.env` dosyalarını doğru yapılandırın

## 🆘 Sorun Giderme

### "Backend bağlantısı kurulamadı" Hatası
- Backend server'ının çalıştığından emin olun
- Port 8000'in kullanılabilir olduğunu kontrol edin
- CORS ayarlarını kontrol edin

### OpenAI API Hatası  
- API key'in doğru olduğunu kontrol edin
- API quota'nızı kontrol edin
- İnternet bağlantınızı kontrol edin
