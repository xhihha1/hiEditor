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
