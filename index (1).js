const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

function handleDate(req, res) {
  const input = req.params.date;
  let date;

  if (input === undefined) {
    date = new Date();
  } else if (/^\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

app.get('/api', handleDate);
app.get('/api/:date', handleDate);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
