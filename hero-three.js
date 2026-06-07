
console.log("Three.js hero v14 loaded.");

(function () {
  const container = document.getElementById("three-hero-stage");

  if (!container) {
    console.warn("three-hero-stage not found.");
    return;
  }

  if (typeof THREE === "undefined") {
    console.warn("THREE is not loaded. Showing fallback earth.");
    showFallbackEarth();
    initButtons();
    return;
  }

  /*
    你可以自己替换地球纹理：

    推荐放到：
    assets/earth_day.jpg
    assets/earth_clouds.png

    如果本地没有，代码会自动使用 Three.js 官方示例纹理。
  */

  const LOCAL_EARTH_TEXTURE = "assets/earth_day.jpg";
  const LOCAL_CLOUD_TEXTURE = "assets/earth_clouds.png";

  const REMOTE_EARTH_TEXTURE =
    "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_atmos_2048.jpg";

  const REMOTE_CLOUD_TEXTURE =
    "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_clouds_1024.png";

  let scene, camera, renderer;
  let earthGroup, earthMesh, cloudsMesh;
  let stars;
  let mouseX = 0;
  let mouseY = 0;

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 7.2);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    /*
      高级感关键：
      ACESFilmicToneMapping 会压高光，让画面不刺眼。
      Exposure 越低，画面越暗。
      如果还亮，可以改成 0.58。
    */
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.64;

    container.appendChild(renderer.domElement);

    /*
      光照整体压暗：
      去掉之前那种过强的白光和蓝色边缘光。
    */
    const ambient = new THREE.AmbientLight(0xffffff, 0.34);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.78);
    keyLight.position.set(-3.8, 2.2, 4.5);
    scene.add(keyLight);

    const warmLight = new THREE.DirectionalLight(0xffb07a, 0.12);
    warmLight.position.set(3, -1, 2);
    scene.add(warmLight);

    const rimLight = new THREE.DirectionalLight(0x86c9ff, 0.42);
    rimLight.position.set(4.2, 1.6, -3.2);
    scene.add(rimLight);

    stars = createStars();
    scene.add(stars);

    earthGroup = new THREE.Group();

    /*
      地球大小和位置：
      scale 控制大小
      y 控制上下位置

      想再小一点：scale 3.05
      想再往下：y -3.20
      想露多一点：y -2.85
    */
    earthGroup.scale.setScalar(3.18);
    earthGroup.position.set(0, -3.02, 0);

    scene.add(earthGroup);

    createEarth();
    createCloudLayer();
    addCityPoints();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    initButtons();
    onResize();

    console.log("Three.js hero earth v14 initialized.");
  }

  function createEarth() {
    const geometry = new THREE.SphereGeometry(1.2, 128, 128);

    const fallbackTexture = createFallbackEarthTexture();

    /*
      color 不是纯白，而是灰蓝色。
      它会让真实地球纹理轻微降饱和、降亮度。
    */
    const material = new THREE.MeshStandardMaterial({
      map: fallbackTexture,
      roughness: 1.0,
      metalness: 0.0,
      color: 0xc8cfd6
    });

    earthMesh = new THREE.Mesh(geometry, material);

    earthMesh.rotation.y = -0.88;
    earthMesh.rotation.x = 0.10;

    earthGroup.add(earthMesh);

    loadTextureWithFallback(
      LOCAL_EARTH_TEXTURE,
      REMOTE_EARTH_TEXTURE,
      (texture) => {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.needsUpdate = true;

        earthMesh.material.map = texture;
        earthMesh.material.needsUpdate = true;

        console.log("Earth texture loaded.");
      }
    );
  }

  function createCloudLayer() {
    const geometry = new THREE.SphereGeometry(1.214, 128, 128);

    /*
      关键：
      1. opacity 降低
      2. NormalBlending 取代 AdditiveBlending
      这样不会发白，不会出现蓝白壳。
    */
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.NormalBlending,
      color: 0xd8dde2
    });

    cloudsMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(cloudsMesh);

    loadTextureWithFallback(
      LOCAL_CLOUD_TEXTURE,
      REMOTE_CLOUD_TEXTURE,
      (texture) => {
        cloudsMesh.material.map = texture;
        cloudsMesh.material.needsUpdate = true;
        console.log("Cloud texture loaded.");
      },
      () => {
        earthGroup.remove(cloudsMesh);
        cloudsMesh = null;
      }
    );
  }

  /*
    注意：
    v14 删除了 createAtmosphere()。
    之前那层浅蓝色外壳主要来自 atmosphereMesh。
    现在不再创建它，所以地球边缘会更干净。
  */

  function loadTextureWithFallback(localUrl, remoteUrl, onLoad, onFail) {
    const loader = new THREE.TextureLoader();

    loader.load(
      localUrl,
      (texture) => {
        onLoad(texture);
      },
      undefined,
      () => {
        console.warn("Local texture not found, trying remote:", localUrl);

        loader.load(
          remoteUrl,
          (texture) => {
            onLoad(texture);
          },
          undefined,
          () => {
            console.warn("Remote texture also failed:", remoteUrl);
            if (onFail) onFail();
          }
        );
      }
    );
  }

  function addCityPoints() {
    const cityData = window.CITY_DATA;
    if (!cityData || !cityData.features || !earthMesh) return;

    const pointGeometry = new THREE.SphereGeometry(0.010, 12, 12);

    cityData.features.forEach((feature) => {
      const coords = feature.geometry && feature.geometry.coordinates;
      if (!coords) return;

      const lon = coords[0];
      const lat = coords[1];
      const p = feature.properties || {};
      const emotion = String(p.dominant_emotion || "").trim();

      const material = new THREE.MeshBasicMaterial({
        color: getEmotionColor(emotion),
        transparent: true,
        opacity: 0.86
      });

      const point = new THREE.Mesh(pointGeometry, material);
      point.position.copy(lonLatToVector3(lon, lat, 1.238));
      earthMesh.add(point);
    });
  }

  function getEmotionColor(emotion) {
    const colors = {
      Joy: 0xd99a61,
      Surprise: 0xd99a61,
      Neutral: 0x8399aa,
      Sadness: 0xc7779e,
      Fear: 0x70aeba,
      Disgust: 0x9e8bb8,
      Anger: 0xc96d5c
    };

    return colors[emotion] || 0xc7779e;
  }

  function lonLatToVector3(lon, lat, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  }

  function createStars() {
    const geometry = new THREE.BufferGeometry();
    const count = 760;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 12 + 3;
      positions[i3 + 2] = -8 - Math.random() * 16;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xdce8f1,
      size: 0.022,
      transparent: true,
      opacity: 0.42,
      depthWrite: false
    });

    return new THREE.Points(geometry, material);
  }

  function createFallbackEarthTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    /*
      fallback 纹理也改成深色、低饱和。
      如果真实纹理加载失败，也不会变成白色 dome。
    */
    const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    ocean.addColorStop(0, "#0a223b");
    ocean.addColorStop(0.46, "#1c486b");
    ocean.addColorStop(1, "#071421");

    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBlob(ctx, 650, 360, 290, 210, "#9d8b61", 0.62);
    drawBlob(ctx, 820, 450, 220, 310, "#946c5c", 0.50);
    drawBlob(ctx, 1200, 360, 300, 210, "#9d8b61", 0.50);
    drawBlob(ctx, 1340, 540, 240, 160, "#946c5c", 0.42);
    drawBlob(ctx, 410, 390, 260, 170, "#526f63", 0.38);
    drawBlob(ctx, 300, 520, 160, 220, "#5d725f", 0.34);

    // 克制的热感 overlay
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * canvas.width;
      const y = 250 + Math.random() * 430;
      const r = 70 + Math.random() * 150;

      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(201, 109, 92, 0.26)");
      g.addColorStop(0.42, "rgba(199, 119, 158, 0.10)");
      g.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 很淡的流线
    ctx.strokeStyle = "rgba(220,232,241,0.10)";
    ctx.lineWidth = 0.9;

    for (let i = 0; i < 80; i++) {
      const y = Math.random() * canvas.height;
      const amp = 14 + Math.random() * 40;
      const phase = Math.random() * Math.PI * 2;

      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 22) {
        const yy = y + Math.sin(x * 0.011 + phase) * amp;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }

      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  }

  function drawBlob(ctx, x, y, rx, ry, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();

    const steps = 48;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const noise = 1 + Math.sin(t * 3.1) * 0.11 + Math.cos(t * 5.3) * 0.08;
      const px = x + Math.cos(t) * rx * noise;
      const py = y + Math.sin(t) * ry * noise;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    requestAnimationFrame(animate);

    if (earthGroup) {
      /*
        自动旋转。
        想转快一点：0.0017
        想转慢一点：0.0010
      */
      earthGroup.rotation.y += 0.00125;

      earthGroup.rotation.x += (mouseY * 0.045 - earthGroup.rotation.x) * 0.018;
      earthGroup.rotation.z += (mouseX * 0.025 - earthGroup.rotation.z) * 0.018;
    }

    if (cloudsMesh) {
      cloudsMesh.rotation.y += 0.00045;
    }

    if (stars) {
      stars.rotation.y += 0.00014;
    }

    renderer.render(scene, camera);
  }

  function onResize() {
    if (!camera || !renderer || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    if (!earthGroup) return;

    if (width < 760) {
      earthGroup.scale.setScalar(2.65);
      earthGroup.position.set(0, -2.52, 0);
    } else if (width < 1200) {
      earthGroup.scale.setScalar(2.95);
      earthGroup.position.set(0, -2.82, 0);
    } else {
      earthGroup.scale.setScalar(3.18);
      earthGroup.position.set(0, -3.02, 0);
    }
  }

  function onMouseMove(event) {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  }

  function showFallbackEarth() {
    const fallback = document.createElement("div");
    fallback.className = "fallback-earth";
    container.appendChild(fallback);
  }

  function initButtons() {
    const enterBtn = document.getElementById("hero-enter-btn");
    const aboutBtn = document.getElementById("hero-about-btn");
    const target = document.getElementById("variable-controls");

    if (enterBtn && target) {
      enterBtn.addEventListener("click", () => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }

    if (aboutBtn) {
      aboutBtn.addEventListener("click", () => {
        alert("About panel will be added in the next step.");
      });
    }
  }
})();
