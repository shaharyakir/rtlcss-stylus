var rtlcss = require('rtlcss'),
    postcss = require('postcss'),
    path = require('path');

module.exports = function (opts) {
    if (!opts) {
        opts = {};
    }

    return function (style) {
        style = this || style;
        var filename = style.options.filename;

        style.on('end', function (err, css) {

            // configure the options passed to rtlcss
            var process_opts = {
                from: filename,
                to: path.join(
                    path.dirname(filename),
                    path.basename(filename, path.extname(filename))
                ) + '.css'
            };

            if (style.sourcemap) {
                process_opts.map = {annotation: false}
            }

            // run rtlcss
            var res = postcss([rtlcss(opts)]).process(css, process_opts);

            // combine sourcemaps
            if (res.map && style.sourcemap) {
                var combined_map = map.transfer({
                    fromSourceMap: res.map.toString(),
                    toSourceMap: style.sourcemap
                });

                // set the combined result as the new sourcemap
                style.sourcemap = JSON.parse(combined_map);
            }

            res.warnings().forEach(console.warn);

            return res.css;

        });

    }

};
