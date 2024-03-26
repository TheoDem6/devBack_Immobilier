let mongoose = require('mongoose');
const logement = require('../../Model/logement');
const axios = require('axios');


async function getAll(pageNumber = 1, pageSize = 10) {
    try {
        // Calculer le nombre d'éléments à sauter
        const skip = (pageNumber - 1) * pageSize;

   
        const logements = await logement.find({}).skip(skip).limit(pageSize).lean();
        return logements;
    } catch (error) {
   
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
        const enrichedLogements = []; // Nouveau tableau pour stocker les logements enrichis
        for (let i = 0; i < logements.length; i++) {
            // Créer un nouvel objet avec les données de base du logement et les coordonnées
            const enrichedLogement = {
                _id: logements[i]._id,
                N_département_BAN: logements[i]['N°_département_(BAN)'],
                Date_réception_DPE: logements[i]['Date_réception_DPE'],
                Date_établissement_DPE: logements[i]['Date_établissement_DPE'],
                Date_visite_diagnostiqueur: logements[i]['Date_visite_diagnostiqueur'],
                Etiquette_GES: logements[i]['Etiquette_GES'],
                Etiquette_DPE: logements[i]['Etiquette_DPE'],
                Année_construction: logements[i]['Année_construction'],
                Surface_habitable_logement: logements[i]['Surface_habitable_logement'],
                Adresse_BAN: logements[i]['Adresse_(BAN)'],
                Code_postal_BAN: logements[i]['Code_postal_(BAN)'],
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            };
            enrichedLogements.push(enrichedLogement); // Ajouter le logement enrichi au nouveau tableau
        }
        return enrichedLogements;
    } catch (error) {
        console.error('Erreur lors de l\'enrichissement avec les coordonnées:');
        throw error;
    }
}

async function getLogement(code,adresse) {
    try {
        console.log(adresse);
        let logementTab = await logement.find(code).limit(10);
       logementTab = triTableau(logementTab,adresse);
       
        if(logementTab.length == 0){
            return "Pas de logement avec ces critères";
        }
        const logementsAvecCoordonnees = await enrichWithCoordinates(logementTab,code);
        return logementsAvecCoordonnees;
    } catch (error) {
        console.error('Erreur lors de la récupération des logements:');
        throw error;
    }
}
function triTableau(logementTab,adresse){
    if (!isNaN(adresse['Surface_Habitable_Logement'])){
        logementTab =   getLogementWithSurface(logementTab,adresse['Surface_Habitable_Logement']);
    }
    if(!isNaN(adresse['AnneeConstruction'])){
        logementTab =  getLogementWithAnneeConstruction(logementTab,adresse['AnneeConstruction']);
    }
    if(adresse['Adresse'] != undefined && adresse['Adresse'] != ''){
        logementTab =  getLogementWithAdresse(logementTab,adresse['Adresse']);
    }
    

    return logementTab;
}

function getLogementWithSurface(tab,surface){
    return tab.filter(l=>l['Surface_habitable_logement'] === surface);
}
function getLogementWithAnneeConstruction(tab,AnneeConstruction){
    return tab.filter(l=>l['Année_construction'] === AnneeConstruction);
}
function getLogementWithAdresse(tab,adresse){
    return tab.filter(l=>l['Adresse'] == adresse);
}

module.exports ={getAll,getLogement};