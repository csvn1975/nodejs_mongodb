const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

module.exports = {
    bcryptPassword : function(input){
            var bcryptpwd = "12121212";
            // bcrypt.genSalt(saltRounds, function(err, salt) {
            //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            //         if (!err)
            //         bcryptpwd = hash
            //     });
            // });  
            return bcryptpwd
    }
}

 