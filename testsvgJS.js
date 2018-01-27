/* eslint-disable quotes */
const countryInfo = [
  {
    "id": "Acronius",
    "name": "Acronius"
  },
  {
    "id": "Aetaris",
    "name": "Aetaris"
  },
  {
    "id": "Alhurriat-Walssalam",
    "name": "Alhurriat Walssalam"
  },
  {
    "id": "Babylatia",
    "name": "Awgaws Komten",
    "color": "orange",
    "url": "http://ria.baelyk.com/index.php?title=Babylatia",
    "info": "Babylatia (also known as Awgaws Komten) is a three island state made up of smaller city-states."
  },
  {
    "id": "Barren-Silver",
    "name": "Barren Silver"
  },
  {
    "id": "Bentria",
    "name": "Bentria"
  },
  {
    "id": "Bridgeview",
    "name": "Bridgeview",
    "info": "The Republic Of Bridgeview is a nation famous for its history. The country itself has an outstanding record of surviving a grand total of 1,245 Rebellions. The nation is also a remnant of what used to be the United Soviet States Of Bridgeview, a huge socialist country. Bridgeview is the founding nation of A.R.M.S., a military alliance, where the members have joint military, research programs, and overall protection against other nations. The Nation has a population of 1.236 Million and ruled by President Johann Bullet. Bridgeview is consisted of 15 Provinces, the capital being Broloque."
  },
  {
    "id": "Candro",
    "name": "Candro"
  },
  {
    "id": "Dansha",
    "name": "Dansha"
  },
  {
    "id": "Darrenne",
    "name": "Darenne"
  },
  {
    "id": "Deathfall",
    "name": "Deathfall"
  },
  {
    "id": "Dixadoing",
    "name": "Dixadoing"
  },
  {
    "id": "Flowrisa",
    "name": "Flowrisa",
    "info": "For the interactive map: The Second Byzantine Empire, also known as Flowrisa, has a population of 250,679,600 and is ruled by Emperor Ian Van Gilze-Rijen. Flowrisa has a large economy, which is worth 12 trillion dollars. Flowrisa is made up of 12 provinces, and is made up of the mainland, also known as Ηπειρωτική χώρα, and 5 islands, Θήρα, Κρήτη, Ρόδος, Λήμνος, and Λέσβος. (Santorini, Crete, Rhodes, Limnos, and Lesvos)."
  },
  {
    "id": "IGU",
    "name": "Iceland-Greenland Union"
  },
  {
    "id": "Infinium",
    "name": "Infinium"
  },
  {
    "id": "Itzlan",
    "name": "Itzlan"
  },
  {
    "id": "Jute",
    "name": "Jute"
  },
  {
    "id": "Kalinkov",
    "name": "Kalinkov"
  },
  {
    "id": "Kerguelen",
    "name": "Kerguelen"
  },
  {
    "id": "Korriban",
    "name": "Korriban"
  },
  {
    "id": "Kzaria",
    "name": "Kzaria"
  },
  {
    "id": "Oxihydronia",
    "name": "Oxihydronia"
  },
  {
    "id": "Pensyltuckee-Island",
    "name": "Pensyltuckee Island"
  },
  {
    "id": "Riveti",
    "name": "Riveti"
  },
  {
    "id": "Scepez",
    "name": "Scepez"
  },
  {
    "id": "Shizensky",
    "name": "Shizensky"
  },
  {
    "id": "Soranato",
    "name": "Soranato"
  },
  {
    "id": "Sothern-Moshii",
    "name": "Southern Moshii"
  },
  {
    "id": "Madness-and-Insanity",
    "name": "The Land of Madness and Insanity"
  },
  {
    "id": "The-Lowlands-and-Saxony",
    "name": "The Lowlands and Saxony",
    "url": "https://nationstates.net/The_Lowlands_and_Saxony",
    "info": "The Statocratic Duchy of the Lowlands and Saxony is a militaristic Autocracy with members of the Saxonian Armed Forces serving as the governmental apparatus of the nation. The Lowlands and Saxony has a large enconomy that is known for its arms and car industry. The nation also is the headquarters for Dent Tactical inc., a Private Military Contractor that focuses in airborne operations such as transport, aerial fights and airborne insertions of personel and goods."
  },
  {
    "id": "Timothia",
    "name": "Timothia",
    "url": "https://nationstates.net/Timothia"
  },
  {
    "id": "Ubaid",
    "name": "Ubaid"
  },
  {
    "id": "Usniya",
    "name": "Usniya",
    "info": "Usniya is a global superpower and single party federal socialist republic."
  },
  {
    "id": "Zhouyou",
    "name": "Zhouyou",
    "info": "Zhoyou is a former Usniyan satellite with an isolationist government."
  },
  {
    "id": "Babylatia",
    "name": "Babylatia"
  },
  {
    "id": "Babylatia",
    "name": "Babylatia"
  },
  {
    "id": "Babylatia",
    "name": "Babylatia"
  },
  {
    "id": "Babylatia",
    "name": "Babylatia"
  },
  {
    "id": "Babylatia",
    "name": "Babylatia"
  },
  {
    "id": "Babylatia",
    "name": "Babylatia"
  }
]
/* !!END!! countries.json */
/* eslint-enable quotes */
const GET = {}
let map = document.querySelector('#mapdiv > svg')
let countries = map.querySelector('[data-name=Countries]')
let countriesdiv = document.querySelector('#countries-div')
let infodiv = document.querySelector('#info')

