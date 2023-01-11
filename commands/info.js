const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('提供伺服器或使用者資訊')
		.addSubcommand(subcommand =>
			subcommand
				.setName('使用者')
				.setDescription('使用者資訊')
				.addUserOption(option => option.setName('目標').setDescription('使用者')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('伺服器')
				.setDescription('伺服器資訊')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === '使用者') {
			const user = interaction.options.getUser('目標');

			if (user) {
				await interaction.reply(`使用者名稱: ${user.username}\nID: ${user.id}`);
			}
			else {
				await interaction.reply(`你的名稱: ${interaction.user.username}\n你的ID: ${interaction.user.id}`);
			}
		}
		else if (interaction.options.getSubcommand() === '伺服器') {
			await interaction.reply(`伺服器名稱: ${interaction.guild.name}\n共有 ${interaction.guild.memberCount} 人`);
		}
	},
};