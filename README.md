# MeanMoney

Step 1: Clone the repo

Step 2: Install mongodb:
```
brew tap mongodb/brew
brew update
brew install mongodb-community@8.0
```

Step 3: Run mongodb:
`brew services start mongodb-community@8.0`
^ swap `start` for `stop` to stop mongodb

Step 4: Create `/server/.env` with the following contents:
```
MONGODB_URL="mongodb://0.0.0.0/mean-money"
PORT = 9000
```

Down the line, we may also want:
```
NODE_ENV="development"
JWT_SECRET="secret"
``` 
so we can write code that only runs if process.env.NODE_ENV is 'development', etc. and JWT_SECRET relates to tokens when those are implemented.

Step 5: Create `/client/.env` with the following contents:
```
VITE_BACKEND_URL="http://localhost:9000"
```