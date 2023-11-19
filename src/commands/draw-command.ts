import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { BotApplicationCommand } from "../lib/bot-application-command";
import { BotClient } from "../lib/bot-client";

export class DrawCommand extends BotApplicationCommand {
  public constructor() {
    const builder = new SlashCommandBuilder()
      .setName('draw')
      .setDescription('Draw a winner from a message based on an emoji, must be in the same channel as the giveaway message')
      .addStringOption(option => option.setName('message_id').setDescription('The message id of the giveaway message').setRequired(true))
      .addStringOption(option => option.setName('emoji').setDescription('The emoji to draw a winner for').setRequired(true))

    super({
      commandName: builder.name,
      data: builder.toJSON(),
      permissions: [
        PermissionsBitField.Flags.ManageMessages
      ]
    })
  }

  async execute(client: BotClient, interaction: ChatInputCommandInteraction) {
    const messageId = interaction.options.getString('message_id', true);
    const emoji = interaction.options.getString('emoji', true);

    console.log(messageId)
    console.log(emoji)

    const message = await interaction.channel?.messages.fetch(messageId);
    if (!message) {
      await interaction.reply({ content: 'Message not found', ephemeral: true });
      return;
    }

    const reaction = message.reactions.cache.find(reaction => reaction.emoji.name === emoji);
    if (!reaction) {
      await interaction.reply({ content: 'Reaction not found', ephemeral: true });
      return;
    }

    const users = await reaction.users.fetch();
    console.log(users.size)
    const winner = users.random(1).at(0);
    console.log(winner)

    await interaction.reply({ content: `The winner is ${winner?.username}` });
  }
}