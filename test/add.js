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
            htmlText += '<td id="' + j + ',' + i + 
                        '" onMouseOver="setBG(this, \'#C66\')"' + 
                        ' onMouseOut="setBG(this, \'#FFF\')"' +
                        ' style="background-image:url(img/' + data[key].img + ');">';
            isPopulated = true;
          }
        }
  
        if (!isPopulated) {
          htmlText += '<td id="' + j + ',' + i + 
                      '" onMouseOver="setBG(this, \'#6C5\')"' + 
                      ' onMouseOut="setBG(this, \'#FFF\')"' + 
                      ' align="center"' +                      
                      ' onClick="generateJSON(this)">';        
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

  // https://stackoverflow.com/questions/4897737/mouseover-event-to-change-td-background-and-text
  function setBG(element, color) {
    element.style.backgroundColor = color;
  }

  function generateJSON(element) {
    element.onclick = null;
    element.innerHTML = '<form>' +
                        'id:\ ' +
                        '<input type="text" name="firstname">\ ' +
                        '<button type="button">Generate JSON</button>' +
                        '</form>';
  }
  
  loadImages();
  scrollToMiddle();
  