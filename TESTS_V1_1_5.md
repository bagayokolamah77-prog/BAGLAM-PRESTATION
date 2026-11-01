# Tests v1.1.5

Tests exécutés : syntaxe de tous les scripts inline, sw.js et baglam-config.js OK.
7 scénarios automatisés exécutés sur les fonctions réelles extraites du HTML, avec simulation de la fenêtre d'impression : facture soldée dont le paiement courant manque de l'état, paiement déjà présent sans double comptage, paiement partiel, relecture JSON équivalente au retour des données (pas un vrai F5), ancienne prestation soldée, facture historique avec paiements mixtes, exclusion d'une autre facture. Montants et libellés du HTML généré vérifiés. Données source non mutées.

Non exécutés : chargement complet dans un navigateur, rendu visuel/impression A4, connexion/déconnexion Supabase, vrai F5, comptes Administrateur/Concepteur, isolation RLS multi-entreprise, synchronisation hors ligne, modules voisins en situation réelle et activation du cache PWA. Aucun accès production utilisé.

À vérifier après déploiement sur le projet existant : version 1.1.5 ; facture de test de 100 000 GNF ; paiement 40 000 → reste 60 000 ; paiement 60 000 → SOLDE RÉGLÉ 0 GNF ; imprimer, F5, réimprimer, ancienne facture et ancienne prestation ; connexion/déconnexion, rôles et autre entreprise ; modules voisins et actualisation PWA.

⚠️ CORRECTION IMPLÉMENTÉE — TEST MANUEL EN ENVIRONNEMENT RÉEL ENCORE REQUIS
