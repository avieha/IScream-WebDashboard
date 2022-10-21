const config =
    process.env.NODE_ENV !== 'production'
        ? {
              messageBrokerURL: 'http://localhost:3001',
              StreamLayerURL: 'http://localhost:3002',
              BatchLayerURL: 'http://localhost:3003'
          }
        : {
              messageBrokerURL: 'https://message-broker-service.herokuapp.com',
              StreamLayerURL: 'https://stream-layer-service.herokuapp.com',
              BatchLayerURL: 'https://batch-layer-service.herokuapp.com/'
          };

console.log(config);
export default config;
