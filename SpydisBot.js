// Oreille / Auris / Spydisbot.js
const { client, TOKEN } = require('./imports');
const { joinVoiceChannel } = require('@discordjs/voice');

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!spymic') {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            try {
                // Join the voice channel
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                await message.channel.send(`Listening in ${voiceChannel.name}`);

                // Here you can add logic to handle audio receiving

            } catch (error) {
                console.error('Error connecting to voice channel:', error);
                await message.channel.send('Failed to connect to the voice channel.');
            }
        } else {
            await message.channel.send('Not connected to any voice channel');
        }
    }
});

client.login(TOKEN);
