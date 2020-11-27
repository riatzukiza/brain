const mongoose = require('mongoose');

export const DiscordMessage = mongoose.model('DiscordMessage',{
    did:String,
    channel:String,
    guild:String,
    author:String,
    content:String
})
