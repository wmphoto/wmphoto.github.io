function loadImages () {
    // Set table dimensions
    var minX = null;
    var maxX = null;
    var minY = null;
    var maxY = null;
  
    for (var key in data) {
      if (data[key].x < minX || minX == null) {
        minX = data[key].x;
      }
      if (data[key].x > maxX || maxX == null) {
        maxX = data[key].x;
      }
      if (data[key].y < minY || minY == null) {
        minY = data[key].y;
      }
      if (data[key].y > maxY || maxY == null) {
        maxY = data[key].y;
      }
    }
  
    if (maxX > -minX) {
      xBound = maxX;
    } else {
      xBound = -minX;
    }
  
    if (maxY > -minY) {
      yBound = maxY;
    } else {
      yBound = -minY;
    }

    // Fill table with images
    var div = document.createElement('div');
    div.setAttribute('class', 'container');
    var htmlText = '';
    htmlText += '<table>';
    for (var i = yBound + 1; i >= -yBound - 1; i--) {
      htmlText += '<tr>';
      for (var j = -xBound - 1; j <= xBound + 1; j++) {
        isPopulated = false;
  
        for (var key in data) {
          if (data[key].x === j && data[key].y === i) {
            htmlText += '<td x="' + j + '" y="' + i + 
                        '" class="populated" ' +  
                        'style="background-image:url(img/' + data[key].imgSmall + ');">';
            isPopulated = true;
          }
        }
  
        if (!isPopulated) {
          htmlText += '<td x="' + j + '" y="' + i + 
                      '" class="empty" ' +
                      'align="center"' + 
                      'onClick="addJSONform(this)">';        
        }
        htmlText += '</td>';
      }
      htmlText += '</tr>';
    }
    htmlText += '</table>';
    div.innerHTML = htmlText;  
    document.getElementById('content').appendChild(div);
  }
  
  
  // Load at the center of the document
  function scrollToMiddle () {
    window.scrollTo((document.body.scrollWidth - window.innerWidth) / 2, (document.body.scrollHeight - window.innerHeight) / 2);  
  }


  function addJSONform(element) {
    element.onclick = null;
    element.innerHTML = '<form onSubmit="return generateJSON(this)">' +
                        'id:\ ' +
                        '<input type="text" class="id">\ ' +
                        '<input type="submit" value="Generate JSON">' +
                        '</form>';
  }


  // Makes a JSON to add to data.js
  function generateJSON(element) {
    var id = element.getElementsByClassName('id')[0].value;
    var x = element.parentNode.getAttribute('x');
    var y = element.parentNode.getAttribute('y');
    
    var idValid = false;
    for (var profile in profiles) {
      if (profiles[profile].id == id) {
        idValid = true;
      }
    }


    if (idValid) {
      element.parentNode.setAttribute('align', 'left'); 
      element.parentNode.innerHTML = '<p align="center">Add this to data.js:</p>' +
                                     '<pre style="padding-left: 50px;">  {\n' +
                                     '    "id": "' + id + '",\n' +
                                     '    "x": ' + x + ',\n' +
                                     '    "y": ' + y + ',\n' +
                                     '    "imgSmall": "' + generateImageName(id) + '-small.jpg",\n' +
                                     '    "imgLarge": "' + generateImageName(id) + '-large.jpg",\n' +
                                     '    "date": "' + new Date().toJSON().slice(0,10) + '"\n' +
                                     '  },</pre>';
    } else {
      element.parentNode.innerHTML += '<br>invalid id';      
    }
    return false;
  }


  // Determines what the name of the image should be
  function generateImageName(id) {
    var max = 0;
    for (var key in data) {
      if (data[key].imgSmall.substring(0, 2) == id && (parseInt((data[key].imgSmall).substring(2, 4)) > max)) {
        max = parseInt((data[key].imgSmall).substring(2, 4));
      }
    }
    return id + ('00' + (max + 1)).slice(-2);
  }

  loadImages();
  scrollToMiddle();
  