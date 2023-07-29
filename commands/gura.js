const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { holodexAPIKey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gura')
		.setDescription('看看Gura多久沒開台了！'),
	async execute(interaction) {
		const payload = {
			channel_id: 'UCoSrY_IQQVpmIRZ9Xf-y93g',
			max_upcoming_hours: '24',
			type: 'stream',
			limit: '1',
		};
		const url = 'https://holodex.net/api/v2/videos';
		const headers = { 'X-APIKEY': holodexAPIKey };

		try {
			const response = await axios.get(url, { headers, params: payload });
			const streamData = response.data[0];
			const nowTime = Date.now();

			if (streamData.status === 'past') {
				const availableAt = new Date(streamData.available_at).getTime();
				const diff = nowTime - availableAt;
				const timeDay = Math.floor(diff / (1000 * 86400));
				const timeHour = Math.floor((diff % (1000 * 86400)) / (1000 * 3600));
				const timeMin = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				const timeSec = Math.floor((diff % (1000 * 60)) / 1000);

				await interaction.reply(`鯊鯊上次開台已經過了：\n${timeDay} 天 ${timeHour} 時 ${timeMin} 分 ${timeSec} 秒\n[${streamData.title}](https://youtu.be/${streamData.id})`);
			} else if (streamData.status === 'upcoming') {
				await interaction.reply(`鯊鯊就快開台了，還不快去待機！\nhttps://youtu.be/${streamData.id}`);
			} else if (streamData.status === 'live') {
				await interaction.reply(`鯊鯊正在開台，還不快去看！\nhttps://youtu.be/${streamData.id}`);
			} else {
				await interaction.reply('不要再黑我們可愛的鯊鯊了！');
			}
		} catch (error) {
			await interaction.reply('Error fetching data:', error.message);
		}
	},
};