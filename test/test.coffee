fs        = require 'fs'
path      = require 'path'
stylus    = require 'stylus'
parse     = require 'css-parse'
test_path = path.join(__dirname, 'fixtures')

match_expected = (file, args, done) ->
  stylus(fs.readFileSync(path.join(test_path, file), 'utf8'))
    .use(rtlcss(args))
    .render (err, css) ->
      if err then return done(err)
      expected = fs.readFileSync(path.join(test_path, file.replace('.styl', '.css')), 'utf8')

      expect(JSON.parse(JSON.stringify(parse(css)))).to.eql(JSON.parse(JSON.stringify(parse(expected))))
      done()

describe 'basic', ->

  it "works", (done) ->
    match_expected('basic.styl', null, done)

