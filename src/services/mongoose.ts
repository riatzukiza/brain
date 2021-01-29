const mongoose = require('mongoose');

export default class MongooseService {
    static start({
        url
    }) {

        //'mongodb://localhost:27017/test',
        mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(console.log.bind(null,"db connected"))
    }
}
