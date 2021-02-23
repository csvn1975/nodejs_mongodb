const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** soft delete: data with deletedAt...
 * https://www.npmjs.com/package/mongoose-delete
 * npm i mongoose-delete --save
 */

 /** slug auto generation
 * sonderzeichen durch '-' ersetzen
 * npm install mongoose-slug-generator --save
 */
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const CourseSchema = new Schema(
    {
        id: { type: Number, unique: true },
        albumId: { type: String },
        title: { type: String, maxlength: 128, required: true },
        url: { type: String, maxlength: 128, default: 'Test' },
        thumbnailUrl: { type: String,  maxlength: 128},
        
        // created_at: {type: Date, default: Date.now()},
        // updated_at: {type: Date, default: Date.now()},
        slug: { type: String, slug: 'title', unique: true }, // slug könnte anderer Name sein
    },
    {
        timestamps: true, //createdAt, updatedAt
    },
);

//add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: 'all',
});

//custom helper:
CourseSchema.query.sorttabel = function(req) {
    if (req.query.hasOwnProperty('sort')){
        const isSortValid = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isSortValid ? req.query.type : 'desc'
        })
    } 
    else 
    return this;  
}

module.exports = mongoose.model('Course', CourseSchema);
