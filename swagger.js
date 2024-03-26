const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['../../API/Controllers/client_controller.js'], // files containing annotations as above
};
const specs = swaggerJsdoc(options);


module.exports = { specs, swaggerUi };



