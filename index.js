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
  politicalArchiveNames: path.join(options.out, `img/raster/archive/politicalnames-${options.version}.png`),

  indexHTML: path.join(options.out, 'index.html'),

  countriesJSON: path.join(options.out, 'src/countries.json'),
  svgJS: path.join(options.out, 'src/svg.js')
}

/* Make sure the version hasn't been used already */
void [paths.svgArchive, paths.politicalArchive, paths.politicalArchiveNames].forEach(file => {
  if (fs.exists(file)) throw new Error(`File '${file}' already exists! This probably means the version '${options.version}' is incorrect.`)
})

/* Optimize RIAMap.svg */
svgo.optimize(fs.read(paths.riaMap), { path: paths.riaMap })
  .then(svg => { // `svg` is the optimized version of RIAMap.svg
    const optimized = svg.data.replace('viewBox', 'viewbox')
    const indexHTML = fs.read(paths.indexHTML)
    const html = optimized.replace('<style>', '<!-- <style>').replace('</style>', '</style> -->')
    /* Export a test copy */
    fs.write('test.svg', html)
    /* Export the optimized version */
    fs.write(paths.current, optimized)
    /* Export the archive version */
    fs.write(paths.svgArchive, optimized)
    /* Put it into index.html */
    let indexBeginning = indexHTML.substr(0, indexHTML.indexOf('<div class="map" id="mapdiv">') + 30) // 30: length of searchValue + newline
    let indexEnd = indexHTML.substring(indexHTML.indexOf('</div>\n        <div id="countries-div" class="countries">'))
    fs.write('test.html', indexBeginning + html + '        ' + indexEnd)
  })
  .catch(() => {
    throw new Error('The SVG optimization process went wrong!')
  })

/* Move the rasters to their places */
fs.copy(path.resolve(options.path, 'political.png'), paths.political, { overwrite: true })
fs.copy(path.resolve(options.path, 'political.png'), paths.politicalArchive)
fs.copy(path.resolve(options.path, 'politicalnames.png'), paths.politicalNames, { overwrite: true })
fs.copy(path.resolve(options.path, 'politicalnames.png'), paths.politicalArchiveNames)

/* Add new countries */
let countries = fs.read(paths.countriesJSON, 'json')
options.new.forEach(country => {
  countries.push({
    id: country.replace(/ /gi, '-'),
    name: country
  })
})
fs.write(paths.countriesJSON, countries)

/* Put countries.json into svg.js */
let svgJS = fs.read(paths.svgJS)
svgJS = svgJS.substring(svgJS.indexOf('/* !!END!! countries.json */'))
fs.write(paths.svgJS, '/* eslint-disable quotes */\nconst countryInfo = ' + JSON.stringify(countries, null, 2) + '\n' + svgJS)
