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

// let talkFrameStartTime = Date.now();


import  {DiscordService} from "./services/discord";



(async () => {

    require('dotenv').config()
    const Duck = new DiscordService()
    const Timmy = new DiscordService()

    await Duck.start({api_key:process.env.DUCK_DISCORD_KEY});
    await Timmy.start({api_key:process.env.TIMMY_DISCORD_KEY})
})()

