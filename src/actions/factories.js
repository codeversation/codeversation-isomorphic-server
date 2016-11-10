import { constJoin } from 'utilities';
import mapValues from 'lodash/mapValues';



const actionFactoryFactory =
	(defaultActions = {}) =>
		(type, customActions = {}) =>
			mapValues({ ...defaultActions, ...customActions },
				(action, verb, actions) =>
					(...args) =>
						({ ...action.call(actions, ...args), type: constJoin(verb, type) })
		)
;

export const listActionFactory =
	actionFactoryFactory({
    append(data) { return { data } },
    insert(id, data){ return { id, data } },
    delete(id) { return { id } },
    update(id, data) { return { id, data } },
    sort(comparator) { return { comparator } },
  })
;

export const mapActionFactory =
	actionFactoryFactory({
    insert(key, value) { return ({ key, value }) },
    delete(key) { return { key } },
    update(key, value) { return { key, value} },
		merge(keyValuePairs) { return { keyValuePairs } },
		clear() {}
	})
;
