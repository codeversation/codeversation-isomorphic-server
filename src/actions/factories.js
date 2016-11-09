import { constJoin } from 'utilities';
import mapValues from 'lodash/mapValues';

const actionFactoryFactory =
	(defaultActions) =>
		(type, customActions) =>
			mapValues({ ...defualtActions, ...customActions },
				(action, verb) =>
					(...args) =>
						({ ...action(...args), type: constJoin(verb, type) })
		)
;

export const listActionFactory =
	actionFactoryFactory({
    append: data => ({ data }),
    insert: (id, data) => ({ id, data }),
    delete: id => ({ id }),
    update: (id, data) => ({ id, data }),
    sort: comparator => ({comparator }),
  })
;

export const mapActionFactory =
	actionFactoryFactory({
	    insert: (key, value) => ({ key, value }),
	    delete: key => ({ key }),
	    update: (key, value) => ({ key, value }),
			merge: keyValuePairs => ({ keyValuePairs }),
	})
;
