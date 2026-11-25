/* THE ART OF US — interaction layer, Vanilla JavaScript */
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

/* Password gate: the correct password unlocks the site and requests music playback. */
const PASSWORD = "25112026";
const passwordGate = $("#passwordGate");
const passwordForm = $("#passwordForm");
const passwordInput = $("#sitePassword");
const passwordError = $("#passwordError");

passwordForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!passwordInput || !passwordGate) return;

  if (passwordInput.value.trim() !== PASSWORD) {
    if (passwordError) passwordError.textContent = "That password is not quite right. Please try again.";
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  if (passwordError) passwordError.textContent = "";
  document.body.classList.remove("is-locked");
  document.body.classList.add("is-unlocked");
  passwordGate.setAttribute("aria-hidden", "true");
  passwordForm.querySelector("button")?.setAttribute("disabled", "disabled");

  // Playback is requested directly from the password submit user gesture.
  await playMusicWithFade();
});

passwordInput?.addEventListener("input", () => {
  if (passwordError) passwordError.textContent = "";
});

/* Music can also be controlled manually after unlocking. */
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
  {kicker:"ketika semesta berbisik",title:"Awal Kisah",text:"Dari pertemuan sederhana yang awalnya terasa biasa, ternyata semesta sedang memperkenalkan seseorang yang akan menjadi bagian penting dalam hidupku. Saat itu aku tidak tahu ke mana cerita ini akan berjalan, tapi aku senang kita memulainya.",note:"dan di sanalah, takdir mulai menyebut namamu."},
  {kicker:"saat rasa mulai bernama",title:"Rasa yang Menetap",text:"Aku ingin mencintai lebih banyak dari debar, lebih besar dari sabar, lebih lama dari selamanya. Karena di tiap aliran darah yang mengalir di tubuhku, namamu selalu ada di dalamnya.",note:"di setiap denyut, hanya ada engkau."},
  {kicker:"dalam setiap aksara",title:"Aksara Tentangmu",text:"Setiap aksara yang terlukis, selalu ada kamu di dalamnya. Selalu ada, dan indah dalam bentuk mana pun. Ia selalu sempurna, dari paras hingga cinta. Dalam karya ini, aku menggambarkanmu sebagai sosok yang paling indah dari makhluk lainnya.",note:"dalam rupa apa pun, engkau tetap yang terindah."},
  {kicker:"tak terjangkau kata",title:"Abadi di Atma",text:"Engkau selalu abadi, entah dalam hati, atau dalam tulisan. Bahkan sastra pun tidak bisa menggambarkan seberapa indah engkau. Tak ada yang bisa mengenalmu sedalam aku, tak akan ada yang pernah mengenalmu sejauh ini selain atma-ku.",note:"dan atma ini selamanya tahu jalan menujumu."},
  {kicker:"hingga akhir kala",title:"Kini dan Abadi",text:"Tak bisa dipungkiri, bahwa aku sangat mencintaimu, lebih dari apa pun. Hadirmu membangkitkan jiwa yang telah lama mati, dan kini hidup kembali karena bersamamu.",note:"untuk segala hari yang belum tiba. ♡"}
];
let activeChapter=0;
const chapterTabs=$$(".chapter-tab");
const chapterNumber=$("#chapterNumber");
const chapterKicker=$("#chapterKicker");
const chapterTitle=$("#chapterTitle");
const chapterText=$("#chapterText");
const chapterNote=$("#chapterNote");
const chapterProgress=$("#chapterProgress");
const chapterPrev=$("#chapterPrev");
const chapterNext=$("#chapterNext");

let chapterSwapTimer=null;
function showChapter(index){
  if(!chapters.length) return;

  const requestedIndex=Number(index);
  activeChapter=Math.max(0,Math.min(
    chapters.length-1,
    Number.isFinite(requestedIndex)?requestedIndex:0
  ));

  const chapterCard=$(".chapter-card");
  if(chapterSwapTimer) clearTimeout(chapterSwapTimer);
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(chapterCard && !reducedMotion){
    chapterCard.classList.remove("chapter-enter");
    chapterCard.classList.add("chapter-exit");
  }
  const updateChapter=()=>{
  const chapter=chapters[activeChapter];
  const current=String(activeChapter+1).padStart(2,"0");
  const total=String(chapters.length).padStart(2,"0");

  if(chapterNumber) chapterNumber.textContent=`CHAPTER ${current} / ${total}`;
  if(chapterKicker) chapterKicker.textContent=chapter.kicker;
  if(chapterTitle) chapterTitle.textContent=chapter.title;
  if(chapterText) chapterText.textContent=chapter.text;
  if(chapterNote) chapterNote.textContent=chapter.note;
  if(chapterProgress) chapterProgress.textContent=`${current} — ${total}`;

  if(chapterPrev) chapterPrev.disabled=activeChapter===0;
  if(chapterNext) chapterNext.disabled=activeChapter===chapters.length-1;

  chapterTabs.forEach((tab,i)=>{
    const isActive=i===activeChapter;
    tab.classList.toggle("is-active",isActive);
    tab.setAttribute("aria-selected",String(isActive));
  });
  if(chapterCard){
    chapterCard.classList.remove("chapter-exit");
    if(!reducedMotion){
      chapterCard.classList.add("chapter-enter");
      chapterSwapTimer=setTimeout(()=>chapterCard.classList.remove("chapter-enter"),560);
    }
  }
  };
  if(chapterCard && !reducedMotion){chapterSwapTimer=setTimeout(updateChapter,150);}
  else updateChapter();
}

