import { fromJS } from 'immutable';
import mapValues from 'lodash/mapValues';
import Promise from 'bluebird';

Promise.config({
  cancellation: true,
});

export const constJoin = (...words) =>
  words.map(word => word.toUpperCase()).join('_');

export const decodeStore =
  json => mapValues(JSON.parse(json), val => fromJS(val));

export const log = ::console.log;

export const pelay = time =>
  new Promise((resolve, reject, onCancel) => {
    const pelayTimeout = setTimeout(resolve, time*1000);

    onCancel(() => clearTimeout(pelayTimeout));
  });
