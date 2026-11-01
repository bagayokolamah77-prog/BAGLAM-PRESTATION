// Configuration de connexion BAGLAM → Supabase.
// ⚠ Remplacez les deux valeurs marquées « À REMPLACER » avant de déployer
//   (Supabase > Project Settings > API) :
//   - SUPABASE_URL : l'adresse du projet, ex. https://abcdefghijklmno.supabase.co
//   - SUPABASE_PUBLISHABLE_KEY : la clé PUBLIQUE (« anon » ou « publishable »).
//     Ne mettez jamais la clé « service_role » / « secret » ici : ce fichier est public.
// Le déploiement est bloqué tant que ces valeurs ne sont pas remplies.
window.BAGLAM_CONFIG = {
  BUILD_VERSION: "1.1.5",
  SUPABASE_URL: "https://VOTRE-PROJET.supabase.co",      // À REMPLACER
  SUPABASE_PUBLISHABLE_KEY: "VOTRE_CLE_PUBLIQUE",        // À REMPLACER
  API_CACHE_TTL_MS: 15 * 60 * 1000,  // durée du cache hors ligne des données (15 min)
  NETWORK_TIMEOUT_MS: 9000           // délai avant de passer en mode hors ligne (9 s)
};
