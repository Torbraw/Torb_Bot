import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v10';
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';
import { BotClient } from './bot-client';

export abstract class BotApplicationCommand {
  private _data: RESTPostAPIApplicationCommandsJSONBody;

  private _commandName: string;

  private _permissions: bigint[];

  public get data(): RESTPostAPIApplicationCommandsJSONBody {
    return this._data;
  }

  public set data(value: RESTPostAPIApplicationCommandsJSONBody) {
    this._data = value;
  }

  public get commandName(): string {
    return this._commandName;
  }

  public set commandName(value: string) {
    this._commandName = value;
  }

  public get permissions(): bigint[] {
    return this._permissions;
  }

  public set permissions(value: bigint[]) {
    this._permissions = value;
  }

  public constructor(settings: {
    data: RESTPostAPIApplicationCommandsJSONBody;
    commandName: string;
    permissions?: bigint[];
  }) {
    this._data = settings.data;
    this._commandName = settings.commandName;
    this._permissions = settings.permissions ?? [];
  }

  public async execute(client: BotClient, interaction: ChatInputCommandInteraction): Promise<void> {
    // Verify if the user can execute the command
    if (!this.hasPermission(interaction.memberPermissions)) {
      await interaction.reply({ content: 'Unauthorized', ephemeral: true });
      return;
    }
  }
  public hasPermission(memberPermission: PermissionsBitField | null): boolean {
    if (memberPermission?.has(this.permissions)) return true;
    return false;
  }
}
