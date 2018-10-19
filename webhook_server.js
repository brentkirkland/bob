'use strict'

const express = require('express')
const GithubWebHook = require('express-github-webhook')
const bodyParser = require('body-parser')

const app = express()
const webhookHandler = GithubWebHook({ path: '/', secret: 'amazinggrace!' })

const port = 3000

// use in your express app
app.use(bodyParser.json()) // must use bodyParser in express
app.use(webhookHandler) // use our middleware

webhookHandler.on('pull_request', function (repo, data) {
  const { action, pull_request } = data
  const { merged, title, body } = pull_request
  if (action === 'closed' && merged) {
    console.log('repo: ', repo)
    console.log('title', title)
    console.log('body', body)
  }
});

webhookHandler.on('error', function (err, req, res) {
  console.log({
    err,
    req,
    res
  })
});

app.listen(port, () => console.log(`Webhook server listening on port ${port}!`))
