function initOrb() {
  const container = document.getElementById('canvas-container');
  if (!container) return;


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);


  const geometry = new THREE.IcosahedronGeometry(2, 2);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00f5ff, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);


  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 700;
  const posArray = new Float32Array(particlesCount * 3);


  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }


  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.8
  });


  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);


  camera.position.z = 5;


  let mouseX = 0;
  let mouseY = 0;


  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  });


  function animate() {
    requestAnimationFrame(animate);
    
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.002;
    
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.001;


    sphere.rotation.x += mouseY * 0.05;
    sphere.rotation.y += mouseX * 0.05;


    renderer.render(scene, camera);
  }


  animate();


  window.addEventListener('resize', () => {
    if(container.clientWidth === 0) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}


document.addEventListener('DOMContentLoaded', initOrb);
