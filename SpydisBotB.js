// Bouche / Oris / SpydisBotB.js

const { client, TOKEN_B } = require('./imports');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!spylis') {
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
            try {
                // Join the voice channel
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                await message.channel.send(`Transmitting sound in ${voiceChannel.name}`);

                // Optionally, play some audio to confirm the bot is connected
                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause,
                    },
                });

                const resource = createAudioResource('./path-to-audio-file.mp3');
                player.play(resource);
                connection.subscribe(player);

            } catch (error) {
                console.error('Error connecting to voice channel:', error);
                await message.channel.send('Failed to connect to the voice channel.');
            }
        } else {
            await message.channel.send('Not connected to any voice channel');
        }
    }
});

client.login(TOKEN_B);
