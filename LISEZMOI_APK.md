# Faire l'APK Android (gratuit, compilé par GitHub)

Ce dossier remplace le contenu de ton dépôt GitHub Pages. Le site web continue de marcher
comme avant, et GitHub fabrique en plus un fichier `Comparateur.apk` à chaque modification de l'app.

## 1. Mettre les fichiers dans le dépôt
Envoie tout le contenu de ce dossier à la racine du dépôt, y compris :
- `android-app/` (projet Android)
- `.github/workflows/apk-android.yml` (la recette de compilation)

Si le dossier `.github` ne passe pas par glisser-déposer (dossier caché) : sur GitHub,
« Add file → Create new file », tape `.github/workflows/apk-android.yml` comme nom, colle le contenu, puis commit.

## 2. Ajouter la clé de signature (une seule fois)
Dépôt → **Settings → Secrets and variables → Actions → New repository secret**, deux fois :
- `KEYSTORE_PASSWORD`
- `KEYSTORE_B64`

Les valeurs sont dans `SECRETS_GITHUB.txt` (zip à part, **à ne jamais mettre dans le dépôt**).
Garde ce zip au chaud : sans cette clé, une mise à jour ne pourra pas s'installer par-dessus l'ancienne.

## 3. Lancer la compilation
Onglet **Actions** → « APK Android » → **Run workflow** (accepte d'activer les workflows si GitHub le demande).
Compte 5 à 10 minutes. Ensuite, la compilation se relance toute seule à chaque modification de `comparateur_prix.html`.

## 4. Récupérer l'APK
Onglet **Releases**, ou directement ce lien (toujours la dernière version) :
`https://github.com/<ton-pseudo>/<ton-dépôt>/releases/latest/download/Comparateur.apk`

## 5. Installer sur le téléphone
1. Ouvrir le lien (ou envoyer le fichier par câble, mail, Bluetooth…)
2. Ouvrir `Comparateur.apk` ; Android demande d'autoriser « Installer des applis inconnues » pour le navigateur ou le gestionnaire de fichiers : accepter
3. Si Play Protect ou la sécurité Huawei avertit (« application inconnue »), choisir « Installer quand même »

Pour une mise à jour : installer le nouvel APK par-dessus, les listes sont gardées.

## Reprendre les données de la version web
L'APK a son propre stockage. Dans la version web : Menu → Exporter une sauvegarde.
Dans l'APK : Menu → Importer une sauvegarde → choisir le fichier.
Dans l'APK, « Exporter » ouvre le menu Partager d'Android (Drive, Fichiers, mail…).
