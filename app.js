/* THE ART OF US — interaction layer, Vanilla JavaScript */
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

/* Music starts only after a deliberate user action. */
const audio = $("#backgroundMusic");
const musicToggle = $("#musicToggle");
const musicButtonText = $("#musicButtonText");
const trackStatus = $("#trackStatus");
const openStory = $("#openStory");
let fadeTimer = null;

async function playMusicWithFade(){
  if(!audio || !musicToggle) return;
  clearInterval(fadeTimer);
  audio.volume = 0;
  try{
    await audio.play();
    musicToggle.classList.add("is-playing");
    musicToggle.setAttribute("aria-pressed","true");
    musicButtonText.textContent = "Pause our song";
    trackStatus.textContent = "Now playing · Bergema Sampai Selamanya";
    let volume = 0;
    fadeTimer = setInterval(()=>{
      volume = Math.min(1, volume + .035);
      audio.volume = volume;
      if(volume >= 1) clearInterval(fadeTimer);
    },120);
  }catch(error){
    trackStatus.textContent = "Tambahkan audio di ./assets/";
    musicButtonText.textContent = "Try again";
    console.info("Audio belum tersedia:",error);
  }
}
function pauseMusic(){
  clearInterval(fadeTimer);
  if(!audio || !musicToggle) return;
  audio.pause();
  musicToggle.classList.remove("is-playing");
  musicToggle.setAttribute("aria-pressed","false");
  musicButtonText.textContent = "Play our song";
  trackStatus.textContent = "Nadhif Basalamah — Bergema Sampai Selamanya";
}
musicToggle?.addEventListener("click",()=>audio?.paused ? playMusicWithFade() : pauseMusic());
openStory?.addEventListener("click",()=>{if(audio?.paused) playMusicWithFade();});

/* Five chapters */
const chapters = [
  {kicker:"where it all began",title:"The Beginning",text:"Dari percakapan sederhana yang awalnya terasa biasa, ternyata semesta sedang memperkenalkan seseorang yang akan menjadi bagian penting dalam hidupku. Aku tidak tahu ke mana cerita ini akan berjalan, tapi aku senang kita memulainya.",note:"and then, there was you."},
  {kicker:"the moment it felt different",title:"The Spark",text:"Ada satu titik ketika obrolan terasa lebih panjang, menunggu kabar jadi kebiasaan, dan kehadiranmu mulai terasa istimewa. Sejak saat itu, aku ingin mengenalmu lebih jauh dan memilihmu dengan sungguh-sungguh.",note:"you made my heart feel at home."},
  {kicker:"the sweet, the messy, the real",title:"Sweet & Sour",text:"Kita punya hari penuh tawa, cerita spontan, dan mungkin juga hari yang tidak berjalan sesuai rencana. Terima kasih karena tetap mau mencoba, saling mendengar, dan melewati bagian sulit tanpa melupakan hal-hal baik.",note:"every version of us is worth keeping."},
  {kicker:"little things, big meaning",title:"Growing Together",text:"Aku menyukai hal-hal sederhana: percakapan sebelum tidur, saling mengingatkan, candaan yang hanya kita mengerti, dan rasa tenang saat tahu kita saling mendukung. Semoga kita terus tumbuh tanpa berhenti menjadi tempat pulang.",note:"slowly, softly, side by side."},
  {kicker:"still choosing you",title:"Today & Forever",text:"Hari ini aku merayakan semua yang sudah kita lewati dan semua kemungkinan indah di depan sana. Semoga cerita kita terus bergema dalam banyak musim, dalam langkah kecil, dan dalam pilihan untuk saling mencintai setiap hari.",note:"for all our tomorrows. ♡"}
];
let activeChapter=0;
const chapterTabs=$$(".chapter-tab");
const chapterNumber=$("#chapterNumber"),chapterKicker=$("#chapterKicker"),chapterTitle=$("#chapterTitle"),chapterText=$("#chapterText"),chapterNote=$("#chapterNote"),chapterProgress=$("#chapterProgress"),chapterPrev=$("#chapterPrev"),chapterNext=$("#chapterNext");
function showChapter(index){
  activeChapter=Math.max(0,Math.min(chapters.length-1,index));
  const c=chapters[activeChapter];
  chapterNumber.textContent=`CHAPTER ${String(activeChapter+1).padStart(2,"0")} / 05`;
  chapterKicker.textContent=c.kicker;chapterTitle.textContent=c.title;chapterText.textContent=c.text;chapterNote.textContent=c.note;
  chapterProgress.textContent=`${String(activeChapter+1).padStart(2,"0")} — 05`;
  chapterPrev.disabled=activeChapter===0;chapterNext.disabled=activeChapter===chapters.length-1;
  chapterTabs.forEach((tab,i)=>{const active=i===activeChapter;tab.classList.toggle("is-active",active);tab.setAttribute("aria-selected",String(active));});
}
chapterTabs.forEach(tab=>tab.addEventListener("click",()=>showChapter(Number(tab.dataset.chapter))));
chapterPrev?.addEventListener("click",()=>showChapter(activeChapter-1));
chapterNext?.addEventListener("click",()=>showChapter(activeChapter+1));

