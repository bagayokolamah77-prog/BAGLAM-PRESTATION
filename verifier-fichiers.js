// Vérification lancée automatiquement avant chaque « firebase deploy ».
// Bloque le déploiement si baglam-config.js manque ou n'a pas encore la vraie
// adresse et la clé publique Supabase (sinon personne ne pourrait se connecter).
const fs = require("fs");
const path = require("path");

const dossier = path.join(__dirname, "public");
const fichiers = [
  "index.html",
  "baglam-config.js",
  "sw.js",
  "manifest.webmanifest",
  "favicon.ico",
  "baglam-icon.svg",
  "baglam-icon-180.png",
  "baglam-icon-192.png",
  "baglam-icon-512.png",
  "baglam-icon-maskable-512.png",
  "baglam-home-hero.webp",
  "baglam-dashboard-visual.webp",
];

const manquants = fichiers.filter((f) => !fs.existsSync(path.join(dossier, f)));
if (manquants.includes("index.html") || manquants.includes("baglam-config.js")) {
  console.error("\n✖ DÉPLOIEMENT ANNULÉ : fichier indispensable absent de public/ : " +
    manquants.filter((f) => f === "index.html" || f === "baglam-config.js").join(", ") + "\n");
  process.exit(1);
}

const config = fs.readFileSync(path.join(dossier, "baglam-config.js"), "utf8");
if (/VOTRE-PROJET|VOTRE_CLE/.test(config)) {
  console.error(
    "\n✖ DÉPLOIEMENT ANNULÉ : ouvrez public/baglam-config.js et remplacez\n" +
    "  SUPABASE_URL et SUPABASE_PUBLISHABLE_KEY (lignes « À REMPLACER »)\n" +
    "  par les valeurs de Supabase > Project Settings > API.\n"
  );
  process.exit(1);
}
const cle = (config.match(/SUPABASE_PUBLISHABLE_KEY\s*:\s*["']([^"']+)["']/) || [])[1] || "";
let cleSecrete = cle.startsWith("sb_secret_");
if (cle.startsWith("eyJ")) {
  try {
    const charge = JSON.parse(Buffer.from(cle.split(".")[1], "base64url").toString("utf8"));
    cleSecrete = charge.role === "service_role";
  } catch (_) {}
}
if (cleSecrete) {
  console.error("\n✖ DÉPLOIEMENT ANNULÉ : baglam-config.js semble contenir une clé SECRÈTE Supabase.\n" +
    "  Utilisez uniquement la clé publique (anon / publishable).\n");
  process.exit(1);
}

if (manquants.length) {
  console.warn("\n⚠ Fichiers absents de public/ :\n   - " + manquants.join("\n   - ") + "\n");
} else {
  console.log("✔ Tous les fichiers de BAGLAM sont présents et la configuration Supabase est remplie.");
}
