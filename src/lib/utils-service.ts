import { DrawCommand } from '../commands/draw.command';
import { BotApplicationCommand } from './bot-application-command';
import { DEFAULT_LANGUAGE, LANGUAGES, LangKeys } from './config';
import { i18n } from './i18n';
import { TransFunction } from './types';

export class UtilsService {
  public getCommands(): BotApplicationCommand[] {
    return [new DrawCommand()];
  }

  public getLangFromLocale(locale: string): LangKeys {
    if (locale in LANGUAGES) return locale as LangKeys;
    return DEFAULT_LANGUAGE;
  }

  public useTranslations(lang: LangKeys): TransFunction {
    return function t(key: keyof (typeof i18n)[typeof DEFAULT_LANGUAGE]) {
      return i18n[lang][key];
    };
  }
}
