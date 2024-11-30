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
function ServiceSDK() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
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
  }
}

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
  element.textContent = (hour >= 4 && hour < 22) ? 'Private' : 'Evening';
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
    /** convert some 'JSON' to 'CSV' type. */
    if (typeof data === "object") {
      return Object.entries(data)
        .map(([key, value]) =>
          typeof value === 'object' ?
          `${key}, ${formatToCSV(value)}` :
          `${key}, ${value}`
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
 * An array of objects containing image URLs
 */
const imageArray = [
//Solar system
{"url":"https://i.pinimg.com/originals/d9/e2/d4/d9e2d4562a1d79f1162cc39765c598ef.jpg"},
{"url":"https://i.pinimg.com/736x/a5/34/9b/a5349ba68bec007e996bd8d731c7ae2b.jpg"},
{"url":"https://i.pinimg.com/originals/c8/34/32/c83432331172bd8f51b277a9c91891e1.jpg"},
{"url":"https://i.pinimg.com/originals/8c/09/c3/8c09c3db15205d71828614fb50c21586.jpg"},
{"url":"https://i.pinimg.com/474x/29/27/1d/29271d5a1e15ccf350596fdc8e5c5c5d.jpg"},
{"url":"https://i.pinimg.com/originals/b7/13/ea/b713ea4b2a500ed9d3910a15c635f023.jpg"},
{"url":"https://i.pinimg.com/originals/f9/1c/51/f91c51bc6d1f1942e98a9c22814ebb3f.png"},
{"url":"https://i.pinimg.com/736x/9f/5c/28/9f5c287926e0c8766799f9ec4bec89d6.jpg"},
{"url":"https://i.pinimg.com/originals/c1/9a/2a/c19a2a58c8d71639ae3ee6db34685391.jpg"},
{"url":"https://i.pinimg.com/originals/6c/f1/37/6cf1370a64c272d8aaf9490e1dff743c.jpg"},
{"url":"https://i.pinimg.com/736x/00/00/6f/00006f0c472331569788b210d8635c7d.jpg"},
{"url":"https://i.pinimg.com/originals/82/08/eb/8208ebc0d4048a44c080a71409df25c9.jpg"},
{"url":"https://i.pinimg.com/236x/ee/ae/21/eeae21a2e057b83d1d774c096ecb96e6.jpg"},
{"url":"https://i.pinimg.com/originals/48/bb/3b/48bb3b7871b363867bc7844d2a6aae90.jpg"},
{"url":"https://i.pinimg.com/originals/36/7e/19/367e1912f737bbf9a1a61fbe2a12e9cd.jpg"},
{"url":"https://i.pinimg.com/originals/88/5b/4a/885b4ab16529263f209a6f416ca7b4ad.jpg"},
{"url":"https://i.pinimg.com/474x/5c/e1/84/5ce1847a19a41aa74d51a90516061792.jpg"},
{"url":"https://i.pinimg.com/originals/7a/ef/91/7aef914e9b24de6d8e3b4b5ecacd6f6c.jpg"},
{"url":"https://i.pinimg.com/originals/48/48/82/4848824770cf04acbe9fd7bd513c7a83.jpg"},
{"url":"https://i.pinimg.com/originals/03/4b/c2/034bc2dd6dff6a67e3f176122ee837e9.jpg"},
{"url":"https://i.pinimg.com/originals/88/ff/d5/88ffd5f0181e5d0741cacbe38e829182.jpg"},
{"url":"https://i.pinimg.com/736x/6d/de/62/6dde62103b65927b7e1840a6d6173fad.jpg"},
{"url":"https://i.pinimg.com/originals/b0/a3/86/b0a386db6783f537751f29492d1ff80f.jpg"},
{"url":"https://i.pinimg.com/736x/aa/1e/c6/aa1ec6fa47931a81f24861d23449365a.jpg"},
{"url":"https://i.pinimg.com/originals/9f/52/54/9f5254bc2bd06904beb8f17337023808.jpg"},
{"url":"https://i.pinimg.com/originals/bf/e2/07/bfe207e08f784faa68df2761cd9b1456.jpg"},
{"url":"https://i.pinimg.com/originals/e8/33/79/e83379e03b2542ae0959399bbee21357.jpg"},
{"url":"https://i.pinimg.com/originals/8a/63/56/8a6356fa50e7f8edffd19ed35f8a8bbd.jpg"},
{"url":"https://i.pinimg.com/736x/76/89/e4/7689e4658b2eebc4068bd6a0a45c060e.jpg"},
{"url":"https://i.pinimg.com/236x/be/d1/12/bed112c4d610558bf9bca93870c71722.jpg"},
{"url":"https://i.pinimg.com/originals/b3/a3/e9/b3a3e9b19c54e83bb72e607a90af439f.jpg"},
{"url":"https://i.pinimg.com/originals/30/9e/6b/309e6b43e2680475a8cde96907a18a60.jpg"},
{"url":"https://i.pinimg.com/222x/25/ec/fd/25ecfdde359c1779db5947219c890aa2.jpg"},
{"url":"https://i.pinimg.com/originals/e5/ea/dd/e5eadd4877ed1f3867f3433800965fcb.png"},
{"url":"https://i.pinimg.com/600x315/3d/c9/0b/3dc90b0d87da857def7fd91521c72473.jpg"},
{"url":"https://i.pinimg.com/originals/26/33/97/263397a860037984a553a1d915ec3691.jpg"},
{"url":"https://i.pinimg.com/236x/bd/c8/14/bdc814b448952e95d2c6106cf142c6c0.jpg"},
{"url":"https://i.pinimg.com/736x/ed/a0/31/eda031011ce176c7c0ed0551247f67c2.jpg"},
{"url":"https://i.pinimg.com/originals/6d/69/46/6d6946b8256825dee5c6058a6a4bc164.jpg"},
{"url":"https://i.pinimg.com/originals/bf/b1/86/bfb18672013200ac641475813a8f2257.jpg"},
{"url":"https://i.pinimg.com/564x/0a/f2/ef/0af2ef8cf92ec331371309ad36695e88.jpg"},
{"url":"https://i.pinimg.com/736x/38/b4/a2/38b4a2ecc5f1abcf761a0d15c892f39d.jpg"},
{"url":"https://i.pinimg.com/736x/dc/bf/2b/dcbf2bda9061c39c653bbffba2ae316e.jpg"},
{"url":"https://i.pinimg.com/736x/42/a5/70/42a57070dfcd140397e85860f3e244ca.jpg"},
{"url":"https://i.pinimg.com/736x/a6/6c/8d/a66c8df30a1fe37b55d7f5ed0c91b66c.jpg"},
{"url":"https://i.pinimg.com/280x280_RS/e2/a5/4a/e2a54ab4453076d0b95666c9811f719e.jpg"},
{"url":"https://i.pinimg.com/originals/60/34/06/603406146426479f4d3c4003efb74e63.jpg"},
{"url":"https://i.pinimg.com/236x/3d/18/26/3d1826e9fb15c2eba2d3d62ee128bee3.jpg"},
{"url":"https://i.pinimg.com/originals/f0/71/ef/f071ef240cfa7400d583da9e0181489a.png"},
{"url":"https://i.pinimg.com/736x/2e/9a/44/2e9a4408821b7da53b766cb5cbfe490f.jpg"},
{"url":"https://i.pinimg.com/originals/96/8f/68/968f6855f7d053945d089b73a30d3715.jpg"},
{"url":"https://i.pinimg.com/236x/50/2d/52/502d522cd8add015b0167ef63e64a7b9.jpg"},
{"url":"https://i.pinimg.com/originals/aa/38/03/aa3803a8608d6cdb9199bd9b542454bf.png"},
{"url":"https://i.pinimg.com/originals/ec/9b/d6/ec9bd64b521a3630fc5d17cbc11be5fd.jpg"},
{"url":"https://i.pinimg.com/originals/b2/5b/d9/b25bd9e88a403fa3e4333170d5aa2ef2.jpg"},
{"url":"https://i.pinimg.com/474x/ce/28/5e/ce285eeea0df9e4e84c6f69725076ef8.jpg"},
{"url":"https://i.pinimg.com/originals/40/3c/85/403c8524dc24303034d575d91190d120.jpg"},
{"url":"https://i.pinimg.com/originals/a1/af/26/a1af2692d2fe1921e82b196c929017b3.jpg"},
{"url":"https://i.pinimg.com/474x/e4/ff/68/e4ff68c8976347d17037d12261bd08e2.jpg"},
{"url":"https://i.pinimg.com/originals/45/b5/ed/45b5ed9005ae6a206340dc42b2701ca0.jpg"},
{"url":"https://i.pinimg.com/originals/8e/ec/89/8eec891d576e8443332625d0229ed6cd.jpg"},
{"url":"https://i.pinimg.com/originals/9f/3e/a1/9f3ea1151427e98b0bac417c1aa602a5.jpg"},
{"url":"https://i.pinimg.com/236x/2e/1c/3a/2e1c3a3d11b8e25e414f9b4ef4efc2b6.jpg"},
{"url":"https://i.pinimg.com/originals/08/1f/88/081f8885ab8d9bf1ff5165a564789333.jpg"},
{"url":"https://i.pinimg.com/236x/1e/f5/74/1ef57400c8bd447cae8623fb20cb2d76.jpg"},
{"url":"https://i.pinimg.com/originals/0d/b8/7e/0db87ece859ab11069b522d467d8a64a.jpg"},
{"url":"https://i.pinimg.com/474x/8b/af/5c/8baf5caf6a454734ee5262d8c46786ab.jpg"},
{"url":"https://i.pinimg.com/originals/5c/98/ef/5c98efcb7708e501604bd08d2c44d38e.jpg"},
{"url":"https://i.pinimg.com/originals/4a/13/99/4a1399d8ffabbeb3775b2bafa8c1f461.gif"},
{"url":"https://i.pinimg.com/236x/32/20/e0/3220e01fd0f21b0c68801cd5f46810a6.jpg"},
{"url":"https://i.pinimg.com/736x/61/b1/8b/61b18bf07c39bae5f23117aa0df66edd.jpg"},
{"url":"https://i.pinimg.com/236x/f2/e4/63/f2e4634cc22a1dcb59aaba0d04cd6119.jpg"},
{"url":"https://i.pinimg.com/originals/6a/f1/cb/6af1cb0ac15e65233785705603b55eda.jpg"},
{"url":"https://i.pinimg.com/originals/88/07/86/880786dff6c379e1ab54c5129c3c92d2.jpg"},
{"url":"https://i.pinimg.com/originals/29/d7/c1/29d7c18de61722a45d90700a90fee3c7.jpg"},
{"url":"https://i.pinimg.com/originals/bb/3a/70/bb3a706b37bc17979755094e400083fe.jpg"},
{"url":"https://i.pinimg.com/474x/5c/98/ef/5c98efcb7708e501604bd08d2c44d38e.jpg"},
{"url":"https://i.pinimg.com/736x/2b/c6/16/2bc616aa43addc920333461cf4bd9ed5.jpg"},
{"url":"https://i.pinimg.com/280x280_RS/2d/8e/96/2d8e96c232652d1b257c7df21d40463e.jpg"},
{"url":"https://i.pinimg.com/originals/92/58/70/92587080cb3554fb8f9949cbea3427db.jpg"},
{"url":"https://i.pinimg.com/736x/94/ff/3c/94ff3c1beeb1e27370615d64fc9bc35a.jpg"},
{"url":"https://i.pinimg.com/736x/8b/91/90/8b91903eb08ed1037c9c5f2161806473.jpg"},
{"url":"https://i.pinimg.com/200x150/98/55/6c/98556c60dd918a53832c0fbce892b549.jpg"},
{"url":"https://i.pinimg.com/474x/17/ab/9a/17ab9a049bac3c68020d3c57cdf0f365.jpg"},
{"url":"https://i.pinimg.com/474x/f9/75/d4/f975d458740434e3e2c69ee03f4de8fc.jpg"},
{"url":"https://i.pinimg.com/736x/58/80/f6/5880f6e9e9a1f7df8f232698c79c3787.jpg"},
{"url":"https://i.pinimg.com/236x/14/4d/67/144d675da9be51f1596579a53208a89b.jpg"},
{"url":"https://i.pinimg.com/originals/76/98/cc/7698ccfeea0932546ab1db2dc8d41625.jpg"},
{"url":"https://i.pinimg.com/236x/a1/53/7b/a1537b7d0435f4fe8da7ce2d038762b4.jpg"},
{"url":"https://i.pinimg.com/originals/9f/db/e0/9fdbe0e3b598d8838125880f66cf2477.jpg"},
{"url":"https://i.pinimg.com/originals/3e/63/5b/3e635bc0b811e7df4bea4de654796d7d.jpg"},
{"url":"https://i.pinimg.com/originals/70/54/cd/7054cd65d56d32e532b0ba9ec0bdc4cc.jpg"},
{"url":"https://i.pinimg.com/236x/8b/25/19/8b2519a9c7d4437223909f7412ea4369.jpg"},
{"url":"https://i.pinimg.com/736x/4c/66/80/4c6680d13d209864142e0c83d53c8d54.jpg"},
{"url":"https://i.pinimg.com/originals/f7/8f/f3/f78ff3f53f94de281af1fcf788fe2eca.jpg"},
{"url":"https://i.pinimg.com/736x/dd/fd/31/ddfd31eb6b71975c61cea67a244e08b5.jpg"},
{"url":"http://k35.kn3.net/taringa/1/7/1/2/6/4/67/fhercho06/E5D.gif?9650"},
//Islamic
{"url":"https://i.pinimg.com/736x/cc/9b/79/cc9b797e7e7f80dce1f6a4c004aae145.jpg"},
{"url":"https://i.pinimg.com/originals/05/5f/9f/055f9f7068e597ae05c26acfe74f0afb.jpg"},
{"url":"https://i.pinimg.com/236x/26/9d/f4/269df473c3b92df6ba8102ca96e0bb90.jpg"},
{"url":"https://i.pinimg.com/736x/be/22/a0/be22a07f0085f53ee9f5bdfc38ad9d05.jpg"},       
{"url":"https://i.pinimg.com/originals/30/78/8c/30788c0ffb856399b365d14f79eaa1a7.jpg"},        
{"url":"https://i.pinimg.com/originals/5f/50/91/5f5091bb3e30bc80b7626e824ab4a965.jpg"},
{"url":"https://i.pinimg.com/736x/e5/f2/d4/e5f2d4a47df460e9378e7587f6be5b7a.jpg"},
{"url":"https://i.pinimg.com/originals/0b/c2/d7/0bc2d7a6cd607ceef421a16ff5d3f449.jpg"},
{"url":"https://i.pinimg.com/736x/02/fc/e2/02fce2a2d7388cbe1d540e0f22a0efdb.jpg"},
{"url":"https://i.pinimg.com/474x/5b/24/e7/5b24e733cdb766a6ca8f40188613aca7.jpg"},
{"url":"https://i.pinimg.com/736x/39/5c/22/395c22db7d260d7d69f644687fda3ab0.jpg"},
{"url":"https://i.pinimg.com/736x/b3/92/5f/b3925f4f6ff544f8efd91e3e1ef43793.jpg"},
{"url":"https://i.pinimg.com/originals/67/fd/0c/67fd0c4107943a8525ae282557480a73.jpg"},
{"url":"https://i.pinimg.com/236x/3f/21/79/3f2179d69c34288a0125a7f24d77c974.jpg"},       
{"url":"https://i.pinimg.com/originals/7a/8e/ad/7a8ead45f2b3adbcc709f0219231df67.jpg"},        
{"url":"https://i.pinimg.com/originals/c7/13/6f/c7136f79d1f40731a189afff02e08361.jpg"},       
{"url":"https://i.pinimg.com/originals/98/86/a3/9886a33e0e07459b3d8f8e152a201f11.jpg"},
{"url":"https://i.pinimg.com/originals/48/ba/7d/48ba7d89e9fd407d6bd810c5697d3fbc.jpg"},
{"url":"https://i.pinimg.com/474x/d4/06/b8/d406b8050e9242f187c42922baa8cc53.jpg"},      
{"url":"https://i.pinimg.com/550x/0b/ec/0e/0bec0e9abd0d61630403d8e24382bd93.jpg"},
{"url":"https://i.pinimg.com/736x/03/30/bd/0330bd7f9677cd46461ee8bd0e13ff8a.jpg"},
{"url":"https://i.pinimg.com/474x/d5/0c/e8/d50ce86a99382cdee365cc702ce3c70c.jpg"},
{"url":"https://i.pinimg.com/736x/4c/cf/66/4ccf66ec4206c89cb1c544b45204cde0.jpg"},
{"url":"https://i.pinimg.com/736x/26/56/08/2656082a0770cd79203a3dcba16cdcff.jpg"},     
{"url":"https://i.pinimg.com/236x/ce/60/70/ce60702b100a7dbe610f99b7c8273334.jpg"},       
{"url":"https://i.pinimg.com/originals/90/d7/49/90d749001cf287356d43100fbd19f482.png"},
{"url":"https://i.pinimg.com/736x/c9/6d/c9/c96dc93be89fe9b2d008e1f4497a70c4.jpg"},
{"url":"https://i.pinimg.com/736x/7d/c2/b1/7dc2b1224b0fda1e8e1152cf6afcf006.jpg"},        
{"url":"https://i.pinimg.com/originals/72/db/dc/72dbdc829c3173163dc6d57c3016e302.jpg"},
{"url":"https://i.pinimg.com/originals/ca/ce/34/cace346c64095fdf393bbb76c8fcc3af.jpg"},
{"url":"https://i.pinimg.com/736x/f0/46/fa/f046fa20cf86be7576e777895bc86747.jpg"},
{"url":"https://i.pinimg.com/564x/8b/59/24/8b5924784d7afb3b9213bd0d24b83d18.jpg"},
{"url":"https://i.pinimg.com/474x/a3/68/0e/a3680e8f2759af060330f329108e1159.jpg"},
{"url":"https://i.pinimg.com/originals/9c/21/6b/9c216bc6c08573e68bcb6e83c5972dd7.jpg"},
{"url":"https://i.pinimg.com/474x/e4/23/52/e42352c30d1468c8fa47cc8dbf5efe3c.jpg"},
{"url":"https://i.pinimg.com/736x/7a/43/c9/7a43c96b42f31fed6932e592aa275ac2.jpg"},
{"url":"https://i.pinimg.com/550x/ef/4f/6c/ef4f6ced8757837cc842f742e5a461cd.jpg"},
{"url":"https://i.pinimg.com/originals/23/43/ba/2343ba9470fe9a3378a868b3700925f1.png"},
{"url":"https://i.pinimg.com/originals/e0/93/42/e09342353fbd843edfc5fb1f37becc20.jpg"},
{"url":"https://i.pinimg.com/564x/93/ab/a1/93aba1cb49981f113ae5c4c9a48ce7b8.jpg"},
{"url":"https://i.pinimg.com/564x/fc/e2/d1/fce2d1c0e195bcdaf1b234a5854982f2.jpg"},
{"url":"https://i.pinimg.com/originals/a4/b6/d0/a4b6d06f2c6a24b03ac3dd99f96a87f7.jpg"},
{"url":"https://i.pinimg.com/736x/79/ad/bc/79adbcddf765127acf0bcbee8d45680a.jpg"},
{"url":"https://i.pinimg.com/736x/48/26/cf/4826cf9573c439a92ab822912cd95eb2.jpg"},
{"url":"https://i.pinimg.com/736x/d4/e4/61/d4e46105513721cc065827bf4a8d05d2.jpg"},
{"url":"https://i.pinimg.com/736x/68/62/c6/6862c667d35f30f684721f7abfd82412.jpg"},
{"url":"https://i.pinimg.com/736x/51/7d/aa/517daa721bea7cac5345f7f13d1cec69.jpg"},
{"url":"https://i.pinimg.com/564x/c7/0a/a0/c70aa09badfb1293887b7c838bfb8aa0.jpg"},
{"url":"https://i.pinimg.com/736x/01/76/2f/01762f521947ba2338d4dac68b318cde.jpg"},
{"url":"https://i.pinimg.com/originals/34/63/46/34634606d7cf9b039feee812537be96e.jpg"},
{"url":"https://i.pinimg.com/736x/74/67/45/746745eda41f131fd55957c37e503d92.jpg"},
{"url":"https://i.pinimg.com/originals/2c/98/02/2c98020b91f20f019694f53752b7c027.jpg"},
{"url":"https://i.pinimg.com/originals/30/0f/b4/300fb4a51426c130c86b576c0901c0f0.jpg"},
{"url":"https://i.pinimg.com/736x/f4/66/88/f46688d460a40cb28da08b2536e75368.jpg"},
{"url":"https://i.pinimg.com/736x/1c/65/7d/1c657d0a0156855fd9477a13561e62e6.jpg"},
{"url":"https://i.pinimg.com/474x/f5/29/a2/f529a2c7139beb77882e2b3066b808d0.jpg"},
{"url":"https://i.pinimg.com/236x/b4/3f/1c/b43f1c5435c60b5b1bc43eba501072af.jpg"},
{"url":"https://i.pinimg.com/564x/c1/72/96/c17296aff1db43d374d0c33e5448a3be.jpg"},
{"url":"https://i.pinimg.com/736x/7a/8d/eb/7a8debaed46e8dd680f806df63d7998d.jpg"},
{"url":"https://i.pinimg.com/736x/1e/d3/3c/1ed33c76e3bb40de11141df5049266e3.jpg"},
{"url":"https://i.pinimg.com/originals/9a/0c/47/9a0c47fab6a0b99c686f7cb8b3640999.jpg"},
{"url":"https://i.pinimg.com/236x/9c/0f/c2/9c0fc2dcd5c24326b117124a119bd757.jpg"},
{"url":"https://i.pinimg.com/originals/c3/33/41/c33341c9639509ac4153aac33b5783bd.jpg"},
{"url":"https://i.pinimg.com/736x/ec/5c/ba/ec5cba582f5d5892e656dbf0b1356ce5.jpg"},
{"url":"https://i.pinimg.com/736x/39/f3/b3/39f3b38de3ca450ac791751ce0d95d9d.jpg"},
{"url":"https://i.pinimg.com/736x/48/6a/d4/486ad43b70e94fd0b910a171ab6b1ef0.jpg"},
{"url":"https://i.pinimg.com/474x/a9/ee/de/a9eeded8571014e0c62a8f972cb7ac82.jpg"},
{"url":"https://i.pinimg.com/originals/51/fb/1e/51fb1e147c386fd9ecdc1fd3ad099093.jpg"},
{"url":"https://i.pinimg.com/736x/1e/b0/44/1eb044eade6c8beda38dea7036485c9e.jpg"},
{"url":"https://i.pinimg.com/736x/21/e9/ce/21e9cefe5225d99f0e171153ebe733d4.jpg"},
{"url":"https://i.pinimg.com/originals/89/7f/f2/897ff29f1e113a7df7c285c3dbe554ce.jpg"},
{"url":"https://i.pinimg.com/originals/76/13/36/761336e88fd9d5d9b498d02e7a558a9e.jpg"},
{"url":"https://i.pinimg.com/736x/f7/31/3c/f7313cbe41a3f65598fa6ae81d18db93.jpg"},
{"url":"https://i.pinimg.com/564x/a5/00/b9/a500b9cd26460a1fdcb39f34e12c7806.jpg"},
{"url":"https://i.pinimg.com/originals/8c/4d/d5/8c4dd53c68beb0298d450f515192a792.jpg"},
{"url":"https://i.pinimg.com/736x/f5/6d/1f/f56d1fb6f5e7603644c2d754f5a045e6.jpg"},
{"url":"https://i.pinimg.com/736x/ae/3c/b6/ae3cb6bafc0b1e7c61612c8ed62d8e77.jpg"},
{"url":"https://i.pinimg.com/originals/f0/1d/0a/f01d0a159d607936e53c3e550263a38f.jpg"},
{"url":"https://i.pinimg.com/736x/8b/7e/c4/8b7ec437160acc40e4ef80d8d7134629.jpg"},
{"url":"https://i.pinimg.com/originals/fb/85/4a/fb854a4d2f79820cf7f5ebff231e05b3.jpg"},
{"url":"https://i.pinimg.com/736x/8a/20/96/8a2096bad0b0b580857302fecff5dbcf.jpg"},
{"url":"https://i.pinimg.com/736x/44/95/c4/4495c4675140746dc500315ba7c53543.jpg"},
{"url":"https://i.pinimg.com/originals/f7/8a/b4/f78ab4f78a59969995e15f2bddc3a78b.jpg"},
{"url":"https://i.pinimg.com/originals/21/ec/5f/21ec5f2f5b98c1e6227652f8f3827a65.gif"},
{"url":"https://i.pinimg.com/474x/62/13/25/621325402c88ffe966f8e26710b28268.jpg"},
{"url":"https://i.pinimg.com/564x/6b/a0/28/6ba0284c755a206fb5614d346d57f884.jpg"},
{"url":"https://i.pinimg.com/236x/03/df/f0/03dff03549ef3eb163473c73de987d0c.jpg"},
{"url":"https://i.pinimg.com/564x/a9/2b/a7/a92ba723ac5f756e55d61b9f7f611c5b.jpg"},
{"url":"https://i.pinimg.com/originals/23/61/c4/2361c4ec26be7c8e43117505d7433d77.png"},
{"url":"https://i.pinimg.com/originals/3a/1f/fe/3a1ffe7fa682c1f94e002324790c16e6.jpg"},
{"url":"https://i.pinimg.com/736x/02/82/5e/02825e049f602e43254121c8ed89c3ca.jpg"},
{"url":"https://i.pinimg.com/originals/f2/7f/89/f27f89d5538542488997736a278a4796.jpg"},
// Aesthetic
{"url":"https://e.top4top.io/p_2446zzdp40.jpg"},
{"url":"https://f.top4top.io/p_2446a3n0s1.jpg"},
{"url":"https://g.top4top.io/p_24462fiaa2.jpg"},
{"url":"https://i.top4top.io/p_2446ppsoh4.jpg"},
{"url":"https://j.top4top.io/p_2446o20kb5.jpg"},
{"url":"https://k.top4top.io/p_24464nzbi6.jpg"},
{"url":"https://a.top4top.io/p_2446b9yr08.jpg"},
{"url":"https://l.top4top.io/p_2446ym3fo7.jpg"}
];

/** 
 * Main feature set you can change it here
 * @param {*} eather 
 * @param {*} github
 * @param {*} youtube
 * @param {*} gemini
 * @param {*} reapl-3.6
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
      // Get user information
      const userResponse = await (await fetch(`https://api.github.com/users/${owner}`)).json();

      // Get a list of files in the repository
      const repoResponse = await (await fetch(`https://api.github.com/repos/${owner}/${repoPath}/contents`)).json();

      return (
        `<img style='width:100%;height:200px;outline:none;border:none;box-shadow:0 0.5rem 1.5rem rgba(22, 28, 45, 0.1);border-radius:15px;object-fit:cover;' src='${userResponse.avatar_url}'/>` +
        markDown(
          "Profile photos from GitHub may be copyrighted so be careful when downloading them..\n\n**Github repository JSON database**\n\n```" +
          JSON.stringify(repoResponse, null, 2) +
          "```"
        )
      );
    } catch (error) {
      return "ApI response encountered an error, please try again later, thank you. " + error;
    }
  } else if (user.startsWith("~")) {
    const city = user.substring(2).trim();

    try {
      const apiKey = "1fe5f03e8b679377cbc41601289edfdd"; // Replace it with the API key you have
      const weatherResponse = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)).json();

      // Retrieve all necessary data from the API
      const {
        name,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        wind: { speed },
        weather,
        sys: { country, sunrise, sunset },
        coord: { lon, lat },
      } = weatherResponse;

      const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      // Convert Unix time to local time format
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

      return (
        markDown(
          `This is the weather search result for ${city}. Weather accuracy is supported by Weather.org. \n\n**Weather in ${name}, ${country}** \n\nTemperature: ${temp}°C (Feels like: ${feels_like}°C) \nMin/Max Temperature: ${temp_min}°C / ${temp_max}°C \nWeather: ${weather[0].description} \nHumidity: ${humidity}% \nPressure: ${pressure} hPa \nWind Speed: ${speed} m/s \nCoordinates: [${lat}, ${lon}] \nSunrise: ${sunriseTime} \nSunset: ${sunsetTime}`
        ) +
        `<img style='width:100px;height:100px;' src='${weatherIcon}' alt='Weather icon' />`
      );
    } catch (error) {
      return "Failed to find weather information, maybe your connection is not stable. " + error.message;
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

      // Get videoId and description
      const videoDescription = yrest.items[0].snippet.description;
      const iframe = `<iframe style="width:100%;height:250px;outline:none;border:none;border-radius:10px;object-fit:cover;background:#000;color:transparent;" src="https://www.youtube.com/embed/${yrest.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><span>${videoDescription}</span>`;

      return iframe;
    } catch (youtubeError) {
      return "The searched video could not be loaded. " + youtubeError;
    }
  } else if (user.includes("_")) {
    const index = parseInt(user.replace(/\D/g, ""));
    if (index >= 0 && index < videoArray.length) {
      const videoArray = [];
      const data =
        "<video poster='./obb/image/thumb.jpg' src='" +
        videoArray[index] +
        "' width='100%' height='200px' style='border-radius:0.600rem;object-fit:cover;' controls></video>";
      return data;
    } else {
      return "Sorry, number " + index + " The index you entered is invalid.";
    }
  } else if (user.includes("#")) {
      // If a user requests to see a photo, the bot will check the requested image index and send the image.
      const index = parseInt(user.replace(/\D/g, "")); // Gets index number from user input
      if (index >= 0 && index < imageArray.length) {
        return "<img src='" + imageArray[index].url + "' alt='Foto " + index + "' width='100%' style='border-radius:10px;'>";
      } else {
        return "Sorry, the index number you entered is invalid, please try again later, thank you for trying..";
      }
  } else if (user.startsWith("")) {
    try {
      const response = user.substring(0).trim();
      const data = await ( /** get data From vercel APIs */ await fetch(`https://api-mininxd.vercel.app/gemini/?q=${response}`)).json();
      return markDown(data.text);
    } catch {
      /** 
       * GenReaplAI
       *
       * This model is not yet fully equivalent to artificial intelligence so it would be natural if the model's answers were always wrong
       * @param {string} new ReaplAI(), get class from constructor
       */
      const data = new ReaplAI().defaultParseResponse(user);
      return markDown(data);
    }
  }
}


