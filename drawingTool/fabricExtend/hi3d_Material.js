hi3D.prototype.getMaterial = function (objOption) {
  console.log('getMaterial ---', objOption)
  const parameters = {}
  if (objOption) {
    if (objOption.map) {
      parameters.map = objOption.map
    }
    if (objOption.color) {
      parameters.color = objOption.color
    }
    if (objOption.transparent) {
      parameters.transparent = objOption.transparent
    }
    if (typeof objOption.opacity != 'undefined') {
      parameters.opacity = objOption.opacity
    } else {
      parameters.opacity = 1
    }
    if (objOption.materialType) {
      switch (objOption.materialType) {
        case 'MeshBasicMaterial':
          return new THREE.MeshBasicMaterial(parameters);
        case 'MeshStandardMaterial':
          return new THREE.MeshStandardMaterial(parameters);
        case 'MeshDepthMaterial':
          return new THREE.MeshDepthMaterial(parameters);
        case 'MeshNormalMaterial':
          return new THREE.MeshNormalMaterial(parameters);
        case 'MeshLambertMaterial':
          return new THREE.MeshLambertMaterial(parameters);
        case 'MeshPhongMaterial':
          return new THREE.MeshPhongMaterial(parameters);
        case 'MeshPhysicalMaterial':
          return new THREE.MeshPhysicalMaterial(parameters);
        default:
          return new THREE.MeshStandardMaterial(parameters);
      }
    }
  }
  console.log('out ---', parameters)
  return new THREE.MeshStandardMaterial(parameters);
}

hi3D.prototype.getMaterialSide = function (sideType) {
  switch (sideType) {
    case 'FrontSide':
      return THREE.FrontSide;
    case 'BackSide':
      return THREE.BackSide;
    case 'DoubleSide':
      return THREE.DoubleSide;
    default:
      return THREE.FrontSide;
  }
}