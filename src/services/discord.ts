import * as Discord from 'discord.js'

import {DiscordMessage} from '../models'

export default class DiscordService {
    public client : Discord.Client
    constructor() {
        this.client = new Discord.Client();
    }
    start({api_key}) {
        this.client.on('message', async (msg:Discord.Message) => {
            let channel, guild, author, content;
            if(msg.channel.type === 'text') {
                channel = msg.channel.name
            }
            [guild,author,content] = [
                msg.guild.name,
                msg.author.username,
                msg.content
            ]

            const messageRecord = new DiscordMessage({
                channel,
                guild,
                author,
                content
            });
            return messageRecord.save();
        });


        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });

        return this.client.login(api_key);
    }
}
