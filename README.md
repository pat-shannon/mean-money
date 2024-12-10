Install mongodb:
```
brew tap mongodb/brew
brew update
brew install mongodb-community@8.0
```

run mongodb:
`brew services start mongodb-community@8.0`
^ swap `start` for `stop` to stop mongodb

Create `server/.env`:
```
MONGODB_URL="mongodb://0.0.0.0/mean-money"
NODE_ENV="development"
PORT = 9000
```
