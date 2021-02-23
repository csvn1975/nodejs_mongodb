const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

UserSchema = new Schema(
    {
        username: { type: String },
        password: { type: String, maxlength: 128, required: true },
        email: { type: String, required:true, unique: true },
        dest: {type: String, maxlength: 64},
        avatar: {type: String, maxlength: 128},
        slug: { type: String, slug: 'username', unique: true },
    },
    {
        timestamps: true, //createdAt, updatedAt
    },
);

//add plugin
mongoose.plugin(slug);
UserSchema.plugin(mongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: 'all',
});


module.exports = mongoose.model('User', UserSchema);