chapterTabs.forEach(tab=>tab.addEventListener("click",()=>{
  const index=Number.parseInt(tab.dataset.chapter,10);
  if(Number.isInteger(index)) showChapter(index);
}));

chapterPrev?.addEventListener("click",event=>{
  event.preventDefault();
  showChapter(activeChapter-1);
});

chapterNext?.addEventListener("click",event=>{
  event.preventDefault();
  if(activeChapter<chapters.length-1) showChapter(activeChapter+1);
});

/* Polaroid flip: click/keyboard changes the state; hover is decorative only. */
$$(".polaroid").forEach(card=>{
  card.addEventListener("click",()=>{
    const isCurrentlyFlipped=card.getAttribute("aria-pressed")==="true";
    const nextFlippedState=!isCurrentlyFlipped;
    card.classList.toggle("is-flipped",nextFlippedState);
    card.setAttribute("aria-pressed",String(nextFlippedState));
  });
});

/* Envelope and letter: reversible open/close + character-by-character reveal. */
const envelope=$("#envelope"),loveLetter=$("#loveLetter"),envelopeInstruction=$("#envelopeInstruction"),letterClose=$("#letterClose");
const letterParagraphs=loveLetter?[...loveLetter.querySelectorAll("p:not(.letter-date)")]:[];
const letterOriginal=letterParagraphs.map(node=>node.textContent);
let typingTimer=null;
let letterIsOpen=false;
function stopLetterTyping(reset=false){
  if(typingTimer) clearTimeout(typingTimer);
  typingTimer=null;
  if(reset) letterParagraphs.forEach((node,i)=>node.textContent=letterOriginal[i]||"");
}
function typeLetter(){
  stopLetterTyping(true);
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced){return;}
  letterParagraphs.forEach(node=>node.textContent="");
  let paragraphIndex=0,charIndex=0;
  const tick=()=>{
    if(!letterIsOpen)return;
    const node=letterParagraphs[paragraphIndex];
    if(!node){typingTimer=null;return;}
    const text=letterOriginal[paragraphIndex]||"";
    node.textContent=text.slice(0,charIndex+1);
    charIndex++;
    if(charIndex>=text.length){paragraphIndex++;charIndex=0;typingTimer=setTimeout(tick,260);}
    else typingTimer=setTimeout(tick,19);
  };
  tick();
}
function openLetter(){
  letterIsOpen=true;
  envelope?.classList.add("is-open");
  envelope?.setAttribute("aria-expanded","true");
  loveLetter?.classList.add("is-visible");
  loveLetter?.setAttribute("aria-hidden","false");
  envelopeInstruction && (envelopeInstruction.textContent="A LETTER, JUST FOR YOU ♡");
  typeLetter();
}
function closeLetter(){
  letterIsOpen=false;
  stopLetterTyping(true);
  envelope?.classList.remove("is-open");
  envelope?.setAttribute("aria-expanded","false");
  loveLetter?.classList.remove("is-visible");
  loveLetter?.setAttribute("aria-hidden","true");
  envelopeInstruction && (envelopeInstruction.textContent="TAP THE SEAL TO OPEN");
}
envelope?.addEventListener("click",()=>letterIsOpen?closeLetter():openLetter());
letterClose?.addEventListener("click",event=>{event.stopPropagation();closeLetter();});

/* Candle: blow out, show smoke, and relight whenever the visitor wishes. */
const flame=$("#flame"),smoke=$("#smoke"),blowButton=$("#blowCandle"),candleStatus=$("#candleStatus");
let candleIsLit=true;
blowButton?.setAttribute("aria-pressed","false");
blowButton?.addEventListener("click",()=>{
  candleIsLit=!candleIsLit;
  if(!candleIsLit){
    flame?.classList.add("is-out");
    if(smoke){smoke.classList.remove("is-visible");void smoke.offsetWidth;smoke.classList.add("is-visible");}
    if(candleStatus)candleStatus.textContent="Harapannya sudah dilepaskan ke semesta. ♡";
    blowButton.innerHTML='Nyalakan lagi <span>↗</span>';
    blowButton.setAttribute("aria-pressed","true");
  }else{
    flame?.classList.remove("is-out");
    smoke?.classList.remove("is-visible");
    if(candleStatus)candleStatus.textContent="Lilin menyala lagi. Buat satu harapan baru!";
    blowButton.innerHTML='Tiup lilin <span>✳</span>';
    blowButton.setAttribute("aria-pressed","false");
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
    item.classList.add("wish-enter");
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
