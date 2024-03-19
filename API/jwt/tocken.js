// chargement du fichier d'env
// accès au variables
process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign( {user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60});
}

function transformUserToTocken(user) {
  let user2 = {
    nom: user.nom,
    mail: user.mail,
    id: user.id
  };
  return user2;
}

module.exports ={generateAccessToken,transformUserToTocken};