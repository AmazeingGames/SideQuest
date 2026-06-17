/* ============================================================================
   CONFIG  —  ✏️  LYNN: fill these two in after the backend setup (see SETUP.md)
   ============================================================================ */
const CONFIG = {
  // Paste your Google Apps Script Web App URL here (ends in /exec):
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyIvBQdu26qegJ0smyPYRRSjwBUn4HsJ57uxI1BkG8RrXx2zSJ4SG6ix1ZjtIDIRN8n/exec",
  // Paste your Google OAuth Client ID here (ends in .apps.googleusercontent.com):
  GOOGLE_CLIENT_ID: "253371814543-pv1eg7kvmh0hvovddogjbjt958fon5at.apps.googleusercontent.com",
};

const PEOPLE = [
  { id:"alvaro", name:"Álvaro" },
  { id:"blake",  name:"Blake"  },
  { id:"lia",    name:"Lia"    },
  { id:"lynn",   name:"Lynn"   },
];
const PMAP = Object.fromEntries(PEOPLE.map(p=>[p.id,p.name]));

/* genre → color family */
const GENRE_COLOR = {
  "Deckbuilder":"purple","Strategy":"amber","Turn-Based":"blue","Metroidvania":"teal",
  "Action Roguelike":"coral","Souls-like":"red","RPG":"green","Adventure":"blue",
  "Screensharable Story":"pink","Comedy":"amber","Rhythm":"pink","Difficult":"red",
  "Platformer":"green","Arcade":"blue","Stealth":"gray","Shooter":"coral","Social":"teal",
  "Unsimulator":"amber","Action Adventure":"blue"
};
const gColor = g => GENRE_COLOR[g] || "gray";

