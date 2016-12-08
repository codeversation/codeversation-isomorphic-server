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
  FrontPage,
	ForkForm,
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
			path: 'view/:id',
			component: Codeversation,
		},
    {
      path: 'view/:id/:snippetId',
			component: Codeversation,
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
    },
		{
			component: ForkForm,
			path: 'fork/:codeversationId/:snippetId',
		}
  ]
};
