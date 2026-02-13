
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const wrapper = document.querySelector(".envelope-wrapper");

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const closeBtn = document.getElementById("closeBtn");
const pageContent = document.querySelector(".page-content");
const chaseMsg = document.getElementById("chaseMsg");

let evadeCount = 0;
let maxEvades = 15;
let evadingActive = true;

function evadeEnvelope() {
  if (evadeCount >= maxEvades) return;

  const rect = envelope.getBoundingClientRect();
  const envelopeX = rect.left + rect.width / 3;
  const envelopeY = rect.top + rect.height / 4;

  const deltaX = envelopeX - mouseX;
  const deltaY = envelopeY - mouseY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const moveDistance = 250; // controlled jump
  const moveX = (deltaX / distance) * moveDistance;
  const moveY = (deltaY / distance) * moveDistance;

  // Clamp inside screen
  let newX = rect.left + moveX;
  let newY = rect.top + moveY;
  const padding = 20;
  newX = Math.max(padding, Math.min(window.innerWidth - rect.width - padding, newX));
  newY = Math.max(padding, Math.min(window.innerHeight - rect.height - padding, newY));

  const finalX = newX - rect.left;
  const finalY = newY - rect.top;
  const randomRotate = (Math.random() - 0.5) * 10;

  envelope.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${randomRotate}deg)`;

  evadeCount++;

  // --- Agile wiggle for letter for first 5 chases ---
  if (evadeCount <= 5) {
    letter.classList.add("agile");
  } else {
    letter.classList.remove("agile");
  }

  // --- Messages at specific chase counts ---
  if (evadeCount === 3) {
    chaseMsg.textContent = "habol boi 😝";
    chaseMsg.classList.add("show");
  }

  if (evadeCount === 7) { // after 7 chases
    chaseMsg.textContent = "habol ulit boi 😝";
    chaseMsg.classList.remove("show");
    void chaseMsg.offsetWidth; // restart animation
    chaseMsg.classList.add("show");
  }

  if (evadeCount === 10) { // after 10 chases
    chaseMsg.textContent = "joke lang hehe 😝";
    chaseMsg.classList.remove("show");
    void chaseMsg.offsetWidth;
    chaseMsg.classList.add("show");
  }

  // --- Stop evading after maxEvades ---
  if (evadeCount === maxEvades) {
    evadingActive = false;
    envelope.style.transition = "transform 0.6s ease";
    envelope.style.transform = "translate(0px, 0px) rotate(0deg)";

    chaseMsg.textContent = "Sige na nga, open mo na boi 😏";
    chaseMsg.classList.remove("show");
    void chaseMsg.offsetWidth;
    chaseMsg.classList.add("show");

    document.body.style.cursor = "default";

    playPopSound();
    intensifyBackground();
  }
}



const goofyEmojisContainer = document.getElementById('goofyEmojis');
const emojis = ['😝', '💌', '✨', '🐢', '🎉', '🥺', '😏', '🤪'];

function createGoofyEmoji() {
  const emoji = document.createElement('div');
  emoji.classList.add('goofy-emoji');

  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * window.innerWidth + 'px';

  const driftAmount = (Math.random() - 0.5) * 200;
  emoji.style.setProperty('--drift', `${driftAmount}px`);

  const duration = 8 + Math.random() * 6;
  emoji.style.animation = `floatGoofy ${duration}s linear forwards`;

  goofyEmojisContainer.appendChild(emoji);

  setTimeout(() => {
    goofyEmojisContainer.removeChild(emoji);
  }, duration * 1000);
}

// Spawn goofy emoji every 700ms — call this *once* on script load
setInterval(createGoofyEmoji, 700);







envelope.addEventListener("mouseenter", () => {
  if (evadingActive) {
    document.body.style.cursor = "pointer";
    evadeEnvelope();
 
}
});


/* NORMAL FUNCTION AFTER 3 EVADES */
envelope.addEventListener("click", () => {
  if (evadingActive) return;
chaseMsg.classList.remove("show");
  envelope.classList.add("open");

  setTimeout(() => {
    letter.classList.add("show");
    pageContent.classList.add("blur");
  }, 400);
});

/* Close letter */
closeBtn.addEventListener("click", () => {
  letter.classList.remove("show");
  pageContent.classList.remove("blur");
});
