import express from 'express';

import { DueDateController } from './controllers/due-date';

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.use(
  '/due-date',
  DueDateController,
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});