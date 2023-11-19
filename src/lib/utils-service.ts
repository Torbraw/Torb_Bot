import { DrawCommand } from "../commands/draw-command";
import { BotApplicationCommand } from "./bot-application-command";

export class UtilsService {
  public getCommands(): BotApplicationCommand[] {
    return [
      new DrawCommand()
    ]
  }
}