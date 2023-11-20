import { LangKeys } from './config';

export const i18n = {
  fr: {
    unauthorized: 'Non autorisé',
    unexpectedError: "Une erreur inattendue est survenue lors de l'exécution de cette commande",
    noUsersReacted: "Aucun utilisateur n'a réagi avec cet emoji",
    winnerIs: 'Le gagnant est',
    drawWinner: 'Tirer un gagnant',
    emojiInput: "Entrez l'emoji pour tirer un gagnant",
    commandCancelled: 'The command has been cancelled',
  },
  en: {
    unauthorized: 'Unauthorized',
    unexpectedError: 'An unexpected error occured while executing this command',
    noUsersReacted: 'No users reacted with that emoji',
    winnerIs: 'The winner is',
    drawWinner: 'Draw a winner',
    emojiInput: 'Enter the emoji to draw a winner',
    commandCancelled: 'The command has been cancelled',
  },
} as const satisfies Record<LangKeys, Record<string, string>>;
