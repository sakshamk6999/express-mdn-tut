var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name : {type: String, required: true, max: 100},
    family_name : {type: String, required: true, max: 100},
    date_of_birth : {type: Date},
    date_of_death : {type: Date},
});

AuthorSchema.virtual('fullname').get(function(){
    var fullname = '';
    if(this.first_name && this.family_name){
        fullname = this.first_name + " " + this.family_name;
    }
    return fullname;
})

AuthorSchema.virtual('lifespan').get(function(){
    return moment(this.date_of_birth).format('YYYY-MM-DD') + ' - ' + moment(this.date_of_death).format('YYYY-MM-DD');
});

AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function(){
return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema.virtual('date_of_death_formatted').get(function(){
    return moment(this.date_of_death).format('YYYY-MM-DD');
});
    



module.exports = mongoose.model('Author', AuthorSchema);