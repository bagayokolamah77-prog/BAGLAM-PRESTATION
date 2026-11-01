# Mettre APP BAGLAM en ligne sur Firebase Hosting

Projet Firebase : **baglam-prestation**
Adresse finale : **https://baglam-prestation.web.app** (et https://baglam-prestation.firebaseapp.com)

Les données et les comptes restent sur **Supabase** : Firebase sert seulement à héberger les fichiers de l'application.

---

## Contenu du dossier

```
baglam-prestation-firebase/
├─ firebase.json            réglages d'hébergement (cache, sécurité)
├─ .firebaserc              relie le dossier au projet baglam-prestation
├─ verifier-fichiers.js     contrôle automatique avant chaque déploiement
└─ public/                  ce qui est mis en ligne
   ├─ index.html                     l'application (inchangée)
   ├─ baglam-config.js               connexion Supabase  ← 2 valeurs à remplir
   ├─ sw.js                          mode hors ligne + mises à jour
   ├─ manifest.webmanifest           installation sur téléphone / ordinateur
   ├─ favicon.ico, baglam-icon.svg   icône de l'onglet
   ├─ baglam-icon-180.png            icône iPhone / iPad
   ├─ baglam-icon-192.png, -512.png  icônes Android / ordinateur
   ├─ baglam-icon-maskable-512.png   icône Android adaptative
   ├─ baglam-home-hero.webp          visuel de la page de connexion
   └─ baglam-dashboard-visual.webp   visuel du tableau de bord
```

## 1. Remplir `public/baglam-config.js` (obligatoire)

Ouvrez le fichier avec le Bloc-notes et remplacez les deux lignes marquées « À REMPLACER » :

- `SUPABASE_URL` : Supabase → **Project Settings → API** → *Project URL* (ex. `https://abcdefghijklmno.supabase.co`)
- `SUPABASE_PUBLISHABLE_KEY` : même page, la clé **publique** (*anon* ou *publishable*).
  ⚠ Jamais la clé *service_role* / *secret* : ce fichier est visible par tout le monde.

Le déploiement est **bloqué automatiquement** tant que ces valeurs ne sont pas remplies, ou si une clé secrète y est mise par erreur.

## 2. Installer l'outil Firebase (une seule fois)

1. Installez **Node.js** (version LTS) depuis https://nodejs.org
2. Ouvrez un terminal (Invite de commandes / PowerShell) et tapez :

```
npm install -g firebase-tools
firebase login
```

Connectez-vous avec le compte Google propriétaire du projet `baglam-prestation`.

## 3. Déployer

Dans le terminal, placez-vous dans ce dossier (celui qui contient `firebase.json`), puis :

```
firebase deploy --only hosting
```

À la fin, Firebase affiche l'adresse : `https://baglam-prestation.web.app`.

Pour tester avant de publier : `firebase emulators:start --only hosting` puis ouvrez http://localhost:5000

## 4. Réglage Supabase (important pour « mot de passe oublié »)

Dans Supabase : **Authentication → URL Configuration → Redirect URLs**, ajoutez :

```
https://baglam-prestation.web.app/
https://baglam-prestation.firebaseapp.com/
```

Si la nouvelle adresse devient l'adresse principale, mettez aussi `https://baglam-prestation.web.app` dans **Site URL**.

## 5. Publier une nouvelle version

1. Remplacez `public/index.html` (et les autres fichiers modifiés).
2. Si le numéro de version change (ex. 1.1.5 → 1.1.6), mettez le même numéro dans `index.html` (`?v=`), dans `VERSION` en haut de `public/sw.js` et dans `BUILD_VERSION` de `baglam-config.js`.
3. Relancez `firebase deploy --only hosting`.

Les utilisateurs verront le bandeau « Nouvelle version BAGLAM disponible — METTRE À JOUR ».

## Mode hors ligne

Après une première visite en ligne, l'application se rouvre même sans connexion : la page, les icônes, les images et les bibliothèques (React, graphiques, Supabase, Excel) sont gardées sur l'appareil. Les données Supabase continuent d'être gérées par le cache et la file de synchronisation déjà intégrés à BAGLAM.

## À propos du code Firebase (`initializeApp`, `firebaseConfig`)

Il **n'est pas nécessaire** pour l'hébergement : l'application n'utilise aucun service Firebase (ni Firestore, ni Firebase Auth). Ne le collez pas dans `index.html`.
