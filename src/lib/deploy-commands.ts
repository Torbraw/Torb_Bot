import dotenv from 'dotenv';
import { UtilsService } from './utils-service';
import { REST, Routes } from 'discord.js';

dotenv.config();

void (async (): Promise<void> => {
  const clientId = process.env.CLIENT_ID ?? '';
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN ?? '');

  const utilsService = new UtilsService();

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(clientId), { body: utilsService.getCommands().map((c) => c.data) });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error: unknown) {
    console.error(error);
  }
})();
