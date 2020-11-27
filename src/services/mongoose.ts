const mongoose = require('mongoose');

export default class MongooseService {
    static start({
        url
    }) {

        //'mongodb://localhost:27017/test',
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}
