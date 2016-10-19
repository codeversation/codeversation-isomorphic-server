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

```
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
```
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

```
{
  user: {
    email: required,
    password: requried
  }
}
```

#### Returns

```
{
  token: String
}
```
