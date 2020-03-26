var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;


var BookInstanceSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    imprint : {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_date: {type: Date, default: Date.now}
});

BookInstanceSchema.virtual('url').get(() => {
    return '/catalog/bookInstance/' + this._id;
});

BookInstanceSchema.virtual('due_back_formatted').get(()=>{
    return moment(this.due_date).format('MMMM Do, YYYY')
})

module.exports = mongoose.model('BookInstance', BookInstanceSchema);