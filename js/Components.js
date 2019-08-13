// ===== Registering new components =====
AFRAME.registerComponent('rotation-reader', {
    tick: function () {
      // Rotate the arrow accordingly
      var rotCamera = this.el.object3D.rotation;
      var rotArrow = objectEntity.object3D.rotation;
      if (objectEntity.object3D.visible) { // If object is visible
        if (qrOrientation.alpha > 135 && qrOrientation.alpha < 225 ||
              qrOrientation.alpha < 45 && qrOrientation.alpha > 315)
        {
          objectEntity.object3D.rotation.set(
             0,
             - rotCamera['x'],
             rotArrow['z']);
        }else{
          objectEntity.object3D.rotation.set(
             - rotCamera['x'],
             0,
             rotArrow['z']);
        }
      }
    }
});
