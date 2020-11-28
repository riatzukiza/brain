import Discord from 'discord.js';
class Agent {
    constructor() {}
    // Thinking represents an internal monolog we'll have the
    // agent doing to have it keeping track of its outputs
    // something in the outputs will be a parameter for deciding how 
    // we will train on the data it has available to it
    think() {}
    learn() {}
    say() {}
    read(msg:Discord.Message) {}
}