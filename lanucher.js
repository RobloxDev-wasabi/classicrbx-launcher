document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.position.z = 10;

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  // === Load Game from Studio ===
  const gameName = new URLSearchParams(window.location.search).get("game");
  fetch(`https://RobloxDev-wasabi.github.io/classicrbx-studio/games/${gameName}.json`)
    .then(res => res.json())
    .then(data => {
      loadGame(data);
      spawnBloxyNoob();
    });

  function loadGame(data) {
    const parts = data.Workspace?.Parts || [];
    parts.forEach(part => {
      const geometry = new THREE.BoxGeometry(part.size?.x || 1, part.size?.y || 1, part.size?.z || 1);
      const material = new THREE.MeshStandardMaterial({ color: part.color || 0x999999 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(part.position?.x || 0, part.position?.y || 0, part.position?.z || 0);
      scene.add(mesh);
    });
  }

let noobGroup = new THREE.Group(); // Group for the avatar
scene.add(noobGroup);

// === Spawn Bloxy Noob Avatar ===
function spawnBloxyNoob() {
  const yellow = 0xffff00;
  const blue = 0x0000ff;

  const parts = [
    { name: "Head", size: [1, 1, 1], color: yellow, pos: [0, 5.5, 0] },
    { name: "Torso", size: [2, 2, 1], color: blue, pos: [0, 3.5, 0] },
    { name: "LeftArm", size: [1, 2, 1], color: yellow, pos: [-1.5, 3.5, 0] },
    { name: "RightArm", size: [1, 2, 1], color: yellow, pos: [1.5, 3.5, 0] },
    { name: "LeftLeg", size: [1, 2, 1], color: blue, pos: [-0.5, 1.5, 0] },
    { name: "RightLeg", size: [1, 2, 1], color: blue, pos: [0.5, 1.5, 0] }
  ];

  parts.forEach(part => {
    const geometry = new THREE.BoxGeometry(...part.size);
    const material = new THREE.MeshStandardMaterial({ color: part.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...part.pos);
    noobGroup.add(mesh);
  });
}

// === Movement Controls ===
const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function updateMovement() {
  const speed = 0.1;
  if (keys["w"] || keys["arrowup"]) noobGroup.position.z -= speed;
  if (keys["s"] || keys["arrowdown"]) noobGroup.position.z += speed;
  if (keys["a"] || keys["arrowleft"]) noobGroup.position.x -= speed;
  if (keys["d"] || keys["arrowright"]) noobGroup.position.x += speed;
}

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  renderer.render(scene, camera);
}
