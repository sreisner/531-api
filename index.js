const express = require('express');
const mongoConfigurator = require('./mongoConfigurator');
const passportConfigurator = require('./passportConfigurator');
const endpointConfigurator = require('./endpoints/endpointConfigurator');

const app = express();

mongoConfigurator.connect();
passportConfigurator.configurePassport(app);
endpointConfigurator.configureEndpoints(app);

app.listen(3001, () => console.log('Running...'));