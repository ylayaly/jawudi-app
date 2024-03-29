var XMLHttpRequest = require('xhr2');

export default async function handler(req, res) {  
  var data = {
    "event_type": "pismic_action"
  }
  var url = 'https://api.github.com/repos/jawudi-inc/jawudi-web-app/dispatches'

  var xhr = new XMLHttpRequest();
  var final_data = JSON.stringify(data)
  
  xhr.open('POST', url);
  xhr.setRequestHeader('Accept', 'application/vnd.github.everest-preview+json');
  xhr.setRequestHeader('Authorization', req.headers.authorization);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload  = function() {
    res.status(200).json({ message : "Deploy prismic", state: xhr.readyState, status : xhr.status })
  };
  xhr.send(final_data)
}
