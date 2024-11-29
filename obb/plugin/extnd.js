'use strict';

/**
 * ServiceWorker
 *
 * @param {*} to improve the user experience, you can also add a Service Worker. Service Workers help the application to function even when the user is offline. You can register a Service Worker
 * @param {in => navigator} navigator APIs for precache in the chrome
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @public
 */
function ServiceSDK() { if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service.worker.reapl.js')
    .then(function(registration) {
      console.log(
        '(SUCCESS),  Registered Service Workers with coverage: ',
        registration.scope
      );
    })
    .catch(function(error) {
      console.error(
        '(FATAL),  Service Worker registration failed: ',
        error.stack
      );
    });
} else {
    console.log('Handling response not supported failed');
}}

// starting a session with a service worker on the browser side 
ServiceSDK();


/** 
 * Displaying the date
 * Show current accurate date
 */
document.querySelector(
    '#useDate'
).textContent = `${new Date().getDate()} ${new Date().toLocaleDateString(
    'id-ID',
    { month: 'short' }
)} ${new Date().getFullYear()}`;


/**
 * Update status from on to off but not purely that the system is inactive
 * @param {string} updateBotStatus, Start on the status
 */
const updateBotStatus = () => {
    const element = document.querySelector('#isActive');
    const hour = new Date().getHours();
    element.textContent = (hour >= 4 && hour < 22) ? 'Online' : 'Evening';
    element.style.color = (hour >= 4 && hour < 22) ? '#2cb590' : '#5597ff';
    // Set time to update current status
    setTimeout(updateBotStatus, 6000);
}

// Update on the status 
updateBotStatus();


/** 
 * Function code to format messages
 * Use ` markDown('') ` to format the message to a variety of customizable options
 * @public
 */
