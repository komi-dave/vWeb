const isMobile = window.innerWidth <= 768;
if (isMobile) {
  // Remove evading transform entirely on mobile
  envelope.style.transition = "none";
  envelope.style.transform = "none";
  envelope.style.position = "relative"; // prevent fixed transform weirdness
}

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
closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();                 // prevent click bubbling
  letter.classList.remove("show");     // hide the letter
  pageContent.classList.remove("blur"); // remove page blur

  // Reset mobile transform so letter returns to original position
  if (isMobile) {
    letter.style.transform = "translate(-50%, 40%) scale(0.85)";
  }
});


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



<script>
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");
  const closeBtn = document.getElementById("closeBtn");
  const pageContent = document.querySelector(".page-content");
  const isMobile = window.innerWidth <= 768;

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();               // prevent envelope click from triggering
    letter.classList.remove("show");   // hide letter
    envelope.classList.remove("open"); // close the flap
    pageContent.classList.remove("blur"); // remove background blur

    // Reset mobile position
    if (isMobile) {
      letter.style.transform = "translate(-50%, 40%) scale(0.85)";
    }
  });
</script>




// DESKTOP: chase effect on mouse enter
if (!isMobile) {
  envelope.addEventListener("mouseenter", () => {
    if (evadingActive) {
      evadeEnvelope();
    }
  });
}

// CLICK behavior (mobile and desktop)
envelope.addEventListener("click", () => {

  // MOBILE: open immediately
  if (isMobile) {
    envelope.classList.add("open");
    letter.classList.add("show");
    pageContent.classList.add("blur");
    return;
  }

  // DESKTOP: wait until chase finished
  if (evadingActive) return;

  chaseMsg.classList.remove("show");
  envelope.classList.add("open");

  setTimeout(() => {
    letter.classList.add("show");
    pageContent.classList.add("blur");
  }, 400);
});



<script>
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const closeBtn = document.getElementById("closeBtn");
const pageContent = document.querySelector(".page-content");
const isMobile = window.innerWidth <= 768;

let evadingActive = true;

// --- OPEN LETTER ---
function openLetter() {
  envelope.classList.add("open");      // flap opens
  letter.classList.add("show");        // letter appears
  pageContent.classList.add("blur");   // blur background
  evadingActive = false;               // stop evading if desktop
}

// --- CLOSE LETTER ---
function closeLetter() {
  letter.classList.remove("show");     // hide letter
  envelope.classList.remove("open");   // close flap
  pageContent.classList.remove("blur"); // remove blur

  if (isMobile) {
    letter.style.transform = "translate(-50%, 40%) scale(0.85)";
  }
}




