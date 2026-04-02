# 🎩 MON TAILLEUR - Documentation Complète

## Plateforme de Marketplace pour Tailleurs Africains

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture technique](#architecture-technique)
3. [Composants du système](#composants-du-système)
4. [Installation et configuration](#installation-et-configuration)
5. [API Reference](#api-reference)
6. [Déploiement](#déploiement)
7. [Sécurité](#sécurité)
8. [Maintenance](#maintenance)

---

## 🌟 Vue d'ensemble

**MON TAILLEUR** est une plateforme complète de marketplace connectant les tailleurs africains avec des clients du monde entier. La plateforme offre :

- 🎥 **Feed vidéo style TikTok** pour découvrir les créations
- 📏 **Prise de mesure par IA** (intelligence artificielle)
- 🛍️ **Marketplace** pour tissus et accessoires
- 💬 **Chat temps réel** entre clients et tailleurs
- 💰 **Paiement sécurisé** avec escrow (50% avant, 50% après)
- 🚚 **Suivi de livraison** en temps réel
- 👗 **Essayage virtuel** par IA

---

## 🏗️ Architecture technique

### Stack complet

```
┌─────────────────────────────────────────────────────────────────┐
│                        MON TAILLEUR                              │
├─────────────────────────────────────────────────────────────────┤
│  Mobile App (React Native)    │  Web Frontend (React)            │
│  - Feed vidéo                 │  - Dashboard Admin               │
│  - Prise de mesure IA         │  - Marketplace                   │
│  - Chat temps réel            │  - Gestion utilisateurs          │
└──────────────┬────────────────┴──────────────┬──────────────────┘
               │                               │
               └───────────────┬───────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   API Laravel       │
                    │   - Auth JWT        │
                    │   - REST API        │
                    │   - WebSockets      │
                    └──────────┬──────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
    ┌──────▼──────┐   ┌───────▼────────┐  ┌──────▼──────┐
    │  PostgreSQL │   │  Python AI     │  │  Firebase   │
    │  Database   │   │  - Mesures     │  │  - Push     │
    │             │   │  - Essayage    │  │  - Auth     │
    └─────────────┘   └────────────────┘  └─────────────┘
```

### Technologies utilisées

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Backend API | Laravel | 11.x |
| Frontend Web | React + TypeScript | 18.x |
| Mobile App | React Native (Expo) | 50.x |
| IA/Mesures | Python + FastAPI | 3.11+ |
| Base de données | PostgreSQL | 15+ |
| Cache | Redis | 7+ |
| Files d'attente | Laravel Queue + Redis | - |
| WebSockets | Laravel Echo + Socket.io | - |
| Notifications | Firebase Cloud Messaging | - |
| Stockage | Cloudinary | - |
| Paiement | CinetPay + Stripe | - |

---

## 📦 Composants du système

### 1. Backend Laravel (`/backend-laravel`)

Structure des dossiers :
```
backend-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── PaymentController.php
│   │   │   │   ├── ChatController.php
│   │   │   │   └── MeasurementController.php
│   │   │   └── Webhook/
│   │   ├── Middleware/
│   │   │   ├── JwtMiddleware.php
│   │   │   └── RoleMiddleware.php
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Order.php
│   │   ├── Product.php
│   │   ├── Measurement.php
│   │   ├── PortfolioItem.php
│   │   ├── Chat.php
│   │   ├── Message.php
│   │   ├── Dispute.php
│   │   └── Payment.php
│   ├── Services/
│   │   ├── PaymentService.php
│   │   ├── NotificationService.php
│   │   ├── MeasurementService.php
│   │   └── ChatService.php
│   └── Events/
│       ├── OrderCreated.php
│       ├── MessageSent.php
│       └── PaymentReceived.php
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
├── config/
│   ├── jwt.php
│   ├── cors.php
│   └── services.php
└── tests/
    ├── Feature/
    └── Unit/
```

### 2. Microservice Python IA (`/python-ai`)

Structure :
```
python-ai/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── measurements.py
│   │   └── virtual_tryon.py
│   ├── services/
│   │   ├── measurement_service.py
│   │   ├── pose_estimation.py
│   │   └── virtual_fitting.py
│   ├── models/
│   │   └── body_measurements.py
│   └── utils/
│       └── image_processing.py
├── requirements.txt
├── Dockerfile
└── README.md
```

### 3. Application Mobile React Native (`/mobile-reactnative`)

Structure :
```
mobile-reactnative/
├── src/
│   ├── components/
│   │   ├── Feed/
│   │   ├── Measurement/
│   │   ├── Chat/
│   │   └── Order/
│   ├── screens/
│   │   ├── Auth/
│   │   ├── Feed/
│   │   ├── Profile/
│   │   ├── Orders/
│   │   ├── Chat/
│   │   └── Marketplace/
│   ├── navigation/
│   ├── services/
│   ├── store/
│   ├── hooks/
│   └── utils/
├── assets/
├── App.js
└── app.json
```

### 4. Dashboard Admin React (`/web-admin`)

✅ **Déjà déployé** : https://hrni3y5rikjpc.ok.kimi.link

Fonctionnalités :
- Tableau de bord avec analytics
- Gestion des utilisateurs (clients, tailleurs, livreurs)
- Gestion des commandes
- Gestion des produits (marketplace)
- Gestion des litiges
- Chat support
- Paramètres système

---

## 🚀 Installation et configuration

### Prérequis

- PHP 8.2+
- Composer
- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- Redis
- Docker (optionnel)

### 1. Backend Laravel

```bash
cd backend-laravel

# Installer les dépendances
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Générer la clé JWT
php artisan jwt:secret

# Configurer la base de données dans .env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=montailleur
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Exécuter les migrations
php artisan migrate --seed

# Démarrer le serveur
php artisan serve
```

### 2. Microservice Python IA

```bash
cd python-ai

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Télécharger les modèles pré-entraînés
python scripts/download_models.py

# Démarrer le serveur
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Application Mobile

```bash
cd mobile-reactnative

# Installer les dépendances
npm install

# Démarrer avec Expo
npx expo start

# Pour Android
npx expo run:android

# Pour iOS (macOS uniquement)
npx expo run:ios
```

---

## 📡 API Reference

### Authentification

#### POST /api/auth/register
```json
{
  "firstName": "Jean",
  "lastName": "Kouassi",
  "email": "jean@example.com",
  "phone": "+2250123456789",
  "password": "password123",
  "role": "client"
}
```

#### POST /api/auth/login
```json
{
  "email": "jean@example.com",
  "password": "password123"
}
```

Réponse :
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "1",
      "firstName": "Jean",
      "lastName": "Kouassi",
      "role": "client"
    }
  }
}
```

### Utilisateurs

#### GET /api/users
Headers: `Authorization: Bearer {token}`

Query params:
- `role`: client|tailleur|livreur|admin
- `status`: active|inactive|suspended
- `search`: string
- `page`: number
- `per_page`: number

#### GET /api/users/{id}
#### PUT /api/users/{id}
#### DELETE /api/users/{id}

### Commandes

#### POST /api/orders
```json
{
  "tailleurId": "2",
  "items": [
    {
      "type": "custom",
      "portfolioItemId": "1",
      "quantity": 1
    }
  ],
  "measurements": {
    "height": 175,
    "chest": 102,
    "waist": 88,
    "hips": 98
  },
  "deliveryAddress": {
    "street": "Rue des Jardins",
    "city": "Abidjan",
    "country": "Côte d'Ivoire"
  }
}
```

#### GET /api/orders
#### GET /api/orders/{id}
#### PUT /api/orders/{id}/status
#### POST /api/orders/{id}/negotiate

### Paiements

#### POST /api/payments/initialize
```json
{
  "orderId": "1",
  "amount": 125000,
  "type": "deposit",
  "provider": "cinetpay"
}
```

#### POST /api/payments/webhook/cinetpay
#### POST /api/payments/webhook/stripe

### Mesures (IA)

#### POST /api/measurements/ai
```json
{
  "image": "base64_encoded_image",
  "height": 175
}
```

Réponse :
```json
{
  "success": true,
  "data": {
    "measurements": {
      "chest": 102,
      "waist": 88,
      "hips": 98,
      "shoulders": 46,
      "armLength": 64,
      "inseam": 82
    },
    "confidence": 94.5
  }
}
```

### Chat

#### GET /api/chats
#### POST /api/chats
#### GET /api/chats/{id}/messages
#### POST /api/chats/{id}/messages

WebSocket connection:
```javascript
const socket = io('wss://api.montailleur.com');
socket.emit('join-chat', { chatId: '1', token: 'jwt_token' });
socket.on('new-message', (message) => {
  console.log('New message:', message);
});
```

---

## 🌐 Déploiement

### Production (Recommandé)

#### Backend Laravel - Render/Railway

```yaml
# render.yaml
services:
  - type: web
    name: montailleur-api
    runtime: docker
    repo: https://github.com/your-org/montailleur
    branch: main
    dockerfilePath: ./backend-laravel/Dockerfile
    envVars:
      - key: APP_ENV
        value: production
      - key: DB_CONNECTION
        value: pgsql
      - key: DB_HOST
        fromDatabase:
          name: montailleur-db
          property: host
      - key: DB_PASSWORD
        fromDatabase:
          name: montailleur-db
          property: password
```

#### Python IA - Railway/Render

```dockerfile
# python-ai/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend - Vercel

```bash
# web-admin
vercel --prod

# web-marketplace
vercel --prod
```

#### Mobile - Expo EAS

```bash
cd mobile-reactnative

# Configurer EAS
eas login
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

---

## 🔒 Sécurité

### Authentification JWT

- Tokens avec expiration (24h)
- Refresh tokens (7 jours)
- Révocation possible

### Protection des routes

```php
// Middleware roles
Route::middleware(['jwt.auth', 'role:admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index']);
});
```

### Validation des données

```php
// Form Request validation
class StoreOrderRequest extends FormRequest
{
    public function rules()
    {
        return [
            'tailleurId' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.quantity' => 'required|integer|min:1',
        ];
    }
}
```

### Paiement sécurisé (Escrow)

```
1. Client paie 50% (acompte)
2. Fonds bloqués en escrow
3. Tailleur commence la confection
4. Livraison confirmée
5. Fonds libérés au tailleur
```

---

## 🔧 Maintenance

### Logs

```bash
# Laravel logs
tail -f storage/logs/laravel.log

# Nginx logs
tail -f /var/log/nginx/montailleur-error.log

# Application logs
php artisan log:clear
```

### Backup base de données

```bash
# PostgreSQL backup
pg_dump -U postgres montailleur > backup_$(date +%Y%m%d).sql

# Automatisation avec cron
0 2 * * * /usr/bin/pg_dump -U postgres montailleur > /backups/montailleur_$(date +\%Y\%m\%d).sql
```

### Monitoring

```bash
# Laravel Telescope (développement)
php artisan telescope:install

# Production monitoring
php artisan horizon
```

---

## 📞 Support

Pour toute question ou problème :

- Email: support@montailleur.com
- Documentation: https://docs.montailleur.com
- GitHub Issues: https://github.com/your-org/montailleur/issues

---

## 📄 Licence

Copyright © 2024 MON TAILLEUR. Tous droits réservés.

---

**Développé avec ❤️ pour la couture africaine**
