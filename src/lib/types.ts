import { i18n } from './i18n';
import { DEFAULT_LANGUAGE } from './config';

export type TransFunction = (key: keyof (typeof i18n)[typeof DEFAULT_LANGUAGE]) => string;
