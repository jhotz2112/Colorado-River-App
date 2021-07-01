require('dotenv').config();
require('./config/database');

const River = require('./models/river');

River.find({}).then(rivers => console.log(rivers));