import * as Discord from 'discord.js'
export const client = new Discord.Client();


export default class DiscordService {
    public client : Discord.Client
    constructor() {
        this.client = new Discord.Client();
    }
    start({api_key}) {
        this.client.on('message', async (msg:Discord.Message) => {
            if(msg.channel.type === 'text') {
                console.log('channel',msg.channel.name)
            }
            console.log('guild',msg.guild.name)
            console.log('author',msg.author.username)
            console.log('content',msg.content)
        });


        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });

        return this.client.login(api_key);
    }
}
