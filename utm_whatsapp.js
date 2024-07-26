function updateWhatsAppLinks(clientId) {
    const pageTitle = document.title;
    const message = "Olá! Gostaria de mais informa: " (ID: #" + clientId + ")";
    const encodedMessage = encodeURIComponent(message);
	console.log("encodedMessage ======>",encodedMessage);
    const links = document.querySelectorAll('a[href*="api.whatsapp.com"], a[href*="wa.me"]');
    console.log('links ----->', links);
    links.forEach(link => {
      let href = link.getAttribute('href');
      if (href) {
        if (href.includes('?')) {
          href += "&text=" + encodedMessage;
        } else {
          href += "?text=" + encodedMessage;
        }
        link.setAttribute('href', href);
      }
    });

    console.log("WhatsApp links updated successfully.");
}

function getThisScriptUrl() {
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src.includes('utm_whatsapp.js')) {
          return scripts[i].src;
       }
  }
  return null;
}

function getQueryParam(url, param) {
        // Criar um objeto URL
        const scriptUrl = new URL(url);

        // Criar um objeto URLSearchParams
        const searchParams = new URLSearchParams(scriptUrl.search);

        // Retornar o valor do parÃ¢metro
        return searchParams.get(param);
    }


(function() {
  const urlParams = new URLSearchParams(window.location.search);
  let clientId;
    const scriptUrl = getThisScriptUrl();
    if (scriptUrl) {
		clientId = getQueryParam(scriptUrl, 'clientId');
        updateWhatsAppLinks(clientId);
        console.log('Valor de clientId:', clientId);
    } else {
        console.log('Script nÃ£o encontrado.');
    }

    
})();
