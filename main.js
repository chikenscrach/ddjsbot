// fs 能夠讀取commands底下的指令
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// 看需求增加intents, 詳細請看API
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// collection能有效儲存指令
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`${c.user.tag} 準備登入！`);
});

// 透過token登入Discord
client.login(token);