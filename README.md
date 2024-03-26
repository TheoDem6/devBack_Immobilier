# Back-end pour une application immobilière

## Installation

Pour installer les dépendances nécessaires, exécutez les commandes suivantes :

```bash
npm install express
npm install mongoose
npm install swagger-ui-express
npm install bcrypt
npm install body-parser
npm install chai
npm install chai-http
npm install jsonwebtoken
npm install axios
```
Assurez-vous d'avoir une version de Node.js supérieure à 14.bash

Utilisation
Pour accéder à l'interface utilisateur, veuillez ouvrir votre navigateur et accéder à l'URL suivante : http://localhost:3000/. Vous serez redirigé vers la page de connexion.

Assurez-vous de configurer correctement la connexion à la base de données en modifiant le fichier .env et en y ajoutant l'URL de la base de données.

Lors de l'ajout d'un utilisateur, si la table utilisateur n'existe pas, elle sera automatiquement créée.

Les jetons d'authentification peuvent rencontrer des difficultés avec les pages web mais fonctionnent correctement avec Postman.

Pour accéder à la documentation Swagger, veuillez visiter l'URL suivante : http://localhost:3000/api-docs/.


### Lancer le code

Pour lancer le code, il faut se positionner dans le dossier contenant `server.js` qui se situe dans API/App et exécuter la commande suivante :

```bash
node ./server.js
```
Pour lancer les tests (même s'il marche pas)
```bash
npm test
```
Remarques
Les tests ne fonctionnent pas pour le moment en raison d'un ajout de code qui a provoqué des erreurs. Cependant, il est intéressant de les examiner.

Si vous consultez le dépôt avant le dernier push effectué vendredi, veuillez noter que le travail est toujours en cours. Il reste encore à finaliser l'historique, à faire fonctionner les jetons d'authentification et à peaufiner l'architecture.