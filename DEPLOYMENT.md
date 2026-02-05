# Guide de Déploiement - Portfolio Nassia

Ce guide vous explique comment déployer votre site Next.js sur différents hébergeurs.

## 📋 Prérequis

1. Un compte GitHub (recommandé)
2. Node.js installé localement (pour tester le build)
3. Un compte sur l'hébergeur de votre choix

---

## 🚀 Option 1 : Vercel (Recommandé - Gratuit)

Vercel est l'hébergeur créé par l'équipe Next.js. C'est la solution la plus simple et la plus adaptée.

### Étapes :

1. **Préparer votre code :**
   ```bash
   # Tester le build localement
   npm run build
   
   # Si le build fonctionne, vous êtes prêt !
   ```

2. **Pousser votre code sur GitHub :**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/portfolio_nass.git
   git push -u origin main
   ```

3. **Déployer sur Vercel :**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up" et connectez-vous avec GitHub
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub
   - Vercel détecte automatiquement Next.js
   - Cliquez sur "Deploy"
   - Votre site sera en ligne en 2-3 minutes !

4. **Configuration automatique :**
   - Vercel configure automatiquement :
     - Les variables d'environnement
     - Le domaine HTTPS
     - Les builds automatiques à chaque push

**Avantages :**
- ✅ Gratuit pour les projets personnels
- ✅ Déploiement automatique à chaque push
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Optimisé pour Next.js

---

## 🌐 Option 2 : Netlify (Gratuit)

### Étapes :

1. **Préparer votre code** (même chose que Vercel)

2. **Pousser sur GitHub**

3. **Déployer sur Netlify :**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "Sign up" et connectez-vous avec GitHub
   - Cliquez sur "Add new site" > "Import an existing project"
   - Sélectionnez votre repository
   - Configuration :
     - **Build command :** `npm run build`
     - **Publish directory :** `.next`
     - Cliquez sur "Deploy site"

**Note :** Pour Next.js, Netlify nécessite le plugin `@netlify/plugin-nextjs` :
```bash
npm install --save-dev @netlify/plugin-nextjs
```

Créez un fichier `netlify.toml` à la racine :
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 🖥️ Option 3 : Hébergement VPS/Serveur (OVH, DigitalOcean, etc.)

Si vous avez un serveur VPS, voici comment déployer :

### Étapes :

1. **Sur votre machine locale :**
   ```bash
   # Build de production
   npm run build
   ```

2. **Sur votre serveur :**
   ```bash
   # Installer Node.js (version 18 ou supérieure)
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Installer PM2 (gestionnaire de processus)
   sudo npm install -g pm2
   
   # Cloner votre repository
   git clone https://github.com/VOTRE-USERNAME/portfolio_nass.git
   cd portfolio_nass
   
   # Installer les dépendances
   npm install
   
   # Build
   npm run build
   
   # Démarrer avec PM2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

3. **Configurer Nginx (reverse proxy) :**
   ```bash
   sudo apt install nginx
   ```

   Créez `/etc/nginx/sites-available/portfolio` :
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Activez le site :
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Configurer SSL avec Let's Encrypt :**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d votre-domaine.com
   ```

---

## 🔧 Configuration importante

### 1. Variables d'environnement

Si vous avez des variables d'environnement, créez un fichier `.env.local` :
```env
# Exemple (si nécessaire)
NEXT_PUBLIC_API_URL=https://votre-api.com
```

**Sur Vercel/Netlify :** Ajoutez ces variables dans les paramètres du projet.

### 2. Fichier `.gitignore`

Assurez-vous que votre `.gitignore` contient :
```
node_modules
.next
.env*.local
.DS_Store
*.log
```

### 3. Script de build

Votre `package.json` contient déjà les scripts nécessaires :
- `npm run build` : Crée le build de production
- `npm start` : Lance le serveur de production

---

## ✅ Checklist avant déploiement

- [ ] Tester le build localement : `npm run build`
- [ ] Vérifier qu'il n'y a pas d'erreurs
- [ ] Tester le site en production localement : `npm start`
- [ ] Vérifier que toutes les images se chargent
- [ ] Tester les fonctionnalités (formulaires, navigation, etc.)
- [ ] Vérifier que les fichiers JSON dans `/public` sont accessibles
- [ ] S'assurer que le fichier `.gitignore` est correct

---

## 🐛 Résolution de problèmes

### Erreur "Module not found"
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur de build
```bash
# Vérifier les erreurs TypeScript
npm run lint

# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

### Images ne se chargent pas
Vérifiez que `next.config.js` autorise les domaines d'images externes (déjà configuré avec `remotePatterns`).

---

## 📝 Recommandation

**Pour un portfolio personnel, je recommande Vercel :**
- ✅ Gratuit
- ✅ Configuration automatique
- ✅ Déploiement en 2 minutes
- ✅ Optimisé pour Next.js
- ✅ HTTPS automatique
- ✅ Domaine personnalisé gratuit

---

## 🔗 Liens utiles

- [Documentation Next.js - Déploiement](https://nextjs.org/docs/deployment)
- [Vercel - Guide de déploiement](https://vercel.com/docs)
- [Netlify - Guide Next.js](https://docs.netlify.com/integrations/frameworks/nextjs/)

---

## 💡 Astuce

Après le déploiement, vous pouvez configurer un domaine personnalisé dans les paramètres de votre hébergeur (Vercel/Netlify). C'est généralement gratuit et prend quelques minutes à configurer.

