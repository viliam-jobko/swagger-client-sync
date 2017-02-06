# swagger-client-sync
This is a simple wrapper that allows you to create swagger-client synchronously. It is primary intended to use with swagger-client option `usePromise`.

## Examples

### Quick start
If you pass just URL, `usePromise` will be added to options automatically.
```javascript
const petstoreApiClient = require('swagger-client-sync')('http://petstore.swagger.io/v2/swagger.json');

petstoreApiClient.pet.getPetById({ petId: 7 })
  .then(pet => console.log(pet));
```

### Using options
Options will be passed to Swagger client constructor.
```javascript
const petstoreApiClientOptions = {
  url: 'http://petstore.swagger.io/v2/swagger.json',
  usePromise: true
}
const petstoreApiClient = require('swagger-client-sync')(petstoreApiClientOptions);

petstoreApiClient.pet.getPetById({ petId: 7 })
  .then(pet => console.log(pet));
```

### More APIs in one file
You can safely create more Swagger clients in one file.
```javascript
const petstoreApiClient = require('swagger-client-sync')('http://petstore.swagger.io/v2/swagger.json');
const fleekApiClient = require('swagger-client-sync')('https://raw.githubusercontent.com/fleekjs/fleek-parser/master/examples/swagger.json');
```

### Using same API in more files
Created swagger clients are cached, so you can require them in other files faster. You can force creating new client by passing `true` as second parameter. Client created this way won't be saved in cache.
```javascript
const petstoreApiClient1 = require('swagger-client-sync')('http://petstore.swagger.io/v2/swagger.json');
const petstoreApiClient2 = require('swagger-client-sync')('http://petstore.swagger.io/v2/swagger.json');
const petstoreApiClient3 = require('swagger-client-sync')('http://petstore.swagger.io/v2/swagger.json', true);

console.log(petstoreApiClient1 === petstoreApiClient2); //true
console.log(petstoreApiClient1 === petstoreApiClient3); //false
```