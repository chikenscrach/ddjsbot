const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('提供伺服器資訊'),
	async execute(interaction) {
		// interaction.guild 是執行程式時的伺服器
		await interaction.reply(`此伺服器為 ${interaction.guild.name} 有 ${interaction.guild.memberCount} 位成員。`);
	},
};