/* Polaroid flip */
$$(".polaroid").forEach(card=>card.addEventListener("click",()=>{
  const flipped=card.classList.toggle("is-flipped");
  card.setAttribute("aria-pressed",String(flipped));
}));

/* Envelope and letter */
const envelope=$("#envelope"),loveLetter=$("#loveLetter"),envelopeInstruction=$("#envelopeInstruction");
envelope?.addEventListener("click",()=>{
  const isOpen=envelope.classList.toggle("is-open");
  envelope.setAttribute("aria-expanded",String(isOpen));
  loveLetter?.classList.toggle("is-visible",isOpen);
  loveLetter?.setAttribute("aria-hidden",String(!isOpen));
  envelopeInstruction.textContent=isOpen?"A LETTER, JUST FOR YOU ♡":"TAP THE SEAL TO OPEN";
});

/* Candle */
const flame=$("#flame"),smoke=$("#smoke"),blowButton=$("#blowCandle"),candleStatus=$("#candleStatus");
let candleIsLit=true;
blowButton?.addEventListener("click",()=>{
  if(candleIsLit){
    flame?.classList.add("is-out");smoke?.classList.remove("is-visible");
    if(smoke){void smoke.offsetWidth;smoke.classList.add("is-visible");}
    candleStatus.textContent="Harapannya sudah dilepaskan ke semesta. ♡";
    blowButton.innerHTML='Nyalakan lagi <span>↗</span>';candleIsLit=false;
  }else{
    flame?.classList.remove("is-out");smoke?.classList.remove("is-visible");
    candleStatus.textContent="Lilin menyala lagi. Buat satu harapan baru!";
    blowButton.innerHTML='Tiup lilin <span>✳</span>';candleIsLit=true;
  }
});

/* Wish list stored per browser/device */
const STORAGE_KEY="the-art-of-us-wishes";
const wishForm=$("#wishForm"),wishInput=$("#wishInput"),wishList=$("#wishList"),wishCount=$("#wishCount"),charCount=$("#charCount");
function readWishes(){
  try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");return Array.isArray(data)?data.filter(x=>typeof x==="string"):[];}
  catch{return [];}
}
let wishes=readWishes();
function saveWishes(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(wishes));}
  catch(error){candleStatus.textContent="Penyimpanan browser tidak tersedia.";console.warn(error);}
}
function renderWishes(){
  wishList.replaceChildren();
  wishCount.textContent=`${wishes.length} ${wishes.length===1?"wish":"wishes"}`;
  if(!wishes.length){
    const empty=document.createElement("li");empty.className="empty-wishes";empty.textContent="Belum ada harapan tersimpan. Jadilah yang pertama ♡";wishList.append(empty);return;
  }
  wishes.forEach((wish,index)=>{
    const item=document.createElement("li"),remove=document.createElement("button");
    item.append(document.createTextNode(wish));
    remove.type="button";remove.textContent="×";remove.setAttribute("aria-label",`Hapus harapan nomor ${index+1}`);
    remove.addEventListener("click",()=>{wishes.splice(index,1);saveWishes();renderWishes();});
    item.append(remove);wishList.append(item);
  });
}
wishInput?.addEventListener("input",()=>charCount.textContent=`${wishInput.value.length} / 240`);
wishForm?.addEventListener("submit",event=>{
  event.preventDefault();const wish=wishInput.value.trim();if(!wish)return;
  wishes.unshift(wish);saveWishes();renderWishes();wishInput.value="";charCount.textContent="0 / 240";wishInput.focus();
});
renderWishes();showChapter(0);
