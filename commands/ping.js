const { SlashCommandBuilder } = require('discord.js');

// 要exports nodejs才能require
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('回覆Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};