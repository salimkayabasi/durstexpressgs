import { check, trigger } from './app';
import { onOpen, show } from './app/ui';

global.check = check;
global.show = show;
global.onOpen = onOpen;
global.trigger = trigger;
