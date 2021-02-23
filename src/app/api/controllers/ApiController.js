/**
 *  prinzip wie andere Controller, 
 * bei Postmann ....
 * http://localhost:4200/api/courses  => json
 * http://localhost:4200/courses => document Html-content
 */ 
const Course = require('../../models/Courses');
class ApiController {  
    async courses(req, res, next) {  
       try {
           var courses = await Course.find();        
           res.json(courses);           
       } catch (error) {
           next(error)
       } 
    }

    async create(req, res, next) {  
       var newCourse =  await Course.create(req.body);
       res.json(newCourse);
    }

    update_put(req, res, next) {  
        Course.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.json(req.body))
        .catch((error) => next(error));
    }
    
    async update_patch(req, res, next) {  
        Course.updateOne({ _id: req.params.id }, req.body)
        .then((data) => res.json(data))
        .catch(next);
    }

}
module.exports = new ApiController();


// // KANN MAN SO SCHREIBEN, export einzelne function
// const Course = require('../../models/Courses');
// module.exports.courses = async function (req, res) {
//     try {
//         var courses = await Course.find();        
//         res.json(courses);           
//     } catch (error) {
//         next(error)
//     } 
// } 

// module.exports.create = async function (req, res) {
//        var newCourse =  await Course.create(req.body);
//        res.json(newCourse);
// } 
// //