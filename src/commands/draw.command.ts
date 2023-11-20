import {
  ActionRowBuilder,
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  DiscordjsError,
  DiscordjsErrorCodes,
  MessageContextMenuCommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  PermissionsBitField,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { BotApplicationCommand } from '../lib/bot-application-command';
import { BotClient } from '../lib/bot-client';
import { TransFunction } from '../lib/types';

export class DrawCommand extends BotApplicationCommand {
  public constructor() {
    const builder = new ContextMenuCommandBuilder()
      .setName('Draw a winner')
      .setNameLocalizations({
        fr: 'Tirer un gagnant',
      })
      .setType(ApplicationCommandType.Message);

    super({
      commandName: builder.name,
      data: builder.toJSON(),
      permissions: [PermissionsBitField.Flags.ManageMessages],
    });
  }

  public async execute(client: BotClient, interaction: MessageContextMenuCommandInteraction, t: TransFunction) {
    await super.execute(client, interaction, t);
    if (interaction.replied) return;

    const message = interaction.targetMessage;

    const emojiInput = new TextInputBuilder()
      .setCustomId(`${interaction.targetId}-modal-emoji-input`)
      .setLabel(t('emojiInput'))
      .setPlaceholder('Emoji (🎁) or custom emoji name')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const modal = new ModalBuilder()
      .setCustomId(`${interaction.targetId}-modal`)
      .setTitle(t('drawWinner'))
      .setComponents([new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(emojiInput)]);

    await interaction.showModal(modal);

    try {
      const modalSubmit = await interaction.awaitModalSubmit({
        time: 60000,
      });
      const emojiName = modalSubmit.fields.getTextInputValue(`${interaction.targetId}-modal-emoji-input`);
      const reaction = message.reactions.cache.find((r) => r.emoji.name === emojiName);

      const users = await reaction?.users.fetch();
      if (!users || users.size === 0) {
        await modalSubmit.reply({ content: t('noUsersReacted'), ephemeral: true });
        return;
      }

      const winner = users.random(1).at(0);
      await modalSubmit.reply({ content: `${t('winnerIs')} ${winner?.toString()}` });
    } catch (error) {
      if (error instanceof DiscordjsError && error.code === DiscordjsErrorCodes.InteractionCollectorError) {
        await interaction.followUp({ content: t('commandCancelled'), ephemeral: true });
        return;
      }

      throw error;
    }
  }
}
