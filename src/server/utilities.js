import nodemon from 'nodemon';
import { pelay } from 'utilites';

export const spawnemon = script => {
  nodemon({
    script,
    ext: 'js json',
  });

  return new Promise((resolve, reject) => {
    const timeout =
      pelay(1)
      .then(() => 'server did not start after timout')
      .then(reject);
    
    nodemon.once('start', () => {
      timeout.cacel()
      resolve();
    });
  });
};
