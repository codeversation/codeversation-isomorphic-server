import { List } from 'immutable';
import { constJoin } from 'utilities';

export const listReducerFactory = (type) => {

  const phrase = verb => constJoin(verb, type);

  return (state = new List(), action) => {
    const { data, id, comparator } = action;

    switch (action.type) {
      case phrase('append'):
        return items.concat(data);
      case phrase('delete'):
        return items.delete(id);
      case phrase('insert'):
        return items.insert(id, data);
      case update('update'):
        return items.update(id, old => ({ ...old, data }));
      case phrase('clear'):
        return items.clear();
      case phrase('sort'):
        return items.sort(comparator);
      default:
        return items;
    }
  }
};
