const { default: API, ExportType } = require('@hackmd/api')
require('dotenv').config()
const ejs = require('ejs')
const variable = require('./variable')

const api = new API({
  serverUrl: process.env.SERVER_URL
})

api.login(process.env.ACCOUNT, process.env.PASSWORD).then(() => {
  if (process.env.EXAMPLE_NOTE) {
    api.exportString(process.env.EXAMPLE_NOTE, ExportType.MD).then((res) => {
      api.newNote(ejs.render(res, variable), { team: process.env.TEAM })
      console.log('add sucess')
    })
  } else {
    api.newNote(`# Untitle Add By API`, { team: process.env.TEAM })
    console.log('add sucess')
  }
})
