import swaggerJsdoc from "swagger-jsdoc"


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Rest Users',
      version: '1.0.0',
      description: 'Project description for Rest APIUsers'
    },
  },
  //apis: ['./src/routes*.js'], // files containing annotations as above
  apis: ["swagger.yml"]
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;