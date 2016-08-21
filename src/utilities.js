import { fromJS } from 'immutable';
import mapValues from 'lodash/mapValues';

export const constJoin = (...words) =>
  words.map(word => word.toUpperCase()).join('_');

export const decodeStore =
  json => mapValues(JSON.parse(json), val => fromJS(val));

export const log = ::console.log;