const markDown = (text) => {
  var inPrint = text;
  const moveBy = [
    { string: /\`\`\`(.*?)\`\`\`/gis, value: '<pre class="language-js line-numbers"><code class="language-js">$1</code></pre>' },
    { string: /`(.*?)`/gis, value: '<code class="ace_a">$1</code>' },
    { string: /\*\*(.*?)\*\*/gis, value: '<b>$1</b>' },
    { string: /~(.*?)~/gis, value: '<s>$1</s>' },
    { string: /\b((?:https?|ftp):\/\/[^\s\°]+)/g, value: '<a href="$1">$1</a>' },
    /** { string: /_(.*?)_/gis, value: '<i>$1<i>' }, */
    /** { string: new RegExp(data.join("|"), "gi"), value: '****' } */
  ];

  moveBy.forEach((moveByOf) => {
    inPrint = inPrint.replace(moveByOf['string'], moveByOf['value']);
  });

  // Apply highlighting block by block after DOM update
  setTimeout(() => {
    document.querySelectorAll('pre code').forEach((block, index) => {
      setTimeout(() => {
        Prism.highlightElement(block);
      }, index * 100); // Delay each block by 100ms
    });
  }, 0);

  return inPrint.trim(); // Starting text sorting
}; 


/**
 * Declare ` document ` html to set up the search system
 * This feature can be used specifically for searches such as ` messages `, ` files ` etc
 * @public
 */
const items = document.querySelectorAll('#listItems');
const searchInput = document.querySelector('#inlineFormInputGroup');
const notFound = document.querySelector('#notFound');

// start declaring functions with ` searchItem() `
function searchItem(query) {
  items.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    if (itemText.includes(query.toLowerCase())) {
      item.style.display = 'block';
      notFound.style.display = 'none';
    } else {
      item.style.display = 'none';
      notFound.style.display = 'block';
      notFound.innerHTML = 'Search results not found!';
    }
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  searchItem(query);
});


/** 
 * Function to confrence json from ` localStorage ` to CSV
 * @param {string} exportCsvModel, Add to html in the form ` onclick="" ` to start downloading
 * @public
 */
function exportCsvModel() {
  let data = JSON.parse(localStorage.getItem('DB'));
  const formatToCSV = (data) => {
    /** convert some 'JSON' to 'CSV' type. */ if (typeof data === "object") {
      return Object.entries(data)
        .map(([key, value]) =>
          typeof value === 'object'
            ? `${key}, ${formatToCSV(value)}`
            : `${key}, ${value}`
        )
        .join('\n');
    }
    return null;
  };
  
  try {
      var __createElmtCsv = document.createElement('a');
      __createElmtCsv.setAttribute(
         'href',
         'data:text/csv;charset=utf8,' + encodeURIComponent(formatToCSV(data))
      );
      __createElmtCsv.setAttribute('download', `${btoa(new Date())}.spreadsheets.csv`);
      document.body.appendChild(__createElmtCsv);
      __createElmtCsv.click();

      // remove items createElement in the download file
      document.body.removeChild(__createElmtCsv);
  } catch (error) {
      alert('Your browser does not support this feature. Please use a different browser.');
  }
}


/** 
 * Call jQuery functions from the server to control website responsiveness and ` ready() `
 * @private
 */
jQuery(document).ready(function() {
    $(".chat-list #a").click(function() {
        $(".chatbox").addClass('showbox');
        return false;
    });

    $(".chat-icon").click(function() {
        $(".chatbox").removeClass('showbox');
    });
});


/** 
 * Main feature set you can change it here
 * @param {*} eather 
 * @param {*} github
 * @param {*} youtube
 * @param {*} gemini
 * @param {*} user.includes("_"), request video in database
 *
 * @public {maintenance} used for public in accordance with the license from the big brand as an API service
 */
async function useFitureMsg(user) {
  // Add other logic here as needed

  if (user.startsWith("//")) {
    const searchQuery = user.substring(3).trim();
    const [owner, repoPath] = searchQuery.split("/");

    try {
      // Dapatkan informasi pengguna
      const userResponse = await (
        await fetch(`https://api.github.com/users/${owner}`)
      ).json();

      // Dapatkan daftar file di repositori
      const repoResponse = await (
        await fetch(
          `https://api.github.com/repos/${owner}/${repoPath}/contents`
        )
      ).json();

      return (
        `<img style='width:100%;height:200px;outline:none;border:none;box-shadow:0 0.5rem 1.5rem rgba(22, 28, 45, 0.1);border-radius:15px;object-fit:cover;' src='${userResponse.avatar_url}'/>` +
        markDown(
          "\n**Github repository JSON database**\n\n```" +
            JSON.stringify(repoResponse, null, 2) +
            "```"
        )
      );
    } catch (error) {
      return (
        "ApI response encountered an error, please try again later, thank you. " +
        error
      );
    }
  } else if (user.startsWith("#")) {
    const city = user.substring(2).trim(); // Ekstrak nama kota dari input pengguna
    try {
      // Dapatkan informasi cuaca dari API cuaca
      const apiKey = "1fe5f03e8b679377cbc41601289edfdd"; // Gantilah dengan API key yang kamu miliki
      const weatherResponse = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
      ).json();

      // Ambil semua data yang diperlukan dari API
      const {
        name,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        wind: { speed },
        weather,
        sys: { country, sunrise, sunset },
        coord: { lon, lat },
      } = weatherResponse;

      const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      // Konversi waktu Unix ke format waktu lokal
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

      // Buat tampilan data cuaca lengkap dengan ikon cuaca
      return (
        markDown(
          `**Weather in ${name}, ${country}** \n\nTemperature: ${temp}°C (Feels like: ${feels_like}°C) \nMin/Max Temperature: ${temp_min}°C / ${temp_max}°C \nWeather: ${weather[0].description} \nHumidity: ${humidity}% \nPressure: ${pressure} hPa \nWind Speed: ${speed} m/s \nCoordinates: [${lat}, ${lon}] \nSunrise: ${sunriseTime} \nSunset: ${sunsetTime}`
        ) +
        `<img style='width:100px;height:100px;' src='${weatherIcon}' alt='Weather icon' />`
      );
    } catch (error) {
      return (
        "Failed to find weather information, maybe your connection is not stable. " +
        error.message
      );
    }
  } else if (user.startsWith("-")) {
    const searchQuery = user.substring(7).trim();
    const youtubeApiKey = "AIzaSyCRzpbNMkmCOcVy1VCiHjiNzdqYnWvN2ec";

    try {
      const yrest = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${youtubeApiKey}`
        )
      ).json();

      // Ambil videoId dan deskripsi
      const videoDescription = yrest.items[0].snippet.description;
      const iframe = `<iframe style="width:100%;height:250px;outline:none;border:none;border-radius:10px;object-fit:cover;background:#000;color:transparent;" src="https://www.youtube.com/embed/${yrest.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><span>${videoDescription}</span>`;

      return iframe;
    } catch (youtubeError) {
      return "The searched video could not be loaded. " + youtubeError;
    }
  } else if (user.includes("_")) {
    const index = parseInt(user.replace(/\D/g, ""));
    var videoArray = [
      "obb/ogg/o0","obb/ogg/o1","obb/ogg/o2","obb/ogg/o3","obb/ogg/o4","obb/ogg/o5"
    ];
    if (index >= 0 && index < videoArray.length) {
      const data =
        "<video poster='./obb/image/thumb.jpg' src='" +
        videoArray[index] +
        "' width='100%' height='200px' style='border-radius:0.600rem;object-fit:cover;' controls></video>";
      return data;
    } else {
      return "Sorry, number " + index + " The index you entered is invalid.";
    }
  } else if (user.startsWith("")) {
    try{
      const text = user.substring(0).trim();
      const data = await(/** get data From vercel APIs */ await fetch(`https://api-mininxd.vercel.app/gemini/?q=${text}`)).json();
      return markDown(data.text);
    } catch (e) {
      return markDown("Oops, something seems to be wrong with our system. \n\n * **Error code** \n```" + e.stack + "```");
    }
  }
}
