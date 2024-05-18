const container = document.getElementById('three-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const starsGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 3});

const starsVertices = [];
// Create stars
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * 2000 - 1000;
  const y = Math.random() * 2000 - 1000;
  const z = Math.random() * 2000 - 1000;
  starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));

const starField = new THREE.Points(starsGeometry, starMaterial);
scene.add(starField);

camera.position.z = 1000;

window.addEventListener('resize', function () {
const width = window.innerWidth;
const height = window.innerHeight;
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);
});

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Move stars towards camera
  const positions = starsGeometry.attributes.position;
  for (let i = 0; i < positions.count; i += 3) {
    positions.array[i + 2] += 10; // Adjust speed of stars here
    // Reset star position if it moves out of view
    if (positions.array[i + 2] > 1000) {
      positions.array[i + 2] = -1000;
    }
  }
  // Update star positions
  positions.needsUpdate = true;

  renderer.render(scene, camera);
};

animate();