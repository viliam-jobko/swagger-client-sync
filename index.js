const Swagger = require('swagger-client');
const deasync = require('deasync');


const cachedClients = {};


function generateClient(options) {
  const client = new Swagger(options);
  
  while (!(client instanceof Swagger) && client.inspect().state === 'pending') {
    deasync.sleep(1);
  }

  return client.valueOf();
}

function returnClient(options, ignoreCache) {
  if (typeof options === 'string') {
    options = {
      url: options,
      usePromise: true
    };
  }

  if (ignoreCache === true) {
    return generateClient(options);
  }

  const optionsJSON = JSON.stringify(options);
  if (cachedClients[optionsJSON] instanceof Swagger) {
    return cachedClients[optionsJSON];
  } else {
    cachedClients[optionsJSON] = generateClient(options);
    return cachedClients[optionsJSON];
  }
}


module.exports = returnClient;


const petstoreApiClientOptions = {
  url: 'http://petstore.swagger.io/v2/swagger.json',
  usePromise: true
};
const petstoreApiClient = returnClient(petstoreApiClientOptions);

petstoreApiClient.pet.getPetById({ petId: 7 })
  .then(pet => console.log(pet));