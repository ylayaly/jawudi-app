var XMLHttpRequest = require('xhr2');

export default async function handler(req, res) {  
  var data = {
    "event_type": "pismic_action"
  }
  var url = 'https://api.github.com/repos/ylayaly/jawudi-app/dispatches'

    var xhr = new XMLHttpRequest();
    var final_data = JSON.stringify(data)
    
    xhr.open('POST', url);
    xhr.setRequestHeader('Accept', 'application/vnd.github.everest-preview+json');
    xhr.setRequestHeader('Authorization', req.headers.authorization);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
      console.log(xhr.readyState, xhr.status)
    }
    
    xhr.send(final_data)

  res.status(200).json({ message : "Deploly prismic" })
}
