# REST API Routes

## User

Base route: `/api/v1/user`

### Create User.

`/api/v1/user` POST

```javascript
{
  user: {
    name: optional,
    email: required,
    password: required
  }
}
```

### Delete User.

`/api/v1/user` DELETE

```javascript
{
  user: {
    email: required,
    password: required
  }
}
```

### Update User.

`/api/v1/user` PUT

***MUST HAVE Authentication header set to JWT***
```javascript
{
  user: {
    name: optional,
    email: optional,
    password: optional
  }
}
```

## Session

base route: `/api/v1/session` POST

```javascript
{
  user: {
    email: required,
    password: requried
  }
}
```

#### Returns

```javascript
{
  token: String
}
```
