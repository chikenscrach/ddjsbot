const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('重複你的輸入！')
		.addStringOption(option =>
			option.setName('輸入')
				.setDescription('輸入你想要我重複的話')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('輸入');
		await interaction.reply(input);
	},
};