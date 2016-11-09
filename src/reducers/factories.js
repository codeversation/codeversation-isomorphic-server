import { List, Map } from 'immutable';
import { constJoin } from 'utilities';

const evalCaseObjFactory = (type, caseObj) =>
	{
		phrase = verb => constJoin(verb, type);

		return (cur, action) => {
			let [ next ] = Object.keys(caseObj)
				.filter(key => phrase(key) === action.type)
				.map(key => caseObj[key](cur, action))
			;

			return next || cur;
		}
	}
;

export const reducerFactoryFactory =
	(DefualtClass, defaultCases) =>
		(type, customCases) => {
			const evalCaseObj = evalCaseObjFactory(type,
				{
					...defaultCases,
					...customCases,
				}
			);

		  return (store = new DefaultClass(), action) => evalCaseObj(store, action);
		}
;

export const listReducerFactory =
	reducerFactoryFactory(
		List,
		{
			append: (list, { data }) => list.concat(data),
			'delete': (list, { id }) => list.delete(id),
			insert: (list, { id, data }) => list.delete(id, data),
			update: (list, { id, data }) =>
				list.update(id, old => ({ ...old, data })),
			clear: (list, { comparator }) => list.sort(comparator),
		}
	)
;

export const mapReducerFactory =
	reducerFactoryFactory(
		Map,
		{
			insert: (map, { key, value }) => map.set(key, value),
			'delete': (map, { key }) => map.delete(key),
			update: (map, { key }) => map.update(key, v => v),
			merge: (map, { keyValuePairs }) => map.merge(keyValuePairs),
			clear: (map) => map.clear(),
		}
	)
;
