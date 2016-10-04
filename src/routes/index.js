import { App, ItemList, Login, Signup, Codeversation, CodeversationForm } from 'components';

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
      component: Signup,
      path: 'signup',
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
