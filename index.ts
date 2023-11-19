import dotenv from 'dotenv';
import { BotClient } from './src/lib/bot-client';
import { Events, GatewayIntentBits } from 'discord.js';

dotenv.config();

/**
 * Main entry point for the application
 */
void (async (): Promise<void> => {
  const client = new BotClient({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(client, interaction);
    } catch (error: unknown) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
    }
  });

  await client.login(process.env.TOKEN);
})();
