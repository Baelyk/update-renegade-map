const fs = require('fs-jetpack')
const SVGO = require('svgo')
const path = require('path')
const commandLineArgs = require('command-line-args')

const svgo = new SVGO({
  plugins: [
    {
      removeViewBox: false
    },
    {
      collapseGroups: false
    }
  ],
  js2svg: {
    pretty: true
  }
})
const options = commandLineArgs([
  { /* The version of the map to append to the archived files */
    name: 'version',
    alias: 'v',
    type: String
  },
  { /* The path to the directory containing RIAMap.svg, political.png, and political-names.png */
    name: 'path',
    alias: 'p',
    type: String
  },
  { /* The path to the renegade-map directory */
    name: 'out',
    alias: 'o',
    type: String
  },
  { /* The name(s) of new countries being added */
    name: 'new',
    alias: 'n',
    type: String,
    multiple: true
  }
])
const paths = {
  riaMap: path.resolve(options.path, `RIAMap-${options.version}.svg`),
  current: path.join(options.out, 'img/vector/current.svg'),
  svgArchive: path.join(options.out, `img/vector/archive/${options.version}.svg`),
  political: path.join(options.out, `img/raster/political.png`),
  politicalNames: path.join(options.out, `img/raster/politicalnames.png`),
  politicalArchive: path.join(options.out, `img/raster/archive/political-${options.version}.png`),
  politicalArchiveNames: path.join(options.out, `img/raster/archive/politicalnames-${options.version}.png`)
}

/* Make sure the version hasn't been used already */
void [paths.svgArchive, paths.politicalArchive, paths.politicalArchiveNames].forEach(file => {
  if (fs.exists(file)) throw new Error(`File '${file}' already exists! This probably means the version '${options.version}' is incorrect.`)
})

/* Optimize RIAMap.svg */
svgo.optimize(fs.read(paths.riaMap), { path: paths.riaMap })
  .then(svg => { // `svg` is the optimized version of RIAMap.svg
    const optimized = svg.data.replace('viewBox', 'viewbox')
    const html = optimized.replace('<style>', '<!-- <style>').replace('</style>', '</style> -->')
    /* Export a test copy */
    fs.write('test.svg', html)
    /* Export the optimized version */
    fs.write(paths.current, optimized)
    /* Export the archive version */
    fs.write(paths.svgArchive, optimized)
  })
  .catch(() => {
    throw new Error('The SVG optimization process went wrong!')
  })

/* Move the rasters to their places */
fs.copy(path.resolve(options.path, 'political.png'), paths.political, { overwrite: true })
fs.copy(path.resolve(options.path, 'political.png'), paths.politicalArchive)
fs.copy(path.resolve(options.path, 'politicalnames.png'), paths.politicalNames, { overwrite: true })
fs.copy(path.resolve(options.path, 'politicalnames.png'), paths.politicalArchiveNames)
