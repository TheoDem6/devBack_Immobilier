let serviceClient = require("../Service/Service_client");
let serviceLogement = require("../Service/Service_logement");

const path = require('path'); 
const express = require('express');
const router = express.Router();
const tocken = require('../jwt/tocken');

/**
 * @openapi
 * /register:
 *   get:
 *     summary: Page d'inscription
 *     description: Retourne la page d'inscription pour les utilisateurs.
 *     responses:
 *       '200':
 *         description: Page d'inscription
 */
router.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/register.html'));
});

/**
 * @openapi
 * /login:
 *   get:
 *     summary: Page de connexion
 *     description: Retourne la page de connexion pour les utilisateurs.
 *     responses:
 *       '200':
 *         description: Page de connexion
 */
router.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/login.html'));
});

/**
 * @openapi
 * /:
 *   get:
 *     summary: Redirection vers la page de connexion
 *     description: Redirige vers la page de connexion par défaut.
 *     responses:
 *       '302':
 *         description: Redirection vers la page de connexion
 */
router.get('/', async (req, res) => {
    res.redirect('/login');
});

/**
 * @openapi
 * /logement:
 *   get:
 *     summary: Page des logements
 *     description: Retourne la page des logements.
 *     responses:
 *       '200':
 *         description: Page des logements
 */
router.get('/logement', async (req, res) => {
    res.sendFile(path.join(__dirname, '../front/logement.html'));
});

/**
 * @openapi
 * /loginUser:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Permet à un utilisateur de se connecter avec une adresse e-mail et un mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               mdp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Utilisateur connecté avec succès
 *       '500':
 *         description: Erreur lors de la connexion de l'utilisateur
 */
router.post('/loginUser', async (req, res) => {
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    try {
        let tokenClient = await serviceClient.loginUser(mail, mdp);
        console.log(tokenClient);
        res.json(tokenClient);
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
});

/**
 * @openapi
 * /registerUser:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     description: Permet à un utilisateur de s'inscrire avec un nom, une adresse e-mail et un mot de passe.
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               mail:
 *                 type: string
 *               mdp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Utilisateur inscrit avec succès
 *       '500':
 *         description: Erreur lors de l'inscription de l'utilisateur
 */
router.post('/registerUser', async (req, res) => {
    try {
        const nom = req.body.nom;
        const mail = req.body.mail;  
        const mdp = req.body.mdp;
        let respt = await serviceClient.createUser(nom, mail, mdp);
        res.status(200).send(respt);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @openapi
 * /logement:
 *   get:
 *     summary: Liste des logements
 *     description: Retourne la liste de tous les logements disponibles.
 *     tags: [Logements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Liste des logements
 *       '500':
 *         description: Erreur lors de la récupération des logements
 */
router.get('/logement', tocken.authenticateToken, async (req, res) =>{
    try {
        let logementTab = await serviceLogement.getAll();
        res.json(logementTab);
    } catch (error) {
        console.error("Erreur lors de la récupération des logements :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des logements" });
    }
});

/**
 * @openapi
 * /logement/search:
 *   post:
 *     summary: Recherche de logements
 *     description: Recherche des logements en fonction des critères spécifiés.
 *     tags: [Logements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codePostal:
 *                 type: string
 *               Etiquette_GES:
 *                 type: string
 *               Etiquette_DPE:
 *                 type: string
 *               Surface_Habitable_Logement:
 *                 type: number
 *               Adresse:
 *                 type: string
 *               Date_Reception_DPE:
 *                 type: string
 *               Date_Etablissement_DPE:
 *                 type: string
 *               Date_Visite_Diagnostiqueur:
 *                 type: string
 *               AnneeConstruction:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Résultats de la recherche
 *       '500':
 *         description: Erreur lors de la recherche de logement
 */
router.post('/logement/search', async (req, res) => {
    try {
        const { codePostal, Etiquette_GES, Etiquette_DPE, Surface_Habitable_Logement, Adresse, Date_Reception_DPE, Date_Etablissement_DPE, Date_Visite_Diagnostiqueur ,AnneeConstruction} = req.body;
        const searchData = {
            "Code_postal_(BAN)": parseInt(codePostal),
            Etiquette_GES,
            Etiquette_DPE,
        };
        
        const additionalData = {
            Date_Reception_DPE,
            Date_Etablissement_DPE,
            Date_Visite_Diagnostiqueur,
            Surface_Habitable_Logement : parseInt(Surface_Habitable_Logement),
            Adresse,
            AnneeConstruction : parseInt(AnneeConstruction)
        };
        
        let respt = await serviceLogement.getLogement(searchData, additionalData);
        res.status(200).json(respt);
    } catch (error) {
        console.error("Erreur lors de la recherche de logement :", error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
