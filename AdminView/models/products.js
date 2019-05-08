var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    catergory: { type: Schema.ObjectId, ref: 'Author', required: true },
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{ type: Schema.ObjectId, ref: 'Genre' }]
});

// Virtual for this Product instance URL.
ProductSchema
.virtual('url')
.get(function () {
  return '/product/'+this._id;
});

// Export model.
module.exports = mongoose.model('Product', ProductSchema);