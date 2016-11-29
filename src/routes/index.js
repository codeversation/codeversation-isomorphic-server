import {
  App,
  ItemList,
  Login,
  Codeversation,
  CodeversationForm,
  CommentForm,
  Profile,
  Signup,
  Snippet,
	Post,
  FrontPage
} from 'components';

export default {
  component: App,
  path: '/',
  indexRoute: { component: FrontPage },
  childRoutes: [
    {
      component: ItemList,
      path: 'list'
    },
    {
      component: Login,
      path: 'login'
    },
    {
      component: Codeversation,
      path: 'view/:id',
    },
    {
      component: CommentForm,
      path: 'comment'
    },
    {
      component: CodeversationForm,
      path:'new'
    },
    {
      component: Profile,
      path: 'profile/:id'
    },
    {
      component: Signup,
      path: 'register'
    },
    {
      component: Snippet,
      path: 'snippet'
    },
    {
      component: Post,
      path: 'post'
    }
  ]
};
