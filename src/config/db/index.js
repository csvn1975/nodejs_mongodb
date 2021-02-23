const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const ATLAS_URL = 'mongodb+srv://tnle1170:Nhatquang1702@cluster0.ueck8.mongodb.net/test?retryWrites=true&w=majority';
const LOCAL_URL = 'mongodb://localhost:27017/f8_education_dev';

async function connect() {
    try {
        await mongoose.connect(
            ATLAS_URL,
            options,
        );
        console.log(`Connect successfully:`);
    } catch (err) {
        console.error(`Connect to database failure: ${err}`);
    }
}

module.exports = { connect };
