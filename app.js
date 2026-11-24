/* =========================================================
   OUR LITTLE FOREVER — Vanilla JavaScript
   Ganti teks cerita/foto/audio melalui file HTML ini.
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* ---------- Musik: mulai hanya setelah interaksi pengguna ---------- */
const audio = $("#backgroundMusic");
const musicToggle = $("#musicToggle");
const musicButtonText = $("#musicButtonText");
const trackStatus = $("#trackStatus");
const openStory = $("#openStory");
let fadeTimer = null;

async function playMusicWithFade() {
  if (!audio) return;
  window.clearInterval(fadeTimer);
  audio.volume = 0;
  try {
    await audio.play();
    musicToggle.classList.add("is-playing");
    musicToggle.setAttribute("aria-pressed", "true");
    musicButtonText.textContent = "Jeda lagu";
    trackStatus.textContent = "Now playing · Bergema Sampai Selamanya";
    let volume = 0;
    fadeTimer = window.setInterval(() => {
      volume = Math.min(1, volume + 0.04);
      audio.volume = volume;
      if (volume >= 1) window.clearInterval(fadeTimer);
    }, 110);
  } catch (error) {
    trackStatus.textContent = "Tambahkan file musik di ./assets/";
    musicButtonText.textContent = "Coba putar lagi";
    console.info("Audio belum dapat diputar:", error);
  }
}

function pauseMusic() {
  window.clearInterval(fadeTimer);
  if (!audio) return;
  audio.pause();
  musicToggle.classList.remove("is-playing");
  musicToggle.setAttribute("aria-pressed", "false");
  musicButtonText.textContent = "Putar lagu";
  trackStatus.textContent = "Nadhif Basalamah — Bergema Sampai Selamanya";
}

musicToggle?.addEventListener("click", () => {
  if (audio.paused) playMusicWithFade();
  else pauseMusic();
});

openStory?.addEventListener("click", () => {
  // Audio dicoba pada interaksi yang sama dengan aksi membuka cerita.
  if (audio.paused) playMusicWithFade();
});

/* ---------- Lima babak perjalanan ---------- */
const chapters = [
  {
    kicker: "where it all began",
    title: "The Beginning",
    text: "Dari percakapan sederhana yang awalnya terasa biasa, ternyata semesta sedang memperkenalkan seseorang yang akan menjadi bagian penting dalam hidupku. Aku tidak tahu ke mana cerita ini akan berjalan, tapi aku senang kita memulainya.",
    note: "and then, there was you."
  },
  {
    kicker: "the moment it felt different",
    title: "The Spark",
    text: "Ada satu titik ketika obrolan terasa lebih panjang, menunggu kabar jadi kebiasaan, dan kehadiranmu mulai terasa istimewa. Sejak saat itu, aku ingin mengenalmu lebih jauh dan memilihmu dengan sungguh-sungguh.",
    note: "you made my heart feel at home."
  },
  {
    kicker: "the sweet, the messy, the real",
    title: "Sweet & Sour",
    text: "Kita punya hari penuh tawa, cerita spontan, dan mungkin juga hari yang tidak berjalan sesuai rencana. Terima kasih karena tetap mau mencoba, saling mendengar, dan melewati bagian sulit tanpa melupakan hal-hal baik.",
    note: "every version of us is worth keeping."
  },
  {
    kicker: "little things, big meaning",
    title: "Growing Together",
    text: "Aku menyukai hal-hal sederhana: percakapan sebelum tidur, saling mengingatkan, candaan yang hanya kita mengerti, dan rasa tenang saat tahu kita saling mendukung. Semoga kita terus tumbuh tanpa berhenti menjadi tempat pulang.",
    note: "slowly, softly, side by side."
  },
  {
    kicker: "still choosing you",
    title: "Today & Forever",
    text: "Hari ini aku merayakan semua yang sudah kita lewati dan semua kemungkinan indah di depan sana. Semoga cerita kita terus bergema dalam banyak musim, dalam langkah kecil, dan dalam pilihan untuk saling mencintai setiap hari.",
    note: "for all our tomorrows. ♡"
  }
];

let activeChapter = 0;
const chapterTabs = $$(".chapter-tab");
const chapterNumber = $("#chapterNumber");
const chapterKicker = $("#chapterKicker");
const chapterTitle = $("#chapterTitle");
const chapterText = $("#chapterText");
const chapterNote = $("#chapterNote");
const chapterProgress = $("#chapterProgress");
const chapterPrev = $("#chapterPrev");
const chapterNext = $("#chapterNext");

