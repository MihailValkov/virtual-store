const mongoose = require('mongoose');

module.exports = (dbConnection) => mongoose.connect(dbConnection);

