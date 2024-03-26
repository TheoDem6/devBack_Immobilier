// chargement du fichier d'env
// accès au variables
process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign( {user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60});
}


function authenticateToken(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.sendStatus(403); // 403 Forbidden
      }
      req.user = user;
      next();
  });
}



function transformUserToTocken(user) {
  let userTocken = {
    nom: user.nom,
    mail: user.mail,
    id: user.id
  };
  return userTocken;
}

module.exports ={generateAccessToken,transformUserToTocken,authenticateToken};