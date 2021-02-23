class NewsController {
    // GET('news')

    index(req, res) {
        res.render('news');
    }

    sendEmail(){
        res.send("Email")
    }

    edit(req, res) {
        /**
         * req.params.slug => news/parameter von get-method, slug kann auch anderer Name
         * req.query.id => show?id=12
         * req.body.key_name => von post-method
         *
         * z.B news/edit?id=123
         */
        res.send(
            `EDIT-DETAILS - req.params.slug ${req.params.slug} - req.query: ${req.query.id}`,
        );
    }
}
module.exports = new NewsController();
