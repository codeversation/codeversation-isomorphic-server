import { App, ItemList } from 'components';

export default {
  component: App,
  path: '/',
  childRoutes: [
    {
      component: ItemList,
      path: 'list',
    },
  ]
};
