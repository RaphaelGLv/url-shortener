import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.listen(port, () => {
  console.log(`[API] Server running on http://localhost:${port}`);
});