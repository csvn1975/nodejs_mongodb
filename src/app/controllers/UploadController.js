const nodemailer = require('nodemailer');
const transport  = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tnle2018@gmail.com',
    pass: 'Nhatquang1702'
  }
})


class UploadController {
    // GET: /component/upload
    upload(req, res) {
        res.render("components/upload");
    }

    postUpload(req, res) {
      var body = req;
      var fileData = req.file;
      console.log("Datei-Info: " , fileData);
      res.redirect('/courses')
    }

    send_email(req, res) {
        let mailOptions = {
          from : 'tnle2018@gmail.com',
          to: 'tnle2017@gmail.com;letuannguyen@gmx.net',
          // to: 'letuannguyen@gmx.net',
          subject: 'test of nodejs',
          // text : ' Hello asdasdad löjlösdasd'
          html: `<h1>security</h1>
                  Less secure app access
                  Turn off access (recommended) on`
        }

        var Test = transport.sendMail(mailOptions, (err, rs) => {
          if (err) {
            console.log("error")
          }
          else {
            console.log("sended successfully")
          }
        })
        res.redirect("back");
    }

}
module.exports = new UploadController();
