# Mode d'emploi : déployer le portfolio sur un VPS IONOS

Ce guide explique **étape par étape** comment mettre en ligne ce projet (Next.js) sur ton VPS IONOS, en partant de zéro (sans avoir jamais utilisé de VPS).

---

## Tes données de connexion (VPS IONOS)

| Élément | Valeur |
|--------|--------|
| **Hôte / IP** | `87.106.30.74` |
| **Utilisateur** | `root` |
| **Mot de passe** | Voir l’espace client IONOS → ton VPS → **Afficher mot de passe** (ne pas le mettre dans ce fichier si tu le partages ou le déposes sur un dépôt). |
| **Système** | Ubuntu 24.04 |
| **Type VPS** | vps 2 2 80 (2 vCore, 2 Go RAM, 80 Go NVMe SSD) |
| **IPv4** | 87.106.30.74 |
| **IPv6** | Aucune |
| **Pare-feu IONOS** | Stratégies de pare-feu → « My firewall policy » : vérifier que les ports **22** (SSH), **80** (HTTP) et **443** (HTTPS) sont autorisés en entrée. |

**Connexion SSH à utiliser :**

```bash
ssh root@87.106.30.74
```

---

## Sommaire

1. [C'est quoi un VPS ?](#1-cest-quoi-un-vps-)
2. [Ce dont tu as besoin avant de commencer](#2-ce-dont-tu-as-besoin-avant-de-commencer)
3. [Créer et démarrer ton VPS IONOS](#3-créer-et-démarrer-ton-vps-ionos)
4. [Te connecter au VPS en SSH](#4-te-connecter-au-vps-en-ssh)
5. [Première configuration du serveur](#5-première-configuration-du-serveur)
6. [Installer Node.js](#6-installer-nodejs)
7. [Déployer l'application](#7-déployer-lapplication)
8. [Faire tourner l'app en permanence (PM2)](#8-faire-tourner-lapp-en-permanence-pm2)
9. [Installer Nginx (serveur web)](#9-installer-nginx-serveur-web)
10. [Mettre un nom de domaine et HTTPS](#10-mettre-un-nom-de-domaine-et-https)
11. [Commandes utiles et dépannage](#11-commandes-utiles-et-dépannage)

---

## 1. C'est quoi un VPS ?

Un **VPS** (Virtual Private Server) est un petit serveur Linux qui t’appartient. Tu peux y installer ce que tu veux (Node.js, base de données, etc.) et y faire tourner ton site 24h/24.  
IONOS te donne une **adresse IP** et un accès **SSH** pour te connecter en ligne de commande.

---

## 2. Ce dont tu as besoin avant de commencer

- Ton **VPS IONOS** est déjà créé : IP **87.106.30.74**, utilisateur **root**, Ubuntu 24.04 (voir tableau ci-dessus).
- Le **mot de passe root** se trouve dans l’espace client IONOS (Afficher mot de passe).
- Un **terminal** sur ton PC (PowerShell, CMD, WSL, ou le terminal intégré de VS Code).
- Optionnel : un **nom de domaine** (ex. `monsite.fr`) pointant vers **87.106.30.74**.

---

## 3. Ton VPS IONOS (déjà en place)

Ton VPS est déjà créé avec :
- **IP** : 87.106.30.74  
- **Utilisateur** : root  
- **Système** : Ubuntu 24.04  
- **Ressources** : 2 vCore, 2 Go RAM, 80 Go NVMe SSD  

Le mot de passe root se récupère dans l’espace client IONOS → ton VPS → **Afficher mot de passe**.

**Pare-feu IONOS** : dans **Stratégies de pare-feu** (« My firewall policy »), assure-toi que les ports **22** (SSH), **80** (HTTP) et **443** (HTTPS) sont autorisés en entrée, sinon tu ne pourras pas te connecter en SSH ni servir le site.

---

## 4. Te connecter au VPS en SSH

**SSH** = connexion sécurisée en ligne de commande à ton serveur.

### Sous Windows (PowerShell ou CMD)

Ouvre **PowerShell** ou **Invite de commandes** et exécute :

```bash
ssh root@87.106.30.74
```

- À la question **« Are you sure you want to continue connecting? »** → tape `yes` puis Entrée.
- Quand on te demande le mot de passe → colle le **mot de passe root** (celui affiché dans l’espace client IONOS ; rien ne s’affiche à l’écran, c’est normal) puis Entrée.

Tu es connecté quand tu vois quelque chose comme :

```text
root@...:~#
```

Tu es alors **sur le serveur**, plus sur ton PC.

### Sous Mac / Linux (ou WSL sur Windows)

Même commande dans le terminal :

```bash
ssh root@87.106.30.74
```

---

## 5. Première configuration du serveur

Une fois connecté en SSH, exécute ces commandes **une par une**.

### 5.1 Mettre à jour le système

```bash
apt update && apt upgrade -y
```

Cela peut prendre quelques minutes.

### 5.2 Changer le mot de passe root (recommandé)

```bash
passwd
```

Saisis deux fois un nouveau mot de passe fort (tu ne le reverras pas à l’écran).

### 5.3 Créer un utilisateur (optionnel mais conseillé)

Tu peux tout faire en `root`, mais pour la suite du guide on reste en `root` pour simplifier. Si tu veux un utilisateur dédié :

```bash
adduser deploy
usermod -aG sudo deploy
```

Puis te connecter avec : `ssh deploy@87.106.30.74` et utiliser `sudo` devant les commandes admin.

### 5.4 Configurer le pare-feu (UFW)

**Important** : IONOS a aussi un pare-feu (« Stratégies de pare-feu » / My firewall policy). Vérifie dans l’espace client que les ports **22**, **80** et **443** sont autorisés en entrée. Sinon, même avec UFW correct, le trafic sera bloqué avant d’atteindre ton VPS.

Sur le serveur, autoriser SSH puis HTTP/HTTPS avec UFW :

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

À la question « Proceed with operation? » → `y` puis Entrée.

Vérifier :

```bash
ufw status
```

Tu dois voir `80` et `443` en « ALLOW ».

---

## 6. Installer Node.js

L’application est en **Next.js**, donc il faut **Node.js** sur le VPS.

### 6.1 Installer Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

### 6.2 Vérifier l’installation

```bash
node -v
npm -v
```

Tu dois voir une version de Node (ex. `v20.x.x`) et de npm (ex. `10.x.x`).

---

## 7. Déployer l’application

Deux façons : **depuis Git** (si le projet est sur GitHub/GitLab) ou **en envoyant les fichiers**.

### Option A : Déployer avec Git (recommandé)

#### 7.1 Installer Git

```bash
apt install -y git
```

#### 7.2 Cloner le projet

Remplace `URL_DE_TON_REPO` par l’URL de ton dépôt (ex. `https://github.com/ton-user/portfolio_nass.git`) :

```bash
cd /var
mkdir www


git clone URL_DE_TON_REPO portfolio
cd portfolio
```

Si le dépôt est **privé**, tu devras soit utiliser un **token** dans l’URL, soit configurer une clé SSH sur le VPS pour GitHub/GitLab.

#### 7.3 Installer les dépendances et construire

```bash
npm ci
npm run build
```

`npm run build` peut prendre 1 à 2 minutes. À la fin, tu dois voir « Compiled successfully » (ou équivalent).

### Option B : Envoyer les fichiers (sans Git)

1. Sur ton PC, dans le dossier du projet, crée une archive **sans** `node_modules` ni `.next` :
   - Supprime (ou n’inclue pas) les dossiers `node_modules` et `.next`.
   - Compresse le reste en `.zip`.

2. Envoie le fichier sur le VPS avec **SCP** (depuis ton PC, dans un terminal) :

   ```bash
   scp chemin/vers/ton-projet.zip root@87.106.30.74:/var/www/
   ```

3. Sur le VPS :

   ```bash
   cd /var/www
   apt install -y unzip
   unzip ton-projet.zip -d portfolio
   cd portfolio
   npm ci
   npm run build
   ```

---

## 8. Faire tourner l’app en permanence (PM2)

Sans outil, dès que tu fermes la session SSH, l’app s’arrête. **PM2** permet de lancer Next.js comme un service qui redémarre tout seul.

### 8.1 Installer PM2

```bash
npm install -g pm2
```

### 8.2 Démarrer l’application avec PM2

Depuis le dossier du projet (ex. `/var/www/portfolio`) :

```bash
cd /var/www/portfolio
pm2 start npm --name "portfolio" -- start
```

Par défaut Next.js écoute sur le port **3000**. Si ton `package.json` utilise un autre port (ex. `3001`), adapte le script start ou utilise :

```bash
pm2 start npm --name "portfolio" -- start -- -p 3000
```

### 8.3 Vérifier que ça tourne

```bash
pm2 status
pm2 logs portfolio
```

Tu dois voir « online » et des logs. Pour quitter les logs : `Ctrl+C`.

### 8.4 Démarrer PM2 au redémarrage du serveur

```bash
pm2 startup
pm2 save
```

Exécute la commande que PM2 affiche (souvent `sudo env PATH=...`). Après ça, ton app redémarrera après un reboot du VPS.

---

## 9. Installer Nginx (serveur web)

Next.js tourne sur le port **3000**. Nginx va :
- Écouter sur les ports **80** (HTTP) et **443** (HTTPS),
- Rediriger les visiteurs vers ton app sur le port 3000.

### 9.1 Installer Nginx

```bash
apt install -y nginx
```

### 9.2 Créer la configuration du site

Tu peux utiliser soit ton **nom de domaine** (ex. `portfolio.monsite.fr`), soit l’**IP du VPS** (`87.106.30.74`) si tu n’as pas encore de domaine.

```bash
nano /etc/nginx/sites-available/portfolio
```

Colle cette configuration. Pour l’instant, avec l’IP uniquement :

```nginx
server {
    listen 80;
    server_name 87.106.30.74;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- **Quand tu auras un domaine** : remplace `87.106.30.74` par ton domaine (ex. `portfolio.monsite.fr`) dans `server_name`, ou ajoute-le à côté : `server_name 87.106.30.74 portfolio.monsite.fr;`
- **Pour accepter toute requête** sur ce serveur : mets `server_name _;`
- Sauvegarde : `Ctrl+O`, Entrée, puis `Ctrl+X` pour quitter.

### 9.3 Activer le site et recharger Nginx

**Important :** pour éviter l’avertissement « conflicting server name … on 0.0.0.0:80, ignored », désactive le site par défaut de Nginx (il utilise aussi le port 80) :

```bash
rm /etc/nginx/sites-enabled/default
```

Ensuite :

```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

`nginx -t` doit afficher « syntax is ok » (sans warning de conflit).

### 9.4 Tester

Ouvre un navigateur et va sur :

- **`http://87.106.30.74`**  
ou  
- **`http://TON_DOMAINE`** si tu as déjà pointé le domaine vers 87.106.30.74.

Tu dois voir ton portfolio.

---

## 10. Mettre un nom de domaine et HTTPS

### 10.1 Pointer le domaine vers le VPS

Dans l’espace client IONOS (ou chez ton registrar) :

1. Va dans la gestion DNS du domaine.
2. Crée ou modifie un enregistrement **A** :
   - **Nom / sous-domaine** : `@` pour la racine (ex. `monsite.fr`) ou `portfolio` pour `portfolio.monsite.fr`.
   - **Cible / valeur** : **87.106.30.74** (IP de ton VPS).
   - TTL : 300 ou 3600.

Attends 5 à 30 minutes (parfois plus) que la propagation soit faite.

### 10.2 Installer un certificat SSL (HTTPS) avec Let’s Encrypt

Sur le VPS, installe Certbot :

```bash
apt install -y certbot python3-certbot-nginx
```

Puis demande un certificat (remplace par ton vrai domaine) :

```bash
certbot --nginx -d TON_DOMAINE
```

Exemple : `certbot --nginx -d portfolio.monsite.fr`

- Indique ton email quand demandé.
- Accepte les conditions si demandé.
- Choisis de rediriger le HTTP vers HTTPS (option 2) si proposé.

Certbot modifie automatiquement la config Nginx pour le HTTPS. Vérifie :

```bash
nginx -t
systemctl reload nginx
```

Renouvellement automatique (déjà prévu par défaut) :

```bash
certbot renew --dry-run
```

Tu peux maintenant ouvrir `https://TON_DOMAINE` : le cadenas doit s’afficher.

---

## 11. Commandes utiles et dépannage

### PM2

| Action              | Commande                |
|---------------------|--------------------------|
| Voir le statut       | `pm2 status`             |
| Voir les logs        | `pm2 logs portfolio`     |
| Redémarrer l’app     | `pm2 restart portfolio`  |
| Arrêter l’app        | `pm2 stop portfolio`     |
| Supprimer du PM2     | `pm2 delete portfolio`   |

### Après une mise à jour du code (avec Git)

```bash
cd /var/www/portfolio
git pull
npm ci
npm run build
pm2 restart portfolio
```

### Vérifier les ports

```bash
ss -tlnp | grep -E '80|443|3000'
```

Tu dois voir Nginx sur 80/443 et Node sur 3000.

### Logs Nginx

- Erreurs : `tail -f /var/log/nginx/error.log`
- Accès : `tail -f /var/log/nginx/access.log`

### L’app ne répond pas

1. `pm2 status` → l’app doit être « online ».
2. `pm2 logs portfolio` → regarde les erreurs.
3. Test direct : `curl http://127.0.0.1:3000` depuis le VPS. Si ça répond, le souci vient de Nginx ou du pare-feu.

### PM2 en statut « errored » (↺ qui augmente)

L'app crash au démarrage. À faire **dans l'ordre** :

1. **Voir la cause** :  
   ```bash
   pm2 logs portfolio --lines 50
   ```  
   Regarde la dernière erreur (souvent « Cannot find module », « no such file », ou port déjà utilisé).

2. **Vérifier que le build existe** : l'app doit être **buildée** avant `next start`. Depuis le dossier du projet (ex. `/var/www/portfolio`) :  
   ```bash
   cd /var/www/portfolio
   ls -la .next
   ```  
   Si `.next` est absent ou vide :  
   ```bash
   npm run build
   ```

3. **Relancer proprement** :  
   ```bash
   pm2 delete portfolio
   cd /var/www/portfolio
   pm2 start npm --name "portfolio" -- start
   pm2 save
   ```  
   Si ton `package.json` utilise un autre port en dev, en prod `next start` utilise par défaut le port **3000** (pas besoin de `-p` sauf si tu as changé le script `start`).

4. **Vérifier** :  
   ```bash
   pm2 status
   curl http://127.0.0.1:3000
   ```

### Nginx : « conflicting server name … on 0.0.0.0:80, ignored »

Deux blocs `server` utilisent le même `server_name` sur le port 80 (souvent le site **default** + **portfolio**). Il faut n'en garder qu'un :

```bash
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Ensuite seul ton site `portfolio` répondra sur le port 80.

### Erreur 502 Bad Gateway

Souvent Nginx ne peut pas joindre l’app sur le port 3000. Vérifie que PM2 tourne (`pm2 status`) et que l’app écoute bien sur 3000 (voir `package.json` → script `start`).

### Plus de place disque

```bash
df -h
```

Si `/` est plein, tu peux supprimer les anciens builds et caches :

```bash
cd /var/www/portfolio
rm -rf .next/cache
npm run build
pm2 restart portfolio
```

---

## Récapitulatif des étapes

1. VPS déjà en place : **87.106.30.74**, utilisateur **root**, Ubuntu 24.04 (mot de passe dans l’espace client IONOS).
2. Se connecter en SSH : **`ssh root@87.106.30.74`**.
3. Mettre à jour le serveur et configurer le pare-feu (UFW).
4. Installer Node.js 20.
5. Cloner le projet (ou l’envoyer) dans `/var/www/portfolio`.
6. `npm ci` puis `npm run build`.
7. Lancer avec PM2 : `pm2 start npm --name "portfolio" -- start`, puis `pm2 startup` et `pm2 save`.
8. Installer Nginx et configurer le proxy vers le port 3000.
9. Pointer le domaine vers l’IP et installer le SSL avec Certbot.

Si tu bloques sur une étape, reviens à la section correspondante dans ce fichier ou vérifie les logs (`pm2 logs`, `nginx error.log`).
