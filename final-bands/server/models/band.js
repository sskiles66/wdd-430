
const mongoose = require('mongoose');

const bandSchema = mongoose.Schema({
   bandTitle: { type: String },
   genre: { type: String },
   imageUrl: { type: String },
});

module.exports = mongoose.model('Band', bandSchema);