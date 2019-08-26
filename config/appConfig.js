
let appConfig = {};

appConfig.port = 3001;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";

appConfig.db = {
    uri: 'mongodb://anuragkothare:art3Rag!@ds021663.mlab.com:21663/insta-app'
}

appConfig.apiVersion = '/api/v1';

module.exports = {

    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}