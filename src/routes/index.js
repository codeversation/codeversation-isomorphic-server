import { App, ItemList, Login, Codeversation, CodeversationForm } from 'components';

export default {
  component: App,
  path: '/',
  indexRoute: { component: Login },
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
      component: CodeversationForm,
      path:'new',
    },
  ]
};
