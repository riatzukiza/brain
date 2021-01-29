
export const DiscordMessageSource = Schema({
    d_id       : { type: String, required: true },
    name     : String,
    messages : [{ type: Schema.Types.ObjectId, ref:"DiscordMessage" }]
})
