// Bouche / Oris
const { client, TOKEN_B } = require('./imports');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    console.log(`Message received: ${message.content}`);

    if (message.content === '!spylis') {
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
                await message.channel.send(`Transmitting sound in ${voiceChannel.name}`);

                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                });

                const resource = createAudioResource('./path-to-audio-file.mp3');
                player.play(resource);
                connection.subscribe(player);

                console.log('Audio playback started');

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

client.login(TOKEN_B);
