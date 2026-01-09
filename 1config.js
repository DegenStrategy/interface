//simply replace API url and use the governance panel on your local device
var isTestnet = false
var apiURL = "https://api.oink-pls.com/"; //for proposals, votes.
var rpcLink = "https://rpc-pulsechain.g4mm4.io"

var provider
try {
	provider = new ethers.providers.Web3Provider(window.ethereum, "any");
} catch(e) {
	console.log(e)
}




document.addEventListener('error', function (e) {
  if (e.target.tagName === 'IMG') {
    const img = e.target;
    const seed = img.src || img.alt || 'default';
    const computedStyle = window.getComputedStyle(img);
    let width = computedStyle.width === '0px' || computedStyle.width === 'auto' ? 64 : parseInt(computedStyle.width);
    let height = computedStyle.height === '0px' || computedStyle.height === 'auto' ? 64 : parseInt(computedStyle.height);

    // Enforce minimum dimensions for visibility
    width = Math.max(width, 32);
    height = Math.max(height, 32);

    // Create canvas for placeholder
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Copy relevant attributes and styles
    if (img.className) canvas.className = img.className;
    if (img.id) canvas.id = img.id;
    ['margin', 'padding', 'float', 'verticalAlign', 'position', 'top', 'left', 'right', 'bottom'].forEach((prop) => {
      const value = computedStyle.getPropertyValue(prop);
      if (value && value !== 'auto' && value !== 'normal') {
        canvas.style[prop] = value;
      }
    });

    // Generate abstract pattern
    generateTokenPlaceholder(canvas, seed);

    // Replace the broken image
    img.parentNode.replaceChild(canvas, img);
  }
}, true);

function generateTokenPlaceholder(canvas, seed) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Simple hash for consistent output
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) & 0xffffffff;
  }

  // Seed-based pseudo-random number generator
  const rng = () => {
    hash = (hash * 134775813 + 1) & 0xffffffff;
    return (hash >>> 0) / 0xffffffff;
  };

  // Select base color palette (crypto-inspired)
  const palettes = [
    ['#1E3A8A', '#3B82F6', '#60A5FA'], // Blue tones
    ['#701A75', '#D946EF', '#F0ABFC'], // Purple tones
    ['#166534', '#22C55E', '#86EFAC'], // Green tones
    ['#991B1B', '#EF4444', '#FCA5A5'], // Red tones
  ];
  const palette = palettes[Math.abs(hash) % palettes.length];

  // Fill background
  ctx.fillStyle = palette[0];
  ctx.fillRect(0, 0, width, height);

  // Generate subtle grid-like pattern
  const patternType = Math.floor(rng() * 3); // 0: grid, 1: waves, 2: noise
  if (patternType === 0) {
    // Grid
    ctx.strokeStyle = palette[1] + '33'; // Semi-transparent
    ctx.lineWidth = 0.5;
    const gridSize = Math.max(10, Math.min(width, height) / (5 + rng() * 5));
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  } else if (patternType === 1) {
    // Waves
    ctx.strokeStyle = palette[1] + '66';
    ctx.lineWidth = 1;
    const waveHeight = height / (5 + rng() * 5);
    for (let y = 0; y <= height; y += waveHeight) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 5) {
        const offset = Math.sin(x * 0.05 + y * 0.1 + rng() * 10) * waveHeight * 0.3;
        ctx.lineTo(x, y + offset);
      }
      ctx.stroke();
    }
  } else {
    // Noise
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = rng() * 50 - 25;
      data[i] = Math.min(255, Math.max(0, parseInt(palette[1][1] + noise, 16)));
      data[i + 1] = Math.min(255, Math.max(0, parseInt(palette[1][3] + noise, 16)));
      data[i + 2] = Math.min(255, Math.max(0, parseInt(palette[1][5] + noise, 16)));
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // Add a subtle glow effect
  ctx.fillStyle = palette[2] + '20';
  ctx.fillRect(0, 0, width, height);

  // Optional: Add token initials (first 2 chars of alt text)
  if (seed !== 'default' && seed.length >= 2) {
    ctx.font = `${Math.min(width, height) / 2}px sans-serif`;
    ctx.fillStyle = palette[2];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(seed.slice(0, 2).toUpperCase(), width / 2, height / 2);
  }
}

// Add subtle animation for dynamic feel
const style = document.createElement('style');
style.textContent = `
  canvas.token-placeholder {
    transition: transform 0.3s ease;
  }
  canvas.token-placeholder:hover {
    transform: scale(1.05);
  }
`;

document.head.appendChild(style);



