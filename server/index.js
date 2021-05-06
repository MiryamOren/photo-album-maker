const express = require('express')
const cors = require('cors');
const path = require('path');
require('./db/mongoose')
const userRouter = require('./routes/user')
const imageRouter = require('./routes/image')
const app = express();
app.use(cors());

app.get('/api', function (req, res) {
  res.send('Hello World')
});
app.use(express.json());
app.use(userRouter);
app.use(imageRouter);

const pathToClientBuild = path.join(__dirname, '../client/build');
console.log(pathToClientBuild);

const port = process.env.PORT || 3001;
app.use(express.static(pathToClientBuild));

app.listen(port, () => {
  console.log(`we are live on ${port}`);
});