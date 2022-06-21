import express from 'express';
import path from 'path';
const app = express()
const port = 9000

const build_path = path.join(__dirname, '../', 'frontend', 'build')

app.use(express.static(build_path));

app.get('/', (req, res) => {
  res.sendFile(path.join(build_path, 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})