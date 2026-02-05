# 🇫🇷 Guide pour Hébergeurs Français - diginasss.fr

Guide spécifique pour remplacer WordPress par Next.js sur les principaux hébergeurs français.

---

## 🟢 OVH (Recommandé si vous êtes chez OVH)

### Option A : Hosting Web (mutualisé)

OVH supporte Node.js sur certains hébergements.

1. **Dans votre espace client OVH :**
   - Allez dans "Hébergements" > Votre hébergement
   - Activez "Node.js" si disponible
   - Spécifiez la version : `18.x` ou `20.x`

2. **Via FTP, uploadez :**
   - Tous les fichiers du projet
   - Le fichier `server.js` (déjà créé)
   - Le dossier `.next/` (après `npm run build` localement)

3. **Via SSH (si disponible) :**
   ```bash
   cd ~/www
   npm install
   npm run build
   ```

4. **Dans le panneau OVH :**
   - Définissez le point d'entrée : `server.js`
   - Définissez le port : `3000` (ou celui fourni par OVH)
   - Lancez l'application

### Option B : VPS OVH (plus de contrôle)

Si vous avez un VPS OVH, suivez le guide "Option 1" dans `REPLACE_WORDPRESS.md`.

---

## 🔵 Infomaniak

Infomaniak supporte Node.js sur ses hébergements.

1. **Dans le Manager Infomaniak :**
   - Allez dans "Web" > Votre site
   - Activez "Node.js"
   - Choisissez la version : `18.x` ou `20.x`

2. **Via FTP/SFTP :**
   - Uploadez tous les fichiers
   - Le fichier `server.js`
   - Le dossier `.next/` (après build local)

3. **Via SSH (si activé) :**
   ```bash
   cd ~/www
   npm install
   npm run build
   ```

4. **Dans le Manager :**
   - Définissez le script de démarrage : `server.js`
   - Démarrez l'application

---

## 🟡 Hostinger France

Hostinger supporte Node.js sur certains plans.

1. **Dans hPanel :**
   - Allez dans "Node.js"
   - Créez une nouvelle application
   - Version : `18.x` ou `20.x`

2. **Uploadez les fichiers via FTP**

3. **Dans hPanel :**
   - Définissez le fichier de démarrage : `server.js`
   - Démarrez l'application

---

## 🔴 1&1 IONOS

IONOS supporte Node.js sur certains hébergements.

1. **Dans le panneau de contrôle :**
   - Activez Node.js
   - Version : `18.x` ou `20.x`

2. **Uploadez les fichiers**

3. **Configurez le point d'entrée :** `server.js`

---

## ⚡ Solution Alternative : Vercel + DNS

**Si votre hébergeur ne supporte pas Node.js**, la meilleure solution est :

### 1. Déployer sur Vercel (gratuit)
- Suivez `QUICK_DEPLOY.md`
- Votre site sera sur `portfolio-nassia.vercel.app`

### 2. Modifier les DNS dans votre hébergeur

**Dans votre panneau d'hébergement (OVH, Infomaniak, etc.) :**

1. Allez dans "DNS" ou "Zone DNS"
2. Modifiez les enregistrements :

**Option A : Utiliser les nameservers de Vercel**
- Remplacez les nameservers par ceux de Vercel
- Vercel gère tout le DNS

**Option B : Garder votre DNS actuel**
- **Type A** : `@` → IP de Vercel (obtenue dans Vercel)
- **Type CNAME** : `www` → `cname.vercel-dns.com`

3. **Dans Vercel :**
   - Settings > Domains
   - Ajoutez `diginasss.fr` et `www.diginasss.fr`
   - Suivez les instructions

**Avantages :**
- ✅ Pas besoin de gérer Node.js
- ✅ Performance optimale
- ✅ HTTPS automatique
- ✅ Vous gardez votre hébergement pour autre chose

---

## 📋 Checklist selon votre situation

### Si votre hébergeur supporte Node.js :
- [ ] Activer Node.js dans le panneau
- [ ] Uploadez les fichiers (`.next/`, `public/`, `package.json`, `server.js`)
- [ ] Installer les dépendances (via SSH ou panneau)
- [ ] Configurer le point d'entrée : `server.js`
- [ ] Démarrer l'application

### Si votre hébergeur ne supporte PAS Node.js :
- [ ] Déployer sur Vercel
- [ ] Modifier les DNS pour pointer vers Vercel
- [ ] Configurer le domaine dans Vercel
- [ ] Attendre la propagation DNS (quelques heures)

---

## 🆘 Besoin d'aide spécifique ?

Indiquez-moi :
1. Votre hébergeur exact (OVH, Infomaniak, etc.)
2. Le type d'hébergement (mutualisé, VPS, etc.)
3. Si vous avez accès SSH
4. Si Node.js est disponible dans votre panneau

Et je pourrai vous donner des instructions plus précises !

