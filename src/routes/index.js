import { App, ItemList, Login, Codeversation, CodeversationForm } from 'components';

export default {
  component: App,
  path: '/',
  childRoutes: [
    {
      component: ItemList,
      path: 'list',
    },
    {
      component: Codeversation,
      path: 'view',
    },
    {
      component: Login,
      path: 'login',
    },
    {
      component: CodeversationForm,
      path:'new',
    },
  ]
};
