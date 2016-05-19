#! /usr/bin/env node

// load a page, click a link and then capture any downloads in the current directory
// usage: ./nologin.js url link-selector
// e.g. ./withclick.js http://papers.ssrn.com/sol3/papers.cfm?abstract_id=2781538 'a[title="Download Full-Text Paper"]'

var Nightmare = require('nightmare')

require('nightmare-download-manager')

var nightmare = Nightmare()

nightmare.on('download', function (state, downloadItem) {
  if (state === 'started') {
    console.log(downloadItem)
    nightmare.emit('download', downloadItem.filename, downloadItem)
  }
})

nightmare
  .downloadManager()
  .goto(process.argv[2])
  .click(process.argv[3])
  .wait(500)
  .evaluate(function () {
    return document.title
  })
  .wait('downloads-complete')
  .end()
  .then(function (title) {
    console.log(title)
  })
