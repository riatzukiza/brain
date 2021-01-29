const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const DiscordGuild = mongoose.model('DiscordGuild',{
    d_id       : { type: String, required: true },
    name     : String,
    messages : [{ type: Schema.Types.ObjectId, ref:"DiscordMessage" }]
})
