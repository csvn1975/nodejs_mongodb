const Course = require('../models/Courses');
const { mongooseToObject } = require('../../utils/mongoose');


class CoursesController {
    
    /** [GET]: courses/
      nach Promise Methode 
    */
    
    index(req, res) {   
        
       let courses = Course.find().sorttabel(req); // DAS IST EINE PROMISE
        Promise.all([Course.countDocumentsDeleted({}), courses])
        .then(([counter, courses]) => {
            var data = mongooseToObject(courses);
            res.render('courses/index', {
                title: 'Cours-List',
                counter,
                data
            });
        })
        .catch((error) => res.status(500).json({ error: 'message' }));
    }

    /** async/await */
    
    // GET /courses
    async showCard(req, res) {  
        //mit await wird object return
        var counter =  await Course.countDocumentsDeleted({});
        var courses = await Course.find().sorttabel(req);        
        res.render('courses/index-card', {
                title:"Listing of courses",
                counter,
                data: mongooseToObject(courses)
            });   
      
    }

    //[GET]: "courses/trash'
    trash(req, res) {
        // promise
        Course.findDeleted({})
            .then((courses) => {
                var data = mongooseToObject(courses);
                res.render('courses/trash', {
                    title: 'Listing of inactive courses',
                    data,
                });
            })
            .catch((error) => res.status(500).json({ error: 'message' }));
    }


    // [GET]: courses/:id/edit
    edit(req, res, next) {        
        var id = req.params.id;
        Course.findOne({ _id: id })
            .then((data) => {
                data = data.toObject();           
                res.render('courses/edit', { data });
            })
            .catch((err) => next(err));
    }

    // [PUT]: courses/:id/update
    update(req, res, next) {
        const randomId = Math.trunc(Math.random()*2000);          
        const thumbnailUrl = "https://picsum.photos/id/" + randomId + "/300/200";
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/courses'))
            .catch(next);
    }
    
    //[GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST]: courses/add
    add(req, res) {
        const randomId = Math.trunc(Math.random()*2000);          
        req.body.thumbnailUrl = "https://picsum.photos/id/" + randomId + "/300/200";
        const courseAdd = new Course(req.body);
        courseAdd
            .save()
            .then((data) => {
                res.render('courses/create', {
                    done: true,
                    data: req.body,
                });
            })
            .catch((err) => handleError(err));
    }


    // [POST]: /multi_deletes
    handleDeletes(req, res, next) {
        var courseIds = req.body['checkbox-courses'];
        Course.delete({ _id: {$in: req.body['checkbox-courses']} })
        .then(() => res.redirect('back'))
        .catch(next);
    }
   
    //[PATCH]: courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    // [DELETE]: /:id/delete  bleiben im System
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }
    
    //[DELETE] /:id/destroy   => force delete
    destroy(req, res, next) {      
         Course.deleteOne({"_id" : req.params.id})
         .then(() => res.redirect('back'))
         .catch(next);
    }

}
module.exports = new CoursesController();
