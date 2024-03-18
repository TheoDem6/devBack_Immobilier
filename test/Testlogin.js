//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Client = require('../Model/client');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../API/App/server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block

//Our parent block
describe('td_client', () => {
    beforeEach(async () => { //Before each test we empty the database
        await Client.deleteMany({});      
    });

    describe('/ return welcome', () => {
        it('Doit retourner welcome lors d\'un appel à la racine', (done) => {
            chai.request(server)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Welcome to homepage');
                done();
            })
        })
    });
 /*
  * Test the /POST route
  */
  describe('/POST createClient', () => {
      it('Ne dois pas insérer de client si le mail est vide', (done) => {
        let emptyMailClient = {
            nom:"theo",
            mdp:"azerty"
        }
            chai.request(server)
            .post('/createUser')
            .send(emptyMailClient)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('mail');
                res.body.errors.mail.should.have.property('kind').eql('required');
              done();
            });
      });

      it('Ne dois pas insérer de client si le nom est vide', (done) => {
        let emptyNameClient = {
            mail:"theolastico@mail.com",
            mdp:"azerty"
        }
          chai.request(server)
          .post('/createUser')
          .send(emptyNameClient)
          .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                // console.log(res.body)
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('nom');
                res.body.errors.nom.should.have.property('kind').eql('required');
            done();
          });
        });

        it('Ne dois pas insérer de client si le mdp est vide', (done) => {
            let emptyPwdClient = {
                nom:"theo",
                mail:"theolastico@mail.com",
            }
                chai.request(server)
                .post('/createUser')
                .send(emptyPwdClient)
                .end((err, res) => {
                    // console.log(err);
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('mdp');
                    res.body.errors.mdp.should.have.property('kind').eql('required');
                done();
                });
        });
        it('Insére un nouveau client ', (done) => {
            let newClient = {
                nom:"theo",
                mail:"theolastico@mail.com",
                mdp : "azerty"
            }
                chai.request(server)
                .post('/createUser')
                .send(newClient)
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nom');
                    res.body.should.have.property('mail');
                    res.body.should.have.property('mdp');
                done();
                });
        });
        it('Le mot de passe doit être chiffré avant d\'être enregistré', (done) => {
            let newClient = {
                nom: "theo",
                mail: "theolastico@mail.com",
                mdp: "azerty"
            };
            chai.request(server)
                .post('/createUser')
                .send(newClient)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nom');
                    res.body.should.have.property('mail');
                    res.body.should.have.property('mdp').not.eql(newClient.mdp); 
                    done();
                });
            });
        }); 
        it('L\'ajout d\'un utilisateur avec un e-mail déjà existant doit échouer', (done) => {
            // Premier utilisateur
            let firstClient = {
                nom: "Premier",
                mail: "premier@mail.com",
                mdp: "password1"
            };
        
            // Deuxième utilisateur avec le même e-mail que le premier
            let secondClient = {
                nom: "Deuxième",
                mail: "premier@mail.com", // Même e-mail que le premier utilisateur
                mdp: "password2"
            };
        
            // Ajout du premier utilisateur
            chai.request(server)
                .post('/createUser')
                .send(firstClient)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Un nouveau client a été ajouté');
        
                    // Ajout du deuxième utilisateur avec le même e-mail
                    chai.request(server)
                        .post('/createUser')
                        .send(secondClient)
                        .end((err, res) => {
                            res.should.have.status(400); // On attend une erreur 400 Bad Request
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Cet e-mail est déjà utilisé');
                            done();
                        });
                });
        });
});
  