import {create, fit, generate} from './lstm'
import * as Discord from 'discord.js'

import {TextData} from './text-data'
import math from 'mathjs'

// store in mongo db
const client = new Discord.Client();

const model = create();


const SAMPLE_LENGTH = 512;
const SAMPLE_STEP = SAMPLE_LENGTH;
const INITIAL_TRAINING_INTERVAL = 600000

let trainingInterval = INITIAL_TRAINING_INTERVAL;
let messages = []

const howFast = (messages,framStart) =>
    math.mean(...messages.map((msg,i,a) =>
        i > 0
        ? msg.createdAt - a[i -1]
        : msg.createdAt - frameStartTime));

const processMessages = (msg:Discord.Message) => ({
    author:msg.author.id,
    content:msg.content,
    channel:msg.channel.id,
    createdAt:msg.createdAt
})

const train = async () => {
    try {
        if(messages.length > 0) {
            const meanTimeBetweenMessages = howFast(messages,trainFrameStartTime)
            const messageData = messages.map(processMessages)
            const str = JSON.stringify(messageData);
            const data = new TextData(
                `${messages[0].id}-${messages[messages.length - 1].id}`,
                str,
                SAMPLE_LENGTH,
                SAMPLE_STEP
            )

            messages = [];

            await fit(model,{data});
            trainFrameStartTime = Date.now()
            return setTimeout(train,trainingInterval = meanTimeBetweenMessages * messages.length * 1000)
        }
        setTimeout(train,trainingInterval = trainingInterval * 1.2)
    } catch(err) {
        messages = []
    }
};
let trainFrameStartTime = Date.now()
setTimeout(train,trainingInterval)

const talk = () => {
    let text = generate(model);
    try {
        let data = JSON.parse(text)
    } catch(err) {
    }
}

let talkFrameStartTime = Date.now();



client.on('message', async (msg:Discord.Message) => {

    let response = generate(model)
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login('NDQ5Mjc5NTcwNDQ1NzI5Nzkz.WwcGNA.UIGEHLffSczknflhkdzXrTZrjwo');
