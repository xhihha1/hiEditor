(function (global) {
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;
  let canJump = false;

  let prevTime = performance.now();
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const _vector = new THREE.Vector3();

  hi3D.prototype.keyboradControlInit = function () {
    const onKeyDown = function (event) {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward = true;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          moveLeft = true;
          break;

        case 'ArrowDown':
        case 'KeyS':
          moveBackward = true;
          break;

        case 'ArrowRight':
        case 'KeyD':
          moveRight = true;
          break;

        case 'Space':
          if (canJump === true) velocity.y += 350;
          canJump = false;
          break;

      }

    };

    const onKeyUp = function (event) {

      switch (event.code) {

        case 'ArrowUp':
        case 'KeyW':
          moveForward = false;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          moveLeft = false;
          break;

        case 'ArrowDown':
        case 'KeyS':
          moveBackward = false;
          break;

        case 'ArrowRight':
        case 'KeyD':
          moveRight = false;
          break;

      }

    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }

  hi3D.prototype.keyboradControlRender = function () {
    // 參考 PointerLockControls
    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    _vector.setFromMatrixColumn( this.camera.matrix, 0 );
    _vector.crossVectors( this.camera.up, _vector );
    this.camera.position.addScaledVector( _vector, -velocity.z * delta );
    _vector.setFromMatrixColumn( this.camera.matrix, 0 );
    this.camera.position.addScaledVector( _vector, -velocity.x * delta );
    // this.camera.position.y += (velocity.y * delta); // new behavior
    // if (this.camera.position.y < 10) {
    //   velocity.y = 0;
    //   this.camera.position.y = 10;
    //   canJump = true;
    // }
    prevTime = time;
  }

})()

