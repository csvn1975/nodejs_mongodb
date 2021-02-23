const mysql = require('mysql');
async function connect() {
    try {
       var connection = await mysql.createConnection({
            host: '192.168.64.2',
            user:'root',
            password: '',
            database: 'sampledb'
        });
        
        connection.connect(function (err) {
           if (!! err)
              console.error(`MySQL Connect to database failure: ${err}`);
            else  
            console.log(`MySQL Connect successfully:`);
        });

    } catch (err) {
        
    }
}

module.exports = { connect } ;
