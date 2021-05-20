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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
} else {
  app.use(express.static(path.join(__dirname, "../client/public")));
}

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`we are live on ${port}`);
});