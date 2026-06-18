/* ===========================================================================
   QUESTLOG — client app
   =========================================================================== */
/* ----- CONFIG: ✏️ Lynn fills these in after backend setup (see SETUP.md) ----- */
const CONFIG = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwJF-QAL0FNlti0e8i1_I2i67JNIhLsIhTNoTK1FoKe6N_Wt4acBaI3725CJXi3uENm/exec",   // Google Apps Script Web App URL (ends in /exec)
  GOOGLE_CLIENT_ID: "253371814543-pv1eg7kvmh0hvovddogjbjt958fon5at.apps.googleusercontent.com",  // Google OAuth Client ID (ends in .apps.googleusercontent.com)
};
const PEOPLE = [
  { id:"alvaro", name:"Álvaro" }, { id:"blake", name:"Blake" },
  { id:"lia", name:"Lia" }, { id:"lynn", name:"Lynn" },
];
const PMAP = Object.fromEntries(PEOPLE.map(p=>[p.id,p.name]));
const GENRE_COLOR = {
  "Deckbuilder":"purple","Strategy":"amber","Turn-Based":"blue","Metroidvania":"teal",
  "Action Roguelike":"coral","Souls-like":"red","RPG":"green","Adventure":"blue",
  "Screensharable Story":"pink","Comedy":"amber","Rhythm":"pink","Difficult":"red",
  "Platformer":"green","Arcade":"blue","Stealth":"gray","Shooter":"coral","Social":"teal",
  "Unsimulator":"amber","Action Adventure":"blue",
};
const gColor = g => GENRE_COLOR[g] || "gray";
const SEED_GAMES = [{"appid":"1865780","title":"Downfall: A Slay the Spire Fan Expansion","people":["blake","lynn"],"genres":["Deckbuilder"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"1092790","title":"Inscryption","people":["blake","lynn"],"genres":["Deckbuilder"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"590380","title":"Into the Breach","people":["blake","lynn"],"genres":["Strategy","Turn-Based"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"2084000","title":"Shogun Showdown","people":["blake","lynn"],"genres":["Strategy","Turn-Based","Deckbuilder"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"2097570","title":"StarVaders","people":["blake","lynn"],"genres":["Deckbuilder","Strategy"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"1948280","title":"Stacklands","people":["blake","lynn"],"genres":["Strategy"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"387290","title":"Ori and the Blind Forest","people":["blake","lynn","alvaro"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":true,"note":""},{"appid":"774361","title":"Blasphemous","people":["blake","lynn"],"genres":["Metroidvania"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"894020","title":"Death's Door","people":["blake","lynn"],"genres":["Metroidvania","Action Roguelike"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"606150","title":"Moonlighter","people":["blake","lynn"],"genres":["Action Roguelike"],"modes":[],"dim":"2D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"1466640","title":"Road 96","people":["alvaro","lynn"],"genres":["Screensharable Story"],"modes":[],"dim":"3D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"1622910","title":"Still Wakes the Deep","people":["alvaro","lynn"],"genres":["Screensharable Story"],"modes":[],"dim":"3D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"303210","title":"The Beginner's Guide","people":["alvaro","lynn"],"genres":["Screensharable Story"],"modes":[],"dim":"3D","minPlayers":1,"maxPlayers":1,"mods":false,"note":""},{"appid":"367520","title":"Hollow Knight","people":["alvaro","lynn"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":true,"note":""},{"appid":"283640","title":"Salt and Sanctuary","people":["alvaro","lynn"],"genres":["Metroidvania","Souls-like"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1245620","title":"Elden Ring","people":["alvaro","lynn"],"genres":["Souls-like"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1282100","title":"Remnant II","people":["alvaro","lynn"],"genres":["Souls-like"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"2849490","title":"Outward 2","people":["alvaro","lynn"],"genres":["Souls-like"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"787810","title":"Rogue Heroes: Ruins of Tasos","people":["alvaro","lynn"],"genres":["RPG"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":"Inspired by Zelda games"},{"appid":"1982340","title":"Blanc","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":2,"maxPlayers":2,"mods":false,"note":""},{"appid":"1071870","title":"Biped","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1225570","title":"Unravel Two","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1801110","title":"BOKURA","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":2,"maxPlayers":2,"mods":false,"note":""},{"appid":"295790","title":"Never Alone","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"2111550","title":"Schrodinger's Cat Burglar","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":2,"maxPlayers":2,"mods":false,"note":""},{"appid":"2129530","title":"REANIMAL","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1051950","title":"Voyage","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"972660","title":"Spiritfarer","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"2001120","title":"Split Fiction","people":["blake","lia"],"genres":["Adventure"],"modes":["Co-op"],"dim":"3D","minPlayers":2,"maxPlayers":2,"mods":false,"note":""},{"appid":"837470","title":"Untitled Goose Game","people":["blake","lia"],"genres":["Comedy"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"291860","title":"Pit People","people":["blake","lia"],"genres":["Strategy"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"701160","title":"Kingdom Two Crowns","people":["blake","lia"],"genres":["Strategy"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"774181","title":"Rhythm Doctor","people":["blake","lia"],"genres":["Rhythm"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1062110","title":"UNSIGHTED","people":["blake","lia"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"534550","title":"Guacamelee 2","people":["blake","lia"],"genres":["Metroidvania"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"330020","title":"Children of Morta","people":["blake","lia"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"311690","title":"Enter the Gungeon","people":["blake","lia"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"268910","title":"Cuphead","people":["blake","lia"],"genres":["Difficult"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1411020","title":"Perennial Order","people":["blake","lia"],"genres":["Difficult"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":2,"mods":false,"note":""},{"appid":"1244090","title":"Sea of Stars","people":["blake","lia","lynn"],"genres":["Strategy","Turn-Based","RPG"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":3,"mods":false,"note":"Turn-Based JRPG"},{"appid":"1911610","title":"Windblown","people":["blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":3,"mods":false,"note":"Fast-paced fantasy hack and slash"},{"appid":"958520","title":"33 Immortals","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Massively multiplayer, fantasy, hand-drawn"},{"appid":"1280930","title":"Astral Ascent","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Hack and slash, magic"},{"appid":"585710","title":"Blazing Beaks","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op","Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Top-down shooter"},{"appid":"293780","title":"Crawl","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Party, dungeon crawl"},{"appid":"247080","title":"Crypt of the NecroDancer","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike","Rhythm"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Dungeon crawler, rhythm"},{"appid":"1135230","title":"Ember Knights","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike","RPG"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"2071280","title":"Ravenswatch","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Hack and slash"},{"appid":"1337520","title":"Risk of Rain Returns","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"2015270","title":"Rotwood","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Beat 'em up"},{"appid":"2444750","title":"Shape of Dreams","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"1975580","title":"Wild Woods","people":["alvaro","blake","lia","lynn"],"genres":["Action Roguelike"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Hack and slash"},{"appid":"1833200","title":"DuneCrawl","people":["alvaro","blake","lia","lynn"],"genres":["Action Adventure"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Campaign, open world"},{"appid":"432980","title":"INVERSUS Deluxe","people":["alvaro","blake","lia","lynn"],"genres":["Arcade"],"modes":["Co-op","Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Top-down shooter"},{"appid":"422110","title":"Wand Wars","people":["alvaro","blake","lia","lynn"],"genres":["Arcade"],"modes":["Co-op","Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":""},{"appid":"418530","title":"Spelunky 2","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Co-op","Competitive"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"323850","title":"Move or Die","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Party"},{"appid":"230270","title":"N++ (NPLUSPLUS)","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Precision platformer"},{"appid":"207140","title":"SpeedRunners","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Party"},{"appid":"674940","title":"Stick Fight: The Game","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Party"},{"appid":"386940","title":"Ultimate Chicken Horse","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Party"},{"appid":"1436700","title":"Trine 5: A Clockwork Conspiracy","people":["alvaro","blake","lia","lynn"],"genres":["Platformer"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Puzzle"},{"appid":"113020","title":"Monaco: What's Yours Is Mine","people":["alvaro","blake","lia","lynn"],"genres":["Stealth"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"1676840","title":"For The King II","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Roguelite"},{"appid":"4662350","title":"Chess 2","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Competitive"],"dim":"2D","minPlayers":2,"maxPlayers":2,"mods":false,"note":""},{"appid":"1618380","title":"Spellmasons","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"763890","title":"Wildermyth","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based","RPG"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"607050","title":"Wargroove","people":["alvaro","blake","lia","lynn"],"genres":["Strategy","Turn-Based"],"modes":["Co-op","Competitive"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"728880","title":"Overcooked! 2","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"996770","title":"Moving Out","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"1599600","title":"PlateUp!","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator"],"modes":["Co-op"],"dim":"2D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"1812560","title":"Super Crazy Rhythm Castle","people":["alvaro","blake","lia","lynn"],"genres":["Unsimulator","Rhythm"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"1217060","title":"Gunfire Reborn","people":["alvaro","blake","lia","lynn"],"genres":["Shooter","Action Roguelike"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"632360","title":"Risk of Rain 2","people":["alvaro","blake","lia","lynn"],"genres":["Shooter","Action Roguelike"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"3527290","title":"PEAK","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Physics"},{"appid":"3097560","title":"Liar's Bar","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Competitive"],"dim":"3D","minPlayers":2,"maxPlayers":4,"mods":false,"note":"Tabletop"},{"appid":"286160","title":"Tabletop Simulator","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op","Competitive"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":"Tabletop"},{"appid":"1966720","title":"Lethal Company","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"3892270","title":"Gamble With Your Friends","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","minPlayers":2,"maxPlayers":4,"mods":false,"note":""},{"appid":"3146520","title":"WEBFISHING","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"3438850","title":"Sledding Game","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""},{"appid":"2881650","title":"Content Warning","people":["alvaro","blake","lia","lynn"],"genres":["Social"],"modes":["Co-op"],"dim":"3D","minPlayers":1,"maxPlayers":4,"mods":false,"note":""}];

/* ----- tiny helpers ----- */
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
const COVER_FALLBACKS = a => [
  `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${a}/header.jpg`,
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${a}/header.jpg`,
].join("|");
window.imgFB = function(img){
  const fb=(img.dataset.fb||"").split("|").filter(Boolean);
  if(fb.length){ img.dataset.fb=fb.slice(1).join("|"); img.src=fb[0]; } else { img.style.visibility="hidden"; }
};

/* ----- inline SVG icons (no webfont dependency) ----- */
const SVG = {
  users:'<path d="M9 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M16 3.5a3.5 3.5 0 0 1 0 6.8M21 21v-1a4 4 0 0 0-3-3.8"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  up:'<path d="M12 19V6M6 12l6-6 6 6"/>',
  alert:'<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  gamepad:'<rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 11h4M8 9v4M15 11h.01M18 13h.01"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  external:'<path d="M15 3h6v6M10 14 21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>',
  volumeOff:'<path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/>',
  volumeOn:'<path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  maximize:'<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  sparkles:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
  ghost:'<path d="M9 11h.01M15 11h.01M12 2a8 8 0 0 0-8 8v11l3-2 3 2 2-2 2 2 3-2V10a8 8 0 0 0-8-8z"/>',
  arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',
};
const I = (name,size=18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SVG[name]||""}</svg>`;
const Iplay = (size=18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>`;

const state = {
  games:[], comments:[], upvotes:[], users:[],
  party:[], matchMode:"all", drawerOpen:false,
  genres:new Set(), genreMode:"all", modes:new Set(), dims:new Set(), modsOnly:false,
  search:"", sort:"rating",
  user:null, token:null, trailerTimer:null,
};

function initials(name){ return String(name||"?").trim().split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase(); }
function personDot(id, cls="pa"){ const n=PMAP[id]||id; return `<span class="${cls} pa-${id}" title="${esc(n)}">${esc(n[0])}</span>`; }
function playersLabel(g){ return g.minPlayers===g.maxPlayers ? `${g.minPlayers}` : `${g.minPlayers}–${g.maxPlayers}`; }
function reviewMeta(g){
  if(g.reviewPct==null||g.reviewPct==="") return {cls:"none", label: hasBackend()?"No reviews yet":"— connect backend"};
  const p=Math.round(g.reviewPct); return {cls:p>=70?"pos":p>=40?"mixed":"neg", label:`${p}%`, desc:g.reviewDesc||""};
}

/* ============================================================ DATA */
async function loadData(){
  applyGames(SEED_GAMES.map(g=>({...g})));
  if(hasBackend()){
    try{
      const r=await fetch(CONFIG.APPS_SCRIPT_URL+"?action=data");
      const d=await r.json();
      if(d&&d.ok){ applyGames(d.games||[]); state.comments=d.comments||[]; state.upvotes=d.upvotes||[]; state.users=d.users||[]; if(state.user) syncUserName(); }
    }catch(e){ console.warn("backend load failed",e); toast("Couldn't reach the backend — showing the built-in list.","err"); }
  }
  render();
}
function applyGames(arr){
  state.games=arr.map(g=>({
    appid:String(g.appid), title:g.title||"", people:g.people||[], genres:g.genres||[], modes:g.modes||[], dim:g.dim||"",
    minPlayers:+g.minPlayers||1, maxPlayers:+g.maxPlayers|| (+g.players||4), mods:!!g.mods, note:g.note||"",
    reviewPct:(g.reviewPct===0||g.reviewPct)?+g.reviewPct:null, reviewDesc:g.reviewDesc||"",
    releaseDate:g.releaseDate||"", releaseTs:+g.releaseTs||0, trailer:g.trailer||"", addedBy:g.addedBy||"", addedTs:+g.addedTs||0,
  }));
}
const upCount = a => state.upvotes.filter(u=>u.appid===String(a)).length;
const userUpvoted = a => !!(state.user && state.upvotes.find(u=>u.appid===String(a)&&u.email===state.user.email));
const gameComments = a => state.comments.filter(c=>c.appid===String(a)).sort((x,y)=>x.ts-y.ts);
function suggesterInfo(email){ const u=state.users.find(x=>x.email===email); const name=(u&&u.displayName)||String(email).split("@")[0]||"Someone"; return {name, initials:initials(name)}; }

/* ============================================================ FILTER */
function visibleGames(){
  let g=state.games.slice();
  const q=state.search.trim().toLowerCase();
  if(q) g=g.filter(x=>x.title.toLowerCase().includes(q)||x.genres.some(z=>z.toLowerCase().includes(q)));
  if(state.party.length){
    const n=state.party.length;
    g=g.filter(x=>{
      const hits=state.party.filter(p=>x.people.includes(p)).length;
      const peopleOk = state.matchMode==="all" ? hits===n : hits>0;
      return peopleOk && x.minPlayers<=n && n<=x.maxPlayers;   // group fits the game's player range
    });
  }
  if(state.genres.size){
    const arr=[...state.genres];
    g=g.filter(x=> state.genreMode==="all" ? arr.every(z=>x.genres.includes(z)) : arr.some(z=>x.genres.includes(z)));
  }
  if(state.modes.size) g=g.filter(x=>[...state.modes].every(z=>x.modes.includes(z)));
  if(state.dims.size)  g=g.filter(x=>state.dims.has(x.dim));
  if(state.modsOnly)   g=g.filter(x=>x.mods);
  const s=state.sort;
  g.sort((a,b)=>{
    if(s==="az") return a.title.localeCompare(b.title);
    if(s==="upvotes") return upCount(b.appid)-upCount(a.appid)||a.title.localeCompare(b.title);
    if(s==="release") return (b.releaseTs||0)-(a.releaseTs||0)||a.title.localeCompare(b.title);
    if(s==="added") return (b.addedTs||0)-(a.addedTs||0)||a.title.localeCompare(b.title);
    const ra=a.reviewPct??-1, rb=b.reviewPct??-1; return rb-ra||a.title.localeCompare(b.title);
  });
  return g;
}
function render(){ renderDrawer(); renderParty(); renderFilters(); renderGrid(); renderSetupBanner(); }

function renderGrid(){
  const games=visibleGames();
  $("#count").innerHTML=`<b>${games.length}</b> ${games.length===1?"game":"games"}`;
  const grid=$("#grid"), empty=$("#emptyState");
  if(!games.length){
    grid.innerHTML="";
    empty.innerHTML=`<div class="empty">${I('ghost',42)}<h3>No games match</h3><p>Try removing a filter or switching to “Any of them”.</p></div>`;
    return;
  }
  empty.innerHTML="";
  grid.innerHTML=games.map(g=>{
    const rv=reviewMeta(g), uc=upCount(g.appid);
    const ppl=g.people.map(p=>personDot(p)).join("");
    const tags=g.genres.slice(0,3).map(t=>`<span class="tag g-${gColor(t)}">${esc(t)}</span>`).join("");
    return `<button class="card" data-app="${g.appid}" aria-label="${esc(g.title)}">
      <div class="cover">
        <div class="ph">${I('gamepad',26)}</div>
        <img loading="lazy" src="${COVER(g.appid)}" alt="" data-fb="${COVER_FALLBACKS(g.appid)}" onerror="imgFB(this)">
        <div class="badge-tl">
          ${g.mods?`<span class="badge mods">${I('alert',11)}Mods</span>`:""}
          <span class="badge players">${I('users',12)}${playersLabel(g)}</span>
        </div>
        ${uc?`<span class="badge up">${I('up',12)}${uc}</span>`:""}
      </div>
      <div class="cbody">
        <div class="ctitle">${esc(g.title)}</div>
        <div class="crow">
          <span class="review ${rv.cls}">${esc(rv.label)}</span>
          <span class="ppl">${ppl}</span>
        </div>
        <div class="tags">${tags}</div>
      </div>
    </button>`;
  }).join("");
  $$(".card",grid).forEach(c=>c.addEventListener("click",()=>openDetail(c.dataset.app)));
}

/* ----- drawer ----- */
function renderDrawer(){
  $("#drawer").classList.toggle("open", state.drawerOpen);
  $("#drawerPanel").classList.toggle("open", state.drawerOpen);
  $("#drawerToggle").setAttribute("aria-expanded", state.drawerOpen);
  const sum=$("#drawerSummary");
  if(state.party.length){
    sum.innerHTML=state.party.map(id=>`<span class="pa pa-${id}">${esc(PMAP[id][0])}</span>`).join("")
      +`<span class="dt-hint" style="margin-left:9px">${state.party.length} selected</span>`;
  } else sum.innerHTML=`<span class="dt-hint">Tap to filter by who's around</span>`;
}
function renderParty(){
  const row=$("#partyRow");
  row.innerHTML=PEOPLE.map(p=>{
    const on=state.party.includes(p.id);
    return `<button class="person" data-p="${p.id}" aria-pressed="${on}"><span class="pa pa-${p.id}">${esc(p.name[0])}</span>${esc(p.name)}</button>`;
  }).join("");
  $$(".person",row).forEach(b=>b.addEventListener("click",()=>togglePerson(b.dataset.p)));
  const n=state.party.length, ro=$("#partyReadout");
  if(!n) ro.innerHTML="No one selected — showing everything";
  else{
    const names=state.party.map(id=>PMAP[id]);
    const joined=names.length===1?names[0]:names.slice(0,-1).join(", ")+" & "+names.slice(-1);
    ro.innerHTML=`Games <b>${esc(joined)}</b> can play together — ${state.matchMode==="all"?"everyone likes":"anyone likes"}, fits <b>${n} player${n>1?"s":""}</b>`;
  }
  $("#clearParty").hidden=!n;
  $("#modeAll").setAttribute("aria-pressed", state.matchMode==="all");
  $("#modeAny").setAttribute("aria-pressed", state.matchMode==="any");
}
function togglePerson(id){ const i=state.party.indexOf(id); if(i>=0) state.party.splice(i,1); else state.party.push(id); render(); }

/* ----- filters ----- */
function renderFilters(){
  const bar=$("#filterbar");
  const allGenres=[...new Set(state.games.flatMap(g=>g.genres))].sort();
  const genreChips=allGenres.map(g=>`<button class="chip" data-f="genre" data-v="${esc(g)}" aria-pressed="${state.genres.has(g)}">${esc(g)}</button>`).join("");
  const genreSeg = state.genres.size>=1 ? `<div class="seg sm" role="group" aria-label="Genre match mode" style="margin-left:4px">
      <button data-gm="all" aria-pressed="${state.genreMode==='all'}">All</button>
      <button data-gm="any" aria-pressed="${state.genreMode==='any'}">Any</button></div>` : "";
  const modeChips=["Co-op","Competitive"].map(m=>`<button class="chip" data-f="mode" data-v="${m}" aria-pressed="${state.modes.has(m)}">${m}</button>`).join("");
  const dimChips=["2D","3D"].map(d=>`<button class="chip" data-f="dim" data-v="${d}" aria-pressed="${state.dims.has(d)}">${d}</button>`).join("");
  bar.innerHTML=`
    <div class="fgroup"><span class="flabel">Genre</span>${genreChips}${genreSeg}</div>
    <div class="divider"></div>
    <div class="fgroup"><span class="flabel">Mode</span>${modeChips}</div>
    <div class="divider"></div>
    <div class="fgroup">${dimChips}
      <button class="chip" data-f="mods" aria-pressed="${state.modsOnly}">${I('alert',13)} Mods</button>
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
  $$("[data-gm]",bar).forEach(b=>b.addEventListener("click",()=>{ state.genreMode=b.dataset.gm; render(); }));
  const cf=$("#clearFilters"); if(cf) cf.addEventListener("click",()=>{ state.genres.clear(); state.modes.clear(); state.dims.clear(); state.modsOnly=false; render(); });
}

/* ============================================================ DETAIL MODAL */
function openDetail(appid){
  const g=state.games.find(x=>x.appid===String(appid)); if(!g) return;
  const rv=reviewMeta(g), uc=upCount(g.appid), up=userUpvoted(g.appid);
  const comments=gameComments(g.appid);
  const genreTags=g.genres.map(t=>`<span class="tag g-${gColor(t)}">${esc(t)}</span>`).join("");
  const modeTags=g.modes.map(m=>`<span class="tag mode">${esc(m)}</span>`).join("")+`<span class="tag mode">${g.dim}</span>`;
  const infoBadges=g.people.map(p=>`<span class="infobadge">${personDot(p,"pa")}${esc(PMAP[p])}</span>`).join("");
  const filterPills=g.people.map(p=>`<button class="fpill" data-pp="${p}" aria-pressed="${state.party.includes(p)}">${personDot(p,"pa")}${esc(PMAP[p])}</button>`).join("");

  const commentHTML = comments.length ? comments.map(c=>{
    const mine=state.user&&c.email===state.user.email;
    const av=c.picture?`<span class="pa"><img src="${esc(c.picture)}" alt=""></span>`:`<span class="pa">${esc(initials(c.name||"?"))}</span>`;
    return `<div class="comment">${av}<div style="flex:1">
      <div class="cmeta"><span class="cn">${esc(c.name||"Someone")}</span><span class="ct">${timeAgo(c.ts)}</span>${mine?`<button class="cdel" data-del="${esc(c.id)}">delete</button>`:""}</div>
      <div class="cbubble">${esc(c.text)}</div></div></div>`;
  }).join("") : `<p style="color:var(--text3);font-size:13.5px">No comments yet — start the thread.</p>`;
  const commentForm = state.user
    ? `<div class="cform">
         <span class="pa" style="flex-shrink:0;width:30px;height:30px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;color:#fff;background:var(--accent-strong);font-family:'Space Grotesk',sans-serif">${state.user.picture?`<img src="${esc(state.user.picture)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`:esc(initials(state.user.name))}</span>
         <textarea id="cInput" placeholder="Add a comment…" aria-label="Add a comment"></textarea>
         <button class="btn primary" id="cPost" style="align-self:stretch">Post</button></div>`
    : `<div class="signin-hint">Sign in to upvote and comment.</div>`;

  const sb = (g.addedBy && g.addedBy!=="seed") ? suggesterInfo(g.addedBy) : null;

  $("#detailModal").innerHTML=`
    <button class="mclose" aria-label="Close">${I('x',18)}</button>
    <div class="dhero" id="dhero">
      <img src="${HEADER(g.appid)}" alt="" data-fb="${COVER_FALLBACKS(g.appid)}" onerror="imgFB(this)">
      <div class="scrimgrad"></div>
    </div>
    <div class="dbody">
      <h2 class="dtitle">${esc(g.title)}</h2>
      <div class="dmeta">
        <span class="review ${rv.cls}">${esc(rv.label)}${rv.desc?` · ${esc(rv.desc)}`:""}</span>
        <span class="mi">${I('users',15)} ${playersLabel(g)} player${g.maxPlayers>1?"s":""}</span>
        ${g.releaseDate?`<span class="mi">${I('calendar',14)} ${esc(g.releaseDate)}</span>`:""}
      </div>
      <div class="dnote ${g.note?"":"empty-note"}">${g.note?esc(g.note):"No notes yet — Lynn can add thoughts here later."}</div>
      ${g.mods?`<div class="modwarn">${I('alert',18)}<div><b>Mods required.</b> This one needs a mod to play together — check the Steam discussions or ask Lynn before your session.</div></div>`:""}

      <div class="dsection"><h3>Genres</h3><div class="dtags">${genreTags}</div></div>
      <div class="dsection"><h3>Plays as</h3><div class="dtags">${modeTags}</div></div>
      <div class="dsection"><h3>This one's for</h3><div class="dtags">${infoBadges}</div></div>

      <div class="dsection"><h3>Filter the list by these people</h3>
        <div class="dtags">${filterPills}</div>
        <div class="filter-foot">
          <span class="live-count" id="liveCount"></span>
          <span class="confirm-msg" id="confirmMsg"></span>
          <button class="go-results" id="goResults">Show matches ${I('arrowRight',15)}</button>
        </div>
      </div>

      <div class="dactions">
        <button class="upbtn" id="upBtn" aria-pressed="${up}">${I('up',18)}<span id="upTxt">${up?"Upvoted":"Upvote"}</span><span style="opacity:.6">·</span><span id="upNum">${uc}</span></button>
        <a class="steamlink" href="${STEAM_URL(g.appid)}" target="_blank" rel="noopener">View on Steam ${I('external',14)}</a>
      </div>

      ${sb?`<div class="suggested-by"><span class="pa">${esc(sb.initials)}</span><span>Suggested by <b>${esc(sb.name)}</b>${g.addedTs?` · ${timeAgo(g.addedTs)}`:""}</span></div>`:""}

      <div class="dsection"><h3>Discussion</h3>
        <div class="comments" id="commentList">${commentHTML}</div>
        ${commentForm}
      </div>
    </div>`;

  const m=$("#detailModal");
  m.querySelector(".mclose").addEventListener("click",closeModals);
  $$("[data-pp]",m).forEach(b=>b.addEventListener("click",()=>toggleFromModal(b.dataset.pp)));
  $$("[data-del]",m).forEach(b=>b.addEventListener("click",()=>delComment(b.dataset.del,g.appid)));
  const upB=$("#upBtn",m); if(upB) upB.addEventListener("click",(e)=>toggleUpvote(g.appid, e.currentTarget));
  const cp=$("#cPost",m); if(cp) cp.addEventListener("click",(e)=>postComment(g.appid, e.currentTarget));
  $("#goResults",m).addEventListener("click",()=>{ closeModals(); state.drawerOpen=true; render(); window.scrollTo({top:0,behavior:"smooth"}); });
  updateModalFilterUI();
  openScrim("#detailScrim");

  // trailer: autoplay muted after a short delay; click hero to start immediately
  const hero=$("#dhero",m);
  if(g.trailer){
    hero.style.cursor="pointer";
    hero.addEventListener("click",()=>mountTrailer(g));
    clearTimeout(state.trailerTimer);
    state.trailerTimer=setTimeout(()=>mountTrailer(g), 3000);
  }
}

function mountTrailer(g){
  const hero=$("#dhero"); if(!hero || $("#trailerVid")) return;
  clearTimeout(state.trailerTimer);
  hero.style.cursor="default";
  hero.innerHTML=`
    <video id="trailerVid" src="${esc(g.trailer)}" muted autoplay loop playsinline poster="${HEADER(g.appid)}"></video>
    <span class="trailer-badge">${Iplay(11)} Trailer</span>
    <div class="trailer-ctrls">
      <button class="tc-btn" id="muteBtn" aria-label="Unmute">${I('volumeOff',17)}</button>
      <button class="tc-btn" id="fsBtn" aria-label="Fullscreen">${I('maximize',17)}</button>
    </div>
    <div class="scrimgrad"></div>`;
  const v=$("#trailerVid");
  v.play&&v.play().catch(()=>{});
  $("#muteBtn").addEventListener("click",()=>{ v.muted=!v.muted; $("#muteBtn").innerHTML=I(v.muted?'volumeOff':'volumeOn',17); $("#muteBtn").setAttribute("aria-label",v.muted?"Unmute":"Mute"); if(!v.muted) v.play().catch(()=>{}); });
  $("#fsBtn").addEventListener("click",()=>{ (v.requestFullscreen||v.webkitRequestFullscreen||v.webkitEnterFullscreen||function(){}).call(v); });
}

/* modal filter pills keep the modal open, give inline feedback + live count */
function toggleFromModal(id){
  const on = !state.party.includes(id);
  if(on) state.party.push(id); else { const i=state.party.indexOf(id); state.party.splice(i,1); }
  const pill=$(`#detailModal [data-pp="${id}"]`); if(pill) pill.setAttribute("aria-pressed", on);
  const c=$("#confirmMsg"); if(c){ c.textContent=`${on?"Added":"Removed"} ${PMAP[id]}`; c.classList.add("show"); clearTimeout(window._cmT); window._cmT=setTimeout(()=>c.classList.remove("show"),1900); }
  updateModalFilterUI();
  render();   // update the grid + drawer behind the modal
}
function updateModalFilterUI(){
  const lc=$("#liveCount"); if(lc){ const n=visibleGames().length; lc.innerHTML=`<b>${n}</b> ${n===1?"game":"games"} match`; }
  const go=$("#goResults"); if(go) go.toggleAttribute("disabled", state.party.length===0);
}

/* ============================================================ UPVOTES / COMMENTS */
async function toggleUpvote(appid, anchor){
  if(!requireUser(anchor,"Sign in to upvote")) return;
  appid=String(appid); const had=userUpvoted(appid);
  if(had) state.upvotes=state.upvotes.filter(u=>!(u.appid===appid&&u.email===state.user.email));
  else state.upvotes.push({appid, email:state.user.email, ts:Date.now()});
  refreshUpUI(appid); renderGrid();
  if(hasBackend()){ const r=await api({action:"toggleUpvote", appid}); if(!r||!r.ok) toast("Vote didn't save.","err"); }
}
function refreshUpUI(appid){ const b=$("#upBtn"); if(!b) return; const up=userUpvoted(appid); b.setAttribute("aria-pressed",up); $("#upTxt").textContent=up?"Upvoted":"Upvote"; $("#upNum").textContent=upCount(appid); }
async function postComment(appid, anchor){
  if(!requireUser(anchor,"Sign in to comment")) return;
  const ta=$("#cInput"); const text=(ta.value||"").trim(); if(!text) return;
  const tmp={ id:"tmp_"+Date.now(), appid:String(appid), email:state.user.email, name:state.user.name, picture:state.user.picture, text, ts:Date.now() };
  state.comments.push(tmp); ta.value=""; reopenDetail(appid);
  if(hasBackend()){ const r=await api({action:"addComment", appid:String(appid), text, name:state.user.name}); if(r&&r.ok&&r.comment) tmp.id=r.comment.id; else toast("Comment didn't save.","err"); }
}
async function delComment(id,appid){ state.comments=state.comments.filter(c=>c.id!==id); reopenDetail(appid); if(hasBackend()){ const r=await api({action:"deleteComment", id}); if(!r||!r.ok) toast("Couldn't delete.","err"); } }
function reopenDetail(appid){ renderGrid(); clearTimeout(state.trailerTimer); openDetail(appid); }

/* ============================================================ ADD GAME */
function openAdd(e){
  if(hasAuth() && !requireUser(e&&e.currentTarget,"Sign in to add a game")) return;
  const genrePool=[...new Set([...Object.keys(GENRE_COLOR), ...state.games.flatMap(g=>g.genres)])].sort();
  $("#addModal").innerHTML=`
    <button class="mclose" aria-label="Close">${I('x',18)}</button>
    <div class="form-head"><h2>Add a game</h2><p>Paste a Steam link — the rest fills in from there. Goes live right away.</p></div>
    <div class="fbody">
      <div class="field"><label>Steam link or App ID</label>
        <input id="aUrl" type="text" placeholder="https://store.steampowered.com/app/367520/…">
        <div class="hint">We'll pull the title, cover art, review score, release date and trailer from Steam.</div></div>
      <div class="field"><label>Who's it for?</label>
        <div class="pickrow" id="aPeople">${PEOPLE.map(p=>`<button class="pick" data-v="${p.id}" aria-pressed="false">${esc(p.name)}</button>`).join("")}</div></div>
      <div class="field"><label>Genres</label>
        <div class="pickrow" id="aGenres">${genrePool.map(g=>`<button class="pick" data-v="${esc(g)}" aria-pressed="false">${esc(g)}</button>`).join("")}</div>
        <input id="aGenreNew" type="text" placeholder="New genre (optional)" style="margin-top:7px"></div>
      <div class="three">
        <div class="field"><label>Min players</label><input id="aMin" type="number" min="1" max="64" value="1"></div>
        <div class="field"><label>Max players</label><input id="aMax" type="number" min="1" max="64" value="4"></div>
        <div class="field"><label>Dimension</label><div class="pickrow" id="aDim">${["2D","3D"].map(d=>`<button class="pick" data-v="${d}" aria-pressed="false">${d}</button>`).join("")}</div></div>
      </div>
      <div class="two">
        <div class="field"><label>Mode</label><div class="pickrow" id="aModes">${["Co-op","Competitive"].map(m=>`<button class="pick" data-v="${m}" aria-pressed="false">${m}</button>`).join("")}</div></div>
        <div class="field"><label>Mods required?</label><div class="pickrow" id="aMods"><button class="pick" data-v="yes" aria-pressed="false">Yes, needs mods</button></div></div>
      </div>
      <div class="field"><label>Note (optional)</label><textarea id="aNote" placeholder="A line about why it's here…"></textarea></div>
      <div class="formfoot"><button class="btn" id="aCancel">Cancel</button><button class="btn primary" id="aSave">Add to list</button></div>
    </div>`;
  const m=$("#addModal");
  m.querySelector(".mclose").addEventListener("click",closeModals);
  $("#aCancel",m).addEventListener("click",closeModals);
  $$(".pick",m).forEach(b=>{ if(!b.closest("#aDim")&&!b.closest("#aMods")) b.addEventListener("click",()=>b.setAttribute("aria-pressed", b.getAttribute("aria-pressed")!=="true")); });
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
  const sel=sec=>$$(`#${sec} .pick[aria-pressed="true"]`).map(b=>b.dataset.v);
  const genres=sel("aGenres"); const ng=$("#aGenreNew").value.trim(); if(ng&&!genres.includes(ng)) genres.push(ng);
  let minP=+$("#aMin").value||1, maxP=+$("#aMax").value||1; if(minP>maxP) [minP,maxP]=[maxP,minP];
  const game={ appid, people:sel("aPeople"), genres, modes:sel("aModes"), dim:(sel("aDim")[0]||"2D"),
    minPlayers:minP, maxPlayers:maxP, mods:sel("aMods").includes("yes"), note:$("#aNote").value.trim() };
  if(!game.people.length){ toast("Pick at least one person it's for.","err"); return; }
  const btn=$("#aSave"); btn.disabled=true; btn.innerHTML=`<span class="spin">${I('users',16)}</span> Adding…`;
  if(hasBackend()){
    const r=await api({action:"addGame", game});
    if(r&&r.ok&&r.game){ state.games.push(normalize(r.game)); toast("Added!"); }
    else { btn.disabled=false; btn.textContent="Add to list"; toast(r&&r.error?r.error:"Couldn't add the game.","err"); return; }
  } else {
    game.title="App "+appid; game.reviewPct=null; game.addedTs=Date.now(); game.addedBy=state.user?state.user.email:"";
    state.games.push(normalize(game)); toast("Added locally — connect the backend to save it for everyone.");
  }
  closeModals(); render();
}
function normalize(g){ return {appid:String(g.appid),title:g.title||"",people:g.people||[],genres:g.genres||[],modes:g.modes||[],dim:g.dim||"2D",minPlayers:+g.minPlayers||1,maxPlayers:+g.maxPlayers|| (+g.players||4),mods:!!g.mods,note:g.note||"",reviewPct:(g.reviewPct===0||g.reviewPct)?+g.reviewPct:null,reviewDesc:g.reviewDesc||"",releaseDate:g.releaseDate||"",releaseTs:+g.releaseTs||0,trailer:g.trailer||"",addedBy:g.addedBy||"",addedTs:+g.addedTs||Date.now()}; }

/* ============================================================ AUTH (Google OAuth2 token flow) */
let tokenClient=null, gisReady=false;
function initAuth(){
  renderAuthSlot();
  if(!hasAuth()) return;
  const tryInit=()=>{
    if(!(window.google&&google.accounts&&google.accounts.oauth2)) return setTimeout(tryInit,300);
    tokenClient=google.accounts.oauth2.initTokenClient({ client_id:CONFIG.GOOGLE_CLIENT_ID, scope:"openid email profile", callback:handleToken });
    gisReady=true; renderAuthSlot();
  };
  tryInit();
}
function doSignIn(){ if(!gisReady){ toast("Sign-in is still loading…"); return; } tokenClient.requestAccessToken(); }
async function handleToken(resp){
  if(resp&&resp.error){ toast("Sign-in cancelled.","err"); return; }
  state.token=resp.access_token;
  try{
    const info=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer "+resp.access_token}}).then(r=>r.json());
    if(!info||!info.email){ toast("Couldn't read your Google profile.","err"); return; }
    state.user={ email:String(info.email).toLowerCase(), googleName:info.name||info.given_name||"Player", name:info.name||info.given_name||"Player", picture:info.picture||"" };
  }catch(e){ toast("Couldn't load your profile.","err"); return; }
  syncUserName(); renderAuthSlot();
  if(hasBackend()) refreshAfterAuth();
  const known=state.users.find(u=>u.email===state.user.email);
  if(!known&&!lsGet("ql_named_"+state.user.email)) openNameModal(true);
  toast(`Welcome, ${state.user.name}!`);
}
async function refreshAfterAuth(){ try{ await loadData(); }catch{} }
function syncUserName(){ if(!state.user) return; const u=state.users.find(x=>x.email===state.user.email); if(u&&u.displayName) state.user.name=u.displayName; }
function requireUser(anchor, msg){ if(state.user) return true; flashSignInNeeded(anchor, msg||"Sign in to do that"); return false; }
function flashSignInNeeded(anchor, msg){
  if(anchor) showPointTip(anchor, msg);
  const sb=$("#signinBtn"); if(sb){ sb.classList.remove("spotlight"); void sb.offsetWidth; sb.classList.add("spotlight"); setTimeout(()=>sb.classList.remove("spotlight"),2100); }
  if(!anchor) toast(msg||"Sign in first.");
}
function renderAuthSlot(){
  const slot=$("#authSlot");
  if(state.user){
    const av=state.user.picture?`<img class="avatar" src="${esc(state.user.picture)}" alt="">`:`<span class="avatar">${esc(initials(state.user.name))}</span>`;
    slot.innerHTML=`<button class="userchip" id="userChip" aria-label="Account">${av}<span class="nm">${esc(state.user.name)}</span></button>`;
    $("#userChip").addEventListener("click",openNameModal);
  } else if(hasAuth()){
    slot.innerHTML=`<button class="signin-text" id="signinBtn">Sign in</button>`;
    $("#signinBtn").addEventListener("click",doSignIn);
  } else slot.innerHTML="";
}

/* ----- name / account modal ----- */
function openNameModal(first){
  if(!state.user){ doSignIn(); return; }
  $("#nameModal").innerHTML=`
    <button class="mclose" aria-label="Close">${I('x',18)}</button>
    <div class="form-head"><h2>${first===true?"Pick your display name":"Your account"}</h2>
      <p>${first===true?"How should the crew see you on the site?":esc(state.user.email)}</p></div>
    <div class="fbody">
      <div class="field"><label>Display name</label><input id="nName" type="text" value="${esc(state.user.name)}" maxlength="40"></div>
      <div class="formfoot">${first===true?"":`<button class="btn" id="nSignout">Sign out</button>`}<button class="btn primary" id="nSave">Save</button></div>
    </div>`;
  const m=$("#nameModal");
  m.querySelector(".mclose").addEventListener("click",closeModals);
  const so=$("#nSignout",m); if(so) so.addEventListener("click",signOut);
  $("#nSave",m).addEventListener("click",saveName);
  openScrim("#nameScrim");
}
async function saveName(){
  const v=$("#nName").value.trim()||state.user.googleName; state.user.name=v;
  let u=state.users.find(x=>x.email===state.user.email); if(u) u.displayName=v; else state.users.push({email:state.user.email, displayName:v});
  lsSet("ql_named_"+state.user.email,"1"); renderAuthSlot(); closeModals(); render();
  if(hasBackend()){ const r=await api({action:"setName", displayName:v}); if(!r||!r.ok) toast("Name didn't save to the server.","err"); }
}
function signOut(){ if(state.token&&window.google&&google.accounts&&google.accounts.oauth2) try{ google.accounts.oauth2.revoke(state.token); }catch{} state.user=null; state.token=null; renderAuthSlot(); closeModals(); render(); toast("Signed out."); }

/* ============================================================ BACKEND */
async function api(payload){
  if(!hasBackend()) return {ok:false,error:"No backend configured"};
  try{
    const r=await fetch(CONFIG.APPS_SCRIPT_URL,{ method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify({...payload, token:state.token}) });
    return await r.json();
  }catch(e){ console.warn("api error",e); return {ok:false,error:"Network error"}; }
}

/* ============================================================ MODALS / MISC */
function openScrim(sel){ const keep=sel; closeModals(true); const s=$(sel); s.classList.add("open"); document.body.style.overflow="hidden"; s.onclick=e=>{ if(e.target===s) closeModals(); }; }
function closeModals(silent){ clearTimeout(state.trailerTimer); $$(".scrim").forEach(s=>s.classList.remove("open")); document.body.style.overflow=""; }
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModals(); });

function showPointTip(anchor, msg){
  const tip=$("#pointTip"); tip.innerHTML=`${I('lock',14)}<span>${esc(msg)}</span>`;
  tip.classList.remove("show"); tip.style.left="0px"; tip.style.top="-999px"; tip.classList.add("below");
  const r=anchor.getBoundingClientRect(); const tw=tip.offsetWidth, th=tip.offsetHeight;
  let left=Math.max(8, Math.min(r.left+r.width/2-tw/2, window.innerWidth-tw-8));
  tip.style.setProperty("--arrow",(r.left+r.width/2-left)+"px");
  if(r.bottom+th+12<window.innerHeight){ tip.style.top=(r.bottom+10)+"px"; tip.classList.remove("above"); tip.classList.add("below"); }
  else { tip.style.top=(r.top-th-10)+"px"; tip.classList.remove("below"); tip.classList.add("above"); }
  tip.style.left=left+"px"; tip.classList.add("show");
  clearTimeout(window._tipT); window._tipT=setTimeout(()=>tip.classList.remove("show"),2400);
}
function timeAgo(ts){ if(!ts) return ""; const s=(Date.now()-ts)/1000;
  if(s<60) return "just now"; if(s<3600) return Math.floor(s/60)+"m ago"; if(s<86400) return Math.floor(s/3600)+"h ago"; if(s<604800) return Math.floor(s/86400)+"d ago"; return new Date(ts).toLocaleDateString(); }
let toastT;
function toast(msg,kind){ const t=$("#toast"); t.textContent=msg; t.className="toast show"+(kind==="err"?" err":""); clearTimeout(toastT); toastT=setTimeout(()=>t.className="toast",2600); }
function renderSetupBanner(){
  const b=$("#setupBanner");
  if(hasBackend()){ b.innerHTML=""; return; }
  b.innerHTML=`<div class="banner">${I('sparkles',17)}<span><b>Preview mode.</b> Showing the built-in list. Connect the Google Sheet backend (see SETUP.md) so reviews and trailers load and votes/comments save for everyone.</span></div>`;
}

/* ============================================================ THEME + BOOT */
function setTheme(t){ document.documentElement.setAttribute("data-theme",t); lsSet("ql_theme",t); }
$("#themeBtn").addEventListener("click",()=>setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark"));
$("#search").addEventListener("input",e=>{ state.search=e.target.value; renderGrid(); });
$("#sort").addEventListener("change",e=>{ state.sort=e.target.value; renderGrid(); });
$("#addBtn").addEventListener("click",openAdd);
$("#drawerToggle").addEventListener("click",()=>{ state.drawerOpen=!state.drawerOpen; renderDrawer(); });
$("#modeAll").addEventListener("click",()=>{ state.matchMode="all"; render(); });
$("#modeAny").addEventListener("click",()=>{ state.matchMode="any"; render(); });
$("#clearParty").addEventListener("click",()=>{ state.party=[]; render(); });

setTheme(lsGet("ql_theme")||"dark");
initAuth();
loadData();
