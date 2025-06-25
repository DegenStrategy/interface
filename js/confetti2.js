
var count = 350;
var defaults = {
  origin: { y: 0.6 }
};
function triggerConfetti() {
function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

fire(0.25, {
  spread: 39,
  startVelocity: 45,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 150,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 180,
  startVelocity: 19,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 180,
  startVelocity: 35,
});
}

var end = Date.now() + (11 * 1000);

// go Buckeyes!
var colors = ['#118C4F', '#ffffff'];
function triggerConfetti2() {
(function frame() {
  confetti({
    particleCount: 120,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 120,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
}


// go Buckeyes!
var colors2 = ['#ff0000', '#ffffff'];
function triggerConfetti3() {
(function frame() {
  confetti({
    particleCount: 120,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors2
  });
  confetti({
    particleCount: 120,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors2
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
}
