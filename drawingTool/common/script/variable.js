function datasourceOp(config) {
  if (!config) {
    config = {};
  }
  if (config && typeof config === 'string') {
    config = JSON.parse(config);
  }
  if (config.variableConfig && typeof config.variableConfig === 'string') {
    config.variableConfig = JSON.parse(config.variableConfig);
  }
  this.variableConfig = config.variableConfig || {}
  this.variableValue = {}
  this.datasourceConfig = config.datasourceConfig || {}
  this.variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?::(\w+))?}/g;
  this.createCurrentValueTable();

  return this;
}

datasourceOp.prototype.mergeMultiPageConfig = function (arrayConfig) {
  this.createCurrentValueTable()
}

datasourceOp.prototype.createCurrentValueTable = function () {
  const obj = this.variableValue;
  for (let i = 0; i < this.variableConfig.length; i++) {
    if (obj.hasOwnProperty(this.variableConfig[i].name)) {
      obj[this.variableConfig[i].name].value = this.variableConfig[i].defalut;
      obj[this.variableConfig[i].name].type = this.variableConfig[i].type;
    } else {
      obj[this.variableConfig[i].name] = {
        name: this.variableConfig[i].name,
        value: this.variableConfig[i].defalut,
        type: this.variableConfig[i].type
      }
    }
  }
  this.variableValue = obj
}

datasourceOp.prototype.getValue = function (name) {
  if (name && this.variableValue.hasOwnProperty(name)) {
    return this.variableValue[name].value;
  } else {
    return name;
  }
}

datasourceOp.prototype.setValue = function (name, value) {
  if (name && this.variableValue.hasOwnProperty(name)) {
    this.variableValue[name].value = value;
  } else {
    this.variableValue[name] = {}
    this.variableValue[name].value = value;
  }
}

datasourceOp.prototype.setValues = function (arrayValue) {
  for (let i = 0; i < arrayValue.length; i++) {
    const name = arrayValue[i].name;
    const value = arrayValue[i].value;
    if (name && this.variableValue.hasOwnProperty(name)) {
      this.variableValue[name].value = value;
    } else {
      this.variableValue[name] = {}
      this.variableValue[name].value = value;
    }
  }
}

// 驗證字串中包含變數
datasourceOp.prototype.variableExists = function (str) {
  this.variableRegex.lastIndex = 0;
  if (this.variableRegex.exec(str) !== null) {
    return true;
  }
  return false;
}

// 替換外部字串中變量文字
datasourceOp.prototype.replaceWithText = function (str) {
  var array1, changeAry = [];
  // reset lastIndex = 0
  this.variableRegex.lastIndex = 0;
  while ((array1 = this.variableRegex.exec(str)) !== null) {
    // console.log(`Found ${array1[0]}. Next starts at ${this.variableRegex.lastIndex}.`);
    var matchStr = array1[0];
    var variableName = array1.slice(1).find(match => match !== undefined);
    changeAry.push({
      'name': variableName,
      'matchStr': matchStr,
      'index': array1.index,
      'lastIndex': this.variableRegex.lastIndex
    })
  }
  // replace str
  for (var j = (changeAry.length - 1); j > -1; j--) {
    str = str.substring(0, changeAry[j]['index']) + this.getValue(changeAry[j]['name'], changeAry[j]['matchStr']) + str.substr(changeAry[j]['lastIndex']);
  }
  return str;
}


// --------------------------------
var commonView = {}
commonView.createObjFromString = function (obj, objString, value) {
  var objStrArray = objString.split(".");
  var lastKeyIndex = objStrArray.length - 1;
  var key;
  var arrayKey;
  var arrayIndex;
  for (var i = 0; i < lastKeyIndex; ++i) {
    key = objStrArray[i];
    //check if the fisrt object is an array (end with "]")
    if (key.substr(key.length - 1) == "]") {
      arrayKey = key.substr(0, key.indexOf("["));
      arrayIndex = key.substr(key.indexOf("[") + 1, (key.indexOf("]") - (key.indexOf("[") + 1))) * 1;
      //check if it exists
      if (!(arrayKey in obj)) {
        obj[arrayKey] = [];
        obj[arrayKey][arrayIndex] = {};
      } else {
        //if existed, then check if the array has the index or not
        if (obj[arrayKey][arrayIndex] == undefined) {
          obj[arrayKey][arrayIndex] = {};
        }
      }
      obj = obj[arrayKey][arrayIndex];
    } else {
      if (!(key in obj))
        obj[key] = {};
      obj = obj[key];
    }
  }
  if (obj[objStrArray[lastKeyIndex]] == undefined) {
    if (value != undefined) {
      obj[objStrArray[lastKeyIndex]] = value;
    } else {
      obj[objStrArray[lastKeyIndex]] = {};
    }
  }
  return obj;
};


