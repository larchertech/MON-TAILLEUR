# 🎩 MON TAILLEUR - Plateforme Complète

[![Version](https://img.shields.io/badge/version-1.0.0-gold.svg)](https://github.com/your-org/montailleur)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **La plateforme de référence pour la couture africaine** - Connectez les meilleurs tailleurs avec des clients du monde entier.

---

## 🌟 Fonctionnalités

### Pour les Clients
- 🎥 **Feed vidéo style TikTok** - Découvrez les créations des tailleurs
- 📏 **Prise de mesure par IA** - Obtenez vos mesures précises en quelques secondes
- 👗 **Essayage virtuel** - Visualisez les vêtements avant commande
- 💬 **Chat temps réel** - Communiquez directement avec les tailleurs
- 🛍️ **Marketplace** - Achetez tissus et accessoires
- 🚚 **Suivi de livraison** - Suivez votre commande en temps réel
- 💰 **Paiement sécurisé** - Escrow avec 50% acompte, 50% à la livraison

### Pour les Tailleurs
- 📱 **Portfolio vidéo** - Présentez vos créations
- 💼 **Gestion de commandes** - Suivez vos commandes facilement
- 💬 **Négociation de prix** - Discutez les tarifs avec les clients
- 📊 **Analytics** - Suivez vos performances
- 🏪 **Boutique en ligne** - Vendez vos produits

### Pour les Administrateurs
- 📊 **Dashboard complet** - Analytics et statistiques en temps réel
- 👥 **Gestion des utilisateurs** - Clients, tailleurs, livreurs
- 📦 **Gestion des commandes** - Suivi de toutes les commandes
- ⚠️ **Gestion des litiges** - Résolution des conflits
- 💬 **Support chat** - Communication avec les utilisateurs

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        MON TAILLEUR                              │
├─────────────────────────────────────────────────────────────────┤
│  📱 Mobile App (React Native)  │  💻 Web (React)                 │
│  - Feed vidéo                  │  - Dashboard Admin              │
│  - Mesures IA                  │  - Marketplace                  │
│  - Chat                        │  - Analytics                    │
└──────────────┬─────────────────┴──────────────┬──────────────────┘
               │                                │
               └────────────────┬───────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   🚀 API Laravel      │
                    │   - Auth JWT          │
                    │   - REST API          │
                    │   - WebSockets        │
                    └───────────┬───────────┘
                                │
           ┌────────────────────┼────────────────────┐
           │                    │                    │
    ┌──────▼──────┐   ┌─────────▼──────────┐  ┌─────▼──────┐
    │  🐘 PostgreSQL  │   │  🐍 Python AI    │  │  🔥 Firebase│
    │  Database       │   │  - Mesures       │  │  - Push     │
    │                 │   │  - Essayage      │  │  - Auth     │
    └───────────────┘   └──────────────────┘  └────────────┘
```

---

## 📦 Structure du projet

```
montailleur/
├── 📁 backend-laravel/          # API REST Laravel
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── Dockerfile
│
├── 📁 python-ai/                # Microservice IA Python
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📁 web-admin/                # Dashboard Admin React
│   ├── src/
│   ├── dist/                    # ✅ Déployé
│   └── package.json
│
├── 📁 web-marketplace/          # Marketplace Web React
│   └── (à développer)
│
├── 📁 mobile-reactnative/       # App Mobile React Native
│   ├── src/
│   └── App.js
│
├── 📁 docs/                     # Documentation
│   └── README.md
│
├── docker-compose.yml           # Docker local
├── render.yaml                  # Déploiement Render
└── README.md                    # Ce fichier
```

---

## 🚀 Démarrage rapide

### Prérequis

- PHP 8.2+
- Composer
- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- Redis
- Docker (optionnel)

### Installation avec Docker (Recommandé)

```bash
# Cloner le repository
git clone https://github.com/your-org/montailleur.git
cd montailleur

# Lancer avec Docker Compose
docker-compose up -d

# Exécuter les migrations
docker-compose exec api php artisan migrate --seed

# Accéder aux services
# API: http://localhost
# AI Service: http://localhost:8000
# Admin: https://hrni3y5rikjpc.ok.kimi.link (déployé)
```

### Installation manuelle

Voir la [documentation complète](./docs/README.md) pour les instructions détaillées.

---

## 🔗 Liens

| Service | URL | Statut |
|---------|-----|--------|
| Dashboard Admin | https://hrni3y5rikjpc.ok.kimi.link | ✅ En ligne |
| API Documentation | https://montailleur-api.onrender.com/docs | 🚧 En développement |
| AI Service | https://montailleur-ai.onrender.com | 🚧 En développement |
| Mobile App | Expo Store | 🚧 En développement |

---

## 📡 API Endpoints

### Authentification
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Utilisateurs
```
GET    /api/users
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### Commandes
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/{id}
PUT    /api/orders/{id}/status
POST   /api/orders/{id}/negotiate
```

### Mesures (IA)
```
POST   /api/measurements/ai
```

### Chat
```
GET    /api/chats
POST   /api/chats/{id}/messages
WS     wss://api.montailleur.com/ws
```

---

## 🛠️ Technologies

| Couche | Technologie |
|--------|-------------|
| Backend | Laravel 11, PHP 8.2 |
| Frontend | React 18, TypeScript, Tailwind CSS |
| Mobile | React Native, Expo |
| IA | Python, FastAPI, MediaPipe, TensorFlow |
| Base de données | PostgreSQL 15 |
| Cache | Redis 7 |
| Files | Laravel Queue |
| WebSockets | Laravel Echo, Socket.io |
| Notifications | Firebase Cloud Messaging |
| Stockage | Cloudinary |
| Paiement | CinetPay, Stripe |

---

## 📊 Schéma de base de données

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │────<│   orders    │>────│   products  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ first_name  │     │ order_number│     │ name        │
│ last_name   │     │ client_id   │     │ price       │
│ email       │     │ tailleur_id │     │ stock       │
│ role        │     │ status      │     │ vendor_id   │
│ status      │     │ total_amount│     └─────────────┘
└─────────────┘     └─────────────┘
        │                   │
        │            ┌──────┴──────┐
        │            │ order_items │
        │            ├─────────────┤
        │            │ id          │
        │            │ order_id    │
        │            │ product_id  │
        │            │ quantity    │
        │            └─────────────┘
        │
        └────>┌─────────────┐
              │ measurements│
              ├─────────────┤
              │ id          │
              │ user_id     │
              │ height      │
              │ chest       │
              │ waist       │
              │ hips        │
              │ method      │
              └─────────────┘
```

---

## 📝 Roadmap

### ✅ Complété
- [x] Architecture du projet
- [x] Dashboard Admin React
- [x] Structure Backend Laravel
- [x] Microservice Python IA
- [x] Documentation

### 🚧 En cours
- [ ] API Laravel complète
- [ ] Intégration paiement CinetPay/Stripe
- [ ] WebSockets temps réel
- [ ] App Mobile React Native

### 📅 À venir
- [ ] Marketplace Web
- [ ] Essayage virtuel IA avancé
- [ ] Application iOS/Android native
- [ ] Intégration réseaux sociaux
- [ ] Programme de fidélité

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines.

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](./LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [Laravel](https://laravel.com)
- [React](https://reactjs.org)
- [React Native](https://reactnative.dev)
- [MediaPipe](https://mediapipe.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

<p align="center">
  <strong>Développé avec ❤️ pour la couture africaine</strong>
</p>

<p align="center">
  © 2024 MON TAILLEUR. Tous droits réservés.
</p>
