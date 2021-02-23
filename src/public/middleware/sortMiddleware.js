module.exports = function sortMiddleware (req, res,  next) {
    
    res.locals.course_sort = {
        enable: false,
        type: 'default',
    }

    if (req.query.hasOwnProperty('sort')){            
        Object.assign(res.locals.course_sort, 
            {enable: true,
            type: req.query.type,
            column: req.query.column
            })
    }
    next() // weiter gehen
}