// Making the API call with ajax, which returns a json object

function fetchFilmUrl(url) {
    return fetch(url)
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return response.json();
        }
    })
    .catch(e => {
      console.log(`Problem encountered while executing operation - "${url}": ` + e.message);
    })
    .finally(() => {
        console.log(`Executed operation for "${url}" has terminated.`);
      });
    }