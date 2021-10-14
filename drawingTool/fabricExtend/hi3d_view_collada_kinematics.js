(function (global) {
  const tweenParameters = {};

  hi3D.prototype.colladaKinematicsSetupTween = function (objName) {
    const node = this.scene.getObjectByName(objName)
    if (node && node.kinematics && TWEEN) {
      if (!tweenParameters[objName]) { tweenParameters[objName] = { tween: {} } }
      const duration = 1000
      // const duration = THREE.MathUtils.randInt( 1000, 5000 );
      const kinematics = node.kinematics;
      const target = {};

      for ( const prop in kinematics.joints ) {
        if ( kinematics.joints.hasOwnProperty( prop ) ) {
          if ( ! kinematics.joints[ prop ].static ) {
            const joint = kinematics.joints[ prop ];
            const old = tweenParameters[objName].tween[ prop ];
            const position = old ? old : joint.zeroPosition;
            tweenParameters[objName].tween[ prop ] = position;
            target[ prop ] = THREE.MathUtils.randInt( joint.limits.min, joint.limits.max );
          }
        }
      }

      tweenParameters[objName].kinematicsTween = new TWEEN.Tween( tweenParameters[objName].tween ).to( target, duration ).easing( TWEEN.Easing.Quadratic.Out );
      tweenParameters[objName].kinematicsTween.onUpdate( function ( object ) {
        for ( const prop in kinematics.joints ) {
          if ( kinematics.joints.hasOwnProperty( prop ) ) {
            if ( ! kinematics.joints[ prop ].static ) {
              kinematics.setJointValue( prop, object[ prop ] );
            }
          }
        }
      } );
      tweenParameters[objName].kinematicsTween.start();
      // setTimeout( function() { this.colladaKinematicsSetupTween(objName) }.bind(this), duration );
    }
  }

  hi3D.prototype.colladaKinematicsRenderTween = function () {
    TWEEN.update();
  }

})()

/* 
1. 添加物件給物件名稱 test
2. 在 animate 添加 update tween
function(){dataStructure.viewer[0].hi3d.colladaKinematicsRenderTween();}
3. 在物件的資料綁訂，任意添加name: AAA, function(){ dataStructure.viewer[0].hi3d.colladaKinematicsSetupTween('test');}

*/
