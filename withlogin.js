#! /usr/bin/env node

// login via a form and then capture any downloads in the current directory
// usage: ./withlogin.js URL user pass

var Nightmare = require('nightmare')

require('nightmare-download-manager')

var nightmare = Nightmare({
  switches: {
    'ignore-certificate-errors': true
  }
})

nightmare.on('download', function (state, downloadItem) {
  if (state === 'started') {
    console.log(downloadItem)
    nightmare.emit('download', downloadItem.filename, downloadItem)
  }
})

var url = process.argv[2]
var user = process.argv[3]
var pass = process.argv[4]

nightmare
  .downloadManager()
  .goto(url)
  .type('form[action*="/login"] [name=user]', user)
  .type('form[action*="/login"] [name=pass]', pass)
  .click('form[action*="/login"] [type=submit]')
  .wait(500)
  .evaluate(function () {
    return document.title
  })
  .wait('downloads-complete')
  .end()
  .then(function (title) {
    console.log(title)
  })
