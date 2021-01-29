import * as Discord from 'discord.js'

import {DiscordMessage} from '../models'

interface startInput {
    api_key:string
}
export default class DiscordService {
    public client : Discord.Client
    constructor() {
        this.client = new Discord.Client();
    }
    start({api_key}:startInput) {
        this.client.on('message', async (msg:Discord.Message) => {
        });


        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });

        return this.client.login(api_key);
    }
}
