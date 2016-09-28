import { App, ItemList, Login } from 'components';

export default {
  component: App,
  path: '/',
  childRoutes: [
    {
      component: ItemList,
      path: 'list',
    },
    {
      component: Login,
      path: 'login',
    },
  ]
};
