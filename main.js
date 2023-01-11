// fs 能夠讀取commands底下的指令
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// 看需求增加intents, 詳細請看API
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// collection能有效儲存指令
client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// 在創建Collection中創建新的物件
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] 指令 ${filePath} 缺少 "data" 或 "execute" 屬性。`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
/* 此部分移至 events/ready.js
client.once(Events.ClientReady, c => {
	console.log(`${c.user.tag} 準備登入！`);
});
*/

// 透過token登入Discord
client.login(token);

/* 此部分移至events/interactionCreate.js
client.on(Events.InteractionCreate, async interaction => {
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
		console.error(error);
		await interaction.reply({ content: '執行指令時發生錯誤！', ephemeral: true });
	}
});
*/