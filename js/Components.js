// ===== Registering new components =====
AFRAME.registerComponent('rotation-reader', {
    tick: function () {
        var rotCamera=this.el.object3D.rotation;
        objectEntity.object3D.rotation.set(
              -rotCamera['x'],
              -rotCamera['y'],
              -rotCamera['z']
              );
        let x = document.getElementById('x');
        x.innerHTML = rotCamera['x'];
        let y = document.getElementById('y');
        y.innerHTML = rotCamera['y'];
        let z = document.getElementById('z');
        z.innerHTML = rotCamera['z'];

    }
});
