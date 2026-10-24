import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.sendFile(import.meta.dirname + '/views/index.html');
});

function handleDate(req, res) {
  const input = req.params.date;
  let date;

  if (input === undefined) {
    date = new Date();
  } else if (/^-?\d+$/.test(input)) {
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

const PORT = 8000;

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
