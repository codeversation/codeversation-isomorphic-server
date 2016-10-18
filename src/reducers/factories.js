import { List, Map } from 'immutable';
import { constJoin } from 'utilities';

export const listReducerFactory = (type) => {
  const phrase = verb => constJoin(verb, type);

  return (list = new List(), action) => {
    const { data, id, comparator } = action;

    switch (action.type) {
      case phrase('append'):
        return list.concat(data);
      case phrase('delete'):
        return list.delete(id);
      case phrase('insert'):
        return list.insert(id, data);
      case phrase('update'):
        return list.update(id, old => ({ ...old, data }));
      case phrase('clear'):
        return list.clear();
      case phrase('sort'):
        return list.sort(comparator);
      default:
        return list;
    }
  }
};

export const mapReducerFactory = (type) => {
  const phrase = verb => constJoin(verb, type);
  return (map = new Map(), action) => {
    const { key, value } = action;

    switch(action.type) {
      case phrase('insert'):
        return map.set(key, value);
      case phrase('delete'):
        return map.delete(key);
      case phrase('update'):
        return map.update(key, (v) => v);
      case phrase('clear'):
        return map.clear();
      default:
        return map;
    }
  }
};
