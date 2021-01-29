const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import * as Discord from 'discord.js'

export const Model = mongoose.model('DiscordMessage',{
    id         : { type: String, required: true ,unique:true },
    channel    : { type: Schema.Types.ObjectId, ref:"DiscordChannel" },
    guild      : { type: Schema.Types.ObjectId, ref:"DiscordGuild" },
    author     : { type: Schema.Types.ObjectId, ref:"DiscordAuthor" },

    viewers     : [ { type: Schema.Types.ObjectId, ref:"DiscordAuthor" } ],

    createdAt  :  Date ,
    content    : String
})

interface Entity {
    id:string
}
interface GuildEntity extends Entity {
    name:string;
}
interface AuthorEntity extends Entity {
    username:string
}
interface ChannelEntity extends Entity {
    name:string;
    type:string;
}

interface MessageEntity extends Entity {
    author: AuthorEntity;
    guild: GuildEntity;
    channel: ChannelEntity;
    content: string;
}

export const saveNewMessage = (msg:Discord.Message):Promise<MessageEntity> => (
    new Model({
        id:msg.id,
        channel:msg.channel.type === 'text'
            ? msg.channel.id
            : null,
        guild:msg.guild.id,
        author:msg.author.id,
        content:msg.content
    })
).save();

/***
 *  @description create a new message record if a message with this id has not yet had a record added.
 * 
 *
 */
export const observeMessage = (client:Discord.Client, msg:Discord.Message):Promise<MessageEntity> => (
    !Model.exists({id:msg.id})
        ? saveNewMessage(msg)
        : Model.updateOne({id:msg.id},{
            $addToSet: {
                viewers:client.user.id
            }
        })
)
