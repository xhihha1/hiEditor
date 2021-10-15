(function (global) {
  const animationsList = {}
  hi3D.prototype.setGltfAnimations = function (objName, clipName) {
    const node = this.scene.getObjectByName(objName)
    if (node && node.animations) {
      if (!animationsList[objName]) {
        animationsList[objName] = {
          added: false,
          mixers: []
        }
      }
      if (animationsList[objName].added) { return true; }
      const mixer = new THREE.AnimationMixer(node);
      let clip
      if (clipName) {
        for (let i = 0; i !== node.animations.length; ++i) {
          clip = node.animations[i];
          const name = clip.name;
          if (clipName == name) {
            mixer.clipAction(clip);
            break;
          }
        }
      } else {
        clip = node.animations[0]
        mixer.clipAction(clip);
      }

      mixer.clipAction(clip).setDuration(1).play(); // .setDuration(1)
      animationsList[objName].mixers.push(mixer);
      animationsList[objName].added = true
      animationsList[objName].clock = new THREE.Clock();
    }
  }
  hi3D.prototype.renderGltfAnimations = function (objName) {
    // const delta = this.clock.getDelta();
    if (animationsList[objName] &&　animationsList[objName].mixers){
      const delta = animationsList[objName].clock.getDelta();
      for (let i = 0; i < animationsList[objName].mixers.length; i++) {
        animationsList[objName].mixers[i].update(delta);
      }
    }
  }
})()


/* 

1. 添加物件給物件名稱 bird
2. 在 animate 添加 function(){dataStructure.viewer[0].hi3d.renderGltfAnimations('bird');}
3. 在物件的資料綁訂，任意添加name: AAA, function(){dataStructure.viewer[0].hi3d.setGltfAnimations('bird');}
*/