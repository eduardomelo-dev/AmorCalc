export type ThemeMode = 'light' | 'dark';

export interface AppSettings {
  theme: ThemeMode;
  angleMode: 'deg' | 'rad';
  soundEffects: boolean;
  precision: number;
  showCharacterHelper: boolean;
}