function showChapter(index) {
  activeChapter = Math.max(0, Math.min(chapters.length - 1, index));
  const chapter = chapters[activeChapter];
  chapterNumber.textContent = `CHAPTER ${String(activeChapter + 1).padStart(2, "0")} / 05`;
  chapterKicker.textContent = chapter.kicker;
  chapterTitle.textContent = chapter.title;
  chapterText.textContent = chapter.text;
  chapterNote.textContent = chapter.note;
  chapterProgress.textContent = `${String(activeChapter + 1).padStart(2, "0")} — 05`;
  chapterPrev.disabled = activeChapter === 0;
  chapterNext.disabled = activeChapter === chapters.length - 1;
  chapterTabs.forEach((tab, indexInList) => {
    const selected = indexInList === activeChapter;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
}

chapterTabs.forEach(tab => {
  tab.addEventListener("click", () => showChapter(Number(tab.dataset.chapter)));
});
chapterPrev?.addEventListener("click", () => showChapter(activeChapter - 1));
chapterNext?.addEventListener("click", () => showChapter(activeChapter + 1));

/* ---------- Galeri polaroid: flip + zoom ---------- */
$$(".polaroid").forEach(card => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  });
});

/* ---------- Amplop dan surat ---------- */
const envelope = $("#envelope");
const loveLetter = $("#loveLetter");
const envelopeInstruction = $("#envelopeInstruction");

envelope?.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("is-open");
  envelope.setAttribute("aria-expanded", String(isOpen));
  loveLetter.classList.toggle("is-visible", isOpen);
  loveLetter.setAttribute("aria-hidden", String(!isOpen));
  envelopeInstruction.textContent = isOpen ? "surat kecil khusus untukmu ♡" : "ketuk segelnya untuk membuka surat";
});

/* ---------- Lilin: padamkan dan nyalakan ulang ---------- */
const flame = $("#flame");
const smoke = $("#smoke");
const blowButton = $("#blowCandle");
const candleStatus = $("#candleStatus");
let candleIsLit = true;

blowButton?.addEventListener("click", () => {
  if (candleIsLit) {
    flame.classList.add("is-out");
    smoke.classList.remove("is-visible");
    // Memicu ulang animasi asap jika tombol ditekan.
    void smoke.offsetWidth;
    smoke.classList.add("is-visible");
    candleStatus.textContent = "Harapannya sudah dilepaskan ke semesta. ♡";
    blowButton.textContent = "Nyalakan Lagi ✨";
    candleIsLit = false;
  } else {
    flame.classList.remove("is-out");
    smoke.classList.remove("is-visible");
    candleStatus.textContent = "Lilin menyala lagi. Buat satu harapan baru!";
    blowButton.textContent = "Tiup Lilin 🎂";
    candleIsLit = true;
  }
});

/* ---------- Wish list: simpan secara lokal ---------- */
const STORAGE_KEY = "our-little-forever-wishes";
const wishForm = $("#wishForm");
const wishInput = $("#wishInput");
const wishList = $("#wishList");
const wishCount = $("#wishCount");
const charCount = $("#charCount");

function readWishes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(item => typeof item === "string") : [];
  } catch {
    return [];
  }
}

let wishes = readWishes();

function saveWishes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch (error) {
    candleStatus.textContent = "Penyimpanan browser penuh atau tidak tersedia.";
    console.warn("Wish tidak dapat disimpan:", error);
  }
}

function renderWishes() {
  wishList.replaceChildren();
  wishCount.textContent = `${wishes.length} ${wishes.length === 1 ? "wish" : "wishes"}`;

  if (wishes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-wishes";
    empty.textContent = "Belum ada harapan tersimpan. Jadilah yang pertama ♡";
    wishList.append(empty);
    return;
  }

  wishes.forEach((wish, index) => {
    const item = document.createElement("li");
    const text = document.createTextNode(wish);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Hapus harapan nomor ${index + 1}`);
    remove.addEventListener("click", () => {
      wishes.splice(index, 1);
      saveWishes();
      renderWishes();
    });
    item.append(text, remove);
    wishList.append(item);
  });
}

wishInput?.addEventListener("input", () => {
  charCount.textContent = `${wishInput.value.length} / 240`;
});

wishForm?.addEventListener("submit", event => {
  event.preventDefault();
  const wish = wishInput.value.trim();
  if (!wish) return;
  wishes.unshift(wish);
  saveWishes();
  renderWishes();
  wishInput.value = "";
  charCount.textContent = "0 / 240";
  wishInput.focus();
});

renderWishes();
showChapter(0);
