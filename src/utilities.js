/**
 * General utilities for use in the client or server.
 * @module utilities
 */

import { fromJS } from 'immutable';
import mapValues from 'lodash/mapValues';
import Promise from 'bluebird';

// for checking if the current code is running in the node or browser
// environment.
export const env = () => typeof window === 'undefined' ? 'node' : 'browser';

Promise.config({
  cancellation: true,
});

/**
 * Converts args into an uppercase, underscore seperated string.
 * @function
 * @param {string} words - variable number of string words to cat.
 * @return {string} Result
 */
export const constJoin = (...words) =>
  words.map(word => word.toUpperCase()).join('_');

/**
 * decode the plain json string into a store where
 * all the objects are converted with immutable
 * @function
 * @param {string} json - the input json
 * @return {object} store - the redux store with Immutable members
 */
export const decodeStore =
  json => mapValues(JSON.parse(json), val => fromJS(val));

/**
 * A simple logging function for debugging.
 * Will not produce output in production.
 * @function
 * @param {string} messages - variable arg list of strings
 */
export const log = ::console.log;

/**
 * A promised delay function.  The promise returned can be canceled to
 * stop the timer and prevent resolution.
 * @function
 * @param  {Number} duration - time in seconds to delay
 * @return {Promise} delayPromise - promise that will resolve after
 * {@link duration} seconds
 */
export const pelay = time =>
  new Promise((resolve, reject, onCancel) => {
    const pelayTimeout = setTimeout(resolve, time*1000);

    onCancel(() => clearTimeout(pelayTimeout));
  });
