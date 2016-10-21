import { App, ItemList, Login, Codeversation, CodeversationForm, Profile, Signup } from 'components';

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
    {
      component: Profile,
      path: 'profile'
    },
    {
      component: Signup,
      path: 'register'
    }
  ]
};
