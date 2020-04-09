const server = require('./app');
const port = 3001;
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(
    'mongodb+srv://homebanking:vivaperon@cluster0-aho4n.gcp.mongodb.net/homebanking?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Conectado campeon!');
});
server.listen(port, () => console.log(`server running on port ${port}`));