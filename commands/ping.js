const { SlashCommandBuilder } = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;

// 要exports nodejs才能require
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('查看ㄐㄐ人的ping'),
	async execute(interaction) {
		// deferReply會報錯，還在研究中
		// await interaction.deferReply({ ephemeral: true });
		// await wait(100);
		const sent = await interaction.reply({ content: 'Pong!', fetchReply: true });
		interaction.editReply(`Ping: ${sent.createdTimestamp - interaction.createdTimestamp} ms`);
	},
};