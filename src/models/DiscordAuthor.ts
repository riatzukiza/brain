const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { DiscordMessage } from './index'

export const DiscordAuthor = mongoose.model('DiscordAuthor',{
    id       : { type: String, required: true },
    name     : String,
    messages : [{ type: Schema.Types.ObjectId, ref:"DiscordMessage" }]
})
