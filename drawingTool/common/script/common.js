(function (globel) {
  $('.commonDialogClose').on('click', function () {
    $(this).parents('.commonDialog').hide()
  })
  $('.commonDialogTitle').on("mousedown", function (event) {
    // var target = event.target
    var target = $(this).parents('.commonDialog').first().get(0);
    console.log(target)
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;

    target.style.position = 'absolute';
    target.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    target.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      target.style.zIndex = 500;
      target.onmouseup = null;
    };
  })
})(window)



// commonUtil.createObjFromString = function (obj, objString, value) {
//   var objStrArray = objString.split(".");
//   var lastKeyIndex = objStrArray.length - 1;
//   var key;
//   var arrayKey;
//   var arrayIndex;
//   for (var i = 0; i < lastKeyIndex; ++i) {
//     key = objStrArray[i];
//     //check if the fisrt object is an array (end with "]")
//     if (key.substr(key.length - 1) == "]") {
//       arrayKey = key.substr(0, key.indexOf("["));
//       arrayIndex = key.substr(key.indexOf("[") + 1, (key.indexOf("]") - (key.indexOf("[") + 1))) * 1;
//       //check if it exists
//       if (!(arrayKey in obj)) {
//         obj[arrayKey] = [];
//         obj[arrayKey][arrayIndex] = {};
//       } else {
//         //if existed, then check if the array has the index or not
//         if (obj[arrayKey][arrayIndex] == undefined) {
//           obj[arrayKey][arrayIndex] = {};
//         }
//       }
//       obj = obj[arrayKey][arrayIndex];
//     } else {
//       if (!(key in obj))
//         obj[key] = {};
//       obj = obj[key];
//     }
//   }

//   if (obj[objStrArray[lastKeyIndex]] == undefined) {
//     if (value != undefined) {
//       obj[objStrArray[lastKeyIndex]] = value;
//     } else {
//       obj[objStrArray[lastKeyIndex]] = {};
//     }
//   }
//   return obj;
// };

// commonUtil.getParamFromURL = function (param) {
//   var url = window.location.toString();
//   var str = "";
//   var str_value = "";
//   if (url.indexOf("?") != -1) {
//     var ary = url.split("?")[1].split("&");
//     for (var i = 0; i < ary.length; i++) {
//       str = ary[i].split("=")[0];
//       if (str == param) {
//         str_value = decodeURI(ary[i].split("=")[1]);
//         break;
//       }
//     }
//   }
//   return str_value;
// };

// commonUtil.insertParamToURL = function (key,value) {
//     key = encodeURI(key); value = encodeURI(value);
//     var kvp = document.location.search.substr(1).split('&');
//     var i=kvp.length; var x; while(i--) 
//     {
//         x = kvp[i].split('=');
//         if (x[0]==key)
//         {
//             x[1] = value;
//             kvp[i] = x.join('=');
//             break;
//         }
//     }
//     if(i<0) {kvp[kvp.length] = [key,value].join('=');}
//     window.history.replaceState(null,null, window.location.pathname + '?' + kvp.join('&'))
// }

// commonUtil.updateQueryStringParam = function (urlPath, key, value) {
//   var baseUrl = '', urlQueryString = '';
//   if(urlPath.indexOf('?') < 0){
//       baseUrl = urlPath;
//   } else {
//       baseUrl = urlPath.substring(0, urlPath.indexOf('?'));
//       urlQueryString = urlPath.substring(urlPath.indexOf('?'));
//   }
//   var newParam = key + '=' + value,
//       params = '?' + newParam;
//   // If the "search" string exists, then build params from it
//   if (urlQueryString) {
//       var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
//       var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');
//       if( typeof value == 'undefined' || value == null || value == '' ) { // Remove param if value is empty
//           params = urlQueryString.replace(removeRegex, "$1");
//           params = params.replace( /[&;]$/, "" );
//       } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
//           params = urlQueryString.replace(updateRegex, "$1" + newParam);
//       } else { // Otherwise, add it to end of query string
//           params = urlQueryString + '&' + newParam;
//       }
//   }
//   return baseUrl + params;
// }

// commonUtil.loadJsFilesToPage = function (filePaths) {
//   for (var i = 0; i < filePaths.length; i++) {
//     commonUtil.loadFileToPage(filePaths[i].trim());
//   }
// };

// commonUtil.isFileLoaded = function (filePath) {
//   if (!commonUtil.fileLoadedList) {
//     commonUtil.fileLoadedList = [];
//   }
//   if (commonUtil.fileLoadedList.indexOf(filePath) > -1) {
//     return true;
//   } else {
//     return false;
//   }
// }

// commonUtil.globalEval = eval;

// commonUtil.loadFileToPage = function(filePath, notCache) {

//   var urlPath = filePath.trim();

//   var dateNum = new Date().getTime();
//   dateNum = Math.floor(dateNum / 86400000);

//   if (urlPath.endsWith(".css")) {
//     if (commonUtil.isFileLoaded(filePath))
//       return;

//     var head = document.getElementsByTagName('head')[0]
//     var link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = urlPath + "?" + dateNum.toString();
//     head.appendChild(link);
//     commonUtil.fileLoadedList.push(urlPath);
//     head = null;
//     link = null;
//   } else if (urlPath.endsWith(".js")) {
//     if (commonUtil.isFileLoaded(filePath))
//       return;

//     var request = new XMLHttpRequest();
//     request.open('GET', urlPath + "?" + dateNum.toString(), false);
//     request.withCredentials = true;
//     request.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         var source = request.responseText;
//         commonUtil.globalEval(source);
//         commonUtil.fileLoadedList.push(urlPath);
//         request = null;
//       }
//     }
//     request.onerror = function () {
//       console.log("** An error occurred during the transaction");
//     };
//     request.send();
//     return true;
//   } else if (urlPath.endsWith(".htm") || urlPath.endsWith(".html")) {
//     var request = new XMLHttpRequest();
//     request.open('GET', urlPath + "?" + dateNum.toString(), false);
//     request.withCredentials = true;
//     request.send();
//     return request.responseText;
//   } else if (urlPath.endsWith(".json")) {
//     var request = new XMLHttpRequest();
//     request.open('GET', urlPath + "?" + dateNum.toString(), false);
//     request.withCredentials = true;
//     request.send();
//     return request.responseText;
//   }
// };