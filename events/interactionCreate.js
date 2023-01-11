const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`沒有名為 ${interaction.commandName} 的指令。`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`執行 ${interaction.commandName} 時發生錯誤！`);
			console.error(error);
		}
	},
};