let mongoose = require('mongoose');
const logement = require('../../Model/logement');
const axios = require('axios');


async function getAll(pageNumber = 1, pageSize = 10) {
    try {
        // Calculer le nombre d'éléments à sauter
        const skip = (pageNumber - 1) * pageSize;

        // Utiliser lean() pour obtenir des objets JavaScript simples
        const logements = await logement.find({}).skip(skip).limit(pageSize).lean();
        return logements;
    } catch (error) {
        // Gérer les erreurs ici
        console.error("Erreur lors de la récupération des logements :", error);
        throw error;
    }
}
async function getCoordinates(address) {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                limit: 1
            }
        });
        if (response.data.length > 0) {
            return {
                latitude: response.data[0].lat,
                longitude: response.data[0].lon
            };
        } else {
            throw new Error('Adresse non trouvée');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées:');
        throw error;
    }
}

async function enrichWithCoordinates(logements) {
    try {
        for (let logement of logements) {
            const coordinates = await getCoordinates(logement['Adresse_(BAN)']);
            logement.latitude = coordinates.latitude;
            logement.longitude = coordinates.longitude;
        }
        return logements;
    } catch (error) {
        console.error('Erreur lors de l\'enrichissement avec les coordonnées:');
        throw error;
    }
}

// Exemple d'utilisation avec votre fonction getLogement
async function getLogement(code) {
    try {
        
        const logementTab = await logement.find(code).limit(1);
        const logementsAvecCoordonnees = await enrichWithCoordinates(logementTab);
        console.log(code);
        return logementsAvecCoordonnees;
    } catch (error) {
        console.error('Erreur lors de la récupération des logements:');
        throw error;
    }
}

module.exports ={getAll,getLogement};