commonView.getParamFromURL = function (param) {
  var url = window.location.toString();
  var str = "";
  var str_value = "";
  if (url.indexOf("?") != -1) {
    var ary = url.split("?")[1].split("&");
    for (var i = 0; i < ary.length; i++) {
      str = ary[i].split("=")[0];
      if (str == param) {
        str_value = decodeURI(ary[i].split("=")[1]);
        break;
      }
    }
  }
  return str_value;
};


commonView.insertParamToURL = function (key,value) {
    key = encodeURI(key); value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');
        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if(i<0) {kvp[kvp.length] = [key,value].join('=');}
    window.history.replaceState(null,null, window.location.pathname + '?' + kvp.join('&'))
}

commonView.updateQueryStringParam = function (urlPath, key, value) {
  var baseUrl = '', urlQueryString = '';
  if(urlPath.indexOf('?') < 0){
      baseUrl = urlPath;
  } else {
      baseUrl = urlPath.substring(0, urlPath.indexOf('?'));
      urlQueryString = urlPath.substring(urlPath.indexOf('?'));
  }
  var newParam = key + '=' + value,
      params = '?' + newParam;
  // If the "search" string exists, then build params from it
  if (urlQueryString) {
      var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
      var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');
      if( typeof value == 'undefined' || value == null || value == '' ) { // Remove param if value is empty
          params = urlQueryString.replace(removeRegex, "$1");
          params = params.replace( /[&;]$/, "" );
      } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
          params = urlQueryString.replace(updateRegex, "$1" + newParam);
      } else { // Otherwise, add it to end of query string
          params = urlQueryString + '&' + newParam;
      }
  }
  return baseUrl + params;
}

commonView.loadJsFilesToPage = function (filePaths) {
  for (var i = 0; i < filePaths.length; i++) {
    commonView.loadFileToPage(filePaths[i].trim());
  }
};

commonView.isFileLoaded = function (filePath) {
  if (!commonView.fileLoadedList) {
    commonView.fileLoadedList = [];
  }
  if (commonView.fileLoadedList.indexOf(filePath) > -1) {
    return true;
  } else {
    return false;
  }
}

commonView.globalEval = eval;

commonView.stringToFunction = function (theInstructions) {
  var F = new Function (theInstructions);
  return(F());
}
commonView.functionGenerator = function (func) {
  return new Function("return " + func)();
}

commonView.loadFileToPage = function(filePath, notCache) {

  var urlPath = filePath.trim();

  var dateNum = new Date().getTime();
  dateNum = Math.floor(dateNum / 86400000);

  if (urlPath.endsWith(".css")) {
    if (commonView.isFileLoaded(filePath))
      return;

    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = urlPath + "?" + dateNum.toString();
    head.appendChild(link);
    commonView.fileLoadedList.push(urlPath);
    head = null;
    link = null;
  } else if (urlPath.endsWith(".js")) {
    if (commonView.isFileLoaded(filePath))
      return;

    var request = new XMLHttpRequest();
    request.open('GET', urlPath + "?" + dateNum.toString(), false);
    request.withCredentials = true;
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var source = request.responseText;
        commonView.globalEval(source);
        commonView.fileLoadedList.push(urlPath);
        request = null;
      }
    }
    request.onerror = function () {
      console.log("** An error occurred during the transaction");
    };
    request.send();
    return true;
  } else if (urlPath.endsWith(".htm") || urlPath.endsWith(".html")) {
    var request = new XMLHttpRequest();
    request.open('GET', urlPath + "?" + dateNum.toString(), false);
    request.withCredentials = true;
    request.send();
    return request.responseText;
  } else if (urlPath.endsWith(".json")) {
    var request = new XMLHttpRequest();
    request.open('GET', urlPath + "?" + dateNum.toString(), false);
    request.withCredentials = true;
    request.send();
    return request.responseText;
  }
};