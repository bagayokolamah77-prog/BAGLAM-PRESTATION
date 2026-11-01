# BAGLAM v1.1.5 — Reçu de paiement

## Audit avant modification
Fichiers : index.html ; baglam-config.js et sw.js pour version/cache.
Fonctions : baglamReceiptDetails, baglamPrintProfessionalReceipt, ReceiptModal.
Chemin : Lr.save → savePaiement/os → Po/Ao → Supabase paiements → On → état React Ke/Ce → data → reçu.
Lecture facture : factureCalc, factureItems, factureClient. Tables lues : paiements, factures, prestations, clients, services ; branche inscription existante : inscriptions, inscrits.
Cause confirmée : libellé « Reste à payer » inconditionnel même à zéro. Risque supplémentaire : paiement courant absent de la liste pendant une mise à jour ; inclusion locale par identifiant pour les reçus facture/prestation. Le défaut de montant en production n'est pas reproduit avec des comptes réels.
Correction minimale : libellé SOLDE RÉGLÉ à zéro, maintien du reste réel en paiement partiel ; inclusion du paiement courant une seule fois. Aucun changement des écritures, hooks, RLS, RPC, schéma ni migration SQL.
Rétrocompatibilité : anciens liens prestationId, nouvelles factures factureId et branche inscription conservés. Aucun changement des rapports ni CSS A4.
Risques : données déjà incomplètes en base ou autres paiements non chargés restent à diagnostiquer en environnement réel ; cette correction ne reconstitue pas les paiements manquants.
Plan : tests calcul et HTML généré, syntaxe de tous les scripts, comparaison baseline ; tests manuels de connexion, F5, anciennes/nouvelles données, rôles, RLS, modules voisins et PWA.

## Livraison
Baseline v1.1.4 conservée intacte ; archive SHA-256 vérifiée.
Aucune opération sur Supabase. Aucune migration nécessaire.
⚠️ CORRECTION IMPLÉMENTÉE — TEST MANUEL EN ENVIRONNEMENT RÉEL ENCORE REQUIS
