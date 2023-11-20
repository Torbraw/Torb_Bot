import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v10';
import {
  ChatInputCommandInteraction,
  MessageContextMenuCommandInteraction,
  PermissionsBitField,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';
import { BotClient } from './bot-client';
import { TransFunction } from './types';

export abstract class BotApplicationCommand {
  private _data: RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody;

  private _commandName: string;

  private _permissions: bigint[];

  public get data(): RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody {
    return this._data;
  }

  public set data(value: RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody) {
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

  public async execute(
    _client: BotClient,
    interaction: ChatInputCommandInteraction | MessageContextMenuCommandInteraction,
    _t: TransFunction,
  ): Promise<void> {
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
