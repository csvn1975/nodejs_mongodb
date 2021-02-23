class SiteController {
    index(rep, res) {
        res.render('index');
    }

    home(req, res) {
        res.render('test/home');
    }

    search(req, res) {
        res.send('test/search');
    }
}

module.exports = new SiteController();
