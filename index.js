const fs = require('fs-jetpack')
const SVGO = require('svgo')
const path = require('path')
const commandLineArgs = require('command-line-args')

const svgo = new SVGO()
const options = commandLineArgs([
  { /* The version of the map to append to the archived files */
    name: 'version',
    alias: 'v',
    type: 'String'
  },
  { /* The path to the directory containing RIAMap.svg, political.png, and political-names.png */
    name: 'path',
    alias: 'p',
    type: 'String'
  },
  { /* The name(s) of new countries being added */
    name: 'new',
    alias: 'n',
    type: 'String',
    multiple: true
  }
])
const paths = { // TODO: This can't be right
  current: 'img/vector/current.svg',
  svgArchive: `img/vector/archive/${options.version}.svg`,
  political: `img/raster/political.png`,
  politicalNames: `img/raster/politicalnames.png`,
  politicalArchive: `img/raster/archive/political-${options.version}.png`,
  politicalArchiveNames: `img/raster/archive/politicalnames-${options.version}.png`
}

/* Make sure the version hasn't been used already */
void [paths.svgArchive, paths.politicalArchive, paths.politicalArchiveNames].forEach(file => {
  if (fs.exists(file)) throw new Error(`File ${file} already exists! This probably means the version (${options.version}) is incorrect.`)
})

/* Optimize RIAMap.svg */
svgo.optimize(fs.read(path.join(options.path, 'RIAMap.svg')), { path: path.resolve(__dirname, options.path) })
  .then(svg => { // `svg` is the optimized version of RIAMap.svg
    console.log(svg.data)
  })
