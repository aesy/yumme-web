import 'reflect-metadata';
import '@fontsource/fraunces/latin-500.css';
import '@fontsource/fraunces/latin-600.css';
import '@fontsource/fraunces/latin-700.css';
import '@fontsource/hanken-grotesk/latin-400.css';
import '@fontsource/hanken-grotesk/latin-500.css';
import '@fontsource/hanken-grotesk/latin-600.css';
import '@fontsource/hanken-grotesk/latin-700.css';
import 'normalize.css';
import '@/common/global.scss';
import { applyTheme, readStoredTheme } from '@/common/theme-atom';

applyTheme(readStoredTheme());
