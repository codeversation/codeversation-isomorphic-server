import { List } from 'immutable';
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
