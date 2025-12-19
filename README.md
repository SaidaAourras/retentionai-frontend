# RetentionAI Frontend

## 📋 Vue d'ensemble

**RetentionAI Frontend** est l'interface utilisateur web permettant aux managers RH d'interagir avec le système de prédiction et de rétention des employés. L'application offre une expérience utilisateur moderne et intuitive pour :

- S'authentifier de manière sécurisée
- Saisir les informations d'un employé
- Visualiser le risque de départ prédit
- Consulter automatiquement un plan de rétention personnalisé

## 🎯 Objectifs

- Offrir une interface intuitive pour les équipes RH
- Faciliter la saisie et la validation des données employés
- Visualiser clairement les prédictions et recommandations
- Garantir une authentification sécurisée (JWT)
- Assurer une expérience responsive (mobile-first)

## 🏗️ Architecture

```
retentionai-frontend/
├── .next/                      # Build Next.js (généré)
├── node_modules/               # Dépendances npm
├── public/
│   └── favicon.ico             # Favicon de l'application
├── src/
│   └── app/
│       ├── login/
│       │   └── page.jsx        # Page de connexion
│       ├── register/
│       │   └── page.jsx        # Page d'inscription
│       ├── retention/
│       │   └── page.jsx        # Page principale - Prédiction
│       ├── favicon.ico
│       ├── globals.css         # Styles globaux
│       ├── layout.js           # Layout principal
│       └── page.js             # Page d'accueil
├── .gitignore
├── Dockerfile                  # Configuration Docker
├── eslint.config.mjs           # Configuration ESLint
├── jsconfig.json               # Configuration JavaScript
├── next.config.mjs             # Configuration Next.js
├── package.json                # Dépendances et scripts
├── package-lock.json
├── postcss.config.mjs          # Configuration PostCSS
├── README.md
└── yarn.lock
```

## 🚀 Fonctionnalités

### 1. Authentification

#### Page de Connexion (`/login`)
- Formulaire de connexion sécurisé
- Validation côté client
- Gestion des erreurs d'authentification
- Stockage du token JWT dans localStorage/cookies
- Redirection automatique après connexion réussie

#### Page d'Inscription (`/register`)
- Création de nouveau compte utilisateur RH
- Validation des champs (username, password)
- Confirmation de mot de passe
- Feedback visuel en temps réel
- Redirection vers login après inscription

### 2. Module de Prédiction et Rétention (`/retention`)

**Fonctionnalités principales :**

1. **Formulaire de saisie employé**
   - Données démographiques (âge, genre)
   - Informations professionnelles (département, rôle, ancienneté)
   - Métriques de performance et satisfaction
   - Validation en temps réel des champs

2. **Affichage de la prédiction**
   - Probabilité de départ en pourcentage

3. **Plan de rétention automatique**
   - Génération automatique si risque > 50%
   - Affichage des 3 actions recommandées
   - Format clair et actionnable

4. **Historique des prédictions** (à venir)
   - Liste des dernières analyses effectuées
   - Filtres par département, date, niveau de risque
   - Export des données

### 3. Interface Utilisateur

**Design System :**
- Design moderne et épuré
- Composants réutilisables
- Palette de couleurs cohérente avec la thématique RH
- Typographie professionnelle
- Feedback visuel sur toutes les interactions

**Responsive Design :**
- Mobile-first approach
- Adaptation tablette et desktop
- Navigation optimisée sur tous devices

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 14+ (App Router)
- **Language** : JavaScript/JSX
- **Styling** : CSS Modules / Tailwind CSS (selon implémentation)
- **État global** : React Context API ou Zustand
- **HTTP Client** : Fetch API
- **Validation** : React Hook Form
- **Authentification** : JWT (stockage sécurisé)
- **Build** : Next.js optimized build
- **Déploiement** : Docker

## 📦 Installation

### Prérequis
- Node.js 18+ et npm/yarn
- Backend RetentionAI en cours d'exécution
- Docker (optionnel)

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/votre-org/retentionai-frontend.git
cd retentionai-frontend
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configuration des variables d'environnement**
```bash
cp .env.example .env.local
```

4. **Lancer en mode développement**
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

5. **Build pour la production**
```bash
npm run build
npm start
```

### Installation avec Docker

```bash
# Build de l'image
docker build -t retentionai-frontend .

# Lancement du conteneur
docker run -p 3000:3000 retentionai-frontend
```

### Avec Docker Compose (full stack)

```bash
# Depuis la racine du projet (si backend et frontend sont ensemble)
docker-compose up --build
```

## 🎨 Structure des Pages

### 1. Page d'Accueil (`/`)
- Landing page présentant RetentionAI
- Boutons CTA vers Login/Register
- Statistiques clés
- Avantages de la solution

### 2. Login (`/login`)
```jsx
// Exemple de structure
- Header avec logo
- Formulaire centré
  - Champ username
  - Champ password
  - Bouton "Se connecter"
  - Lien vers Register
- Footer avec mentions légales
```

### 3. Register (`/register`)
```jsx
// Similaire à Login avec :
- Champs username
- Email 
- Password
- Bouton "Créer un compte"
- Lien retour vers Login
```

### 4. Retention Dashboard (`/retention`)
```jsx
// Layout principal
- Sidebar de navigation
- Header avec user info + logout
- Zone principale :
  - Formulaire employé (gauche/haut)
  - Résultats de prédiction (droite/bas)
  - Plan de rétention (si risque > 50%)
```


### Stockage du Token JWT

**Option 1 : localStorage** (implémentation actuelle recommandée)
```javascript
// Après login réussi
localStorage.setItem('token', response.data.access_token);

// Pour les requêtes API
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```





## 🎨 Styles et Design

### Palette de couleurs suggérée

```css
:root {
  --primary: #3b82f6;      /* Bleu principal */
  --secondary: #8b5cf6;    /* Violet */
  --success: #10b981;      /* Vert (risque faible) */
  --warning: #f59e0b;      /* Orange (risque moyen) */
  --danger: #ef4444;       /* Rouge (risque élevé) */
  --background: #f9fafb;   /* Fond clair */
  --text-primary: #111827; /* Texte principal */
  --text-secondary: #6b7280; /* Texte secondaire */
}
```

### Composants UI recommandés

- Buttons (primary, secondary, danger)
- Input fields avec validation visuelle
- Cards pour affichage des résultats



## 🚀 Déploiement

### Build de production

```bash
npm run build
```


### Docker en production

```dockerfile
# Dockerfile optimisé
# ---- stage build --------

FROM node:20.9.0-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ----- stage production ---------
FROM node:20.9.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copier package.json
COPY --from=builder /app/package.json ./

# Installer les dépendances de production
RUN npm install --production --frozen-lockfile

# Copier les fichiers buildés
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public


EXPOSE 3000

CMD ["npm" , "start"]
```



### Outils de développement

- React 
- Next.js



## 👥 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/NewFeature`)
3. Commit vos changements (`git commit -m 'Add NewFeature'`)
4. Push vers la branche (`git push origin feature/NewFeature`)
5. Ouvrir une Pull Request





**Développé avec ❤️ par l'équipe RetentionAI**