import express from 'express';
import path from 'path';
import cors from 'cors';

import user from './routes/api/user';
import company from './routes/api/company';
import attendance from './routes/api/attendance';

const build_path = path.join(__dirname, '../', 'frontend', 'build')
const app = express()
const port = 9000

app.use(express.json())
app.use(cors());
app.use('/api', user);
app.use('/api', company);
app.use('/api', attendance);
app.use(express.static(build_path));

app.get('/', (req, res) => {
  res.sendFile(path.join(build_path, 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})