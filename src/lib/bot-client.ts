import { UtilsService } from './utils-service';
import { Client, ClientOptions } from 'discord.js';
import { BotApplicationCommand } from './bot-application-command';

export class BotClient extends Client {
  private readonly _commands = new Map<string, BotApplicationCommand>();

  private readonly _utilsService = new UtilsService();

  public constructor(options: ClientOptions) {
    super(options);

    for (const command of this._utilsService.getCommands()) {
      this._commands.set(command.commandName, command);
    }
  }

  public get commands(): Map<string, BotApplicationCommand> {
    return this._commands;
  }

  public get utilsService(): UtilsService {
    return this._utilsService;
  }
}
