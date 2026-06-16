
(function () {
  "use strict";

  const stage = document.getElementById("three-hero-stage");
  if (!stage || !window.THREE) {
    console.error("[Clean Hero] stage or THREE not found.");
    return;
  }

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  renderer.setClearColor(0xF5F8FC, 1);

  if (THREE.sRGBEncoding && renderer.outputEncoding !== undefined) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }

  stage.innerHTML = "";
  stage.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    38,
    stage.clientWidth / stage.clientHeight,
    0.1,
    1000
  );

  /*
    关键参数：
    - GLOBE_RADIUS 控制地球大小
    - GLOBE_Y 越负越往下沉
    - LOOK_AT_Y 固定稍微向下看，保证只露上半弧线
  */
  const GLOBE_RADIUS = 17.6;
  const GLOBE_Y = -23.2;
  const CAMERA_Z = 27.2;
  const LOOK_AT_Y = -9.8;

  const ROT_X = 0.08;
  const ROT_Y = -2.10;
  const ROT_SPEED = 0.00025;

  camera.position.set(0, 0.0, CAMERA_Z);
  camera.lookAt(0, LOOK_AT_Y, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 1.12);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.52);
  keyLight.position.set(6, 5, 8);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xddefff, 0.38);
  fillLight.position.set(-8, 2, 8);
  scene.add(fillLight);

  const textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    "webpage/assets/texture1_clean_2048.jpg?v=" + Date.now(),
    function (texture) {
      if (THREE.sRGBEncoding && texture.encoding !== undefined) {
        texture.encoding = THREE.sRGBEncoding;
      }

      texture.anisotropy = renderer.capabilities.getMaxAnisotropy
        ? Math.min(8, renderer.capabilities.getMaxAnisotropy())
        : 1;

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 192, 192);

      const globeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 2,
        specular: new THREE.Color(0x18324a)
      });

      const globe = new THREE.Mesh(globeGeometry, globeMaterial);
      globe.position.set(0, GLOBE_Y, 0);
      globe.rotation.set(ROT_X, ROT_Y, 0);
      scene.add(globe);

      const rimGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.012, 128, 128);
      const rimMaterial = new THREE.MeshBasicMaterial({
        color: 0xd7ecff,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
        depthWrite: false
      });

      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.position.copy(globe.position);
      rim.rotation.copy(globe.rotation);
      scene.add(rim);

      function animate() {
        requestAnimationFrame(animate);

        globe.rotation.y += ROT_SPEED;
        rim.rotation.y += ROT_SPEED;

        renderer.render(scene, camera);
      }

      animate();
    },
    undefined,
    function (err) {
      console.error("[Clean Hero] texture load failed:", err);
    }
  );

  function resize() {
    const w = stage.clientWidth || window.innerWidth;
    const h = stage.clientHeight || window.innerHeight;

    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", resize);
  resize();

  console.log("[Clean Hero] fixed skyblue + lowered globe loaded");
})();
