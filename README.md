# Ladder Live – 5.W.4.T (PWA)
Mini-app hors-ligne pour pointer un ladder en direct sur iPhone (tap-to-toggle).

## Fichiers
- `index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`
- `assets/` : icônes PWA (192/512), icône Apple (180)

## Déploiement GitHub Pages
1. Créer un dépôt public (ex: `ladder-live`).
2. Uploader **tous** ces fichiers à la racine.
3. Dans **Settings → Pages**: Source = **Deploy from a branch**, Branch = `main` / `/ (root)`.
4. Ouvrir l'URL fournie (ex: `https://<user>.github.io/ladder-live/`).
5. Sur iPhone (Safari): Partager → **Ajouter à l'écran d'accueil**.

> Premier chargement en ligne requis pour activer le cache hors-ligne.

## Domaine personnalisé (optionnel)
- Acheter/posséder un domaine (ex: `5w4t.app`) et créer un sous-domaine `ladder.5w4t.app`.
- Ajouter un `CNAME` DNS vers `<user>.github.io` (ou `<org>.github.io`).
- Dans le dépôt, créer un fichier `CNAME` à la racine contenant: `ladder.5w4t.app`.
- Attendre la propagation DNS, recharger la page, réinstaller l'icône au besoin.

## Utilisation
- Tap sur une case de rang: vide ⇄ ⭐ 5.W.4.T ⇄ ⭐ Opposants
- Totaux auto (ligne "Total")
- Renommer équipes: tap sur l'en-tête
- Annuler, Réinitialiser, Imprimer/PDF
- Sauvegarde automatique locale
