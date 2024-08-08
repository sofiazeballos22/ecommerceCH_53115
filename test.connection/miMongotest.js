const mongoose = require('mongoose');

const uri = 'mongodb+srv://azeballos512:xxpepegrilloxx22@clusterbackend.xvnrb.mongodb.net/?retryWrites=true&w=majority&appName=clusterBackend';

mongoose.connect(uri, { UseNewUrlParser: true, UseUniFiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas sucessfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to mongoDB Atlas', err);
    });
