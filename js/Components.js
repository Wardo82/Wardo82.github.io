// ===== Registering new components =====
AFRAME.registerComponent('rotation-reader', {
    tick: function () {
        var rotCamera=this.el.object3D.rotation;
        objectEntity.object3D.rotation.set(
              -rotCamera['x'],
              -rotCamera['y'],
              -rotCamera['z']
              );
        let x = getElementById('x');
        x.innerHTML = rotCamera['x'];
        let y = getElementById('y');
        y.innerHTML = rotCamera['y'];
        let z = getElementById('z');
        z.innerHTML = rotCamera['z'];

    }
});
