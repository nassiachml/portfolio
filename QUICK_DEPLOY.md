# 🚀 Déploiement Rapide - Guide Express

## Méthode la plus simple (Vercel - 5 minutes)

### 1. Préparer le code
```bash
# Tester que tout fonctionne
npm run build
```

### 2. Mettre sur GitHub
```bash
git init
git add .
git commit -m "Ready to deploy"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/portfolio_nass.git
git push -u origin main
```

### 3. Déployer sur Vercel
1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Cliquez "Add New Project"
4. Sélectionnez votre repo
5. Cliquez "Deploy"
6. ✅ C'est fait ! Votre site est en ligne

**Votre site sera accessible sur :** `votre-projet.vercel.app`

---

## Configuration automatique

Vercel détecte automatiquement :
- ✅ Next.js
- ✅ Scripts de build
- ✅ Port 3000
- ✅ Variables d'environnement

**Aucune configuration supplémentaire nécessaire !**

---

## Domaine personnalisé (optionnel)

Dans les paramètres Vercel :
1. Allez dans "Settings" > "Domains"
2. Ajoutez votre domaine
3. Suivez les instructions DNS
4. ✅ HTTPS automatique

---

## Mise à jour du site

À chaque fois que vous faites :
```bash
git push
```

Vercel redéploie automatiquement votre site ! 🎉

