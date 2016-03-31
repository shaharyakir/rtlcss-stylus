RTL-CSS
-------------------

A simple Stylus middleware wrapper for the excellent RTL-CSS

An [rtlcss](https://github.com/MohammadYounes/rtlcss) plugin for stylus.

[![npm](https://img.shields.io/npm/v/rtlcss-stylus.svg?style=flat)](http://badge.fury.io/js/rtlcss-stylus)
[![tests](https://img.shields.io/travis/shaharyakir/rtlcss-stylus/master.svg?style=flat)](https://travis-ci.org/shaharyakir/rtlcss-stylus)

### Installation

You can install through npm as such: `npm install rtlcss-stylus`

### Usage

You can include rtlcss-stylus as a normal stylus plugin. Full example creating two different stylesheets (ltr and rtl) at every pass below:

```js
    function compile(rtl, str, path) {

        var compile = stylus(
            str
        );

        if (rtl) compile = compile.use(rtlcss());

        return compile;

    }

    app.use(
        stylus.middleware(
            {
                src: path.join(__dirname, 'public'),
                dest: path.join(__dirname, 'public'),
                compile: compile.bind(this, false)
            }
        )
    );

    app.use(
        stylus.middleware(
            {
                src: path.join(__dirname, 'public'),
                dest: function(cssPath){

                    return path.join(__dirname, 'public',cssPath).replace('style.css', 'style-rtl.css');

                },
                compile: compile.bind(this, true)
            }
        )
    );
```

Currently only has a basic test which you can run via npm test.

In production I only tested it with inline rtlcss directives, i.e. without providing any special options via the middleware.