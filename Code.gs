/************************************************************************
 * SIDE QUEST — Google Apps Script backend
 * Connects your Google Sheet to the Side Quest website.
 *
 * SETUP (full walkthrough in SETUP.md):
 *   1. Fill in CLIENT_ID and ALLOWED_EMAILS below.
 *   2. Run "Side Quest ▸ Set up sheets" from the menu (reload the sheet first).
 *   3. Run "Side Quest ▸ Import starter games" once to load Lynn's list.
 *   4. Deploy ▸ New deployment ▸ Web app ▸ Execute as: Me, Access: Anyone.
 *   5. Copy the /exec URL into the website's CONFIG.APPS_SCRIPT_URL.
 ************************************************************************/

/* ====== ✏️ FILL THESE IN ====== */
const CLIENT_ID = "";  // your Google OAuth client ID (…apps.googleusercontent.com)
const ALLOWED_EMAILS = [
  // lowercase Google account emails allowed to post/vote/comment:
  // "lynn@gmail.com", "blake@gmail.com", "lia@gmail.com", "alvaro@gmail.com",
];
/* ============================== */

const SHEETS = {
  Games:    ["appid","title","people","genres","modes","dim","players","mods","note","reviewPct","reviewDesc","releaseDate","releaseTs","trailer","addedBy","addedTs"],
  Comments: ["id","appid","email","name","picture","text","ts"],
  Upvotes:  ["appid","email","ts"],
  Users:    ["email","displayName"],
};

/* ---------- menu ---------- */
function onOpen(){
  SpreadsheetApp.getUi().createMenu("Side Quest")
    .addItem("Set up sheets","setupSheets")
    .addItem("Import starter games","importStarter")
    .addItem("Refresh Steam data (reviews + trailers)","refreshSteam")
    .addToUi();
}
function setupSheets(){
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(name=>{
    let sh=ss.getSheetByName(name);
    if(!sh) sh=ss.insertSheet(name);
    sh.clear();
    sh.getRange(1,1,1,SHEETS[name].length).setValues([SHEETS[name]]).setFontWeight("bold");
    sh.setFrozenRows(1);
  });
  const def=ss.getSheetByName("Sheet1"); if(def) ss.deleteSheet(def);
  SpreadsheetApp.getUi().alert("Sheets ready. Now run 'Import starter games'.");
}
// Adds any missing columns to the Games tab without wiping data (safe to re-run).
function ensureGamesColumns(){
  const sh=sheet("Games"); if(!sh) return;
  let lastCol=Math.max(1,sh.getLastColumn());
  let head=sh.getRange(1,1,1,lastCol).getValues()[0];
  SHEETS.Games.forEach(col=>{
    if(head.indexOf(col)===-1){ lastCol++; sh.getRange(1,lastCol).setValue(col).setFontWeight("bold"); head.push(col); }
  });
}

