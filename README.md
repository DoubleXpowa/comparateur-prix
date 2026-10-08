🛒 Comparateur de Prix — v2.0.0
Calculateur de courses par magasin, promos comprises. PWA installable, fonctionne hors ligne.
Fichiers à mettre en ligne (tous, dans le même dossier)
`comparateur_prix.html` : l'application
`service-worker.js` : hors ligne + mises à jour
`manifest.json`
`icon-192.png`, `icon-512.png`
`fonts/` : nouveau dossier, à uploader aussi (polices des prix)
Sur GitHub Pages : remplace les anciens fichiers et ajoute le dossier `fonts/`, puis commit.
Les données de la v1 (listes, magasins, historique, mode sombre) sont reprises automatiquement au premier lancement.
Promos disponibles (une par article)
Type	Exemple	Calcul
Le Nᵉ à −X %	2ᵉ à −50 %, 3ᵉ offert	chaque groupe de N : le dernier à −X %
N achetés + M offerts	1+1, 2+1, 3+1	chaque groupe de N+M : M gratuits
Lot	3 pour 5 €	groupes complets au prix du lot, le reste au prix normal
Remise immédiate %	−30 %	sur toute la ligne
Remise immédiate €	−0,50 €/article	par article, jamais en dessous de 0
Cagnotte % / €	34 % cagnottés (Waaoh, Ticket Leclerc)	payé plein pot en caisse, affiché à part comme « cagnotté »
Quand il manque des articles pour déclencher une offre, l'app l'indique (« Prends-en 1 de plus : il est offert »).
Publier une mise à jour
Changer `APP_VERSION` dans `comparateur_prix.html`
Changer `VERSION` dans `service-worker.js`
Uploader. La page est chargée réseau d'abord, donc la nouvelle version arrive au prochain lancement ; un message « Nouvelle version installée → Recharger » s'affiche si l'app était ouverte.
Tester en local
```
python -m http.server 8000
```
puis ouvrir http://localhost:8000/comparateur_prix.html
