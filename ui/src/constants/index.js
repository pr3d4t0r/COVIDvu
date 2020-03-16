const DATA_URL = `https://virustrack.live/site-data`
const STAGING_DATA_URL = `http://staging.virustrack.live/site-data`

const LAST_UPDATE_KEY = 'covid-lastUpdated'
const CACHE_INVALIDATE_GLOBAL_KEY = 'covid-cache-invalidate-global'
const CACHE_INVALIDATE_US_STATES_KEY = 'covid-cache-invalidate-us-states'
const CACHE_INVALIDATE_US_REGIONS_KEY = 'covid-cache-invalidate-us-regions'

const CACHE_TIMER = 5 * 60 * 1000

const ONE_MINUTE = 1 * 60 * 1000

const GLOBAL_KEY = 'covid-global'
const US_STATES_KEY = 'covid-us-states'
const US_REGIONS_KEY = 'covid-us-regions'

const COUNTRIES = [
  "!Global",
  "!Outside Mainland China",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Côte d'Ivoire",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "UK",
  "US",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]

  const US_REGIONS = [
    "!Total US",
    "Diamond Princess",
    "Midwest",
    "Northeast",
    "South",
    "Unassigned",
    "West"
  ]

  const US_STATES = [
  "!Total US",  
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Washington D.C.",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Marshall Islands",
  "Massachusetts",
  "Michigan",
  "Micronesia",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Marianas",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Virgin Islands",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"]


  const REGION_URLS = {
    "!Total US": "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
    "Washington": "https://www.doh.wa.gov/Emergencies/Coronavirus",
    "New York": "https://www1.nyc.gov/site/doh/health/health-topics/coronavirus.page",
    "California": "https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/nCOV2019.aspx",
    "Massachusetts": "https://www.mass.gov/info-details/covid-19-cases-quarantine-and-monitoring",
    "Diamond Princess": "https://www.cdc.gov/media/releases/2020/s0215-Diamond-Princess-Repatriation.html",
    "New Jersey": "https://www.nj.gov/health/cd/topics/ncov.shtml",
    "Georgia": "https://dph.georgia.gov/novelcoronavirus",
    "Florida": "http://www.floridahealth.gov/diseases-and-conditions/COVID-19/",
    "Illinois": "http://dph.illinois.gov/topics-services/diseases-and-conditions/diseases-a-z-list/coronavirus",
    "Oregon": "https://www.oregon.gov/oha/PH/DISEASESCONDITIONS/DISEASESAZ/Pages/emerging-respiratory-infections.aspx",
    "Iowa": "https://idph.iowa.gov/Emerging-Health-Issues/Novel-Coronavirus",
    "Pennsylvania": "https://www.health.pa.gov/topics/disease/Pages/Coronavirus.aspx",
    "Arizona": "https://www.azdhs.gov/preparedness/epidemiology-disease-control/infectious-disease-epidemiology/index.php#novel-coronavirus-home",
    "South Carolina": "https://scdhec.gov/health/infectious-diseases/viruses/coronavirus-disease-2019-covid-19",
    "Colorado": "https://www.colorado.gov/pacific/cdphe/2019-novel-coronavirus",
    "Kentucky": "https://healthalerts.ky.gov/Pages/Coronavirus.aspx",
    "Texas": "https://dshs.texas.gov/coronavirus/",
    "Maryland": "https://phpa.health.maryland.gov/Pages/Novel-coronavirus.aspx",
    "Wisconsin": "https://www.dhs.wisconsin.gov/disease/coronavirus.htm",
    "South Dakota": "https://doh.sd.gov/news/Coronavirus.aspx",
    "Virginia": "www.vdh.virginia.gov/surveillance-and-investigation/novel-coronavirus/",
    "Nevada": "http://dpbh.nv.gov/coronavirus/",
    "New Hampshire": "https://www.dhhs.nh.gov/dphs/cdcs/2019-ncov.htm",
    "Minnesota": "https://www.health.state.mn.us/diseases/coronavirus/basics.html",
    "Ohio": "https://odh.ohio.gov/wps/portal/gov/odh/know-our-programs/Novel-Coronavirus/welcome/",
    "Rhode Island": "https://health.ri.gov/diseases/ncov2019/",
    "Tennessee": "https://www.tn.gov/health/cedep/ncov.html",
    "Connecticut": "https://portal.ct.gov/Coronavirus",
    "Hawaii": "https://health.hawaii.gov/docd/advisories/novel-coronavirus-2019/",
    "Indiana": "https://www.in.gov/isdh/28470.htm",
    "Michigan": "https://www.michigan.gov/coronavirus/",
    "North Carolina": "https://www.ncdhhs.gov/divisions/public-health/coronavirus-disease-2019-covid-19-response-north-carolina",
    "Kansas": "http://www.kdheks.gov/coronavirus/",
    "Louisiana": "http://ldh.la.gov/Coronavirus/",
    "Mississippi": "https://msdh.ms.gov/msdhsite/_static/14,0,420.html",
    "Missouri": "https://health.mo.gov/living/healthcondiseases/communicable/novel-coronavirus/",
    "Nebraska": "http://dhhs.ne.gov/Pages/Coronavirus.aspx",
    "Oklahoma": "https://www.ok.gov/health/Prevention_and_Preparedness/Acute_Disease_Service/Disease_Information/2019_Novel_Coronavirus/index.html",
    "Utah": "https://coronavirus.utah.gov/",
    "Vermont": "https://www.healthvermont.gov/response/infectious-disease/2019-novel-coronavirus",
    "Washington D.C.": "https://coronavirus.dc.gov/",
    "Alabama": "https://www.alabamapublichealth.gov/infectiousdiseases/2019-coronavirus.html",
    "Alaska": "http://www.dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.aspx",
    "Arkansas": "https://www.healthy.arkansas.gov/programs-services/topics/novel-coronavirus",
    "Delaware": "https://dhss.delaware.gov/dhss/dph/epi/2019novelcoronavirus.html",
    "Guam": "https://ghs.guam.gov/coronavirus-covid-19",
    "Idaho": "https://www.cdhd.idaho.gov/dac-coronavirus.php",
    "Maine": "https://www.maine.gov/dhhs/mecdc/infectious-disease/epi/airborne/coronavirus.shtml",
    "Montana": "https://dphhs.mt.gov/publichealth/cdepi/diseases/coronavirusmt",
    "New Mexico": "http://cv.nmhealth.org/",
    "North Dakota": "https://www.health.nd.gov/diseases-conditions/coronavirus",
    "Palau": "https://pw.usembassy.gov/coronavirus-update-palau/",
    "Virgin Islands": "https://doh.vi.gov/news/department-health-closely-monitoring-coronavirus",
    "Wyoming": "https://health.wyo.gov/publichealth/infectious-disease-epidemiology-unit/disease/novel-coronavirus/",

// Countries
    "!Global": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
    "US": "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
    }

  export { 
    COUNTRIES,
    US_REGIONS,
    US_STATES,
    DATA_URL,
    STAGING_DATA_URL,
    REGION_URLS,
    CACHE_TIMER,
    ONE_MINUTE,
    LAST_UPDATE_KEY,
    GLOBAL_KEY,
    US_STATES_KEY,
    US_REGIONS_KEY,
    CACHE_INVALIDATE_GLOBAL_KEY,
    CACHE_INVALIDATE_US_STATES_KEY,
    CACHE_INVALIDATE_US_REGIONS_KEY,
  }