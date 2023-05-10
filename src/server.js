require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/orders', (req, res) => {
  const body = JSON.stringify(req.body, null, 2);

  if (!body) {
    return res.status(200)
      .json({ success: false, message: "Body is empty"});
  }

  if (body) {
    fs.appendFileSync(__dirname + "/tmp/test.txt",
      new Date() + "\n" + body);
    fs.appendFileSync(__dirname + "/tmp/test.txt",
      "\n-----------------------------------")
  }

  return res.status(200).json({
    success: true,
    message: "Successfully recorded request"
  });

});

app.get('/', (req, res) => {
  return res.status(200).send('OK');
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`);
})