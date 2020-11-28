// import {create, fit, generate} from './lstm'

// import {TextData} from './text-data'
// import math from 'mathjs'

// // store in mongo db
// const client = new Discord.Client();

// const model = create();


// const SAMPLE_LENGTH = 512;
// const SAMPLE_STEP = SAMPLE_LENGTH;
// const INITIAL_TRAINING_INTERVAL = 600000

// let trainingInterval = INITIAL_TRAINING_INTERVAL;

// const howFast = (messages,frameStart) =>
//     math.mean(...messages.map((msg,i,a) =>
//         i > 0
//         ? msg.createdAt - a[i -1]
//         : msg.createdAt - frameStart));


import DiscordService from './services/discord';
import MongooseService from './services/mongoose';
import express = require("express");

import {DiscordMessage} from './models/DiscordMessage';

(async () => {

    require('dotenv').config()

    const Duck = new DiscordService()
    const Timmy = new DiscordService()

    const app = express();

    MongooseService.start({
        url:process.env.MONGO_DB_URL
    });

    app.get('/messages',async (req,res) => {
        const all = await DiscordMessage.find({})
        res.send(all)
    })

    app.listen(process.env.PORT || 8080)

    await Duck.start({api_key:process.env.DUCK_DISCORD_KEY});
    await Timmy.start({api_key:process.env.TIMMY_DISCORD_KEY})
})()

