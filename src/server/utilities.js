/**
 * Utility functions that should only be used on the server side.
 * @module server/utilities
 */

import nodemon from 'nodemon';
import { pelay, log } from 'utilities';
import { spawn } from 'child_process';

/**
 * A promised process spawn.
 * @function
 * @param {array} [args=[]] - the parameters to pass to cmd
 * @param {string} [cmd='node'] - the command to run
 * @return {Promise} will resolve after process spawns with with child
 */
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

  }
);

// a wrapper for async express routes
export const errLink = fn => (res, req, next) => {
	try {
		fn(res, req, next).catch(err => next(err));
	} catch (err) {
		next(err);
	}
};

// a wrapper for async express routes
export const reactErrLink = fn => (res, req, next) => {
	try {
		fn(res, req, next).catch(err => {
			err.isReact = true;
			next(err);
		});
	} catch (err) {
		err.isReact = true;
		next(err);
	}
};
