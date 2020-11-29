const mongoose = require('mongoose');

export default class MongooseService {
    static start({
        url
    }) {

        //'mongodb://localhost:27017/test',
        mongoose.connect(`mongodb://home.errorlog.xyz:27017/brain-base`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(console.log.bind(null,"db connected"))
    }
}
