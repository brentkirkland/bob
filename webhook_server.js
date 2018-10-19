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

webhookHandler.on('event', function (repo, data) {
  console.log('repo', repo)
});

webhookHandler.on('reponame', function (event, data) {
});

webhookHandler.on('error', function (err, req, res) {
});

app.listen(port, () => console.log(`Webhook server listening on port ${port}!`))
