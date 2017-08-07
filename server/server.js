const express = require('express')

const app = express()

app.use(express.static(__dirname + '/../client'))
app.use(express.static(__dirname + '/../node_modules'))

app.get('/capsules', (req, res) => {
  res.send('The capsules will be here')
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})