/* embedded seed — the site shows these instantly; the backend (once connected) replaces them */
const SEED_GAMES = [{"appid":"1865780","title":"Downfall: A Slay the Spire Fan Expansion","people":["blake","lynn"],"genres":["Deckbuilder"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"1092790","title":"Inscryption","people":["blake","lynn"],"genres":["Deckbuilder"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"590380","title":"Into the Breach","people":["blake","lynn"],"genres":["Strategy","Turn-Based"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"2084000","title":"Shogun Showdown","people":["blake","lynn"],"genres":["Strategy","Turn-Based","Deckbuilder"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"2097570","title":"StarVaders","people":["blake","lynn"],"genres":["Deckbuilder","Strategy"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"1948280","title":"Stacklands","people":["blake","lynn"],"genres":["Strategy"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"387290","title":"Ori and the Blind Forest","people":["blake","lynn","alvaro"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","players":2,"mods":true,"note":""},{"appid":"774361","title":"Blasphemous","people":["blake","lynn"],"genres":["Metroidvania"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"894020","title":"Death's Door","people":["blake","lynn"],"genres":["Metroidvania","Action Roguelike"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"606150","title":"Moonlighter","people":["blake","lynn"],"genres":["Action Roguelike"],"modes":[],"dim":"2D","players":1,"mods":false,"note":""},{"appid":"1466640","title":"Road 96","people":["alvaro","lynn"],"genres":["Screensharable Story"],"modes":[],"dim":"3D","players":1,"mods":false,"note":""},{"appid":"1622910","title":"Still Wakes the Deep","people":["alvaro","lynn"],"genres":["Screensharable Story"],"modes":[],"dim":"3D","players":1,"mods":false,"note":""},{"appid":"303210","title":"The Beginner's Guide","people":["alvaro","lynn"],"genres":["Screensharable Story"],"modes":[],"dim":"3D","players":1,"mods":false,"note":""},{"appid":"367520","title":"Hollow Knight","people":["alvaro","lynn"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","players":2,"mods":true,"note":""},{"appid":"283640","title":"Salt and Sanctuary","people":["alvaro","lynn"],"genres":["Metroidvania","Souls-like"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"1245620","title":"Elden Ring","people":["alvaro","lynn"],"genres":["Souls-like"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"1282100","title":"Remnant II","people":["alvaro","lynn"],"genres":["Souls-like"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"2849490","title":"Outward 2","people":["alvaro","lynn"],"genres":["Souls-like"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"787810","title":"Rogue Heroes: Ruins of Tasos","people":["alvaro","lynn"],"genres":["RPG"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":"Inspired by Zelda games"},{"appid":"1982340","title":"Blanc","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"1071870","title":"Biped","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"1225570","title":"Unravel Two","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"1801110","title":"BOKURA","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"295790","title":"Never Alone","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"2111550","title":"Schrodinger's Cat Burglar","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"2129530","title":"REANIMAL","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"1051950","title":"Voyage","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"972660","title":"Spiritfarer","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"2001120","title":"Split Fiction","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"837470","title":"Untitled Goose Game","people":["blake","lia"],"genres":["Comedy"],"modes":["Co-op"],"dim":"3D","players":2,"mods":false,"note":""},{"appid":"291860","title":"Pit People","people":["blake","lia"],"genres":["Strategy"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"701160","title":"Kingdom Two Crowns","people":["blake","lia"],"genres":["Strategy"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"774181","title":"Rhythm Doctor","people":["blake","lia"],"genres":["Rhythm"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"1062110","title":"UNSIGHTED","people":["blake","lia"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"534550","title":"Guacamelee 2","people":["blake","lia"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"330020","title":"Children of Morta","people":["blake","lia"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"311690","title":"Enter the Gungeon","people":["blake","lia"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"268910","title":"Cuphead","people":["blake","lia"],"genres":["Difficult"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"1411020","title":"Perennial Order","people":["blake","lia"],"genres":["Difficult"],"modes":["Co-op"],"dim":"2D","players":2,"mods":false,"note":""},{"appid":"1244090","title":"Sea of Stars","people":["blake","lia","lynn"],"genres":["Strategy","Turn-Based","RPG"],"modes":["Co-op"],"dim":"2D","players":3,"mods":false,"note":"Turn-Based JRPG"},{"appid":"1911610","title":"Windblown","people":["blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"3D","players":3,"mods":false,"note":"Fast-paced fantasy hack and slash"},{"appid":"958520","title":"33 Immortals","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Massively multiplayer, fantasy, hand-drawn"},{"appid":"1280930","title":"Astral Ascent","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Hack and slash, magic"},{"appid":"585710","title":"Blazing Beaks","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op","Competitive"],"dim":"2D","players":4,"mods":false,"note":"Top-down shooter"},{"appid":"293780","title":"Crawl","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Competitive"],"dim":"2D","players":4,"mods":false,"note":"Party, dungeon crawl"},{"appid":"247080","title":"Crypt of the NecroDancer","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike","Rhythm"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Dungeon crawler, rhythm"},{"appid":"1135230","title":"Ember Knights","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike","RPG"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"2071280","title":"Ravenswatch","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Hack and slash"},{"appid":"1337520","title":"Risk of Rain Returns","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"2015270","title":"Rotwood","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Beat 'em up"},{"appid":"2444750","title":"Shape of Dreams","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"1975580","title":"Wild Woods","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Hack and slash"},{"appid":"1833200","title":"DuneCrawl","people":["alvaro","blake","lia","lynn"],"genres":["Action Adventure"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Campaign, open world"},{"appid":"432980","title":"INVERSUS Deluxe","people":["alvaro","blake","lia","lynn"],"genres":["Arcade"],"modes":["Co-op","Competitive"],"dim":"2D","players":4,"mods":false,"note":"Top-down shooter"},{"appid":"422110","title":"Wand Wars","people":["alvaro","blake","lia","lynn"],"genres":["Arcade"],"modes":["Co-op","Competitive"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"418530","title":"Spelunky 2","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Co-op","Competitive"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"323850","title":"Move or Die","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","players":4,"mods":false,"note":"Party"},{"appid":"230270","title":"N++ (NPLUSPLUS)","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Precision platformer"},{"appid":"207140","title":"SpeedRunners","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","players":4,"mods":false,"note":"Party"},{"appid":"674940","title":"Stick Fight: The Game","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","players":4,"mods":false,"note":"Party"},{"appid":"386940","title":"Ultimate Chicken Horse","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","players":4,"mods":false,"note":"Party"},{"appid":"1436700","title":"Trine 5: A Clockwork Conspiracy","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":"Puzzle"},{"appid":"113020","title":"Monaco: What's Yours Is Mine","people":["alvaro","blake","lia","lynn"],"genres":["Stealth"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"1676840","title":"For The King II","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":"Roguelite"},{"appid":"4662350","title":"Chess 2","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Competitive"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"1618380","title":"Spellmasons","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"763890","title":"Wildermyth","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based","RPG"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"607050","title":"Wargroove","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Co-op","Competitive"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"728880","title":"Overcooked! 2","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"996770","title":"Moving Out","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"1599600","title":"PlateUp!","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator"],"modes":["Co-op"],"dim":"2D","players":4,"mods":false,"note":""},{"appid":"1812560","title":"Super Crazy Rhythm Castle","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator","Rhythm"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"1217060","title":"Gunfire Reborn","people":["alvaro","blake","lia","lynn"],"genres":["Shooter","Action Roguelike"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"632360","title":"Risk of Rain 2","people":["alvaro","blake","lia","lynn"],"genres":["Shooter","Action Roguelike"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"3527290","title":"PEAK","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":"Physics"},{"appid":"3097560","title":"Liar's Bar","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Competitive"],"dim":"3D","players":4,"mods":false,"note":"Tabletop"},{"appid":"286160","title":"Tabletop Simulator","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op","Competitive"],"dim":"3D","players":4,"mods":false,"note":"Tabletop"},{"appid":"1966720","title":"Lethal Company","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"3892270","title":"Gamble With Your Friends","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"3146520","title":"WEBFISHING","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"3438850","title":"Sledding Game","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""},{"appid":"2881650","title":"Content Warning","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","players":4,"mods":false,"note":""}];

/* ===========================================================================
   SIDE QUEST  —  client app
   =========================================================================== */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k,v) => { try { localStorage.setItem(k,v); } catch {} };
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const hasBackend = () => !!CONFIG.APPS_SCRIPT_URL;
const hasAuth = () => !!CONFIG.GOOGLE_CLIENT_ID;
const COVER = a => `https://cdn.cloudflare.steamstatic.com/steam/apps/${a}/header.jpg`;
const HEADER = a => `https://cdn.cloudflare.steamstatic.com/steam/apps/${a}/header.jpg`;
const STEAM_URL = a => `https://store.steampowered.com/app/${a}/`;
// ordered list of fallback image URLs tried in turn if the primary 404s
const COVER_FALLBACKS = a => [
  `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${a}/header.jpg`,
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${a}/header.jpg`,
  `https://steamcdn-a.akamaihd.net/steam/apps/${a}/header.jpg`,
].join("|");
window.imgFB = function(img){
  const fb=(img.dataset.fb||"").split("|").filter(Boolean);
  if(fb.length){ img.dataset.fb=fb.slice(1).join("|"); img.src=fb[0]; }
  else { img.style.visibility="hidden"; }   // reveal the placeholder behind it
};

const state = {
  games: [], comments: [], upvotes: [], users: [],
  party: [], matchMode: "all",
  genres: new Set(), modes: new Set(), dims: new Set(), modsOnly: false,
  search: "", sort: "rating",
  user: null, idToken: null,
};

/* ---------------------------------------------------------------- people pics */
function initials(name){ return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
function personDot(id, cls="pa"){ const n=PMAP[id]||id; return `<span class="${cls} pa-${id}" title="${esc(n)}">${esc(n[0])}</span>`; }

/* ---------------------------------------------------------------- review style */
function reviewMeta(g){
  if(g.reviewPct==null||g.reviewPct==="") return {cls:"none", label: hasBackend()?"No reviews yet":"— connect backend"};
  const p=Math.round(g.reviewPct);
  const cls = p>=70?"pos":p>=40?"mixed":"neg";
  return {cls, label:`${p}%`, desc:g.reviewDesc||""};
}

/* ============================================================ DATA LOADING */
async function loadData(){
  // start from seed so the page is never empty
  applyGames(SEED_GAMES.map(g=>({...g})));
  if(hasBackend()){
    try{
      const r = await fetch(CONFIG.APPS_SCRIPT_URL+"?action=data", {method:"GET"});
      const d = await r.json();
      if(d && d.ok){
        applyGames(d.games||[]);
        state.comments = d.comments||[];
        state.upvotes  = d.upvotes||[];
        state.users    = d.users||[];
        if(state.user) syncUserName();
      }
    }catch(e){ console.warn("Backend load failed, using seed.", e); toast("Couldn't reach the backend — showing the built-in list.","err"); }
  }
  render();
}
function applyGames(arr){
  state.games = arr.map(g=>({
    appid:String(g.appid), title:g.title||"", people:g.people||[], genres:g.genres||[],
    modes:g.modes||[], dim:g.dim||"", players:+g.players||1, mods:!!g.mods, note:g.note||"",
    reviewPct:(g.reviewPct===0||g.reviewPct)?+g.reviewPct:null, reviewDesc:g.reviewDesc||"",
    releaseDate:g.releaseDate||"", releaseTs:+g.releaseTs||0, addedTs:+g.addedTs||0, trailer:g.trailer||"",
  }));
}
const upCount = appid => state.upvotes.filter(u=>u.appid===String(appid)).length;
const userUpvoted = appid => !!(state.user && state.upvotes.find(u=>u.appid===String(appid)&&u.email===state.user.email));
const gameComments = appid => state.comments.filter(c=>c.appid===String(appid)).sort((a,b)=>a.ts-b.ts);

/* ============================================================ FILTER + RENDER */
function visibleGames(){
  let g = state.games.slice();
  const q = state.search.trim().toLowerCase();
  if(q) g = g.filter(x=>x.title.toLowerCase().includes(q) || x.genres.some(z=>z.toLowerCase().includes(q)));
  if(state.party.length){
    const n=state.party.length;
    g = g.filter(x=>{
      const hits = state.party.filter(p=>x.people.includes(p)).length;
      const peopleOk = state.matchMode==="all" ? hits===n : hits>0;
      return peopleOk && x.players>=n;          // supports that many players
    });
  }
  if(state.genres.size) g = g.filter(x=>[...state.genres].every(z=>x.genres.includes(z)));
  if(state.modes.size)  g = g.filter(x=>[...state.modes].every(z=>x.modes.includes(z)));
  if(state.dims.size)   g = g.filter(x=>state.dims.has(x.dim));
  if(state.modsOnly)    g = g.filter(x=>x.mods);
  const s=state.sort;
  g.sort((a,b)=>{
    if(s==="az")      return a.title.localeCompare(b.title);
    if(s==="upvotes") return upCount(b.appid)-upCount(a.appid) || a.title.localeCompare(b.title);
    if(s==="release") return (b.releaseTs||0)-(a.releaseTs||0) || a.title.localeCompare(b.title);
    if(s==="added")   return (b.addedTs||0)-(a.addedTs||0) || a.title.localeCompare(b.title);
    const ra=a.reviewPct??-1, rb=b.reviewPct??-1;     // rating
    return rb-ra || a.title.localeCompare(b.title);
  });
  return g;
}

function render(){ renderParty(); renderFilters(); renderGrid(); renderSetupBanner(); }

function renderGrid(){
  const games = visibleGames();
  $("#count").innerHTML = `<b>${games.length}</b> ${games.length===1?"game":"games"}`;
  const grid=$("#grid"), empty=$("#emptyState");
  if(!games.length){
    grid.innerHTML="";
    empty.innerHTML = `<div class="empty"><i class="ti ti-ghost-2" aria-hidden="true"></i>
      <h3>No games match</h3><p>Try removing a filter or switching to “Any of them”.</p></div>`;
    return;
  }
  empty.innerHTML="";
  grid.innerHTML = games.map(g=>{
    const rv=reviewMeta(g), uc=upCount(g.appid);
    const ppl = g.people.map(p=>personDot(p)).join("");
    const tags = g.genres.slice(0,3).map(t=>`<span class="tag g-${gColor(t)}">${esc(t)}</span>`).join("");
    return `<button class="card" data-app="${g.appid}" aria-label="${esc(g.title)}">
      <div class="cover">
        <div class="ph"><i class="ti ti-device-gamepad-2"></i></div>
        <img loading="lazy" src="${COVER(g.appid)}" alt="" data-fb="${COVER_FALLBACKS(g.appid)}" onerror="imgFB(this)">
        ${g.mods?`<span class="mods-badge"><i class="ti ti-alert-triangle"></i>Mods</span>`:""}
        ${uc?`<span class="up-badge"><i class="ti ti-arrow-big-up-lines"></i>${uc}</span>`:""}
      </div>
      <div class="cbody">
        <div class="ctitle">${esc(g.title)}</div>
        <div class="crow">
          <span class="review ${rv.cls}">${rv.cls!=="none"?'<i class="ti ti-thumb-up" style="font-size:13px"></i>':""}${esc(rv.label)}</span>
          <span class="ppl">${ppl}</span>
        </div>
        <div class="tags">${tags}</div>
      </div>
    </button>`;
  }).join("");
  $$(".card",grid).forEach(c=>c.addEventListener("click",()=>openDetail(c.dataset.app)));
}

/* ----------------------------------------------------------------- party UI */
function renderParty(){
  const row=$("#partyRow");
  row.innerHTML = PEOPLE.map(p=>{
    const on=state.party.includes(p.id);
    return `<button class="person" data-p="${p.id}" aria-pressed="${on}">
      <span class="pa pa-${p.id}">${esc(p.name[0])}</span>${esc(p.name)}</button>`;
  }).join("");
  $$(".person",row).forEach(b=>b.addEventListener("click",()=>togglePerson(b.dataset.p)));
  const n=state.party.length, ro=$("#partyReadout");
  if(!n){ ro.innerHTML="No one selected — showing everything"; }
  else{
    const names=state.party.map(id=>PMAP[id]);
    const joined = names.length===1?names[0]:names.slice(0,-1).join(", ")+" & "+names.slice(-1);
    const mode = state.matchMode==="all" ? "everyone likes" : "anyone likes";
    ro.innerHTML = `Games <b>${esc(joined)}</b> can play — ${mode}, <b>${n}+ player${n>1?"s":""}</b>`;
  }
  $("#clearParty").hidden = !n;
  $("#modeAll").setAttribute("aria-pressed", state.matchMode==="all");
  $("#modeAny").setAttribute("aria-pressed", state.matchMode==="any");
}
function togglePerson(id){
  const i=state.party.indexOf(id);
  if(i>=0) state.party.splice(i,1); else state.party.push(id);
  render();
}

/* ----------------------------------------------------------------- filters */
function renderFilters(){
  const bar=$("#filterbar");
  const allGenres=[...new Set(state.games.flatMap(g=>g.genres))].sort();
  const genreChips = allGenres.map(g=>`<button class="chip" data-f="genre" data-v="${esc(g)}" aria-pressed="${state.genres.has(g)}">${esc(g)}</button>`).join("");
  const modeChips = ["Co-op","Competitive"].map(m=>`<button class="chip" data-f="mode" data-v="${m}" aria-pressed="${state.modes.has(m)}">${m}</button>`).join("");
  const dimChips = ["2D","3D"].map(d=>`<button class="chip" data-f="dim" data-v="${d}" aria-pressed="${state.dims.has(d)}">${d}</button>`).join("");
  bar.innerHTML = `
    <div class="fgroup"><span class="flabel">Genre</span>${genreChips}</div>
    <div class="divider"></div>
    <div class="fgroup"><span class="flabel">Mode</span>${modeChips}</div>
    <div class="divider"></div>
    <div class="fgroup">${dimChips}
      <button class="chip" data-f="mods" aria-pressed="${state.modsOnly}"><i class="ti ti-alert-triangle" style="font-size:13px;vertical-align:-1px"></i> Mods</button>
    </div>
    ${(state.genres.size||state.modes.size||state.dims.size||state.modsOnly)?`<button class="ghostbtn" id="clearFilters">Clear filters</button>`:""}`;
  $$(".chip",bar).forEach(c=>c.addEventListener("click",()=>{
    const f=c.dataset.f, v=c.dataset.v;
    if(f==="genre") state.genres.has(v)?state.genres.delete(v):state.genres.add(v);
    else if(f==="mode") state.modes.has(v)?state.modes.delete(v):state.modes.add(v);
    else if(f==="dim") state.dims.has(v)?state.dims.delete(v):state.dims.add(v);
    else if(f==="mods") state.modsOnly=!state.modsOnly;
    render();
  }));
  const cf=$("#clearFilters"); if(cf) cf.addEventListener("click",()=>{
    state.genres.clear(); state.modes.clear(); state.dims.clear(); state.modsOnly=false; render();
  });
}

/* ============================================================ DETAIL MODAL */
function openDetail(appid){
  const g=state.games.find(x=>x.appid===String(appid)); if(!g) return;
  const rv=reviewMeta(g), uc=upCount(g.appid), up=userUpvoted(g.appid);
  const comments=gameComments(g.appid);
  const genreTags=g.genres.map(t=>`<span class="tag g-${gColor(t)}">${esc(t)}</span>`).join("");
  const modeTags=g.modes.map(m=>`<span class="tag mode">${esc(m)}</span>`).join("")+`<span class="tag mode">${g.dim}</span>`;
  const pplTags=g.people.map(p=>`<button class="chip" data-pp="${p}" aria-pressed="${state.party.includes(p)}" style="display:inline-flex;align-items:center;gap:7px">${personDot(p,"pa")}${esc(PMAP[p])}</button>`).join("");

  const commentHTML = comments.length ? comments.map(c=>{
    const mine = state.user && c.email===state.user.email;
    const av = c.picture ? `<span class="pa"><img src="${esc(c.picture)}" alt=""></span>` : `<span class="pa">${esc(initials(c.name||"?"))}</span>`;
    return `<div class="comment">${av}<div style="flex:1">
      <div class="cmeta"><span class="cn">${esc(c.name||"Someone")}</span><span class="ct">${timeAgo(c.ts)}</span>
        ${mine?`<button class="cdel" data-del="${esc(c.id)}">delete</button>`:""}</div>
      <div class="cbubble">${esc(c.text)}</div></div></div>`;
  }).join("") : `<p style="color:var(--text3);font-size:13.5px">No comments yet — start the thread.</p>`;

  const commentForm = state.user
    ? `<div class="cform">
         <span class="pa" style="flex-shrink:0;width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;color:#fff;background:var(--accent-strong)">${state.user.picture?`<img src="${esc(state.user.picture)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`:esc(initials(state.user.name))}</span>
         <textarea id="cInput" placeholder="Add a comment…" aria-label="Add a comment"></textarea>
         <button class="btn primary" id="cPost" style="align-self:stretch">Post</button>
       </div>`
    : `<div class="signin-hint">Sign in with Google to upvote and comment.</div>`;

  $("#detailModal").innerHTML = `
    <button class="mclose" aria-label="Close"><i class="ti ti-x"></i></button>
    <div class="dhero" id="dhero">
      <img src="${HEADER(g.appid)}" alt="" data-fb="${COVER_FALLBACKS(g.appid)}" onerror="imgFB(this)">
      ${g.trailer?`<button class="playbtn" id="playTrailer"><i class="ti ti-player-play-filled"></i> Watch trailer</button>`:""}
      <div class="scrimgrad"></div>
    </div>
    <div class="dbody">
      <h2 class="dtitle">${esc(g.title)}</h2>
      <div class="dmeta">
        <span class="review ${rv.cls}" style="font-size:14px">${rv.cls!=="none"?'<i class="ti ti-thumb-up" style="font-size:15px"></i> ':""}${esc(rv.label)}${rv.desc?` · ${esc(rv.desc)}`:""}</span>
        ${g.releaseDate?`<span style="color:var(--text3);font-size:13px"><i class="ti ti-calendar" style="font-size:14px;vertical-align:-2px"></i> ${esc(g.releaseDate)}</span>`:""}
      </div>
      <div class="dnote ${g.note?"":"empty-note"}">${g.note?esc(g.note):"No notes yet — Lynn can add thoughts here later."}</div>
      ${g.mods?`<div class="modwarn"><i class="ti ti-alert-triangle"></i><div><b>Mods required.</b> This one needs a mod to play together — check the Steam discussions or ask Lynn before your session.</div></div>`:""}

      <div class="dsection"><h3>Genres</h3><div class="dtags">${genreTags}</div></div>
      <div class="dsection"><h3>Plays as</h3><div class="dtags">${modeTags}</div></div>
      <div class="dsection"><h3>Tap a name to filter the list</h3><div class="dtags">${pplTags}</div></div>

      <div class="dactions">
        <button class="upbtn" id="upBtn" aria-pressed="${up}">
          <i class="ti ti-arrow-big-up-lines"></i><span id="upTxt">${up?"Upvoted":"Upvote"}</span>
          <span style="opacity:.7">·</span><span id="upNum">${uc}</span></button>
        <a class="steamlink" href="${STEAM_URL(g.appid)}" target="_blank" rel="noopener">View on Steam <i class="ti ti-external-link" style="font-size:14px"></i></a>
      </div>

      <div class="dsection"><h3>Discussion</h3>
        <div class="comments" id="commentList">${commentHTML}</div>
        ${commentForm}
      </div>
    </div>`;

  const m=$("#detailModal");
  m.querySelector(".mclose").addEventListener("click",closeModals);
  $$("[data-pp]",m).forEach(b=>b.addEventListener("click",()=>{ togglePerson(b.dataset.pp); closeModals(); }));
  $$("[data-del]",m).forEach(b=>b.addEventListener("click",()=>delComment(b.dataset.del,g.appid)));
  const upB=$("#upBtn",m); if(upB) upB.addEventListener("click",()=>toggleUpvote(g.appid));
  const cp=$("#cPost",m); if(cp) cp.addEventListener("click",()=>postComment(g.appid));
  const pt=$("#playTrailer",m); if(pt) pt.addEventListener("click",()=>{
    const hero=$("#dhero",m);
    hero.innerHTML=`<video src="${esc(g.trailer)}" controls autoplay playsinline poster="${HEADER(g.appid)}"></video>`;
  });
  openScrim("#detailScrim");
}

/* ============================================================ UPVOTES */
async function toggleUpvote(appid){
  if(!requireUser()) return;
  appid=String(appid);
  const had=userUpvoted(appid);
  // optimistic
  if(had) state.upvotes=state.upvotes.filter(u=>!(u.appid===appid&&u.email===state.user.email));
  else state.upvotes.push({appid, email:state.user.email, ts:Date.now()});
  refreshUpUI(appid); renderGrid();
  if(hasBackend()){
    const r=await api({action:"toggleUpvote", appid});
    if(!r||!r.ok){ toast("Vote didn't save.","err"); }
  }
}
function refreshUpUI(appid){
  const b=$("#upBtn"); if(!b) return;
  const up=userUpvoted(appid);
  b.setAttribute("aria-pressed",up);
  $("#upTxt").textContent=up?"Upvoted":"Upvote";
  $("#upNum").textContent=upCount(appid);
}

/* ============================================================ COMMENTS */
async function postComment(appid){
  if(!requireUser()) return;
  const ta=$("#cInput"); const text=(ta.value||"").trim(); if(!text) return;
  const tmp={ id:"tmp_"+Date.now(), appid:String(appid), email:state.user.email,
    name:state.user.name, picture:state.user.picture, text, ts:Date.now() };
  state.comments.push(tmp); ta.value=""; reopenDetail(appid);
  if(hasBackend()){
    const r=await api({action:"addComment", appid:String(appid), text});
    if(r&&r.ok&&r.comment){ tmp.id=r.comment.id; }
    else toast("Comment didn't save.","err");
  }
}
async function delComment(id,appid){
  state.comments=state.comments.filter(c=>c.id!==id); reopenDetail(appid);
  if(hasBackend()){ const r=await api({action:"deleteComment", id}); if(!r||!r.ok) toast("Couldn't delete.","err"); }
}
function reopenDetail(appid){ renderGrid(); openDetail(appid); }

/* ============================================================ ADD GAME */
function openAdd(){
  if(hasAuth() && !requireUser()) return;  // require sign-in only once auth is set up
  const genrePool=[...new Set([...Object.keys(GENRE_COLOR), ...state.games.flatMap(g=>g.genres)])].sort();
  $("#addModal").innerHTML=`
    <button class="mclose" aria-label="Close"><i class="ti ti-x"></i></button>
    <div class="form-head"><h2>Add a game</h2><p>Paste a Steam link — the rest fills in from there. Goes live right away.</p></div>
    <div class="fbody">
      <div class="field"><label>Steam link or App ID</label>
        <input id="aUrl" type="text" placeholder="https://store.steampowered.com/app/367520/…">
        <div class="hint">We'll pull the title, cover art, review score and release date from Steam.</div></div>
      <div class="field"><label>Who's it for?</label>
        <div class="pickrow" id="aPeople">${PEOPLE.map(p=>`<button class="pick" data-v="${p.id}" aria-pressed="false">${esc(p.name)}</button>`).join("")}</div></div>
      <div class="field"><label>Genres</label>
        <div class="pickrow" id="aGenres">${genrePool.map(g=>`<button class="pick" data-v="${esc(g)}" aria-pressed="false">${esc(g)}</button>`).join("")}</div>
        <div class="hint">Pick existing tags, or type a new one below.</div>
        <input id="aGenreNew" type="text" placeholder="New genre (optional)" style="margin-top:7px"></div>
      <div class="two">
        <div class="field"><label>Mode</label>
          <div class="pickrow" id="aModes">${["Co-op","Competitive"].map(m=>`<button class="pick" data-v="${m}" aria-pressed="false">${m}</button>`).join("")}</div></div>
        <div class="field"><label>Dimension</label>
          <div class="pickrow" id="aDim">${["2D","3D"].map(d=>`<button class="pick" data-v="${d}" aria-pressed="false">${d}</button>`).join("")}</div></div>
      </div>
      <div class="two">
        <div class="field"><label>Max players</label><input id="aPlayers" type="number" min="1" max="64" value="4"></div>
        <div class="field"><label>Mods required?</label>
          <div class="pickrow" id="aMods"><button class="pick" data-v="yes" aria-pressed="false">Yes, needs mods</button></div></div>
      </div>
      <div class="field"><label>Note (optional)</label><textarea id="aNote" placeholder="A line about why it's here…"></textarea></div>
      <div class="formfoot">
        <button class="btn" id="aCancel">Cancel</button>
        <button class="btn primary" id="aSave">Add to list</button>
      </div>
    </div>`;
  const m=$("#addModal");
  m.querySelector(".mclose").addEventListener("click",closeModals);
  $("#aCancel",m).addEventListener("click",closeModals);
  $$(".pick",m).forEach(b=>{ if(!b.closest("#aDim")&&!b.closest("#aMods")){ b.addEventListener("click",()=>b.setAttribute("aria-pressed", b.getAttribute("aria-pressed")!=="true")); }});
  // dim is single-select
  $$("#aDim .pick",m).forEach(b=>b.addEventListener("click",()=>{ $$("#aDim .pick").forEach(x=>x.setAttribute("aria-pressed","false")); b.setAttribute("aria-pressed","true"); }));
  $$("#aMods .pick",m).forEach(b=>b.addEventListener("click",()=>b.setAttribute("aria-pressed", b.getAttribute("aria-pressed")!=="true")));
  $("#aSave",m).addEventListener("click",saveGame);
  openScrim("#addScrim");
}
function parseAppId(s){ const m=String(s).match(/\/app\/(\d+)/)||String(s).match(/^(\d+)$/); return m?m[1]:null; }
async function saveGame(){
  const appid=parseAppId($("#aUrl").value.trim());
  if(!appid){ toast("Paste a valid Steam link or App ID.","err"); return; }
  if(state.games.find(g=>g.appid===appid)){ toast("That game's already on the list.","err"); return; }
  const sel = sec => $$(`#${sec} .pick[aria-pressed="true"]`).map(b=>b.dataset.v);
  const genres = sel("aGenres");
  const ng=$("#aGenreNew").value.trim(); if(ng&&!genres.includes(ng)) genres.push(ng);
  const game={ appid, people:sel("aPeople"), genres, modes:sel("aModes"),
    dim:(sel("aDim")[0]||"2D"), players:+$("#aPlayers").value||1,
    mods:sel("aMods").includes("yes"), note:$("#aNote").value.trim() };
  if(!game.people.length){ toast("Pick at least one person it's for.","err"); return; }
  const btn=$("#aSave"); btn.disabled=true; btn.innerHTML=`<i class="ti ti-loader-2 spin"></i> Adding…`;

  if(hasBackend()){
    const r=await api({action:"addGame", game});
    if(r&&r.ok&&r.game){ state.games.push(normalize(r.game)); toast("Added!"); }
    else { btn.disabled=false; btn.textContent="Add to list"; toast(r&&r.error?r.error:"Couldn't add the game.","err"); return; }
  } else {
    game.title = "App "+appid; game.reviewPct=null; game.addedTs=Date.now();
    state.games.push(normalize(game));
    toast("Added locally — connect the backend to save it for everyone.");
  }
  closeModals(); render();
}
function normalize(g){ return {appid:String(g.appid),title:g.title||"",people:g.people||[],genres:g.genres||[],modes:g.modes||[],dim:g.dim||"2D",players:+g.players||1,mods:!!g.mods,note:g.note||"",reviewPct:(g.reviewPct===0||g.reviewPct)?+g.reviewPct:null,reviewDesc:g.reviewDesc||"",releaseDate:g.releaseDate||"",releaseTs:+g.releaseTs||0,trailer:g.trailer||"",addedTs:+g.addedTs||Date.now()}; }

/* ============================================================ AUTH (Google) */
let gisReady=false;
function initAuth(){
  renderAuthSlot();
  if(!hasAuth()) return;
  const tryInit=()=>{
    if(!(window.google&&google.accounts&&google.accounts.id)) return setTimeout(tryInit,300);
    google.accounts.id.initialize({ client_id:CONFIG.GOOGLE_CLIENT_ID, callback:onCredential, auto_select:true });
    gisReady=true;
    renderAuthSlot();          // now that GIS is loaded, draw the real Google button
  };
  tryInit();
}
function onCredential(resp){
  const p=decodeJwt(resp.credential); if(!p) return;
  state.idToken=resp.credential;
  state.user={ email:p.email, googleName:p.name||p.given_name||"Player", name:p.name||p.given_name||"Player", picture:p.picture||"" };
  syncUserName();
  renderAuthSlot();
  if(hasBackend()) refreshAfterAuth();
  // first-time: let them set a display name
  const known = state.users.find(u=>u.email===state.user.email);
  if(!known && !lsGet("sq_named_"+state.user.email)) openNameModal(true);
  toast(`Welcome, ${state.user.name}!`);
}
async function refreshAfterAuth(){ try{ await loadData(); }catch{} }
function syncUserName(){
  if(!state.user) return;
  const u=state.users.find(x=>x.email===state.user.email);
  if(u&&u.displayName) state.user.name=u.displayName;
}
function decodeJwt(t){ try{ return JSON.parse(atob(t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))); }catch{ return null; } }
function requireUser(){ if(state.user) return true; toast("Sign in with the Google button (top-right) first."); promptSignIn(); return false; }
function promptSignIn(){ try{ if(gisReady) google.accounts.id.prompt(); }catch(e){} }

function renderAuthSlot(){
  const slot=$("#authSlot");
  if(state.user){
    const av=state.user.picture?`<img class="avatar" src="${esc(state.user.picture)}" alt="">`:`<span class="avatar">${esc(initials(state.user.name))}</span>`;
    slot.innerHTML=`<button class="userchip" id="userChip" aria-label="Account">${av}<span class="nm">${esc(state.user.name)}</span><i class="ti ti-chevron-down" style="font-size:15px;color:var(--text3)"></i></button>`;
    $("#userChip").addEventListener("click",openNameModal);
  } else if(hasAuth()){
    slot.innerHTML=`<div id="gbtn"></div>`;
    if(gisReady){
      try{
        const dark=document.documentElement.getAttribute("data-theme")==="dark";
        google.accounts.id.renderButton($("#gbtn"), {theme: dark?"filled_blue":"outline", size:"large", type:"standard", shape:"pill", text:"signin"});
      }catch(e){
        slot.innerHTML=`<button class="iconbtn" id="signinBtn"><i class="ti ti-brand-google" aria-hidden="true"></i>Sign in</button>`;
        $("#signinBtn").addEventListener("click",promptSignIn);
      }
    } else {
      slot.innerHTML=`<button class="iconbtn" disabled style="opacity:.6"><i class="ti ti-brand-google" aria-hidden="true"></i>Sign in</button>`;
    }
  } else {
    slot.innerHTML="";
  }
}

/* ----------------------------------------------------------------- name modal */
function openNameModal(first){
  if(!state.user){ promptSignIn(); return; }
  $("#nameModal").innerHTML=`
    <button class="mclose" aria-label="Close"><i class="ti ti-x"></i></button>
    <div class="form-head"><h2>${first===true?"Pick your display name":"Your account"}</h2>
      <p>${first===true?"How should the crew see you on the site?":esc(state.user.email)}</p></div>
    <div class="fbody">
      <div class="field"><label>Display name</label><input id="nName" type="text" value="${esc(state.user.name)}" maxlength="40"></div>
      <div class="formfoot">
        ${first===true?"":`<button class="btn" id="nSignout">Sign out</button>`}
        <button class="btn primary" id="nSave">Save</button>
      </div>
    </div>`;
  const m=$("#nameModal");
  m.querySelector(".mclose").addEventListener("click",closeModals);
  const so=$("#nSignout",m); if(so) so.addEventListener("click",signOut);
  $("#nSave",m).addEventListener("click",saveName);
  openScrim("#nameScrim");
}
async function saveName(){
  const v=$("#nName").value.trim()||state.user.googleName;
  state.user.name=v;
  let u=state.users.find(x=>x.email===state.user.email);
  if(u) u.displayName=v; else state.users.push({email:state.user.email, displayName:v});
  lsSet("sq_named_"+state.user.email,"1");
  renderAuthSlot(); closeModals(); render();
  if(hasBackend()){ const r=await api({action:"setName", displayName:v}); if(!r||!r.ok) toast("Name didn't save to the server.","err"); }
}
function signOut(){
  if(hasAuth()&&window.google&&google.accounts) google.accounts.id.disableAutoSelect();
  state.user=null; state.idToken=null; renderAuthSlot(); closeModals(); render(); toast("Signed out.");
}

/* ============================================================ BACKEND POST */
async function api(payload){
  if(!hasBackend()) return {ok:false,error:"No backend configured"};
  try{
    const r=await fetch(CONFIG.APPS_SCRIPT_URL,{
      method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"},  // text/plain avoids CORS preflight
      body:JSON.stringify({...payload, idToken:state.idToken}),
    });
    return await r.json();
  }catch(e){ console.warn("api error",e); return {ok:false,error:"Network error"}; }
}

/* ============================================================ MODAL PLUMBING */
function openScrim(sel){ closeModals(); const s=$(sel); s.classList.add("open"); document.body.style.overflow="hidden";
  s.onclick=e=>{ if(e.target===s) closeModals(); }; }
function closeModals(){ $$(".scrim").forEach(s=>s.classList.remove("open")); document.body.style.overflow=""; }
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModals(); });

/* ----------------------------------------------------------------- helpers */
function timeAgo(ts){ if(!ts) return ""; const s=(Date.now()-ts)/1000;
  if(s<60) return "just now"; if(s<3600) return Math.floor(s/60)+"m ago";
  if(s<86400) return Math.floor(s/3600)+"h ago"; if(s<604800) return Math.floor(s/86400)+"d ago";
  return new Date(ts).toLocaleDateString(); }
let toastT;
function toast(msg,kind){ const t=$("#toast"); t.textContent=msg; t.className="toast show"+(kind==="err"?" err":"");
  clearTimeout(toastT); toastT=setTimeout(()=>t.className="toast",2600); }

function renderSetupBanner(){
  const b=$("#setupBanner");
  if(hasBackend()){ b.innerHTML=""; return; }
  b.innerHTML=`<div class="banner"><i class="ti ti-plug-connected"></i>
    <span><b>Preview mode.</b> Showing the built-in list. Connect the Google Sheet backend (see SETUP.md) so reviews load and votes/comments save for everyone.</span></div>`;
}

/* ============================================================ THEME */
function setTheme(t){
  document.documentElement.setAttribute("data-theme",t); lsSet("sq_theme",t);
  $("#themeIcon").className = t==="dark"?"ti ti-moon":"ti ti-sun";
  if(!state.user && hasAuth() && gisReady) renderAuthSlot();   // re-skin Google button to match theme
}
$("#themeBtn").addEventListener("click",()=>setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark"));

/* ============================================================ BOOT */
$("#search").addEventListener("input",e=>{ state.search=e.target.value; renderGrid(); });
$("#sort").addEventListener("change",e=>{ state.sort=e.target.value; renderGrid(); });
$("#addBtn").addEventListener("click",openAdd);
$("#modeAll").addEventListener("click",()=>{ state.matchMode="all"; render(); });
$("#modeAny").addEventListener("click",()=>{ state.matchMode="any"; render(); });
$("#clearParty").addEventListener("click",()=>{ state.party=[]; render(); });

setTheme(lsGet("sq_theme")||"dark");
initAuth();
loadData();
