import nodemon from 'nodemon';
import { pelay, log } from 'utilities';
import { spawn } from 'child_process';

export const prawn =
  (args = [], cmd = 'node') => new Promise((resolve, reject) => {
    const child = spawn(cmd, args);

    resolve(child);
  });

export const spawnemon = config => new Promise(

  (resolve, reject) => {
    const timeout =
    pelay(5)
    .then(() => 'server did not start after timout')
    .then(reject);

    nodemon(config);

    nodemon.once('start', () => {
      timeout.cancel();
      log('nodemon started');
      resolve(nodemon);
    });

  });
