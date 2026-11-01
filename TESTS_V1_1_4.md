# Tests BAGLAM v1.1.4

## Contrôles automatiques effectués
- Syntaxe du code applicatif : OK (`node --check`).
- Syntaxe des scripts intégrés : OK.
- Syntaxe `sw.js` et `baglam-config.js` : OK.
- Version : `1.1.4` cohérente dans configuration, interface et service worker.
- Présence de `creneauxMultiples` : OK.
- Présence de `selectedCreneaux` avec maintien de `selectedCreneau` : OK.
- Catalogue des créneaux : présent.
- Ajout de plusieurs créneaux manuels : présent.
- Icônes PNG : dimensions 180x180, 192x192 et 512x512 vérifiées.
- Favicon ICO : fichier valide.
- Manifest PWA : icônes PNG + SVG référencées.
- Aucune migration SQL v1.1.4 : confirmé.

## Tests manuels recommandés après déploiement
1. Choisir une formation avec 3 créneaux et en cocher 2.
2. Ajouter 2 créneaux manuels au même cours.
3. Enregistrer l'inscription, actualiser la page et vérifier que l'inscription est toujours présente.
4. Vérifier qu'une ancienne inscription s'ouvre encore normalement.
5. Installer/actualiser BAGLAM en PWA et vérifier l'icône du raccourci.

Aucune donnée de production n'a été supprimée ou réinitialisée.
