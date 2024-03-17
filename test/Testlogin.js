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
describe('Client', () => {
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
                res.should.have.status(206);
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
                res.should.have.status(206);
                res.body.should.be.a('object');
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
                    res.should.have.status(206);
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
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Un nouveau client a été ajouté');
                    console.log(res.body)
                    res.body.newClient.should.have.property('nom');
                    res.body.newClient.should.have.property('mail');
                    res.body.newClient.should.have.property('mdp');
                done();
                });
        });
    //   it('it should POST a book ', (done) => {
    //      let book = {
    //          title: "The Lord of the Rings",
    //          author: "J.R.R. Tolkien",
    //          year: 1954,
    //          pages: 1170
    //      }
    //      chai.request(server)
    //      .post('/book')
    //      .send(book)
    //      .end((err, res) => {
    //          res.should.have.status(200);
    //          res.body.should.be.a('object');
    //          res.body.should.have.property('message').eql('Book successfully added!');
    //          res.body.book.should.have.property('title');
    //          res.body.book.should.have.property('author');
    //          res.body.book.should.have.property('pages');
    //          res.body.book.should.have.property('year');
    //        done();
    //      });
    //   });
  });
 /*
  * Test the /GET/:id route
  */
//   describe('/GET/:id book', () => {
//    it('it should GET a book by the given id', (done) => {
//      let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
//      book.save((err, book) => {
//          chai.request(server)
//          .get('/book/' + book.id)
//          .send(book)
//          .end((err, res) => {
//              res.should.have.status(200);
//              res.body.should.be.a('object');
//              res.body.should.have.property('title');
//              res.body.should.have.property('author');
//              res.body.should.have.property('pages');
//              res.body.should.have.property('year');
//              res.body.should.have.property('_id').eql(book.id);
//            done();
//          });
//      });
            
//    });
//   });
//  /*
//   * Test the /PUT/:id route
//   */
//   describe('/PUT/:id book', () => {
//    it('it should UPDATE a book given the id', (done) => {
//      let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//      book.save((err, book) => {
//              chai.request(server)
//              .put('/book/' + book.id)
//              .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
//              .end((err, res) => {
//                  res.should.have.status(200);
//                  res.body.should.be.a('object');
//                  res.body.should.have.property('message').eql('Book updated!');
//                  res.body.book.should.have.property('year').eql(1950);
//                done();
//              });
//        });
//    });
//   });
//  /*
//   * Test the /DELETE/:id route
//   */
//   describe('/DELETE/:id book', () => {
//    it('it should DELETE a book given the id', (done) => {
//      let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//      book.save((err, book) => {
//              chai.request(server)
//              .delete('/book/' + book.id)
//              .end((err, res) => {
//                  res.should.have.status(200);
//                  res.body.should.be.a('object');
//                  res.body.should.have.property('message').eql('Book successfully deleted!');
//                  res.body.result.should.have.property('ok').eql(1);
//                  res.body.result.should.have.property('n').eql(1);
//                done();
//              });
//        });
//    });
//    });
});
  