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
        console.log(response.data);
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
async function enrichWithCoordinates(logements, code) {
    try {
        const coordinates = await getCoordinates(code['Code_postal_(BAN)']);
        console.log('Coordinates:', coordinates); // Vérifiez les coordonnées récupérées
        for (let i = 0; i < logements.length; i++) {
            // Ajouter les données de latitude et longitude à chaque objet de logement
            logements[i].latitude = coordinates.latitude;
            logements[i].longitude = coordinates.longitude;
            console.log('Logement', i, 'Latitude:', logements[i].latitude, 'Longitude:', logements[i].longitude); // Vérifiez les valeurs de latitude et longitude affectées
        }
        console.log(logements);
        return logements;
    } catch (error) {
        console.error('Erreur lors de l\'enrichissement avec les coordonnées:');
        throw error;
    }
}

// Exemple d'utilisation avec votre fonction getLogement
async function getLogement(code) {
    try {
        const logementTab = await logement.find(code).limit(10);
        if(logementTab.length == 0){
            return "Pas de logement avec ces critères";
        }
        const logementsAvecCoordonnees = await enrichWithCoordinates(logementTab,code);
        console.log("aaaaaaaaaa");
        console.log(logementsAvecCoordonnees[0].latitude);
       
        return logementsAvecCoordonnees;
    } catch (error) {
        console.error('Erreur lors de la récupération des logements:');
        throw error;
    }
}

module.exports ={getAll,getLogement};