/* ---------- helpers ---------- */
function sheet(name){ return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); }
function rows(name){
  const sh=sheet(name); if(!sh) return [];
  const data=sh.getDataRange().getValues(); if(data.length<2) return [];
  const head=data[0];
  return data.slice(1).map(r=>{ const o={}; head.forEach((h,i)=>o[h]=r[i]); return o; });
}
function json(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function splitList(s){ return String(s||"").split(",").map(x=>x.trim()).filter(Boolean); }

/* ---------- read ---------- */
function doGet(e){
  try{
    ensureGamesColumns();
    const games=rows("Games").map(g=>({
      appid:String(g.appid), title:g.title, people:splitList(g.people), genres:splitList(g.genres),
      modes:splitList(g.modes), dim:g.dim, players:Number(g.players)||1, mods:String(g.mods)==="true"||g.mods===true,
      note:g.note||"", reviewPct:(g.reviewPct===""||g.reviewPct==null)?null:Number(g.reviewPct), reviewDesc:g.reviewDesc||"",
      releaseDate:g.releaseDate||"", releaseTs:Number(g.releaseTs)||0, trailer:g.trailer||"", addedTs:Number(g.addedTs)||0,
    }));
    const comments=rows("Comments").map(c=>({id:String(c.id),appid:String(c.appid),email:c.email,name:c.name,picture:c.picture||"",text:c.text,ts:Number(c.ts)||0}));
    const upvotes=rows("Upvotes").map(u=>({appid:String(u.appid),email:u.email,ts:Number(u.ts)||0}));
    const users=rows("Users").map(u=>({email:u.email,displayName:u.displayName}));
    return json({ok:true,games,comments,upvotes,users});
  }catch(err){ return json({ok:false,error:String(err)}); }
}

/* ---------- write ---------- */
function doPost(e){
  try{
    const body=JSON.parse(e.postData.contents||"{}");
    const user=verify(body.idToken);
    if(!user) return json({ok:false,error:"Sign-in required or not on the guest list."});
    const a=body.action;

    if(a==="addGame"){
      const g=body.game||{};
      const appid=String(g.appid||"").replace(/\D/g,"");
      if(!appid) return json({ok:false,error:"Bad app id."});
      if(rows("Games").some(x=>String(x.appid)===appid)) return json({ok:false,error:"Already on the list."});
      const steam=fetchSteam(appid);
      const now=Date.now();
      const game={ appid, title:g.title||steam.title||("App "+appid), people:(g.people||[]).join(","),
        genres:(g.genres||[]).join(","), modes:(g.modes||[]).join(","), dim:g.dim||"2D",
        players:Number(g.players)||1, mods:!!g.mods, note:g.note||"",
        reviewPct:steam.reviewPct, reviewDesc:steam.reviewDesc, releaseDate:steam.releaseDate,
        releaseTs:steam.releaseTs, trailer:steam.trailer, addedBy:user.email, addedTs:now };
      sheet("Games").appendRow(SHEETS.Games.map(k=>game[k]));
      return json({ok:true, game:{...game, people:g.people||[], genres:g.genres||[], modes:g.modes||[], mods:!!g.mods,
        reviewPct:steam.reviewPct===""?null:steam.reviewPct}});
    }

    if(a==="addComment"){
      const id="c"+Date.now()+Math.floor(Math.random()*1000);
      const row={id, appid:String(body.appid), email:user.email, name:displayName(user), picture:user.picture||"", text:String(body.text||"").slice(0,2000), ts:Date.now()};
      sheet("Comments").appendRow(SHEETS.Comments.map(k=>row[k]));
      return json({ok:true, comment:row});
    }

    if(a==="deleteComment"){
      const sh=sheet("Comments"); const data=sh.getDataRange().getValues();
      for(let i=1;i<data.length;i++){ if(String(data[i][0])===String(body.id)){
        if(data[i][2]!==user.email) return json({ok:false,error:"Not your comment."});
        sh.deleteRow(i+1); return json({ok:true}); } }
      return json({ok:false,error:"Not found."});
    }

    if(a==="toggleUpvote"){
      const sh=sheet("Upvotes"); const data=sh.getDataRange().getValues(); const appid=String(body.appid);
      for(let i=1;i<data.length;i++){ if(String(data[i][0])===appid && data[i][1]===user.email){
        sh.deleteRow(i+1); return json({ok:true, upvoted:false, count:countUp(appid)}); } }
      sh.appendRow([appid,user.email,Date.now()]);
      return json({ok:true, upvoted:true, count:countUp(appid)});
    }

    if(a==="setName"){
      const sh=sheet("Users"); const data=sh.getDataRange().getValues(); const nm=String(body.displayName||"").slice(0,40);
      for(let i=1;i<data.length;i++){ if(data[i][0]===user.email){ sh.getRange(i+1,2).setValue(nm); return json({ok:true}); } }
      sh.appendRow([user.email,nm]); return json({ok:true});
    }

    if(a==="editNote"){
      const sh=sheet("Games"); const data=sh.getDataRange().getValues(); const appid=String(body.appid);
      const col=SHEETS.Games.indexOf("note")+1;
      for(let i=1;i<data.length;i++){ if(String(data[i][0])===appid){ sh.getRange(i+1,col).setValue(String(body.note||"")); return json({ok:true}); } }
      return json({ok:false,error:"Not found."});
    }

    return json({ok:false,error:"Unknown action."});
  }catch(err){ return json({ok:false,error:String(err)}); }
}

function countUp(appid){ return rows("Upvotes").filter(u=>String(u.appid)===String(appid)).length; }
function displayName(user){ const u=rows("Users").find(x=>x.email===user.email); return (u&&u.displayName)||user.name; }

/* ---------- auth ---------- */
function verify(idToken){
  if(!idToken) return null;
  try{
    const r=UrlFetchApp.fetch("https://oauth2.googleapis.com/tokeninfo?id_token="+encodeURIComponent(idToken),{muteHttpExceptions:true});
    if(r.getResponseCode()!==200) return null;
    const p=JSON.parse(r.getContentText());
    if(CLIENT_ID && p.aud!==CLIENT_ID) return null;
    if(p.email_verified!=="true" && p.email_verified!==true) return null;
    const email=String(p.email||"").toLowerCase();
    if(ALLOWED_EMAILS.length && ALLOWED_EMAILS.indexOf(email)===-1) return null;
    return {email, name:p.name||p.given_name||"Player", picture:p.picture||""};
  }catch(err){ return null; }
}

/* ---------- Steam ---------- */
function fetchSteam(appid){
  const out={title:"", reviewPct:"", reviewDesc:"", releaseDate:"", releaseTs:0, trailer:""};
  try{
    const d=UrlFetchApp.fetch("https://store.steampowered.com/api/appdetails?appids="+appid,{muteHttpExceptions:true});
    const j=JSON.parse(d.getContentText());
    if(j[appid] && j[appid].success){
      const data=j[appid].data;
      out.title=data.name||"";
      if(data.release_date && data.release_date.date){
        out.releaseDate=data.release_date.date;
        const t=Date.parse(data.release_date.date); if(!isNaN(t)) out.releaseTs=t;
      }
      if(data.movies && data.movies.length){
        const mv=data.movies[0];
        let url = (mv.mp4 && (mv.mp4.max||mv.mp4["480"])) || (mv.webm && (mv.webm.max||mv.webm["480"])) || "";
        if(url) out.trailer = String(url).replace(/^http:/,"https:");
      }
    }
  }catch(err){}
  try{
    const rv=UrlFetchApp.fetch("https://store.steampowered.com/appreviews/"+appid+"?json=1&language=all&purchase_type=all&num_per_page=0",{muteHttpExceptions:true});
    const q=JSON.parse(rv.getContentText());
    if(q && q.query_summary && q.query_summary.total_reviews>0){
      const s=q.query_summary;
      out.reviewPct=Math.round((s.total_positive/s.total_reviews)*100);
      out.reviewDesc=s.review_score_desc||"";
    }
  }catch(err){}
  return out;
}

/* ---------- refresh existing rows from Steam (reviews + trailers + release) ---------- */
function refreshSteam(){
  const sh=sheet("Games");
  if(!sh){ SpreadsheetApp.getUi().alert("Run 'Set up sheets' first."); return; }
  ensureGamesColumns();
  const data=sh.getDataRange().getValues();
  const head=data[0];
  const idx=name=>head.indexOf(name);
  let n=0;
  for(let i=1;i<data.length;i++){
    const appid=String(data[i][idx("appid")]).replace(/\D/g,""); if(!appid) continue;
    const s=fetchSteam(appid); Utilities.sleep(250);
    if(s.title && !data[i][idx("title")]) sh.getRange(i+1,idx("title")+1).setValue(s.title);
    sh.getRange(i+1,idx("reviewPct")+1).setValue(s.reviewPct);
    sh.getRange(i+1,idx("reviewDesc")+1).setValue(s.reviewDesc);
    if(s.releaseDate) sh.getRange(i+1,idx("releaseDate")+1).setValue(s.releaseDate);
    if(s.releaseTs)   sh.getRange(i+1,idx("releaseTs")+1).setValue(s.releaseTs);
    if(s.trailer)     sh.getRange(i+1,idx("trailer")+1).setValue(s.trailer);
    n++;
  }
  SpreadsheetApp.getUi().alert("Refreshed "+n+" games from Steam (reviews + trailers).");
}

/* ---------- starter import ---------- */
function importStarter(){
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const sh=ss.getSheetByName("Games");
  if(!sh){ SpreadsheetApp.getUi().alert("Run 'Set up sheets' first."); return; }
  const existing=new Set(rows("Games").map(g=>String(g.appid)));
  const seed=STARTER_GAMES;
  const now=Date.now();
  let added=0;
  seed.forEach((g,idx)=>{
    const appid=String(g.appid); if(existing.has(appid)) return;
    const steam=fetchSteam(appid);
    Utilities.sleep(250); // be gentle to Steam
    const row={ appid, title:g.title||steam.title||("App "+appid), people:(g.people||[]).join(","),
      genres:(g.genres||[]).join(","), modes:(g.modes||[]).join(","), dim:g.dim||"2D",
      players:g.players||1, mods:!!g.mods, note:g.note||"",
      reviewPct:steam.reviewPct, reviewDesc:steam.reviewDesc, releaseDate:steam.releaseDate,
      releaseTs:steam.releaseTs, trailer:steam.trailer, addedBy:"seed", addedTs:now+idx };
    sh.appendRow(SHEETS.Games.map(k=>row[k]));
    added++;
  });
  SpreadsheetApp.getUi().alert("Imported "+added+" games (reviews pulled from Steam).");
}

const STARTER_GAMES = [{"appid": "1865780","title": "Downfall: A Slay the Spire Fan Expansion","people": ["blake","lynn"],"genres": ["Deckbuilder"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "1092790","title": "Inscryption","people": ["blake","lynn"],"genres": ["Deckbuilder"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "590380","title": "Into the Breach","people": ["blake","lynn"],"genres": ["Strategy","Turn-Based"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "2084000","title": "Shogun Showdown","people": ["blake","lynn"],"genres": ["Strategy","Turn-Based","Deckbuilder"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "2097570","title": "StarVaders","people": ["blake","lynn"],"genres": ["Deckbuilder","Strategy"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "1948280","title": "Stacklands","people": ["blake","lynn"],"genres": ["Strategy"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "387290","title": "Ori and the Blind Forest","people": ["blake","lynn","alvaro"],"genres": ["Metroidvania"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": true,"note": ""},{"appid": "774361","title": "Blasphemous","people": ["blake","lynn"],"genres": ["Metroidvania"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "894020","title": "Death's Door","people": ["blake","lynn"],"genres": ["Metroidvania","Action Roguelike"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "606150","title": "Moonlighter","people": ["blake","lynn"],"genres": ["Action Roguelike"],"modes": [],"dim": "2D","players": 1,"mods": false,"note": ""},{"appid": "1466640","title": "Road 96","people": ["alvaro","lynn"],"genres": ["Screensharable Story"],"modes": [],"dim": "3D","players": 1,"mods": false,"note": ""},{"appid": "1622910","title": "Still Wakes the Deep","people": ["alvaro","lynn"],"genres": ["Screensharable Story"],"modes": [],"dim": "3D","players": 1,"mods": false,"note": ""},{"appid": "303210","title": "The Beginner's Guide","people": ["alvaro","lynn"],"genres": ["Screensharable Story"],"modes": [],"dim": "3D","players": 1,"mods": false,"note": ""},{"appid": "367520","title": "Hollow Knight","people": ["alvaro","lynn"],"genres": ["Metroidvania"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": true,"note": ""},{"appid": "283640","title": "Salt and Sanctuary","people": ["alvaro","lynn"],"genres": ["Metroidvania","Souls-like"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "1245620","title": "Elden Ring","people": ["alvaro","lynn"],"genres": ["Souls-like"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "1282100","title": "Remnant II","people": ["alvaro","lynn"],"genres": ["Souls-like"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "2849490","title": "Outward 2","people": ["alvaro","lynn"],"genres": ["Souls-like"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "787810","title": "Rogue Heroes: Ruins of Tasos","people": ["alvaro","lynn"],"genres": ["RPG"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": "Inspired by Zelda games"},{"appid": "1982340","title": "Blanc","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "1071870","title": "Biped","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "1225570","title": "Unravel Two","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "1801110","title": "BOKURA","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "295790","title": "Never Alone","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "2111550","title": "Schrodinger's Cat Burglar","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "2129530","title": "REANIMAL","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "1051950","title": "Voyage","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "972660","title": "Spiritfarer","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "2001120","title": "Split Fiction","people": ["blake","lia"],"genres": ["Adventure"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "837470","title": "Untitled Goose Game","people": ["blake","lia"],"genres": ["Comedy"],"modes": ["Co-op"],"dim": "3D","players": 2,"mods": false,"note": ""},{"appid": "291860","title": "Pit People","people": ["blake","lia"],"genres": ["Strategy"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "701160","title": "Kingdom Two Crowns","people": ["blake","lia"],"genres": ["Strategy"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "774181","title": "Rhythm Doctor","people": ["blake","lia"],"genres": ["Rhythm"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "1062110","title": "UNSIGHTED","people": ["blake","lia"],"genres": ["Metroidvania"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "534550","title": "Guacamelee 2","people": ["blake","lia"],"genres": ["Metroidvania"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "330020","title": "Children of Morta","people": ["blake","lia"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "311690","title": "Enter the Gungeon","people": ["blake","lia"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "268910","title": "Cuphead","people": ["blake","lia"],"genres": ["Difficult"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "1411020","title": "Perennial Order","people": ["blake","lia"],"genres": ["Difficult"],"modes": ["Co-op"],"dim": "2D","players": 2,"mods": false,"note": ""},{"appid": "1244090","title": "Sea of Stars","people": ["blake","lia","lynn"],"genres": ["Strategy","Turn-Based","RPG"],"modes": ["Co-op"],"dim": "2D","players": 3,"mods": false,"note": "Turn-Based JRPG"},{"appid": "1911610","title": "Windblown","people": ["blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "3D","players": 3,"mods": false,"note": "Fast-paced fantasy hack and slash"},{"appid": "958520","title": "33 Immortals","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Massively multiplayer, fantasy, hand-drawn"},{"appid": "1280930","title": "Astral Ascent","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Hack and slash, magic"},{"appid": "585710","title": "Blazing Beaks","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op","Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Top-down shooter"},{"appid": "293780","title": "Crawl","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Party, dungeon crawl"},{"appid": "247080","title": "Crypt of the NecroDancer","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike","Rhythm"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Dungeon crawler, rhythm"},{"appid": "1135230","title": "Ember Knights","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike","RPG"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "2071280","title": "Ravenswatch","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Hack and slash"},{"appid": "1337520","title": "Risk of Rain Returns","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "2015270","title": "Rotwood","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Beat 'em up"},{"appid": "2444750","title": "Shape of Dreams","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "1975580","title": "Wild Woods","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Roguelike"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Hack and slash"},{"appid": "1833200","title": "DuneCrawl","people": ["alvaro","blake","lia","lynn"],"genres": ["Action Adventure"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Campaign, open world"},{"appid": "432980","title": "INVERSUS Deluxe","people": ["alvaro","blake","lia","lynn"],"genres": ["Arcade"],"modes": ["Co-op","Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Top-down shooter"},{"appid": "422110","title": "Wand Wars","people": ["alvaro","blake","lia","lynn"],"genres": ["Arcade"],"modes": ["Co-op","Competitive"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "418530","title": "Spelunky 2","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Co-op","Competitive"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "323850","title": "Move or Die","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Party"},{"appid": "230270","title": "N++ (NPLUSPLUS)","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Precision platformer"},{"appid": "207140","title": "SpeedRunners","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Party"},{"appid": "674940","title": "Stick Fight: The Game","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Party"},{"appid": "386940","title": "Ultimate Chicken Horse","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Competitive"],"dim": "2D","players": 4,"mods": false,"note": "Party"},{"appid": "1436700","title": "Trine 5: A Clockwork Conspiracy","people": ["alvaro","blake","lia","lynn"],"genres": ["Platformer"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": "Puzzle"},{"appid": "113020","title": "Monaco: What's Yours Is Mine","people": ["alvaro","blake","lia","lynn"],"genres": ["Stealth"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "1676840","title": "For The King II","people": ["alvaro","blake","lia","lynn"],"genres": ["Strategy","Turn-Based"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": "Roguelite"},{"appid": "4662350","title": "Chess 2","people": ["alvaro","blake","lia","lynn"],"genres": ["Strategy","Turn-Based"],"modes": ["Competitive"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "1618380","title": "Spellmasons","people": ["alvaro","blake","lia","lynn"],"genres": ["Strategy","Turn-Based"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "763890","title": "Wildermyth","people": ["alvaro","blake","lia","lynn"],"genres": ["Strategy","Turn-Based","RPG"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "607050","title": "Wargroove","people": ["alvaro","blake","lia","lynn"],"genres": ["Strategy","Turn-Based"],"modes": ["Co-op","Competitive"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "728880","title": "Overcooked! 2","people": ["alvaro","blake","lia","lynn"],"genres": ["Unsimulator"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "996770","title": "Moving Out","people": ["alvaro","blake","lia","lynn"],"genres": ["Unsimulator"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "1599600","title": "PlateUp!","people": ["alvaro","blake","lia","lynn"],"genres": ["Unsimulator"],"modes": ["Co-op"],"dim": "2D","players": 4,"mods": false,"note": ""},{"appid": "1812560","title": "Super Crazy Rhythm Castle","people": ["alvaro","blake","lia","lynn"],"genres": ["Unsimulator","Rhythm"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "1217060","title": "Gunfire Reborn","people": ["alvaro","blake","lia","lynn"],"genres": ["Shooter","Action Roguelike"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "632360","title": "Risk of Rain 2","people": ["alvaro","blake","lia","lynn"],"genres": ["Shooter","Action Roguelike"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "3527290","title": "PEAK","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": "Physics"},{"appid": "3097560","title": "Liar's Bar","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Competitive"],"dim": "3D","players": 4,"mods": false,"note": "Tabletop"},{"appid": "286160","title": "Tabletop Simulator","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op","Competitive"],"dim": "3D","players": 4,"mods": false,"note": "Tabletop"},{"appid": "1966720","title": "Lethal Company","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "3892270","title": "Gamble With Your Friends","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "3146520","title": "WEBFISHING","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "3438850","title": "Sledding Game","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""},{"appid": "2881650","title": "Content Warning","people": ["alvaro","blake","lia","lynn"],"genres": ["Social"],"modes": ["Co-op"],"dim": "3D","players": 4,"mods": false,"note": ""}];
