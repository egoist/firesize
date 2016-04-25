'use strict'
const koa = require('koa')
const Router = require('koa-router')
const im = require('imagemagick')
const request = require('request')
const sharp = require('sharp')
const Stream = require('stream')
const onerror = require('koa-onerror')

const app = koa()
const router = new Router()

onerror(app, {accepts() {return 'json'}})

function getImage(cb) {
  const url = this.query.url
  if (!url) {
    return cb(new Error('no image url provided'))
  }

  let contentType = ''
  let imageType = 'jpeg'

  const width = this.query.width && parseInt(this.query.width)
  const height = this.query.height && parseInt(this.query.height)
  const transform = function () {
    return toBuffer(sharp().resize(width, height)[imageType]())
  }
  function toBuffer(fn) {
    return fn.toBuffer((err, buf, info) => {
      if (err) {
        return cb(err)
      }
      cb(null, {buf, contentType})
    })
  }

  const req = request(url)
    .on('response', response => {
      contentType = response.headers['content-type']
      imageType = contentType.substr(contentType.indexOf('/') + 1)
    })
    .on('error', err => cb(err))

  if (this.query.origin) {
    cb(null, req)
  } else {
    req.pipe(transform())
  }
}

router.get('/', function* () {
  try {
    let ret = yield getImage
    if (ret instanceof Stream) {
      this.body = ret
    } else {
      this.type = ret.contentType
      this.body = ret.buf
    }
  } catch (e) {
    this.body = {
      error: e.message
    }
  }
})

app.use(router.routes())

const port = process.env.NODE_PORT || 4000
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
