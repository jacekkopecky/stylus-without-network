import {COMMANDS} from './port';
import {importScriptsOnce} from './worker-util';

/** @namespace WorkerAPI */
Object.assign(COMMANDS, {
  /* global extractSections */
  parseMozFormat: [() => extractSections, 'moz-parser.js', 'parserlib.js'],
});

for (const k in COMMANDS) {
  if (Array.isArray(COMMANDS[k])) {
    const [getFunc, ...files] = COMMANDS[k];
    COMMANDS[k] = function () {
      importScriptsOnce(...files);
      return (COMMANDS[k] = getFunc()).apply(this, arguments);
    };
  }
}