function init () {
  query()
  settings()
  clean(countries)
  countriesdiv.innerHTML = ''

  countryInfo.forEach(info => {
    countriesdiv.innerHTML += `<div id="${info.id}">${info.name}</div>`
  })
  countriesdiv.querySelectorAll('div').forEach(countryLabel => {
    console.log(countryLabel.getAttribute('id'))
    countryLabel.addEventListener('mouseover', () => {
      map.querySelector(`[data-name=${countryLabel.getAttribute('id')}]`).classList.add('countryLabelHover') // .style.fill = "#89ab87"
    })
    countryLabel.addEventListener('mouseout', () => {
      map.querySelector(`[data-name=${countryLabel.getAttribute('id')}]`).classList.remove('countryLabelHover') // .style.fill = "#acd0a5"
    })
    countryLabel.addEventListener('click', event => {
      console.log(countryLabel.getAttribute('id'))
      console.log('id ' + getCountry(countryLabel.getAttribute('id')))
      if (event.shiftKey) {
        let newLocation = getCountry(countryLabel.getAttribute('id'))['url']
        if (newLocation === undefined) {
          newLocation = getCountry(countryLabel.getAttribute('id'))['name']
          newLocation = 'https://nationstates.net/' + newLocation.replace(' ', '_')
        }
        window.location = newLocation
      } else {
        if (getCountry(countryLabel.getAttribute('id'))['info'] !== undefined) {
          infodiv.innerHTML = `${getCountry(countryLabel.getAttribute('id'))['info']}`
        }
      }
    })
  })
  countries.childNodes.forEach((country, index) => {
    let title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
    let titleText = getCountry(country.getAttribute('data-name'))['name']
    title.textContent = titleText
    country.appendChild(title)
    country.addEventListener('mouseover', event => {
      let countryLabel = document.getElementById(country.getAttribute('data-name'))
      countryLabel.classList.add('bold')
      countriesdiv.scrollTop = countryLabel.offsetTop - countriesdiv.clientHeight / 2
    })
    country.addEventListener('mouseout', event => {
      let countryLabel = document.getElementById(country.getAttribute('data-name'))
      countryLabel.classList.remove('bold')
    })
  })
}
function resizeInfoDiv () {
  const newHeight = `${window.innerHeight - document.querySelector('#map'.clientHeight)}px`
  document.querySelector('#info').style.height = newHeight
}
function settings () {
  // Style
  let sheet = GET.style
  if (sheet === 'location') {
    sheet = 'styles/location.css'
  } else { // if none of the option, make it undefined
    sheet = undefined
  }
  if (sheet !== undefined) document.querySelector('#svgstyle').setAttribute('href', sheet)

  // Fullscreen
  if (GET.fullscreen) {
    map.style.width = '100%'
    countriesdiv.classList.add('hidden')
    infodiv.classList.add('hidden')

    document.body.style.margin = '0'
    document.body.style.overflow = 'scroll'
  }
}
function query () {
  const query = window.location.search.replace('?', '').split('&')
  for (let i = 0; i < query.length; i++) {
    if (query[i] === '') continue
    let param = query[i].split('=')
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '')
  }
}
function clean (node) { // https://www.sitepoint.com/removing-useless-nodes-from-the-dom/
  for (var n = 0; n < node.childNodes.length; n++) {
    var child = node.childNodes[n]
    if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
      node.removeChild(child)
      n--
    } else if (child.nodeType === 1) {
      clean(child)
    }
  }
}
function getCountry (id) {
  let a
  countryInfo.forEach(country => {
    if (country.id === id) {
      a = country
    }
  })
  return a
}

window.addEventListener('resize', resizeInfoDiv)
window.addEventListener('load', init) // initialize
