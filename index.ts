import dotenv from 'dotenv';
import { Events, GatewayIntentBits } from 'discord.js';
import { BotClient } from './src/lib/bot-client';

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
    if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;

    const lang = client.utilsService.getLangFromLocale(interaction.locale);
    const t = client.utilsService.useTranslations(lang);

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(client, interaction, t);
    } catch (error: unknown) {
      console.error(error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: t('unexpectedError'), ephemeral: true });
      } else {
        await interaction.followUp({ content: t('unexpectedError'), ephemeral: true });
      }
    }
  });

  await client.login(process.env.TOKEN);
})();
