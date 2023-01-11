const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

// 刪除伺服器指令
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('成功刪除伺服器指令'))
	.catch(console.error);

// 刪除全域指令
/* 我沒用到這個
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('成功刪除全部指令'))
	.catch(console.error);
*/