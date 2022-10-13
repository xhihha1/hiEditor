
// // ------------ variable ------------
// // varMapTable = [{"name", "type", "valueList", "value"}]
// // graphVarTable = [{"dataId","type":(s,a,p),"typeName":[],"originalString"}]
// dataRefreshUtil.variableSrv = {}
// dataRefreshUtil.variableSrv.variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?::(\w+))?}/g;
// // HT JSON dataModel 變量對應表
// dataRefreshUtil.variableSrv.setGraphVarTable = function(){
//     var graphVarTable = [];
//     if (dataModel) {
//         dataModel.each(function(data) {
//             //----  variableSrv ----
//             var propertiesMap = data.getSerializableProperties(),
//             stylesMap = data.getSerializableStyles(),
//             attrsMap = data.getSerializableAttrs();
//             // console.log('-----ID-----',data.getId(), propertiesMap, stylesMap, attrsMap);
//             var dataId = data.getId();
//             for(var p in propertiesMap){
//                 // console.log('p',p)
//                 if(typeof(data[ht.Default.getter(p)]) == 'function'){
//                     var pValue = data[ht.Default.getter(p)]();
//                     // console.log('--p--',ht.Default.getter(p),data[ht.Default.getter(p)]())
//                     // data[ht.Default.setter(p)](value)
//                     if(typeof(pValue) == 'string' && dataRefreshUtil.variableSrv.variableExists(pValue)){
//                         graphVarTable.push({"dataId":dataId, "type":"p", "typeName":[p],"originalString":pValue});
//                     }
//                 }
//             }
//             for(var s in stylesMap){
//                 // console.log('s',s)
//                 // console.log('--s--',data.s(s))
//                 var sValue = data.s(s);
//                 //dataModel.getDataById(6).s("text", value)
//                 if(typeof(sValue) == 'string' && dataRefreshUtil.variableSrv.variableExists(sValue)){
//                     graphVarTable.push({"dataId":dataId, "type":"s", "typeName":[s],"originalString":sValue});
//                 }
//             }
//             for(var a in attrsMap){
//                 // console.log('a',a)
//                 // console.log('--a--',data.a(a))
//                 var aValue = data.a(a);
//                 //dataModel.getDataById(6).a("text", value)
//                 if(typeof(aValue) == 'string' && dataRefreshUtil.variableSrv.variableExists(aValue)){
//                     graphVarTable.push({"dataId":dataId, "type":"a", "typeName":[a],"originalString":aValue});
//                 }
//             }
//         });
//     }
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             dataRefreshUtil.filesMap[i]['graphVarTable'] = graphVarTable;
//             return true;
//         }
//     }
//     return false;
// }
// // HT JSON dataModel 變量對應表
// dataRefreshUtil.variableSrv.getGraphVarTable = function(){
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             return dataRefreshUtil.filesMap[i]['graphVarTable'];
//         }
//     }
//     return false;
// }
// // 設定當前變量表
// dataRefreshUtil.variableSrv.setCurVarMapTable = function(jsonVarTable) {
//     if(!jsonVarTable){
//         jsonVarTable = [
//             // {'name':'var1','type':'string','valueList':'1,2,3,4','value':'1'},
//             // {'name':'var2','type':'string','valueList':'a,b,c,d','value':'a'},
//             // {'name':'var3','type':'string','valueList':'#F00,#0F0,#00F,#FF0','value':'#F00'},
//             // {'name':'var4','type':'string','valueList':'a,b,c,d','value':'a'}
//         ];
//     }
//     //get default variable value form query string.
//     for (var i = 0; i < jsonVarTable.length; i++) {
//         if (commonUtil.getParamFromURL('var-' + jsonVarTable[i]['name'])) {
//             jsonVarTable[i]['value'] = commonUtil.getParamFromURL('var-' + jsonVarTable[i]['name'])
//         }
//     }
    
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             dataRefreshUtil.filesMap[i]['varMapTable'] = jsonVarTable;
//             return true;
//         }
//     }
//     return false;
// }
// // 取得當前所有變量
// dataRefreshUtil.variableSrv.getCurVarMapTable = function() {
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             return dataRefreshUtil.filesMap[i]['varMapTable'];
//         }
//     }
//     return false;
// }
// // 設定特定變量
// dataRefreshUtil.variableSrv.setVariable = function(name, value, callback) {
//     var nameExist = false;
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             for (var j = 0; j < dataRefreshUtil.filesMap[i]['varMapTable'].length; j++) {
//                 if (name === dataRefreshUtil.filesMap[i]['varMapTable'][j]['name']) {
//                     nameExist = true;
//                     dataRefreshUtil.filesMap[i]['varMapTable'][j]['value'] = value;
//                     // 更新靜態屬性 templating
//                     dataRefreshUtil.refreshStaticProp();
                    
//                     dataRefreshUtil.resetCurReqCollect();
//                     //refresh data
//                     var collectSource = dataRefreshUtil.getCurCollectSource();
//                     dataRefreshUtil.getDataSource(collectSource);
//                     dataRefreshUtil.refreshData(collectSource);
//                     if(callback){
//                         callback();
//                     }
//                     return true;
//                 }
//             }
//             if(!nameExist){
//                 dataRefreshUtil.filesMap[i]['varMapTable'].push({'name':name,'type':'string','valueList':'','value':value})
//                 if(callback){
//                     callback();
//                 }
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// // varArray = [{name, value}]
// dataRefreshUtil.variableSrv.setVariables = function(varArray, callback) {
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             for (var v = 0; v < varArray.length; v++) {
//                 var nameExist = false;
//                 for (var j = 0; j < dataRefreshUtil.filesMap[i]['varMapTable'].length; j++) {
//                     if (varArray[v]['name'] === dataRefreshUtil.filesMap[i]['varMapTable'][j]['name']) {
//                         nameExist = true;
//                         dataRefreshUtil.filesMap[i]['varMapTable'][j]['value'] = varArray[v]['value'];
//                         break;
//                     }
//                 }
//                 if(!nameExist){
//                     dataRefreshUtil.filesMap[i]['varMapTable'].push({'name':varArray[v]['name'],'type':'string','valueList':'','value':varArray[v]['value']})
//                 }
//             }
//             // 更新靜態屬性 templating
//             dataRefreshUtil.refreshStaticProp();
//             dataRefreshUtil.resetCurReqCollect();
//             //refresh data
//             var collectSource = dataRefreshUtil.getCurCollectSource();
//             dataRefreshUtil.getDataSource(collectSource);
//             dataRefreshUtil.refreshData(collectSource);
//             if(callback){
//                 callback();
//             }
//             return true;
//         }
//     }
//     return false;
// }
// // 取得特定變量
// dataRefreshUtil.variableSrv.getVariable = function(name) {
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             // dataRefreshUtil.filesMap[i]['varMapTable'];
//             for (var j = 0; j < dataRefreshUtil.filesMap[i]['varMapTable'].length; j++) {
//                 if (name === dataRefreshUtil.filesMap[i]['varMapTable'][j]['name']) {
//                     return dataRefreshUtil.filesMap[i]['varMapTable'][j];
//                 }
//             }
//         }
//     }
//     return false;
// }
// // 取得變量值，如果變量不存在則返回原始字串
// // originalStr: $var1, name: var1
// dataRefreshUtil.variableSrv.getVariableValue = function(name, originalStr) {
//     var valueObj = dataRefreshUtil.variableSrv.getVariable(name)
//     if(valueObj && typeof(valueObj['value']) != 'undefined' ){
//         return valueObj['value'];
//     } else {
//         return originalStr? originalStr: name;
//     }
// }
// // 驗證字串中包含變數
// dataRefreshUtil.variableSrv.variableExists = function(str) {
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
//             dataRefreshUtil.variableSrv.variableRegex.lastIndex = 0;
//             if(dataRefreshUtil.variableSrv.variableRegex.exec(str) !== null){
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// // 替換外部字串中變量文字
// dataRefreshUtil.variableSrv.replaceWithText = function(str) {
//     for (var i = 0; i < dataRefreshUtil.filesMap.length; i++) {
//         if (dataRefreshUtil.filesMap[i]['filename'] == dataRefreshUtil.currentFile) {
            
//             var array1, changeAry = [];
//             // reset lastIndex = 0
//             dataRefreshUtil.variableSrv.variableRegex.lastIndex = 0;
//             while ((array1 = dataRefreshUtil.variableSrv.variableRegex.exec(str)) !== null) {
//                 // console.log(`Found ${array1[0]}. Next starts at ${dataRefreshUtil.variableSrv.variableRegex.lastIndex}.`);
//                 var matchStr = array1[0];
//                 var variableName = array1.slice(1).find(match => match !== undefined);
//                 changeAry.push({'name':variableName, 'matchStr':matchStr, 'index':array1.index, 'lastIndex':dataRefreshUtil.variableSrv.variableRegex.lastIndex})
//             }
//             // replace str
//             for (var j = (changeAry.length - 1); j > -1; j--) {
//                 str = str.substring(0,changeAry[j]['index']) + dataRefreshUtil.variableSrv.getVariableValue(changeAry[j]['name'], changeAry[j]['matchStr']) + str.substr(changeAry[j]['lastIndex']);
//             }
//             return str;
//         }
//     }
// }