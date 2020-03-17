var zoom = 8;
window.addEventListener("DOMContentLoaded", function(){
  var canvas = document.getElementById('canvas');
  canvas.style.width = "600px";
  canvas.style.height =   "320px";
  var engine = new BABYLON.Engine(canvas, true);

  var createScene = function (){
    var scene = new BABYLON.Scene(engine);
    var material = new BABYLON.StandardMaterial('material', scene);
    var material2 = new BABYLON.StandardMaterial('material2', scene);
    material.diffuseColor = new BABYLON.Color3(0.38, 0.58, 0.99);
    material.emissiveColor = new BABYLON.Color3(0.38, 0.58, 0.99);
    material2.diffuseColor = new BABYLON.Color3(1, 1, 1);
    material2.emissiveColor = new BABYLON.Color3(1,1,1);
    var material1 = new BABYLON.StandardMaterial('material1', scene);
    material1.diffuseColor = new BABYLON.Color3(0.38, 0.58, 0.99);
    material1.emissiveColor = new BABYLON.Color3(0.18, 0.48, 0.89);
    engine.enableOfflineSupport = false;
    scene.clearColor = new BABYLON.Color3(0.023, 0.101, 0.376);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0,zoom - zoom/2, -1 * zoom), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    var box = BABYLON.Mesh.CreateBox("Box", 3.0, scene);
    for (var x = 0; x < 100; x ++){
      var particle = BABYLON.Mesh.CreateBox("particle", 0.05, scene);
      particle.position = new BABYLON.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 -5);
      if (particle.position.x > -2 && particle.position.x < 2){
        particle.position.x =- 10;
      }
      if (particle.position.y > -2 && particle.position.y < 2){
        particle.position.y =- 10;
      }
      if (particle.position.z > -2 && particle.position.z < 2){
        particle.position.z =- 10;
      }
      particle.material = material2;
    }
    BABYLON.SceneLoader.ImportMesh("", "", "oleks.babylon", scene, function(newMeshes){
      newMeshes.forEach(function(mesh){

        mesh.scaling.y = 5.5 * 3/4;
        mesh.scaling.x = 5.5 * 3/4;
        mesh.scaling.z = 4.5 * 3/4;
        mesh.position.y  =  1;
        box.position.y = mesh.position.y - 1;
        mesh.position.x  =  -4;
        mesh.material = material1;

      })
    });
    box.scaling.y = 0.2;
    box.scaling.x = 3;

    //var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), BABYLON.Tools.ToRadians(45), 0.1, scene);
    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
    light.parent = camera;
    light.diffuse = new BABYLON.Color3(1,1,1);

    box.material = material;
    return scene;
  }
  var scene = createScene();
  var goingleft = true;
  var goingright = false;
  var goingup = false;
  var goingdown = false;
  var alphadown = true;
  var alphaup = false;
  engine.runRenderLoop(function(){
    var material = scene.getMeshByName("Box").material;
    var material1 = scene.getMaterialByName("material1");
    var material2 = scene.getMaterialByName("material2");
    if (alphadown){
      material.alpha -= 0.005;
      material2.alpha -= 0.01;

    }
    if (alphaup){
      material.alpha += 0.005;
      material2.alpha += 0.01;

    }
    if (material.alpha < 0.4965){
      alphaup = true;
      alphadown = false;
      console.log("ok");
    }
    if (material.alpha == 1){
      alphaup = false;
      alphadown = true;
    }
    scene.render();
    camera = scene.getCameraByName("camera1")
    if (goingleft){
      camera.position.x += zoom/100;
      if (camera.position.x > zoom){
        goingleft = false;
        goingup = true;
      }

    }
    if (goingright){
      camera.position.x -= zoom/100;
      if (camera.position.x < -1 * zoom){
        goingright = false;
        goingdown = true;
      }
    }
    if (goingup){
      camera.position.z += zoom/100;
      if (camera.position.z > zoom){
        goingup = false;
        goingright = true;
      }
    }
    if (goingdown){
      if (camera.position.z < -1 * zoom){
        goingdown = false;
        goingleft = true;
      }
      camera.position.z -= zoom/100;
    }
    camera.setTarget(BABYLON.Vector3.Zero());

  });
})
