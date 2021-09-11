
hiDraw.prototype.historyInit = function () {
    this.historyUndo = [];
    this.historyIndex = 0;
    this.historyMaxCount = 10;
    // this.historyNextState = this.historyNext();
}

hiDraw.prototype.historyNext = function () {
    var fabricJson = this.canvasView.toDatalessJSON(['label', 'uniqueIndex', 'className', 'tempDrawShape']);
    fabricJson.objects = fabricJson.objects.filter(function (obj) {
        if (!obj.tempDrawShape) {
          return true
        } else {
          return false
        }
    })
    return JSON.stringify(fabricJson)
}

hiDraw.prototype.historySaveAction = function () {
    if (this.historyProcessing)
        return;
    const json = this.historyNext();
    // const json = this.historyNextState;
    // console.log('Index', this.historyIndex, 'length', this.historyUndo.length)
    if (json === this.historyUndo[this.historyUndo.length - 1]){
        return ;
    }
    if (this.historyIndex + 1 === this.historyUndo.length) {
        if(this.historyIndex + 1 < this.historyMaxCount) {
            this.historyIndex++;
        } else {
            this.historyUndo.shift();
        }
        this.historyUndo.push(json);
    } else if (this.historyIndex + 1 < this.historyUndo.length) {
        this.historyUndo = this.historyUndo.slice(0, this.historyIndex + 1);
        this.historyUndo.push(json);
        this.historyIndex++;
    } else {
        if(this.historyUndo.length === 0) {
            this.historyUndo.push(json);
        }
    }
    // console.log('Index', this.historyIndex, 'length', this.historyUndo.length, json)
    // this.historyNextState = this.historyNext();
}

hiDraw.prototype.undo = function (callback) {
    var that = this;
    this.historyProcessing = true;
    // var a = this.historyIndex;
    var undoIndex = this.historyIndex - 1;
    // if (this.historyIndex === this.historyUndo.length) {
    //     undoIndex = this.historyIndex - 2;
    // } else {
    //     undoIndex = this.historyIndex - 1;
    // }
    if (this.historyUndo[undoIndex]) {
        this.canvasView.loadFromJSON(this.historyUndo[undoIndex], function(){
            that.historyProcessing = false;
            callback();
            // var b = that.historyIndex;
            // console.log('undo', a, 'currentIndex', b)
        }).renderAll();
        this.historyIndex = undoIndex
    } else {
        this.historyProcessing = false;
    }
}

hiDraw.prototype.redo = function (callback) {
    var that = this;
    this.historyProcessing = true;
    // var a = this.historyIndex;
    var undoIndex = this.historyIndex + 1;
    if (this.historyUndo[undoIndex]) {
        this.canvasView.loadFromJSON(this.historyUndo[undoIndex], function(){
            that.historyProcessing = false;
            callback();
            // var b = that.historyIndex;
            // console.log('redo', a, 'currentIndex', b)
        }).renderAll();
        this.historyIndex = undoIndex
    } else {
        this.historyProcessing = false;
    }
}