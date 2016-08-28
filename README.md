![documentation](https://alex-aralis.github.io/isomorphic-react-redux-router/doc/image/badge.svg)

## A starter project for an isomorphic React app.

Check out the [documentation](https://doc.esdoc.org/github.com/Alex-Aralis/isomorphic-react-redux-router/).

#### React Libraries
- [Redux](https://github.com/reactjs/redux)
- [Router](https://github.com/reactjs/react-router)

#### Utility Libraries
- [lodash](https://lodash.com/)

#### Servered with
- [Express](https://expressjs.com/)
- [Jade](http://jade-lang.com/)

#### Compiled with
- [Webpack](https://webpack.github.io/)
- [Babel](https://babeljs.io/)

#### Development Environment with
- [Gulp](http://gulpjs.com/)
- [browser-sync](https://www.browsersync.io/)
- [webpack-middleware](https://github.com/kriasoft/webpack-middleware)
- [nodemon](https://github.com/remy/nodemon)

#### Document Generation with
- [esdoc](https://esdoc.org/)


### Getting Started

Fist, install all the npm packages with

```shell
npm install
```

Start the dev server with

```shell
npm start
```

Do build without watching or starting server

```shell
npm run build
```

Clean up build dir with

```shell
npm run clean
```

If you want to use the gulp targets directly install gulp globally

```shell
sudo npm install -g gulp
```


#### Documentation
To build the documentation run

```shell
npm run doc
```

this will produce files ready for serving in the `doc/` folder.

to server these files and read through the documentation

```shell
sudo npm i -g http-server # install the server
http-server doc # this will server the files in doc on localhost:8080
```

### TODO
- Work out source mapping completely
- add linter to build system to enforce styles
- production build config
