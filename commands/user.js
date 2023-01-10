const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('提供使用者資訊'),
	async execute(interaction) {
		// interaction.user 是執行指令的人
		// interaction.member 表示此人在某個特定伺服器中
		await interaction.reply(`此指令由 ${interaction.user.username} 執行，他在 ${interaction.member.joinedAt} 進入此伺服器。`);
	},
};