// === BASIC SETUP ===
const canvas = document.getElementById("bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 45;

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// === LIGHTS ===
scene.add(new THREE.AmbientLight(0x404040, 1.5));

const mainLight = new THREE.PointLight(0x7c7cff, 2);
mainLight.position.set(20, 20, 20);
scene.add(mainLight);

const blueLight = new THREE.PointLight(0x38bdf8, 1.5);
blueLight.position.set(-20, -15, 25);
scene.add(blueLight);

// === OBJECTS ===

// 1️⃣ CODE CUBE (Backend / API)
const cubeGeo = new THREE.BoxGeometry(10, 10, 10);
const cubeMat = new THREE.MeshStandardMaterial({
    color: 0x7c7cff,
    wireframe: true
});
const codeCube = new THREE.Mesh(cubeGeo, cubeMat);
codeCube.position.set(-18, 5, 0);
scene.add(codeCube);

// 2️⃣ DATABASE RING
const ringGeo = new THREE.TorusGeometry(8, 1.5, 16, 100);
const ringMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    wireframe: true
});
const databaseRing = new THREE.Mesh(ringGeo, ringMat);
databaseRing.position.set(18, -5, -5);
scene.add(databaseRing);

// 3️⃣ NETWORK NODE (API Connections)
const nodeGeo = new THREE.IcosahedronGeometry(6, 1);
const nodeMat = new THREE.MeshStandardMaterial({
    color: 0xa78bfa,
    wireframe: true
});
const networkNode = new THREE.Mesh(nodeGeo, nodeMat);
networkNode.position.set(0, 15, -15);
scene.add(networkNode);

// 4️⃣ TERMINAL GRID (Logic)
const grid = new THREE.GridHelper(120, 40, 0x7c7cff, 0x222244);
grid.position.y = -25;
scene.add(grid);

// === MOUSE INTERACTION ===
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// === ANIMATION LOOP ===
function animate() {
    requestAnimationFrame(animate);

    // Ko‘zga tashlanadigan aylanish
    codeCube.rotation.x += 0.004;
    codeCube.rotation.y += 0.005;

    databaseRing.rotation.x += 0.003;
    databaseRing.rotation.y += 0.004;

    networkNode.rotation.y += 0.003;

    // Kamera harakati (chuqurlik beradi)
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();

// === RESIZE ===
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
