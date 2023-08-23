// eslint-disable-next-line @typescript-eslint/no-var-requires
const uglify = require('gulp-uglify-es').default

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { src, dest } = require('gulp')

const minify = () => src('./cache/**/*.js').pipe(uglify()).pipe(dest('./dist'))

exports.minify = minify
