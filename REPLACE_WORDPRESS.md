# 🔄 Remplacer WordPress par Next.js sur diginasss.fr

Ce guide vous explique comment remplacer votre site WordPress existant par votre nouveau site Next.js sur le même domaine.

## 📋 Options selon votre hébergement

### Option 1 : Hébergement avec accès SSH/VPS (Recommandé)

Si vous avez un accès SSH à votre serveur :

#### Étape 1 : Préparer le build

```bash
# Sur votre machine locale
npm run build
```

#### Étape 2 : Transférer les fichiers sur le serveur

**Méthode A : Via FTP/SFTP (FileZilla, WinSCP, etc.)**

1. Connectez-vous à votre serveur via FTP/SFTP
2. Allez dans le dossier de votre site WordPress (généralement `public_html` ou `www`)
3. **Sauvegardez d'abord votre WordPress** (renommez le dossier en `wordpress_backup`)
4. Créez un nouveau dossier `nextjs` ou utilisez le dossier racine
5. Transférez ces fichiers/dossiers :
   - `.next/` (dossier de build)
   - `public/` (tous vos fichiers JSON et images)
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `node_modules/` (ou installez-les sur le serveur)

**Méthode B : Via Git (si Git est installé sur le serveur)**

```bash
# Sur votre serveur
cd /chemin/vers/votre/site
git clone https://github.com/VOTRE-USERNAME/portfolio_nass.git .
npm install
npm run build
```

#### Étape 3 : Installer Node.js sur le serveur

```bash
# Sur votre serveur (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

#### Étape 4 : Installer PM2 (gestionnaire de processus)

```bash
sudo npm install -g pm2
```

#### Étape 5 : Démarrer le site Next.js

```bash
cd /chemin/vers/votre/site
npm install
npm run build
pm2 start npm --name "diginasss" -- start
pm2 save
pm2 startup  # Suivez les instructions affichées
```

#### Étape 6 : Configurer le reverse proxy

**Si vous utilisez Apache :**

Créez/modifiez `.htaccess` dans le dossier racine :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

**OU mieux, configurez Apache pour proxy vers Node.js :**

Activez les modules nécessaires :
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
```

Créez `/etc/apache2/sites-available/diginasss.conf` :

```apache
<VirtualHost *:80>
    ServerName diginasss.fr
    ServerAlias www.diginasss.fr
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # Pour les fichiers statiques
    <LocationMatch "\.(ico|jpg|jpeg|png|gif|css|js|json|svg)$">
        ProxyPass !
        Alias /public /chemin/vers/votre/site/public
    </LocationMatch>
</VirtualHost>
```

Activez le site :
```bash
sudo a2ensite diginasss.conf
sudo systemctl restart apache2
```

**Si vous utilisez Nginx :**

Créez `/etc/nginx/sites-available/diginasss.fr` :

```nginx
server {
    listen 80;
    server_name diginasss.fr www.diginasss.fr;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Pour les fichiers statiques
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
    }
}
```

Activez le site :
```bash
sudo ln -s /etc/nginx/sites-available/diginasss.fr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Étape 7 : Configurer SSL (HTTPS)

```bash
sudo apt install certbot python3-certbot-apache  # Pour Apache
# OU
sudo apt install certbot python3-certbot-nginx   # Pour Nginx

sudo certbot --apache -d diginasss.fr -d www.diginasss.fr  # Pour Apache
# OU
sudo certbot --nginx -d diginasss.fr -d www.diginasss.fr   # Pour Nginx
```

---

### Option 2 : Hébergement mutualisé (cPanel, Plesk, etc.)

Si vous n'avez pas d'accès SSH mais un panneau de contrôle :

#### Méthode recommandée : Utiliser Vercel + Point DNS

1. **Déployez sur Vercel** (voir QUICK_DEPLOY.md)
2. **Dans votre panneau d'hébergement (cPanel/Plesk) :**
   - Allez dans "DNS" ou "Zone DNS"
   - Modifiez les enregistrements A et CNAME :
     - **Type A** : `@` → IP de Vercel (obtenue dans les paramètres Vercel)
     - **Type CNAME** : `www` → `cname.vercel-dns.com`
   - OU utilisez les nameservers de Vercel

3. **Dans Vercel :**
   - Allez dans "Settings" > "Domains"
   - Ajoutez `diginasss.fr` et `www.diginasss.fr`
   - Suivez les instructions DNS

**Avantages :**
- ✅ Pas besoin de gérer Node.js sur votre serveur
- ✅ Performance optimale
- ✅ HTTPS automatique
- ✅ Vous gardez votre hébergement pour d'autres projets

---

### Option 3 : Hébergement OVH/Infomaniak avec Node.js

Si votre hébergement supporte Node.js :

1. **Dans votre panneau d'hébergement :**
   - Activez Node.js
   - Spécifiez la version (18.x ou supérieure)
   - Définissez le point d'entrée : `server.js`

2. **Créez un fichier `server.js` à la racine :**

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

3. **Modifiez `package.json` :**

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

4. **Uploadez tous les fichiers** via FTP :
   - `.next/`
   - `public/`
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `server.js`
   - `node_modules/` (ou installez via SSH si disponible)

5. **Dans le panneau, lancez l'application Node.js**

---

## 🔄 Migration progressive (Recommandé)

Pour éviter les coupures :

### Phase 1 : Préparation
1. Déployez Next.js sur un sous-domaine : `next.diginasss.fr`
2. Testez tout
3. Vérifiez que tout fonctionne

### Phase 2 : Bascule
1. **Sauvegardez WordPress** (export de la base de données + fichiers)
2. Mettez WordPress en maintenance
3. Remplacez par Next.js
4. Testez
5. Si problème, restaurez WordPress rapidement

### Phase 3 : Nettoyage
1. Supprimez WordPress (après vérification)
2. Nettoyez les fichiers inutiles

---

## ⚠️ Points importants

### 1. Sauvegarde WordPress
**AVANT TOUT**, sauvegardez :
- Base de données WordPress
- Fichiers WordPress (wp-content, etc.)
- Fichiers de configuration

### 2. Redirections
Si vous avez des URLs WordPress importantes, créez des redirections dans `next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ancienne-page-wordpress',
        destination: '/nouvelle-page',
        permanent: true,
      },
    ];
  },
  // ... reste de la config
};
```

### 3. Emails/Formulaires
Si WordPress gérait des formulaires de contact, assurez-vous que votre formulaire Next.js fonctionne (voir `components/Contact.tsx`).

---

## 🆘 En cas de problème

### Restaurer WordPress rapidement
1. Renommez le dossier Next.js
2. Remettez WordPress à sa place
3. Redémarrez Apache/Nginx

### Logs utiles
```bash
# Logs PM2
pm2 logs diginasss

# Logs Apache
sudo tail -f /var/log/apache2/error.log

# Logs Nginx
sudo tail -f /var/log/nginx/error.log
```

---

## 📞 Support

Si vous avez besoin d'aide spécifique selon votre hébergeur :
- **OVH** : Support Node.js disponible
- **Infomaniak** : Support Node.js disponible
- **Autres** : Vérifiez la documentation de votre hébergeur

---

## ✅ Checklist finale

- [ ] WordPress sauvegardé
- [ ] Next.js testé localement (`npm run build`)
- [ ] Node.js installé sur le serveur
- [ ] Fichiers transférés
- [ ] PM2 configuré (si VPS)
- [ ] Reverse proxy configuré
- [ ] SSL/HTTPS configuré
- [ ] Site testé
- [ ] Redirections configurées (si nécessaire)
- [ ] WordPress supprimé (après vérification)

