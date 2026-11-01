# BAGLAM v1.1.4 — Rapport de correction ciblée

## Périmètre
Correction limitée au choix des créneaux pendant l'inscription et aux ressources d'icône de l'application.

## Créneaux d'inscription
- Une formation peut recevoir plusieurs créneaux lors d'une même inscription.
- Un catalogue visuel est généré à partir des horaires déjà présents dans les formations actives.
- Chaque créneau du catalogue peut être coché/décoché indépendamment.
- Plusieurs créneaux manuels peuvent être ajoutés (jour, début, fin) et supprimés individuellement.
- Une inscription exige au moins un créneau valide pour chaque formation choisie.
- Les doublons de créneaux sont éliminés lors de l'enregistrement.

## Compatibilité / non-régression
- Le champ historique `selectedCreneau` est toujours renseigné avec le premier créneau sélectionné.
- Le nouveau champ JSON `selectedCreneaux` conserve la liste complète dans `formations_snapshot`.
- Aucune modification de schéma Supabase n'est requise : `formations_snapshot` est déjà un JSON.
- Les anciennes inscriptions restent lisibles.
- Les fonctions existantes qui n'utilisent que `selectedCreneau` restent compatibles.
- Les chemins d'emploi du temps et de reçu savent lire la liste multiple sans modifier leurs autres règles métier.

## Icône
L'icône BAGLAM existante a été conservée et déclinée en :
- `baglam-icon.svg`
- `baglam-icon-180.png`
- `baglam-icon-192.png`
- `baglam-icon-512.png`
- `favicon.ico`

Le manifeste PWA et l'en-tête HTML utilisent maintenant ces formats pour une apparence cohérente sur navigateur, installation PWA et bureau.

## Modules non réécrits
Aucune réécriture des modules Factures, Paiements, Rapports, Dépenses, Historique, Services, Stock ou Utilisateurs.
