// Oreille / Auris
const { client, TOKEN } = require('./imports');
const { joinVoiceChannel } = require('@discordjs/voice');

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    console.log(`Message received: ${message.content}`);

    if (message.content === '!spymic') {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            try {
                console.log(`Attempting to join voice channel: ${voiceChannel.name}`);

                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                console.log(`Successfully joined voice channel: ${voiceChannel.name}`);
                await message.channel.send(`Listening in ${voiceChannel.name}`);

                // Here you can add logic to handle audio receiving

            } catch (error) {
                console.error('Error connecting to voice channel:', error);
                await message.channel.send('Failed to connect to the voice channel.');
            }
        } else {
            console.log('User not connected to any voice channel');
            await message.channel.send('Not connected to any voice channel');
        }
    }
});

client.login(TOKEN);
