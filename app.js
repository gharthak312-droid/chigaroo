
(function(){
  "use strict";
  var GAMES = [
    { id:"snake", name:"Snake", cat:"Classic • Arcade", img:__CG_IMGS.snake,
      desc:"The classic Snake game. Eat apples to grow longer — but don't crash into the wall or your own body. The old favorite, in a fresh new premium style.",
      plays:0, likes:0, trend:98, added:1,
      steps:["Press PLAY — the snake starts moving.","Steer the snake with the arrow buttons (or swipe / keyboard arrow keys).","Every apple raises your score and makes the snake longer.","Hit the wall or your own body and the game is over — try again!"] },
    { id:"ludo", name:"Ludo", cat:"Board • Family", img:__CG_IMGS.ludo,
      desc:"The full Ludo race, now really playable! You play Red against the Computer (Blue). Roll a 6 to bring a token out, race around the board, knock the computer's tokens back home — and get both of your tokens home first to win.",
      plays:0, likes:0, trend:87, added:2,
      steps:["Press PLAY, then tap “Roll Dice” — a roll of 6 brings a token out of your base.","Tap one of your glowing tokens to move it. Rolling a 6 gives you another turn.","Land on a blue token to send it back to its base — but ★ squares are safe.","Bring both red tokens all the way home before the computer does, and you win!"] },
    { id:"sorting", name:"Color Sorting", cat:"Puzzle • Colors", img:__CG_IMGS.sorting,
      desc:"A calm, relaxing color-sorting puzzle. Pour colors from one tube into another — every tube should end with just one color in it. Stuck? Undo a move or restart anytime. Hard mode adds a fifth color!",
      plays:0, likes:0, trend:91, added:3,
      steps:["Press PLAY — the tubes are filled with mixed colors.","Tap one tube to pick it up, then tap another tube to pour its top color in.","A color only goes into a tube whose top color matches, or into an empty tube.","When every tube holds a single color — the puzzle is complete!"] },
    { id:"memory", name:"Memory Match", cat:"Puzzle • Brain", img:__CG_IMGS.memory,
      desc:"A game for your memory. The cards lie face down — flip two cards, and if they form a pair, they stay open. Find all the pairs in as few moves as you can. Higher difficulty means more cards — and a real brain workout.",
      plays:0, likes:0, trend:94, added:4,
      steps:["Press PLAY — all the cards are face down.","Tap one card to flip it over, then flip a second card.","If both cards show the same picture, that's a pair — the cards stay open.","Find all the pairs and the win is yours — fewer moves means a better score!"] },
    { id:"merge", name:"Tile Merge 2048", cat:"Puzzle • Numbers", img:__CG_IMGS.merge,
      desc:"The world-famous number puzzle. Slide the tiles — when two tiles with the same number touch, they merge into one bigger tile. Plan your moves, keep the board from filling up, and chase the magical 2048 tile!",
      plays:0, likes:0, trend:96, added:5, isNew:true,
      steps:["Press PLAY — two tiles are already on the board.","Swipe on the board (or use the arrow buttons / arrow keys) to slide all tiles one way.","Two tiles with the same number merge into one bigger tile, and a new tile appears.","Fill the board with no moves left and the game ends — reach 2048 to win!"] },
    { id:"bricks", name:"Brick Breaker", cat:"Arcade • Action", img:__CG_IMGS.bricks,
      desc:"The classic brick-breaking arcade game. Bounce the ball with your paddle, smash every brick, and don't let the ball fall! Clear all the bricks to reach the next level — where the ball gets faster.",
      plays:0, likes:0, trend:93, added:6, isNew:true,
      steps:["Press PLAY, then tap Start — the ball launches from the paddle.","Move the paddle by dragging on the game, or with the ◀ ▶ buttons.","Bounce the ball up to smash the bricks — every brick is points.","You have 3 balls. Clear every brick to level up — the ball speeds up each level!"] },
    { id:"tictactoe", name:"Tic Tac Toe", cat:"Board • Classic", img:__CG_IMGS.tictactoe,
      desc:"The timeless X and O game — you against the computer. Get three X's in a row before the computer gets three O's. On Hard, the computer plays perfectly… can you still force a draw?",
      plays:0, likes:0, trend:89, added:7, isNew:true,
      steps:["Press PLAY — you are X and you move first.","Tap any empty square to place your X.","The computer answers with an O — watch its plans and block them.","Three in a row (across, down or diagonal) wins the round. First to win the most rounds is champion!"] },
    { id:"mole", name:"Whack-a-Mole", cat:"Arcade • Reflex", img:__CG_IMGS.mole,
      desc:"Moles are popping up all over the garden! Whack them fast for points before they hide again — but careful: bonking the golden mole is worth 5 points, and missing costs you time. You have 30 seconds!",
      plays:0, likes:0, trend:90, added:8, isNew:true,
      steps:["Press PLAY, then tap Start — the 30-second timer begins.","Moles pop out of the holes — tap a mole quickly to whack it (+1 point).","A golden mole is rare and fast — whack it for +5 points!","When the timer ends, your score is final. Play again and beat your best!"] },
    { id:"flappy", name:"Flappy Wing", cat:"Arcade • Flying", img:__CG_IMGS.flappy,
      desc:"One little bird, endless green pipes. Tap to flap and glide through every gap — one touch on a pipe and it's over. Simple to learn, impossible to put down. How far can you fly?",
      plays:0, likes:0, trend:95, added:9, isNew:true,
      steps:["Press PLAY, then tap the game (or press the Flap button) to start flying.","Every tap flaps the wings and lifts the bird — gravity pulls it down between taps.","Fly through the gaps in the green pipes — each pipe passed is +1 point.","Touch a pipe or the ground and the flight ends. Tap to try again!"] },
    { id:"mines", name:"Mine Finder", cat:"Puzzle • Logic", img:__CG_IMGS.mines,
      desc:"A field of hidden mines — and your brain is the detector. Open squares one by one: the numbers tell you how many mines are hiding next to that square. Mark the mines with flags and clear the whole field!",
      plays:0, likes:0, trend:88, added:10, isNew:true,
      steps:["Press PLAY — the field is covered and 10 mines are hidden (your first tap is always safe).","Tap a square to open it. A number tells how many mines touch that square.","Think a square is a mine? Turn on Flag mode (or long-press) and tap to plant a flag.","Open every safe square to win — open a mine and… boom!"] }
  ];

  var state = { sound:true, sort:"newest", current:null, difficulty:"Normal", vib:false, adminUnlocked:false, gameSound:{}, gameMusic:{} };
  var sessionPlays = { snake:0, ludo:0, sorting:0, memory:0, merge:0, bricks:0, tictactoe:0, mole:0, flappy:0, mines:0 };

  /* ---------- Live play counts (Supabase) ----------
     Counts are shared by every visitor: the game_plays table holds one row
     per game, and the increment_game_play RPC adds 1 each time a game is
     opened. Everything here is fire-and-forget with a short timeout — if the
     network is down, the last cached counts are shown and every game stays
     fully playable offline. */
  var SB_URL = "https://wjjscchfxsmbytwxnqla.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqanNjY2hmeHNtYnl0d3hucWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MzMxODIsImV4cCI6MjEwOTIwOTE4Mn0.RIJqfyWLyYdPi-OD2QFzRbYBYlgm30NElPOpDeZiJ0I";
  var PLAYS_CACHE_KEY = "chigaroo_plays_cache";
  var livePlays = {};
  var liveOK = false;
  try{
    var cachedPlays = JSON.parse(localStorage.getItem(PLAYS_CACHE_KEY) || "{}");
    if(cachedPlays && typeof cachedPlays === "object"){ for(var ck in cachedPlays){ if(typeof cachedPlays[ck] === "number") livePlays[ck] = cachedPlays[ck]; } }
  }catch(e){}
  function cachePlays(){ try{ localStorage.setItem(PLAYS_CACHE_KEY, JSON.stringify(livePlays)); }catch(e){} }
  function displayPlays(g){ return livePlays[g.id] || 0; }
  function sbFetch(path, opts){
    opts = opts || {};
    var ctrl = ("AbortController" in window) ? new AbortController() : null;
    var timer = null;
    if(ctrl){ opts.signal = ctrl.signal; timer = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} }, 5000); }
    var done = function(){ if(timer) clearTimeout(timer); };
    return fetch(SB_URL + path, opts).then(function(r){ done(); return r; }, function(err){ done(); throw err; });
  }
  function sbHeaders(extra){
    var h = { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY };
    if(extra){ for(var k in extra) h[k] = extra[k]; }
    return h;
  }
  function updatePlayedLines(){
    document.querySelectorAll("[data-played-for]").forEach(function(el){
      var n = livePlays[el.getAttribute("data-played-for")] || 0;
      el.textContent = "Played: " + fmtNum(n);
    });
  }
  function refreshPlayCounts(){
    return sbFetch("/rest/v1/game_plays?select=game_id,plays", { headers: sbHeaders() })
      .then(function(r){ if(!r.ok) throw new Error("bad status"); return r.json(); })
      .then(function(rows){
        if(Array.isArray(rows)) rows.forEach(function(row){ if(row && typeof row.plays === "number") livePlays[row.game_id] = row.plays; });
        liveOK = true;
        cachePlays();
        updatePlayedLines();
        var av = document.getElementById("view-admin");
        if(av && av.classList.contains("active")) renderAdmin();
      })
      .catch(function(){ /* offline: keep showing the cached counts */ });
  }
  function incrementPlay(id){
    sbFetch("/rest/v1/rpc/increment_game_play", {
      method: "POST",
      headers: sbHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ p_game: id })
    })
      .then(function(r){ if(!r.ok) throw new Error("bad status"); return r.json(); })
      .then(function(v){
        if(typeof v === "number"){ livePlays[id] = v; liveOK = true; cachePlays(); updatePlayedLines(); }
        refreshPlayCounts();
      })
      .catch(function(){ /* offline: the game still plays; the count updates next time the network is back */ });
  }

  /* ---------- Owner-added games (device cache; cloud sync below) ---------- */
  var OWNER_GAMES_KEY = "chigaroo_owner_games";
  function ownerGameSteps(){
    return ["Press PLAY to open this game.","This game was added by the owner from the admin panel.","It is saved on this device only."];
  }
  function saveOwnerGames(){
    try{
      var list = GAMES.filter(function(g){ return g.owner; }).map(function(g){
        return { id:g.id, name:g.name, cat:g.cat, img:g.img, desc:g.desc, fileType:g.fileType || "HTML5 web version",
                 createdTs:(typeof g.createdTs === "number" ? g.createdTs : null) };
      });
      localStorage.setItem(OWNER_GAMES_KEY, JSON.stringify(list));
    }catch(e){ /* storage full or blocked: the games stay for this session only */ }
  }
  function restoreOwnerGames(){
    var list = [];
    try{ list = JSON.parse(localStorage.getItem(OWNER_GAMES_KEY) || "[]"); }catch(e){ list = []; }
    if(!Array.isArray(list)) return;
    var maxAdded = 0;
    GAMES.forEach(function(x){ if(x.added > maxAdded) maxAdded = x.added; });
    list.forEach(function(o){
      if(!o || !o.name) return;
      if(o.id && isPendingDelete(""+o.id)) return; /* delete pending for this game — keep it hidden */
      maxAdded += 1;
      var cts = (typeof o.createdTs === "number" && o.createdTs) ? o.createdTs : null;
      if(!cts && o.id){ var m = /^owner-(\d+)$/.exec(""+o.id); if(m) cts = parseInt(m[1], 10); }
      var g = {
        id: o.id || ("owner-" + maxAdded), name: ""+o.name, cat: ""+(o.cat || "Other"), img: o.img || __CG_IMGS.logo,
        desc: ""+(o.desc || ""), plays:0, likes:0, trend:50, added:maxAdded, isNew:true, owner:true,
        createdTs: cts, fileType: o.fileType || "HTML5 web version", steps: ownerGameSteps()
      };
      GAMES.push(g);
      if(!(g.id in sessionPlays)) sessionPlays[g.id] = 0;
    });
  }

  /* ---------- Owner games in the cloud (Supabase owner_games) ----------
     On load the owner_games table is read with the anon key and merged into
     the games list, so a game the owner added on one device shows on every
     device. Writes happen only when the admin Add Game form is submitted
     (add_owner_game), when an owner game's Delete button is tapped
     (delete_owner_game), or when a previously failed delete of the owner's
     own game is retried (see the pending-deletes block below). If the fetch
     fails or the device is offline, the localStorage-cached owner games
     (restored above) are used instead and everything keeps working. */
  function refreshOwnerGames(){
    return sbFetch("/rest/v1/owner_games?select=id,name,category,description,image_url,created_at&order=created_at.asc", { headers: sbHeaders() })
      .then(function(r){ if(!r.ok) throw new Error("bad status"); return r.json(); })
      .then(function(rows){
        if(!Array.isArray(rows)) return;
        var maxAdded = 0;
        GAMES.forEach(function(x){ if(x.added > maxAdded) maxAdded = x.added; });
        var changed = false;
        rows.forEach(function(row){
          if(!row || !row.id || !row.name) return;
          if(isPendingDelete(""+row.id)) return; /* a delete is pending for this id — never bring the game back */
          var ts = row.created_at ? Date.parse(row.created_at) : null;
          if(typeof ts !== "number" || isNaN(ts)) ts = null;
          var existing = null;
          GAMES.forEach(function(x){ if(x.id === row.id) existing = x; });
          if(existing){
            if(!existing.owner) return; /* never overwrite a built-in game */
            existing.name = ""+row.name;
            existing.cat = ""+(row.category || "Other");
            if(row.image_url) existing.img = ""+row.image_url;
            existing.desc = ""+(row.description || "");
            if(ts) existing.createdTs = ts;
            changed = true;
          } else {
            maxAdded += 1;
            var g = {
              id: ""+row.id, name: ""+row.name, cat: ""+(row.category || "Other"),
              img: row.image_url ? ""+row.image_url : __CG_IMGS.logo,
              desc: ""+(row.description || ""), plays:0, likes:0, trend:50, added:maxAdded, isNew:true, owner:true,
              createdTs: ts, fileType: "HTML5 web version", steps: ownerGameSteps()
            };
            GAMES.push(g);
            if(!(g.id in sessionPlays)) sessionPlays[g.id] = 0;
            changed = true;
          }
        });
        if(changed){
          saveOwnerGames();
          renderGrid();
          var av = document.getElementById("view-admin");
          if(av && av.classList.contains("active")) renderAdmin();
        }
      })
      .catch(function(){ /* offline: keep showing the owner games cached on this device */ });
  }
  function saveOwnerGameToCloud(g){
    return sbFetch("/rest/v1/rpc/add_owner_game", {
      method: "POST",
      headers: sbHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ p_id: g.id, p_name: g.name, p_category: g.cat, p_description: g.desc, p_image_url: g.img })
    }).then(function(r){ if(!r.ok) throw new Error("bad status"); });
  }
  /* ---------- Pending owner-game deletes ----------
     A delete only counts once delete_owner_game succeeds in the cloud. If
     the RPC fails or the device is offline, the game's id is kept in the
     pending set (localStorage) and the game stays hidden on this device;
     every pending id is retried on each page load and whenever the admin
     panel opens, and an id leaves the set only after its delete RPC
     succeeds. While an id is pending, the cloud merge above never re-adds
     that row to the grid. */
  var PENDING_DELETES_KEY = "chigaroo_pending_deletes";
  function getPendingDeletes(){
    var list = [];
    try{ list = JSON.parse(localStorage.getItem(PENDING_DELETES_KEY) || "[]"); }catch(e){ list = []; }
    if(!Array.isArray(list)) return [];
    return list.filter(function(p){ return p && p.id; }).map(function(p){ return { id:""+p.id, name:""+(p.name || "") }; });
  }
  function savePendingDeletes(list){
    try{ localStorage.setItem(PENDING_DELETES_KEY, JSON.stringify(list)); }catch(e){ /* storage blocked: retries just won't persist */ }
  }
  function addPendingDelete(id, name){
    var list = getPendingDeletes();
    var found = false;
    list.forEach(function(p){ if(p.id === id) found = true; });
    if(!found){ list.push({ id:id, name:name || "" }); savePendingDeletes(list); }
  }
  function clearPendingDelete(id){
    savePendingDeletes(getPendingDeletes().filter(function(p){ return p.id !== id; }));
  }
  function isPendingDelete(id){
    var found = false;
    getPendingDeletes().forEach(function(p){ if(p.id === id) found = true; });
    return found;
  }
  function deleteOwnerGameFromCloud(id){
    return sbFetch("/rest/v1/rpc/delete_owner_game", {
      method: "POST",
      headers: sbHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ p_id: id })
    }).then(function(r){ if(!r.ok) throw new Error("bad status"); });
  }
  function retryPendingDeletes(){
    var list = getPendingDeletes();
    if(!list.length) return Promise.resolve();
    var jobs = list.map(function(p){
      return deleteOwnerGameFromCloud(p.id).then(function(){
        clearPendingDelete(p.id);
      }, function(){ /* still pending — retried on the next page load / admin open */ });
    });
    return Promise.all(jobs).then(function(){
      var av = document.getElementById("view-admin");
      if(av && av.classList.contains("active")) renderAdmin();
    });
  }
  function deleteOwnerGame(id){
    var idx = -1, game = null;
    GAMES.forEach(function(x, i){ if(x.id === id && x.owner){ idx = i; game = x; } });
    if(idx < 0) return;
    GAMES.splice(idx, 1);
    delete sessionPlays[id];
    /* Record the delete as pending BEFORE asking the cloud, so a failed or
       offline delete is retried later instead of the game silently
       coming back on the next load. */
    addPendingDelete(id, game.name);
    saveOwnerGames();
    renderGrid();
    renderAdmin();
    tap();
    deleteOwnerGameFromCloud(id).then(function(){
      clearPendingDelete(id);
      renderAdmin();
    }, function(){
      /* The delete did not reach the cloud: the id stays in the pending
         set, the game stays hidden here, and the panel shows the delete as
         pending — it will be retried. Nothing claims the cloud copy is
         gone. */
      renderAdmin();
    });
  }

  /* ---------- Sound (WebAudio beep, resumed on gesture) ---------- */
  var actx = null;
  function beep(freq, dur){
    if(!state.sound) return;
    if(inPlay && state.current && state.gameSound[state.current.id]===false) return;
    try{
      if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)();
      if(actx.state === "suspended") actx.resume();
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = "sine"; o.frequency.value = freq || 620;
      g.gain.setValueAtTime(0.08, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + (dur||0.09));
      o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + (dur||0.09));
    }catch(e){}
  }
  function tap(){ beep(640, 0.07); if(state.vib && navigator.vibrate) navigator.vibrate(8); }
  function beepSeq(notes, gap){
    if(!state.sound) return;
    if(inPlay && state.current && state.gameSound[state.current.id]===false) return;
    notes.forEach(function(n, i){ setTimeout(function(){ beep(n, 0.13); }, i * (gap || 110)); });
  }
  /* Game-over alarm: a short ~2-second descending jingle, like classic game-over sounds */
  function goTone(freq, delay, dur){
    try{
      if(!actx) actx = new (window.AudioContext||window.webkitAudioContext)();
      if(actx.state === "suspended") actx.resume();
      var t0 = actx.currentTime + delay;
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = "square"; o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.05, t0 + 0.03);
      g.gain.setValueAtTime(0.05, t0 + Math.max(0.03, dur - 0.06));
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    }catch(e){}
  }
  function playGameOverSound(){
    if(!state.sound) return;
    if(inPlay && state.current && state.gameSound[state.current.id]===false) return;
    [392, 370, 349, 311].forEach(function(f, i){ goTone(f, i * 0.26, 0.26); });
    goTone(262, 1.04, 0.34);
    goTone(196, 1.42, 0.58); /* total ≈ 2 seconds */
  }
  function shuffleArr(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

  /* ---------- Views ---------- */
  var views = ["home","game","play","premium","settings","privacy","terms","addgame","adminpin","admin"];
  function showView(name){
    var isAdmin = name === "adminpin" || name === "admin";
    views.forEach(function(v){ document.getElementById("view-"+v).classList.toggle("active", v===name); });
    document.body.classList.toggle("admin-mode", isAdmin);
    document.body.classList.toggle("playing", name === "play");
    try{
      if(isAdmin && window.location.hash !== "#/admin") window.history.replaceState(null, "", "#/admin");
      else if(!isAdmin && window.location.hash === "#/admin") window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }catch(e){}
    closeMenu();
    window.scrollTo({top:0});
    var phone = document.getElementById("phone"); if(phone) phone.scrollTop = 0;
  }
  function openAdmin(){
    if(state.adminUnlocked){ renderAdmin(); showView("admin"); refreshPlayCounts(); retryPendingDeletes(); refreshOwnerGames(); }
    else showView("adminpin");
  }

  /* ---------- Home grid + sorting ---------- */
  var grid = document.getElementById("gameGrid");
  function fmt(n){ return n >= 1000 ? (Math.round(n/100)/10) + "k" : ""+n; }
  function esc(s){ return (""+s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function newestKey(g){
    /* Owner games carry their real created_at time; built-in games keep
       their original added order underneath them. */
    return (typeof g.createdTs === "number" && g.createdTs) ? g.createdTs : g.added;
  }
  function sortedGames(){
    var arr = GAMES.slice();
    if(state.sort==="trending") arr.sort(function(a,b){return displayPlays(b)-displayPlays(a) || b.trend-a.trend;});
    else if(state.sort==="popular") arr.sort(function(a,b){return b.likes-a.likes || b.added-a.added;});
    else if(state.sort==="mostPlayed") arr.sort(function(a,b){
      if(liveOK) return displayPlays(b)-displayPlays(a) || b.added-a.added;
      return (sessionPlays[b.id]||0)-(sessionPlays[a.id]||0) || b.added-a.added;
    });
    else if(state.sort==="newest") arr.sort(function(a,b){return newestKey(b)-newestKey(a);});
    return arr;
  }
  function renderGrid(){
    var ig = document.getElementById("introGames"); if(ig) ig.textContent = GAMES.length + " games";
    grid.innerHTML = "";
    sortedGames().forEach(function(g){
      var btn = document.createElement("button");
      btn.className = "game-card"; btn.setAttribute("aria-label", "Open the " + g.name + " game");
      btn.innerHTML = '<img src="'+esc(g.img)+'" alt="'+esc(g.name)+' game picture" loading="lazy">' +
        '<span class="game-meta"><span class="game-name">'+esc(g.name)+(g.isNew?'<span class="badge-new">NEW</span>':"")+'</span>' +
        '<span class="game-cat" style="display:block">'+esc(g.cat)+'</span>' +
        '<span class="game-plays" data-played-for="'+g.id+'">Played: '+fmtNum(displayPlays(g))+'</span>' +
        '<span class="game-plays">Offline • Tap to open</span></span>';
      btn.addEventListener("click", function(){ tap(); openGame(g.id); });
      grid.appendChild(btn);
    });
    var a = document.createElement("button");
    a.className = "add-tile"; a.setAttribute("aria-label", "Add your own game to Chigaroo");
    a.innerHTML = '<span class="add-art" aria-hidden="true"><span class="plus">+</span></span>' +
      '<span class="game-meta"><span class="game-name">Add Your Game</span>' +
      '<span class="game-cat" style="display:block">For game developers</span>' +
      '<span class="game-plays">List your game for a fee</span></span>';
    a.addEventListener("click", function(){ tap(); showView("addgame"); });
    grid.appendChild(a);
    var c = document.createElement("div");
    c.className = "coming"; c.setAttribute("role","note");
    c.innerHTML = '<span class="coming-art" aria-hidden="true">🕐</span><span class="game-meta"><span class="game-name">Coming Soon</span><span class="game-cat" style="display:block">More games are on the way</span><span class="game-plays">New games added regularly</span></span>';
    grid.appendChild(c);
  }
  function setSort(s){
    state.sort = s;
    document.querySelectorAll("[data-sort]").forEach(function(el){
      el.setAttribute("aria-pressed", el.getAttribute("data-sort")===s ? "true":"false");
    });
    renderGrid();
  }
  document.querySelectorAll("[data-sort]").forEach(function(el){
    el.addEventListener("click", function(){ tap(); setSort(el.getAttribute("data-sort")); closeMenu(); });
  });

  /* ---------- Menu ---------- */
  var menu = document.getElementById("menuPanel"), kebab = document.getElementById("kebabBtn"), scrim = document.getElementById("scrim");
  function closeMenu(){ menu.classList.remove("open"); scrim.classList.remove("open"); kebab.setAttribute("aria-expanded","false"); }
  kebab.addEventListener("click", function(){
    tap();
    var open = menu.classList.toggle("open");
    scrim.classList.toggle("open", open);
    kebab.setAttribute("aria-expanded", open?"true":"false");
  });
  scrim.addEventListener("click", closeMenu);
  document.getElementById("menuSettings").addEventListener("click", function(){ tap(); showView("settings"); });
  document.getElementById("menuPrivacy").addEventListener("click", function(){ tap(); showView("privacy"); });
  document.getElementById("menuTerms").addEventListener("click", function(){ tap(); showView("terms"); });
  document.getElementById("menuPremium").addEventListener("click", function(){ tap(); showView("premium"); });
  document.getElementById("menuAddGame").addEventListener("click", function(){ tap(); showView("addgame"); });

  /* ---------- Sound toggles (synced) ---------- */
  var soundEls = [document.getElementById("soundToggle"), document.getElementById("setSound")];
  function setSound(v){
    state.sound = v;
    soundEls.forEach(function(el){ el.checked = v; });
    if(v) beep(700, 0.08);
  }
  soundEls.forEach(function(el){ el.addEventListener("change", function(){ setSound(el.checked); }); });
  document.getElementById("setVib").addEventListener("change", function(e){ state.vib = e.target.checked; tap(); });

  /* ---------- Back buttons ---------- */
  document.querySelectorAll("[data-back]").forEach(function(b){
    b.addEventListener("click", function(){ tap(); stopAllGames(); inPlay = false; renderGrid(); showView("home"); });
  });

  /* ---------- Game detail ---------- */
  var playBody = document.getElementById("playBody"), playTitle = document.getElementById("playTitle");
  function openGame(id){
    var g = GAMES.filter(function(x){return x.id===id;})[0]; if(!g) return;
    state.current = g;
    stopAllGames(); inPlay = false;
    document.getElementById("dImg").src = g.img;
    document.getElementById("dImg").alt = g.name + " game picture";
    document.getElementById("dName").textContent = g.name;
    document.getElementById("dCat").textContent = g.cat + " • Offline game" + ((sessionPlays[g.id]||0)>0 ? " • Played " + sessionPlays[g.id] + "× this session" : "");
    document.getElementById("dDesc").textContent = g.desc;
    var steps = document.getElementById("dSteps"); steps.innerHTML = "";
    g.steps.forEach(function(s){ var li=document.createElement("li"); li.textContent=s; steps.appendChild(li); });
    syncSoundUI();
    document.getElementById("gMusic").checked = !!state.gameMusic[g.id];
    showView("game");
  }
  function setDifficulty(d){ state.difficulty = d; syncDiffUI(); }
  document.querySelectorAll("#diffSeg button").forEach(function(b){
    b.addEventListener("click", function(){ tap(); setDifficulty(b.getAttribute("data-diff")); });
  });
  function syncDiffUI(){
    document.querySelectorAll("#diffSeg button").forEach(function(x){ x.setAttribute("aria-pressed", x.getAttribute("data-diff")===state.difficulty?"true":"false"); });
  }
  document.getElementById("gSound").addEventListener("change", function(e){ if(state.current) setGameSound(state.current, e.target.checked); });
  document.getElementById("gMusic").addEventListener("change", function(e){ if(state.current) state.gameMusic[state.current.id] = e.target.checked; });
  document.getElementById("dPlay").addEventListener("click", function(){
    if(!state.current) return;
    startGamePage(state.current);
  });

  function startPlay(id){
    buildGen++;
    gameHooks = { pause:null, resume:null, key:null };
    if(id==="snake") buildSnake();
    else if(id==="memory") buildMemory();
    else if(id==="ludo") buildLudo();
    else if(id==="sorting") buildSorting();
    else if(id==="merge") buildMerge();
    else if(id==="bricks") buildBricks();
    else if(id==="tictactoe") buildTicTacToe();
    else if(id==="mole") buildMole();
    else if(id==="flappy") buildFlappy();
    else if(id==="mines") buildMines();
    else if(NEW_BUILDERS[id]) NEW_BUILDERS[id]();
    else buildOwnerGame(id);
  }
  function buildOwnerGame(id){
    var g = GAMES.filter(function(x){return x.id===id;})[0]; if(!g) return;
    playTitle.textContent = g.name + " — added by owner";
    playBody.innerHTML = '<p style="font-size:14.5px;line-height:1.6;margin:0 0 10px">This game was added by the owner from the admin panel. It is saved on this device only. Its game files (' + esc(g.fileType || "HTML5 web version") + ') are noted with the listing.</p>' +
      '<div class="msg">' + esc(g.name) + ' is in the games list on this device.</div>';
  }

  /* ---------- Per-game sound ---------- */
  function gameSoundOn(g){ return state.gameSound[g.id] !== false; }
  function syncSoundUI(){
    var on = state.current ? gameSoundOn(state.current) : true;
    document.getElementById("gSound").checked = on;
    var psb = document.getElementById("playSoundBtn");
    psb.textContent = on ? "🔊" : "🔇";
    psb.setAttribute("aria-pressed", on ? "true" : "false");
  }
  function setGameSound(g, v){ state.gameSound[g.id] = v; syncSoundUI(); if(v) beep(700, 0.08); }

  /* ---------- Play page (full game on its own page) ---------- */
  var inPlay = false, isPaused = false;
  var gameHooks = { pause:null, resume:null, key:null };
  var extraTimers = [];
  var buildGen = 0;
  function later(fn, ms){
    var g = buildGen;
    var t = setTimeout(function(){ if(g === buildGen) fn(); }, ms);
    extraTimers.push(t); return t;
  }
  function stopAllGames(){
    stopSnake(); snakeLive = false;
    extraTimers.forEach(function(t){ clearTimeout(t); }); extraTimers = [];
    if(gameStopFn){ try{ gameStopFn(); }catch(e){} }
    gameStopFn = null;
    gameHooks = { pause:null, resume:null, key:null };
  }
  var gameStopFn = null;
  /* ---------- Game Over (red banner + alarm sound) ---------- */
  var goAgainFn = null;
  function showGameOver(detail, againFn){
    goAgainFn = againFn || null;
    if(isPaused){
      isPaused = false;
      document.getElementById("pauseOverlay").hidden = true;
      var pb0 = document.getElementById("playPauseBtn");
      pb0.textContent = "⏸"; pb0.setAttribute("aria-pressed","false");
    }
    document.getElementById("gameOverDetail").textContent = detail || "";
    document.getElementById("gameOverOverlay").hidden = false;
    playGameOverSound();
  }
  function hideGameOver(){
    document.getElementById("gameOverOverlay").hidden = true;
    goAgainFn = null;
  }
  document.getElementById("goAgain").addEventListener("click", function(){
    tap();
    var fn = goAgainFn;
    hideGameOver();
    if(fn) fn();
    else if(state.current) startGamePage(state.current);
  });
  document.getElementById("goMenu").addEventListener("click", function(){ hideGameOver(); backToGameMenu(); });
  function startGamePage(g){
    stopAllGames();
    hideGameOver();
    state.current = g;
    sessionPlays[g.id] = (sessionPlays[g.id]||0) + 1;
    incrementPlay(g.id);
    isPaused = false; inPlay = true;
    document.getElementById("pauseOverlay").hidden = true;
    var pb = document.getElementById("playPauseBtn");
    pb.textContent = "⏸"; pb.setAttribute("aria-pressed","false");
    document.getElementById("playGameName").textContent = g.name;
    syncSoundUI();
    showView("play");
    tap();
    startPlay(g.id);
  }
  function leavePlay(){
    stopAllGames(); inPlay = false; isPaused = false;
    document.getElementById("pauseOverlay").hidden = true;
    hideGameOver();
  }
  function setPaused(p){
    if(!state.current) return;
    isPaused = p;
    document.getElementById("pauseOverlay").hidden = !p;
    var pb = document.getElementById("playPauseBtn");
    pb.textContent = p ? "▶" : "⏸";
    pb.setAttribute("aria-pressed", p ? "true" : "false");
    if(state.current.id === "snake"){
      if(p) stopSnake();
      else if(snakeLive && snakeStep && snake && !snake.over && !snakeTimer) snakeTimer = setInterval(snakeStep, snakeSpeed);
    } else if(p){ if(gameHooks.pause) gameHooks.pause(); }
    else if(gameHooks.resume) gameHooks.resume();
  }
  document.getElementById("playPauseBtn").addEventListener("click", function(){ tap(); setPaused(!isPaused); });
  document.getElementById("pauseResume").addEventListener("click", function(){ tap(); setPaused(false); });
  document.getElementById("playSoundBtn").addEventListener("click", function(){ if(state.current) setGameSound(state.current, !gameSoundOn(state.current)); });
  function backToGameMenu(){ tap(); leavePlay(); if(state.current) openGame(state.current.id); }
  document.getElementById("playBack").addEventListener("click", backToGameMenu);
  document.getElementById("pauseMenu").addEventListener("click", backToGameMenu);

  /* ---------- Best scores (saved on this device, per game) ---------- */
  var BEST_KEY = "chigaroo_best_v1";
  function bestOf(id){
    try{ var m = JSON.parse(localStorage.getItem(BEST_KEY) || "{}"); return (typeof m[id] === "number" && m[id] > 0) ? m[id] : 0; }catch(e){ return 0; }
  }
  function bestSet(id, v){
    try{ var m = JSON.parse(localStorage.getItem(BEST_KEY) || "{}"); if(v > (m[id] || 0)){ m[id] = v; localStorage.setItem(BEST_KEY, JSON.stringify(m)); } return m[id] || 0; }catch(e){ return v; }
  }

  /* ---------- Snake (fully playable, upgraded) ---------- */
  var snakeTimer = null, snake = null, snakeStep = null, snakeSpeed = 125, snakeLive = false;
  function stopSnake(){ if(snakeTimer){ clearInterval(snakeTimer); snakeTimer = null; } }
  function buildSnake(){
    playTitle.textContent = "Snake — play!";
    playBody.innerHTML =
      '<div class="score-line"><span>Score: <b id="snScore">0</b></span><span>Length: <b id="snLen">3</b></span><span>Best: <b id="snBest">' + bestOf("snake") + '</b></span></div>' +
      '<canvas id="snakeCanvas" width="300" height="300" aria-label="Snake game board"></canvas>' +
      '<div class="dpad">' +
      '<span class="blank"></span><button data-dir="up" aria-label="Up">▲</button><span class="blank"></span>' +
      '<button data-dir="left" aria-label="Left">◀</button><button data-dir="down" aria-label="Down">▼</button><button data-dir="right" aria-label="Right">▶</button>' +
      '</div>' +
      '<div style="text-align:center;margin-top:12px"><button class="mini-btn orange" id="snStart">▶ Start</button></div>' +
      '<div class="msg" id="snMsg">Press Start! Apples = 10 points — a golden apple is worth 50, but it vanishes fast. Every 5 apples, the snake speeds up!</div>';
    var N = 15, cell = 20;
    var cv = document.getElementById("snakeCanvas"), ctx = cv.getContext("2d");
    var baseSpeed = state.difficulty==="Easy" ? 170 : state.difficulty==="Hard" ? 90 : 130;
    snake = { body:[{x:7,y:7},{x:6,y:7},{x:5,y:7}], dir:{x:1,y:0}, next:{x:1,y:0}, food:{x:11,y:7}, bonus:null, bonusTtl:0, eaten:0, score:0, best:bestOf("snake"), over:false };
    snakeSpeed = baseSpeed;
    function freeCell(){
      var p;
      do { p = { x: Math.floor(Math.random()*N), y: Math.floor(Math.random()*N) }; }
      while(snake.body.some(function(s){return s.x===p.x&&s.y===p.y;}) || (snake.food.x===p.x&&snake.food.y===p.y) || (snake.bonus && snake.bonus.x===p.x&&snake.bonus.y===p.y));
      return p;
    }
    function drawApple(x, y, golden){
      var cx = x*cell+10, cy = y*cell+10;
      ctx.fillStyle = golden ? "#FFC531" : "#FF3B30";
      ctx.beginPath(); ctx.arc(cx-3.5, cy+1.5, 5.6, 0, 7); ctx.arc(cx+3.5, cy+1.5, 5.6, 0, 7); ctx.fill();
      ctx.strokeStyle = "#7A4A12"; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(cx, cy-3); ctx.quadraticCurveTo(cx+1.5, cy-7.5, cx+4, cy-8); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.55)";
      ctx.beginPath(); ctx.arc(cx-4.5, cy-1, 1.8, 0, 7); ctx.fill();
      ctx.lineWidth = 1;
    }
    function draw(){
      ctx.fillStyle = "#103B24"; ctx.fillRect(0,0,300,300);
      ctx.fillStyle = "rgba(255,255,255,.028)";
      for(var gy=0; gy<N; gy++) for(var gx=0; gx<N; gx++){ if((gx+gy)%2===0) ctx.fillRect(gx*cell, gy*cell, cell, cell); }
      drawApple(snake.food.x, snake.food.y, false);
      if(snake.bonus) drawApple(snake.bonus.x, snake.bonus.y, true);
      snake.body.forEach(function(p,i){
        var pad = i===0 ? 1 : 2.2, r = i===0 ? 6 : 5;
        var x = p.x*cell+pad, y = p.y*cell+pad, w = cell-pad*2;
        ctx.fillStyle = i===0 ? "#8BF08F" : (i%2 ? "#35B558" : "#2FA84F");
        ctx.beginPath();
        if(ctx.roundRect) ctx.roundRect(x, y, w, w, r); else ctx.rect(x, y, w, w);
        ctx.fill();
        if(i===0){
          var ex = snake.dir.x, ey = snake.dir.y, px = -ey, py = ex;
          ctx.fillStyle = "#0B2415";
          [[4.5,5.5],[4.5,-5.5]].forEach(function(o){
            ctx.beginPath();
            ctx.arc(p.x*cell+10 + ex*o[0] + px*o[1], p.y*cell+10 + ey*o[0] + py*o[1], 1.9, 0, 7);
            ctx.fill();
          });
        }
      });
    }
    function syncScore(){
      document.getElementById("snScore").textContent = snake.score;
      document.getElementById("snLen").textContent = snake.body.length;
      document.getElementById("snBest").textContent = snake.best;
    }
    function step(){
      snake.dir = snake.next;
      var head = { x: snake.body[0].x + snake.dir.x, y: snake.body[0].y + snake.dir.y };
      if(head.x<0||head.y<0||head.x>=N||head.y>=N||snake.body.some(function(p){return p.x===head.x&&p.y===head.y;})){
        snake.over = true; snakeLive = false; stopSnake();
        document.getElementById("snMsg").textContent = "Game over! You scored " + snake.score + " (best " + snake.best + "). Press Start to play again.";
        showGameOver("You scored " + snake.score + " points — best " + snake.best + "."); return;
      }
      snake.body.unshift(head);
      var ate = false;
      if(head.x===snake.food.x && head.y===snake.food.y){
        ate = true; snake.score += 10; snake.eaten++; beep(880, 0.08);
        snake.food = freeCell();
        if(snake.eaten % 5 === 0 && !snake.bonus){ snake.bonus = freeCell(); snake.bonusTtl = 42; }
        var lvl = Math.floor(snake.eaten / 5);
        var ns = Math.max(55, baseSpeed - lvl * 11);
        if(ns !== snakeSpeed){ snakeSpeed = ns; stopSnake(); snakeTimer = setInterval(step, ns); }
      } else if(snake.bonus && head.x===snake.bonus.x && head.y===snake.bonus.y){
        ate = true; snake.score += 50; snake.bonus = null; beepSeq([880,1174,1568], 70);
        document.getElementById("snMsg").textContent = "Golden apple! +50 points 🍏";
      }
      if(!ate) snake.body.pop();
      if(snake.bonus){ snake.bonusTtl--; if(snake.bonusTtl<=0) snake.bonus = null; }
      if(snake.score > snake.best){ snake.best = snake.score; bestSet("snake", snake.best); }
      syncScore();
      draw();
    }
    function setDir(d){
      var map = { up:{x:0,y:-1}, down:{x:0,y:1}, left:{x:-1,y:0}, right:{x:1,y:0} };
      var nd = map[d]; if(!nd) return;
      if(nd.x === -snake.dir.x && nd.y === -snake.dir.y) return;
      snake.next = nd;
    }
    playBody.querySelectorAll("[data-dir]").forEach(function(b){
      b.addEventListener("click", function(){ if(!isPaused) setDir(b.getAttribute("data-dir")); });
    });
    cv.addEventListener("touchstart", function(e){ cv._tx = e.touches[0].clientX; cv._ty = e.touches[0].clientY; }, {passive:true});
    cv.addEventListener("touchend", function(e){
      if(cv._tx==null) return;
      var dx = e.changedTouches[0].clientX - cv._tx, dy = e.changedTouches[0].clientY - cv._ty;
      if(Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
      if(Math.abs(dx) > Math.abs(dy)) setDir(dx>0?"right":"left"); else setDir(dy>0?"down":"up");
    }, {passive:true});
    document.getElementById("snStart").addEventListener("click", function(){
      tap();
      snakeSpeed = baseSpeed; snakeLive = true; snakeStep = step;
      snake.body = [{x:7,y:7},{x:6,y:7},{x:5,y:7}]; snake.dir = {x:1,y:0}; snake.next = {x:1,y:0};
      snake.score = 0; snake.eaten = 0; snake.over = false; snake.bonus = null; snake.bonusTtl = 0;
      snake.food = {x:11,y:7};
      syncScore();
      document.getElementById("snMsg").textContent = "Go! Eat apples, grab the golden ones, and don't bite yourself!";
      stopSnake(); draw();
      snakeTimer = setInterval(step, snakeSpeed);
    });
    draw();
  }

  /* ---------- Memory Match (fully playable, upgraded) ---------- */
  var memBest = {};
  try{ var mbSaved = JSON.parse(localStorage.getItem("chigaroo_membest_v1") || "{}"); if(mbSaved && typeof mbSaved === "object") memBest = mbSaved; }catch(e){}
  function buildMemory(){
    if(gameStopFn){ try{ gameStopFn(); }catch(e){} gameStopFn = null; }
    playTitle.textContent = "Memory Match — play!";
    var cfg = state.difficulty==="Easy" ? { pairs:6, cols:4 } : state.difficulty==="Hard" ? { pairs:10, cols:4 } : { pairs:8, cols:4 };
    var FACES = [["🍎","#E5322D"],["🍌","#E8A812"],["🍇","#7B3FBF"],["🍓","#FF5A7A"],["🦁","#E8862D"],["🐼","#555F6E"],["🚗","#2E9BFF"],["⚽","#3CB54A"],["🌟","#D9A400"],["🍕","#E86A2D"]];
    var faces = FACES.slice(0, cfg.pairs);
    var cards = shuffleArr(faces.concat(faces).map(function(f,i){ return { v:f[0], color:f[1], k:i }; }));
    playBody.innerHTML = '<div class="score-line"><span>Moves: <b id="mmMoves">0</b></span><span>Pairs: <b id="mmPairs">0 / ' + cfg.pairs + '</b></span><span>Time: <b id="mmTime">0:00</b></span></div>' +
      '<div class="mem-grid" id="mmGrid" style="grid-template-columns:repeat(' + cfg.cols + ',1fr)"></div>' +
      '<div class="msg" id="mmMsg">' + state.difficulty + ' — ' + cfg.pairs + ' pairs hidden. Flip two cards and match them!</div>' +
      '<div style="text-align:center;margin-top:10px"><button class="mini-btn" id="mmReset">↻ Restart</button></div>';
    var gridEl = document.getElementById("mmGrid"), open = [], lock = false, moves = 0, pairs = 0, secs = 0, timer = null, started = false, won = false;
    function fmtT(s){ return Math.floor(s/60) + ":" + ("0" + (s%60)).slice(-2); }
    function startTimer(){
      if(timer) return;
      timer = setInterval(function(){ if(!isPaused && !won){ secs++; document.getElementById("mmTime").textContent = fmtT(secs); } }, 1000);
    }
    gameStopFn = function(){ if(timer){ clearInterval(timer); timer = null; } };
    cards.forEach(function(c){
      var b = document.createElement("button");
      b.className = "mem-card" + (cfg.pairs >= 10 ? " small" : ""); b.textContent = "?"; b.setAttribute("aria-label","Face-down card");
      b.addEventListener("click", function(){
        if(isPaused || lock || won || b.classList.contains("flipped") || b.classList.contains("matched")) return;
        if(!started){ started = true; startTimer(); }
        tap(); b.classList.add("flipped"); b.textContent = c.v; b.style.color = c.color; open.push({b:b,c:c});
        if(open.length===2){
          moves++; document.getElementById("mmMoves").textContent = moves;
          if(open[0].c.v === open[1].c.v){
            open.forEach(function(o){ o.b.classList.add("matched"); }); open = []; pairs++;
            document.getElementById("mmPairs").textContent = pairs + " / " + cfg.pairs; beep(880,0.12);
            if(pairs===cfg.pairs){
              won = true;
              var key = state.difficulty, stars = moves <= cfg.pairs + 3 ? "★★★" : moves <= cfg.pairs * 2 ? "★★☆" : "★☆☆";
              var prev = memBest[key];
              if(!prev || moves < prev){ memBest[key] = moves; try{ localStorage.setItem("chigaroo_membest_v1", JSON.stringify(memBest)); }catch(e){} }
              document.getElementById("mmMsg").textContent = "You found all " + cfg.pairs + " pairs in " + moves + " moves and " + fmtT(secs) + "! " + stars + " Best on " + key + ": " + memBest[key] + " moves 🎉";
              beepSeq([660,880,990,1320], 110);
            }
          } else {
            lock = true; var o1=open[0], o2=open[1]; open = [];
            setTimeout(function(){ [o1,o2].forEach(function(o){ o.b.classList.remove("flipped"); o.b.textContent="?"; }); lock=false; }, 720);
          }
        }
      });
      gridEl.appendChild(b);
    });
    document.getElementById("mmReset").addEventListener("click", function(){ tap(); buildMemory(); });
  }

  /* ---------- Ludo (fully playable — You vs Computer) ---------- */
  function buildLudo(){
    playTitle.textContent = "Ludo — You (Red) vs Computer (Blue)";
    /* Track: 52 cells around a 13x13 board (row,col), clockwise from Red's start */
    var PATH = [];
    (function(){
      var r, c;
      for(c=1;c<=5;c++) PATH.push([6,c]);
      for(r=5;r>=0;r--) PATH.push([r,6]);
      for(c=7;c<=12;c++) PATH.push([0,c]);
      for(r=1;r<=5;r++) PATH.push([r,12]);
      for(c=11;c>=7;c--) PATH.push([6,c]);
      for(r=7;r<=12;r++) PATH.push([r,6]);
      for(c=5;c>=0;c--) PATH.push([12,c]);
      for(r=11;r>=7;r--) PATH.push([r,0]);
      for(c=1;c<=5;c++) PATH.push([6,c]);
    })();
    var HOME_YOU = [[6,1],[6,2],[6,3],[6,4],[6,5]];
    var HOME_CPU = [[6,11],[6,10],[6,9],[6,8],[6,7]];
    var SAFE = { 0:1, 8:1, 13:1, 21:1, 26:1, 34:1, 39:1, 47:1 };
    var START = { you:0, cpu:26 };
    var FACES = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    var you = [-1,-1], cpu = [-1,-1];
    var turn = "you", dice = 0, phase = "roll", over = false, busy = false;
    playBody.innerHTML =
      '<div class="score-line"><span>Turn: <b id="luTurn">Your turn 🔴</b></span><span>Dice: <b id="luDiceVal">–</b></span></div>' +
      '<div class="ludo-wrap"><div class="ludo-board" id="luBoard" role="img" aria-label="Ludo board"></div>' +
      '<div class="ludo-bases">' +
      '<div class="ludo-base you">🔴 You <span id="luBaseYou" style="margin-inline-start:auto"></span></div>' +
      '<div class="ludo-base cpu">🔵 CPU <span id="luBaseCpu" style="margin-inline-start:auto"></span></div>' +
      '</div>' +
      '<button class="mini-btn orange roll-btn" id="luRoll">🎲 Roll Dice</button></div>' +
      '<div class="dice-face" id="luDice" aria-label="Dice" style="width:74px;height:74px;font-size:40px;margin-top:12px">🎲</div>' +
      '<div class="msg" id="luMsg">Your turn — tap Roll Dice. A 6 brings a token out of base!</div>' +
      '<div style="text-align:center"><button class="mini-btn" id="luReset">↻ New game</button></div>';
    var boardEl = document.getElementById("luBoard"), msgEl = document.getElementById("luMsg"),
        rollBtn = document.getElementById("luRoll"), turnEl = document.getElementById("luTurn");
    function cellPos(side, p){
      if(p < 0 || p > 50) return null;
      return PATH[(START[side] + p) % 52];
    }
    function homePos(side, p){
      if(p === 56) return [6,6];
      var arr = side === "you" ? HOME_YOU : HOME_CPU;
      return arr[p - 51];
    }
    function msg(t){ msgEl.textContent = t; }
    function render(pickable){
      boardEl.innerHTML = "";
      var cells = {};
      function put(rc, html, cls){
        var k = rc[0] + "," + rc[1];
        if(!cells[k]) cells[k] = { html:"", cls: cls || "" };
        cells[k].html += html;
        if(cls) cells[k].cls = cls;
      }
      for(var i=0;i<52;i++){
        var rc = PATH[i];
        if(SAFE[i]) put(rc, "", " safe");
      }
      HOME_YOU.forEach(function(rc2){ put(rc2, "", ""); });
      HOME_CPU.forEach(function(rc2){ put(rc2, "", ""); });
      function tokenHtml(side, idx, p){
        var canPick = side === "you" && pickable && pickable.indexOf(idx) >= 0;
        return '<button type="button" class="tok ' + side + (canPick ? " pick" : "") + '" data-side="' + side + '" data-idx="' + idx + '" aria-label="' + (side==="you"?"Your":"Computer") + ' token ' + (idx+1) + '">' + (idx+1) + '</button>';
      }
      [["you", you], ["cpu", cpu]].forEach(function(pair){
        var side = pair[0];
        pair[1].forEach(function(p, idx){
          if(p < 0) return;
          var rc3 = p <= 50 ? cellPos(side, p) : homePos(side, p);
          put(rc3, tokenHtml(side, idx, p), "");
        });
      });
      for(var r=0;r<13;r++) for(var c=0;c<13;c++){
        var d = document.createElement("div");
        var info = cells[r + "," + c];
        d.className = "ludo-cell" + (info ? info.cls : "");
        if(info) d.innerHTML = info.html;
        boardEl.appendChild(d);
      }
      function baseHtml(arr, side){
        var h = "";
        arr.forEach(function(p, idx){
          h += '<span class="btok ' + side + (p === 56 ? " done" : "") + '" title="Token ' + (idx+1) + '"></span>';
        });
        return h;
      }
      document.getElementById("luBaseYou").innerHTML = baseHtml(you, "you");
      document.getElementById("luBaseCpu").innerHTML = baseHtml(cpu, "cpu");
      turnEl.textContent = over ? "Game over" : (turn === "you" ? "Your turn 🔴" : "Computer 🔵");
      rollBtn.disabled = !(turn === "you" && phase === "roll" && !over && !busy);
      rollBtn.style.opacity = rollBtn.disabled ? ".45" : "1";
      boardEl.querySelectorAll(".tok.pick").forEach(function(t){
        t.addEventListener("click", function(){ tap(); moveYou(parseInt(t.getAttribute("data-idx"), 10)); });
      });
    }
    function movable(arr, d){
      var out = [];
      arr.forEach(function(p, i){
        if(p === 56) return;
        if(p === -1){ if(d === 6) out.push(i); }
        else if(p + d <= 56) out.push(i);
      });
      return out;
    }
    function applyMove(side, arr, foes, idx, d){
      var extra = (d === 6), note = "";
      if(arr[idx] === -1){ arr[idx] = 0; note = "out"; }
      else {
        arr[idx] += d;
        if(arr[idx] === 56){ extra = true; note = "home"; }
        else if(arr[idx] <= 50){
          var cell = (START[side] + arr[idx]) % 52;
          if(!SAFE[cell]){
            for(var j=0;j<foes.length;j++){
              if(foes[j] >= 0 && foes[j] <= 50 && (START[side === "you" ? "cpu" : "you"] + foes[j]) % 52 === cell){
                foes[j] = -1; extra = true; note = "capture";
              }
            }
          }
        }
      }
      return { extra: extra, note: note };
    }
    function checkWin(){
      if(you.every(function(p){ return p === 56; })){ over = true; msg("🏆 YOU WIN! Both red tokens are home — champion! Tap New game to play again."); beepSeq([523,659,784,1046], 120); return true; }
      if(cpu.every(function(p){ return p === 56; })){ over = true; msg("The computer won this time — tap New game and take revenge!"); showGameOver("The computer got both of its tokens home first — it wins this game."); return true; }
      return false;
    }
    function moveYou(idx){
      if(turn !== "you" || phase !== "move" || over) return;
      var res = applyMove("you", you, cpu, idx, dice);
      beep(740, 0.07);
      if(checkWin()){ render(null); return; }
      if(res.note === "capture") msg("Capture! You sent a blue token back to base — roll again!");
      else if(res.note === "home") msg("A token reached home! 🎉 Roll again.");
      else if(res.note === "out") msg("Token out! Roll again — sixes give extra turns.");
      else if(res.extra) msg("You rolled a 6 — roll again!");
      if(res.extra){ phase = "roll"; }
      else { turn = "cpu"; phase = "roll"; msg(msgEl.textContent + " Computer's turn…"); }
      render(null);
      if(turn === "cpu" && !over){ busy = true; render(null); later(cpuTurn, 750); }
    }
    function cpuTurn(){
      if(over || turn !== "cpu") return;
      dice = 1 + Math.floor(Math.random() * 6);
      document.getElementById("luDice").textContent = FACES[dice - 1];
      document.getElementById("luDiceVal").textContent = dice;
      beep(500 + dice * 40, 0.08);
      var mv = movable(cpu, dice);
      if(!mv.length){
        msg("Computer rolled " + dice + " — no move possible. Your turn!");
        turn = "you"; busy = false; render(null); return;
      }
      var foeStart = START.you;
      function rank(i){
        var p = cpu[i], s = 0;
        if(p === -1) s = 60;
        else {
          var np = p + dice;
          if(np === 56) s = 90;
          else if(np <= 50){
            var cell = (START.cpu + np) % 52;
            if(!SAFE[cell]){ for(var j=0;j<you.length;j++){ if(you[j] >= 0 && you[j] <= 50 && (foeStart + you[j]) % 52 === cell) s = 100; } }
            if(s < 100 && SAFE[cell]) s = 40;
          }
          s += (p < 0 ? 0 : p) / 20;
        }
        return s;
      }
      mv.sort(function(a, b){ return rank(b) - rank(a); });
      var pickCpu = state.difficulty === "Easy" ? mv[Math.floor(Math.random() * mv.length)] : mv[0];
      var res = applyMove("cpu", cpu, you, pickCpu, dice);
      render(null);
      if(checkWin()){ busy = false; render(null); return; }
      if(res.extra){ msg("Computer rolled " + dice + (res.note === "capture" ? " and captured your token!" : "") + " — it rolls again…"); later(cpuTurn, 800); }
      else {
        msg("Computer rolled " + dice + (res.note === "capture" ? " and captured your token! 😲" : ".") + " Your turn — roll the dice!");
        turn = "you"; busy = false; render(null);
      }
    }
    rollBtn.addEventListener("click", function(){
      if(turn !== "you" || phase !== "roll" || over || busy) return;
      tap();
      dice = 1 + Math.floor(Math.random() * 6);
      document.getElementById("luDice").textContent = FACES[dice - 1];
      document.getElementById("luDiceVal").textContent = dice;
      beep(500 + dice * 40, 0.08);
      var mv = movable(you, dice);
      if(!mv.length){
        msg("You rolled " + dice + " — " + (dice !== 6 && you.every(function(p){ return p < 0 || p === 57; }) ? "you need a 6 to bring a token out." : "no token can move that far.") + " Computer's turn…");
        turn = "cpu"; busy = true; render(null); later(cpuTurn, 800); return;
      }
      if(mv.length === 1 && state.difficulty !== "Hard"){ phase = "move"; msg("You rolled " + dice + " — moving your token…"); render(null); later(function(){ moveYou(mv[0]); }, 350); return; }
      phase = "move";
      msg("You rolled " + dice + " — tap one of your glowing tokens to move it.");
      render(mv);
    });
    document.getElementById("luReset").addEventListener("click", function(){ tap(); buildGen++; buildLudo(); });
    render(null);
  }

  /* ---------- Color Sorting (playable, upgraded) ---------- */
  function buildSorting(){
    playTitle.textContent = "Color Sorting — play!";
    var NAMES = { R:"red", B:"blue", G:"green", Y:"yellow", P:"purple" };
    var COLORS = { R:"#FF5252", B:"#2E9BFF", G:"#3CB54A", Y:"#FFC531", P:"#9B59D0" };
    var keys = state.difficulty==="Easy" ? ["R","B","G"] : state.difficulty==="Hard" ? ["R","B","G","Y","P"] : ["R","B","G","Y"];
    var tubes;
    do {
      var pool = [];
      keys.forEach(function(k){ for(var q=0;q<4;q++) pool.push(k); });
      shuffleArr(pool);
      tubes = [];
      for(var t=0;t<keys.length;t++) tubes.push(pool.slice(t*4, t*4+4));
      tubes.push([]); tubes.push([]);
    } while(tubes.some(function(tb){ return tb.length===4 && tb.every(function(x){ return x===tb[0]; }); }));
    var sel = -1, moves = 0, history = [], wonGame = false;
    playBody.innerHTML = '<div class="score-line"><span>Moves: <b id="csMoves">0</b></span><span>Status: <b id="csState">In progress</b></span></div>' +
      '<div class="tubes" id="csTubes"></div><div class="msg" id="csMsg">' + keys.length + ' colors, ' + tubes.length + ' tubes. Select a tube, then tap another tube to pour.</div>' +
      '<div class="btn-row"><button class="mini-btn" id="csUndo">↩ Undo</button><button class="mini-btn orange" id="csReset">↻ New puzzle</button></div>';
    var box = document.getElementById("csTubes");
    function isDone(){
      return tubes.every(function(tt){ return tt.length===0 || (tt.length===4 && tt.every(function(x){ return x===tt[0]; })); });
    }
    function render(){
      box.innerHTML = "";
      tubes.forEach(function(t, idx){
        var d = document.createElement("button");
        d.className = "tube" + (sel===idx ? " sel" : ""); d.setAttribute("aria-label","Tube " + (idx+1) + (t.length ? ", top color " + NAMES[t[t.length-1]] : ", empty"));
        t.forEach(function(c){ var f = document.createElement("span"); f.className = "fillb"; f.style.background = COLORS[c]; d.appendChild(f); });
        d.addEventListener("click", function(){
          if(wonGame || isPaused) return;
          tap();
          if(sel===-1){ if(t.length){ sel = idx; } }
          else if(sel===idx){ sel = -1; }
          else {
            var from = tubes[sel], to = tubes[idx];
            if(from.length && to.length < 4){
              var top = from[from.length-1];
              if(to.length===0 || to[to.length-1]===top){
                var run = 0;
                for(var q=from.length-1; q>=0 && from[q]===top; q--) run++;
                var n = Math.min(run, 4 - to.length);
                history.push(tubes.map(function(x){ return x.slice(); }));
                for(var m=0;m<n;m++) to.push(from.pop());
                moves++; document.getElementById("csMoves").textContent = moves; beep(700 + n*60, 0.07);
                if(isDone()){
                  wonGame = true;
                  document.getElementById("csState").textContent = "You won! 🎉";
                  document.getElementById("csMsg").textContent = "Perfectly sorted in " + moves + " moves! Tap New puzzle for another round.";
                  beepSeq([660,880,990,1320], 110);
                }
              }
              else document.getElementById("csMsg").textContent = NAMES[top] + " can't go on " + NAMES[to[to.length-1]] + " — the top colors must match.";
            } else if(to.length >= 4) document.getElementById("csMsg").textContent = "That tube is full — pick another one.";
            sel = -1;
          }
          render();
        });
        box.appendChild(d);
      });
    }
    render();
    document.getElementById("csUndo").addEventListener("click", function(){
      tap();
      if(!history.length){ document.getElementById("csMsg").textContent = "Nothing to undo yet."; return; }
      tubes = history.pop(); sel = -1; wonGame = false;
      moves++; document.getElementById("csMoves").textContent = moves;
      document.getElementById("csState").textContent = "In progress";
      render();
    });
    document.getElementById("csReset").addEventListener("click", function(){ tap(); buildSorting(); });
  }

  /* ---------- Tile Merge 2048 (playable) ---------- */
  var mgBest = bestOf("merge");
  function buildMerge(){
    playTitle.textContent = "Tile Merge 2048 — play!";
    playBody.innerHTML =
      '<div class="score-line"><span>Score: <b id="mgScore">0</b></span><span>Best: <b id="mgBest">' + mgBest + '</b></span></div>' +
      '<div class="mg-grid" id="mgGrid" style="grid-template-columns:repeat(4,1fr)"></div>' +
      '<div class="dpad">' +
      '<span class="blank"></span><button data-mdir="up" aria-label="Slide up">▲</button><span class="blank"></span>' +
      '<button data-mdir="left" aria-label="Slide left">◀</button><button data-mdir="down" aria-label="Slide down">▼</button><button data-mdir="right" aria-label="Slide right">▶</button>' +
      '</div>' +
      '<div class="msg" id="mgMsg">Swipe on the board or use the arrow buttons — two tiles with the same number merge into one!</div>' +
      '<div style="text-align:center"><button class="mini-btn" id="mgReset">↻ New game</button></div>';
    var gridEl = document.getElementById("mgGrid"), msgEl = document.getElementById("mgMsg");
    var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], score = 0, over = false, wonBig = false;
    function spawn(){
      var empty = [];
      board.forEach(function(v, i){ if(!v) empty.push(i); });
      if(!empty.length) return;
      board[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < 0.9 ? 2 : 4;
    }
    function render(){
      gridEl.innerHTML = "";
      board.forEach(function(v){
        var d = document.createElement("div");
        d.className = "mg-tile";
        if(v) d.setAttribute("data-v", v > 2048 ? "2048" : "" + v);
        d.textContent = v || "";
        gridEl.appendChild(d);
      });
      document.getElementById("mgScore").textContent = score;
      if(score > mgBest){ mgBest = score; bestSet("merge", mgBest); document.getElementById("mgBest").textContent = mgBest; }
    }
    function linesFor(dir){
      var lines = [], i, j;
      for(i=0;i<4;i++){
        var L = [];
        for(j=0;j<4;j++){
          if(dir === "left") L.push(i*4 + j);
          else if(dir === "right") L.push(i*4 + (3 - j));
          else if(dir === "up") L.push(j*4 + i);
          else L.push((3 - j)*4 + i);
        }
        lines.push(L);
      }
      return lines;
    }
    function canMove(){
      for(var i=0;i<16;i++){
        if(!board[i]) return true;
        var x = i % 4, y = Math.floor(i / 4);
        if(x < 3 && board[i] === board[i+1]) return true;
        if(y < 3 && board[i] === board[i+4]) return true;
      }
      return false;
    }
    function move(dir){
      if(over || isPaused) return;
      var changed = false;
      linesFor(dir).forEach(function(L){
        var vals = L.map(function(ix){ return board[ix]; }).filter(function(v){ return v; });
        var out = [];
        for(var k=0;k<vals.length;k++){
          if(k + 1 < vals.length && vals[k] === vals[k+1]){
            var nv = vals[k] * 2;
            out.push(nv); score += nv; k++;
            if(nv === 2048 && !wonBig){
              wonBig = true;
              msgEl.textContent = "🎉 You made the 2048 tile! Keep going for an even bigger score!";
              beepSeq([660,880,1100,1320], 100);
            }
          } else out.push(vals[k]);
        }
        while(out.length < 4) out.push(0);
        L.forEach(function(ix, k2){
          if(board[ix] !== out[k2]) changed = true;
          board[ix] = out[k2];
        });
      });
      if(changed){
        beep(560, 0.05);
        spawn();
        render();
        if(!canMove()){
          over = true;
          msgEl.textContent = "No moves left — game over! Final score: " + score + ". Tap New game to try again.";
          showGameOver("The board is full — no moves left. Final score: " + score + ".");
        } else if(!wonBig) msgEl.textContent = "Nice merge! Score: " + score + " — keep going!";
      }
    }
    spawn(); spawn(); render();
    playBody.querySelectorAll("[data-mdir]").forEach(function(b){
      b.addEventListener("click", function(){ move(b.getAttribute("data-mdir")); });
    });
    var tx = null, ty = null;
    gridEl.addEventListener("touchstart", function(e){ tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, {passive:true});
    gridEl.addEventListener("touchend", function(e){
      if(tx === null) return;
      var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      tx = null;
      if(Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
      move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
    }, {passive:true});
    gameHooks.key = function(code){
      var map = { ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right" };
      if(map[code]) move(map[code]);
    };
    document.getElementById("mgReset").addEventListener("click", function(){ tap(); buildMerge(); });
  }

  /* ---------- Brick Breaker (canvas arcade) ---------- */
  var bbBest = bestOf("bricks");
  function buildBricks(){
    playTitle.textContent = "Brick Breaker — play!";
    playBody.innerHTML =
      '<div class="score-line"><span>Score: <b id="bbScore">0</b></span><span>Level: <b id="bbLevel">1</b></span><span>Balls: <b id="bbLives">3</b></span></div>' +
      '<canvas id="bbCanvas" class="gcanvas" width="300" height="360" aria-label="Brick Breaker game area"></canvas>' +
      '<div class="dpad" style="grid-template-columns:56px 56px; gap:12px">' +
      '<button id="bbLeft" aria-label="Move paddle left">◀</button><button id="bbRight" aria-label="Move paddle right">▶</button></div>' +
      '<div style="text-align:center;margin-top:12px"><button class="mini-btn orange" id="bbStart">▶ Start</button></div>' +
      '<div class="msg" id="bbMsg">Drag on the game (or hold ◀ ▶) to move the paddle. Smash every brick!</div>';
    var cv = document.getElementById("bbCanvas"), ctx = cv.getContext("2d");
    var W = 300, H = 360, ROWC = ["#FF5252","#FF8A3C","#FFC531","#3CB54A","#2E9BFF"];
    var pad, ball, bricks, score = 0, lives = 3, level = 1, running = false, raf = null, keys = {}, lastTs = 0;
    function newBricks(rows){
      bricks = [];
      for(var r=0;r<rows;r++) for(var c=0;c<6;c++)
        bricks.push({ x: 8 + c*48, y: 38 + r*20, w: 42, h: 13, color: ROWC[r % ROWC.length], alive: true });
    }
    function resetBall(){
      ball = { x: pad.x + pad.w/2, y: 316, vx: 0, vy: 0, stuck: true, r: 6 };
    }
    function syncHud(){
      document.getElementById("bbScore").textContent = score;
      document.getElementById("bbLevel").textContent = level;
      document.getElementById("bbLives").textContent = lives;
    }
    function reset(full){
      pad = { x: 112, w: 76, h: 10, y: 326 };
      if(full){ score = 0; lives = 3; level = 1; }
      newBricks(Math.min(3 + level, 5));
      resetBall();
      syncHud();
    }
    function draw(){
      ctx.fillStyle = "#14142B"; ctx.fillRect(0,0,W,H);
      bricks.forEach(function(b){
        if(!b.alive) return;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        if(ctx.roundRect) ctx.roundRect(b.x, b.y, b.w, b.h, 4); else ctx.rect(b.x, b.y, b.w, b.h);
        ctx.fill();
      });
      ctx.fillStyle = "#FFD34D";
      ctx.beginPath();
      if(ctx.roundRect) ctx.roundRect(pad.x, pad.y, pad.w, pad.h, 5); else ctx.rect(pad.x, pad.y, pad.w, pad.h);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, 7); ctx.fill();
      if(ball.stuck && running){
        ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "700 12px Nunito, sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Tap the game to launch!", W/2, 298);
      }
    }
    function launch(){
      if(!ball.stuck) return;
      var sp = 2.4 + level * 0.45;
      var ang = (Math.random() * 50 - 25) * Math.PI / 180;
      ball.vx = Math.sin(ang) * sp; ball.vy = -Math.cos(ang) * sp;
      ball.stuck = false;
      beep(600, 0.05);
    }
    function frame(ts){
      if(!running){ raf = null; return; }
      var dt = Math.min(32, ts - (lastTs || ts)); lastTs = ts;
      var f = dt / 16.7;
      if(keys.left) pad.x -= 5.4 * f;
      if(keys.right) pad.x += 5.4 * f;
      pad.x = Math.max(0, Math.min(W - pad.w, pad.x));
      if(ball.stuck){ ball.x = pad.x + pad.w/2; }
      else {
        var steps = Math.max(1, Math.ceil(Math.max(Math.abs(ball.vx), Math.abs(ball.vy)) * f / 3));
        for(var s=0;s<steps;s++){
          ball.x += ball.vx * f / steps; ball.y += ball.vy * f / steps;
          if(ball.x < ball.r){ ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
          if(ball.x > W - ball.r){ ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx); }
          if(ball.y < ball.r){ ball.y = ball.r; ball.vy = Math.abs(ball.vy); }
          if(ball.vy > 0 && ball.y + ball.r >= pad.y && ball.y - ball.r <= pad.y + pad.h && ball.x >= pad.x - 2 && ball.x <= pad.x + pad.w + 2){
            var rel = Math.max(-1, Math.min(1, (ball.x - (pad.x + pad.w/2)) / (pad.w/2)));
            var sp = 2.4 + level * 0.45, ang = rel * 1.05;
            ball.vx = Math.sin(ang) * sp; ball.vy = -Math.cos(ang) * sp;
            ball.y = pad.y - ball.r; beep(520, 0.05);
          }
          for(var i=0;i<bricks.length;i++){
            var b = bricks[i];
            if(b.alive && ball.x + ball.r > b.x && ball.x - ball.r < b.x + b.w && ball.y + ball.r > b.y && ball.y - ball.r < b.y + b.h){
              b.alive = false; score += 10; beep(760 + Math.random()*160, 0.05);
              ball.vy = -ball.vy;
              syncHud();
              break;
            }
          }
          if(ball.y - ball.r > H) break;
        }
        if(bricks.every(function(b){ return !b.alive; })){
          level++; beepSeq([660,880,1100], 90);
          document.getElementById("bbMsg").textContent = "Level " + level + "! Faster ball — smash them all!";
          newBricks(Math.min(3 + level, 5)); resetBall(); syncHud();
        } else if(ball.y - ball.r > H){
          lives--; syncHud();
          if(lives <= 0){
            running = false;
            if(score > bbBest){ bbBest = score; bestSet("bricks", bbBest); }
            document.getElementById("bbMsg").textContent = "Game over! Score " + score + " — you reached level " + level + ". Best: " + bbBest + ". Press Start to play again.";
            showGameOver("Score " + score + " — you reached level " + level + ". Best: " + bbBest + ".");
            document.getElementById("bbStart").textContent = "↻ Play again";
          } else {
            document.getElementById("bbMsg").textContent = "Ball lost! " + lives + (lives === 1 ? " ball" : " balls") + " left — tap the game to launch.";
            resetBall();
          }
        }
      }
      draw();
      raf = running ? requestAnimationFrame(frame) : null;
    }
    function startLoop(){ if(!raf && running){ lastTs = 0; raf = requestAnimationFrame(frame); } }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    function pointX(e){
      var rect = cv.getBoundingClientRect();
      var src = e.touches ? e.touches[0] : e;
      return (src.clientX - rect.left) / rect.width * W;
    }
    function movePad(e){
      var x = pointX(e);
      pad.x = Math.max(0, Math.min(W - pad.w, x - pad.w/2));
      if(ball.stuck) ball.x = pad.x + pad.w/2;
      if(!raf) draw();
    }
    cv.addEventListener("touchstart", function(e){ if(running){ movePad(e); launch(); } e.preventDefault(); }, {passive:false});
    cv.addEventListener("touchmove", function(e){ if(running) movePad(e); e.preventDefault(); }, {passive:false});
    cv.addEventListener("mousedown", function(e){ if(running){ movePad(e); launch(); } });
    cv.addEventListener("mousemove", function(e){ if(running && e.buttons) movePad(e); });
    function hold(id, key){
      var el = document.getElementById(id);
      el.addEventListener("touchstart", function(e){ keys[key] = true; e.preventDefault(); }, {passive:false});
      el.addEventListener("touchend", function(){ keys[key] = false; });
      el.addEventListener("touchcancel", function(){ keys[key] = false; });
      el.addEventListener("mousedown", function(){ keys[key] = true; });
      el.addEventListener("mouseup", function(){ keys[key] = false; });
      el.addEventListener("mouseleave", function(){ keys[key] = false; });
    }
    hold("bbLeft","left"); hold("bbRight","right");
    document.getElementById("bbStart").addEventListener("click", function(){
      tap(); reset(true); running = true;
      document.getElementById("bbStart").textContent = "↻ Restart";
      document.getElementById("bbMsg").textContent = "Tap the game to launch the ball!";
      draw(); startLoop();
    });
    reset(true);
    document.getElementById("bbStart").textContent = "▶ Start";
    draw();
  }

  /* ---------- Tic Tac Toe (You vs Computer) ---------- */
  function buildTicTacToe(){
    playTitle.textContent = "Tic Tac Toe — You are X";
    playBody.innerHTML =
      '<div class="score-line"><span>You (X): <b id="ttYou">0</b></span><span>Draws: <b id="ttDraw">0</b></span><span>CPU (O): <b id="ttCpu">0</b></span></div>' +
      '<div class="ttt-grid" id="ttGrid"></div>' +
      '<div class="msg" id="ttMsg">Your move — tap a square to place your X.</div>' +
      '<div class="btn-row"><button class="mini-btn" id="ttReset">↻ New round</button><button class="mini-btn orange" id="ttResetAll">Reset scores</button></div>';
    var LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    var board, roundOver = false, busyCpu = false, wins = { you:0, cpu:0, draw:0 };
    var gridEl = document.getElementById("ttGrid"), msgEl = document.getElementById("ttMsg");
    function winner(bd){
      for(var i=0;i<LINES.length;i++){
        var L = LINES[i];
        if(bd[L[0]] && bd[L[0]] === bd[L[1]] && bd[L[1]] === bd[L[2]]) return { who: bd[L[0]], line: L };
      }
      return bd.every(function(x){ return x; }) ? { who: "draw", line: [] } : null;
    }
    function syncWins(){
      document.getElementById("ttYou").textContent = wins.you;
      document.getElementById("ttCpu").textContent = wins.cpu;
      document.getElementById("ttDraw").textContent = wins.draw;
    }
    function render(highlight){
      gridEl.innerHTML = "";
      board.forEach(function(v, i){
        var b = document.createElement("button");
        b.className = "ttt-cell" + (v ? " " + v.toLowerCase() : "") + (highlight && highlight.indexOf(i) >= 0 ? " win" : "");
        b.textContent = v || "";
        b.setAttribute("aria-label", "Square " + (i+1) + (v ? ", " + v : ", empty"));
        b.disabled = !!v || roundOver || busyCpu;
        b.addEventListener("click", function(){ playCell(i); });
        gridEl.appendChild(b);
      });
    }
    function finishRound(w){
      roundOver = true;
      if(w.who === "X"){ wins.you++; msgEl.textContent = "🎉 You win this round! Tap New round to play again."; beepSeq([660,880,1100], 100); }
      else if(w.who === "O"){ wins.cpu++; msgEl.textContent = "The computer wins this round. Tap New round for revenge!"; showGameOver("The computer won this round.", function(){ newRound(); }); }
      else { wins.draw++; msgEl.textContent = "A draw — nobody wins. Tap New round!"; beep(520, 0.12); }
      syncWins(); render(w.line);
    }
    function minimax(bd, isMax, depth){
      var w = winner(bd);
      if(w){ if(w.who === "O") return 10 - depth; if(w.who === "X") return depth - 10; return 0; }
      var best = isMax ? -99 : 99;
      for(var i=0;i<9;i++){
        if(!bd[i]){
          bd[i] = isMax ? "O" : "X";
          var s = minimax(bd, !isMax, depth + 1);
          bd[i] = "";
          best = isMax ? Math.max(best, s) : Math.min(best, s);
        }
      }
      return best;
    }
    function cpuPick(){
      var empty = [];
      board.forEach(function(v, i){ if(!v) empty.push(i); });
      if(!empty.length) return -1;
      if(state.difficulty === "Easy") return empty[Math.floor(Math.random() * empty.length)];
      if(state.difficulty === "Normal" && Math.random() < 0.35) return empty[Math.floor(Math.random() * empty.length)];
      var bestScore = -99, pick = empty[0];
      empty.forEach(function(i){
        board[i] = "O";
        var s = minimax(board, false, 0);
        board[i] = "";
        if(s > bestScore){ bestScore = s; pick = i; }
      });
      return pick;
    }
    function playCell(i){
      if(roundOver || busyCpu || board[i] || isPaused) return;
      tap();
      board[i] = "X"; beep(700, 0.06);
      var w = winner(board);
      if(w){ finishRound(w); return; }
      render(null);
      busyCpu = true;
      msgEl.textContent = "Computer is thinking…";
      later(function(){
        busyCpu = false;
        var ci = cpuPick();
        if(ci >= 0){ board[ci] = "O"; beep(460, 0.06); }
        var w2 = winner(board);
        if(w2){ finishRound(w2); return; }
        msgEl.textContent = "Your move — tap a square.";
        render(null);
      }, 420);
    }
    function newRound(){
      board = ["","","","","","","","",""];
      roundOver = false; busyCpu = false;
      msgEl.textContent = "Your move — tap a square to place your X.";
      render(null);
    }
    document.getElementById("ttReset").addEventListener("click", function(){ tap(); newRound(); });
    document.getElementById("ttResetAll").addEventListener("click", function(){ tap(); wins = { you:0, cpu:0, draw:0 }; syncWins(); newRound(); });
    syncWins(); newRound();
  }

  /* ---------- Whack-a-Mole (playable) ---------- */
  var moleBest = bestOf("mole");
  function buildMole(){
    playTitle.textContent = "Whack-a-Mole — play!";
    var WIN_MS = state.difficulty==="Easy" ? 850 : state.difficulty==="Hard" ? 480 : 650;
    var EVERY = state.difficulty==="Easy" ? 800 : state.difficulty==="Hard" ? 520 : 650;
    playBody.innerHTML =
      '<div class="score-line"><span>Score: <b id="wmScore">0</b></span><span>Time: <b id="wmTime">30</b>s</span><span>Best: <b id="wmBest">' + moleBest + '</b></span></div>' +
      '<div class="mole-grid" id="wmGrid"></div>' +
      '<div class="msg" id="wmMsg">Tap Start, then whack the critters as fast as you can! A golden one is worth +5.</div>' +
      '<div style="text-align:center;margin-top:12px"><button class="mini-btn orange" id="wmStart">▶ Start</button></div>';
    var gridEl = document.getElementById("wmGrid"), msgEl = document.getElementById("wmMsg");
    var holes = [], score = 0, timeLeft = 30, running = false, mainTimer = null, spawnTimer = null;
    for(var i=0;i<9;i++){
      var h = document.createElement("button");
      h.className = "mole-hole"; h.setAttribute("aria-label", "Hole " + (i+1));
      h.innerHTML = '<span class="mole" aria-hidden="true">🐹</span>';
      (function(btn){
        btn.addEventListener("click", function(){
          if(!running || isPaused || !btn.classList.contains("up")) return;
          var gold = btn.getAttribute("data-gold") === "1";
          score += gold ? 5 : 1;
          document.getElementById("wmScore").textContent = score;
          beep(gold ? 1240 : 880, 0.07);
          btn.classList.remove("up"); btn.classList.add("bonk");
          setTimeout(function(){ btn.classList.remove("bonk"); }, 160);
        });
      })(h);
      holes.push(h); gridEl.appendChild(h);
    }
    function clearHole(btn){
      btn.classList.remove("up"); btn.removeAttribute("data-gold");
      btn.querySelector(".mole").style.filter = "";
    }
    function pop(){
      if(!running) return;
      var free = holes.filter(function(x){ return !x.classList.contains("up"); });
      if(!free.length) return;
      var btn = free[Math.floor(Math.random() * free.length)];
      var gold = Math.random() < 0.14;
      btn.setAttribute("data-gold", gold ? "1" : "0");
      btn.querySelector(".mole").style.filter = gold ? "sepia(1) saturate(5) hue-rotate(2deg) brightness(1.2)" : "";
      btn.classList.add("up");
      setTimeout(function(){ if(btn.classList.contains("up")) clearHole(btn); }, WIN_MS);
    }
    function stopTimers(){
      if(mainTimer){ clearInterval(mainTimer); mainTimer = null; }
      if(spawnTimer){ clearInterval(spawnTimer); spawnTimer = null; }
    }
    gameStopFn = function(){ running = false; stopTimers(); };
    function endGame(){
      running = false; stopTimers();
      holes.forEach(clearHole);
      if(score > moleBest){ moleBest = score; bestSet("mole", moleBest); document.getElementById("wmBest").textContent = moleBest; }
      msgEl.textContent = "Time up! You scored " + score + " points (best " + moleBest + "). Tap Start to play again!";
      showGameOver("Time up! You scored " + score + " points — best " + moleBest + ".");
      document.getElementById("wmStart").textContent = "↻ Play again";
    }
    document.getElementById("wmStart").addEventListener("click", function(){
      tap();
      stopTimers();
      score = 0; timeLeft = 30; running = true;
      document.getElementById("wmScore").textContent = "0";
      document.getElementById("wmTime").textContent = "30";
      holes.forEach(clearHole);
      msgEl.textContent = "Go, go, go! Whack them! 🐹";
      document.getElementById("wmStart").textContent = "↻ Restart";
      spawnTimer = setInterval(function(){ if(!isPaused) pop(); }, EVERY);
      pop();
      mainTimer = setInterval(function(){
        if(isPaused || !running) return;
        timeLeft--;
        document.getElementById("wmTime").textContent = Math.max(0, timeLeft);
        if(timeLeft <= 0) endGame();
      }, 1000);
    });
  }

  /* ---------- Flappy Wing (canvas arcade) ---------- */
  var flBest = bestOf("flappy");
  function buildFlappy(){
    playTitle.textContent = "Flappy Wing — play!";
    playBody.innerHTML =
      '<div class="score-line"><span>Score: <b id="flScore">0</b></span><span>Best: <b id="flBest">' + flBest + '</b></span></div>' +
      '<canvas id="flapCanvas" class="gcanvas" width="300" height="400" aria-label="Flappy Wing game area"></canvas>' +
      '<div style="text-align:center;margin-top:12px"><button class="mini-btn orange" id="flFlap" style="min-width:170px">🪽 Flap!</button></div>' +
      '<div class="msg" id="flMsg">Tap the game (or the Flap button) to fly. Glide through the pipe gaps!</div>';
    var cv = document.getElementById("flapCanvas"), ctx = cv.getContext("2d");
    var W = 300, H = 400;
    var gap = state.difficulty==="Easy" ? 134 : state.difficulty==="Hard" ? 104 : 118;
    var speed = state.difficulty==="Hard" ? 2.3 : 2.0;
    var bird, pipes, score, phase = "ready", raf = null, lastTs = 0, frameNo = 0;
    function reset(){
      bird = { x: 74, y: 190, vy: 0 };
      pipes = []; score = 0; frameNo = 0;
      document.getElementById("flScore").textContent = "0";
      document.getElementById("flBest").textContent = flBest;
    }
    function draw(){
      var grd = ctx.createLinearGradient(0,0,0,H);
      grd.addColorStop(0, "#63B8F0"); grd.addColorStop(1, "#BDE7FF");
      ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);
      ctx.fillStyle = "rgba(255,255,255,.85)";
      [[40,52,26],[150,34,19],[238,66,22],[96,96,14]].forEach(function(cl){
        ctx.beginPath();
        ctx.arc(cl[0], cl[1], cl[2], 0, 7); ctx.arc(cl[0]+cl[2]*0.9, cl[1]+3, cl[2]*0.72, 0, 7); ctx.arc(cl[0]-cl[2]*0.9, cl[1]+4, cl[2]*0.66, 0, 7);
        ctx.fill();
      });
      pipes.forEach(function(p){
        ctx.fillStyle = "#2E9E44";
        ctx.fillRect(p.x, 0, 54, p.top);
        ctx.fillRect(p.x, p.top + gap, 54, H - p.top - gap - 18);
        ctx.fillStyle = "#35B84E";
        ctx.fillRect(p.x - 3, p.top - 16, 60, 16);
        ctx.fillRect(p.x - 3, p.top + gap, 60, 16);
      });
      ctx.fillStyle = "#7DB35A"; ctx.fillRect(0, H-18, W, 18);
      ctx.fillStyle = "#5E9440"; ctx.fillRect(0, H-18, W, 4);
      var tilt = Math.max(-0.5, Math.min(1.1, bird.vy * 0.09));
      ctx.save(); ctx.translate(bird.x, bird.y); ctx.rotate(tilt);
      ctx.fillStyle = "#FFC531";
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, 7); ctx.fill();
      ctx.fillStyle = "#FFDE59";
      ctx.beginPath(); ctx.arc(-3, -4, 8.5, 0, 7); ctx.fill();
      ctx.fillStyle = "#FF9F1A";
      var wy = (frameNo % 20 < 10) ? -2 : 3;
      ctx.beginPath(); ctx.ellipse(-9, wy, 8, 4.6, -0.5, 0, 7); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(5.5, -4.5, 5, 0, 7); ctx.fill();
      ctx.fillStyle = "#22202B";
      ctx.beginPath(); ctx.arc(7, -4.5, 2.5, 0, 7); ctx.fill();
      ctx.fillStyle = "#FF6B1A";
      ctx.beginPath(); ctx.moveTo(12, -1); ctx.lineTo(20, 1.6); ctx.lineTo(12, 4.4); ctx.closePath(); ctx.fill();
      ctx.restore();
      if(phase === "ready"){
        ctx.fillStyle = "rgba(20,20,40,.45)"; ctx.fillRect(0,0,W,H);
        ctx.fillStyle = "#fff"; ctx.font = "800 19px 'Baloo 2', sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Tap to start flying!", W/2, H/2 - 6);
        ctx.font = "700 13px Nunito, sans-serif";
        ctx.fillText("Every pipe you pass = +1 point", W/2, H/2 + 18);
      }
    }
    function frame(ts){
      if(phase !== "play"){ raf = null; return; }
      var dt = Math.min(32, ts - (lastTs || ts)); lastTs = ts;
      var f = dt / 16.7; frameNo++;
      bird.vy += 0.42 * f; if(bird.vy > 9.5) bird.vy = 9.5;
      bird.y += bird.vy * f;
      if(!pipes.length || pipes[pipes.length-1].x < W - 168)
        pipes.push({ x: W + 8, top: 46 + Math.random() * (H - gap - 128), passed: false });
      pipes.forEach(function(p){
        p.x -= speed * f;
        if(!p.passed && p.x + 54 < bird.x - 14){ p.passed = true; score++; document.getElementById("flScore").textContent = score; beep(980, 0.06); }
      });
      pipes = pipes.filter(function(p){ return p.x > -64; });
      var hit = bird.y + 13 >= H - 18 || bird.y - 13 <= 0;
      if(!hit) pipes.forEach(function(p){
        if(bird.x + 11 > p.x && bird.x - 11 < p.x + 54 && (bird.y - 11 < p.top || bird.y + 11 > p.top + gap)) hit = true;
      });
      if(hit){ gameOver(); draw(); return; }
      draw();
      raf = requestAnimationFrame(frame);
    }
    function startLoop(){ if(!raf && phase === "play"){ lastTs = 0; raf = requestAnimationFrame(frame); } }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    function gameOver(){
      phase = "over"; stopLoop();
      if(score > flBest){ flBest = score; bestSet("flappy", flBest); document.getElementById("flBest").textContent = flBest; }
      document.getElementById("flMsg").textContent = "Flight over! You scored " + score + " (best " + flBest + "). Tap the game to fly again!";
      showGameOver("You scored " + score + " — best " + flBest + ".");
    }
    function flap(){
      if(isPaused) return;
      if(phase === "over"){ reset(); phase = "ready"; draw(); return; }
      if(phase === "ready"){ phase = "play"; startLoop(); }
      bird.vy = -6.9; beep(660, 0.05);
    }
    gameStopFn = function(){ phase = "over"; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(phase === "play") startLoop(); };
    gameHooks.key = function(code){ if(code === "Space" || code === "ArrowUp") flap(); };
    cv.addEventListener("touchstart", function(e){ flap(); e.preventDefault(); }, {passive:false});
    cv.addEventListener("mousedown", flap);
    document.getElementById("flFlap").addEventListener("click", function(){ flap(); });
    reset(); draw();
  }

  /* ---------- Mine Finder (playable) ---------- */
  function buildMines(){
    playTitle.textContent = "Mine Finder — play!";
    var SIZE = 9;
    var MINES = state.difficulty==="Easy" ? 8 : state.difficulty==="Hard" ? 14 : 10;
    playBody.innerHTML =
      '<div class="score-line"><span>Mines: <b id="mnCount">' + MINES + '</b></span><span>Flags: <b id="mnFlags">0</b></span><span>Status: <b id="mnState">Playing</b></span></div>' +
      '<div class="mn-grid" id="mnGrid"></div>' +
      '<div class="msg" id="mnMsg">' + MINES + ' mines are hidden. Tap a square to open it — the first tap is always safe. A number counts the mines touching that square.</div>' +
      '<div class="btn-row"><button class="mini-btn" id="mnMode" aria-pressed="false">🚩 Flag mode: OFF</button><button class="mini-btn orange" id="mnReset">↻ New field</button></div>';
    var gridEl = document.getElementById("mnGrid"), msgEl = document.getElementById("mnMsg"), modeBtn = document.getElementById("mnMode");
    var mine = [], open = [], flag = [], placed = false, over = false, flags = 0, openedCount = 0, flagMode = false;
    var NUMC = ["", "#2E9BFF", "#3CB54A", "#FF5252", "#7B3FBF", "#E8862D", "#00A99A", "#D90429", "#555F6E"];
    var cellEls = [];
    function idx(x, y){ return y * SIZE + x; }
    function neighbors(i){
      var x = i % SIZE, y = Math.floor(i / SIZE), out = [];
      for(var dy=-1; dy<=1; dy++) for(var dx=-1; dx<=1; dx++){
        if(!dx && !dy) continue;
        var nx = x+dx, ny = y+dy;
        if(nx>=0 && ny>=0 && nx<SIZE && ny<SIZE) out.push(idx(nx, ny));
      }
      return out;
    }
    function count(i){ return neighbors(i).filter(function(n){ return mine[n]; }).length; }
    function placeMines(safe){
      var spots = [];
      for(var i=0;i<SIZE*SIZE;i++){ if(i !== safe && neighbors(safe).indexOf(i) < 0) spots.push(i); }
      shuffleArr(spots);
      for(var j=0;j<MINES && j<spots.length;j++) mine[spots[j]] = true;
      placed = true;
    }
    function render(){
      for(var i=0;i<SIZE*SIZE;i++){
        var el = cellEls[i];
        el.className = "mn-cell" + (open[i] ? " open" : "") + (over && mine[i] ? (open[i] && !flag[i] ? " boom" : " mine") : "");
        if(flag[i] && !open[i]) el.textContent = "🚩";
        else if(open[i]) el.textContent = mine[i] ? "💣" : (count(i) ? "" + count(i) : "");
        else el.textContent = "";
        el.style.color = (open[i] && !mine[i] && count(i)) ? NUMC[count(i)] : "";
      }
    }
    function flood(i){
      var stack = [i];
      while(stack.length){
        var c = stack.pop();
        if(open[c] || flag[c] || mine[c]) continue;
        open[c] = true; openedCount++;
        if(count(c) === 0) neighbors(c).forEach(function(n){ if(!open[n]) stack.push(n); });
      }
    }
    function checkWin(){
      if(openedCount === SIZE*SIZE - MINES){
        over = true;
        document.getElementById("mnState").textContent = "You won! 🎉";
        msgEl.textContent = "Field cleared! You opened every safe square without touching a mine. 🏆";
        beepSeq([660,880,990,1320], 110);
        render();
      }
    }
    function tapCell(i, forceFlag){
      if(over || isPaused) return;
      if(forceFlag || flagMode){
        if(open[i]) return;
        flag[i] = !flag[i];
        flags += flag[i] ? 1 : -1;
        document.getElementById("mnFlags").textContent = flags;
        beep(flag[i] ? 760 : 520, 0.06);
        render(); return;
      }
      if(flag[i] || open[i]) return;
      tap();
      if(!placed) placeMines(i);
      if(mine[i]){
        open[i] = true; over = true;
        document.getElementById("mnState").textContent = "Boom! 💥";
        msgEl.textContent = "BOOM! That square was a mine. Tap New field and try again — trust the numbers!";
        showGameOver("Boom! That square was a mine.");
        for(var j=0;j<SIZE*SIZE;j++){ if(mine[j]) open[j] = true; }
        render(); return;
      }
      flood(i);
      beep(700, 0.05);
      render();
      checkWin();
    }
    for(var i=0;i<SIZE*SIZE;i++){
      mine.push(false); open.push(false); flag.push(false);
      var b = document.createElement("button");
      b.className = "mn-cell"; b.setAttribute("aria-label", "Covered square " + (i+1));
      cellEls.push(b); gridEl.appendChild(b);
      (function(el, ii){
        var pressT = null, longed = false;
        el.addEventListener("click", function(){ if(longed){ longed = false; return; } tapCell(ii, false); });
        el.addEventListener("touchstart", function(){ longed = false; pressT = setTimeout(function(){ longed = true; tapCell(ii, true); }, 450); }, {passive:true});
        el.addEventListener("touchend", function(){ if(pressT) clearTimeout(pressT); }, {passive:true});
        el.addEventListener("touchcancel", function(){ if(pressT) clearTimeout(pressT); }, {passive:true});
        el.addEventListener("contextmenu", function(e){ e.preventDefault(); tapCell(ii, true); });
      })(b, i);
    }
    modeBtn.addEventListener("click", function(){
      tap();
      flagMode = !flagMode;
      modeBtn.textContent = "🚩 Flag mode: " + (flagMode ? "ON" : "OFF");
      modeBtn.setAttribute("aria-pressed", flagMode ? "true" : "false");
      msgEl.textContent = flagMode ? "Flag mode ON — tap a square to plant or remove a flag." : "Flag mode OFF — tap a square to open it.";
    });
    document.getElementById("mnReset").addEventListener("click", function(){ tap(); buildMines(); });
    render();
  }


  /* ================= 100-GAME EXPANSION =================
     90 new games built on shared engines. Tile art is procedural SVG:
     svgArt() draws a distinct layered scene per game, so the tiles cost
     almost no file size. Level
     progress for level-based games is kept per device. */
  function el(id){ return document.getElementById(id); }
  function svgArt(id, glyph, c1, c2){
    /* Layered procedural cover scenes: every one of the 90 new games gets
       its own multi-element vector scene (background setting + midground
       props + foreground subject, with shading, glow and floor shadows),
       drawn from the game's own palette. No ring-and-glyph template. */
    function sh(hex, f){
      var n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      function cl(v){ return Math.max(0, Math.min(255, Math.round(v))); }
      if(f >= 1){ r = cl(r + (255 - r) * (f - 1)); g = cl(g + (255 - g) * (f - 1)); b = cl(b + (255 - b) * (f - 1)); }
      else { r = cl(r * f); g = cl(g * f); b = cl(b * f); }
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    var L = sh(c1, 1.45), M = c1, D = sh(c2, 0.72), K = sh(c2, 0.5);
    var W = "#FFFFFF", Y = "#FFD34D", O = "#FF8A3C", RD = "#E5322D", GN = "#3CB54A", BL = "#2E9BFF", PK = "#FF5A7A", TN = "#F3D9B0";
    function R(x, y, w, h, rx, f, o){ return "<rect x='" + x + "' y='" + y + "' width='" + w + "' height='" + h + "' rx='" + (rx || 0) + "' fill='" + f + "'" + (o ? " opacity='" + o + "'" : "") + "/>"; }
    function C(cx, cy, r, f, o){ return "<circle cx='" + cx + "' cy='" + cy + "' r='" + r + "' fill='" + f + "'" + (o ? " opacity='" + o + "'" : "") + "/>"; }
    function E(cx, cy, rx, ry, f, o){ return "<ellipse cx='" + cx + "' cy='" + cy + "' rx='" + rx + "' ry='" + ry + "' fill='" + f + "'" + (o ? " opacity='" + o + "'" : "") + "/>"; }
    function P(pts, f, o){ return "<polygon points='" + pts + "' fill='" + f + "'" + (o ? " opacity='" + o + "'" : "") + "/>"; }
    function PA(d, f, o, ex){ var exFill = ex && ex.indexOf("fill=") >= 0; return "<path d='" + d + "'" + (exFill ? "" : " fill='" + f + "'") + (o ? " opacity='" + o + "'" : "") + (ex || "") + "/>"; }
    function LN(x1, y1, x2, y2, col, w, o, dash){ return "<line x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke='" + col + "' stroke-width='" + w + "' stroke-linecap='round'" + (o ? " opacity='" + o + "'" : "") + (dash ? " stroke-dasharray='" + dash + "'" : "") + "/>"; }
    function T(x, y, s, txt, f, anch){ return "<text x='" + x + "' y='" + y + "' font-size='" + s + "' font-family='Verdana, sans-serif' font-weight='bold' text-anchor='" + (anch || "middle") + "' fill='" + f + "'>" + txt + "</text>"; }
    function SH(cx, cy, rx){ return E(cx, cy, rx, rx * 0.16, "rgba(0,0,0,0.28)"); }
    function cloud(x, y, s, o){ return E(x, y, 34 * s, 13 * s, W, o || 0.85) + E(x - 20 * s, y + 3 * s, 20 * s, 9 * s, W, o || 0.85) + E(x + 22 * s, y + 3 * s, 22 * s, 10 * s, W, o || 0.85); }
    function stars(seed, n){ var s = ""; for(var i = 0; i < (n || 16); i++){ var x = 12 + ((seed * (i + 3) * 47) % 376), y = 10 + ((seed * (i + 5) * 31) % 170); s += C(x, y, 1.6 + (i % 3), W, 0.35 + (i % 4) * 0.15); } return s; }
    function hills(f1, f2){ return PA("M0 400 L0 268 Q100 224 200 262 T400 250 L400 400 Z", f1) + PA("M0 400 L0 318 Q120 282 240 312 T400 306 L400 400 Z", f2); }
    function grid(x, y, cell, rows, cols, colsArr, stroke){ var s = ""; for(var r2 = 0; r2 < rows; r2++) for(var c3 = 0; c3 < cols; c3++){ s += R(x + c3 * cell, y + r2 * cell, cell - 3, cell - 3, 5, colsArr[(r2 * cols + c3) % colsArr.length]); } return s + (stroke || ""); }
    function tile(x, y, s, rot, txt, f, tf, fs){ return "<g transform='rotate(" + rot + " " + x + " " + y + ")'>" + R(x - s / 2, y - s / 2, s, s, 8, f) + R(x - s / 2, y - s / 2, s, s * 0.42, 8, W, 0.22) + T(x, y + (fs || s * 0.34), fs || s * 0.62, txt, tf) + "</g>"; }
    function card(x, y, w, h, rot, txt, f){ return "<g transform='rotate(" + rot + " " + x + " " + y + ")'>" + R(x - w / 2, y - h / 2, w, h, 9, W) + R(x - w / 2, y - h / 2, w, h, 9, "none") + T(x, y + h * 0.18, w * 0.62, txt, f) + "</g>"; }
    function seedOf(str){ var s2 = 0; for(var i = 0; i < str.length; i++) s2 += str.charCodeAt(i) * (i + 7); return s2; }
    var sd = seedOf(id || "x");
    var SC = {};
    /* ---- Puzzle ---- */
    SC.slide = R(0, 300, 400, 100, 0, D) + R(0, 292, 400, 10, 0, K) + PA("M40 330 L360 330 L392 400 L8 400 Z", sh(c2, 0.9)) +
      R(92, 66, 216, 216, 14, "#8A5A2B") + R(100, 74, 200, 200, 10, "#6E4519") +
      (function(){ var s = "", nums = [1,2,3,4,5,6,7,8,0]; for(var i = 0; i < 9; i++){ var x = 106 + (i % 3) * 66, y = 80 + Math.floor(i / 3) * 66; if(nums[i] === 0){ s += R(x, y, 60, 60, 9, "#3A2708"); } else { s += R(x, y, 60, 60, 9, "#F6C65B") + R(x, y, 60, 24, 9, W, 0.3) + T(x + 30, y + 42, 30, nums[i], "#5C3A00"); } } return s; })() +
      tile(52, 356, 44, -14, "9", "#FFE1A8", "#5C3A00", 26) + SH(200, 296, 120);
    SC.lightsout = R(0, 0, 400, 400, 0, "rgba(0,0,0,0.18)") + R(286, 34, 84, 104, 6, "#0E1430") + C(328, 66, 17, "#F5EFD2") + C(322, 60, 15, "#0E1430", 0.9) + stars(sd, 7) +
      R(30, 288, 340, 12, 4, K) + (function(){ var s = ""; var lit = [1,0,1,0,1,0,1,1,0,1,0,0,1,0,1]; for(var i = 0; i < 15; i++){ var x = 58 + (i % 5) * 58, y = 92 + Math.floor(i / 5) * 62; if(lit[i]){ s += C(x + 24, y + 24, 34, Y, 0.22) + C(x + 24, y + 24, 20, Y) + C(x + 18, y + 17, 6, W, 0.8); } else { s += C(x + 24, y + 24, 20, "#23233A") + C(x + 24, y + 24, 20, "none"); s += PA("M" + (x + 12) + " " + (y + 14) + " a14 14 0 0 1 10 -6", "none", 1, " stroke='rgba(255,255,255,0.35)' stroke-width='3' fill='none'"); } s += R(x + 19, y + 44, 10, 8, 2, "#45455E"); } return s; })();
    SC.hanoi = C(66, 62, 30, "#FFDF9E") + hills(sh(c1, 0.8), D) + P("40,268 78,196 116,268", K, 0.8) + P("292,268 330,186 368,268", K, 0.8) + R(52, 300, 296, 16, 6, "#5C3A1E") +
      (function(){ var s = ""; var pegs = [110, 200, 290]; pegs.forEach(function(px){ s += R(px - 4, 128, 8, 172, 4, "#D9C8A8"); s += C(px, 124, 8, Y); }); var cols = ["#E5322D", "#FF8A3C", "#FFD34D", "#3CB54A"]; for(var i = 0; i < 4; i++){ var w = 96 - i * 18; s += R(110 - w / 2, 268 - i * 22, w, 19, 9, cols[i]) + R(110 - w / 2, 268 - i * 22, w, 8, 8, W, 0.25); } s += R(200 - 39, 268, 78, 19, 9, cols[0]) + R(200 - 30, 246, 60, 19, 9, cols[1]); s += R(290 - 39, 268, 78, 19, 9, cols[0]); return s; })() + SH(200, 330, 150);
    SC.codebreaker = R(36, 52, 328, 300, 18, sh(c1, 0.75)) + R(48, 64, 304, 276, 14, K) + C(200, 130, 44, D) + C(200, 130, 34, L) + T(200, 146, 40, "?", W) +
      (function(){ var s = ""; var rows = [["#E5322D","#FFD34D","#2E9BFF","#3CB54A"],["#FF5A7A","#E5322D","#3CB54A","#FFD34D"],["#2E9BFF","#3CB54A","#E5322D","#FF8A3C"]]; rows.forEach(function(row, r){ row.forEach(function(col, c){ s += C(102 + c * 44, 216 + r * 42, 15, col) + C(97 + c * 44, 210 + r * 42, 5, W, 0.55); }); s += C(306, 216 + r * 42, 8, r === 1 ? W : "#111"); s += C(330, 216 + r * 42, 8, r === 0 ? "#111" : W); }); return s; })() + R(70, 330, 260, 8, 4, L, 0.5);
    SC.flood = R(0, 316, 400, 84, 0, D) + R(56, 52, 288, 288, 14, W, 0.16) +
      (function(){ var s = ""; var pal = ["#FF5A7A","#FF8A3C","#FFD34D","#3CB54A","#2E9BFF","#9B6BFF"]; for(var r = 0; r < 6; r++) for(var c = 0; c < 6; c++){ var d = Math.max(0, (r + c) - 2); s += R(64 + c * 46, 60 + r * 46, 42, 42, 7, pal[Math.min(5, d + ((r * c) % 2))]); } s += PA("M64 60 L150 60 L64 146 Z", "#FF5A7A", 0.9); return s; })() +
      (function(){ var s = ""; var pal = ["#FF5A7A","#FF8A3C","#FFD34D","#3CB54A","#2E9BFF","#9B6BFF"]; pal.forEach(function(col, i){ s += C(76 + i * 50, 366, 17, col) + C(70 + i * 50, 360, 5, W, 0.6); }); return s; })();
    SC.sudoku = R(0, 308, 400, 92, 0, "#7A4A21") + PA("M60 60 L356 44 L346 330 L50 344 Z", "#FDF6E3") + PA("M60 60 L356 44 L352 110 L58 122 Z", W, 0.5) +
      (function(){ var s = ""; var nums = [[5,0,0,1],[0,1,4,0],[0,4,0,3],[2,0,0,4]]; for(var r = 0; r < 4; r++) for(var c = 0; c < 4; c++){ var x = 92 + c * 58, y = 84 + r * 56; s += R(x, y, 52, 50, 4, "none", 1) ; s += "<rect x='" + x + "' y='" + y + "' width='52' height='50' fill='none' stroke='#8A97A8' stroke-width='2'/>"; if(nums[r][c]) s += T(x + 26, y + 36, 27, nums[r][c], "#274b73"); else s += C(x + 26, y + 25, 3, "#B9C4D0"); } s += "<rect x='92' y='84' width='224' height='218' fill='none' stroke='#33475B' stroke-width='5'/>"; s += LN(204, 84, 204, 302, "#33475B", 4) + LN(92, 193, 316, 193, "#33475B", 4); return s; })() +
      PA("M306 268 L368 330 L346 338 L292 282 Z", "#FFC531") + P("368,330 356,318 346,338", "#3A2A1A") + SH(200, 356, 150);
    SC.magicsquare = stars(sd, 12) + C(336, 58, 22, "#F5EFD2", 0.9) + R(76, 62, 248, 248, 14, "#F7E7BD") + R(86, 72, 228, 228, 10, "#FFF6D8") +
      (function(){ var s = ""; var nums = [[8,1,6],[3,5,7],[4,9,2]]; for(var r = 0; r < 3; r++) for(var c = 0; c < 3; c++){ var x = 96 + c * 72, y = 82 + r * 72; s += R(x, y, 64, 64, 8, (r + c) % 2 ? "#F3D98B" : "#FFEDBE") + T(x + 32, y + 44, 30, nums[r][c], "#7A5200"); } s += T(200, 340, 21, "= 15  = 15  = 15", Y); return s; })() +
      P("52,96 57,110 71,115 57,120 52,134 47,120 33,115 47,110", Y) + P("338,150 342,161 353,165 342,169 338,180 334,169 323,165 334,161", Y);
    SC.binary = R(24, 40, 352, 268, 14, "#0B1216") + R(24, 40, 352, 34, 14, "#1D2B33") + C(44, 57, 6, RD) + C(64, 57, 6, Y) + C(84, 57, 6, GN) +
      (function(){ var s = ""; var bits = [[1,0,1,0],[0,1,0,1],[1,1,0,0],[0,0,1,1]]; for(var r = 0; r < 4; r++) for(var c = 0; c < 4; c++){ var x = 76 + c * 64, y = 98 + r * 50; var on = bits[r][c]; s += R(x, y, 54, 42, 8, on ? "#123B2E" : "#2A1414") + T(x + 27, y + 31, 24, on ? "1" : "0", on ? "#4ADE80" : "#FF7A7A"); } return s; })() +
      PA("M0 400 L0 340 Q200 316 400 340 L400 400 Z", K) + LN(40, 356, 150, 356, L, 3, 0.6) + LN(250, 366, 360, 366, L, 3, 0.6) + C(150, 356, 5, L) + C(250, 366, 5, L);
    SC.wordsearch = PA("M52 48 L352 60 L344 320 L58 330 Z", "#FDF6E3") + R(0, 322, 400, 78, 0, "#7A4A21") +
      (function(){ var s = ""; var rows = ["CATSXDPQ","OZE BRA".replace(" ",""),"DOGMELON","SUNPQRST","BIRDFISH","CAKESTAR"]; var gridL = ["CATSXDPQ","OZEBRAMN","DOGMELON","SUNPQRST","BIRDFISH","CAKESTAR"]; for(var r = 0; r < 6; r++) for(var c = 0; c < 8; c++){ s += T(84 + c * 31, 92 + r * 37, 21, gridL[r][c], "#3A3F4A"); } s += R(66, 62, 100, 30, 15, "#FFD34D", 0.55) + R(66, 168, 100, 30, 15, "#7ED491", 0.5); return s; })() +
      C(292, 238, 52, "rgba(190,230,255,0.35)") + "<circle cx='292' cy='238' r='52' fill='none' stroke='#5B6B7A' stroke-width='8'/>" + LN(330, 276, 366, 316, "#5B6B7A", 13);
    SC.scramble = cloud(80, 64, 0.9, 0.5) + cloud(316, 46, 0.7, 0.4) + hills(sh(c1, 0.85), D) +
      tile(92, 148, 62, -12, "W", "#FFD34D", "#5C3A00") + tile(168, 118, 62, 7, "O", "#FF8A5C", "#5C2200") + tile(246, 152, 62, -6, "R", "#7ED491", "#0E4420") + tile(316, 116, 62, 13, "D", "#6FC3FF", "#0B3555") +
      PA("M70 208 Q200 244 332 204", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='3' stroke-dasharray='2 9' stroke-linecap='round' fill='none'") +
      tile(120, 300, 56, 4, "W", W, "#7A1F3D") + tile(184, 306, 56, -3, "O", W, "#7A1F3D") + tile(248, 300, 56, 5, "R", W, "#7A1F3D") + tile(310, 306, 56, -4, "D", "#FFE1A8", "#7A1F3D") + SH(200, 348, 140);
    SC.patterniq = R(30, 96, 340, 128, 16, "rgba(255,255,255,0.14)") + R(30, 250, 340, 84, 16, "rgba(0,0,0,0.2)") +
      C(76, 160, 26, "#FFD34D") + P("140,186 166,134 192,186", "#FF5A7A") + R(224, 136, 48, 48, 6, "#4ADE80") + C(322, 160, 26, "#FFD34D") + T(200, 306, 25, "?  What comes next?", W) +
      P("66,286 76,266 86,286 76,278", Y) + LN(110, 292, 300, 292, W, 3, 0.4, "2 8") +
      (function(){ var s = ""; for(var i = 0; i < 5; i++){ s += C(52 + i * 74, 52, 3, W, 0.5); s += LN(52 + i * 74, 52, 52 + ((i + 1) % 5) * 74, 52, W, 1.5, 0.3); } return s; })();
    SC.oddone = R(52, 52, 296, 296, 16, "rgba(255,255,255,0.13)") +
      (function(){ var s = ""; for(var r = 0; r < 5; r++) for(var c = 0; c < 5; c++){ var x = 86 + c * 56, y = 86 + r * 56; if(r === 3 && c === 2){ s += C(x, y, 30, Y, 0.35) + P((x) + "," + (y - 22) + " " + (x + 6) + "," + (y - 7) + " " + (x + 22) + "," + (y - 6) + " " + (x + 9) + "," + (y + 3) + " " + (x + 13) + "," + (y + 20) + " " + (x) + "," + (y + 10) + " " + (x - 13) + "," + (y + 20) + " " + (x - 9) + "," + (y + 3) + " " + (x - 22) + "," + (y - 6) + " " + (x - 6) + "," + (y - 7), Y); } else s += C(x, y, 19, (r + c) % 2 ? "#7FE7DC" : "#B8F1EC") + C(x - 6, y - 6, 6, W, 0.6); } return s; })();
    SC.riddles = hills(K, D) + R(150, 84, 100, 196, 50, "#3A2A4A") + R(162, 96, 76, 184, 38, "#57406E") + C(200, 158, 17, Y) + R(193, 168, 14, 40, 6, Y) + C(200, 158, 17, "none") +
      P("52,300 90,238 128,300", K) + P("272,300 310,232 348,300", K) + R(30, 296, 340, 10, 4, K) +
      PA("M86 128 q-22 -26 -40 -6 q20 4 22 22 q2 -14 18 -16", "#B79CED", 0.8) + T(66, 348, 24, "? ? ?", "#CDBCF2") + T(322, 348, 24, "? ? ?", "#CDBCF2") + SH(200, 322, 90);
    /* ---- Arcade & Action ---- */
    function balloon(x, y, s, col){ return PA("M" + x + " " + (y + 34 * s) + " q-4 14 2 24", "none", 1, " stroke='rgba(255,255,255,0.7)' stroke-width='2' fill='none'") + E(x, y, 24 * s, 30 * s, col) + E(x - 8 * s, y - 10 * s, 7 * s, 11 * s, W, 0.5) + P((x - 5 * s) + "," + (y + 30 * s) + " " + (x + 5 * s) + "," + (y + 30 * s) + " " + x + "," + (y + 39 * s), col); }
    SC.balloons = cloud(76, 56, 1) + cloud(300, 88, 0.8) + cloud(196, 36, 0.6, 0.6) + hills("#7FB069", "#4E7A3A") +
      balloon(84, 132, 1.15, "#FF5A7A") + balloon(168, 92, 0.9, "#FFD34D") + balloon(238, 150, 1.3, "#2E9BFF") + balloon(322, 96, 0.85, "#3CB54A") + balloon(140, 226, 0.7, "#FF8A3C") +
      P("292,238 300,224 302,240 314,230 306,246 318,252 300,256 296,268", "#2B2B36") + C(356, 300, 3, W, 0.8) + C(52, 268, 3, W, 0.8);
    SC.fruitslice = R(0, 292, 400, 108, 0, "#6E4519") + LN(0, 316, 400, 316, "#54350F", 4) + LN(0, 352, 400, 352, "#54350F", 4) +
      PA("M40 130 Q150 40 268 96", "none", 1, " stroke='rgba(255,255,255,0.65)' stroke-width='5' stroke-linecap='round' fill='none'") + PA("M66 226 Q190 130 330 176", "none", 1, " stroke='rgba(255,255,255,0.4)' stroke-width='4' stroke-linecap='round' fill='none'") +
      (function(){ var s = ""; s += PA("M118 176 a52 52 0 0 1 104 0 Z", "#2E7D32") + PA("M126 176 a44 44 0 0 1 88 0 Z", "#FDECEC") + PA("M132 176 a38 38 0 0 1 76 0 Z", "#FF5A6E"); for(var i = 0; i < 5; i++) s += E(146 + i * 12, 162 - Math.abs(i - 2) * 3, 3, 5, "#5C2A1E"); s += PA("M282 118 a40 40 0 1 0 80 0 a40 40 0 1 0 -80 0", "#FF9F1C"); s += C(322, 118, 40, "#F97F06"); s += PA("M290 96 a32 32 0 0 1 30 -14", "none", 1, " stroke='rgba(255,255,255,0.6)' stroke-width='5' fill='none'"); s += LN(238, 232, 300, 268, "#C0C8D2", 9) + LN(300, 268, 330, 252, "#7A4A21", 11); return s; })() + C(96, 250, 6, "#FF5A6E", 0.8) + C(268, 220, 5, "#FF9F1C", 0.8) + SH(200, 306, 130);
    SC.monsters = C(330, 56, 24, "#F5EFD2") + C(320, 50, 20, sh(c2, 0.95)) + stars(sd, 10) +
      R(0, 262, 400, 138, 0, "#3A3F55") + (function(){ var s = ""; for(var i = 0; i < 8; i++) s += R(6 + i * 50, 246, 34, 20, 3, "#4A5069"); s += R(148, 300, 104, 100, 0, "#23263A"); s += PA("M148 400 L148 316 a52 44 0 0 1 104 0 L252 400 Z", "#14161F"); s += C(200, 330, 7, Y); return s; })() +
      (function(){ function mon(x, y, s, col){ return PA("M" + (x - 26 * s) + " " + (y + 26 * s) + " v-30 a26 26 0 0 1 52 0 v30 l-9 -10 l-9 10 l-9 -10 l-9 10 Z", col) + P((x - 20 * s) + "," + (y - 22 * s) + " " + (x - 26 * s) + "," + (y - 40 * s) + " " + (x - 8 * s) + "," + (y - 28 * s), col) + P((x + 20 * s) + "," + (y - 22 * s) + " " + (x + 26 * s) + "," + (y - 40 * s) + " " + (x + 8 * s) + "," + (y - 28 * s), col) + C(x - 9 * s, y - 4 * s, 5 * s, W) + C(x + 9 * s, y - 4 * s, 5 * s, W) + C(x - 9 * s, y - 4 * s, 2.4 * s, "#14161F") + C(x + 9 * s, y - 4 * s, 2.4 * s, "#14161F"); } return mon(78, 218, 1, "#9B6BFF") + mon(168, 240, 0.8, "#4ADE80") + mon(318, 222, 1.1, "#FF8A5C"); })() +
      PA("M120 120 L196 190", "none", 1, " stroke='#7FE7DC' stroke-width='4' stroke-dasharray='1 10' stroke-linecap='round' fill='none'");
    SC.targets = R(0, 250, 400, 150, 0, "#4A3220") + LN(0, 282, 400, 282, "#5C3F24", 5) + LN(0, 322, 400, 322, "#33220F", 5) + R(0, 40, 400, 26, 0, K, 0.7) +
      (function(){ function tgt(x, y, r){ return C(x, y, r, W) + C(x, y, r * 0.74, RD) + C(x, y, r * 0.48, W) + C(x, y, r * 0.24, RD) + R(x - 4, y + r, 8, 34, 2, "#3A2A1A"); } return tgt(92, 138, 46) + tgt(226, 104, 34) + tgt(322, 168, 54) + tgt(168, 206, 26); })() +
      LN(200, 356, 200, 386, W, 3, 0.6) + LN(186, 371, 214, 371, W, 3, 0.6) + C(200, 371, 17, "none") + "<circle cx='200' cy='371' r='17' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='3'/>";
    SC.fruitcatch = cloud(90, 52, 0.9) + PA("M-10 190 Q60 120 40 60", "none", 1, " stroke='#5C3A1E' stroke-width='16' fill='none'") + C(52, 84, 58, "#3E7A34") + C(20, 130, 40, "#4E9440") + PA("M410 180 Q348 116 366 58", "none", 1, " stroke='#5C3A1E' stroke-width='16' fill='none'") + C(356, 84, 56, "#3E7A34") +
      hills("#8FBF6F", "#5E9448") + C(60, 92, 9, RD) + C(376, 108, 9, RD) + C(330, 62, 9, "#FF9F1C") +
      (function(){ function apple(x, y, s, col){ return C(x - 8 * s, y, 11 * s, col) + C(x + 8 * s, y, 11 * s, col) + C(x, y + 6 * s, 12 * s, col) + PA("M" + x + " " + (y - 8 * s) + " q3 -10 12 -12", "none", 1, " stroke='#5C3A1E' stroke-width='3' fill='none'"); } return apple(150, 108, 1.1, "#E5322D") + apple(238, 66, 0.95, "#FF9F1C") + apple(292, 148, 1, "#FFD34D") + apple(112, 196, 0.85, "#E5322D"); })() +
      PA("M138 318 L262 318 L244 372 L156 372 Z", "#B06A2C") + PA("M138 318 L262 318 L256 340 L144 340 Z", "#8A5220") + LN(146, 330, 254, 330, "#6E3F14", 4) + E(200, 316, 66, 10, "#D98E4A") + SH(200, 384, 90);
    SC.coincatch = cloud(70, 60, 0.8, 0.7) + cloud(320, 44, 0.7, 0.6) + hills(sh(c1, 0.8), D) +
      (function(){ var s = ""; var coins = [[92, 92, 20],[168, 56, 15],[238, 116, 23],[318, 76, 16],[130, 176, 14],[286, 196, 13]]; coins.forEach(function(cn){ s += C(cn[0], cn[1], cn[2], "#FFC531") + C(cn[0], cn[1], cn[2] - 5, "#FFDF7E") + T(cn[0], cn[1] + cn[2] * 0.36, cn[2] * 0.95, "$", "#9A6B00"); }); s += PA("M208 226 q14 -4 12 12 q-2 12 -16 10 q10 -8 4 -22", "#8A97A8"); return s; })() +
      PA("M118 306 L282 306 L282 372 L118 372 Z", "#7A4A21") + PA("M106 274 Q200 246 294 274 L282 306 L118 306 Z", "#96602C") + R(112, 268, 176, 14, 6, "#FFC531") + R(182, 316, 36, 30, 6, Y) + C(200, 328, 7, "#7A5200") + SH(200, 384, 110);
    SC.trafficdodge = P("168,400 196,120 204,120 232,400", "#2E3440") + P("60,400 178,120 190,120 150,400", "#363D4A") + P("250,400 210,120 222,120 340,400", "#363D4A") + LN(200, 380, 200, 336, Y, 7) + LN(200, 306, 200, 268, Y, 7) + LN(200, 240, 200, 210, Y, 7) + R(0, 96, 400, 26, 0, K, 0.65) +
      (function(){ function car(x, y, s, col){ return "<g>" + R(x - 44 * s, y - 26 * s, 88 * s, 56 * s, 12 * s, col) + R(x - 34 * s, y - 48 * s, 68 * s, 30 * s, 10 * s, col) + R(x - 27 * s, y - 44 * s, 54 * s, 20 * s, 6 * s, "#BDE7FF") + C(x - 24 * s, y + 22 * s, 7 * s, Y) + C(x + 24 * s, y + 22 * s, 7 * s, Y) + R(x - 16 * s, y + 24 * s, 32 * s, 7 * s, 2 * s, W, 0.85) + "</g>"; } return car(128, 168, 0.62, "#2E9BFF") + car(286, 196, 0.78, "#FFD34D") + car(200, 322, 1.25, "#E5322D") + E(200, 356, 66, 10, "rgba(0,0,0,0.3)"); })() +
      PA("M52 330 q-14 30 4 52 M348 318 q16 32 -2 58", "none", 1, " stroke='rgba(255,255,255,0.4)' stroke-width='6' stroke-linecap='round' fill='none'");
    SC.meteordodge = stars(sd, 30) + C(330, 70, 42, "#C86B4A") + C(316, 58, 9, "#A85438") + C(344, 84, 7, "#A85438") + E(74, 316, 66, 40, "#3E5C9B", 0.8) + PA("M20 300 a66 40 0 0 1 108 0", "none", 1, " stroke='#7FA8E0' stroke-width='5' fill='none'") +
      (function(){ function met(x, y, r){ return PA("M" + (x - 44) + " " + (y - 40) + " L" + (x - 6) + " " + (y - 14) + " L" + (x - 48) + " " + (y - 6), "none", 1, " stroke='#FF9F1C' stroke-width='6' stroke-linecap='round' fill='none'") + C(x, y, r, "#8A6A55") + C(x - r * 0.3, y - r * 0.2, r * 0.3, "#6E5545"); } return met(96, 108, 20) + met(306, 196, 26) + met(120, 238, 14); })() +
      "<g transform='rotate(24 218 190)'>" + PA("M218 128 L240 196 L228 226 L218 208 L208 226 L196 196 Z", "#E8EDF4") + C(218, 168, 10, "#2E9BFF") + P("196,196 176,226 198,220", "#E5322D") + P("240,196 260,226 238,220", "#E5322D") + PA("M208 226 L218 258 L228 226 Z", "#FF9F1C") + PA("M213 226 L218 244 L223 226 Z", "#FFD34D") + "</g>";
    SC.coinrunner = cloud(90, 50, 0.9) + cloud(300, 76, 0.7) + hills("#8FBF6F", "#5E9448") + R(0, 306, 400, 94, 0, "#B08954") + LN(0, 330, 400, 330, "#96703C", 5) +
      (function(){ var s = ""; for(var i = 0; i < 3; i++){ s += C(238 + i * 48, 148 - (i % 2) * 26, 15, "#FFC531") + C(238 + i * 48, 148 - (i % 2) * 26, 10, "#FFDF7E") + T(238 + i * 48, 153 - (i % 2) * 26, 14, "$", "#9A6B00"); } s += R(58, 252, 52, 12, 4, "#7A4A21") + R(64, 224, 8, 30, 3, "#96602C") + R(92, 224, 8, 30, 3, "#96602C") + R(52, 214, 60, 12, 4, RD); return s; })() +
      "<g>" + C(158, 178, 15, "#FFD9B8") + PA("M158 192 L146 236 L118 262", "none", 1, " stroke='#2255AA' stroke-width='13' stroke-linecap='round' fill='none'") + PA("M146 236 L178 252 L196 282", "none", 1, " stroke='#2255AA' stroke-width='13' stroke-linecap='round' fill='none'") + PA("M152 198 L118 224 M160 200 L196 218", "none", 1, " stroke='#E5322D' stroke-width='12' stroke-linecap='round' fill='none'") + R(138, 190, 40, 34, 8, "#E5322D") + "</g>" + SH(160, 316, 60);
    SC.motodash = C(64, 58, 26, "#FFDF9E") + hills("#C99B62", "#9A7443") + R(0, 316, 400, 84, 0, "#8A6238") + LN(0, 344, 400, 344, "#6E4C26", 5, 0.7, "26 20") +
      (function(){ var s = ""; s += C(138, 282, 33, "#23232E") + C(138, 282, 19, "#C0C8D2") + C(268, 282, 33, "#23232E") + C(268, 282, 19, "#C0C8D2"); s += PA("M138 282 L186 226 L238 226 L268 282 L222 282 L196 244 L168 282 Z", "#E8540A"); s += LN(186, 226, 156, 208, "#23232E", 9) + LN(238, 226, 262, 204, "#23232E", 9); s += C(196, 190, 14, "#FFD9B8") + PA("M180 176 a16 15 0 0 1 32 0 Z", Y); s += PA("M192 204 L214 232 L206 262 M196 206 L172 230", "none", 1, " stroke='#274b73' stroke-width='11' stroke-linecap='round' fill='none'"); s += PA("M120 306 q-26 10 -44 2 M286 306 q26 10 44 2", "none", 1, " stroke='rgba(255,255,255,0.45)' stroke-width='6' stroke-linecap='round' fill='none'"); return s; })() +
      R(330, 268, 44, 40, 4, "#7A4A21") + R(330, 268, 44, 10, 4, "#96602C");
    SC.stacktower = (function(){ var s = ""; var bx = [28, 92, 268, 330]; bx.forEach(function(x, i){ var h = 60 + (i * 37) % 70; s += R(x, 262 - h, 52, h, 3, K, 0.75); for(var w2 = 0; w2 < 3; w2++) s += R(x + 8 + (w2 % 2) * 20, 262 - h + 12 + w2 * 22, 10, 8, 1, Y, 0.5); }); return s; })() + R(0, 262, 400, 138, 0, D) +
      (function(){ var s = ""; var cols = ["#FF8A5C", "#FFD34D", "#4ADE80", "#6FC3FF", "#FF5A7A"]; for(var i = 0; i < 5; i++){ var w = 128 - i * 7; s += R(200 - w / 2, 316 - i * 27, w, 24, 4, cols[i]) + R(200 - w / 2, 316 - i * 27, w, 8, 4, W, 0.25); } s += LN(200, 0, 200, 96, "#2B2B36", 6) + PA("M186 96 L214 96 L208 116 L192 116 Z", "#2B2B36") + R(200 - 56, 118, 112, 24, 4, "#C86BFF") + R(144, 118, 112, 8, 4, W, 0.25); s += LN(146, 106, 200, 118, "#2B2B36", 4) + LN(254, 106, 200, 118, "#2B2B36", 4); return s; })() + SH(200, 352, 120);
    SC.paddlebounce = R(0, 300, 400, 100, 0, "#274b73") + LN(0, 300, 400, 300, "#BDE7FF", 4) + PA("M70 268 Q200 90 322 236", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='4' stroke-dasharray='2 11' stroke-linecap='round' fill='none'") +
      C(322, 240, 17, "#FFD34D") + C(316, 234, 6, W, 0.7) + PA("M322 240 L348 268 L336 276 L314 252 Z", "#FF9F1C", 0.5) +
      "<g transform='rotate(-14 128 292)'>" + R(84, 282, 88, 18, 9, "#FF5A7A") + R(84, 282, 88, 8, 8, W, 0.3) + R(118, 300, 20, 26, 6, "#7A4A21") + "</g>" + SH(128, 340, 70) +
      C(58, 120, 4, W, 0.6) + C(352, 84, 4, W, 0.6) + C(286, 52, 3, W, 0.6);
    SC.wallpong = (function(){ var s = ""; var cols = ["#9AA7B5", "#8A97A8", "#A8B5C4"]; for(var r = 0; r < 5; r++) for(var c = 0; c < 6; c++){ s += R(14 + c * 63 + (r % 2) * 30 - (r % 2) * 14, 26 + r * 40, 58, 34, 4, cols[(r + c) % 3]); } return s; })() +
      R(0, 236, 400, 164, 0, "#23232E") + PA("M238 236 L286 168 M252 244 L312 178 M226 252 L262 200", "none", 1, " stroke='rgba(255,255,255,0.35)' stroke-width='3' fill='none'") +
      C(268, 208, 15, "#FFD34D") + C(263, 203, 5, W, 0.7) + "<g transform='rotate(90 84 300)'>" + R(40, 291, 88, 18, 9, "#2E9BFF") + R(40, 291, 88, 8, 8, W, 0.3) + "</g>" + SH(90, 348, 56);
    SC.archery = hills("#5E8A4A", "#3A5C2C") + P("36,262 62,168 88,262", "#2E4A24") + P("316,262 344,158 372,262", "#2E4A24") + R(56, 256, 8, 40, 2, "#5C3A1E") + R(340, 250, 8, 46, 2, "#5C3A1E") +
      (function(){ function tgt(x, y, r){ return C(x, y, r, W) + C(x, y, r * 0.76, "#23232E") + C(x, y, r * 0.52, BL) + C(x, y, r * 0.3, RD) + C(x, y, r * 0.13, Y); } var s = tgt(272, 178, 62) + R(262, 238, 20, 40, 3, "#5C3A1E"); s += LN(120, 206, 236, 184, "#3A2A1A", 6) + LN(236, 184, 226, 178, "#C0C8D2", 5) + P("226,178 240,172 234,190", "#C0C8D2"); s += PA("M84 118 Q52 200 84 292", "none", 1, " stroke='#7A4A21' stroke-width='10' fill='none'"); s += PA("M84 118 Q118 200 84 292", "none", 1, " stroke='rgba(255,255,255,0.75)' stroke-width='3' fill='none'"); return s; })() + SH(272, 292, 70);
    SC.tankbattle = C(58, 56, 24, "#FFE9B0") + hills("#7A8455", "#55603A") + PA("M0 400 L0 292 Q120 262 210 292 Q300 320 400 288 L400 400 Z", "#49512F") +
      (function(){ var s = ""; s += PA("M52 292 L168 292 L156 262 L84 262 L70 276 L52 276 Z", "#5A6B3F") + R(94, 236, 52, 28, 6, "#66754A") + LN(140, 244, 208, 224, "#3E4A2A", 13) + C(76, 296, 17, "#23261C") + C(76, 296, 8, "#8A97A8") + C(136, 296, 17, "#23261C") + C(136, 296, 8, "#8A97A8"); s += PA("M206 218 Q268 168 330 196", "none", 1, " stroke='rgba(255,255,255,0.6)' stroke-width='4' stroke-dasharray='2 10' stroke-linecap='round' fill='none'"); s += C(336, 200, 11, "#2B2B36"); s += R(322, 268, 10, 34, 2, "#5C3A1E") + P("332,268 366,278 332,290", RD); s += PA("M316 306 a18 12 0 0 1 36 0 Z", "#3E4A2A"); return s; })();
    SC.bomberrun = cloud(70, 120, 0.9) + cloud(316, 66, 0.8) + cloud(210, 168, 0.6, 0.6) + hills("#7FA3C0", "#51748F") + R(0, 330, 400, 70, 0, "#3E5C46") +
      (function(){ var s = ""; s += "<g transform='rotate(4 190 108)'>" + E(190, 108, 84, 20, "#5B6B7A") + P("238,96 292,64 282,104 244,112", "#46545F") + P("118,100 84,74 96,108 116,114", "#46545F") + C(206, 102, 9, "#BDE7FF") + C(228, 102, 9, "#BDE7FF") + "</g>"; s += E(196, 178, 10, 18, "#2B2B36") + E(250, 226, 9, 16, "#2B2B36") + PA("M196 196 L186 240 M250 242 L262 282", "none", 1, " stroke='rgba(255,255,255,0.4)' stroke-width='3' stroke-dasharray='3 7' fill='none'"); s += R(96, 312, 52, 34, 3, "#7A4A21") + P("90,312 122,288 154,312", "#54350F") + R(262, 318, 44, 28, 3, "#8A5A2B") + P("258,318 284,296 310,318", "#54350F"); s += C(190, 322, 16, "none") + "<circle cx='190' cy='322' r='16' fill='none' stroke='#FF5252' stroke-width='4'/>" + LN(190, 300, 190, 344, "#FF5252", 3) + LN(168, 322, 212, 322, "#FF5252", 3); return s; })();
    SC.copter = PA("M0 0 L118 0 L84 400 L0 400 Z", "#6E4A2F") + PA("M400 0 L282 0 L316 400 L400 400 Z", "#7A5533") + PA("M118 0 L96 130 L130 250 L112 400 L84 400 L118 0", "#54381D", 0.6) + PA("M282 0 L300 150 L272 260 L290 400 L316 400 L282 0", "#54381D", 0.6) +
      (function(){ var s = ""; s += P("200,236 152,330 248,330", "rgba(255,240,180,0.20)"); s += LN(128, 128, 272, 128, "#2B2B36", 7) + C(200, 128, 8, "#2B2B36"); s += PA("M146 196 a54 42 0 0 1 108 0 l0 14 a54 30 0 0 1 -108 0 Z", "#FF8A3C") + C(226, 178, 17, "#BDE7FF") + R(140, 196, 26, 12, 5, "#2B2B36") + PA("M140 178 L108 158 L104 178 L138 190 Z", "#E8540A") + C(112, 160, 10, "#2B2B36", 0.35); s += LN(166, 224, 156, 244, "#2B2B36", 6) + LN(234, 224, 244, 244, "#2B2B36", 6) + LN(146, 246, 254, 246, "#2B2B36", 6); s += C(200, 188, 5, Y); return s; })();
    SC.sharpshooter = hills("#5C6650", "#3E4736") + PA("M0 400 L0 306 Q200 282 400 306 L400 400 Z", "#2F382A") +
      (function(){ function tgt(x, y, r){ return C(x, y, r, W) + C(x, y, r * 0.6, RD) + C(x, y, r * 0.28, W); } var s = tgt(92, 262, 17) + tgt(310, 240, 13) + tgt(238, 292, 10); s += C(200, 168, 96, "rgba(10,16,20,0.30)") + "<circle cx='200' cy='168' r='96' fill='none' stroke='#141A20' stroke-width='14'/>"; s += LN(200, 62, 200, 274, "rgba(20,26,32,0.85)", 3) + LN(94, 168, 306, 168, "rgba(20,26,32,0.85)", 3) + C(200, 168, 5, RD); s += tgt(200, 168, 15); s += PA("M252 238 L330 330", "none", 1, " stroke='#141A20' stroke-width='16' stroke-linecap='round' fill='none'"); return s; })();
    SC.parachute = cloud(70, 300, 0.9, 0.7) + cloud(330, 268, 0.8, 0.6) + PA("M0 400 L0 356 Q200 336 400 356 L400 400 Z", "#4E7A3A") +
      (function(){ var s = ""; s += PA("M112 128 a88 62 0 0 1 176 0 Z", "#FF5A7A") + PA("M112 128 a88 62 0 0 1 58 -34 l4 96 Z", "#FF8FA3", 0.85) + PA("M230 94 a88 62 0 0 1 58 34 l-62 62 Z", "#E5325F", 0.8); s += LN(118, 130, 188, 218, "#3A3F4A", 3) + LN(282, 130, 212, 218, "#3A3F4A", 3) + LN(200, 96, 200, 214, "#3A3F4A", 3); s += C(200, 226, 11, "#FFD9B8") + R(184, 236, 32, 36, 9, "#2E9BFF") + LN(190, 272, 182, 300, "#23232E", 7) + LN(210, 272, 220, 300, "#23232E", 7); s += PA("M60 128 q30 -12 52 4 M288 108 q30 -12 52 4", "none", 1, " stroke='rgba(255,255,255,0.6)' stroke-width='4' stroke-linecap='round' fill='none'"); return s; })() +
      E(200, 366, 74, 15, "#F5EFD2") + E(200, 366, 46, 10, "#FFD34D") + C(200, 366, 9, RD);
    SC.boxingreflex = R(30, 96, 340, 220, 14, "#7A1520") + LN(30, 150, 370, 150, W, 6) + LN(30, 206, 370, 206, "#BDE7FF", 6) + LN(30, 262, 370, 262, W, 6) + R(60, 96, 10, 220, 3, "#C0C8D2") + R(330, 96, 10, 220, 3, "#C0C8D2") + R(0, 316, 400, 84, 0, "#4A0D14") +
      (function(){ var s = ""; var pos = [[104, 128],[200, 118],[296, 128],[140, 226],[262, 226],[200, 282]]; pos.forEach(function(p2, i){ var hot = i === 1 || i === 4; if(hot) s += C(p2[0], p2[1], 40, Y, 0.35); s += C(p2[0], p2[1], 27, hot ? Y : "#5C2330") + C(p2[0], p2[1], 18, hot ? "#FFE9B0" : "#471A26"); }); s += PA("M66 330 q4 -26 28 -26 q20 0 20 20 q0 16 -14 20 l-6 22 l-30 0 Z", "#C62828") + PA("M334 330 q-4 -26 -28 -26 q-20 0 -20 20 q0 16 14 20 l6 22 l30 0 Z", "#C62828"); return s; })();
    SC.rocketland = stars(sd, 26) + C(72, 64, 30, "#7FB2E0") + C(60, 56, 8, "#5E9448", 0.8) + C(84, 76, 6, "#5E9448", 0.7) + PA("M0 400 L0 322 Q200 296 400 322 L400 400 Z", "#9AA0AE") + E(96, 356, 30, 9, "#7E8593") + E(318, 372, 40, 11, "#7E8593") + E(252, 340, 18, 6, "#7E8593") +
      (function(){ var s = ""; s += PA("M200 84 L228 150 L224 208 L176 208 L172 150 Z", "#E8EDF4") + PA("M200 84 L214 118 L186 118 Z", "#FF5A7A") + C(200, 152, 12, "#2E9BFF") + C(196, 148, 4, W, 0.8); s += PA("M176 188 L146 232 L174 226 Z", "#E5322D") + PA("M224 188 L254 232 L226 226 Z", "#E5322D"); s += PA("M186 208 L200 262 L214 208 Z", "#FF9F1C") + PA("M192 208 L200 240 L208 208 Z", "#FFD34D"); s += PA("M150 262 q50 14 100 0", "none", 1, " stroke='rgba(255,255,255,0.5)' stroke-width='4' stroke-dasharray='2 9' stroke-linecap='round' fill='none'"); return s; })() +
      R(140, 330, 120, 12, 4, "#5B6B7A") + R(152, 318, 8, 14, 2, "#5B6B7A") + R(240, 318, 8, 14, 2, "#5B6B7A") + T(200, 326, 13, "PAD", Y);
    /* ---- Board ---- */
    SC.connectfour = R(0, 312, 400, 88, 0, "#54350F") + R(56, 66, 288, 252, 16, "#2255AA") + R(56, 66, 288, 20, 10, "#2E6BD8") +
      (function(){ var s = ""; var discs = [[0,0,0,0,0,0],[0,0,0,1,0,0],[0,0,2,1,0,0],[0,2,1,2,0,1],[1,2,1,1,2,2]]; for(var r = 0; r < 5; r++) for(var c = 0; c < 7; c++){ var x = 84 + c * 40, y = 106 + r * 42; s += C(x, y, 16, "#12315F"); var d = r < discs.length && c < 6 ? discs[r][c] : 0; if(d) s = s.slice(0, s.length) ; if(d){ s += C(x, y, 13, d === 1 ? "#E5322D" : "#FFD34D") + C(x - 4, y - 4, 4, W, 0.55); } } s += C(204, 44, 17, "#E5322D") + C(199, 39, 5, W, 0.6) + PA("M204 62 L204 84", "none", 1, " stroke='rgba(255,255,255,0.65)' stroke-width='4' stroke-dasharray='3 6' fill='none'"); s += R(70, 318, 14, 34, 4, "#12315F") + R(316, 318, 14, 34, 4, "#12315F"); return s; })();
    SC.reversi = R(0, 316, 400, 84, 0, "#54350F") + PA("M58 54 L348 66 L340 316 L64 306 Z", "#0E6B4A") +
      (function(){ var s = ""; for(var r = 0; r < 6; r++) for(var c = 0; c < 6; c++){ var x = 78 + c * 42, y = 74 + r * 39; s += "<rect x='" + x + "' y='" + y + "' width='38' height='35' fill='none' stroke='rgba(0,0,0,0.35)' stroke-width='2'/>"; } var discs = [[0,0,1,2,0,0],[0,1,2,1,0,0],[1,2,2,2,1,0],[0,1,2,1,2,0],[0,0,1,2,0,1]]; for(var r2 = 0; r2 < 5; r2++) for(var c2 = 0; c2 < 6; c2++){ if(!discs[r2][c2]) continue; var x2 = 97 + c2 * 42, y2 = 91 + r2 * 39; s += C(x2, y2, 14, discs[r2][c2] === 1 ? "#191922" : "#F5F7FA") + C(x2 - 4, y2 - 5, 4, discs[r2][c2] === 1 ? W : "#C0C8D2", 0.5); } s += PA("M240 120 a15 15 0 0 1 0 30 Z", "#F5F7FA") + PA("M240 120 a15 15 0 0 0 0 30 Z", "#191922"); return s; })() + SH(200, 336, 140);
    SC.dotsboxes = PA("M48 44 L356 56 L346 320 L56 330 Z", "#FDF6E3") + R(0, 330, 400, 70, 0, "#7A4A21") +
      (function(){ var s = ""; for(var r = 0; r < 4; r++) for(var c = 0; c < 4; c++){ var x = 92 + c * 72, y = 76 + r * 66; if(c < 3 && (r + c) % 3 !== 2) s += LN(x, y, x + 72, y, "#2255AA", 6); if(r < 3 && (r * c) % 3 !== 1) s += LN(x, y, x, y + 66, "#E5322D", 6); s += C(x, y, 8, "#23232E"); } s += R(96, 80, 64, 58, 4, "rgba(46,155,255,0.30)") + R(168, 146, 64, 58, 4, "rgba(255,90,122,0.30)") + T(128, 118, 22, "A", "#2255AA") + T(200, 184, 22, "B", "#C2185B"); return s; })() +
      PA("M306 276 L354 322 L338 330 L298 288 Z", "#FFD34D") + P("354,322 344,312 338,330", "#3A2A1A");
    SC.seabattle = PA("M0 236 Q50 220 100 236 T200 236 T300 236 T400 236 L400 400 L0 400 Z", "#1D6FB8") + PA("M0 268 Q50 252 100 268 T200 268 T300 268 T400 268 L400 400 L0 400 Z", "#155A94", 0.85) + C(58, 56, 24, "#FFE9B0") + cloud(300, 60, 0.8, 0.8) +
      (function(){ var s = ""; s += PA("M96 236 L120 200 L268 200 L292 236 Z", "#5B6B7A") + R(150, 168, 90, 34, 4, "#46545F") + R(176, 140, 44, 30, 4, "#5B6B7A") + LN(268, 214, 316, 200, "#39434D", 8); s += C(120, 262, 10, W, 0.7) + C(160, 282, 13, W, 0.55) + C(268, 268, 9, W, 0.7); s += PA("M316 128 q10 -18 22 -6 q14 10 2 24 q16 2 10 16 q-4 12 -20 8 q-14 6 -20 -6 q-4 -14 6 -18 q-8 -8 0 -18", "#FF9F1C"); return s; })() +
      (function(){ var s = ""; for(var r = 0; r < 3; r++) for(var c = 0; c < 4; c++){ s += R(28 + c * 30, 318 + r * 26, 24, 20, 3, "rgba(255,255,255,0.14)"); } s += LN(46, 328, 58, 340, RD, 4) + LN(58, 328, 46, 340, RD, 4) + C(88, 356, 5, "#FF5252"); return s; })();
    SC.snakesladders = PA("M52 40 L352 52 L344 330 L58 340 Z", "#FDF6E3") + R(0, 336, 400, 64, 0, "#4E7A3A") +
      (function(){ var s = ""; for(var r = 0; r < 5; r++) for(var c = 0; c < 5; c++){ s += R(64 + c * 56, 54 + r * 54, 52, 50, 3, (r + c) % 2 ? "#F3D98B" : "#FFF3D0"); } s += PA("M96 300 C160 250 120 190 190 160 C250 136 236 84 306 76", "none", 1, " stroke='#3CB54A' stroke-width='15' stroke-linecap='round' fill='none'"); s += C(310, 74, 13, "#2E7D32") + C(305, 70, 3.4, W) + C(315, 70, 3.4, W) + PA("M302 84 l8 8 M314 84 l-8 8", "none", 1, " stroke='#E5322D' stroke-width='3' fill='none'"); s += LN(150, 306, 196, 108, "#96602C", 7) + LN(196, 306, 150, 108, "#96602C", 7); [306, 252, 198, 144].forEach(function(y){ s += LN(150, y, 196, y, "#96602C", 6); }); s += C(88, 314, 13, "#E5322D") + C(240, 130, 13, "#2E9BFF") + T(328, 322, 20, "100", "#7A5200"); return s; })();
    SC.checkers = PA("M40 316 L160 130 L360 130 L280 316 Z", "#8A97A8", 0.35) + (function(){ var s = ""; for(var r = 0; r < 6; r++) for(var c = 0; c < 6; c++){ var x = 76 + c * 42 + r * 4, y = 66 + r * 40; s += "<polygon points='" + x + "," + y + " " + (x + 40) + "," + (y + 3) + " " + (x + 38) + "," + (y + 36) + " " + (x - 2) + "," + (y + 33) + "' fill='" + ((r + c) % 2 ? "#5C3A24" : "#EBD9AE") + "'/>"; } var reds = [[1,4],[3,4],[0,5],[2,5],[4,5]]; var blues = [[2,0],[4,1],[1,1],[3,2]]; reds.forEach(function(p2){ var x = 96 + p2[0] * 42 + p2[1] * 4, y = 82 + p2[1] * 40; s += E(x, y + 5, 16, 6, "rgba(0,0,0,0.3)") + C(x, y, 15, "#C62828") + C(x, y, 10, "#E5322D") + C(x - 4, y - 4, 3.4, W, 0.6); }); blues.forEach(function(p2){ var x = 96 + p2[0] * 42 + p2[1] * 4, y = 82 + p2[1] * 40; s += C(x, y, 15, "#2255AA") + C(x, y, 10, "#2E6BD8"); }); s += T(190, 112 + 4 * 40, 16, "K", Y); return s; })() + R(0, 322, 400, 78, 0, "#54350F") + C(330, 288, 16, "#C62828") + C(330, 276, 16, "#E5322D") + C(330, 264, 16, "#C62828");
    SC.rps = hills(sh(c1, 0.85), D) +
      (function(){ var s = ""; s += P("52,268 66,214 106,198 142,214 150,268", "#8A97A8") + P("66,214 84,196 92,220 74,232", "#A8B5C4") + R(96, 268, 10, 40, 3, K); s += R(176, 196, 62, 84, 5, "#FDF6E3") + LN(186, 218, 228, 218, "#B9C4D0", 3) + LN(186, 238, 228, 238, "#B9C4D0", 3) + LN(186, 258, 216, 258, "#B9C4D0", 3) + R(204, 280, 10, 28, 3, K); s += LN(292, 238, 344, 196, "#C0C8D2", 10) + LN(292, 238, 350, 268, "#C0C8D2", 10) + C(288, 242, 13, "#E5322D") + C(288, 242, 7, "#F5F7FA") + R(292, 280, 10, 28, 3, K); s += T(100, 344, 17, "ROCK", W) + T(207, 344, 17, "PAPER", W) + T(302, 344, 15, "SCISSORS", W); return s; })();
    SC.cardwar = R(0, 306, 400, 94, 0, "#0E4420") + E(200, 330, 170, 40, "#14532A") +
      card(138, 168, 108, 152, -9, "A", "#C62828") + T(112, 128, 26, "♥", "#C62828") + card(262, 168, 108, 152, 9, "K", "#23232E") + T(288, 128, 26, "♠", "#23232E") +
      (function(){ var s = ""; for(var i = 0; i < 8; i++){ var a = i * 0.785; s += LN(200 + Math.cos(a) * 18, 168 + Math.sin(a) * 18, 200 + Math.cos(a) * 34, 168 + Math.sin(a) * 34, Y, 5); } s += T(200, 178, 22, "VS", "#7A5200"); s = C(200, 168, 20, Y) + s; return s; })() +
      (function(){ var s = ""; for(var i = 0; i < 4; i++){ s += R(52 + i * 4, 316 - i * 15, 44, 10, 4, i % 2 ? "#2E9BFF" : "#E5322D"); } for(var i2 = 0; i2 < 3; i2++){ s += R(308 - i2 * 4, 316 - i2 * 15, 44, 10, 4, "#FFD34D"); } return s; })();
    SC.twentyone = R(0, 250, 400, 150, 0, "#0B3520") + E(200, 268, 190, 62, "#14532A") + E(200, 268, 150, 44, "#1B6B38") +
      card(140, 130, 92, 128, -7, "10", "#23232E") + card(216, 122, 92, 128, 5, "A", "#C62828") + T(242, 88, 22, "♥", "#C62828") +
      card(292, 224, 70, 96, 12, "7", "#23232E") + R(56, 210, 62, 86, 8, "#1E3A6E") + PA("M62 222 L112 284 M112 222 L62 284", "none", 1, " stroke='#FFD34D' stroke-width='3' fill='none'") + R(56, 210, 62, 86, 8, "none") +
      (function(){ var s = ""; var cols = ["#E5322D", "#23232E", "#FFD34D"]; for(var st = 0; st < 3; st++) for(var i = 0; i < 3 - st; i++){ s += C(86 + st * 6, 348 - i * 13, 15, cols[st]) + C(86 + st * 6, 348 - i * 13, 9, W, 0.25); } s += T(308, 356, 30, "21", Y); return s; })();
    SC.higherlower = R(0, 300, 400, 100, 0, D) + card(130, 160, 104, 146, -6, "7", "#23232E") +
      P("268,96 300,140 282,140 282,196 250,196 250,140 232,140", "#3CB54A") + P("268,300 236,256 254,256 254,200 286,200 286,256 304,256", "#E5322D") +
      card(316, 330, 64, 88, 8, "?", "#7A5200") + PA("M60 330 q60 -18 120 0", "none", 1, " stroke='rgba(255,255,255,0.5)' stroke-width='4' stroke-dasharray='2 9' stroke-linecap='round' fill='none'") + T(96, 84, 19, "HIGHER?", W) + T(330, 76, 19, "or LOWER", W);
    /* ---- Sports & Racing ---- */
    SC.penalty = R(24, 60, 352, 210, 6, "rgba(255,255,255,0.10)") + R(24, 60, 352, 14, 0, W) + R(24, 60, 14, 210, 0, W) + R(362, 60, 14, 210, 0, W) + (function(){ var s = ""; for(var i = 0; i < 7; i++) s += LN(66 + i * 44, 62, 52 + i * 48, 268, "rgba(255,255,255,0.30)", 2); for(var j = 0; j < 4; j++) s += LN(26, 104 + j * 44, 374, 104 + j * 44, "rgba(255,255,255,0.30)", 2); return s; })() +
      PA("M0 400 L0 300 Q200 276 400 300 L400 400 Z", "#2E7D32") + PA("M0 338 Q200 316 400 338 L400 400 L0 400 Z", "#35963B") + E(200, 330, 60, 12, "none") + "<ellipse cx='200' cy='332' rx='58' ry='11' fill='none' stroke='rgba(255,255,255,0.7)' stroke-width='3'/>" +
      (function(){ var s = ""; s += C(200, 128, 16, "#FFD9B8") + R(182, 142, 36, 44, 9, "#FFD34D") + PA("M186 150 L138 128 M214 150 L262 128", "none", 1, " stroke='#FFD9B8' stroke-width='11' stroke-linecap='round' fill='none'"); s += C(126, 122, 13, "#FFD9B8", 0) ; s += PA("M132 116 a13 13 0 1 1 12 20 l-8 4 a17 17 0 0 1 -4 -24", W); s += C(310, 236, 21, W) + P("310,218 322,228 316,242 300,240 298,224", "#23232E") + P("306,252 314,252 312,262 304,258", "#23232E"); s += PA("M282 210 q-22 -14 -40 -8", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='4' stroke-dasharray='2 8' stroke-linecap='round' fill='none'"); return s; })();
    SC.hoopshots = R(0, 300, 400, 100, 0, "#B06A2C") + LN(0, 326, 400, 326, "#8A5220", 5) + LN(0, 358, 400, 358, "#8A5220", 5) + R(30, 40, 340, 90, 8, "rgba(255,255,255,0.13)") +
      R(146, 74, 108, 76, 6, "#F5F7FA") + R(156, 84, 88, 56, 4, "#E8540A") + R(168, 94, 64, 40, 3, "#F5F7FA") + E(200, 152, 34, 8, "#C62828") +
      (function(){ var s = ""; for(var i = 0; i < 5; i++) s += LN(174 + i * 13, 154, 182 + i * 10, 198, "rgba(255,255,255,0.85)", 2.5); s += LN(200, 60, 200, 150, "#5B6B7A", 8); s += PA("M84 262 Q150 128 196 148", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='4' stroke-dasharray='2 10' stroke-linecap='round' fill='none'"); s += C(196, 128, 21, "#F97F06") + PA("M176 120 q20 10 40 0 M196 108 q-8 20 0 40 M182 112 q14 16 30 30", "none", 1, " stroke='#8A3B00' stroke-width='3' fill='none'"); s += C(96, 292, 17, "#F97F06") + PA("M80 286 q16 8 32 0", "none", 1, " stroke='#8A3B00' stroke-width='2.5' fill='none'"); return s; })();
    SC.bowling = P("150,400 186,96 214,96 250,400", "#D8A75E") + P("118,400 182,96 194,96 196,400", "#C2913F") + P("204,400 206,96 218,96 282,400", "#C2913F") + LN(200, 380, 200, 120, "#A87B2F", 4, 0.6) + R(0, 60, 400, 38, 0, K, 0.7) + T(200, 88, 21, "STRIKE ZONE", Y) +
      (function(){ function pin(x, y, s){ return PA("M" + x + " " + (y - 30 * s) + " a9 10 0 0 1 6 14 q8 16 4 30 l-2 12 l-16 0 l-2 -12 q-4 -14 4 -30 a9 10 0 0 1 6 -14 Z", W) + R(x - 6 * s, y - 12 * s, 12 * s, 4 * s, 2, RD) + R(x - 6.5 * s, y - 6 * s, 13 * s, 4 * s, 2, RD); } var s = pin(200, 128, 0.9) + pin(176, 142, 0.85) + pin(224, 142, 0.85) + pin(162, 158, 0.8) + pin(200, 158, 0.8) + pin(238, 158, 0.8); s += C(150, 316, 30, "#5E35B1") + C(140, 306, 8, W, 0.35) + C(160, 300, 4.5, "#191922") + C(172, 312, 4.5, "#191922") + C(158, 322, 4.5, "#191922"); s += PA("M236 300 q26 12 22 34", "none", 1, " stroke='rgba(255,255,255,0.5)' stroke-width='5' stroke-linecap='round' fill='none'"); return s; })();
    SC.darts = R(40, 36, 320, 320, 16, "#4A3220") + R(52, 48, 296, 296, 12, "#5C4028") +
      (function(){ var s = ""; s += C(200, 186, 118, "#191922") + C(200, 186, 96, "#F3E5C0") + C(200, 186, 74, "#191922") + C(200, 186, 52, "#E5322D") + C(200, 186, 30, "#2E7D32") + C(200, 186, 13, "#E5322D"); for(var i = 0; i < 12; i++){ var a = i * 0.524; s += LN(200 + Math.cos(a) * 96, 186 + Math.sin(a) * 96, 200 + Math.cos(a) * 118, 186 + Math.sin(a) * 118, "#F3E5C0", 5); } s += T(200, 84, 19, "20", "#F3E5C0") + T(306, 194, 19, "6", "#F3E5C0") + T(200, 306, 19, "3", "#F3E5C0") + T(96, 194, 19, "11", "#F3E5C0"); s += "<g transform='rotate(24 236 148)'>" + P("236,148 262,138 252,158", "#C0C8D2") + R(252, 143, 34, 7, 3, "#E5322D") + "</g>"; s += "<g transform='rotate(-32 158 226)'>" + P("158,226 132,216 142,238", "#C0C8D2") + R(112, 221, 34, 7, 3, "#2E9BFF") + "</g>"; return s; })() + T(200, 380, 21, "301", Y);
    SC.minigolf = PA("M0 400 L0 250 Q120 210 210 258 Q290 300 400 262 L400 400 Z", "#4E9440") + PA("M52 400 C70 320 150 318 196 282 C240 248 300 254 356 226 L368 268 C310 296 262 292 226 316 C186 344 128 348 104 400 Z", "#C9B98A") + PA("M66 384 C84 326 152 326 194 292", "none", 1, " stroke='rgba(255,255,255,0.5)' stroke-width='4' stroke-dasharray='2 10' stroke-linecap='round' fill='none'") +
      E(330, 238, 17, 8, "#2E4A24") + LN(330, 238, 330, 178, "#F5F7FA", 5) + P("330,178 366,190 330,202", RD) + C(96, 344, 10, W) + C(92, 341, 3.4, "#C0C8D2", 0.8) +
      LN(120, 366, 168, 318, "#8A97A8", 7) + C(172, 314, 10, "#5B6B7A") + C(52, 108, 30, "#3E7A34") + R(48, 104, 8, 60, 3, "#5C3A1E") + C(352, 96, 36, "#3E7A34") + R(348, 92, 8, 62, 3, "#5C3A1E") + P("140,120 176,84 212,120", "#8A97A8") + R(128, 118, 96, 10, 4, "#7E8593");
    SC.cricketsmash = (function(){ var s = ""; for(var r = 0; r < 3; r++) for(var i = 0; i < 14; i++) s += C(22 + i * 27 + (r % 2) * 12, 36 + r * 24, 7, ["#FFD34D", "#6FC3FF", "#FF5A7A", "#F5F7FA"][(i + r) % 4], 0.85); s += R(0, 108, 400, 14, 0, K, 0.55); return s; })() +
      PA("M0 400 L0 250 Q200 224 400 250 L400 400 Z", "#4E9440") + P("168,400 186,262 214,262 232,400", "#E3D3A0") + LN(200, 400, 200, 262, "#C9B98A", 3, 0.5, "8 8") +
      (function(){ var s = ""; s += R(258, 268, 9, 40, 2, "#F3E5C0") + R(276, 268, 9, 40, 2, "#F3E5C0") + R(294, 268, 9, 40, 2, "#F3E5C0") + LN(258, 268, 303, 268, "#D8C58F", 5); s += C(168, 218, 14, "#12315F") + R(152, 230, 32, 40, 9, "#2255AA"); s += PA("M182 240 L226 206 L264 216", "none", 1, " stroke='#D8A75E' stroke-width='10' stroke-linecap='round' fill='none'"); s += PA("M158 268 L146 306 M178 268 L190 306", "none", 1, " stroke='#F5F7FA' stroke-width='11' stroke-linecap='round' fill='none'"); s += C(96, 150, 12, "#E5322D") + PA("M110 168 Q160 210 214 214", "none", 1, " stroke='rgba(255,255,255,0.6)' stroke-width='4' stroke-dasharray='2 9' stroke-linecap='round' fill='none'"); return s; })();
    SC.goalkeeper = R(20, 44, 360, 226, 6, "rgba(255,255,255,0.08)") + R(20, 44, 360, 13, 0, W) + R(20, 44, 13, 226, 0, W) + R(367, 44, 13, 226, 0, W) + (function(){ var s = ""; for(var i = 0; i < 8; i++) s += LN(58 + i * 40, 46, 46 + i * 44, 268, "rgba(255,255,255,0.28)", 2); for(var j = 0; j < 5; j++) s += LN(22, 86 + j * 42, 378, 86 + j * 42, "rgba(255,255,255,0.28)", 2); return s; })() +
      PA("M0 400 L0 296 Q200 274 400 296 L400 400 Z", "#2E7D32") +
      (function(){ var s = ""; s += C(118, 150, 24, W) + P("118,130 134,142 128,158 110,156 106,138", "#23232E"); s += PA("M126 168 Q170 196 214 190", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='4' stroke-dasharray='2 8' stroke-linecap='round' fill='none'"); s += "<g transform='rotate(-18 268 218)'>" + PA("M226 196 q-8 -22 14 -30 q26 -10 40 8 q10 14 -2 26 l6 20 q2 14 -12 16 l-38 4 q-14 0 -14 -14 Z", "#FFD34D") + "</g>"; s += "<g transform='rotate(24 160 262)'>" + PA("M122 244 q-6 -20 12 -28 q24 -10 36 6 q10 12 0 24 l4 18 q0 12 -12 14 l-34 2 q-12 -2 -12 -12 Z", "#FFD34D") + "</g>"; s += C(200, 316, 6, W, 0.7); return s; })();
    SC.tabletennis = P("58,318 118,196 282,196 342,318", "#2255AA") + P("58,318 118,196 132,196 92,318", "#2E6BD8") + LN(200, 196, 200, 318, W, 4) + P("196,196 204,196 206,318 194,318", "#F5F7FA") + R(0, 330, 400, 70, 0, "#54350F") +
      (function(){ var s = ""; s += "<g transform='rotate(-16 96 258)'>" + E(96, 238, 30, 36, "#C62828") + R(88, 268, 15, 34, 5, "#7A4A21") + "</g>"; s += "<g transform='rotate(18 308 224)'>" + E(308, 204, 28, 34, "#23232E") + R(300, 232, 15, 32, 5, "#7A4A21") + "</g>"; s += C(216, 168, 11, W) + PA("M122 214 Q168 156 208 162", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='3.5' stroke-dasharray='2 8' stroke-linecap='round' fill='none'"); s += T(84, 372, 20, "7", W) + T(316, 372, 20, "5", W) + T(200, 372, 16, "—  MATCH  —", "#FFD9A0"); return s; })();
    SC.dragrace = R(0, 236, 400, 164, 0, "#2E3440") + LN(0, 272, 400, 272, W, 5, 0.75, "30 22") + LN(0, 356, 400, 356, Y, 6) + R(0, 200, 400, 36, 0, K, 0.6) +
      (function(){ function car(x, y, s, col){ return "<g>" + PA("M" + (x - 74 * s) + " " + (y + 16 * s) + " q6 -26 40 -30 q14 -22 44 -22 q30 0 42 20 q28 4 32 32 Z", col) + R(x - 34 * s, y - 30 * s, 58 * s, 24 * s, 7 * s, "#BDE7FF") + C(x - 42 * s, y + 18 * s, 15 * s, "#14161F") + C(x - 42 * s, y + 18 * s, 7 * s, "#8A97A8") + C(x + 44 * s, y + 18 * s, 15 * s, "#14161F") + C(x + 44 * s, y + 18 * s, 7 * s, "#8A97A8") + R(x + 62 * s, y - 2 * s, 12 * s, 8 * s, 2, Y) + PA("M" + (x - 84 * s) + " " + (y + 20 * s) + " q-18 4 -26 -8 M" + (x - 80 * s) + " " + (y + 30 * s) + " q-14 8 -26 2", "none", 1, " stroke='rgba(255,255,255,0.5)' stroke-width='5' stroke-linecap='round' fill='none'") + "</g>"; } var s = car(118, 300, 0.92, "#E5322D") + car(292, 292, 0.98, "#2E9BFF"); s += R(356, 74, 22, 108, 8, "#23232E") + C(367, 92, 7, "#FF5252") + C(367, 118, 7, "#FF9F1C") + C(367, 144, 9, "#3CB54A") + C(367, 144, 15, "#3CB54A", 0.3); s += R(38, 96, 120, 26, 6, "rgba(0,0,0,0.4)") + T(98, 115, 16, "READY… GO!", Y); return s; })();
    SC.timetrial = PA("M196 400 C150 320 300 300 268 226 C240 158 110 168 128 104 C140 58 220 44 268 66", "none", 1, " stroke='#3A4150' stroke-width='74' fill='none'") + PA("M196 400 C150 320 300 300 268 226 C240 158 110 168 128 104 C140 58 220 44 268 66", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='4' stroke-dasharray='16 14' fill='none'") + PA("M60 400 L60 330 Q60 300 90 300 L118 300 Q92 330 92 400 Z", "#3CB54A", 0.5) +
      (function(){ var s = ""; s += C(320, 84, 42, "#F5F7FA") + C(320, 84, 36, W) + LN(320, 84, 320, 58, "#23232E", 5) + LN(320, 84, 340, 94, "#C62828", 5) + C(320, 84, 5, "#23232E") + R(308, 30, 24, 12, 4, "#5B6B7A"); s += "<g transform='rotate(38 168 296)'>" + PA("M104 296 q10 -20 44 -22 l44 -2 q22 2 28 18 l14 8 q4 10 -6 12 l-18 2 q-8 12 -24 12 l-64 0 q-18 0 -20 -14 Z", "#E5322D") + P("150,272 196,272 210,292 146,292", "#BDE7FF") + PA("M104 292 l-16 -14 l26 2 Z", "#B01E24") + C(126, 310, 12, "#14161F") + C(196, 310, 12, "#14161F") + "</g>"; return s; })();
    SC.derbydash = R(0, 108, 400, 10, 0, "#F5F7FA") + R(0, 176, 400, 8, 0, "#F5F7FA", 0.8) + R(0, 244, 400, 8, 0, "#F5F7FA", 0.65) + R(0, 262, 400, 138, 0, "#B08954") + LN(0, 300, 400, 300, "#96703C", 5, 0.6, "24 18") +
      (function(){ function horse(x, y, s, col, jc){ return "<g transform='translate(" + x + " " + y + ") scale(" + s + ")'>" + PA("M-58 6 q-14 -16 -6 -34 M-60 4 q-20 -4 -26 -20", "none", 1, " stroke='" + col + "' stroke-width='8' stroke-linecap='round' fill='none'") + E(0, 0, 52, 21, col) + PA("M44 -12 L68 -30 L78 -22 L58 2 L46 6 Z", col) + C(70, -26, 10, col) + PA("M-38 14 L-50 48 M-20 18 L-14 50 M30 16 L44 48 M46 10 L64 40", "none", 1, " stroke='" + col + "' stroke-width='9' stroke-linecap='round' fill='none'") + R(-16, -30, 32, 14, 4, jc) + C(-2, -44, 9, "#FFD9B8") + PA("M-6 -36 L-22 -18 M2 -36 L14 -20", "none", 1, " stroke='" + jc + "' stroke-width='7' stroke-linecap='round' fill='none'") + "</g>"; } return horse(140, 170, 0.92, "#6E4525", "#E5322D") + horse(268, 226, 1.12, "#3A2A1E", "#2E9BFF") + horse(96, 282, 0.8, "#8A97A8", "#FFD34D"); })() +
      R(366, 120, 8, 150, 3, W) + P("374,120 400,130 374,142", RD);
    SC.riverrush = PA("M148 400 C170 300 120 220 168 120 C190 74 186 30 178 0 L222 0 C214 40 210 80 234 128 C282 224 232 306 252 400 Z", "#2E9BFF") + PA("M164 400 C182 306 140 224 182 128", "none", 1, " stroke='rgba(255,255,255,0.45)' stroke-width='4' stroke-dasharray='2 12' stroke-linecap='round' fill='none'") + PA("M0 400 L0 0 L178 0 C186 30 190 74 168 120 C120 220 170 300 148 400 Z", "#5E9448") + PA("M400 400 L400 0 L222 0 C210 80 234 128 282 224 C232 306 252 400 252 400 Z", "#4E8440") +
      (function(){ var s = ""; s += C(120, 120, 22, "#3E7A34") + C(310, 90, 28, "#3E7A34") + C(96, 260, 20, "#3E7A34"); s += C(238, 168, 11, "#FF5252") + R(232, 150, 12, 10, 3, W) + C(160, 262, 10, "#FF9F1C") + R(154, 246, 12, 9, 3, W); s += "<g transform='rotate(-8 204 322)'>" + PA("M168 344 L182 306 L226 306 L240 344 Q204 358 168 344 Z", "#F5F7FA") + PA("M176 340 L186 314 L222 314 L232 340 Z", "#E5322D") + C(204, 322, 9, "#23232E") + PA("M204 306 L204 282", "none", 1, " stroke='#23232E' stroke-width='5' fill='none'") + P("204,282 226,292 204,298", "#2E9BFF") + "</g>"; s += PA("M168 356 q-20 14 -44 10 M240 356 q20 14 44 10 M178 368 q26 12 52 0", "none", 1, " stroke='rgba(255,255,255,0.8)' stroke-width='5' stroke-linecap='round' fill='none'"); return s; })();
    /* ---- Memory ---- */
    SC.simonlights = R(52, 62, 296, 296, 150, "#23232E") + R(52, 62, 296, 296, 150, "none") + C(200, 210, 146, "#2E2E3C") +
      PA("M200 74 a136 136 0 0 1 124 92 L212 198 a14 14 0 0 0 -12 -6 Z", "#3CB54A") + PA("M324 166 a136 136 0 0 1 -38 158 L216 212 a14 14 0 0 0 4 -12 Z", "#FFD34D") + PA("M286 324 a136 136 0 0 1 -172 0 L188 208 a14 14 0 0 0 12 4 Z", "#2E9BFF") + PA("M114 324 a136 136 0 0 1 -38 -158 L184 200 a14 14 0 0 0 -4 12 Z", "#E5322D") +
      C(200, 84, 0, W) + PA("M200 74 a136 136 0 0 1 124 92 L212 198 a14 14 0 0 0 -12 -6 Z", W, 0.28) + C(200, 210, 44, "#191922") + C(200, 210, 44, "none") + T(200, 218, 17, "PLAY", "#8A97A8") + SH(200, 372, 120);
    SC.echotones = PA("M0 120 Q200 96 400 120 L400 400 L0 400 Z", "#141428") + (function(){ var s = ""; [150, 196, 242, 288].forEach(function(y){ s += LN(30, y, 370, y, "rgba(255,255,255,0.28)", 3); }); function note(x, y, col, s2){ return E(x, y, 13 * s2, 9 * s2, col) + LN(x + 12 * s2, y, x + 12 * s2, y - 44 * s2, col, 4.5) + PA("M" + (x + 12 * s2) + " " + (y - 44 * s2) + " q18 4 14 22 q-2 -12 -14 -14", col); } s += note(88, 262, "#FFD34D", 1.15) + note(168, 224, "#7FE7DC", 1.3) + note(252, 268, "#FF5A7A", 1.05) + note(318, 210, "#B79CED", 1.25); s += PA("M52 84 a26 26 0 0 1 0 40 M332 84 a26 26 0 0 0 0 40 M36 70 a44 44 0 0 1 0 68 M348 70 a44 44 0 0 0 0 68", "none", 1, " stroke='rgba(255,255,255,0.5)' stroke-width='4' stroke-linecap='round' fill='none'"); return s; })() + C(200, 366, 5, W, 0.6) + C(150, 366, 5, W, 0.4) + C(250, 366, 5, W, 0.4);
    SC.shapesequence = R(26, 128, 348, 108, 16, "rgba(255,255,255,0.13)") +
      C(72, 182, 24, "#FFD34D") + P("136,208 162,156 188,208", "#FF5A7A") + P("238,158 246,174 264,176 250,188 254,206 238,196 222,206 226,188 212,176 230,174", Y) + PA("M292 160 l22 22 -22 22 -22 -22 Z", "#4ADE80") +
      (function(){ var s = ""; [112, 204, 272].forEach(function(x){ s += P(x + ",174 " + (x + 14) + ",182 " + (x) + ",190 " + (x + 2) + ",182", W, 0.8); }); s += R(52, 282, 62, 62, 12, "rgba(255,255,255,0.16)") + C(83, 313, 15, "#FFD34D", 0.9); s += R(140, 282, 62, 62, 12, "rgba(255,255,255,0.16)") + P("156,326 171,298 186,326", "#FF5A7A", 0.9); s += R(228, 282, 62, 62, 12, Y) + T(259, 326, 30, "?", "#5C3A00"); s += R(316, 282, 62, 62, 12, "rgba(255,255,255,0.16)") + PA("M332 313 l15 -15 15 15 -15 15 Z", "#4ADE80", 0.9); return s; })() + T(200, 84, 21, "REMEMBER THE ORDER", W);
    SC.numbermemory = cloud(70, 330, 0.8, 0.35) + (function(){ var s = ""; s += PA("M96 236 a52 44 0 0 1 20 -86 a62 52 0 0 1 116 -14 a48 42 0 0 1 56 62 a40 36 0 0 1 -22 64 l4 34 l-38 -22 a52 44 0 0 1 -72 6 a48 42 0 0 1 -64 -10 Z", "rgba(255,255,255,0.92)"); s += T(138, 176, 44, "4", "#274b73") + T(192, 158, 52, "7", "#C2185B") + T(248, 182, 44, "2", "#2E7D32") + T(196, 232, 30, "9", "#B06A2C"); s += C(120, 306, 9, "rgba(255,255,255,0.75)") + C(104, 336, 13, "rgba(255,255,255,0.6)"); s += C(200, 330, 20, "#FFD9B8") + PA("M172 366 a28 22 0 0 1 56 0 l0 34 l-56 0 Z", "#4527A0"); return s; })() + stars(sd, 8);
    SC.positionmemory = R(72, 56, 256, 256, 14, "rgba(10,14,20,0.45)") +
      (function(){ var s = ""; var lit = [[0,0],[2,1],[1,2],[3,3]]; for(var r = 0; r < 4; r++) for(var c = 0; c < 4; c++){ s += R(88 + c * 60, 72 + r * 60, 50, 50, 9, "rgba(255,255,255,0.13)"); } s += PA("M113 97 L233 157 L173 217 L293 277", "none", 1, " stroke='rgba(255,211,77,0.65)' stroke-width='4' stroke-dasharray='2 9' stroke-linecap='round' fill='none'"); lit.forEach(function(p2, i){ var x = 113 + p2[0] * 60, y = 97 + p2[1] * 60; s += C(x, y, 24, Y, 0.3) + C(x, y, 17, i === 3 ? "#FF8A3C" : Y) + T(x, y + 7, 17, i + 1, "#5C3A00"); }); return s; })() + T(200, 348, 19, "WHERE DID THEY FLASH?", W);
    SC.pairsblitz = (function(){ var s = ""; s += C(322, 62, 34, "#F5F7FA") + LN(322, 62, 322, 40, "#23232E", 4.5) + LN(322, 62, 340, 72, "#C62828", 4.5) + C(322, 62, 4, "#23232E"); for(var r = 0; r < 3; r++) for(var c = 0; c < 4; c++){ var x = 52 + c * 78, y = 96 + r * 84; if((r === 0 && c === 1) || (r === 2 && c === 3)){ s += R(x, y, 64, 72, 9, "#FFF3D6") + P((x + 32) + "," + (y + 14) + " " + (x + 38) + "," + (y + 27) + " " + (x + 52) + "," + (y + 29) + " " + (x + 41) + "," + (y + 38) + " " + (x + 45) + "," + (y + 53) + " " + (x + 32) + "," + (y + 45) + " " + (x + 19) + "," + (y + 53) + " " + (x + 23) + "," + (y + 38) + " " + (x + 12) + "," + (y + 29) + " " + (x + 26) + "," + (y + 27), Y); } else { s += R(x, y, 64, 72, 9, "#1E3A6E") + R(x + 6, y + 6, 52, 60, 6, "none") + "<rect x='" + (x + 6) + "' y='" + (y + 6) + "' width='52' height='60' rx='6' fill='none' stroke='#FFD34D' stroke-width='2.5'/>" + T(x + 32, y + 48, 24, "?", "#FFD34D"); } } return s; })() + PA("M52 356 h296", "none", 1, " stroke='#FF5252' stroke-width='7' stroke-linecap='round' fill='none'") + PA("M52 356 h170", "none", 1, " stroke='#3CB54A' stroke-width='7' stroke-linecap='round' fill='none'");
    SC.spotdifference = R(36, 64, 150, 250, 12, "#FDF6E3") + R(214, 64, 150, 250, 12, "#FDF6E3") +
      (function(){ var s = ""; for(var p2 = 0; p2 < 2; p2++){ for(var r = 0; r < 4; r++) for(var c = 0; c < 3; c++){ var x = 56 + p2 * 178 + c * 44, y = 88 + r * 52; var diff = p2 === 1 && r === 2 && c === 1; s += C(x + 18, y + 18, 15, diff ? "#FF5252" : ((r + c) % 2 ? "#2E9BFF" : "#FFD34D")); } } s += C(296, 212, 30, "rgba(190,230,255,0.35)") + "<circle cx='296' cy='212' r='30' fill='none' stroke='#5B6B7A' stroke-width='6'/>" + LN(318, 234, 344, 262, "#5B6B7A", 9); s += T(111, 344, 17, "SAME…", "#5C4A00") + T(289, 344, 17, "…ALMOST", "#8A1F1F"); return s; })() + T(200, 40, 21, "SPOT IT!", W);
    /* ---- Words ---- */
    SC.hangman = R(0, 330, 400, 70, 0, "#4A3220") + R(70, 322, 180, 12, 4, "#5C3A1E") + R(96, 84, 14, 244, 4, "#7A4A21") + R(96, 84, 168, 14, 4, "#7A4A21") + R(238, 98, 10, 44, 3, "#D8C58F") + PA("M243 142 a26 24 0 0 1 0 48", "none", 1, " stroke='#D8C58F' stroke-width='5' fill='none'") +
      P("206,196 222,168 238,196 230,196 230,214 214,214 214,196", "#FFD34D") + R(206, 210, 32, 8, 3, "#B06A2C") +
      (function(){ var s = ""; var word = ["A", "P", "P", "", "E"]; word.forEach(function(ch, i){ var x = 56 + i * 60; s += LN(x, 300, x + 44, 300, W, 5); if(ch) s += T(x + 22, 288, 34, ch, W); else s += T(x + 22, 288, 32, "L", "rgba(255,255,255,0.30)"); }); return s; })() + cloud(320, 60, 0.7, 0.5);
    SC.spellingbee = (function(){ var s = ""; var hex = function(x, y, r, f, o){ var pts = ""; for(var i = 0; i < 6; i++){ var a = i * 1.047 - 0.52; pts += (x + r * Math.cos(a)).toFixed(0) + "," + (y + r * Math.sin(a)).toFixed(0) + " "; } return P(pts, f, o); }; s += hex(96, 92, 34, "#FFC531") + hex(158, 66, 26, "#FFDF7E") + hex(66, 152, 24, "#FFDF7E") + hex(316, 290, 30, "#FFC531", 0.8) + hex(356, 240, 22, "#FFDF7E", 0.8); s += E(178, 196, 52, 38, "#FFC531") + PA("M150 166 q-6 30 2 58 M176 160 q-8 36 0 72 M202 164 q6 28 -2 56", "none", 1, " stroke='#3A2A1A' stroke-width='8' fill='none'"); s += E(148, 150, 26, 16, "rgba(255,255,255,0.75)") + E(196, 138, 22, 14, "rgba(255,255,255,0.6)"); s += C(222, 190, 12, "#3A2A1A") + C(226, 186, 4, W); s += PA("M228 208 q20 10 30 26", "none", 1, " stroke='#3A2A1A' stroke-width='4' fill='none'"); return s; })() +
      tile(92, 322, 50, -6, "B", W, "#7A5200", 28) + tile(152, 330, 50, 4, "E", W, "#7A5200", 28) + tile(212, 322, 50, -3, "E", "#FFE1A8", "#7A5200", 28) + T(310, 336, 21, "= BEE", W);
    SC.synonyms = PA("M52 300 L52 108 Q124 84 196 106 L196 300 Q124 280 52 300 Z", "#FDF6E3") + PA("M348 300 L348 108 Q276 84 204 106 L204 300 Q276 280 348 300 Z", "#F5ECD2") + LN(200, 106, 200, 300, "#C9B98A", 5) + R(0, 306, 400, 94, 0, "#54350F") +
      T(124, 168, 25, "HAPPY", "#274b73") + T(124, 210, 13.5, "= means the same", "#6E5A20") + T(276, 168, 25, "JOYFUL", "#C2185B") + T(276, 210, 13.5, "as HAPPY", "#6E5A20") +
      (function(){ var s = ""; s += PA("M84 246 h34 M100 236 v20", "none", 1, " stroke='#3CB54A' stroke-width='6' stroke-linecap='round' fill='none'"); s += T(272, 256, 16.5, "RAPID ≈ SWIFT", "#3A3F4A"); return s; })() + C(200, 74, 20, Y) + T(200, 82, 20, "=", "#5C3A00");
    SC.antonyms = P("0,0 200,0 200,400 0,400", "#FFC65C") + P("200,0 400,0 400,400 200,400", "#1D2440") + C(100, 108, 34, "#FF9F1C") + (function(){ var s = ""; for(var i = 0; i < 8; i++){ var a = i * 0.785; s += LN(100 + Math.cos(a) * 44, 108 + Math.sin(a) * 44, 100 + Math.cos(a) * 56, 108 + Math.sin(a) * 56, "#FF9F1C", 5); } return s; })() + C(310, 96, 26, "#F5EFD2") + C(298, 88, 22, "#1D2440") + stars(sd, 7) +
      R(36, 236, 128, 52, 12, W) + T(100, 270, 23, "HOT", "#C62828") + P("176,250 196,262 176,274", W) + P("224,250 204,262 224,274", W) + R(236, 236, 128, 52, 12, "#39406B") + T(300, 270, 23, "COLD", "#BDE7FF") +
      R(52, 316, 96, 44, 10, W, 0.92) + T(100, 344, 19, "DAY", "#7A5200") + R(252, 316, 96, 44, 10, "#39406B") + T(300, 344, 19, "NIGHT", "#F5EFD2");
    SC.typingsprint = R(56, 52, 288, 118, 12, "#141A20") + R(66, 62, 268, 98, 8, "#0E2A22") + T(84, 96, 21, "quick brown fox…", "#4ADE80", "start") + LN(84, 116, 250, 116, "#4ADE80", 3, 0.5) + T(84, 146, 17, "words / min: 42", "#B9F5D2", "start") + R(184, 170, 32, 14, 3, "#2B2B36") +
      (function(){ var s = ""; var rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]; rows.forEach(function(row, r){ for(var i = 0; i < row.length; i++){ var x = 44 + i * 33 + r * 12, y = 216 + r * 46; var hot = (r === 1 && i === 3) || (r === 0 && i === 5); s += R(x, y, 29, 38, 6, hot ? "#FFD34D" : "#F5F7FA") + T(x + 14.5, y + 26, 15, row[i], "#23232E"); } }); s += R(120, 356, 170, 34, 7, "#F5F7FA"); return s; })();
    SC.missingletter = hills(sh(c1, 0.85), D) +
      tile(62, 130, 54, -5, "B", W, "#274b73") + tile(124, 122, 54, 3, "?", "#FFD34D", "#5C3A00") + tile(186, 130, 54, -3, "T", W, "#274b73") + tile(248, 122, 54, 5, "T", W, "#274b73") + tile(310, 130, 54, -4, "E", W, "#274b73") +
      tile(94, 216, 54, 4, "R", W, "#274b73") + tile(156, 224, 54, -4, "F", W, "#274b73") + tile(218, 216, 54, 3, "L", W, "#274b73") + tile(280, 224, 54, -3, "Y", W, "#274b73") +
      PA("M286 288 L352 340 L332 348 L276 302 Z", "#FF8A3C") + P("352,340 340,330 332,348", "#3A2A1A") + PA("M120 300 q60 -20 130 -4", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='4' stroke-dasharray='2 9' stroke-linecap='round' fill='none'") + T(92, 336, 24, "U ?", Y);
    SC.proverbs = PA("M70 70 L330 70 L330 300 Q265 282 200 300 Q135 282 70 300 Z", "#F7E7BD") + R(56, 56, 16, 258, 8, "#B06A2C") + R(328, 56, 16, 258, 8, "#B06A2C") + T(200, 128, 21, "“ Practice makes", "#5C3A1E") + T(200, 162, 25, "… PERFECT ”", "#8A1F1F") + LN(110, 196, 290, 196, "#C9B98A", 3) + LN(110, 220, 262, 220, "#C9B98A", 3) +
      (function(){ var s = ""; s += PA("M286 268 q40 6 56 30 l-30 4 q-16 -22 -26 -34", "#5C3A1E"); s += C(118, 262, 26, "#8A6A45") + C(104, 252, 8, "#5C3A1E") + C(104, 252, 15, "#A8835C"); s += C(104, 252, 9, "#F5EFD2") + C(104, 252, 4.5, "#23232E"); s += P("88,268 76,282 92,282", "#FF9F1C"); return s; })() + SH(200, 330, 130);
    /* ---- Math ---- */
    SC.quickmath = R(44, 48, 312, 240, 10, "#173D2A") + R(36, 40, 328, 256, 12, "none") + "<rect x='36' y='40' width='328' height='256' rx='12' fill='none' stroke='#96602C' stroke-width='10'/>" + R(0, 306, 400, 94, 0, "#54350F") +
      T(104, 126, 40, "7 + 5", "#F5F7FA") + T(268, 126, 40, "= ?", "#FFD34D") + T(110, 196, 34, "9 × 3", "#B9F5D2") + T(276, 196, 34, "27 ✓", "#4ADE80") + T(118, 262, 32, "20 ÷ 4", "#F5F7FA") + PA("M64 146 q30 -8 60 2 M230 216 q26 -8 52 0", "none", 1, " stroke='rgba(255,255,255,0.4)' stroke-width='3' fill='none'") +
      (function(){ var s = ""; s += R(52, 330, 130, 34, 9, "#E5322D") + T(117, 353, 18, "0:12", W); s += PA("M306 318 L356 352 L338 360 L296 330 Z", "#F5F7FA"); return s; })();
    SC.timestables = PA("M56 44 L348 56 L340 326 L62 334 Z", "#FDF6E3") + R(0, 330, 400, 70, 0, "#54350F") +
      (function(){ var s = ""; for(var r = 0; r < 5; r++){ for(var c = 0; c < 4; c++){ var x = 82 + c * 62, y = 72 + r * 50; var hot = (r === 2 && c === 2); s += R(x, y, 54, 42, 6, hot ? "#FFD34D" : ((r + c) % 2 ? "#FFEFC4" : "#F5ECD2")) + T(x + 27, y + 28, 16, (r + 2) + "×" + (c + 3), hot ? "#5C3A00" : "#5C4A20"); } } s += T(200, 344, 5, "", W); return s; })() + T(200, 366, 20, "3 × 4 = 12", Y) + PA("M286 292 L340 330 L322 338 L278 304 Z", "#FF8A3C");
    SC.numberbonds = hills(sh(c1, 0.85), D) +
      (function(){ var s = ""; s += C(112, 168, 52, "#2E9BFF") + T(112, 180, 30, "35", W); s += C(288, 168, 52, "#FF5A7A") + T(288, 180, 30, "?", W); s += PA("M158 150 q42 -22 84 0 M158 190 q42 22 84 0", "none", 1, " stroke='#F5F7FA' stroke-width='7' fill='none'"); s += C(200, 84, 36, Y) + T(200, 96, 26, "100", "#5C3A00"); s += LN(178, 104, 136, 128, W, 4, 0.7, "2 7") + LN(224, 104, 262, 128, W, 4, 0.7, "2 7"); s += T(200, 300, 26, "35 + ? = 100", W); s += R(118, 316, 164, 10, 5, "rgba(0,0,0,0.25)"); return s; })();
    SC.numbersequences = PA("M0 400 L0 330 L400 330 L400 400 Z", D) +
      (function(){ var s = ""; var steps = [[52, 286, "2"], [122, 240, "4"], [192, 194, "8"], [262, 148, "16"], [326, 104, "?"]]; steps.forEach(function(st, i){ s += R(st[0], st[1], 62, 44, 8, i === 4 ? "#FFD34D" : L) + R(st[0], st[1], 62, 16, 8, W, 0.22) + T(st[0] + 31, st[1] + 31, 23, st[2], i === 4 ? "#5C3A00" : W); if(i < 4) s += PA("M" + (st[0] + 62) + " " + (st[1] + 10) + " q14 -16 24 -22", "none", 1, " stroke='rgba(255,255,255,0.6)' stroke-width='3.5' fill='none'"); }); s += PA("M52 330 L118 330 L118 400 L52 400 Z", sh(c1, 0.9)) + PA("M122 330 L188 330 L188 400 L122 400 Z", sh(c1, 0.8)) + PA("M192 330 L258 330 L258 400 L192 400 Z", sh(c1, 0.7)); return s; })() + T(82, 84, 20, "×2  ×2  ×2 …", "#FFE9B0");
    SC.truefalse = R(56, 66, 288, 104, 14, "#FDF6E3") + T(200, 130, 34, "6 + 4 = 11", "#3A2A1A") + PA("M92 146 h216", "none", 1, " stroke='#E5322D' stroke-width='4' stroke-linecap='round' fill='none'") + LN(276, 84, 322, 148, "#E5322D", 6) + LN(322, 84, 276, 148, "#E5322D", 6) +
      R(44, 216, 140, 92, 16, "#2E7D32") + T(114, 258, 27, "TRUE", W) + T(114, 290, 22, "✓", "#B9F5D2") + R(216, 216, 140, 92, 16, "#B01E24") + T(286, 258, 27, "FALSE", W) + T(286, 292, 20, "✗", "#FFD2D2") + SH(114, 330, 70) + SH(286, 330, 70) + T(200, 366, 17, "45 seconds — decide fast!", "#FFE9B0");
    SC.evenodd = P("200,44 356,200 200,356 44,200", "rgba(255,255,255,0.12)") +
      tile(104, 130, 74, -7, "8", "#6FC3FF", "#0B3555", 40) + tile(296, 130, 74, 7, "7", "#FF9FB0", "#5C0B20", 40) + tile(104, 282, 74, 6, "3", "#FF9FB0", "#5C0B20", 40) + tile(296, 282, 74, -6, "12", "#6FC3FF", "#0B3555", 34) +
      R(56, 178, 96, 36, 18, "#2E9BFF") + T(104, 202, 18, "EVEN", W) + R(248, 178, 96, 36, 18, "#FF5A7A") + T(296, 202, 18, "ODD", W) + T(200, 216, 26, "or", W);
    SC.primetime = hills(K, D) + stars(sd, 10) +
      (function(){ var s = ""; var gems = [[84, 236, "2", "#7FE7DC"], [160, 268, "3", "#FF9FB0"], [240, 268, "5", "#B79CED"], [316, 236, "7", "#FFD34D"]]; gems.forEach(function(g2){ s += P(g2[0] + "," + (g2[1] - 44) + " " + (g2[0] + 30) + "," + (g2[1] - 16) + " " + (g2[0] + 16) + "," + (g2[1] + 30) + " " + (g2[0] - 16) + "," + (g2[1] + 30) + " " + (g2[0] - 30) + "," + (g2[1] - 16), g2[3]) + P(g2[0] + "," + (g2[1] - 44) + " " + (g2[0] + 30) + "," + (g2[1] - 16) + " " + (g2[0] - 30) + "," + (g2[1] - 16), W, 0.3) + T(g2[0], g2[1] + 4, 24, g2[2], "#1D2440") + R(g2[0] - 26, g2[1] + 44, 52, 10, 4, K); }); s += T(200, 108, 26, "PRIME or NOT?", Y); s += PA("M70 148 q130 -34 260 0", "none", 1, " stroke='rgba(255,255,255,0.45)' stroke-width='3' stroke-dasharray='2 9' stroke-linecap='round' fill='none'"); return s; })();
    SC.greaterthan = R(0, 316, 400, 84, 0, "#54350F") + LN(200, 108, 200, 262, "#8A97A8", 9) + P("176,120 224,120 200,88", "#C0C8D2") + LN(92, 176, 308, 150, "#8A97A8", 8) +
      (function(){ var s = ""; s += PA("M52 178 a42 20 0 0 0 84 0 Z", "#5B6B7A") + PA("M264 152 a42 20 0 0 0 84 0 Z", "#5B6B7A"); s += R(58, 96, 72, 58, 10, "#FFD34D") + T(94, 134, 30, "0.8", "#5C3A00"); s += R(272, 62, 72, 58, 10, "#FF5A7A") + T(308, 100, 27, "3/4", W); s += R(172, 262, 56, 34, 6, "#7A4A21") + R(162, 296, 76, 12, 5, "#54350F"); s += T(200, 356, 21, "TAP THE GREATER ONE", "#FFE9B0"); return s; })();
    /* ---- Knowledge: shared quiz-stage base, unique hero prop per subject ---- */
    function stage(hero, label){
      return P("0,64 92,34 92,96 0,104", "rgba(120,10,30,0.5)") + P("400,64 308,34 308,96 400,104", "rgba(120,10,30,0.5)") + R(0, 26, 400, 10, 0, "rgba(0,0,0,0.35)") +
      (function(){ var s = ""; [-118, 118].forEach(function(off){ s += P((200 + off - 44) + ",52 " + (200 + off + 44) + ",52 " + (200 + off + 88) + ",300 " + (200 + off - 88) + ",300", "rgba(255,240,190,0.13)"); s += C(200 + off, 46, 13, "#FFE9B0"); }); return s; })() +
      R(40, 292, 320, 16, 6, "rgba(0,0,0,0.35)") + R(66, 306, 268, 34, 6, sh(c2, 0.85)) + T(200, 329, 17, label, "#FFE9B0") +
      (function(){ var s = ""; for(var i = 0; i < 9; i++) s += C(66 + i * 33, 372, 10, "rgba(0,0,0,0.4)") + C(66 + i * 33, 368, 8, "rgba(255,220,160,0.5)"); return s; })() + hero;
    }
    SC.worldcapitals = stage(C(200, 178, 76, "#2E9BFF") + PA("M128 150 a76 76 0 0 1 144 0 M132 208 a76 76 0 0 0 140 0", "none", 1, " stroke='rgba(255,255,255,0.55)' stroke-width='3' fill='none'") + E(200, 178, 26, 76, "none") + "<ellipse cx='200' cy='178' rx='26' ry='76' fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='3'/>" + C(168, 148, 13, "#3CB54A") + C(232, 190, 16, "#3CB54A") + C(196, 224, 10, "#3CB54A") + P("316,96 322,128 328,96 334,140 340,96", "#3A2A1A") + C(328, 84, 10, "#E5322D") + LN(328, 94, 328, 96, "#3A2A1A", 3) + P("66,238 76,190 86,238", "#2B2B36") + LN(76, 190, 76, 176, "#2B2B36", 3) + C(76, 172, 4, Y), "NAME THE CAPITAL");
    SC.flagquiz = stage((function(){ var s = ""; var flags = [["#E5322D", "#F5F7FA", 96], ["#2E7D32", "#F5F7FA", 178], ["#2E9BFF", "#FFD34D", 260]]; flags.forEach(function(f2){ s += R(f2[2], 84, 6, 168, 3, "#8A97A8") + C(f2[2] + 3, 80, 6, Y); s += PA("M" + (f2[2] + 6) + " 92 q30 -12 58 0 l0 44 q-28 -12 -58 0 Z", f2[0]) + PA("M" + (f2[2] + 6) + " 114 q30 -12 58 0 l0 10 q-28 -10 -58 0 Z", f2[1], 0.9); }); s += C(200, 262, 17, Y) + T(200, 270, 20, "?", "#5C3A00"); return s; })(), "WHICH COUNTRY?");
    SC.animalkingdom = stage(C(318, 84, 20, "#FFE9B0") + PA("M-4 252 Q90 214 190 240 Q300 266 404 238 L404 306 L-4 306 Z", "#8A6A2F") + R(58, 168, 9, 74, 3, "#4A3512") + PA("M62 176 Q20 140 6 150 Q44 158 58 168 Q56 130 84 116 Q80 156 68 172 Q104 140 128 152 Q92 168 68 178 Z", "#5E9448") +
      (function(){ var s = ""; s += "<g transform='translate(-88 -78) scale(1.42)'>"; s += E(196, 208, 58, 24, "#D8A75E") + C(258, 192, 26, "#B8792E") + C(258, 192, 19, "#E3B96B") + PA("M138 196 q-26 -12 -30 -34", "none", 1, " stroke='#B8792E' stroke-width='7' stroke-linecap='round' fill='none'"); s += PA("M160 226 L152 258 M182 230 L182 260 M224 228 L232 258 M244 222 L258 250", "none", 1, " stroke='#B8792E' stroke-width='9' stroke-linecap='round' fill='none'"); s += C(266, 188, 3.4, "#23232E") + P("248,168 254,152 262,166", "#B8792E") + P("268,166 278,154 280,170", "#B8792E"); s += "</g>"; return s; })(), "ANIMAL KINGDOM");
    SC.sciencelab = stage(R(52, 250, 296, 12, 4, "#3A2A4A") + (function(){ var s = ""; s += PA("M118 250 L132 176 L132 140 L152 140 L152 176 L166 250 Z", "rgba(160,225,255,0.5)") + PA("M124 224 L160 224 L166 250 L118 250 Z", "#4ADE80", 0.85) + C(136, 236, 4, W, 0.8) + C(148, 242, 3, W, 0.8) + C(142, 210, 3, W, 0.7); s += PA("M212 250 a30 30 0 1 1 60 0 Z", "rgba(160,225,255,0.5)") + PA("M220 238 a22 14 0 0 1 44 0 l4 12 l-52 0 Z", "#FF5A7A", 0.85); s += LN(292, 250, 292, 176, "#C0C8D2", 8) + PA("M292 176 a22 22 0 1 1 22 22", "none", 1, " stroke='#C0C8D2' stroke-width='7' fill='none'") + C(306, 208, 8, "#7FE7DC"); s += R(60, 108, 70, 8, 3, "#57406E") + R(66, 76, 12, 32, 3, "#FF9F1C") + R(86, 82, 12, 26, 3, "#2E9BFF") + R(106, 70, 12, 38, 3, "#FF5A7A"); return s; })(), "SCIENCE LAB");
    SC.sportstrivia = stage((function(){ var s = ""; s += PA("M168 96 L232 96 L226 148 Q224 176 200 178 Q176 176 174 148 Z", "#FFC531") + PA("M168 108 q-30 2 -24 24 q5 18 30 14 M232 108 q30 2 24 24 q-5 18 -30 14", "none", 1, " stroke='#FFC531' stroke-width='8' fill='none'"); s += R(188, 178, 24, 18, 3, "#D8A75E") + R(164, 196, 72, 12, 5, "#B06A2C"); s += C(200, 128, 13, "#FFE9B0", 0.85); s += C(92, 236, 24, W) + P("92,216 106,228 100,246 82,244 78,226", "#23232E"); s += C(310, 230, 22, "#F97F06") + PA("M290 222 q20 10 40 0 M310 210 q-8 20 0 42", "none", 1, " stroke='#8A3B00' stroke-width='3' fill='none'"); s += C(120, 128, 6, Y) + C(288, 118, 6, Y) + C(200, 66, 5, Y); return s; })(), "SPORTS TRIVIA");
    SC.historyquest = stage((function(){ var s = ""; [92, 152, 248, 308].forEach(function(x){ s += R(x - 13, 128, 26, 108, 3, "#E8DCC0") + R(x - 18, 118, 36, 12, 3, "#D8C8A4") + R(x - 18, 234, 36, 12, 3, "#D8C8A4") + LN(x - 6, 134, x - 6, 228, "#C4B28C", 3) + LN(x + 6, 134, x + 6, 228, "#C4B28C", 3); }); s += R(66, 100, 268, 18, 4, "#E8DCC0") + P("86,100 200,58 314,100", "#D8C8A4"); s += P("200,58 200,84 188,84", "#C4B28C"); s += PA("M170 262 q30 -16 60 0 l0 18 q-30 -14 -60 0 Z", "#B79CED"); return s; })(), "HISTORY QUEST");
    SC.geographyexplorer = stage(PA("M84 96 L158 74 L238 92 L320 70 L326 236 L240 254 L156 240 L78 258 Z", "#F3E5C0") + PA("M84 96 L158 74 L238 92 L320 70", "none", 1, " stroke='#C9B98A' stroke-width='3' fill='none'") +
      (function(){ var s = ""; s += P("120,214 152,164 184,214", "#8A97A8") + P("140,186 152,164 164,186 156,186 152,180 148,186", W); s += P("204,224 232,182 260,224", "#7E8593"); s += PA("M96 130 q60 30 40 62 q-16 34 44 40", "none", 1, " stroke='#2E9BFF' stroke-width='6' fill='none'"); s += PA("M236 120 q44 34 66 30", "none", 1, " stroke='#C62828' stroke-width='3.5' stroke-dasharray='7 6' fill='none'"); s += C(302, 148, 8, "#C62828") + C(302, 148, 14, "#C62828", 0.3); s += C(268, 98, 17, "none") + "<circle cx='268' cy='98' r='17' fill='none' stroke='#7A5200' stroke-width='3'/>" + P("268,86 272,98 268,94 264,98", "#C62828") + P("268,110 264,98 268,102 272,98", "#274b73"); return s; })(), "GEOGRAPHY EXPLORER");
    SC.spacevoyage = stage(stars(sd, 14) + C(150, 186, 52, "#C86BFF") + PA("M92 206 a130 34 -18 1 1 116 0 a130 34 -18 1 1 -116 0", "none", 1, " stroke='#FFD34D' stroke-width='8' fill='none'") + C(134, 168, 10, "#A854E0") + C(168, 200, 7, "#A854E0") +
      (function(){ var s = ""; s += "<g transform='rotate(32 282 128)'>" + PA("M282 76 L300 138 L294 168 L270 168 L264 138 Z", "#E8EDF4") + C(282, 120, 9, "#2E9BFF") + PA("M270 168 L282 196 L294 168 Z", "#FF9F1C") + "</g>"; s += C(88, 84, 16, "#F5EFD2") + C(80, 78, 5, "#D8D2C4"); s += C(330, 226, 5, Y) + C(70, 250, 4, Y); return s; })(), "SPACE VOYAGE");
    SC.foodworld = stage(R(52, 238, 296, 14, 5, "#5C3A1E") + (function(){ var s = ""; s += PA("M128 168 a72 40 0 0 0 144 0 Z", "#F5F7FA") + PA("M128 168 a72 40 0 0 0 144 0", "none", 1, " stroke='#C0C8D2' stroke-width='4' fill='none'"); s += E(200, 166, 66, 13, "#D84315") + E(200, 162, 52, 9, "#F4653A") + C(176, 160, 6, "#3CB54A") + C(206, 158, 6, "#FFD34D") + C(226, 162, 5, "#3CB54A"); s += PA("M168 128 q6 -16 -2 -26 M200 124 q8 -18 0 -30 M232 128 q6 -16 -2 -26", "none", 1, " stroke='rgba(255,255,255,0.75)' stroke-width='5' stroke-linecap='round' fill='none'"); s += LN(238, 138, 292, 92, "#D8A75E", 5) + LN(250, 148, 304, 108, "#D8A75E", 5); s += C(96, 214, 17, "#FF9F1C") + PA("M88 200 q8 -10 18 -8", "none", 1, " stroke='#3CB54A' stroke-width='4' fill='none'"); s += C(306, 216, 15, "#E5322D") + C(300, 210, 5, W, 0.6); s += R(150, 208, 100, 8, 4, "#39434D") + R(162, 216, 76, 20, 4, "#23232E"); return s; })(), "FOOD WORLD");
    SC.musicnotes = stage(PA("M40 40 L96 40 L84 250 L40 250 Z", "#7A1520") + PA("M360 40 L304 40 L316 250 L360 250 Z", "#7A1520") + (function(){ var s = ""; for(var i = 0; i < 5; i++){ s += R(140 + i * 25, 196, 21, 66, 3, i % 2 ? "#23232E" : "#F5F7FA"); } s += R(132, 256, 140, 10, 4, "#3A2A1A"); function note(x, y, col, s2){ return E(x, y, 12 * s2, 8.5 * s2, col) + LN(x + 11 * s2, y, x + 11 * s2, y - 40 * s2, col, 4) + PA("M" + (x + 11 * s2) + " " + (y - 40 * s2) + " q16 4 12 20 q-2 -11 -12 -12", col); } s += note(120, 130, "#FFD34D", 1.1) + note(196, 104, "#7FE7DC", 1.3) + note(272, 138, "#FF5A7A", 1.05); return s; })(), "MUSIC NOTES");
    SC.humanbody = stage((function(){ var s = ""; s += C(200, 84, 17, "#FFD9B8") + PA("M200 102 L200 176 M200 122 L158 146 M200 122 L242 146 M200 176 L174 244 M200 176 L228 244", "none", 1, " stroke='#FFD9B8' stroke-width='13' stroke-linecap='round' fill='none'"); s += PA("M200 168 q-26 -20 -26 6 q0 18 26 30 q26 -12 26 -30 q0 -26 -26 -6", "#FF5A6E"); s += PA("M84 150 h44 l8 -18 l12 34 l8 -16 h52", "none", 1, " stroke='#4ADE80' stroke-width='4' fill='none'"); s += PA("M262 226 h30 l6 -14 l10 26 l6 -12 h30", "none", 1, " stroke='#7FE7DC' stroke-width='3.5' fill='none'"); s += C(118, 96, 12, "rgba(255,255,255,0.18)") + C(298, 92, 9, "rgba(255,255,255,0.15)"); return s; })(), "HUMAN BODY");
    SC.greatinventions = stage(R(48, 246, 304, 12, 4, "#3A2A4A") + (function(){ var s = ""; s += C(200, 138, 52, "rgba(255,230,150,0.25)"); s += PA("M164 138 a36 38 0 1 1 72 0 q0 22 -12 30 l-4 14 l-40 0 l-4 -14 q-12 -8 -12 -30 Z", "rgba(255,246,200,0.85)"); s += PA("M186 156 q6 -14 14 0 q8 14 14 0 M193 156 q0 -18 7 -24 q7 6 7 24", "none", 1, " stroke='#E8930C' stroke-width='4' fill='none'"); s += R(182, 184, 36, 8, 3, "#5B6B7A") + R(186, 194, 28, 8, 3, "#46545F"); s += (function(){ var pts = ""; for(var i = 0; i < 8; i++){ var a = i * 0.785; var r1 = i % 2 ? 17 : 23; pts += (282 + r1 * Math.cos(a)).toFixed(0) + "," + (216 + r1 * Math.sin(a)).toFixed(0) + " "; } return P(pts, "#8A97A8") + C(282, 216, 8, "#39434D"); })(); s += PA("M84 236 L128 200 L118 236 Z", "#2E9BFF", 0.85) + LN(96, 250, 130, 250, "#C0C8D2", 4); s += LN(120, 108, 150, 88, "#FFE9B0", 3.5) + LN(280, 108, 250, 88, "#FFE9B0", 3.5) + LN(200, 66, 200, 44, "#FFE9B0", 3.5); return s; })(), "GREAT INVENTIONS");
    var inner = SC[id] || (hills(sh(c1, 0.85), D) + R(120, 110, 160, 130, 14, "rgba(255,255,255,0.2)") + T(200, 196, 64, glyph, W));
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='0.35' y2='1'>" +
      "<stop offset='0' stop-color='" + L + "'/><stop offset='0.52' stop-color='" + M + "'/><stop offset='1' stop-color='" + c2 + "'/></linearGradient>" +
      "<radialGradient id='bloom' cx='0.28' cy='0.16' r='0.95'>" +
      "<stop offset='0' stop-color='rgba(255,255,255,0.34)'/><stop offset='0.55' stop-color='rgba(255,255,255,0)'/></radialGradient>" +
      "<linearGradient id='vin' x1='0' y1='0' x2='0' y2='1'>" +
      "<stop offset='0.72' stop-color='rgba(0,0,0,0)'/><stop offset='1' stop-color='rgba(0,0,0,0.26)'/></linearGradient></defs>" +
      "<rect width='400' height='400' fill='url(#g)'/>" +
      inner +
      "<rect width='400' height='400' fill='url(#bloom)'/>" +
      "<rect width='400' height='400' fill='url(#vin)'/></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  var LVL_KEY = "chigaroo_levels_v1";
  function lvlOf(id){
    try{ var m = JSON.parse(localStorage.getItem(LVL_KEY) || "{}"); return (typeof m[id] === "number" && m[id] > 0) ? m[id] : 1; }catch(e){ return 1; }
  }
  function lvlSet(id, n){
    try{ var m = JSON.parse(localStorage.getItem(LVL_KEY) || "{}"); if(n > (m[id] || 1)){ m[id] = n; localStorage.setItem(LVL_KEY, JSON.stringify(m)); } }catch(e){}
  }
  function lvlBadge(id){ return '<span class="gx-lvl">LEVEL ' + lvlOf(id) + '</span>'; }
  function winJingle(){ beepSeq([660, 880, 990, 1320], 110); }
  function hudLine(pairs){
    return '<div class="score-line">' + pairs.map(function(p){ return '<span>' + p[0] + ': <b>' + p[1] + '</b></span>'; }).join("") + '</div>';
  }
  function nextLevelBtn(label){
    return '<div class="btn-row"><button class="mini-btn orange" data-nextlvl="1">' + label + '</button></div>';
  }
  function diffIdx(){ return state.difficulty === "Easy" ? 0 : state.difficulty === "Hard" ? 2 : 1; }
  function rnd(n){ return Math.floor(Math.random() * n); }
  function pick(a){ return a[rnd(a.length)]; }
  function shuffleCopy(a){ return shuffleArr(a.slice()); }

  /* ---------- Question banks: [question, correct, wrong, wrong, wrong] ---------- */
  var QUIZ_BANKS = {
    capitals: [
      ["What is the capital of France?", "Paris", "London", "Berlin", "Madrid"],
      ["What is the capital of Japan?", "Tokyo", "Seoul", "Beijing", "Bangkok"],
      ["What is the capital of Australia?", "Canberra", "Sydney", "Melbourne", "Perth"],
      ["What is the capital of Canada?", "Ottawa", "Toronto", "Vancouver", "Montreal"],
      ["What is the capital of Brazil?", "Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      ["What is the capital of Egypt?", "Cairo", "Alexandria", "Giza", "Luxor"],
      ["What is the capital of Pakistan?", "Islamabad", "Karachi", "Lahore", "Quetta"],
      ["What is the capital of Turkey?", "Ankara", "Istanbul", "Izmir", "Bursa"],
      ["What is the capital of Norway?", "Oslo", "Bergen", "Trondheim", "Tromsø"],
      ["What is the capital of Argentina?", "Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
      ["What is the capital of Iceland?", "Reykjavík", "Akureyri", "Keflavík", "Húsavík"],
      ["What is the capital of Mongolia?", "Ulaanbaatar", "Darkhan", "Erdenet", "Choibalsan"],
      ["What is the capital of New Zealand?", "Wellington", "Auckland", "Christchurch", "Hamilton"],
      ["What is the capital of Kazakhstan?", "Astana", "Almaty", "Shymkent", "Aktobe"],
      ["What is the capital of Ethiopia?", "Addis Ababa", "Dire Dawa", "Mekelle", "Gondar"],
      ["What is the capital of Peru?", "Lima", "Cusco", "Arequipa", "Trujillo"]
    ],
    flags: [
      ["🇯🇵 Which country has this flag?", "Japan", "China", "South Korea", "Vietnam"],
      ["🇧🇷 Which country has this flag?", "Brazil", "Argentina", "Colombia", "Chile"],
      ["🇨🇦 Which country has this flag?", "Canada", "USA", "Mexico", "Peru"],
      ["🇮🇳 Which country has this flag?", "India", "Pakistan", "Nepal", "Bangladesh"],
      ["🇬🇧 Which country has this flag?", "United Kingdom", "Australia", "Ireland", "New Zealand"],
      ["🇹🇷 Which country has this flag?", "Turkey", "Tunisia", "Algeria", "Morocco"],
      ["🇰🇷 Which country has this flag?", "South Korea", "Japan", "China", "Thailand"],
      ["🇪🇬 Which country has this flag?", "Egypt", "Iraq", "Yemen", "Sudan"],
      ["🇸🇦 Which country has this flag?", "Saudi Arabia", "Qatar", "Oman", "Kuwait"],
      ["🇮🇹 Which country has this flag?", "Italy", "Mexico", "Hungary", "Bulgaria"],
      ["🇿🇦 Which country has this flag?", "South Africa", "Kenya", "Nigeria", "Ghana"],
      ["🇸🇪 Which country has this flag?", "Sweden", "Finland", "Denmark", "Norway"]
    ],
    animals: [
      ["Which animal is the largest land animal?", "African elephant", "Giraffe", "Hippo", "Rhino"],
      ["How many legs does a spider have?", "8", "6", "10", "4"],
      ["Which bird cannot fly but swims very well?", "Penguin", "Ostrich", "Kiwi", "Emu"],
      ["What do pandas mostly eat?", "Bamboo", "Grass", "Fish", "Fruit"],
      ["Which animal has the longest neck?", "Giraffe", "Camel", "Horse", "Llama"],
      ["Which sea animal has eight arms?", "Octopus", "Squid", "Jellyfish", "Starfish"],
      ["A baby frog is called a…", "Tadpole", "Cub", "Calf", "Pup"],
      ["Which animal is called the King of the Jungle?", "Lion", "Tiger", "Leopard", "Cheetah"],
      ["Which is the fastest land animal?", "Cheetah", "Horse", "Lion", "Gazelle"],
      ["How many hearts does an octopus have?", "3", "1", "2", "4"],
      ["Which mammal can fly?", "Bat", "Squirrel", "Owl", "Falcon"],
      ["What is a group of wolves called?", "A pack", "A herd", "A flock", "A swarm"]
    ],
    science: [
      ["What is H₂O more commonly known as?", "Water", "Salt", "Oxygen", "Hydrogen"],
      ["Which planet is known as the Red Planet?", "Mars", "Venus", "Jupiter", "Mercury"],
      ["What force pulls objects toward the Earth?", "Gravity", "Magnetism", "Friction", "Inertia"],
      ["How many sides does a hexagon have?", "6", "5", "7", "8"],
      ["What gas do plants absorb from the air?", "Carbon dioxide", "Oxygen", "Nitrogen", "Helium"],
      ["At what temperature does water boil at sea level?", "100°C", "90°C", "80°C", "120°C"],
      ["Which organ pumps blood around the body?", "Heart", "Liver", "Lung", "Brain"],
      ["What is the closest star to Earth?", "The Sun", "Proxima Centauri", "Sirius", "Polaris"],
      ["Which metal is liquid at room temperature?", "Mercury", "Iron", "Copper", "Aluminium"],
      ["How many legs does an insect have?", "6", "8", "4", "10"],
      ["What do bees produce?", "Honey", "Milk", "Silk", "Wax candles"],
      ["Which part of the cell contains DNA?", "Nucleus", "Ribosome", "Membrane", "Cytoplasm"]
    ],
    sportsquiz: [
      ["How many players of one football team are on the pitch?", "11", "10", "9", "12"],
      ["In cricket, how many balls are in one over?", "6", "4", "8", "10"],
      ["How often are the Olympic Games held?", "Every 4 years", "Every 2 years", "Every 3 years", "Every 5 years"],
      ["In tennis, a score of zero is called…", "Love", "Nil", "Duck", "Ace"],
      ["How many holes are played in a full round of golf?", "18", "9", "12", "24"],
      ["Which country invented chess?", "India", "China", "Persia", "Egypt"],
      ["A marathon is about how many kilometres?", "42", "26", "50", "35"],
      ["In basketball, a free throw is worth how many points?", "1", "2", "3", "4"],
      ["How many rings are on the Olympic flag?", "5", "4", "6", "7"],
      ["In snooker, which ball is worth the most points?", "Black", "Pink", "Blue", "Yellow"],
      ["Which sport uses a shuttlecock?", "Badminton", "Squash", "Tennis", "Cricket"],
      ["How long is a football match (without extra time)?", "90 minutes", "80 minutes", "100 minutes", "120 minutes"]
    ],
    history: [
      ["In which year did humans first land on the Moon?", "1969", "1959", "1975", "1981"],
      ["The Great Wall is in which country?", "China", "Japan", "Mongolia", "Korea"],
      ["Who painted the Mona Lisa?", "Leonardo da Vinci", "Picasso", "Van Gogh", "Rembrandt"],
      ["Pakistan became independent in which year?", "1947", "1945", "1950", "1935"],
      ["The pyramids of Giza were built in which country?", "Egypt", "Mexico", "Sudan", "Peru"],
      ["Which ship famously sank in 1912?", "Titanic", "Lusitania", "Queen Mary", "Britannic"],
      ["Who was the first President of the USA?", "George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
      ["The Roman Empire's language was mainly…", "Latin", "Greek", "Arabic", "Hebrew"],
      ["Printing with movable type was developed by…", "Johannes Gutenberg", "Isaac Newton", "Galileo", "Edison"],
      ["The Second World War ended in which year?", "1945", "1939", "1941", "1950"],
      ["Which ancient civilization built Machu Picchu?", "The Inca", "The Aztecs", "The Maya", "The Romans"],
      ["The first Olympic Games were held in…", "Greece", "Italy", "Egypt", "France"]
    ],
    geography: [
      ["Which is the largest ocean on Earth?", "Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      ["Which is the longest river in the world?", "The Nile", "The Amazon", "The Yangtze", "The Indus"],
      ["Mount Everest lies in which mountain range?", "Himalayas", "Andes", "Alps", "Karakoram"],
      ["Which is the largest desert in the world?", "Antarctic desert", "Sahara", "Arabian", "Gobi"],
      ["Which continent is the smallest?", "Australia (Oceania)", "Europe", "Antarctica", "Africa"],
      ["The Amazon rainforest is mostly in which country?", "Brazil", "Peru", "Colombia", "Venezuela"],
      ["Which country has the most natural lakes?", "Canada", "Russia", "USA", "Finland"],
      ["The River Indus flows into which sea?", "Arabian Sea", "Red Sea", "Caspian Sea", "Bay of Bengal"],
      ["Which is the deepest ocean trench?", "Mariana Trench", "Tonga Trench", "Java Trench", "Puerto Rico Trench"],
      ["K2, the second highest mountain, is in which range?", "Karakoram", "Himalayas", "Hindu Kush", "Pamir"],
      ["Which strait separates Spain and Morocco?", "Gibraltar", "Bosphorus", "Malacca", "Hormuz"],
      ["Which country is both a continent and a country?", "Australia", "Greenland", "Madagascar", "Iceland"]
    ],
    riddles: [
      ["I speak without a mouth and hear without ears. What am I?", "An echo", "A shadow", "The wind", "A mirror"],
      ["The more of me you take, the more you leave behind. What am I?", "Footsteps", "Photos", "Breaths", "Memories"],
      ["What has keys but cannot open a single lock?", "A piano", "A map", "A computer", "A treasure chest"],
      ["What gets wetter the more it dries?", "A towel", "A sponge", "Soap", "A mop"],
      ["What has a head and a tail but no body?", "A coin", "A snake", "A river", "A comet"],
      ["What runs but never walks, has a mouth but never talks?", "A river", "A clock", "A train", "The wind"],
      ["What has many teeth but cannot bite?", "A comb", "A saw", "A zipper", "A gear"],
      ["The person who makes me has no need of me; the person who buys me has no use for me. What am I?", "A coffin", "A gift", "A candle", "A mirror"],
      ["What belongs to you, but others use it more than you do?", "Your name", "Your money", "Your phone", "Your shadow"],
      ["What can you catch, but never throw?", "A cold", "A ball", "A fish", "A bus"],
      ["I am always hungry and must be fed; if I drink, I die. What am I?", "Fire", "A baby", "A plant", "A sponge"],
      ["What has one eye but cannot see?", "A needle", "A storm", "A potato", "A camera"]
    ],
    space: [
      ["Which planet is biggest in our solar system?", "Jupiter", "Saturn", "Neptune", "Uranus"],
      ["How many moons does Mars have?", "2", "1", "0", "4"],
      ["What galaxy do we live in?", "The Milky Way", "Andromeda", "Triangulum", "Whirlpool"],
      ["Who was the first person in space?", "Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Alan Shepard"],
      ["Which planet has the most visible rings?", "Saturn", "Jupiter", "Uranus", "Neptune"],
      ["How long does light from the Sun take to reach Earth?", "About 8 minutes", "About 8 seconds", "About 1 hour", "About 1 minute"],
      ["What is a shooting star really?", "A meteor", "A comet", "A satellite", "A planet"],
      ["Which planet is hottest?", "Venus", "Mercury", "Mars", "Jupiter"],
      ["What does NASA stand for? It is the space agency of…", "The USA", "Russia", "Europe", "China"],
      ["A year on Mercury is about how many Earth days?", "88", "365", "225", "687"]
    ],
    food: [
      ["Sushi is a famous dish from which country?", "Japan", "China", "Thailand", "Korea"],
      ["Which fruit keeps the doctor away, according to the saying?", "Apple", "Banana", "Orange", "Pear"],
      ["What is the main ingredient in guacamole?", "Avocado", "Tomato", "Onion", "Pepper"],
      ["Which country drinks the most tea per person?", "Turkey", "India", "China", "United Kingdom"],
      ["Biryani is cooked mainly with…", "Rice", "Wheat", "Corn", "Potato"],
      ["Which nut is used to make marzipan?", "Almond", "Walnut", "Cashew", "Peanut"],
      ["Tofu is made from…", "Soybeans", "Rice", "Milk", "Wheat"],
      ["Which spice is known as 'red gold' and is the most expensive?", "Saffron", "Turmeric", "Cardamom", "Cinnamon"],
      ["Pizza originally comes from which city?", "Naples", "Rome", "Venice", "Milan"],
      ["What gives green tea and spinach their green color?", "Chlorophyll", "Carotene", "Melanin", "Keratin"]
    ],
    music: [
      ["How many strings does a standard guitar have?", "6", "4", "5", "7"],
      ["Which instrument has 88 keys?", "Piano", "Organ", "Accordion", "Harp"],
      ["A group of four musicians is called a…", "Quartet", "Trio", "Duet", "Octet"],
      ["Which of these is a wind instrument?", "Flute", "Violin", "Cello", "Drum"],
      ["Beethoven composed music in which country?", "Germany", "France", "Italy", "Poland"],
      ["The tabla is a pair of…", "Hand drums", "Flutes", "Bells", "Strings"],
      ["How many notes are in one octave?", "8", "7", "10", "12"],
      ["Which instrument is known as the 'king of instruments'?", "Pipe organ", "Piano", "Violin", "Trumpet"],
      ["A sitar has how many main playing strings, typically?", "7", "6", "12", "4"],
      ["Which family does the trumpet belong to?", "Brass", "Woodwind", "Strings", "Percussion"]
    ],
    body: [
      ["How many bones are in the adult human body?", "206", "186", "226", "306"],
      ["Which is the largest organ of the human body?", "Skin", "Liver", "Heart", "Lung"],
      ["How many teeth does an adult usually have?", "32", "28", "30", "36"],
      ["Which blood cells carry oxygen?", "Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
      ["Where is the smallest bone in the body?", "In the ear", "In the nose", "In the finger", "In the foot"],
      ["Which muscle is the strongest for its size?", "Jaw muscle", "Biceps", "Heart", "Thigh muscle"],
      ["How many chambers does the human heart have?", "4", "2", "3", "5"],
      ["Which sense is the nose responsible for?", "Smell", "Taste", "Touch", "Balance"],
      ["What percentage of the human body is water, roughly?", "60%", "40%", "75%", "50%"],
      ["Which part of the eye gives it its color?", "Iris", "Lens", "Pupil", "Retina"]
    ],
    inventions: [
      ["Who is credited with inventing the telephone?", "Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Samuel Morse"],
      ["The first airplane flight was made by…", "The Wright brothers", "Charles Lindbergh", "Amelia Earhart", "Otto Lilienthal"],
      ["Who invented the light bulb (practical version)?", "Thomas Edison", "Benjamin Franklin", "James Watt", "Michael Faraday"],
      ["The World Wide Web was invented by…", "Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Alan Turing"],
      ["Penicillin, the first antibiotic, was discovered by…", "Alexander Fleming", "Louis Pasteur", "Marie Curie", "Joseph Lister"],
      ["Which invention came first?", "The wheel", "The compass", "Gunpowder", "Paper"],
      ["The steam engine was greatly improved by…", "James Watt", "George Stephenson", "Robert Fulton", "Henry Ford"],
      ["Who built the first successful printing press in Europe?", "Johannes Gutenberg", "Leonardo da Vinci", "Isaac Newton", "Galileo"],
      ["Radio waves were first demonstrated by experiments of…", "Heinrich Hertz", "Guglielmo Marconi", "Nikola Tesla", "Edison"],
      ["The first computer programmer is considered to be…", "Ada Lovelace", "Charles Babbage", "Alan Turing", "John von Neumann"]
    ],
    spelling: [
      ["Which is the correct spelling?", "Necessary", "Neccessary", "Necesary", "Neccesary"],
      ["Which is the correct spelling?", "Accommodation", "Accomodation", "Acommodation", "Accommodasion"],
      ["Which is the correct spelling?", "Beautiful", "Beautifull", "Beutiful", "Beautifel"],
      ["Which is the correct spelling?", "Tomorrow", "Tommorrow", "Tomorow", "Tommorow"],
      ["Which is the correct spelling?", "Definitely", "Definately", "Definitly", "Definitley"],
      ["Which is the correct spelling?", "Environment", "Enviroment", "Envirnoment", "Environmant"],
      ["Which is the correct spelling?", "Occasion", "Ocassion", "Occassion", "Ocasion"],
      ["Which is the correct spelling?", "Restaurant", "Resturant", "Restaurent", "Restarant"],
      ["Which is the correct spelling?", "February", "Febuary", "Februery", "Februray"],
      ["Which is the correct spelling?", "Knowledge", "Knowlege", "Knolwedge", "Knowledg"],
      ["Which is the correct spelling?", "Separation", "Seperation", "Separasion", "Sepparation"],
      ["Which is the correct spelling?", "Pronunciation", "Pronounciation", "Pronunciacion", "Pronnunciation"]
    ],
    synonyms: [
      ["Which word means the same as HAPPY?", "Joyful", "Angry", "Tired", "Silent"],
      ["Which word means the same as RAPID?", "Swift", "Slow", "Calm", "Weak"],
      ["Which word means the same as BRAVE?", "Courageous", "Afraid", "Shy", "Careless"],
      ["Which word means the same as ANCIENT?", "Very old", "Brand new", "Modern", "Recent"],
      ["Which word means the same as GENEROUS?", "Giving", "Greedy", "Selfish", "Stingy"],
      ["Which word means the same as DIFFICULT?", "Challenging", "Simple", "Easy", "Plain"],
      ["Which word means the same as SILENT?", "Quiet", "Loud", "Noisy", "Busy"],
      ["Which word means the same as WEALTHY?", "Rich", "Poor", "Needy", "Broke"],
      ["Which word means the same as CURIOUS?", "Inquisitive", "Bored", "Lazy", "Calm"],
      ["Which word means the same as VICTORY?", "Triumph", "Defeat", "Loss", "Surrender"]
    ],
    antonyms: [
      ["What is the opposite of ANCIENT?", "Modern", "Old", "Antique", "Historic"],
      ["What is the opposite of GENEROUS?", "Stingy", "Kind", "Giving", "Helpful"],
      ["What is the opposite of VICTORY?", "Defeat", "Win", "Success", "Triumph"],
      ["What is the opposite of ARRIVE?", "Depart", "Reach", "Come", "Enter"],
      ["What is the opposite of EXPAND?", "Shrink", "Grow", "Stretch", "Widen"],
      ["What is the opposite of BRAVE?", "Cowardly", "Bold", "Heroic", "Daring"],
      ["What is the opposite of PERMANENT?", "Temporary", "Eternal", "Lasting", "Fixed"],
      ["What is the opposite of SCARCE?", "Plentiful", "Rare", "Few", "Limited"],
      ["What is the opposite of TRANSPARENT?", "Opaque", "Clear", "Glassy", "Open"],
      ["What is the opposite of COMPLEX?", "Simple", "Hard", "Tricky", "Deep"]
    ],
    proverbs: [
      ["Complete the proverb: 'A stitch in time saves…'", "Nine", "Time", "Thread", "Money"],
      ["Complete the proverb: 'Actions speak louder than…'", "Words", "Voices", "Promises", "Thoughts"],
      ["Complete the proverb: 'Don't count your chickens before they…'", "Hatch", "Grow", "Fly", "Sleep"],
      ["Complete the proverb: 'The early bird catches the…'", "Worm", "Sun", "Train", "Fish"],
      ["Complete the proverb: 'Honesty is the best…'", "Policy", "Habit", "Gift", "Rule"],
      ["Complete the proverb: 'A picture is worth a thousand…'", "Words", "Coins", "Stories", "Dreams"],
      ["Complete the proverb: 'Practice makes…'", "Perfect", "Progress", "Patience", "Pride"],
      ["Complete the proverb: 'Two heads are better than…'", "One", "None", "Three", "Two hands"],
      ["Complete the proverb: 'Where there is a will, there is a…'", "Way", "Road", "Reason", "Winner"],
      ["Complete the proverb: 'Better late than…'", "Never", "Early", "Sorry", "Lost"]
    ],
    missingletter: [
      ["Fill the gap: B_TTERFLY", "U", "A", "E", "O"],
      ["Fill the gap: ELEPH_NT", "A", "E", "I", "U"],
      ["Fill the gap: RAINB_W", "O", "A", "U", "E"],
      ["Fill the gap: MOUNT_IN", "A", "E", "O", "U"],
      ["Fill the gap: CH_COLATE", "O", "A", "E", "U"],
      ["Fill the gap: DOLPH_N", "I", "A", "E", "O"],
      ["Fill the gap: KANGAR_O", "O", "U", "A", "E"],
      ["Fill the gap: PINEAP_LE", "P", "B", "M", "N"],
      ["Fill the gap: CROC_DILE", "O", "A", "E", "U"],
      ["Fill the gap: HAMBUR_ER", "G", "K", "D", "B"]
    ]
  };


  /* ---------- Word lists ---------- */
  var WORDS_EASY = ["APPLE","HOUSE","WATER","MUSIC","HAPPY","RIVER","TIGER","LEMON","PIZZA","CHAIR","CLOUD","BREAD","LIGHT","OCEAN","SMART"];
  var WORDS_MED = ["GARDEN","ROCKET","PLANET","BRIDGE","MARKET","SILVER","WINDOW","JUNGLE","PUZZLE","CASTLE","TRAVEL","DOCTOR","FALCON","BANANA","ORANGE"];
  var WORDS_HARD = ["DIAMOND","PYRAMID","VOLCANO","DOLPHIN","JOURNEY","MYSTERY","CAPTAIN","FORTUNE","HARVEST","LANTERN","PENGUIN","RAINBOW","SAPPHIRE","THUNDER","VOYAGE"];
  var WORDS_ALL = WORDS_EASY.concat(WORDS_MED, WORDS_HARD);
  var SEARCH_SETS = [
    ["CAT","DOG","SUN","SKY","EGG","ANT"],
    ["FISH","LION","BEAR","WOLF","CAKE","STAR"],
    ["TIGER","ZEBRA","HORSE","CAMEL","MANGO","LEMON"],
    ["ROCKET","PLANET","METEOR","GALAXY","COSMOS","ASTRAL"],
    ["DOCTOR","FARMER","SINGER","PAINTER","DRIVER","COACH"],
    ["DIAMOND","EMERALD","SAPPHIRE","CRYSTAL","GOLDEN","SILVER"]
  ];
  var TYPE_WORDS = ["quick","jump","river","stone","light","brave","cloud","tiger","music","happy","smart","swift","golden","planet","rocket","meadow","harbor","velvet","safari","candle","bridge","falcon","jungle","market","travel"];

  /* ---------- Generated question makers (math + patterns) ---------- */
  function qz(q, a, wrongs){ return [q, a].concat(wrongs); }
  function genQuickMath(lvl){
    var out = [], seen = {};
    var maxN = 8 + lvl * 4, tries = 0;
    while(out.length < 10 && tries++ < 300){
      var kind = rnd(4), a = 2 + rnd(maxN), b = 2 + rnd(maxN), q, ans;
      if(kind === 0){ q = a + " + " + b + " = ?"; ans = a + b; }
      else if(kind === 1){ if(b > a){ var t = a; a = b; b = t; } q = a + " − " + b + " = ?"; ans = a - b; }
      else if(kind === 2){ a = 2 + rnd(Math.min(12, 4 + lvl)); b = 2 + rnd(9); q = a + " × " + b + " = ?"; ans = a * b; }
      else { b = 2 + rnd(9); ans = 2 + rnd(12); a = b * ans; q = a + " ÷ " + b + " = ?"; }
      if(seen[q]) continue; seen[q] = 1;
      var w = shuffleCopy([ans + 1, ans - 1, ans + 2 + rnd(3), ans - 2 - rnd(2)].filter(function(x){ return x !== ans; })).slice(0, 3);
      while(w.length < 3) w.push(ans + w.length + 3);
      out.push(qz(q, "" + ans, w.map(String)));
    }
    return out;
  }
  function genTables(lvl){
    var base = Math.min(12, 2 + lvl), out = [], seen = {};
    var tries = 0;
    while(out.length < 10 && tries++ < 300){
      var a = 2 + rnd(base), b = 2 + rnd(12), q = a + " × " + b + " = ?", ans = a * b;
      if(seen[q]) continue; seen[q] = 1;
      out.push(qz(q, "" + ans, ["" + (ans + a), "" + (ans - b), "" + (ans + 10)]));
    }
    return out;
  }
  function genBonds(lvl){
    var out = [], tries = 0;
    var totals = [10, 20, 50, 100, 200, 500, 1000];
    while(out.length < 10 && tries++ < 300){
      var total = totals[Math.min(totals.length - 1, Math.floor((lvl - 1 + rnd(2))))] || 100;
      var a = 1 + rnd(total - 1), ans = total - a;
      out.push(qz(a + " + ? = " + total, "" + ans, ["" + (ans + 1), "" + (ans - 2 > 0 ? ans - 2 : ans + 3), "" + (ans + 10)]));
    }
    return out;
  }
  function genSequences(lvl){
    var out = [], tries = 0;
    while(out.length < 10 && tries++ < 300){
      var kind = rnd(4), s = 1 + rnd(9), seq = [], q, ans;
      if(kind === 0){ var d = 2 + rnd(3 + lvl); for(var i = 0; i < 4; i++) seq.push(s + i * d); ans = s + 4 * d; q = seq.join(", ") + ", ?"; }
      else if(kind === 1){ var r = 2; seq = [s]; for(var i2 = 1; i2 < 4; i2++) seq.push(seq[i2 - 1] * r); ans = seq[3] * r; q = seq.join(", ") + ", ?"; }
      else if(kind === 2){ seq = [s, s + 1]; for(var i3 = 2; i3 < 4; i3++) seq.push(seq[i3 - 1] + seq[i3 - 2]); ans = seq[3] + seq[2]; q = seq.join(", ") + ", ?"; }
      else { var sq = 1 + rnd(4); seq = []; for(var i4 = 0; i4 < 4; i4++) seq.push((sq + i4) * (sq + i4)); ans = (sq + 4) * (sq + 4); q = seq.join(", ") + ", ?"; }
      out.push(qz("What comes next? " + q, "" + ans, ["" + (ans + 1), "" + (ans - 1), "" + (ans + 3)]));
    }
    return out;
  }
  var SHAPE_SETS = [["●","■","▲","◆"],["★","♥","⬟","⬢"],["☀","☾","✿","♞"]];
  function genPatterns(lvl){
    var set = pick(SHAPE_SETS), out = [], tries = 0;
    while(out.length < 10 && tries++ < 200){
      var a = pick(set), b = pick(set.filter(function(x){ return x !== a; }));
      var pat = [a, b, a, b], ans = a, q = pat.join(" ") + " ?";
      if(lvl >= 3){ var c = pick(set.filter(function(x){ return x !== a && x !== b; })); pat = [a, b, c, a, b]; ans = c; q = pat.join(" ") + " ?"; }
      out.push(qz("Which shape completes the pattern?  " + q, ans, set.filter(function(x){ return x !== ans; }).slice(0, 3)));
    }
    return out;
  }
  var QUIZ_GENS = { quickmath: genQuickMath, tables: genTables, bonds: genBonds, sequences: genSequences, patterns: genPatterns };

  /* ---------- The 90 new games ---------- */
  function NG(o){
    return { id:o.id, name:o.name, cat:o.cat, img:svgArt(o.id, o.g, o.c1, o.c2), desc:o.desc,
      plays:0, likes:0, trend:o.trend || 85, added:0, isNew:true, eng:o.eng, bank:o.bank || null, gen:o.gen || null,
      levels:!!o.levels, theme:o.theme || null, steps:o.steps };
  }
  var NEW_GAMES = [
    NG({id:"slide", name:"Slide Puzzle", cat:"Puzzle • Tiles", g:"🧩", c1:"#7C4DBD", c2:"#4A2A7A", eng:"slide", levels:true, trend:93,
      desc:"A classic sliding-tile puzzle with glossy numbered tiles. Slide the tiles into order — higher levels grow the board from 3×3 up to 5×5.",
      steps:["Press PLAY — the tiles are shuffled but always solvable.","Tap a tile next to the empty space to slide it.","Put every number in order, left to right, top to bottom.","Finish inside the move target to clear the level and unlock the next one."]}),
    NG({id:"lightsout", name:"Lights Out", cat:"Puzzle • Logic", g:"💡", c1:"#3A3F66", c2:"#14142B", eng:"lights", levels:true, trend:88,
      desc:"A grid of glowing lamps. Tapping one lamp toggles its neighbours too — switch every lamp off to clear the level. Simple to start, devilish to master.",
      steps:["Press PLAY — some lamps are lit.","Tap a lamp to toggle it and its up/down/left/right neighbours.","Turn ALL lamps off to clear the level.","Higher levels start with trickier patterns."]}),
    NG({id:"hanoi", name:"Tower of Hanoi", cat:"Puzzle • Classic", g:"🗼", c1:"#B06A2C", c2:"#6E3F14", eng:"hanoi", levels:true, trend:86,
      desc:"The ancient tower puzzle. Move the whole stack of polished disks to another peg — a bigger disk may never sit on a smaller one. More disks every level.",
      steps:["Press PLAY — the disks start stacked on the left peg.","Tap a peg to pick up its top disk, then tap another peg to drop it.","Never place a bigger disk on a smaller one.","Move the full stack to any other peg, in as few moves as you can."]}),
    NG({id:"codebreaker", name:"Code Breaker", cat:"Puzzle • Deduction", g:"🔐", c1:"#20504A", c2:"#0C2B27", eng:"mastermind", levels:true, trend:90,
      desc:"Crack the secret color code. Every guess earns clues: black pegs for the right color in the right place, white for the right color in the wrong place.",
      steps:["Press PLAY — a secret code is hidden.","Tap colors to fill a guess row, then tap Check.","Black clue = right color, right place. White clue = right color, wrong place.","Crack the code within the tries limit. Higher levels use longer codes."]}),
    NG({id:"flood", name:"Color Flood", cat:"Puzzle • Colors", g:"🌈", c1:"#0E7C86", c2:"#0A4A56", eng:"flood", levels:true, trend:89,
      desc:"Flood the whole board with one color, starting from the top-left corner. Every tap spreads your color into matching neighbours — plan the order carefully, moves are limited!",
      steps:["Press PLAY — your flood starts at the top-left corner.","Tap a color button: your area changes to that color and swallows matching neighbours.","Make the ENTIRE board one color before the moves run out.","Higher levels mean bigger boards and tighter move limits."]}),
    NG({id:"sudoku", name:"Sudoku Mini", cat:"Puzzle • Numbers", g:"🔢", c1:"#2E5CA6", c2:"#16294D", eng:"sudoku", levels:true, trend:92,
      desc:"Real Sudoku, sized for quick sessions. Early levels are friendly 4×4 grids; later levels grow to full 6×6 with fewer given numbers.",
      steps:["Press PLAY — some numbers are already placed.","Tap an empty cell, then tap a number to fill it.","Each row, column and box must contain every number exactly once.","Fill the whole grid correctly to clear the level."]}),
    NG({id:"magicsquare", name:"Magic Square", cat:"Puzzle • Numbers", g:"✨", c1:"#8A5A00", c2:"#4A3200", eng:"magic", levels:true, trend:84,
      desc:"Arrange the numbers 1 to 9 so that every row, column and diagonal adds up to the same magic total. One elegant solution — can you find it?",
      steps:["Press PLAY — some numbers are already placed.","Tap a number tile, then tap an empty cell to place it. Tap a placed number to pick it back up.","Every row, column and diagonal must reach the magic total shown.","Complete the square to clear the level — later levels give you fewer numbers."]}),
    NG({id:"binary", name:"Binary Puzzle", cat:"Puzzle • Logic", g:"🔟", c1:"#37474F", c2:"#141C20", eng:"binary", levels:true, trend:83,
      desc:"A pure-logic grid puzzle. Fill every cell with 0 or 1: no more than two of the same digit may touch, and every row and column needs equal zeros and ones.",
      steps:["Press PLAY — some digits are already fixed.","Tap an empty cell to cycle it: blank → 0 → 1 → blank.","Never allow three of the same digit in a row or column.","Every row and column must end with equal 0s and 1s. Fill the board to win."]}),
    NG({id:"wordsearch", name:"Word Search", cat:"Puzzle • Words", g:"🔍", c1:"#33691E", c2:"#1B380F", eng:"wordsearch", levels:true, trend:91,
      desc:"Hunt the hidden words in a letter grid. Words hide across and down — tap the letters of a word in order to catch it. Bigger grids and longer words every level.",
      steps:["Press PLAY — the word list shows what to find.","Scan the grid: words run left-to-right or top-to-bottom.","Tap the letters of a word one by one, in order.","Find every word to clear the level."]}),
    NG({id:"scramble", name:"Word Scramble", cat:"Puzzle • Words", g:"🔀", c1:"#AD1457", c2:"#5E0B30", eng:"scramble", levels:true, trend:90,
      desc:"The letters are shuffled — your brain has to unshuffle them. Tap letters in the right order to rebuild the word before your lives run out.",
      steps:["Press PLAY — a word's letters are mixed up.","Tap the letter tiles in the correct order to rebuild the word.","A wrong letter costs a heart. Use the hint if you are stuck.","Solve the word to advance — words get longer every level."]}),
    NG({id:"patterniq", name:"Pattern IQ", cat:"Puzzle • Logic", g:"🧠", c1:"#5E35B1", c2:"#2A1650", eng:"quiz", gen:"patterns", levels:true, trend:87,
      desc:"Spot the rule in the shape pattern and pick what comes next. Patterns grow sneakier with every level — a real brain-teaser workout.",
      steps:["Press PLAY — a shape pattern appears with one missing piece.","Study the pattern and find its rule.","Tap the shape that completes it.","Score enough correct answers to clear the level."]}),
    NG({id:"oddone", name:"Odd One Out", cat:"Puzzle • Focus", g:"👀", c1:"#00838F", c2:"#00454C", eng:"gridfind", theme:"odd", levels:true, trend:94,
      desc:"A grid of near-identical tiles — and one of them is different. Find it fast! Higher levels make the difference smaller and the grid bigger.",
      steps:["Press PLAY — a grid of tiles appears.","One tile is different from all the others — tap it.","Wrong taps cost time. The clock is always running.","Clear rounds to level up: bigger grids, sneakier differences."]}),
    NG({id:"riddles", name:"Riddle Master", cat:"Puzzle • Logic", g:"🗝️", c1:"#6A1B9A", c2:"#38094F", eng:"quiz", bank:"riddles", trend:88,
      desc:"Classic riddles with tricky answers. Read carefully — the answer is usually hiding in the words themselves.",
      steps:["Press PLAY — a riddle appears.","Think sideways: the answer loves wordplay.","Tap the answer you believe is right.","Answer 10 riddles and see your final score."]}),
    NG({id:"balloons", name:"Balloon Pop", cat:"Arcade • Reflex", g:"🎈", c1:"#C2185B", c2:"#6D0F33", eng:"tap", theme:"rise", levels:true, trend:95,
      desc:"Balloons float up past you — pop them before they escape! Golden balloons are worth big points, but the spiky black ones cost you. Reach the target score to level up.",
      steps:["Press PLAY, then tap Start.","Tap balloons to pop them before they float away.","Golden balloons = +5. Avoid the black spiky ones — they cost points.","Reach the level target before the timer ends."]}),
    NG({id:"fruitslice", name:"Fruit Slice", cat:"Arcade • Action", g:"🍉", c1:"#2E7D32", c2:"#123F16", eng:"tap", theme:"fall", levels:true, trend:93,
      desc:"Fruit rains down — tap to slice it mid-air! Slice the fruit for points, but never touch a bomb: one bomb and you lose a life.",
      steps:["Press PLAY, then tap Start.","Tap falling fruit to slice it and score.","Do NOT tap the bombs — each one costs a life.","Reach the level target before time runs out. You have 3 lives."]}),
    NG({id:"monsters", name:"Monster Defense", cat:"Arcade • Defense", g:"👾", c1:"#4527A0", c2:"#1E1046", eng:"tap", theme:"approach", levels:true, trend:92,
      desc:"Waves of monsters march on your castle. Tap them to zap them before they reach the gate — if three get through, the castle falls!",
      steps:["Press PLAY, then tap Start — the wave begins.","Tap monsters to zap them before they reach your castle.","Bigger monsters may need two taps. Fast ones are worth more.","Survive the wave to level up. Three monsters through = game over."]}),
    NG({id:"targets", name:"Target Range", cat:"Arcade • Aim", g:"🎯", c1:"#BF360C", c2:"#571803", eng:"tap", theme:"range", trend:89,
      desc:"Targets slide across the range at different speeds. Bullseyes pay the most — you have 45 seconds to post your best score.",
      steps:["Press PLAY, then tap Start.","Targets glide across — tap them to score.","Small fast targets are worth the most points.","When the 45 seconds end, your score is final. Beat your best!"]}),
    NG({id:"fruitcatch", name:"Fruit Catch", cat:"Arcade • Catch", g:"🧺", c1:"#EF6C00", c2:"#7A3600", eng:"catch", theme:"fruit", levels:true, trend:91,
      desc:"Move the basket to catch the falling fruit. Catch fruit for points, dodge the rotten bombs — three misses and the harvest is over.",
      steps:["Press PLAY, then tap Start.","Drag (or use the ◀ ▶ buttons) to move the basket.","Catch fruit to score. Bombs cost a life — let them fall!","Reach the level target to advance. Three misses ends the game."]}),
    NG({id:"coincatch", name:"Coin Catch", cat:"Arcade • Catch", g:"🪙", c1:"#F9A825", c2:"#8A5D00", eng:"catch", theme:"coin", trend:88,
      desc:"Coins shower from the sky! Catch them in your chest — but heavy stones fall too, and catching one cracks the chest. 45 seconds, best score wins.",
      steps:["Press PLAY, then tap Start.","Drag to move the treasure chest under the falling coins.","Catch coins for points — gold coins are worth 5.","Never catch a stone: it costs a life. Three stones and it's over."]}),
    NG({id:"trafficdodge", name:"Traffic Dodge", cat:"Arcade • Driving", g:"🚗", c1:"#1565C0", c2:"#0A2F5C", eng:"dodge", theme:"car", levels:true, trend:96,
      desc:"Weave through highway traffic in your sports car. Every level the road gets faster and busier — survive the distance to clear it!",
      steps:["Press PLAY, then tap Start.","Tap the ◀ ▶ sides (or drag) to switch lanes.","Dodge every car — one crash ends the run.","Survive to the finish distance to clear the level."]}),
    NG({id:"meteordodge", name:"Meteor Dodge", cat:"Arcade • Space", g:"🚀", c1:"#283593", c2:"#0D1130", eng:"dodge", theme:"space", levels:true, trend:90,
      desc:"Pilot your starship through a meteor storm. Slip between the rocks, grab the energy stars, and fly the distance to clear each level.",
      steps:["Press PLAY, then tap Start.","Tap the ◀ ▶ sides (or drag) to steer your ship.","Meteors end the flight — stars give bonus points.","Reach the finish distance to clear the level."]}),
    NG({id:"coinrunner", name:"Coin Runner", cat:"Arcade • Runner", g:"🏃", c1:"#00838F", c2:"#003F45", eng:"runner", theme:"runner", levels:true, trend:94,
      desc:"Sprint, jump the barriers and grab the coins! One tap jumps, a double-tap jumps higher. Clear the distance to level up.",
      steps:["Press PLAY, then tap Start.","Tap (or press the Jump button) to leap over barriers.","Coins add bonus points — barriers end the run if you hit one.","Reach the finish distance to clear the level."]}),
    NG({id:"motodash", name:"Moto Dash", cat:"Arcade • Runner", g:"🏍️", c1:"#4E342E", c2:"#1F130E", eng:"runner", theme:"bike", trend:89,
      desc:"Throttle up and leap the road blocks on your motorbike. Time your jumps at speed — the course only gets faster.",
      steps:["Press PLAY, then tap Start.","Tap to jump the barriers and crates.","Land clean — crashing ends the ride.","Score by distance and clean jumps. Beat your best!"]}),
    NG({id:"stacktower", name:"Stack Tower", cat:"Arcade • Timing", g:"🏗️", c1:"#00695C", c2:"#00332C", eng:"stack", trend:92,
      desc:"Blocks slide back and forth — tap to drop them onto the tower. Whatever hangs over the edge falls off, so the tower gets thinner… how high can you build?",
      steps:["Press PLAY, then tap Start.","A block slides across the top — tap Drop to place it.","Only the part resting on the tower stays; the rest falls away.","Stack as high as you can. A complete miss ends the game."]}),
    NG({id:"paddlebounce", name:"Paddle Bounce", cat:"Arcade • Reflex", g:"🏓", c1:"#6D4C41", c2:"#2C1B12", eng:"bounce", trend:87,
      desc:"Keep the ball bouncing on your paddle for as long as you can. Every bounce is a point, and the ball keeps getting quicker…",
      steps:["Press PLAY, then tap Start.","Move the paddle by dragging, or with the ◀ ▶ buttons.","Bounce the ball on the paddle — every bounce is +1.","Let it fall past the paddle and the game ends."]}),
    NG({id:"wallpong", name:"Wall Pong", cat:"Arcade • Reflex", g:"🧱", c1:"#546E7A", c2:"#243238", eng:"pong", theme:"solo", trend:85,
      desc:"Solo pong against the wall. Deflect the ball with your paddle and rack up hits — the rally speeds up the longer you survive.",
      steps:["Press PLAY, then tap Start.","Drag the paddle up and down to meet the ball.","Every wall rally you return is a point.","Miss the ball and the game ends."]}),
    NG({id:"archery", name:"Archery Master", cat:"Action • Aim", g:"🏹", c1:"#33691E", c2:"#16290B", eng:"shot", theme:"archery", levels:true, trend:93,
      desc:"Ten arrows, one target, and a mischievous wind. Stop the drifting aim, judge the wind, and loose! Higher levels shoot from farther away.",
      steps:["Press PLAY — your aim drifts across the target.","Watch the wind flag: wind pushes your arrow sideways.","Tap Shoot when the aim sits where you want the arrow to land.","Score 10 arrows. Reach the target score to clear the level."]}),
    NG({id:"tankbattle", name:"Tank Battle", cat:"Action • Aim", g:"🎖️", c1:"#4E5D3A", c2:"#232B16", eng:"shot", theme:"tank", levels:true, trend:90,
      desc:"Set your barrel angle, charge your power, and shell the enemy position across the ridge. Wind and distance change every level.",
      steps:["Press PLAY — set the angle with the slider.","Hold and release the power meter, or tap Fire at the right charge.","Watch where the shell lands and adjust.","Destroy the target within your shells to clear the level."]}),
    NG({id:"bomberrun", name:"Bomber Run", cat:"Action • Timing", g:"✈️", c1:"#0277BD", c2:"#013A5C", eng:"shot", theme:"bomber", levels:true, trend:86,
      desc:"Your plane crosses the sky at speed. Drop your bombs at the perfect moment to hit the targets below — too early or too late and they whistle past.",
      steps:["Press PLAY — the plane flies across automatically.","Tap DROP as you pass over a target.","The bomb keeps the plane's speed — lead your target a little.","Hit enough targets to clear the level. Targets shrink as you advance."]}),
    NG({id:"copter", name:"Copter Rescue", cat:"Action • Flying", g:"🚁", c1:"#00838F", c2:"#00454C", eng:"copter", trend:88,
      desc:"Hold to climb, release to sink. Thread your helicopter through the canyon gates without clipping a single wall.",
      steps:["Press PLAY, then hold anywhere to climb and release to descend.","Fly through the gaps in the canyon walls.","Every gate passed is a point.","One touch on a wall ends the flight."]}),
    NG({id:"sharpshooter", name:"Sharpshooter", cat:"Action • Aim", g:"🔭", c1:"#37474F", c2:"#131A1E", eng:"tap", theme:"snipe", trend:87,
      desc:"Small, fast targets flash across the ridge — you have a marksman's 45 seconds. Precision pays: tiny targets, big points.",
      steps:["Press PLAY, then tap Start.","Targets appear briefly at random spots — tap them fast.","Smaller targets are worth more points.","When time ends, your score is final."]}),
    NG({id:"parachute", name:"Parachute Drop", cat:"Action • Timing", g:"🪂", c1:"#5E35B1", c2:"#241243", eng:"shot", theme:"chute", levels:true, trend:85,
      desc:"You are falling — the wind is pushing you sideways and the landing pad is small. Choose the perfect moment to open your parachute and drift down onto the pad.",
      steps:["Press PLAY — you fall and drift with the wind.","Tap OPEN CHUTE at the right moment to slow down and steer with ◀ ▶.","Land on the pad: the closer to the center, the more points.","Missing the pad ends the jump. Pads shrink every level."]}),
    NG({id:"boxingreflex", name:"Boxing Reflex", cat:"Action • Reflex", g:"🥊", c1:"#B71C1C", c2:"#4A0A0A", eng:"gridfind", theme:"pads", trend:89,
      desc:"Training pads light up around the ring — strike them the instant they flash! 30 seconds of pure reflexes.",
      steps:["Press PLAY, then tap Start.","A pad lights up — tap it as fast as you can.","A new pad lights the moment you strike.","Score as many strikes as you can in 30 seconds."]}),
    NG({id:"rocketland", name:"Rocket Landing", cat:"Action • Flying", g:"🌙", c1:"#283593", c2:"#0B0F2E", eng:"shot", theme:"lander", levels:true, trend:91,
      desc:"Land the rocket on the moon pad — gently! Hold thrust to slow your fall, watch your speed, and touch down soft enough to walk away.",
      steps:["Press PLAY — the rocket falls toward the pad.","Hold the THRUST button to slow your descent. Release to fall faster.","Touch down slower than the safe speed shown, on the pad, to land.","Too fast — or missing the pad — ends the mission. Land to clear the level."]}),
    NG({id:"connectfour", name:"Connect Four", cat:"Board • Strategy", g:"🔴", c1:"#F9A825", c2:"#8A5D00", eng:"connect4", trend:94,
      desc:"Drop your discs into the columns and connect four in a row — across, down or diagonally — before the computer does. It blocks, it plans… outsmart it!",
      steps:["Press PLAY — you are Red and you drop first.","Tap a column to drop your disc into it.","The computer answers with a Yellow disc.","Connect 4 of your discs in a line to win the game."]}),
    NG({id:"reversi", name:"Reversi", cat:"Board • Strategy", g:"⚫", c1:"#00695C", c2:"#002E28", eng:"reversi", trend:88,
      desc:"Trap the computer's discs between yours to flip them to your color. The board flips fast — whoever holds the most discs at the end wins.",
      steps:["Press PLAY — you play Black.","Tap a highlighted square to place a disc and flip the trapped white discs.","A move must trap at least one enemy disc in a line.","When no moves remain, the player with more discs wins."]}),
    NG({id:"dotsboxes", name:"Dots & Boxes", cat:"Board • Classic", g:"🔲", c1:"#5D4037", c2:"#241511", eng:"dots", trend:86,
      desc:"The pencil-and-paper classic. Draw lines between the dots; complete a box to claim it and take another turn. Most boxes wins!",
      steps:["Press PLAY — tap a gap between two dots to draw a line.","Complete the fourth side of a box to claim it — and draw again.","The computer plays carefully. Don't hand it free boxes!","When the grid is full, the player with more boxes wins."]}),
    NG({id:"seabattle", name:"Sea Battle", cat:"Board • Strategy", g:"🚢", c1:"#01579B", c2:"#00263F", eng:"ship", trend:91,
      desc:"Three enemy ships hide on the grid. Fire a shot each turn, read the splashes, and sink the fleet before your shots run out!",
      steps:["Press PLAY — the enemy fleet is hidden on the grid.","Tap a square to fire at it.","A splash means a miss; a flame means a hit. Sink every ship section.","Sink all 3 ships before your shots run out to win."]}),
    NG({id:"snakesladders", name:"Snakes & Ladders", cat:"Board • Family", g:"🐍", c1:"#43A047", c2:"#1C471E", eng:"snakes", trend:90,
      desc:"The family classic, you against the computer. Climb the ladders, dodge the snakes' mouths, and be the first to reach square 100!",
      steps:["Press PLAY, then tap Roll on your turn.","Move forward by the dice number.","Land at a ladder's foot to climb; land on a snake's head to slide down!","First to square 100 wins the game."]}),
    NG({id:"checkers", name:"Checkers", cat:"Board • Classic", g:"♟️", c1:"#6D4C41", c2:"#2A1A12", eng:"draughts", trend:89,
      desc:"Real checkers against the computer: move diagonally, jump to capture, and reach the far side to crown a king that moves both ways.",
      steps:["Press PLAY — you play the red pieces at the bottom.","Tap one of your pieces, then tap a highlighted square to move.","Jump over a blue piece into an empty square to capture it.","Reach the far row to become a king. Capture all blue pieces — or block them — to win."]}),
    NG({id:"rps", name:"Rock Paper Scissors", cat:"Board • Classic", g:"✊", c1:"#00838F", c2:"#003B40", eng:"rps", trend:85,
      desc:"The hand-game duel against the computer. Rock crushes scissors, scissors cut paper, paper wraps rock. First to 10 points takes the match!",
      steps:["Press PLAY — pick Rock, Paper or Scissors.","The computer picks at the same moment.","Win the throw to score a point. Draws score nothing.","First to 10 points wins the match."]}),
    NG({id:"cardwar", name:"Card War", cat:"Board • Cards", g:"🃏", c1:"#AD1457", c2:"#4A0823", eng:"cards", theme:"war", trend:84,
      desc:"Flip a card each round — the higher card takes the point. Aces are high! Twenty rounds decide the war.",
      steps:["Press PLAY, then tap Flip.","Your card and the computer's card are revealed.","The higher card scores a point (Ace is highest).","After 20 rounds, the higher score wins the war."]}),
    NG({id:"twentyone", name:"Twenty-One", cat:"Board • Cards", g:"🎰", c1:"#1B5E20", c2:"#081F09", eng:"cards", theme:"bj", trend:90,
      desc:"Blackjack against the dealer. Draw cards to get close to 21 without going over — the dealer stands on 17. Grow your chip stack!",
      steps:["Press PLAY — you and the dealer get two cards.","Tap Hit for another card, or Stand to keep your total.","Over 21 is a bust and loses. The dealer draws until 17 or more.","Beat the dealer's hand to win chips. You start with 100."]}),
    NG({id:"higherlower", name:"Higher or Lower", cat:"Board • Cards", g:"🔼", c1:"#4527A0", c2:"#180B38", eng:"cards", theme:"hl", levels:true, trend:87,
      desc:"One card is showing — will the next card be higher or lower? Build a streak to clear the level. Aces are high, and a tie breaks your streak!",
      steps:["Press PLAY — a card is face up.","Tap Higher or Lower to guess the next card.","A correct guess grows your streak; a wrong one (or a tie) ends it.","Reach the streak target to clear the level."]}),
    NG({id:"penalty", name:"Penalty Shootout", cat:"Sports • Football", g:"⚽", c1:"#2E7D32", c2:"#0F3312", eng:"penalty", trend:95,
      desc:"Five penalties each, you against the computer keeper — then you swap: save its shots too! Best of five, with sudden death if you're level.",
      steps:["Press PLAY — pick a corner or the center to shoot.","The keeper dives — beat him to score.","Then the computer shoots and YOU pick where to dive.","Score more than the computer after 5 rounds to win. Level scores go to sudden death."]}),
    NG({id:"hoopshots", name:"Hoop Shots", cat:"Sports • Basketball", g:"🏀", c1:"#E65100", c2:"#662200", eng:"shot", theme:"hoops", trend:91,
      desc:"Sixty seconds of shooting. Stop the moving aim, charge the power bar into the sweet zone, and swish! Streaks earn bonus points.",
      steps:["Press PLAY — the aim sways over the hoop.","Tap once to lock the aim, tap again to shoot with the power shown.","Land the power in the green zone while the aim is centered to score.","Score as many baskets as you can in 60 seconds."]}),
    NG({id:"bowling", name:"Bowling Alley", cat:"Sports • Bowling", g:"🎳", c1:"#4A148C", c2:"#1D0636", eng:"shot", theme:"bowling", trend:88,
      desc:"A full 10-frame game. Aim your line, set the power, and knock down as many pins as you can — strikes and spares count double-ish, just like the real thing.",
      steps:["Press PLAY — position your aim along the lane.","Tap Roll when the power meter looks right: too weak and the ball crawls, too wild and it gutters.","Two balls per frame (three in the 10th after a strike or spare).","Your 10-frame total is your score. 300 is perfect — good luck!"]}),
    NG({id:"darts", name:"Darts 301", cat:"Sports • Darts", g:"🎯", c1:"#880E4F", c2:"#38041F", eng:"shot", theme:"darts", trend:87,
      desc:"Start at 301 and count down to exactly zero with 9 darts or fewer. Your aim drifts — time your throw! Overshooting zero busts the turn.",
      steps:["Press PLAY — your score starts at 301.","Your aim drifts over the board. Tap Throw to launch the dart.","The ring you hit sets the points: bullseye 50, inner ring 25, then 20/10/5 zones.","Reach exactly 0 to finish. Going below zero is a bust — those points don't count."]}),
    NG({id:"minigolf", name:"Mini Golf", cat:"Sports • Golf", g:"⛳", c1:"#558B2F", c2:"#223A10", eng:"golf", levels:true, trend:92,
      desc:"Nine holes of mini golf with walls and tricky angles. Set your direction, set your power, and putt the ball home — fewest strokes wins each hole.",
      steps:["Press PLAY — drag the direction arrow (or use ◀ ▶) to aim.","Tap Putt when the power meter shows the strength you want.","The ball bounces off the walls — use them!","Sink the ball to finish the hole. Clear all 9 holes under the stroke limit to win the round."]}),
    NG({id:"cricketsmash", name:"Cricket Smash", cat:"Sports • Cricket", g:"🏏", c1:"#00695C", c2:"#00241E", eng:"timinghit", theme:"cricket", trend:93,
      desc:"Twelve balls, one bat. Watch the ball race in and swing at the perfect moment — time it sweet for a six, mistime it and you're bowled!",
      steps:["Press PLAY — the bowler runs in.","The ball speeds toward you — tap SWING as it reaches the hitting zone.","Perfect timing = 6 runs. Good timing = runs. Too early or late — bowled!","Score as many runs as you can from 12 balls. 3 wickets and the innings ends."]}),
    NG({id:"goalkeeper", name:"Goal Keeper", cat:"Sports • Football", g:"🧤", c1:"#01579B", c2:"#00263F", eng:"timinghit", theme:"keeper", levels:true, trend:90,
      desc:"Shots fly at your goal — dive the right way at the right moment to save them! Shots get faster every level. Concede three and it's over.",
      steps:["Press PLAY — the striker shoots toward a corner or the center.","Tap the LEFT, CENTER or RIGHT dive button as the ball comes.","Dive the same way as the shot to save it.","Save enough shots to clear the level — 3 goals conceded ends the game."]}),
    NG({id:"tabletennis", name:"Table Tennis", cat:"Sports • Ping Pong", g:"🏓", c1:"#B71C1C", c2:"#420707", eng:"pong", theme:"cpu", trend:89,
      desc:"Fast paddle pong against the computer. First to 11 points wins the match — and the ball speeds up with every return.",
      steps:["Press PLAY, then tap Start.","Drag your paddle (left side) up and down to return the ball.","Score when the computer misses; you lose the point when you miss.","First to 11 points wins the match."]}),
    NG({id:"dragrace", name:"Drag Race", cat:"Racing • Speed", g:"🏎️", c1:"#C62828", c2:"#4A0D0D", eng:"drag", levels:true, trend:94,
      desc:"Reaction is everything. Launch the instant the light turns green — jump the start and you're disqualified! Then shift gears at the redline to outrun your rival.",
      steps:["Press PLAY — wait for the lights…","Tap LAUNCH the moment the light turns GREEN. Too early = false start, race over.","As the speed bar climbs, tap SHIFT when the needle hits the green zone.","Beat your rival to the finish line to advance a class."]}),
    NG({id:"timetrial", name:"Time Trial", cat:"Racing • Driving", g:"⏱️", c1:"#00695C", c2:"#00261F", eng:"dodge", theme:"f1", levels:true, trend:90,
      desc:"Flat-out circuit driving against the clock. Thread through the field and cross the finish before time runs out — every level is quicker.",
      steps:["Press PLAY, then tap Start.","Steer with the ◀ ▶ sides (or drag) to dodge the other cars.","Every second counts: reach the finish distance before the clock empties.","Crash and you lose precious time — three crashes end the trial."]}),
    NG({id:"derbydash", name:"Derby Dash", cat:"Racing • Horses", g:"🐎", c1:"#795548", c2:"#33231C", eng:"taprace", trend:88,
      desc:"Tap like thunder to gallop your horse down the track! Three rival horses race beside you — first past the post wins the derby.",
      steps:["Press PLAY, then tap Start.","Tap the GALLOP button as fast as you can to speed your horse.","Your rivals gallop on their own — some surge late!","First horse to the finish line wins."]}),
    NG({id:"riverrush", name:"River Rush", cat:"Racing • Boats", g:"🚤", c1:"#0277BD", c2:"#01304D", eng:"dodge", theme:"boat", trend:87,
      desc:"Speedboat slalom! Dodge the rocks and buoys on the river and ride the full course for your best time.",
      steps:["Press PLAY, then tap Start.","Steer with the ◀ ▶ sides (or drag).","Rocks, buoys and logs end your run if you hit them.","Score by distance — how far upriver can you get?"]}),
    NG({id:"simonlights", name:"Simon Lights", cat:"Memory • Classic", g:"🔴", c1:"#283593", c2:"#0C1030", eng:"simon", theme:"color", levels:true, trend:93,
      desc:"Watch the lights, then repeat the sequence. It grows by one every round — how long can your memory hold the chain?",
      steps:["Press PLAY, then tap Start — watch the pads light up.","Repeat the sequence by tapping the pads in the same order.","Each round adds one more step to the sequence.","One wrong pad ends the game. Your level is the longest chain you cleared."]}),
    NG({id:"echotones", name:"Echo Tones", cat:"Memory • Sound", g:"🎵", c1:"#00695C", c2:"#002E27", eng:"simon", theme:"tone", levels:true, trend:86,
      desc:"A musical memory game. Listen to the melody of glowing notes and play it back in the same order — turn your sound on!",
      steps:["Press PLAY, then tap Start — listen to the notes.","Play the melody back by tapping the note pads in order.","Each round adds one more note.","A wrong note ends the song. Sound on for the full experience!"]}),
    NG({id:"shapesequence", name:"Shape Sequence", cat:"Memory • Shapes", g:"🔷", c1:"#AD1457", c2:"#4A0823", eng:"simon", theme:"shape", levels:true, trend:85,
      desc:"Shapes flash in a sequence — circles, stars, hearts, diamonds. Memorize the order and tap it back exactly.",
      steps:["Press PLAY, then tap Start — watch the shapes flash.","Tap the shapes back in exactly the same order.","The chain grows by one shape every round.","One wrong shape ends the game."]}),
    NG({id:"numbermemory", name:"Number Memory", cat:"Memory • Numbers", g:"🔢", c1:"#1565C0", c2:"#082A52", eng:"nummemory", levels:true, trend:91,
      desc:"A number flashes on screen — memorize it, then type it back. Every level adds another digit. How far can your memory stretch?",
      steps:["Press PLAY — a number appears. Memorize it!","When it hides, type the number exactly as shown.","Correct answers add a digit next level.","One wrong digit ends the game."]}),
    NG({id:"positionmemory", name:"Position Memory", cat:"Memory • Focus", g:"🧭", c1:"#EF6C00", c2:"#5C2A00", eng:"posmemory", levels:true, trend:88,
      desc:"Cells flash on the grid one after another. Remember WHERE they lit up, and tap them back in the same order.",
      steps:["Press PLAY, then tap Start — watch the cells flash.","Tap the cells back in the same order they lit.","Each level flashes one more cell.","A wrong cell ends the game."]}),
    NG({id:"pairsblitz", name:"Pairs Blitz", cat:"Memory • Speed", g:"⚡", c1:"#F9A825", c2:"#6E4A00", eng:"pairs", trend:89,
      desc:"Memory Match against the clock! Flip the cards and clear every pair before the 60 seconds run out — fast flips, faster brain.",
      steps:["Press PLAY — the cards are face down and the clock is ticking.","Flip two cards; a matching pair stays open.","Clear all pairs before the timer ends to win.","Run out of time and the blitz is over."]}),
    NG({id:"spotdifference", name:"Spot the Difference", cat:"Memory • Focus", g:"🔎", c1:"#00838F", c2:"#00363B", eng:"gridfind", theme:"diff", levels:true, trend:90,
      desc:"Two grids that look the same… almost. One single tile is different in the second grid. Find it before the clock beats you!",
      steps:["Press PLAY — two grids appear side by side (top and bottom).","Compare them carefully: exactly one tile differs.","Tap the different tile in the lower grid.","Clear rounds to level up — the grids keep growing."]}),
    NG({id:"hangman", name:"Hangman", cat:"Words • Classic", g:"🔤", c1:"#5D4037", c2:"#221310", eng:"hangman", levels:true, trend:92,
      desc:"Guess the hidden word letter by letter. Every wrong letter draws another part of the gallows — solve the word before the drawing is complete!",
      steps:["Press PLAY — a hidden word waits, shown as blanks.","Tap letters to guess. Right letters fill the blanks.","Wrong letters add a stroke to the gallows — you have limited misses.","Complete the word to clear the level. Words grow longer as you advance."]}),
    NG({id:"spellingbee", name:"Spelling Bee", cat:"Words • Spelling", g:"🐝", c1:"#F9A825", c2:"#7A5200", eng:"quiz", bank:"spelling", levels:true, trend:89,
      desc:"Four spellings, only one is correct. Pick the right one — these are the words that trip up everyone!",
      steps:["Press PLAY — four spellings appear.","Tap the one that is spelled correctly.","Score enough correct answers to clear the level.","The words get trickier every level."]}),
    NG({id:"synonyms", name:"Synonym Match", cat:"Words • Vocabulary", g:"📖", c1:"#00695C", c2:"#002E26", eng:"quiz", bank:"synonyms", trend:86,
      desc:"Grow your vocabulary: for each word, pick the word that means the same. Ten rounds, instant answers.",
      steps:["Press PLAY — a word appears with four options.","Tap the word that means the SAME.","Finish 10 rounds and see your score.","Play again to beat your best."]}),
    NG({id:"antonyms", name:"Opposite Words", cat:"Words • Vocabulary", g:"🔄", c1:"#6A1B9A", c2:"#2C0A42", eng:"quiz", bank:"antonyms", trend:85,
      desc:"The opposite game: for each word, choose its exact opposite. Sounds easy — until the sneaky ones arrive.",
      steps:["Press PLAY — a word appears with four options.","Tap the word that means the OPPOSITE.","Finish 10 rounds and see your score.","Fewer mistakes means a better score."]}),
    NG({id:"typingsprint", name:"Typing Sprint", cat:"Words • Typing", g:"⌨️", c1:"#37474F", c2:"#131A1E", eng:"typing", trend:88,
      desc:"Words appear one by one — type each one exactly and tap Enter. Sixty seconds: how many words can your fingers finish?",
      steps:["Press PLAY, then tap Start.","Type the shown word exactly, then press Enter or tap Done.","Each finished word scores; mistakes must be fixed before Enter works.","Your score is words completed in 60 seconds."]}),
    NG({id:"missingletter", name:"Missing Letter", cat:"Words • Spelling", g:"✏️", c1:"#00838F", c2:"#003B40", eng:"quiz", bank:"missingletter", levels:true, trend:84,
      desc:"One letter is missing from each word. Pick the letter that completes it — a spelling workout in disguise.",
      steps:["Press PLAY — a word with a gap appears.","Tap the letter that fills the gap correctly.","Score enough to clear the level.","Words get longer and trickier each level."]}),
    NG({id:"proverbs", name:"Finish the Proverb", cat:"Words • Wisdom", g:"🦉", c1:"#795548", c2:"#2E1D16", eng:"quiz", bank:"proverbs", trend:83,
      desc:"Famous sayings with the last word missing. Complete each proverb correctly — wisdom and vocabulary in one game.",
      steps:["Press PLAY — a proverb appears, missing its final word.","Tap the word that completes it.","Finish 10 proverbs and see your score.","Play again to learn them all."]}),
    NG({id:"quickmath", name:"Quick Math", cat:"Math • Speed", g:"➕", c1:"#2E7D32", c2:"#0F3312", eng:"quiz", gen:"quickmath", levels:true, trend:95,
      desc:"Fast arithmetic against the clock: addition, subtraction, multiplication and division. The numbers grow with every level you clear.",
      steps:["Press PLAY — a sum appears with four answers.","Tap the correct answer before the timer bar empties.","Score enough correct answers to clear the level.","Higher levels mean bigger numbers and less time."]}),
    NG({id:"timestables", name:"Times Tables", cat:"Math • Multiply", g:"✖️", c1:"#1565C0", c2:"#081F42", eng:"quiz", gen:"tables", levels:true, trend:90,
      desc:"Master the multiplication tables one level at a time. Early levels stick to small tables; later levels mix everything up to 12×12.",
      steps:["Press PLAY — a multiplication appears.","Tap the correct product.","Score enough to clear the level and unlock bigger tables.","Wrong answers show the right one — learn as you play."]}),
    NG({id:"numberbonds", name:"Number Bonds", cat:"Math • Numbers", g:"🔗", c1:"#00838F", c2:"#003A40", eng:"quiz", gen:"bonds", levels:true, trend:86,
      desc:"Find the missing partner: every pair of numbers adds up to the target. Bonds to 10, then 100, then 1000 as you level up.",
      steps:["Press PLAY — you see 'A + ? = Target'.","Tap the number that completes the bond.","Score enough to clear the level.","Targets grow: 10 → 20 → 50 → 100 → 1000."]}),
    NG({id:"numbersequences", name:"Number Sequences", cat:"Math • Patterns", g:"📈", c1:"#4527A0", c2:"#180B38", eng:"quiz", gen:"sequences", levels:true, trend:88,
      desc:"What comes next? Number sequences with hidden rules — counting steps, doubling, squares and more. Find the rule, find the number.",
      steps:["Press PLAY — a sequence appears with one number missing.","Work out the rule the sequence follows.","Tap the number that comes next.","Rules get craftier every level."]}),
    NG({id:"truefalse", name:"True or False Math", cat:"Math • Speed", g:"✅", c1:"#2E7D32", c2:"#0C2B0E", eng:"classify", theme:"tf", trend:89,
      desc:"Equations flash up — some are right, some are sneaky-wrong. Tap TRUE or FALSE as fast as you can. 45 seconds, endless equations!",
      steps:["Press PLAY, then tap Start.","An equation appears — decide if it is TRUE or FALSE.","Tap the right button fast; wrong calls cost points.","Your score when the clock ends is final."]}),
    NG({id:"evenodd", name:"Even or Odd Rush", cat:"Math • Speed", g:"🎲", c1:"#6A1B9A", c2:"#2C0A42", eng:"classify", theme:"evenodd", trend:87,
      desc:"Numbers fly at you — is each one EVEN or ODD? Lightning classification with a streak bonus for perfect runs.",
      steps:["Press PLAY, then tap Start.","A number appears — tap EVEN or ODD.","Build a streak: every 5 in a row earns a bonus point.","Three wrong answers end the rush."]}),
    NG({id:"primetime", name:"Prime Time", cat:"Math • Numbers", g:"💎", c1:"#00695C", c2:"#002E26", eng:"classify", theme:"prime", trend:84,
      desc:"Prime or not prime? Judge each number — divisible only by 1 and itself, or not? A sharp test for number brains.",
      steps:["Press PLAY, then tap Start.","A number appears — tap PRIME or NOT PRIME.","Remember: 1 is NOT prime, and even numbers above 2 never are.","Three wrong answers end the game."]}),
    NG({id:"greaterthan", name:"Greater Than", cat:"Math • Compare", g:"⚖️", c1:"#EF6C00", c2:"#5C2A00", eng:"classify", theme:"greater", levels:true, trend:85,
      desc:"Two values appear — tap the bigger one! Whole numbers first, then decimals and fractions as the levels climb.",
      steps:["Press PLAY — two values appear.","Tap the one that is GREATER.","Score enough correct to clear the level.","Decimals and fractions arrive in later levels — compare carefully!"]}),
    NG({id:"worldcapitals", name:"World Capitals", cat:"Knowledge • Geography", g:"🌍", c1:"#0277BD", c2:"#01304D", eng:"quiz", bank:"capitals", levels:true, trend:91,
      desc:"Travel the world from your chair: name the capital city of country after country. Later levels reach the capitals few people know!",
      steps:["Press PLAY — a country appears with four cities.","Tap its capital city.","Score enough correct to clear the level.","Capitals get more obscure every level."]}),
    NG({id:"flagquiz", name:"Flag Quiz", cat:"Knowledge • World", g:"🏳️", c1:"#C62828", c2:"#571010", eng:"quiz", bank:"flags", trend:88,
      desc:"A flag appears — which country does it belong to? Twelve flags, four choices each. How worldly are you?",
      steps:["Press PLAY — a flag appears.","Tap the country it belongs to.","Finish all the flags and see your score.","Play again — the flags shuffle every time."]}),
    NG({id:"animalkingdom", name:"Animal Kingdom", cat:"Knowledge • Animals", g:"🦁", c1:"#558B2F", c2:"#223A10", eng:"quiz", bank:"animals", trend:90,
      desc:"Questions from the wild: fastest runners, strangest bodies, cleverest hunters. Ten animal questions per round.",
      steps:["Press PLAY — an animal question appears.","Tap the correct answer.","Finish 10 questions and see your score.","Every answer teaches a wild fact."]}),
    NG({id:"sciencelab", name:"Science Lab", cat:"Knowledge • Science", g:"🔬", c1:"#00695C", c2:"#002B24", eng:"quiz", bank:"science", levels:true, trend:89,
      desc:"Planets, elements, the human body and everyday physics — a proper science quiz that levels up with you.",
      steps:["Press PLAY — a science question appears.","Tap the correct answer.","Score enough correct to clear the level.","Questions get deeper every level."]}),
    NG({id:"sportstrivia", name:"Sports Trivia", cat:"Knowledge • Sports", g:"🏆", c1:"#EF6C00", c2:"#5C2A00", eng:"quiz", bank:"sportsquiz", trend:87,
      desc:"Football, cricket, the Olympics and more — twelve questions for true sports fans.",
      steps:["Press PLAY — a sports question appears.","Tap the correct answer.","Finish all questions and see your score.","Play again to beat your best."]}),
    NG({id:"historyquest", name:"History Quest", cat:"Knowledge • History", g:"🏛️", c1:"#795548", c2:"#2E1D16", eng:"quiz", bank:"history", trend:86,
      desc:"From the pyramids to the Moon landing — journey through the big moments of history, one question at a time.",
      steps:["Press PLAY — a history question appears.","Tap the correct answer.","Finish all questions and see your score.","Each round shuffles the journey."]}),
    NG({id:"geographyexplorer", name:"Geography Explorer", cat:"Knowledge • Geography", g:"🗺️", c1:"#00838F", c2:"#00363B", eng:"quiz", bank:"geography", levels:true, trend:88,
      desc:"Rivers, mountains, oceans and deserts — explore the planet's extremes in a quiz that gets tougher as you level up.",
      steps:["Press PLAY — a geography question appears.","Tap the correct answer.","Score enough correct to clear the level.","Later levels visit the far corners of the map."]}),
    NG({id:"spacevoyage", name:"Space Voyage", cat:"Knowledge • Space", g:"🪐", c1:"#283593", c2:"#0B0F2E", eng:"quiz", bank:"space", trend:89,
      desc:"Planets, moons, galaxies and the heroes of spaceflight. Ten questions from beyond the sky.",
      steps:["Press PLAY — a space question appears.","Tap the correct answer.","Finish all questions and see your score.","Blast off again to beat your best."]}),
    NG({id:"foodworld", name:"Food World", cat:"Knowledge • Food", g:"🍜", c1:"#D84315", c2:"#571D05", eng:"quiz", bank:"food", trend:84,
      desc:"Dishes, ingredients and food facts from every corner of the world. A quiz that will make you hungry.",
      steps:["Press PLAY — a food question appears.","Tap the correct answer.","Finish all questions and see your score.","Play again — the menu changes every time."]}),
    NG({id:"musicnotes", name:"Music Notes", cat:"Knowledge • Music", g:"🎼", c1:"#6A1B9A", c2:"#2C0A42", eng:"quiz", bank:"music", trend:82,
      desc:"Instruments, composers and musical language — ten questions for music lovers.",
      steps:["Press PLAY — a music question appears.","Tap the correct answer.","Finish all questions and see your score.","Encore? Play again."]}),
    NG({id:"humanbody", name:"Human Body", cat:"Knowledge • Body", g:"🫀", c1:"#AD1457", c2:"#4A0823", eng:"quiz", bank:"body", trend:85,
      desc:"Bones, organs and senses — how well do you know the machine you live in? Ten questions per round.",
      steps:["Press PLAY — a body question appears.","Tap the correct answer.","Finish all questions and see your score.","Learn a fact with every answer."]}),
    NG({id:"greatinventions", name:"Great Inventions", cat:"Knowledge • History", g:"💡", c1:"#F9A825", c2:"#7A5200", eng:"quiz", bank:"inventions", trend:83,
      desc:"Who invented what? Telephones, aeroplanes, the web and more — the stories behind the things we use every day.",
      steps:["Press PLAY — an invention question appears.","Tap the correct answer.","Finish all questions and see your score.","Play again to invent a better score."]})
  ];
  NEW_GAMES.forEach(function(g, i){ g.added = 11 + i; GAMES.push(g); });
  var NEW_BUILDERS = {};


  /* ================= ENGINE: Quiz (banks + generated) ================= */
  function engQuiz(g){
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var bank = g.gen ? QUIZ_GENS[g.gen](lvl) : (QUIZ_BANKS[g.bank] || []);
    var qs = [];
    if(g.levels && !g.gen && bank.length){
      var start = ((lvl - 1) * 4) % bank.length;
      for(var i = 0; i < 8; i++) qs.push(bank[(start + i) % bank.length]);
    } else qs = shuffleCopy(bank).slice(0, 10);
    qs = qs.map(function(item){
      var opts = shuffleCopy([item[1], item[2], item[3], item[4]]);
      return { q: item[0], opts: opts, a: opts.indexOf(item[1]) };
    });
    var need = Math.ceil(qs.length * 0.6);
    var idx = 0, correct = 0, score = 0, over = false;
    var perQ = state.difficulty === "Easy" ? 20 : state.difficulty === "Hard" ? 10 : 15;
    var timeLeft = perQ, timer = null;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Score", '<b id="qzScore">0</b>'], ["Question", '<b id="qzIdx">1 / ' + qs.length + '</b>'], [g.levels ? "Level" : "Correct", g.levels ? lvl : '<b id="qzOk">0</b>']]) +
      '<div class="gx-timerbar"><div class="gx-timerfill" id="qzBar" style="width:100%"></div></div>' +
      '<div class="gx-q" id="qzQ"></div><div class="gx-opts" id="qzOpts"></div><div class="msg" id="qzMsg"></div><div id="qzNext"></div>';
    var qEl = el("qzQ"), optsEl = el("qzOpts"), msgEl = el("qzMsg");
    function stopTimer(){ if(timer){ clearInterval(timer); timer = null; } }
    gameStopFn = function(){ over = true; stopTimer(); };
    function startTimer(){
      stopTimer(); timeLeft = perQ;
      el("qzBar").style.width = "100%"; el("qzBar").classList.remove("low");
      timer = setInterval(function(){
        if(isPaused || over) return;
        timeLeft -= 0.1;
        var pct = Math.max(0, timeLeft / perQ * 100);
        el("qzBar").style.width = pct + "%";
        if(pct < 30) el("qzBar").classList.add("low");
        if(timeLeft <= 0){ answer(-1); }
      }, 100);
    }
    function render(){
      var cur = qs[idx];
      el("qzIdx").textContent = (idx + 1) + " / " + qs.length;
      qEl.textContent = cur.q;
      optsEl.innerHTML = "";
      cur.opts.forEach(function(o, oi){
        var b = document.createElement("button");
        b.className = "gx-opt"; b.textContent = o;
        b.addEventListener("click", function(){ answer(oi); });
        optsEl.appendChild(b);
      });
      msgEl.textContent = "";
      startTimer();
    }
    function answer(oi){
      if(over) return;
      stopTimer();
      var cur = qs[idx];
      var btns = optsEl.querySelectorAll(".gx-opt");
      btns.forEach(function(b, bi){ b.disabled = true; if(bi === cur.a) b.classList.add("right"); });
      if(oi === cur.a){
        correct++; score += 10 + Math.ceil(timeLeft);
        beep(880, 0.09);
        msgEl.textContent = "Correct! +" + (10 + Math.ceil(timeLeft)) + " points";
      } else {
        if(oi >= 0 && btns[oi]) btns[oi].classList.add("wrong");
        beep(220, 0.15);
        msgEl.textContent = (oi < 0 ? "Time up! " : "Not quite. ") + "The answer was: " + cur.opts[cur.a];
      }
      el("qzScore").textContent = score;
      var okEl = el("qzOk"); if(okEl) okEl.textContent = correct;
      idx++;
      later(function(){ if(!over) (idx >= qs.length ? finish() : render()); }, 1150);
    }
    function finish(){
      over = true; stopTimer();
      if(g.levels){
        if(correct >= need){
          lvlSet(g.id, lvl + 1);
          winJingle();
          msgEl.textContent = "Level " + lvl + " cleared! You got " + correct + " of " + qs.length + " right. Score: " + score + ".";
          el("qzNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1)) + '<div class="btn-row"><button class="mini-btn" data-replay="1">↻ Replay Level ' + lvl + '</button></div>';
          el("qzNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          el("qzNext").querySelector("[data-replay]").addEventListener("click", function(){ tap(); startNewGame(g); });
        } else {
          showGameOver("You got " + correct + " of " + qs.length + " right — you needed " + need + " to clear Level " + lvl + ". Score: " + score + ".");
        }
      } else {
        showGameOver("Quiz complete! You got " + correct + " of " + qs.length + " right. Final score: " + score + ".");
      }
    }
    if(!qs.length){ msgEl.textContent = "No questions available."; return; }
    render();
  }

  /* ================= ENGINE: Classify (two-choice rapid) ================= */
  function classifyItem(g, lvl){
    if(g.theme === "tf"){
      var a = 2 + rnd(15), b = 2 + rnd(15), kind = rnd(3), q, ans;
      if(kind === 0){ ans = a + b; q = a + " + " + b; }
      else if(kind === 1){ if(b > a){ var t = a; a = b; b = t; } ans = a - b; q = a + " − " + b; }
      else { a = 2 + rnd(9); b = 2 + rnd(9); ans = a * b; q = a + " × " + b; }
      var truth = Math.random() < 0.5;
      var shown = truth ? ans : ans + pick([-2, -1, 1, 2, 10]);
      return { top: q + " = " + shown, left: "✓ TRUE", right: "✗ FALSE", ansLeft: truth };
    }
    if(g.theme === "evenodd"){
      var n = 1 + rnd(999);
      return { top: "" + n, left: "EVEN", right: "ODD", ansLeft: n % 2 === 0 };
    }
    if(g.theme === "prime"){
      var primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
      var isP = Math.random() < 0.5, m;
      if(isP) m = pick(primes);
      else { do { m = 4 + rnd(96); } while(primes.indexOf(m) >= 0); }
      return { top: "" + m, left: "PRIME", right: "NOT PRIME", ansLeft: isP };
    }
    /* greater: levels change the number types */
    var x, y, xs, ys;
    function frac(){ var d = pick([2,3,4,5,6,8]); var n2 = 1 + rnd(d - 1); return { v: n2 / d, s: n2 + "/" + d }; }
    if(lvl <= 1){ x = 5 + rnd(95); y = 5 + rnd(95); xs = "" + x; ys = "" + y; }
    else if(lvl === 2){ x = 50 + rnd(950); y = 50 + rnd(950); xs = "" + x; ys = "" + y; }
    else if(lvl === 3){ x = Math.round((rnd(99) + rnd(100) / 100) * 100) / 100; y = Math.round((rnd(99) + rnd(100) / 100) * 100) / 100; xs = x.toFixed(2); ys = y.toFixed(2); }
    else if(lvl === 4){ var f1 = frac(), f2 = frac(); x = f1.v; y = f2.v; xs = f1.s; ys = f2.s; }
    else { x = rnd(81) - 40; y = rnd(81) - 40; xs = "" + x; ys = "" + y; }
    if(x === y) y += 1;
    var leftIsX = Math.random() < 0.5;
    return { top: "Which is greater?", pair: leftIsX ? [xs, ys] : [ys, xs], ansLeft: leftIsX ? x > y : y > x };
  }
  function engClassify(g){
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var isGreater = g.theme === "greater";
    var score = 0, lives = 3, streak = 0, rounds = 0, over = false;
    var timed = g.theme === "tf", timeLeft = 45, timer = null;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Score", '<b id="clScore">0</b>'], [isGreater ? "Round" : (timed ? "Time" : "Lives"), isGreater ? '<b id="clMid">1 / 10</b>' : (timed ? '<b id="clMid">45</b>s' : '<b id="clMid">♥♥♥</b>')], [g.levels ? "Level" : "Streak", g.levels ? lvl : '<b id="clSide">0</b>']]) +
      '<div class="gx-big" id="clTop" style="font-size:34px"></div>' +
      '<div class="gx-vs"><button class="gx-choice" id="clL"></button><button class="gx-choice" id="clR"></button></div>' +
      '<div class="msg" id="clMsg">' + (isGreater ? "Tap the greater value!" : "Decide fast — tap your answer!") + '</div>';
    var cur = null, lock = false;
    function stopTimer(){ if(timer){ clearInterval(timer); timer = null; } }
    gameStopFn = function(){ over = true; stopTimer(); };
    if(timed){
      timer = setInterval(function(){
        if(isPaused || over) return;
        timeLeft--; el("clMid").textContent = Math.max(0, timeLeft);
        if(timeLeft <= 0){ over = true; stopTimer(); showGameOver("Time up! Final score: " + score + "."); }
      }, 1000);
    }
    function next(){
      if(over) return;
      cur = classifyItem(g, lvl);
      el("clTop").textContent = cur.top;
      var L = el("clL"), R = el("clR");
      L.classList.remove("right", "wrong"); R.classList.remove("right", "wrong");
      if(cur.pair){ L.textContent = cur.pair[0]; R.textContent = cur.pair[1]; }
      else { L.textContent = cur.left; R.textContent = cur.right; }
      lock = false;
    }
    function choose(leftSide){
      if(over || lock || isPaused) return;
      lock = true;
      var good = (leftSide === cur.ansLeft);
      var mine = leftSide ? el("clL") : el("clR");
      mine.classList.add(good ? "right" : "wrong");
      rounds++;
      if(good){
        streak++; score += 10;
        if(!isGreater && streak % 5 === 0){ score += 5; el("clMsg").textContent = "Streak bonus! +5"; }
        else el("clMsg").textContent = "Correct!";
        beep(880, 0.08);
      } else {
        streak = 0; beep(220, 0.14);
        el("clMsg").textContent = "Wrong!";
        if(timed) score = Math.max(0, score - 2);
        else if(!isGreater){ lives--; el("clMid").textContent = "♥".repeat(Math.max(0, lives)) || "—"; }
      }
      el("clScore").textContent = score;
      var side = el("clSide"); if(side) side.textContent = streak;
      if(isGreater){
        el("clMid").textContent = Math.min(10, rounds + 1) + " / 10";
        later(function(){
          if(over) return;
          if(rounds >= 10){
            over = true;
            var correctCount = Math.round(score / 10);
            if(correctCount >= 7){ lvlSet(g.id, lvl + 1); winJingle(); el("clMsg").textContent = "Level " + lvl + " cleared! Score: " + score + "."; playBody.insertAdjacentHTML("beforeend", nextLevelBtn("▶ Next Level — Level " + (lvl + 1))); var nb = playBody.querySelector("[data-nextlvl]"); if(nb) nb.addEventListener("click", function(){ tap(); startNewGame(g); }); }
            else showGameOver("You scored " + score + " — you needed 70 to clear Level " + lvl + ".");
          } else next();
        }, 650);
      } else {
        if(!timed && lives <= 0){ over = true; stopTimer(); showGameOver("Out of lives! Final score: " + score + "."); return; }
        later(next, 480);
      }
    }
    el("clL").addEventListener("click", function(){ choose(true); });
    el("clR").addEventListener("click", function(){ choose(false); });
    next();
  }

  /* ================= ENGINE: Simon sequence ================= */
  var SIMON_THEMES = {
    color: { pads: [
      { label:"", bg:"#3CB54A", f:392 }, { label:"", bg:"#E5322D", f:330 },
      { label:"", bg:"#FFC531", f:262 }, { label:"", bg:"#2E9BFF", f:523 } ] },
    tone: { pads: [
      { label:"🎵", bg:"#7C4DBD", f:262 }, { label:"🎶", bg:"#00838F", f:330 },
      { label:"🎼", bg:"#EF6C00", f:392 }, { label:"🎧", bg:"#AD1457", f:523 } ] },
    shape: { pads: [
      { label:"●", bg:"#37474F", f:392 }, { label:"★", bg:"#8A5A00", f:330 },
      { label:"♥", bg:"#B71C1C", f:262 }, { label:"◆", bg:"#1565C0", f:523 } ] }
  };
  function engSimon(g){
    var cfg = SIMON_THEMES[g.theme] || SIMON_THEMES.color;
    var best = lvlOf(g.id);
    var seq = [], input = [], round = 0, accepting = false, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Round", '<b id="smRound">0</b>'], ["Best chain", '<b id="smBest">' + (best - 1) + '</b>'], ["Level", '<span class="gx-lvl">CHAIN</span>']]) +
      '<div class="gx-pads" id="smPads"></div>' +
      '<div class="msg" id="smMsg">Watch the sequence, then repeat it.</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="smStart">▶ Start</button></div>';
    var padsEl = el("smPads"), padBtns = [];
    cfg.pads.forEach(function(p, i){
      var b = document.createElement("button");
      b.className = "gx-pad"; b.style.background = p.bg; b.textContent = p.label;
      b.setAttribute("aria-label", "Pad " + (i + 1));
      b.addEventListener("click", function(){ press(i, true); });
      padsEl.appendChild(b); padBtns.push(b);
    });
    gameStopFn = function(){ over = true; };
    function light(i, dur){
      padBtns[i].classList.add("lit");
      beep(cfg.pads[i].f, 0.22);
      setTimeout(function(){ padBtns[i].classList.remove("lit"); }, dur || 320);
    }
    function playSeq(){
      accepting = false;
      el("smMsg").textContent = "Watch…";
      var i = 0;
      function step(){
        if(over) return;
        if(i >= seq.length){ accepting = true; input = []; el("smMsg").textContent = "Your turn — repeat " + seq.length + " steps!"; return; }
        light(seq[i], 340);
        i++;
        later(step, 480);
      }
      later(step, 550);
    }
    function newRound(){
      round++;
      el("smRound").textContent = round;
      seq.push(rnd(4));
      playSeq();
    }
    function press(i, byUser){
      if(!accepting || over || isPaused) return;
      light(i, 220);
      input.push(i);
      var k = input.length - 1;
      if(input[k] !== seq[k]){
        over = true; accepting = false;
        var cleared = round - 1;
        if(cleared + 1 > best){ lvlSet(g.id, cleared + 1); }
        showGameOver("Wrong pad! You cleared " + cleared + " round" + (cleared === 1 ? "" : "s") + " — best chain " + Math.max(best - 1, cleared) + ".");
        return;
      }
      if(input.length === seq.length){
        accepting = false;
        lvlSet(g.id, round + 1);
        el("smBest").textContent = Math.max(best - 1, round);
        winJingle();
        el("smMsg").textContent = "Perfect! Round " + round + " cleared.";
        later(function(){ if(!over) newRound(); }, 900);
      }
    }
    el("smStart").addEventListener("click", function(){
      tap(); seq = []; round = 0; over = false;
      el("smStart").textContent = "↻ Restart";
      newRound();
    });
  }

  /* ================= ENGINE: Grid find (odd one / boxing pads / spot difference) ================= */
  var ODD_PAIRS = [["🍎","🍏"],["😀","😁"],["🌕","🌖"],["🐶","🐱"],["⭐","🌟"],["🍊","🍋"],["🚗","🚙"],["⚽","🏀"],["🎈","🎀"],["🦋","🐝"]];
  function engGridFind(g){
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var score = 0, rounds = 0, over = false, timeLeft = g.theme === "pads" ? 30 : 60, timer = null;
    playTitle.textContent = g.name + " — play!";
    if(g.theme === "pads"){
      playBody.innerHTML =
        hudLine([["Score", '<b id="gfScore">0</b>'], ["Time", '<b id="gfTime">30</b>s'], ["Hits", '<b id="gfHits">0</b>']]) +
        '<div class="gx-grid" id="gfGrid" style="grid-template-columns:repeat(3,1fr)"></div>' +
        '<div class="msg" id="gfMsg">Tap Start, then strike the pad that lights up!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="gfStart">▶ Start</button></div>';
      var grid = el("gfGrid"), cells = [], litIdx = -1, running = false;
      for(var i = 0; i < 6; i++){
        var b = document.createElement("button");
        b.className = "gx-cell"; b.style.fontSize = "30px"; b.textContent = "🥊";
        b.style.opacity = ".45";
        (function(btn, ii){
          btn.addEventListener("click", function(){
            if(!running || over || isPaused) return;
            if(ii === litIdx){
              score += 1; el("gfScore").textContent = score; el("gfHits").textContent = score;
              beep(900 + rnd(200), 0.06);
              lightNext();
            }
          });
        })(b, i);
        cells.push(b); grid.appendChild(b);
      }
      function lightNext(){
        cells.forEach(function(c){ c.style.opacity = ".45"; c.style.boxShadow = ""; });
        litIdx = rnd(6);
        cells[litIdx].style.opacity = "1";
        cells[litIdx].style.boxShadow = "0 0 0 4px var(--yellow)";
      }
      gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
      el("gfStart").addEventListener("click", function(){
        tap(); if(timer) clearInterval(timer);
        score = 0; timeLeft = 30; running = true; over = false;
        el("gfScore").textContent = "0"; el("gfHits").textContent = "0"; el("gfTime").textContent = "30";
        el("gfMsg").textContent = "Strike the glowing pad!";
        el("gfStart").textContent = "↻ Restart";
        lightNext();
        timer = setInterval(function(){
          if(isPaused || over) return;
          timeLeft--; el("gfTime").textContent = Math.max(0, timeLeft);
          if(timeLeft <= 0){ over = true; running = false; clearInterval(timer); cells.forEach(function(c){ c.style.opacity = ".45"; c.style.boxShadow = ""; }); showGameOver("Time! You landed " + score + " strikes."); }
        }, 1000);
      });
      return;
    }
    /* odd + diff: timed rounds, level rises with each cleared round */
    var roundTime = null;
    playBody.innerHTML =
      hudLine([["Score", '<b id="gfScore">0</b>'], ["Time", '<b id="gfTime">' + timeLeft + '</b>s'], ["Level", '<b id="gfLvl">' + lvl + '</b>']]) +
      (g.theme === "diff" ? '<div style="font-weight:800;font-size:12.5px;color:var(--muted);text-align:center">ORIGINAL</div><div class="gx-grid" id="gfTop"></div><div style="font-weight:800;font-size:12.5px;color:var(--muted);text-align:center">FIND THE DIFFERENCE — TAP BELOW</div>' : "") +
      '<div class="gx-grid" id="gfGrid"></div>' +
      '<div class="msg" id="gfMsg">' + (g.theme === "diff" ? "One tile below is different. Tap it!" : "Tap the tile that is different!") + '</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="gfStart">▶ Start</button></div>';
    var gridEl = el("gfGrid"), started = false;
    gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
    function buildRound(){
      var size = Math.min(6, 3 + Math.floor((lvl - 1) / 1));
      if(g.theme === "diff") size = Math.min(5, 3 + Math.floor((lvl - 1) / 2));
      var n = size * size;
      var pair = pick(ODD_PAIRS);
      var oddIdx = rnd(n);
      gridEl.style.gridTemplateColumns = "repeat(" + size + ",1fr)";
      gridEl.innerHTML = "";
      if(g.theme === "diff"){
        var top = el("gfTop");
        top.style.gridTemplateColumns = "repeat(" + size + ",1fr)";
        top.innerHTML = "";
        for(var t = 0; t < n; t++){
          var tc = document.createElement("div");
          tc.className = "gx-cell"; tc.style.fontSize = size >= 5 ? "17px" : "22px";
          tc.textContent = (t === oddIdx ? pair[1] : pair[0]);
          top.appendChild(tc);
        }
      }
      for(var i = 0; i < n; i++){
        var c = document.createElement("button");
        c.className = "gx-cell"; c.style.fontSize = size >= 5 ? "17px" : "22px";
        c.textContent = (g.theme === "diff") ? pair[0] : (i === oddIdx ? pair[1] : pair[0]);
        (function(cell, ii){
          cell.addEventListener("click", function(){
            if(!started || over || isPaused) return;
            if(ii === oddIdx){
              score += 10; rounds++;
              el("gfScore").textContent = score;
              beep(920, 0.08);
              lvl++; lvlSet(g.id, lvl); el("gfLvl").textContent = lvl;
              el("gfMsg").textContent = "Found it! Level " + lvl + " — keep going!";
              buildRound();
            } else {
              timeLeft = Math.max(0, timeLeft - 3);
              el("gfTime").textContent = timeLeft;
              beep(220, 0.12);
              cell.classList.add("bad");
              setTimeout(function(){ cell.classList.remove("bad"); }, 300);
              el("gfMsg").textContent = "Not that one — minus 3 seconds!";
            }
          });
        })(c, i);
        gridEl.appendChild(c);
      }
    }
    el("gfStart").addEventListener("click", function(){
      tap(); if(timer) clearInterval(timer);
      score = 0; lvl = lvlOf(g.id); timeLeft = 60; started = true; over = false;
      el("gfScore").textContent = "0"; el("gfTime").textContent = "60"; el("gfLvl").textContent = lvl;
      el("gfStart").textContent = "↻ Restart";
      buildRound();
      timer = setInterval(function(){
        if(isPaused || over) return;
        timeLeft--; el("gfTime").textContent = Math.max(0, timeLeft);
        if(timeLeft <= 0){ over = true; clearInterval(timer); showGameOver("Time up! You reached Level " + lvl + " with " + score + " points."); }
      }, 1000);
    });
    buildRound();
  }

  /* ================= Number Memory ================= */
  function engNumMemory(g){
    var lvl = lvlOf(g.id);
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Level", '<b id="nmLvl">' + lvl + '</b>'], ["Digits", '<b id="nmDig">' + (lvl + 2) + '</b>'], ["Best", '<b id="nmBest">' + lvl + '</b>']]) +
      '<div class="gx-big" id="nmShow">• • •</div>' +
      '<div id="nmInputWrap" hidden><input class="gx-input" id="nmInput" inputmode="numeric" autocomplete="off" aria-label="Type the number you saw" placeholder="Type the number…"></div>' +
      '<div class="msg" id="nmMsg">Memorize the number, then type it back.</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="nmBtn">▶ Show Number</button></div>';
    var current = "", phase = "idle";
    gameStopFn = function(){};
    el("nmBtn").addEventListener("click", function(){
      tap();
      if(phase === "idle"){
        var digits = lvl + 2;
        current = "";
        for(var i = 0; i < digits; i++) current += (i === 0 ? 1 + rnd(9) : rnd(10));
        el("nmShow").textContent = current;
        el("nmMsg").textContent = "Memorize it…";
        el("nmBtn").textContent = "Hide & Type";
        phase = "showing";
      } else if(phase === "showing"){
        el("nmShow").textContent = "• ".repeat(current.length).trim();
        el("nmInputWrap").hidden = false;
        el("nmInput").value = "";
        el("nmInput").focus();
        el("nmBtn").textContent = "✓ Check";
        el("nmMsg").textContent = "Type the number you saw.";
        phase = "typing";
      } else if(phase === "typing"){
        var v = el("nmInput").value.trim();
        if(v === current){
          winJingle();
          lvlSet(g.id, lvl + 1);
          el("nmMsg").textContent = "Perfect memory! Level " + lvl + " cleared.";
          el("nmShow").textContent = "✓";
          el("nmInputWrap").hidden = true;
          el("nmBtn").textContent = "▶ Next Level — " + (lvl + 1);
          lvl = lvl + 1;
          el("nmLvl").textContent = lvl; el("nmDig").textContent = lvl + 2; el("nmBest").textContent = lvl;
          phase = "idle";
        } else {
          showGameOver("The number was " + current + " — you typed " + (v || "nothing") + ". You reached Level " + lvl + ".");
          phase = "idle";
          el("nmInputWrap").hidden = true;
          el("nmBtn").textContent = "▶ Try Again";
        }
      }
    });
  }

  /* ================= Position Memory ================= */
  function engPosMemory(g){
    var lvl = lvlOf(g.id);
    var size = 4, seq = [], input = [], accepting = false, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Level", '<b id="pmLvl">' + lvl + '</b>'], ["Cells", '<b id="pmCount">' + (lvl + 2) + '</b>'], ["Step", '<b id="pmStep">0</b>']]) +
      '<div class="gx-grid" id="pmGrid" style="grid-template-columns:repeat(4,1fr)"></div>' +
      '<div class="msg" id="pmMsg">Watch the cells flash, then tap them back in order.</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="pmStart">▶ Start</button></div>';
    var grid = el("pmGrid"), cells = [];
    for(var i = 0; i < size * size; i++){
      var b = document.createElement("button");
      b.className = "gx-cell"; b.textContent = "";
      (function(btn, ii){
        btn.addEventListener("click", function(){
          if(!accepting || over || isPaused) return;
          flash(ii, "#3CB54A");
          input.push(ii);
          el("pmStep").textContent = input.length + " / " + seq.length;
          if(input[input.length - 1] !== seq[input.length - 1]){
            over = true; accepting = false;
            showGameOver("Wrong cell! You reached Level " + lvl + " (" + seq.length + " cells).");
            return;
          }
          if(input.length === seq.length){
            accepting = false;
            lvlSet(g.id, lvl + 1);
            winJingle();
            lvl++;
            el("pmLvl").textContent = lvl; el("pmCount").textContent = lvl + 2;
            el("pmMsg").textContent = "Perfect recall! Next level has " + (lvl + 2) + " cells.";
            el("pmStart").textContent = "▶ Next Level";
          }
        });
      })(b, i);
      cells.push(b); grid.appendChild(b);
    }
    function flash(ii, color){
      cells[ii].style.background = color || "var(--yellow)";
      setTimeout(function(){ cells[ii].style.background = ""; }, 330);
    }
    gameStopFn = function(){ over = true; };
    el("pmStart").addEventListener("click", function(){
      tap(); over = false; accepting = false; input = [];
      el("pmStep").textContent = "0";
      var count = lvl + 2;
      seq = [];
      while(seq.length < count){ var c = rnd(size * size); if(seq.indexOf(c) < 0 || count > 12) seq.push(c); }
      el("pmMsg").textContent = "Watch carefully…";
      el("pmStart").textContent = "↻ Restart";
      var i = 0;
      function step(){
        if(over) return;
        if(i >= seq.length){ accepting = true; input = []; el("pmMsg").textContent = "Your turn — tap " + seq.length + " cells in order!"; return; }
        flash(seq[i]); beep(600 + i * 40, 0.08);
        i++; later(step, 560);
      }
      later(step, 500);
    });
  }

  /* ================= Pairs Blitz ================= */
  function engPairs(g){
    var cfg = state.difficulty === "Easy" ? { pairs: 6, cols: 4 } : state.difficulty === "Hard" ? { pairs: 10, cols: 5 } : { pairs: 8, cols: 4 };
    var SYMS = ["💎","🍇","🦁","🚀","🎸","🌙","🍓","🐬","🔥","👑"];
    var deck = shuffleCopy(SYMS.slice(0, cfg.pairs).concat(SYMS.slice(0, cfg.pairs)));
    var first = -1, lock = false, found = 0, moves = 0, timeLeft = 60, timer = null, started = false, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Pairs", '<b id="pbPairs">0 / ' + cfg.pairs + '</b>'], ["Time", '<b id="pbTime">60</b>s'], ["Moves", '<b id="pbMoves">0</b>']]) +
      '<div class="mem-grid" id="pbGrid" style="grid-template-columns:repeat(' + cfg.cols + ',1fr)"></div>' +
      '<div class="msg" id="pbMsg">' + state.difficulty + ' — ' + cfg.pairs + ' pairs, 60 seconds. Flip fast!</div>';
    var grid = el("pbGrid");
    gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
    function startClock(){
      if(started) return; started = true;
      timer = setInterval(function(){
        if(isPaused || over) return;
        timeLeft--; el("pbTime").textContent = Math.max(0, timeLeft);
        if(timeLeft <= 0){ over = true; clearInterval(timer); showGameOver("Time up! You found " + found + " of " + cfg.pairs + " pairs in " + moves + " moves."); }
      }, 1000);
    }
    deck.forEach(function(sym, i){
      var b = document.createElement("button");
      b.className = "mem-card" + (cfg.cols >= 5 ? " small" : ""); b.textContent = "?";
      b.setAttribute("aria-label", "Card " + (i + 1));
      b.addEventListener("click", function(){
        if(lock || over || isPaused || b.classList.contains("flipped") || b.classList.contains("matched")) return;
        startClock();
        b.classList.add("flipped"); b.textContent = sym; tap();
        if(first < 0){ first = i; return; }
        moves++; el("pbMoves").textContent = moves;
        var firstBtn = grid.children[first];
        if(deck[first] === sym){
          b.classList.add("matched"); firstBtn.classList.add("matched");
          found++; el("pbPairs").textContent = found + " / " + cfg.pairs;
          beep(880, 0.12); first = -1;
          if(found === cfg.pairs){
            over = true; if(timer) clearInterval(timer);
            winJingle();
            el("pbMsg").textContent = "All pairs cleared with " + timeLeft + "s to spare, in " + moves + " moves! 🏆";
          }
        } else {
          lock = true; beep(300, 0.1);
          var f = first; first = -1;
          setTimeout(function(){
            b.classList.remove("flipped"); b.textContent = "?";
            firstBtn.classList.remove("flipped"); firstBtn.textContent = "?";
            lock = false;
          }, 620);
        }
      });
      grid.appendChild(b);
    });
  }

  /* ================= Typing Sprint ================= */
  function engTyping(g){
    var score = 0, timeLeft = 60, timer = null, running = false, over = false, current = "";
    var best = bestOf(g.id);
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Words", '<b id="tyScore">0</b>'], ["Time", '<b id="tyTime">60</b>s'], ["Best", '<b id="tyBest">' + (best > 0 ? best : "—") + '</b>']]) +
      '<div class="gx-big" id="tyWord" style="letter-spacing:1px">ready?</div>' +
      '<input class="gx-input" id="tyInput" autocomplete="off" autocapitalize="none" aria-label="Type the word shown" placeholder="Type here…" disabled>' +
      '<div class="msg" id="tyMsg">Tap Start, then type each word and press Enter.</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="tyStart">▶ Start</button><button class="mini-btn" id="tyDone" hidden>✓ Done</button></div>';
    var input = el("tyInput");
    gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
    function nextWord(){
      current = pick(TYPE_WORDS);
      el("tyWord").textContent = current;
      input.value = "";
      input.focus();
    }
    function submit(){
      if(!running || over) return;
      if(input.value.trim().toLowerCase() === current){
        score++; el("tyScore").textContent = score;
        if(score > best){ best = score; el("tyBest").textContent = best; }
        beep(880, 0.07);
        el("tyMsg").textContent = "Nice! Keep going…";
        nextWord();
      } else {
        beep(240, 0.1);
        el("tyMsg").textContent = "Not exact — fix the word and try again.";
      }
    }
    input.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); submit(); } });
    el("tyDone").addEventListener("click", submit);
    el("tyStart").addEventListener("click", function(){
      tap(); if(timer) clearInterval(timer);
      score = 0; timeLeft = 60; running = true; over = false;
      el("tyScore").textContent = "0"; el("tyTime").textContent = "60";
      input.disabled = false; el("tyDone").hidden = false;
      el("tyStart").textContent = "↻ Restart";
      nextWord();
      timer = setInterval(function(){
        if(isPaused || over) return;
        timeLeft--; el("tyTime").textContent = Math.max(0, timeLeft);
        if(timeLeft <= 0){ over = true; running = false; clearInterval(timer); input.disabled = true; best = bestSet(g.id, score); el("tyBest").textContent = best > 0 ? best : "—"; showGameOver("Time! You typed " + score + " words in 60 seconds (best " + best + ")."); }
      }, 1000);
    });
  }


  /* ================= Slide Puzzle ================= */
  function engSlide(g){
    var lvl = lvlOf(g.id);
    var N = Math.min(5, 2 + lvl); /* L1=3, L2=4, L3+=5 */
    var cells = [], blank = N * N - 1, moves = 0, over = false;
    var solved = []; for(var i = 0; i < N * N - 1; i++) solved.push(i + 1); solved.push(0);
    cells = solved.slice();
    var shuffleMoves = N * N * 6;
    var lastBlank = -1;
    for(var s = 0; s < shuffleMoves; s++){
      var opts = [];
      var bx = blank % N, by = Math.floor(blank / N);
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
        var nx = bx + d[0], ny = by + d[1];
        if(nx >= 0 && nx < N && ny >= 0 && ny < N){ var ni = ny * N + nx; if(ni !== lastBlank) opts.push(ni); }
      });
      var mv = pick(opts);
      cells[blank] = cells[mv]; cells[mv] = 0; lastBlank = blank; blank = mv;
    }
    var limit = shuffleMoves * 2 + 30;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Moves", '<b id="slMoves">0</b> / ' + limit], ["Level", lvl], ["Size", N + "×" + N]]) +
      '<div class="gx-grid" id="slGrid" style="grid-template-columns:repeat(' + N + ',1fr)"></div>' +
      '<div class="msg" id="slMsg">Tap a tile next to the empty space to slide it. Order the numbers 1 to ' + (N * N - 1) + '.</div><div id="slNext"></div>';
    var grid = el("slGrid");
    gameStopFn = function(){ over = true; };
    function render(){
      grid.innerHTML = "";
      cells.forEach(function(v, idx){
        var b = document.createElement("button");
        b.className = "gx-cell";
        b.style.fontSize = N >= 5 ? "16px" : "21px";
        if(v === 0){ b.style.background = "transparent"; b.style.border = "2px dashed var(--line)"; b.textContent = ""; b.disabled = true; }
        else {
          b.textContent = v;
          b.style.background = "linear-gradient(145deg,#7C4DBD,#5E35B1)"; b.style.color = "#fff"; b.style.border = "0";
          b.addEventListener("click", function(){
            if(over || isPaused) return;
            var bx = blank % N, by = Math.floor(blank / N), x = idx % N, y = Math.floor(idx / N);
            if(Math.abs(bx - x) + Math.abs(by - y) !== 1) return;
            cells[blank] = v; cells[idx] = 0; blank = idx; moves++;
            el("slMoves").textContent = moves;
            beep(600, 0.05);
            render();
            if(cells.every(function(c, ci){ return c === solved[ci]; })){
              over = true; lvlSet(g.id, lvl + 1); winJingle();
              el("slMsg").textContent = "Solved in " + moves + " moves! Level " + lvl + " cleared. 🏆";
              el("slNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
              el("slNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
            } else if(moves >= limit){
              over = true;
              showGameOver("Out of moves (" + limit + ")! The puzzle was almost there — try again.");
            }
          });
        }
        grid.appendChild(b);
      });
    }
    render();
  }

  /* ================= Lights Out ================= */
  function engLights(g){
    var lvl = lvlOf(g.id);
    var N = Math.min(5, 2 + lvl); /* 3,4,5 */
    var grid = [], moves = 0, over = false;
    for(var i = 0; i < N * N; i++) grid.push(false);
    function press(i, arr){
      var x = i % N, y = Math.floor(i / N);
      [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
        var nx = x + d[0], ny = y + d[1];
        if(nx >= 0 && nx < N && ny >= 0 && ny < N) arr[ny * N + nx] = !arr[ny * N + nx];
      });
    }
    var presses = 3 + lvl * 2;
    for(var p = 0; p < presses; p++) press(rnd(N * N), grid);
    if(grid.every(function(v){ return !v; })) press(rnd(N * N), grid);
    var limit = presses * 4 + 12;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Moves", '<b id="loMoves">0</b> / ' + limit], ["Level", lvl], ["Lit", '<b id="loLit"></b>']]) +
      '<div class="gx-grid" id="loGrid" style="grid-template-columns:repeat(' + N + ',1fr)"></div>' +
      '<div class="msg" id="loMsg">Tap a lamp to toggle it and its neighbours. Turn every lamp OFF.</div><div id="loNext"></div>';
    var box = el("loGrid");
    gameStopFn = function(){ over = true; };
    function render(){
      box.innerHTML = "";
      var lit = 0;
      grid.forEach(function(v, idx){
        if(v) lit++;
        var b = document.createElement("button");
        b.className = "gx-cell";
        b.style.fontSize = "20px";
        b.textContent = v ? "💡" : "⚫";
        b.style.background = v ? "radial-gradient(circle at 50% 40%, #FFF3B0, #FFC531)" : "var(--chip)";
        b.style.border = "0";
        b.addEventListener("click", function(){
          if(over || isPaused) return;
          press(idx, grid); moves++;
          el("loMoves").textContent = moves;
          beep(v ? 500 : 700, 0.05);
          render();
          if(grid.every(function(x){ return !x; })){
            over = true; lvlSet(g.id, lvl + 1); winJingle();
            el("loMsg").textContent = "All lamps out in " + moves + " moves! Level " + lvl + " cleared. 🏆";
            el("loNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
            el("loNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          } else if(moves >= limit){
            over = true; showGameOver("Out of moves (" + limit + ") with " + lit + " lamps still lit. Try again!");
          }
        });
        box.appendChild(b);
      });
      el("loLit").textContent = lit;
    }
    render();
  }

  /* ================= Tower of Hanoi ================= */
  function engHanoi(g){
    var lvl = lvlOf(g.id);
    var disks = Math.min(7, 2 + lvl); /* 3..7 */
    var pegs = [[], [], []], sel = -1, moves = 0, over = false;
    for(var d = disks; d >= 1; d--) pegs[0].push(d);
    var par = Math.pow(2, disks) - 1, limit = par * 3;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Moves", '<b id="hnMoves">0</b>'], ["Best possible", par], ["Level", lvl]]) +
      '<div id="hnPegs" style="display:flex;gap:10px;margin-top:8px"></div>' +
      '<div class="msg" id="hnMsg">Tap a peg to lift its top disk, then tap another peg to place it. A bigger disk can never sit on a smaller one.</div><div id="hnNext"></div>';
    var box = el("hnPegs");
    gameStopFn = function(){ over = true; };
    var DCOLORS = ["#E5322D","#FF8A3C","#FFC531","#3CB54A","#2E9BFF","#7C4DBD","#FF5A7A"];
    function render(){
      box.innerHTML = "";
      pegs.forEach(function(peg, pi){
        var col = document.createElement("button");
        col.style.cssText = "flex:1;background:var(--chip);border:2.5px solid " + (sel === pi ? "var(--orange)" : "var(--line)") + ";border-radius:14px;min-height:170px;display:flex;flex-direction:column-reverse;align-items:center;padding:8px 4px;gap:4px";
        col.setAttribute("aria-label", "Peg " + (pi + 1));
        if(!peg.length) col.innerHTML = '<span style="color:var(--muted);font-weight:800;font-size:12px">PEG ' + (pi + 1) + '</span>';
        peg.forEach(function(disk){
          var dd = document.createElement("div");
          dd.style.cssText = "height:20px;border-radius:99px;background:" + DCOLORS[disk - 1] + ";width:" + (28 + disk * 10) + "%;max-width:96%";
          col.appendChild(dd);
        });
        col.addEventListener("click", function(){
          if(over || isPaused) return;
          if(sel === -1){ if(peg.length){ sel = pi; beep(660, 0.05); render(); } return; }
          if(sel === pi){ sel = -1; render(); return; }
          var disk = pegs[sel][pegs[sel].length - 1];
          var top = peg[peg.length - 1];
          if(top === undefined || disk < top){
            pegs[sel].pop(); peg.push(disk); moves++;
            el("hnMoves").textContent = moves;
            beep(520, 0.06); sel = -1; render();
            if(pegs[1].length === disks || pegs[2].length === disks){
              over = true; lvlSet(g.id, lvl + 1); winJingle();
              el("hnMsg").textContent = "Tower moved in " + moves + " moves (perfect is " + par + ")! Level " + lvl + " cleared. 🏆";
              el("hnNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
              el("hnNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
            } else if(moves >= limit){
              over = true; showGameOver("Out of moves (" + limit + "). The tower still stands unfinished — try again!");
            }
          } else {
            beep(220, 0.12);
            el("hnMsg").textContent = "Can't place a bigger disk on a smaller one!";
            sel = -1; render();
          }
        });
        box.appendChild(col);
      });
    }
    render();
  }

  /* ================= Code Breaker (Mastermind) ================= */
  function engMastermind(g){
    var lvl = lvlOf(g.id);
    var LEN = Math.min(6, 3 + lvl); /* 4,5,6 */
    var COLORS = ["#E5322D","#2E9BFF","#3CB54A","#FFC531","#FF5A7A","#7C4DBD"];
    var CNAMES = ["red","blue","green","yellow","pink","purple"];
    var allowDup = lvl >= 2;
    var code = [];
    while(code.length < LEN){ var c = rnd(COLORS.length); if(allowDup || code.indexOf(c) < 0) code.push(c); }
    var maxTries = Math.max(7, 11 - lvl);
    var guess = [], tries = 0, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Tries", '<b id="cbTries">0</b> / ' + maxTries], ["Code length", LEN], ["Level", lvl]]) +
      '<div style="text-align:center;font-weight:800;color:var(--muted);font-size:13px;margin-top:6px">YOUR GUESS</div>' +
      '<div id="cbGuess" style="display:flex;gap:8px;justify-content:center;margin:6px 0"></div>' +
      '<div id="cbPal" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"></div>' +
      '<div class="btn-row"><button class="mini-btn" id="cbClear">⌫ Clear</button><button class="mini-btn orange" id="cbCheck">✓ Check</button></div>' +
      '<div class="msg" id="cbMsg">Build a guess of ' + LEN + ' colors' + (allowDup ? " (repeats allowed)" : " (no repeats)") + '. ⚫ = right color &amp; place, ⚪ = right color, wrong place.</div>' +
      '<div id="cbHist" style="margin-top:8px"></div><div id="cbNext"></div>';
    var guessEl = el("cbGuess"), palEl = el("cbPal"), histEl = el("cbHist");
    gameStopFn = function(){ over = true; };
    function dot(colorIdx, size){
      return '<span style="display:inline-block;width:' + (size || 30) + 'px;height:' + (size || 30) + 'px;border-radius:50%;background:' + (colorIdx == null ? "var(--chip)" : COLORS[colorIdx]) + ';border:2px solid var(--line)"></span>';
    }
    function renderGuess(){
      guessEl.innerHTML = "";
      for(var i = 0; i < LEN; i++){
        var s = document.createElement("span");
        s.innerHTML = dot(guess[i] === undefined ? null : guess[i], 34);
        guessEl.appendChild(s);
      }
    }
    COLORS.forEach(function(c, ci){
      var b = document.createElement("button");
      b.innerHTML = dot(ci, 36); b.style.background = "transparent"; b.style.border = "0"; b.style.padding = "0";
      b.setAttribute("aria-label", "Add " + CNAMES[ci]);
      b.addEventListener("click", function(){
        if(over || isPaused || guess.length >= LEN) return;
        if(!allowDup && guess.indexOf(ci) >= 0){ el("cbMsg").textContent = "No repeated colors on this level!"; beep(220, 0.1); return; }
        guess.push(ci); beep(600 + ci * 60, 0.05); renderGuess();
      });
      palEl.appendChild(b);
    });
    el("cbClear").addEventListener("click", function(){ guess = []; renderGuess(); tap(); });
    el("cbCheck").addEventListener("click", function(){
      if(over || isPaused) return;
      if(guess.length < LEN){ el("cbMsg").textContent = "Fill all " + LEN + " slots first!"; beep(220, 0.1); return; }
      tries++; el("cbTries").textContent = tries;
      var black = 0, white = 0, cLeft = {}, gLeft = {};
      for(var i = 0; i < LEN; i++){
        if(guess[i] === code[i]) black++;
        else { cLeft[code[i]] = (cLeft[code[i]] || 0) + 1; gLeft[guess[i]] = (gLeft[guess[i]] || 0) + 1; }
      }
      for(var k in gLeft) white += Math.min(gLeft[k], cLeft[k] || 0);
      var row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:8px;justify-content:center;padding:5px 0;border-bottom:1px solid var(--line)";
      row.innerHTML = guess.map(function(gi){ return dot(gi, 22); }).join("") +
        '<b style="font-size:14px">⚫ ' + black + ' &nbsp;⚪ ' + white + '</b>';
      histEl.prepend(row);
      beep(black ? 760 : 420, 0.07);
      if(black === LEN){
        over = true; lvlSet(g.id, lvl + 1); winJingle();
        el("cbMsg").textContent = "CODE CRACKED in " + tries + " tries! Level " + lvl + " cleared. 🏆";
        el("cbNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
        el("cbNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
      } else if(tries >= maxTries){
        over = true;
        showGameOver("Out of tries! The code was: " + code.map(function(ci){ return CNAMES[ci]; }).join(", ") + ".");
      } else {
        el("cbMsg").textContent = "⚫ " + black + " exact, ⚪ " + white + " right color wrong place. " + (maxTries - tries) + " tries left.";
      }
      guess = []; renderGuess();
    });
    renderGuess();
  }

  /* ================= Color Flood ================= */
  function engFlood(g){
    var lvl = lvlOf(g.id);
    var N = Math.min(12, 6 + lvl * 2); /* 8,10,12 */
    var NC = Math.min(6, 3 + lvl); /* 4,5,6 */
    var COLORS = ["#E5322D","#2E9BFF","#3CB54A","#FFC531","#FF5A7A","#7C4DBD"];
    var grid = [];
    for(var i = 0; i < N * N; i++) grid.push(rnd(NC));
    var limit = Math.round(N * 1.6) + NC + 4, moves = 0, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Moves", '<b id="flMoves">0</b> / ' + limit], ["Level", lvl], ["Colors", NC]]) +
      '<div class="gx-grid" id="flGrid" style="grid-template-columns:repeat(' + N + ',1fr);gap:2px"></div>' +
      '<div id="flPal" style="display:flex;gap:8px;justify-content:center;margin-top:10px"></div>' +
      '<div class="msg" id="flMsg">Your flood starts at the top-left corner. Tap a color to spread!</div><div id="flNext"></div>';
    var box = el("flGrid");
    gameStopFn = function(){ over = true; };
    function region(){
      var seen = {}, stack = [0], cur = grid[0];
      seen[0] = true;
      while(stack.length){
        var i = stack.pop(), x = i % N, y = Math.floor(i / N);
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){
          var nx = x + d[0], ny = y + d[1], ni = ny * N + nx;
          if(nx >= 0 && nx < N && ny >= 0 && ny < N && !seen[ni] && grid[ni] === cur){ seen[ni] = true; stack.push(ni); }
        });
      }
      return Object.keys(seen).map(Number);
    }
    function render(){
      box.innerHTML = "";
      grid.forEach(function(v){
        var d = document.createElement("div");
        d.style.cssText = "aspect-ratio:1;border-radius:3px;background:" + COLORS[v];
        box.appendChild(d);
      });
    }
    for(var ci = 0; ci < NC; ci++){
      (function(c){
        var b = document.createElement("button");
        b.style.cssText = "width:44px;height:44px;border-radius:50%;border:3px solid var(--line);background:" + COLORS[c];
        b.setAttribute("aria-label", "Flood with color " + (c + 1));
        b.addEventListener("click", function(){
          if(over || isPaused || grid[0] === c) return;
          region().forEach(function(idx){ grid[idx] = c; });
          moves++; el("flMoves").textContent = moves;
          beep(500 + c * 70, 0.06);
          render();
          if(grid.every(function(v){ return v === grid[0]; })){
            over = true; lvlSet(g.id, lvl + 1); winJingle();
            el("flMsg").textContent = "Board flooded in " + moves + " moves! Level " + lvl + " cleared. 🏆";
            el("flNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
            el("flNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          } else if(moves >= limit){
            over = true; showGameOver("Out of moves (" + limit + ")! The flood stopped short — try a different color order.");
          }
        });
        el("flPal").appendChild(b);
      })(ci);
    }
    render();
  }

  /* ================= Sudoku Mini ================= */
  function engSudoku(g){
    var lvl = lvlOf(g.id);
    var N = lvl <= 2 ? 4 : 6;
    var BR = 2, BC = N === 4 ? 2 : 3;
    var sol = [];
    for(var i = 0; i < N * N; i++) sol.push(0);
    function okAt(idx, v){
      var x = idx % N, y = Math.floor(idx / N);
      for(var k = 0; k < N; k++){ if(sol[y * N + k] === v || sol[k * N + x] === v) return false; }
      var bx = Math.floor(x / BC) * BC, by = Math.floor(y / BR) * BR;
      for(var yy = 0; yy < BR; yy++) for(var xx = 0; xx < BC; xx++) if(sol[(by + yy) * N + bx + xx] === v) return false;
      return true;
    }
    (function fill(idx){
      if(idx >= N * N) return true;
      var nums = shuffleCopy([1,2,3,4,5,6].slice(0, N));
      for(var t = 0; t < nums.length; t++){
        if(okAt(idx, nums[t])){ sol[idx] = nums[t]; if(fill(idx + 1)) return true; sol[idx] = 0; }
      }
      return false;
    })(0);
    var givensCount = N === 4 ? Math.max(6, 10 - lvl) : Math.max(12, 22 - lvl * 2);
    if(state.difficulty === "Easy") givensCount += 3;
    if(state.difficulty === "Hard") givensCount = Math.max(4, givensCount - 3);
    var given = {}, order = shuffleCopy(sol.map(function(_, i){ return i; }));
    order.slice(0, givensCount).forEach(function(i){ given[i] = true; });
    var filled = sol.map(function(v, i){ return given[i] ? v : 0; });
    var sel = -1, mistakes = 0, over = false, remaining = N * N - givensCount;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Mistakes", '<b id="suMis">0</b> / 3'], ["Level", lvl], ["Grid", N + "×" + N]]) +
      '<div class="gx-grid" id="suGrid" style="grid-template-columns:repeat(' + N + ',1fr);gap:3px"></div>' +
      '<div class="gx-keyrow" id="suPad"></div>' +
      '<div class="msg" id="suMsg">Tap an empty cell, then a number. Every row, column and box needs 1–' + N + ' exactly once.</div><div id="suNext"></div>';
    var box = el("suGrid");
    gameStopFn = function(){ over = true; };
    function render(){
      box.innerHTML = "";
      filled.forEach(function(v, idx){
        var b = document.createElement("button");
        b.className = "gx-cell" + (sel === idx ? " sel" : "");
        b.style.fontSize = N === 6 ? "16px" : "20px";
        b.textContent = v || "";
        if(given[idx]){ b.style.background = "var(--chip)"; b.style.fontWeight = "800"; }
        else if(v){ b.style.color = "var(--teal-d)"; }
        b.addEventListener("click", function(){ if(!over && !given[idx]){ sel = idx; render(); } });
        box.appendChild(b);
      });
    }
    for(var n = 1; n <= N; n++){
      (function(num){
        var b = document.createElement("button");
        b.className = "gx-key"; b.textContent = num;
        b.addEventListener("click", function(){
          if(over || isPaused || sel < 0 || filled[sel]) return;
          if(sol[sel] === num){
            filled[sel] = num; remaining--; beep(760, 0.06); render();
            if(remaining === 0){
              over = true; lvlSet(g.id, lvl + 1); winJingle();
              el("suMsg").textContent = "Sudoku solved with " + mistakes + " mistakes! Level " + lvl + " cleared. 🏆";
              el("suNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
              el("suNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
            } else el("suMsg").textContent = "Correct! " + remaining + " cells to go.";
          } else {
            mistakes++; el("suMis").textContent = mistakes;
            beep(200, 0.15);
            el("suMsg").textContent = "That number doesn't fit there. Mistake " + mistakes + " of 3!";
            if(mistakes >= 3){ over = true; showGameOver("Three mistakes! The Sudoku wins this round — try again."); }
          }
        });
        el("suPad").appendChild(b);
      })(n);
    }
    render();
  }

  /* ================= Magic Square ================= */
  function engMagic(g){
    var lvl = lvlOf(g.id);
    var SOL = [8,1,6, 3,5,7, 4,9,2];
    var givens = Math.max(2, 6 - lvl);
    var givenIdx = shuffleCopy([0,1,2,3,4,5,6,7,8]).slice(0, givens);
    var board = SOL.map(function(v, i){ return givenIdx.indexOf(i) >= 0 ? v : 0; });
    var held = 0, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Magic total", 15], ["Level", lvl], ["Placed", '<b id="mgPlaced"></b>']]) +
      '<div class="gx-grid" id="mgGrid" style="grid-template-columns:repeat(3,1fr)"></div>' +
      '<div style="text-align:center;font-weight:800;color:var(--muted);font-size:13px">YOUR NUMBERS — TAP ONE, THEN TAP A CELL</div>' +
      '<div class="gx-keyrow" id="mgPal"></div>' +
      '<div class="msg" id="mgMsg">Every row, column and diagonal must add up to 15.</div><div id="mgNext"></div>';
    var box = el("mgGrid");
    gameStopFn = function(){ over = true; };
    function usedNums(){ return board.filter(function(v){ return v > 0; }); }
    function render(){
      box.innerHTML = "";
      board.forEach(function(v, idx){
        var b = document.createElement("button");
        b.className = "gx-cell"; b.style.fontSize = "24px";
        b.textContent = v || "";
        if(givenIdx.indexOf(idx) >= 0){ b.style.background = "var(--chip)"; }
        else if(v){ b.style.color = "var(--teal-d)"; }
        b.addEventListener("click", function(){
          if(over || isPaused) return;
          if(givenIdx.indexOf(idx) >= 0) return;
          if(board[idx] && !held){ board[idx] = 0; beep(420, 0.05); render(); return; }
          if(held && !board[idx]){ board[idx] = held; held = 0; beep(700, 0.06); render(); check(); }
        });
        box.appendChild(b);
      });
      var pal = el("mgPal"); pal.innerHTML = "";
      for(var n = 1; n <= 9; n++){
        if(usedNums().indexOf(n) >= 0 || held === n) continue;
        (function(num){
          var b = document.createElement("button");
          b.className = "gx-key"; b.textContent = num;
          b.addEventListener("click", function(){ held = num; beep(600, 0.05); render(); var pb = el("mgPal"); });
          pal.appendChild(b);
        })(n);
      }
      if(held){
        var hb = document.createElement("div");
        hb.style.cssText = "text-align:center;width:100%;font-weight:800;color:var(--orange-d)";
        hb.textContent = "Holding: " + held + " — now tap a cell";
        pal.appendChild(hb);
      }
      el("mgPlaced").textContent = usedNums().length + " / 9";
    }
    function check(){
      if(board.some(function(v){ return v === 0; })) return;
      var lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      var allOk = lines.every(function(L){ return board[L[0]] + board[L[1]] + board[L[2]] === 15; });
      if(allOk){
        over = true; lvlSet(g.id, lvl + 1); winJingle();
        el("mgMsg").textContent = "Every line makes 15! Level " + lvl + " cleared. 🏆";
        el("mgNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
        el("mgNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
      } else {
        beep(240, 0.12);
        el("mgMsg").textContent = "The square is full, but some lines don't make 15. Tap a number to pick it back up and rearrange!";
      }
    }
    render();
  }

  /* ================= Binary Puzzle (Takuzu) ================= */
  function engBinary(g){
    var lvl = lvlOf(g.id);
    var N = lvl <= 2 ? 4 : 6, half = N / 2;
    var sol = [];
    for(var i = 0; i < N * N; i++) sol.push(-1);
    function okAt(idx, v){
      var x = idx % N, y = Math.floor(idx / N);
      var row = [], col = [], rCount = 0, cCount = 0, k;
      for(k = 0; k < N; k++){ var rv = sol[y * N + k]; row.push(rv); if(rv === v) rCount++; var cv = sol[k * N + x]; col.push(cv); if(cv === v) cCount++; }
      if(rCount > half || cCount > half) return false;
      row[x] = v; col[y] = v;
      for(k = 0; k + 2 < N; k++){
        if(row[k] === v && row[k + 1] === v && row[k + 2] === v) return false;
        if(col[k] === v && col[k + 1] === v && col[k + 2] === v) return false;
      }
      return true;
    }
    (function fill(idx){
      if(idx >= N * N) return true;
      var order = shuffleCopy([0, 1]);
      for(var t = 0; t < 2; t++){ if(okAt(idx, order[t])){ sol[idx] = order[t]; if(fill(idx + 1)) return true; sol[idx] = -1; } }
      return false;
    })(0);
    /* check full-solution row/col uniqueness; if duplicated, accept anyway (mini rules use the two stated rules only) */
    var removeCount = Math.round(N * N * 0.45);
    var given = {};
    shuffleCopy(sol.map(function(_, i){ return i; })).slice(0, N * N - removeCount).forEach(function(i){ given[i] = true; });
    var board = sol.map(function(v, i){ return given[i] ? v : -1; });
    var over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Level", lvl], ["Grid", N + "×" + N], ["Filled", '<b id="bnFilled"></b>']]) +
      '<div class="gx-grid" id="bnGrid" style="grid-template-columns:repeat(' + N + ',1fr);gap:3px"></div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="bnCheck">✓ Check</button></div>' +
      '<div class="msg" id="bnMsg">Tap a cell to cycle blank → 0 → 1. Rules: max ' + half + ' of each digit per row/column, and never 3 in a row.</div><div id="bnNext"></div>';
    var box = el("bnGrid");
    gameStopFn = function(){ over = true; };
    function render(){
      box.innerHTML = "";
      var filledCount = 0;
      board.forEach(function(v, idx){
        if(v >= 0) filledCount++;
        var b = document.createElement("button");
        b.className = "gx-cell"; b.style.fontSize = N === 6 ? "16px" : "21px";
        b.textContent = v < 0 ? "" : v;
        if(given[idx]){ b.style.background = "var(--chip)"; }
        else if(v >= 0){ b.style.color = "var(--teal-d)"; }
        b.addEventListener("click", function(){
          if(over || isPaused || given[idx]) return;
          board[idx] = board[idx] === -1 ? 0 : board[idx] === 0 ? 1 : -1;
          beep(620, 0.05); render();
        });
        box.appendChild(b);
      });
      el("bnFilled").textContent = filledCount + " / " + (N * N);
    }
    el("bnCheck").addEventListener("click", function(){
      if(over) return;
      tap();
      if(board.some(function(v){ return v < 0; })){ el("bnMsg").textContent = "Fill every cell first!"; return; }
      var bad = "";
      for(var y = 0; y < N && !bad; y++){
        var rc = [0, 0], cc = [0, 0];
        for(var x = 0; x < N; x++){ rc[board[y * N + x]]++; cc[board[x * N + y]]++; }
        if(rc[0] !== half || rc[1] !== half) bad = "Row " + (y + 1) + " doesn't have equal 0s and 1s.";
        else if(cc[0] !== half || cc[1] !== half) bad = "Column " + (y + 1) + " doesn't have equal 0s and 1s.";
        for(var k = 0; k + 2 < N && !bad; k++){
          if(board[y * N + k] === board[y * N + k + 1] && board[y * N + k] === board[y * N + k + 2]) bad = "Three in a row in row " + (y + 1) + "!";
          if(board[k * N + y] === board[(k + 1) * N + y] && board[k * N + y] === board[(k + 2) * N + y]) bad = "Three in a row in column " + (y + 1) + "!";
        }
      }
      if(!bad){
        over = true; lvlSet(g.id, lvl + 1); winJingle();
        el("bnMsg").textContent = "Perfect logic! Level " + lvl + " cleared. 🏆";
        el("bnNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
        el("bnNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
      } else {
        beep(240, 0.12);
        el("bnMsg").textContent = "Not yet: " + bad;
      }
    });
    render();
  }

  /* ================= Word Search ================= */
  function engWordSearch(g){
    var lvl = lvlOf(g.id);
    var setIdx = Math.min(SEARCH_SETS.length - 1, lvl - 1);
    var words = SEARCH_SETS[setIdx].slice(0, Math.min(SEARCH_SETS[setIdx].length, 3 + lvl));
    var N = Math.max(6, Math.max.apply(null, words.map(function(w){ return w.length; })) + 1 + Math.floor(lvl / 2));
    N = Math.min(9, N);
    var grid = [];
    for(var i = 0; i < N * N; i++) grid.push("");
    var placed = [];
    words.forEach(function(w){
      var done = false, guard = 0;
      while(!done && guard++ < 200){
        var horiz = Math.random() < 0.6;
        var x = rnd(N - (horiz ? w.length : 1) + (horiz ? 1 : 0));
        var y = rnd(N - (horiz ? 1 : w.length) + (horiz ? 0 : 1));
        if(horiz) x = rnd(N - w.length + 1); else y = rnd(N - w.length + 1);
        var fits = true;
        for(var k = 0; k < w.length; k++){
          var idx = horiz ? y * N + x + k : (y + k) * N + x;
          if(grid[idx] && grid[idx] !== w[k]){ fits = false; break; }
        }
        if(fits){
          for(var k2 = 0; k2 < w.length; k2++){ grid[horiz ? y * N + x + k2 : (y + k2) * N + x] = w[k2]; }
          done = true; placed.push(w);
        }
      }
    });
    words = placed;
    for(var j = 0; j < N * N; j++) if(!grid[j]) grid[j] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[rnd(26)];
    var foundWords = {}, selPath = [], over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Level", lvl], ["Found", '<b id="wsFound">0</b> / ' + words.length], ["Words", words.length]]) +
      '<div id="wsList" style="text-align:center;font-weight:800;margin:4px 0"></div>' +
      '<div class="gx-grid" id="wsGrid" style="grid-template-columns:repeat(' + N + ',1fr);gap:3px"></div>' +
      '<div class="msg" id="wsMsg">Tap the letters of a word in order — across or down.</div><div id="wsNext"></div>';
    var box = el("wsGrid");
    gameStopFn = function(){ over = true; };
    function renderList(){
      el("wsList").innerHTML = words.map(function(w){
        return '<span style="display:inline-block;margin:2px 4px;padding:3px 9px;border-radius:99px;background:var(--chip);color:' + (foundWords[w] ? "var(--muted)" : "var(--ink)") + ';font-size:13px;' + (foundWords[w] ? "text-decoration:line-through" : "") + '">' + w + '</span>';
      }).join("");
    }
    var cellEls = [];
    grid.forEach(function(ch, idx){
      var b = document.createElement("button");
      b.className = "gx-cell"; b.style.fontSize = N >= 8 ? "14px" : "17px"; b.textContent = ch;
      b.addEventListener("click", function(){
        if(over || isPaused) return;
        if(selPath.length){
          var last = selPath[selPath.length - 1];
          var lx = last % N, ly = Math.floor(last / N), x = idx % N, y = Math.floor(idx / N);
          if(Math.abs(lx - x) + Math.abs(ly - y) !== 1){ selPath = []; }
          if(selPath.length && selPath.indexOf(idx) >= 0){ selPath = []; }
        }
        selPath.push(idx);
        var str = selPath.map(function(ci){ return grid[ci]; }).join("");
        var isPrefix = words.some(function(w){ return !foundWords[w] && w.indexOf(str) === 0; });
        if(!isPrefix){ selPath = [idx]; str = grid[idx]; isPrefix = words.some(function(w){ return !foundWords[w] && w.indexOf(str) === 0; }); if(!isPrefix){ selPath = []; } }
        beep(600 + selPath.length * 30, 0.04);
        cellEls.forEach(function(c, ci){ c.classList.toggle("sel", selPath.indexOf(ci) >= 0); });
        var hit = words.filter(function(w){ return !foundWords[w] && w === str; })[0];
        if(hit){
          foundWords[hit] = true;
          selPath.forEach(function(ci){ cellEls[ci].classList.add("good"); });
          selPath = [];
          el("wsFound").textContent = Object.keys(foundWords).length;
          beep(920, 0.1);
          renderList();
          el("wsMsg").textContent = "Found " + hit + "! " + (words.length - Object.keys(foundWords).length) + " to go.";
          if(Object.keys(foundWords).length === words.length){
            over = true; lvlSet(g.id, lvl + 1); winJingle();
            el("wsMsg").textContent = "All words found! Level " + lvl + " cleared. 🏆";
            el("wsNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
            el("wsNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          }
        }
      });
      cellEls.push(b); box.appendChild(b);
    });
    renderList();
  }

  /* ================= Word Scramble ================= */
  function engScramble(g){
    var lvl = lvlOf(g.id);
    var word = pick(lvl <= 1 ? WORDS_EASY : lvl === 2 ? WORDS_MED : WORDS_HARD);
    var letters = shuffleCopy(word.split(""));
    if(letters.join("") === word) letters.reverse();
    var built = [], usedIdx = [], hearts = 3, over = false, hintUsed = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Level", lvl], ["Hearts", '<b id="scHearts">♥♥♥</b>'], ["Letters", word.length]]) +
      '<div class="gx-big" id="scBuilt" style="letter-spacing:4px;font-size:32px">' + "_ ".repeat(word.length).trim() + '</div>' +
      '<div class="gx-keyrow" id="scTiles"></div>' +
      '<div class="msg" id="scMsg">Tap the letters in the right order to rebuild the word.</div>' +
      '<div class="btn-row"><button class="mini-btn" id="scUndo">⌫ Undo</button><button class="mini-btn" id="scHint">💡 Hint</button></div><div id="scNext"></div>';
    var tilesEl = el("scTiles");
    gameStopFn = function(){ over = true; };
    function renderTiles(){
      tilesEl.innerHTML = "";
      letters.forEach(function(ch, i){
        var b = document.createElement("button");
        b.className = "gx-key"; b.textContent = ch;
        if(usedIdx.indexOf(i) >= 0) b.disabled = true;
        b.addEventListener("click", function(){
          if(over || isPaused) return;
          var pos = built.length;
          if(word[pos] === ch){
            built.push(ch); usedIdx.push(i);
            beep(700 + pos * 40, 0.05);
            el("scBuilt").textContent = built.join("") + " " + "_ ".repeat(word.length - built.length).trim();
            renderTiles();
            if(built.length === word.length){
              over = true; lvlSet(g.id, lvl + 1); winJingle();
              el("scMsg").textContent = "The word was " + word + "! Level " + lvl + " cleared. 🏆";
              el("scNext").innerHTML = nextLevelBtn("▶ Next Word — Level " + (lvl + 1));
              el("scNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
            }
          } else {
            hearts--; el("scHearts").textContent = "♥".repeat(Math.max(0, hearts)) || "—";
            beep(220, 0.13);
            el("scMsg").textContent = "That letter doesn't come next. " + hearts + " hearts left.";
            if(hearts <= 0){ over = true; showGameOver("Out of hearts! The word was " + word + "."); }
          }
        });
        tilesEl.appendChild(b);
      });
    }
    el("scUndo").addEventListener("click", function(){
      if(over || !built.length) return;
      built.pop(); usedIdx.pop();
      el("scBuilt").textContent = (built.join("") + " " + "_ ".repeat(word.length - built.length)).trim();
      renderTiles(); tap();
    });
    el("scHint").addEventListener("click", function(){
      if(over || hintUsed) return;
      hintUsed = true;
      el("scMsg").textContent = "Hint: the word starts with " + word[0] + " and has " + word.length + " letters. Category: everyday word.";
      tap();
    });
    renderTiles();
  }

  /* ================= Hangman ================= */
  var GALLOWS = [
    "", "  ═══════", "  ║\n  ═══════", "  ║  ╔═\n  ║\n  ═══════",
    "  ║  ╔═╗\n  ║  O\n  ║\n  ═══════", "  ║  ╔═╗\n  ║  O\n  ║  |\n  ═══════",
    "  ║  ╔═╗\n  ║  O\n  ║ /|\\\n  ═══════", "  ║  ╔═╗\n  ║  O\n  ║ /|\\\n  ║ / \\\n  ═══════"
  ];
  function engHangman(g){
    var lvl = lvlOf(g.id);
    var word = pick(lvl <= 1 ? WORDS_EASY : lvl === 2 ? WORDS_MED : WORDS_HARD);
    var maxMiss = Math.max(5, (state.difficulty === "Easy" ? 8 : state.difficulty === "Hard" ? 6 : 7) - Math.floor((lvl - 1) / 2));
    var guessed = {}, misses = 0, over = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Level", lvl], ["Misses", '<b id="hmMis">0</b> / ' + maxMiss], ["Letters", word.length]]) +
      '<pre id="hmArt" style="font-size:17px;line-height:1.25;text-align:center;margin:6px 0;min-height:96px;font-family:monospace"></pre>' +
      '<div class="gx-big" id="hmWord" style="letter-spacing:5px;font-size:30px"></div>' +
      '<div class="gx-keyrow" id="hmKeys"></div>' +
      '<div class="msg" id="hmMsg">Guess a letter!</div><div id="hmNext"></div>';
    var keysEl = el("hmKeys");
    gameStopFn = function(){ over = true; };
    function render(){
      el("hmArt").textContent = GALLOWS[Math.min(GALLOWS.length - 1, Math.round(misses / maxMiss * (GALLOWS.length - 1)))];
      el("hmWord").textContent = word.split("").map(function(ch){ return guessed[ch] ? ch : "_"; }).join(" ");
      el("hmMis").textContent = misses;
    }
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function(ch){
      var b = document.createElement("button");
      b.className = "gx-key"; b.style.minWidth = "36px"; b.style.height = "42px"; b.textContent = ch;
      b.addEventListener("click", function(){
        if(over || isPaused || guessed[ch]) return;
        guessed[ch] = true; b.disabled = true;
        if(word.indexOf(ch) >= 0){
          beep(820, 0.06); b.style.borderColor = "var(--green)";
          render();
          if(word.split("").every(function(c){ return guessed[c]; })){
            over = true; lvlSet(g.id, lvl + 1); winJingle();
            el("hmMsg").textContent = "You saved the day — the word was " + word + "! Level " + lvl + " cleared. 🏆";
            el("hmNext").innerHTML = nextLevelBtn("▶ Next Word — Level " + (lvl + 1));
            el("hmNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          }
        } else {
          misses++; beep(220, 0.12); b.style.borderColor = "#D90429"; b.style.opacity = ".55";
          render();
          if(misses >= maxMiss){ over = true; el("hmWord").textContent = word.split("").join(" "); showGameOver("The drawing is complete! The word was " + word + "."); }
          else el("hmMsg").textContent = "No " + ch + " in the word. " + (maxMiss - misses) + " misses left.";
        }
      });
      keysEl.appendChild(b);
    });
    render();
  }


  /* ================= Canvas helpers ================= */
  function cvSetup(id, w, h){
    var cv = el(id); var ctx = cv.getContext("2d");
    return { cv: cv, ctx: ctx, W: w, H: h };
  }
  function cvPoint(cv, e){
    var r = cv.getBoundingClientRect();
    var src = (e.touches && e.touches[0]) ? e.touches[0] : e;
    return { x: (src.clientX - r.left) / r.width * cv.width, y: (src.clientY - r.top) / r.height * cv.height };
  }

  /* ================= Dodge (car / space / boat / f1 time trial) ================= */
  var DODGE_THEMES = {
    car:  { bg:"#263238", lane:"rgba(255,255,255,.35)", you:"🚗", obs:["🚙","🚕","🚛","🚐"], goal:true, name:"traffic" },
    space:{ bg:"#0B0F2E", lane:"rgba(255,255,255,.12)", you:"🚀", obs:["🪨","☄️","🌑"], goal:true, name:"meteors" },
    boat: { bg:"#0277BD", lane:"rgba(255,255,255,.25)", you:"🚤", obs:["🪨","🛟","🪵"], goal:false, name:"rocks" },
    f1:   { bg:"#37474F", lane:"rgba(255,193,49,.4)", you:"🏎️", obs:["🚗","🚙","🚕"], goal:true, name:"cars", trial:true }
  };
  function engDodge(g){
    var th = DODGE_THEMES[g.theme] || DODGE_THEMES.car;
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var goal = th.goal ? 700 + lvl * 350 : Infinity;
    var timeLeft = th.trial ? 40 + lvl * 5 : 0;
    var lives = th.trial ? 3 : 1;
    var lane = 1, targetX = 160, px = 160, dist = 0, score = 0, obs = [], running = false, over = false, invuln = 0;
    var speed = (state.difficulty === "Easy" ? 2.6 : state.difficulty === "Hard" ? 4.2 : 3.4) + (lvl - 1) * 0.35;
    var spawnEvery = state.difficulty === "Hard" ? 46 : 58, frame = 0, raf = null, lastTs = 0, msAcc = 0, spawnAcc = 0;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Distance", '<b id="dgDist">0</b>m'], [th.trial ? "Time" : (th.goal ? "Goal" : "Lives"), th.trial ? '<b id="dgMid">' + timeLeft + '</b>s' : (th.goal ? goal + "m" : '<b id="dgMid">' + lives + '</b>')], ["Level", g.levels ? lvl : "—"]]) +
      '<canvas id="dgCv" class="gcanvas" width="320" height="420" aria-label="' + g.name + ' game area"></canvas>' +
      '<div class="msg" id="dgMsg">Tap Start, then steer with ◀ ▶ or by tapping the sides.</div>' +
      '<div class="btn-row"><button class="mini-btn" id="dgL">◀ Left</button><button class="mini-btn orange" id="dgStart">▶ Start</button><button class="mini-btn" id="dgR">Right ▶</button></div><div id="dgNext"></div>';
    var C = cvSetup("dgCv", 320, 420), ctx = C.ctx;
    var laneX = [58, 160, 262];
    function draw(){
      ctx.fillStyle = th.bg; ctx.fillRect(0, 0, 320, 420);
      ctx.strokeStyle = th.lane; ctx.lineWidth = 3; ctx.setLineDash([18, 22]); ctx.lineDashOffset = -dist * 2;
      [106, 213].forEach(function(x){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 420); ctx.stroke(); });
      ctx.setLineDash([]);
      if(g.theme === "space"){ ctx.fillStyle = "rgba(255,255,255,.7)"; for(var s = 0; s < 24; s++){ ctx.fillRect((s * 67 + 30) % 320, (s * 97 + dist * 1.5) % 420, 2, 2); } }
      ctx.font = "34px serif"; ctx.textAlign = "center";
      obs.forEach(function(o){ ctx.fillText(o.e, o.x, o.y + 12); });
      if(!(invuln > 0 && Math.floor(frame / 6) % 2 === 0)){
        ctx.font = "40px serif";
        ctx.fillText(th.you, px, 388);
      }
      if(th.goal){
        ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fillRect(10, 8, 300, 7);
        ctx.fillStyle = "#3CB54A"; ctx.fillRect(10, 8, Math.min(300, dist / goal * 300), 7);
      }
    }
    function crash(){
      lives--;
      var mid = el("dgMid"); if(mid && !th.goal && !th.trial) mid.textContent = lives;
      beep(160, 0.3);
      if(lives <= 0){
        over = true; stopLoop();
        showGameOver("Crash! You covered " + Math.floor(dist) + "m" + (th.goal ? " of " + goal + "m" : "") + ". Score: " + score + ".");
      } else {
        invuln = 90;
        obs = obs.filter(function(o){ return o.y < 240; });
        el("dgMsg").textContent = "Crash! " + lives + " " + (lives === 1 ? "life" : "lives") + " left — keep going!";
      }
    }
    function step(ts){
      if(!running || over) return;
      if(isPaused){ lastTs = ts; raf = requestAnimationFrame(step); return; }
      var dt = Math.min(50, ts - (lastTs || ts)); lastTs = ts;
      var f = dt / 16.7;
      frame++;
      px += (targetX - px) * Math.min(1, 0.3 * f);
      dist += speed * 1.6 * f;
      score = Math.floor(dist / 10);
      el("dgDist").textContent = Math.floor(dist);
      if(th.trial){
        msAcc += dt;
        while(msAcc >= 1000){
          msAcc -= 1000; timeLeft--;
          el("dgMid").textContent = Math.max(0, timeLeft);
          if(timeLeft <= 0){ over = true; stopLoop(); showGameOver("Time up at " + Math.floor(dist) + "m of " + goal + "m — so close!"); return; }
        }
      }
      if(invuln > 0) invuln -= f;
      spawnAcc += f;
      var spawnInt = Math.max(26, spawnEvery - lvl * 2);
      if(spawnAcc >= spawnInt){
        spawnAcc -= spawnInt;
        obs.push({ x: laneX[rnd(3)], y: -30, e: pick(th.obs) });
      }
      obs.forEach(function(o){ o.y += speed * 1.6 * f; });
      obs = obs.filter(function(o){ return o.y < 460; });
      for(var i = 0; i < obs.length; i++){
        if(invuln <= 0 && Math.abs(obs[i].x - px) < 30 && obs[i].y > 342 && obs[i].y < 396){ crash(); obs.splice(i, 1); break; }
      }
      if(th.goal && dist >= goal){
        over = true; stopLoop();
        lvlSet(g.id, lvl + 1); winJingle();
        el("dgMsg").textContent = "Finish! " + goal + "m covered — Level " + lvl + " cleared. 🏆";
        el("dgNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
        el("dgNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
        draw(); return;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over){ lastTs = 0; raf = requestAnimationFrame(step); } }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    function steer(dir){ lane = Math.max(0, Math.min(2, lane + dir)); targetX = laneX[lane]; beep(500, 0.04); }
    el("dgL").addEventListener("click", function(){ steer(-1); });
    el("dgR").addEventListener("click", function(){ steer(1); });
    C.cv.addEventListener("pointerdown", function(e){
      var p = cvPoint(C.cv, e);
      steer(p.x < 160 ? -1 : 1);
    });
    gameHooks.key = function(k){ if(k === "ArrowLeft") steer(-1); if(k === "ArrowRight") steer(1); };
    el("dgStart").addEventListener("click", function(){
      tap(); obs = []; dist = 0; score = 0; lane = 1; targetX = 160; px = 160;
      lives = th.trial ? 3 : 1; timeLeft = th.trial ? 40 + lvl * 5 : 0; invuln = 0; msAcc = 0; spawnAcc = 0;
      running = true; over = false;
      el("dgDist").textContent = "0";
      var mid = el("dgMid"); if(mid) mid.textContent = th.trial ? timeLeft : lives;
      el("dgStart").textContent = "↻ Restart";
      el("dgMsg").textContent = "Go! Dodge the " + th.name + "!";
      startLoop();
    });
    draw();
  }

  /* ================= Runner (runner / bike) ================= */
  var RUNNER_THEMES = {
    runner: { you:"🏃", obs:["🚧","🪨","🛢️"], sky:"#87CEEB", ground:"#8D6E63", goal:true },
    bike:   { you:"🏍️", obs:["🧱","🚧","🪨"], sky:"#FFD9A0", ground:"#6D4C41", goal:false }
  };
  function engRunner(g){
    var th = RUNNER_THEMES[g.theme] || RUNNER_THEMES.runner;
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var goal = th.goal ? 600 + lvl * 300 : Infinity;
    var px = 56, py = 0, vy = 0, jumps = 0, dist = 0, coins = 0, obs = [], items = [], running = false, over = false;
    var speed = (state.difficulty === "Easy" ? 3.4 : state.difficulty === "Hard" ? 5 : 4.2) + (lvl - 1) * 0.3;
    var frame = 0, raf = null, lastTs = 0, obsAcc = 0, itemAcc = 70;
    var GROUND = 252;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Distance", '<b id="rnDist">0</b>m'], ["Coins", '<b id="rnCoins">0</b>'], [th.goal ? "Goal" : "Level", th.goal ? goal + "m" : "—"]]) +
      '<canvas id="rnCv" class="gcanvas" width="320" height="300" aria-label="' + g.name + ' game area"></canvas>' +
      '<div class="msg" id="rnMsg">Tap Start — then tap anywhere (or Jump) to leap the obstacles!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="rnStart">▶ Start</button><button class="mini-btn" id="rnJump">⬆ Jump</button></div><div id="rnNext"></div>';
    var C = cvSetup("rnCv", 320, 300), ctx = C.ctx;
    function draw(){
      ctx.fillStyle = th.sky; ctx.fillRect(0, 0, 320, 300);
      ctx.fillStyle = "rgba(255,255,255,.8)";
      ctx.beginPath(); ctx.arc(40 - (dist % 360), 44, 17, 0, 7); ctx.arc(66 - (dist % 360), 40, 21, 0, 7); ctx.fill();
      ctx.fillStyle = th.ground; ctx.fillRect(0, GROUND + 14, 320, 36);
      ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.beginPath(); ctx.moveTo(0, GROUND + 14); ctx.lineTo(320, GROUND + 14); ctx.stroke();
      ctx.font = "30px serif"; ctx.textAlign = "center";
      items.forEach(function(it){ ctx.fillText("🪙", it.x, it.y); });
      obs.forEach(function(o){ ctx.fillText(o.e, o.x, GROUND + 12); });
      ctx.font = "38px serif";
      ctx.fillText(th.you, px, GROUND + 12 - py);
      if(th.goal){ ctx.fillStyle = "rgba(255,255,255,.3)"; ctx.fillRect(10, 8, 300, 7); ctx.fillStyle = "#3CB54A"; ctx.fillRect(10, 8, Math.min(300, dist / goal * 300), 7); }
    }
    function jump(){
      if(!running || over || isPaused) return;
      if(py <= 0){ vy = 11.5; jumps = 1; beep(520, 0.06); }
      else if(jumps === 1){ vy = 10; jumps = 2; beep(640, 0.06); }
    }
    function step(ts){
      if(!running || over) return;
      if(isPaused){ lastTs = ts; raf = requestAnimationFrame(step); return; }
      var dt = Math.min(50, ts - (lastTs || ts)); lastTs = ts;
      var f = dt / 16.7;
      frame++;
      dist += speed * 1.4 * f;
      el("rnDist").textContent = Math.floor(dist / 5);
      if(py > 0 || vy > 0){ py += vy * f; vy -= 0.55 * f; if(py <= 0){ py = 0; vy = 0; jumps = 0; } }
      obsAcc += f; if(obsAcc >= 95){ obsAcc -= 95; obs.push({ x: 345, e: pick(th.obs) }); }
      itemAcc += f; if(itemAcc >= 130){ itemAcc -= 130; items.push({ x: 345, y: GROUND - 26 - rnd(3) * 22 }); }
      obs.forEach(function(o){ o.x -= speed * 1.4 * f; });
      items.forEach(function(it){ it.x -= speed * 1.4 * f; });
      for(var i = 0; i < items.length; i++){
        if(Math.abs(items[i].x - px) < 30 && Math.abs((GROUND - py) - items[i].y) < 44){ coins++; el("rnCoins").textContent = coins; beep(1180, 0.06); items.splice(i, 1); i--; }
      }
      items = items.filter(function(it){ return it.x > -30; });
      for(var j = 0; j < obs.length; j++){
        if(Math.abs(obs[j].x - px) < 27 && py < 30){
          over = true; stopLoop(); beep(150, 0.3);
          showGameOver("Crash at " + Math.floor(dist / 5) + "m with " + coins + " coins. " + (th.goal ? "Goal was " + goal + "m." : ""));
          draw(); return;
        }
      }
      obs = obs.filter(function(o){ return o.x > -30; });
      if(th.goal && dist / 5 >= goal){
        over = true; stopLoop(); lvlSet(g.id, lvl + 1); winJingle();
        el("rnMsg").textContent = "Finish! " + goal + "m with " + coins + " coins — Level " + lvl + " cleared. 🏆";
        el("rnNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
        el("rnNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
        draw(); return;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over) raf = requestAnimationFrame(step); }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    C.cv.addEventListener("pointerdown", function(){ jump(); });
    el("rnJump").addEventListener("click", jump);
    gameHooks.key = function(k){ if(k === "Space" || k === "ArrowUp") jump(); };
    el("rnStart").addEventListener("click", function(){
      tap(); obs = []; items = []; dist = 0; coins = 0; py = 0; vy = 0;
      running = true; over = false;
      el("rnDist").textContent = "0"; el("rnCoins").textContent = "0";
      el("rnStart").textContent = "↻ Restart";
      el("rnMsg").textContent = "Run! Tap to jump — double-tap for a higher leap.";
      startLoop();
    });
    draw();
  }

  /* ================= Catch (fruit / coin) ================= */
  var CATCH_THEMES = {
    fruit: { basket:"🧺", good:["🍎","🍊","🍌","🍇","🍓"], bad:"💣", gold:null, bg:"#FFF8E8", level:true, goodName:"fruit" },
    coin:  { basket:"🧰", good:["🪙"], bad:"🪨", gold:"💰", bg:"#FFF3D6", level:false, goodName:"coins" }
  };
  function engCatch(g){
    var th = CATCH_THEMES[g.theme] || CATCH_THEMES.fruit;
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var target = th.level ? 8 + lvl * 2 : Infinity;
    var bx = 160, items = [], caught = 0, missed = 0, score = 0, running = false, over = false;
    var timeLeft = th.level ? 0 : 45, frame = 0, raf = null, lastTs = 0, msAcc = 0, spawnAcc = 0;
    var fall = (state.difficulty === "Easy" ? 2 : state.difficulty === "Hard" ? 3.2 : 2.6) + (lvl - 1) * 0.25;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([[th.level ? "Caught" : "Score", '<b id="ctMain">0</b>' + (th.level ? " / " + target : "")], [th.level ? "Missed" : "Time", th.level ? '<b id="ctMid">0</b> / 3' : '<b id="ctMid">45</b>s'], ["Level", g.levels ? lvl : "—"]]) +
      '<canvas id="ctCv" class="gcanvas" width="320" height="380" aria-label="' + g.name + ' game area"></canvas>' +
      '<div class="msg" id="ctMsg">Drag on the field (or use ◀ ▶) to move. Catch the good ones, dodge the bad!</div>' +
      '<div class="btn-row"><button class="mini-btn" id="ctL">◀</button><button class="mini-btn orange" id="ctStart">▶ Start</button><button class="mini-btn" id="ctR">▶</button></div><div id="ctNext"></div>';
    var C = cvSetup("ctCv", 320, 380), ctx = C.ctx;
    function draw(){
      ctx.fillStyle = th.bg; ctx.fillRect(0, 0, 320, 380);
      ctx.fillStyle = "rgba(0,0,0,.06)"; ctx.fillRect(0, 348, 320, 32);
      ctx.font = "28px serif"; ctx.textAlign = "center";
      items.forEach(function(it){ ctx.fillText(it.e, it.x, it.y); });
      ctx.font = "42px serif";
      ctx.fillText(th.basket, bx, 356);
    }
    function endLose(reason){
      over = true; stopLoop();
      showGameOver(reason + " You caught " + caught + " " + th.goodName + " (score " + score + ").");
    }
    function step(ts){
      if(!running || over) return;
      if(isPaused){ lastTs = ts; raf = requestAnimationFrame(step); return; }
      var dt = Math.min(50, ts - (lastTs || ts)); lastTs = ts;
      var f = dt / 16.7;
      frame++;
      if(!th.level){
        msAcc += dt;
        while(msAcc >= 1000){
          msAcc -= 1000; timeLeft--; el("ctMid").textContent = Math.max(0, timeLeft);
          if(timeLeft <= 0){ over = true; stopLoop(); showGameOver("Time! You scored " + score + " with " + caught + " catches."); draw(); return; }
        }
      }
      spawnAcc += f;
      var spawnInt = Math.max(30, 52 - lvl * 2);
      if(spawnAcc >= spawnInt){
        spawnAcc -= spawnInt;
        var bad = Math.random() < 0.22;
        var gold = !bad && th.gold && Math.random() < 0.16;
        items.push({ x: 24 + rnd(272), y: -16, e: bad ? th.bad : (gold ? th.gold : pick(th.good)), bad: bad, gold: gold, vy: fall * (0.85 + Math.random() * 0.4) });
      }
      items.forEach(function(it){ it.y += it.vy * f; });
      for(var i = items.length - 1; i >= 0; i--){
        var it = items[i];
        if(it.y > 322 && it.y < 362 && Math.abs(it.x - bx) < 40){
          if(it.bad){ missed++; beep(170, 0.2); el("ctMsg").textContent = "Ouch — that was a " + (g.theme === "fruit" ? "bomb" : "stone") + "!"; }
          else { caught++; score += it.gold ? 5 : 1; beep(it.gold ? 1240 : 900, 0.06); }
          items.splice(i, 1);
        } else if(it.y > 380){
          if(!it.bad && th.level){ missed++; el("ctMsg").textContent = "Missed one!"; }
          items.splice(i, 1);
        }
      }
      el("ctMain").textContent = th.level ? caught : score;
      if(th.level) el("ctMid").textContent = missed + " / 3";
      if(missed >= 3){ endLose(th.level ? "Three misses!" : "Three hits from the bad ones!"); draw(); return; }
      if(th.level && caught >= target){
        over = true; stopLoop(); lvlSet(g.id, lvl + 1); winJingle();
        el("ctMsg").textContent = "Harvest complete — " + target + " caught! Level " + lvl + " cleared. 🏆";
        el("ctNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
        el("ctNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
        draw(); return;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over) raf = requestAnimationFrame(step); }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    var dragging = false;
    C.cv.addEventListener("pointerdown", function(e){ dragging = true; bx = Math.max(28, Math.min(292, cvPoint(C.cv, e).x)); draw(); });
    C.cv.addEventListener("pointermove", function(e){ if(dragging){ bx = Math.max(28, Math.min(292, cvPoint(C.cv, e).x)); if(!running) draw(); } });
    C.cv.addEventListener("pointerup", function(){ dragging = false; });
    C.cv.addEventListener("pointerleave", function(){ dragging = false; });
    function holdBtn(id, dir){
      var b = el(id), iv = null;
      b.addEventListener("pointerdown", function(){ iv = setInterval(function(){ bx = Math.max(28, Math.min(292, bx + dir * 9)); if(!running) draw(); }, 30); });
      ["pointerup","pointerleave","pointercancel"].forEach(function(ev){ b.addEventListener(ev, function(){ if(iv) clearInterval(iv); }); });
    }
    holdBtn("ctL", -1); holdBtn("ctR", 1);
    el("ctStart").addEventListener("click", function(){
      tap(); items = []; caught = 0; missed = 0; score = 0; timeLeft = 45; msAcc = 0; spawnAcc = 0;
      running = true; over = false;
      el("ctMain").textContent = "0";
      el("ctMid").textContent = th.level ? "0 / 3" : "45";
      el("ctStart").textContent = "↻ Restart";
      el("ctMsg").textContent = "Catch the " + th.goodName + "!";
      startLoop();
    });
    draw();
  }

  /* ================= Tap Targets (rise / fall / approach / range / snipe) ================= */
  function engTap(g){
    var mode = g.theme;
    var lvl = g.levels ? lvlOf(g.id) : 1;
    var target = mode === "rise" ? 26 + lvl * 6 : mode === "fall" ? 24 + lvl * 6 : 0;
    var waveTotal = mode === "approach" ? 7 + lvl * 3 : 0;
    var score = 0, lives = 3, spawned = 0, killed = 0, escaped = 0, castleHp = 3;
    var timeLeft = mode === "approach" ? 0 : 45, running = false, over = false, frame = 0, raf = null, lastTs = 0, msAcc = 0, spawnAcc = 0;
    var ents = [];
    playTitle.textContent = g.name + " — play!";
    var midHud = mode === "approach" ? ["Castle", '<b id="tpMid">♥♥♥</b>'] : mode === "fall" || mode === "rise" ? ["Target", target] : ["Time", '<b id="tpMid">45</b>s'];
    playBody.innerHTML =
      hudLine([["Score", '<b id="tpScore">0</b>'], midHud, ["Level", g.levels ? lvl : "—"]]) +
      '<canvas id="tpCv" class="gcanvas" width="320" height="400" aria-label="' + g.name + ' game area"></canvas>' +
      '<div class="msg" id="tpMsg"></div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="tpStart">▶ Start</button></div><div id="tpNext"></div>';
    var C = cvSetup("tpCv", 320, 400), ctx = C.ctx;
    el("tpMsg").textContent =
      mode === "rise" ? "Pop balloons before they escape! Gold = +5, black = −3. Reach " + target + " points!" :
      mode === "fall" ? "Tap fruit to slice it (+1). NEVER tap a bomb — 3 lives! Reach " + target + " points!" :
      mode === "approach" ? "Zap the monsters before they reach your castle! Wave of " + waveTotal + "." :
      mode === "range" ? "Targets glide past — smaller and faster = more points. 45 seconds!" :
      "Targets flash briefly — tap them before they vanish. 45 seconds!";
    var BGS = { rise:"#BDE7FF", fall:"#EAF7E0", approach:"#241B3A", range:"#F3E5D8", snipe:"#31424E" };
    function draw(){
      ctx.fillStyle = BGS[mode]; ctx.fillRect(0, 0, 320, 400);
      ctx.textAlign = "center";
      if(mode === "approach"){
        ctx.font = "44px serif"; ctx.fillText("🏰", 160, 392);
        ctx.fillStyle = "rgba(255,255,255,.08)"; ctx.fillRect(0, 356, 320, 3);
      }
      ents.forEach(function(e){
        if(mode === "rise"){
          ctx.beginPath(); ctx.fillStyle = e.gold ? "#FFC531" : e.bad ? "#263238" : e.color;
          ctx.ellipse(e.x, e.y, e.r, e.r * 1.18, 0, 0, 7); ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,.5)"; ctx.beginPath(); ctx.ellipse(e.x - e.r * 0.35, e.y - e.r * 0.45, e.r * 0.22, e.r * 0.3, 0, 0, 7); ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.moveTo(e.x, e.y + e.r * 1.18); ctx.lineTo(e.x + 3, e.y + e.r * 1.18 + 12); ctx.stroke();
          if(e.bad){ ctx.fillStyle = "#FF5252"; ctx.font = "15px serif"; ctx.fillText("☠", e.x, e.y + 5); }
        } else if(mode === "fall"){
          ctx.font = (e.bad ? "30px" : "32px") + " serif"; ctx.fillText(e.bad ? "💣" : e.e, e.x, e.y);
        } else if(mode === "approach"){
          ctx.font = (e.hp > 1 ? "40px" : "32px") + " serif"; ctx.fillText(e.e, e.x, e.y);
        } else {
          ctx.beginPath(); ctx.fillStyle = "#fff"; ctx.arc(e.x, e.y, e.r, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.fillStyle = "#E5322D"; ctx.arc(e.x, e.y, e.r * 0.68, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.fillStyle = "#fff"; ctx.arc(e.x, e.y, e.r * 0.4, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.fillStyle = "#E5322D"; ctx.arc(e.x, e.y, e.r * 0.16, 0, 7); ctx.fill();
        }
      });
    }
    var BCOLORS = ["#E5322D","#2E9BFF","#3CB54A","#FF5A7A","#7C4DBD","#FF8A3C"];
    function spawn(){
      if(mode === "rise"){
        var bad = Math.random() < 0.13, gold = !bad && Math.random() < 0.15;
        ents.push({ x: 30 + rnd(260), y: 428, r: 15 + rnd(9), vy: (1.1 + Math.random() + lvl * 0.12) * (state.difficulty === "Hard" ? 1.3 : 1), gold: gold, bad: bad, color: pick(BCOLORS) });
      } else if(mode === "fall"){
        var isBad = Math.random() < 0.2;
        ents.push({ x: 26 + rnd(268), y: -20, vy: 1.6 + Math.random() * 1.4 + lvl * 0.15, e: pick(["🍎","🍊","🍉","🍇","🍓","🥝"]), bad: isBad, sway: rnd(60) });
      } else if(mode === "approach"){
        if(spawned >= waveTotal) return;
        spawned++;
        var big = Math.random() < 0.25;
        ents.push({ x: 30 + rnd(260), y: -24, vy: (0.55 + Math.random() * 0.5 + lvl * 0.08) * (state.difficulty === "Hard" ? 1.25 : 1), e: pick(["👾","👹","🧌","💀"]), hp: big ? 2 : 1 });
      } else if(mode === "range"){
        var r = pick([13, 17, 22, 28]);
        ents.push({ x: Math.random() < 0.5 ? -30 : 350, y: 50 + rnd(300), r: r, vx: (Math.random() < 0.5 ? 1 : -1) * (1.2 + (30 - r) * 0.08) * (state.difficulty === "Hard" ? 1.3 : 1) });
        ents[ents.length - 1].vx = (ents[ents.length - 1].x < 0 ? 1 : -1) * Math.abs(ents[ents.length - 1].vx);
      } else { /* snipe */
        ents.push({ x: 30 + rnd(260), y: 40 + rnd(320), r: pick([11, 14, 18, 24]), life: 70 - Math.min(25, lvl * 2) });
      }
    }
    function winLevel(){
      over = true; stopLoop(); lvlSet(g.id, lvl + 1); winJingle();
      el("tpMsg").textContent = "Level " + lvl + " cleared with " + score + " points! 🏆";
      el("tpNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
      el("tpNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
      draw();
    }
    function step(ts){
      if(!running || over) return;
      if(isPaused){ lastTs = ts; raf = requestAnimationFrame(step); return; }
      var dt = Math.min(50, ts - (lastTs || ts)); lastTs = ts;
      var f = dt / 16.7;
      frame++;
      if(mode !== "approach"){
        msAcc += dt;
        while(msAcc >= 1000){
          msAcc -= 1000; timeLeft--;
          var mid = el("tpMid"); if(mid) mid.textContent = Math.max(0, timeLeft);
          if(timeLeft <= 0){
            over = true; stopLoop();
            if((mode === "rise" || mode === "fall") && score >= target) winLevel();
            else showGameOver("Time up! You scored " + score + ((mode === "rise" || mode === "fall") ? " — target was " + target : "") + ".");
            draw(); return;
          }
        }
      }
      var every = mode === "rise" ? Math.max(30, 52 - lvl * 3) : mode === "fall" ? Math.max(34, 56 - lvl * 3) : mode === "approach" ? Math.max(42, 78 - lvl * 4) : mode === "range" ? 66 : 52;
      spawnAcc += f;
      if(spawnAcc >= every){ spawnAcc -= every; spawn(); }
      for(var i = ents.length - 1; i >= 0; i--){
        var e = ents[i];
        if(mode === "rise"){
          e.y -= e.vy * f;
          if(e.y < -30){ ents.splice(i, 1); if(!e.bad){ escaped++; if(escaped >= 6){ over = true; stopLoop(); showGameOver("Six balloons escaped! You scored " + score + "."); draw(); return; } } }
        } else if(mode === "fall"){
          e.y += e.vy * f; e.x += Math.sin((frame + e.sway) / 22) * 0.5 * f;
          if(e.y > 424) ents.splice(i, 1);
        } else if(mode === "approach"){
          e.y += e.vy * f;
          if(e.y > 348){
            ents.splice(i, 1); castleHp--;
            el("tpMid").textContent = "♥".repeat(Math.max(0, castleHp)) || "—";
            beep(150, 0.25);
            if(castleHp <= 0){ over = true; stopLoop(); showGameOver("The castle has fallen! You zapped " + killed + " of " + waveTotal + " monsters."); draw(); return; }
          }
        } else if(mode === "range"){
          e.x += e.vx * f;
          if(e.x < -44 || e.x > 364) ents.splice(i, 1);
        } else {
          e.life -= f;
          if(e.life <= 0) ents.splice(i, 1);
        }
      }
      if(mode === "approach" && spawned >= waveTotal && ents.length === 0 && running){
        winLevel(); return;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over) raf = requestAnimationFrame(step); }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    C.cv.addEventListener("pointerdown", function(e){
      if(!running || over || isPaused) return;
      var p = cvPoint(C.cv, e);
      for(var i = ents.length - 1; i >= 0; i--){
        var en = ents[i];
        var rr = mode === "rise" ? en.r * 1.25 : mode === "range" || mode === "snipe" ? en.r + 5 : 26;
        if(Math.hypot(en.x - p.x, en.y - p.y) <= rr){
          if(mode === "rise"){
            if(en.bad){ score = Math.max(0, score - 3); beep(180, 0.15); el("tpMsg").textContent = "Black balloon! −3 points."; }
            else { score += en.gold ? 5 : 1; beep(en.gold ? 1240 : 950, 0.06); }
            ents.splice(i, 1);
          } else if(mode === "fall"){
            if(en.bad){
              lives--; beep(150, 0.25);
              el("tpMsg").textContent = "BOOM! That was a bomb — " + lives + " lives left.";
              ents.splice(i, 1);
              if(lives <= 0){ over = true; stopLoop(); showGameOver("Three bombs! You scored " + score + "."); draw(); return; }
            } else { score += 1; beep(980, 0.05); ents.splice(i, 1); }
          } else if(mode === "approach"){
            en.hp--; beep(700, 0.05);
            if(en.hp <= 0){ killed++; score += en.hp === 0 ? 2 : 2; ents.splice(i, 1); }
          } else {
            score += en.r <= 13 ? 5 : en.r <= 17 ? 3 : 2;
            beep(1050, 0.05);
            ents.splice(i, 1);
          }
          el("tpScore").textContent = score;
          if((mode === "rise" || mode === "fall") && score >= target){ winLevel(); }
          draw();
          return;
        }
      }
    });
    el("tpStart").addEventListener("click", function(){
      tap(); ents = []; score = 0; lives = 3; spawned = 0; killed = 0; escaped = 0; castleHp = 3; timeLeft = 45; msAcc = 0; spawnAcc = 0;
      running = true; over = false;
      el("tpScore").textContent = "0";
      var mid = el("tpMid"); if(mid) mid.textContent = mode === "approach" ? "♥♥♥" : "45";
      el("tpStart").textContent = "↻ Restart";
      startLoop();
    });
    draw();
  }

  /* ================= Stack Tower ================= */
  function engStack(g){
    var W = 300, blockH = 22, baseW = 170;
    var stack = [], cur = null, dir = 1, speed = state.difficulty === "Easy" ? 1.7 : state.difficulty === "Hard" ? 3 : 2.3;
    var running = false, over = false, timer = null, score = 0;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Height", '<b id="stScore">0</b>'], ["Best width", '<b id="stW">' + baseW + '</b>px'], ["Speed", state.difficulty]]) +
      '<div id="stWrap" style="position:relative;height:320px;background:linear-gradient(180deg,#1E3A6E,#0F1D38);border-radius:12px;overflow:hidden;max-width:320px;margin:0 auto">' +
      '<div id="stTower" style="position:absolute;left:50%;transform:translateX(-50%);bottom:0;width:300px;height:100%"></div></div>' +
      '<div class="msg" id="stMsg">Tap Start, then tap DROP when the sliding block lines up!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="stStart">▶ Start</button><button class="mini-btn" id="stDrop">⬇ DROP</button></div>';
    var tower = el("stTower");
    var COLORS = ["#E5322D","#FF8A3C","#FFC531","#3CB54A","#2E9BFF","#7C4DBD","#FF5A7A"];
    gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
    function addBlock(x, w, yIdx){
      var d = document.createElement("div");
      d.style.cssText = "position:absolute;height:" + blockH + "px;border-radius:5px;background:" + COLORS[yIdx % COLORS.length] + ";box-shadow:inset 0 -4px 0 rgba(0,0,0,.22);left:" + (x + (W - 300) / 2 + 0) + "px;width:" + w + "px;bottom:" + (yIdx * blockH) + "px";
      d.style.left = ((300 - W) / 2 + x + 150 - 150) + "px";
      d.style.left = (x + 0) + "px";
      tower.appendChild(d);
      return d;
    }
    function render(){
      tower.innerHTML = "";
      tower.style.transform = "translateX(-50%) translateY(" + Math.max(0, (stack.length - 12) * blockH) + "px)";
      stack.forEach(function(b, i){ addBlock(b.x, b.w, i); });
      if(cur) addBlock(cur.x, cur.w, stack.length);
    }
    function spawnCur(){
      var prev = stack[stack.length - 1];
      cur = { x: 0, w: prev.w };
      dir = 1;
    }
    function tick(){
      if(!cur || over) return;
      if(isPaused) return;
      cur.x += dir * speed;
      if(cur.x <= 0){ cur.x = 0; dir = 1; }
      if(cur.x + cur.w >= W){ cur.x = W - cur.w; dir = -1; }
      render();
    }
    function drop(){
      if(!running || over || isPaused || !cur) return;
      var prev = stack[stack.length - 1];
      var left = Math.max(cur.x, prev.x), right = Math.min(cur.x + cur.w, prev.x + prev.w);
      var overlap = right - left;
      beep(500, 0.06);
      if(overlap <= 0){
        over = true; if(timer) clearInterval(timer);
        showGameOver("Complete miss! Your tower reached " + score + " blocks high.");
        return;
      }
      stack.push({ x: left, w: overlap });
      score = stack.length - 1;
      el("stScore").textContent = score;
      el("stW").textContent = Math.round(overlap);
      speed += 0.12;
      if(overlap < 14){
        over = true; if(timer) clearInterval(timer);
        showGameOver("The block was too thin to hold! Tower height: " + score + ".");
        return;
      }
      spawnCur(); render();
    }
    el("stDrop").addEventListener("click", drop);
    el("stWrap").addEventListener("pointerdown", drop);
    el("stStart").addEventListener("click", function(){
      tap(); if(timer) clearInterval(timer);
      stack = [{ x: (W - baseW) / 2, w: baseW }];
      score = 0; speed = state.difficulty === "Easy" ? 1.7 : state.difficulty === "Hard" ? 3 : 2.3;
      running = true; over = false;
      el("stScore").textContent = "0";
      el("stStart").textContent = "↻ Restart";
      el("stMsg").textContent = "Drop the blocks as squarely as you can!";
      spawnCur(); render();
      timer = setInterval(tick, 16);
    });
    stack = [{ x: (W - baseW) / 2, w: baseW }];
    render();
  }

  /* ================= Paddle Bounce ================= */
  function engBounce(g){
    var ball = { x: 160, y: 120, vx: 2.2, vy: 3 }, padX = 160, score = 0, running = false, over = false, raf = null;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Bounces", '<b id="bnScore">0</b>'], ["Speed", '<b id="bnSpd">1.0×</b>'], ["Best", '<b id="bnBest">' + bestOf(g.id) + '</b>']]) +
      '<canvas id="bnCv" class="gcanvas" width="320" height="360" aria-label="Paddle Bounce game area"></canvas>' +
      '<div class="msg" id="bnMsg">Drag on the field to move the paddle. Keep the ball up!</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="bnStart">▶ Start</button></div>';
    var C = cvSetup("bnCv", 320, 360), ctx = C.ctx;
    var best = bestOf(g.id);
    function draw(){
      ctx.fillStyle = "#FFF3D6"; ctx.fillRect(0, 0, 320, 360);
      ctx.fillStyle = "#FF6B1A";
      ctx.beginPath(); ctx.arc(ball.x, ball.y, 11, 0, 7); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.beginPath(); ctx.arc(ball.x - 4, ball.y - 4, 4, 0, 7); ctx.fill();
      ctx.fillStyle = "#07877B";
      ctx.fillRect(padX - 42, 330, 84, 12);
      ctx.fillStyle = "#00A99A"; ctx.fillRect(padX - 42, 330, 84, 5);
    }
    function step(){
      if(!running || over) return;
      if(isPaused){ raf = requestAnimationFrame(step); return; }
      ball.x += ball.vx; ball.y += ball.vy;
      ball.vy += 0.09;
      if(ball.x < 12){ ball.x = 12; ball.vx = Math.abs(ball.vx); }
      if(ball.x > 308){ ball.x = 308; ball.vx = -Math.abs(ball.vx); }
      if(ball.y < 12){ ball.y = 12; ball.vy = Math.abs(ball.vy); }
      if(ball.vy > 0 && ball.y > 318 && ball.y < 336 && Math.abs(ball.x - padX) < 52){
        ball.vy = -Math.abs(ball.vy) * 1.015 - 0.4;
        ball.vx += (ball.x - padX) / 26;
        ball.vx = Math.max(-4.4, Math.min(4.4, ball.vx));
        score++; el("bnScore").textContent = score;
        el("bnSpd").textContent = (Math.abs(ball.vy) / 3.4).toFixed(1) + "×";
        beep(760 + score * 4, 0.05);
      }
      if(ball.y > 372){
        over = true; stopLoop();
        best = Math.max(best, score); bestSet(g.id, best); el("bnBest").textContent = best;
        showGameOver("The ball got past you! Bounces: " + score + " (best " + best + ").");
        draw(); return;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over) raf = requestAnimationFrame(step); }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    C.cv.addEventListener("pointerdown", function(e){ padX = Math.max(42, Math.min(278, cvPoint(C.cv, e).x)); if(!running) draw(); });
    C.cv.addEventListener("pointermove", function(e){ if(e.buttons || e.pointerType === "touch"){ padX = Math.max(42, Math.min(278, cvPoint(C.cv, e).x)); if(!running) draw(); } });
    el("bnStart").addEventListener("click", function(){
      tap(); ball = { x: 160, y: 110, vx: 2.2, vy: 2.6 }; score = 0;
      running = true; over = false;
      el("bnScore").textContent = "0";
      el("bnStart").textContent = "↻ Restart";
      startLoop();
    });
    draw();
  }

  /* ================= Pong (solo wall / vs CPU table tennis) ================= */
  function engPong(g){
    var vsCpu = g.theme === "cpu";
    var ball = { x: 160, y: 200, vx: 2.4, vy: 3 }, padX = 160, cpuX = 160;
    var pScore = 0, cScore = 0, running = false, over = false, raf = null, serving = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine(vsCpu ? [["You", '<b id="pgYou">0</b>'], ["CPU", '<b id="pgCpu">0</b>'], ["First to", 11]] : [["Rallies", '<b id="pgYou">0</b>'], ["Best", '<b id="pgCpu">' + bestOf(g.id) + '</b>'], ["Mode", "Solo"]]) +
      '<canvas id="pgCv" class="gcanvas" width="320" height="400" aria-label="' + g.name + ' game area"></canvas>' +
      '<div class="msg" id="pgMsg">' + (vsCpu ? "First to 11 wins the match. Drag to move your paddle!" : "Return the ball against the wall — every return is a point!") + '</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="pgStart">▶ Start</button></div>';
    var C = cvSetup("pgCv", 320, 400), ctx = C.ctx;
    var best = bestOf(g.id), cpuSpeed = state.difficulty === "Easy" ? 2 : state.difficulty === "Hard" ? 3.6 : 2.8;
    function draw(){
      ctx.fillStyle = vsCpu ? "#1B5E20" : "#37474F"; ctx.fillRect(0, 0, 320, 400);
      ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.setLineDash([8, 8]);
      ctx.beginPath(); ctx.moveTo(0, 200); ctx.lineTo(320, 200); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "#FFC531"; ctx.fillRect(cpuX - 42, 14, 84, 11);
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ball.x, ball.y, 9, 0, 7); ctx.fill();
      ctx.fillStyle = "#2E9BFF"; ctx.fillRect(padX - 42, 375, 84, 11);
    }
    function serve(towardPlayer){
      ball.x = 160; ball.y = 200;
      var sp = 3 + Math.min(2.4, (pScore + cScore) * 0.12);
      ball.vx = (Math.random() < 0.5 ? -1 : 1) * (1.6 + Math.random());
      ball.vy = (towardPlayer ? 1 : -1) * sp;
      serving = false;
    }
    function point(who){
      if(vsCpu){
        if(who === "you"){ pScore++; el("pgYou").textContent = pScore; beep(880, 0.08); }
        else { cScore++; el("pgCpu").textContent = cScore; beep(240, 0.12); }
        if(pScore >= 11 || cScore >= 11){
          over = true; stopLoop();
          if(pScore > cScore){ winJingle(); el("pgMsg").textContent = "You win the match " + pScore + "–" + cScore + "! 🏆"; }
          else showGameOver("The computer wins the match " + cScore + "–" + pScore + ".");
          draw(); return;
        }
        serve(who !== "you");
      } else {
        over = true; stopLoop();
        best = Math.max(best, pScore); bestSet(g.id, best); el("pgCpu").textContent = best;
        showGameOver("Missed! You returned " + pScore + " rallies (best " + best + ").");
      }
      draw();
    }
    function step(){
      if(!running || over) return;
      if(isPaused){ raf = requestAnimationFrame(step); return; }
      ball.x += ball.vx; ball.y += ball.vy;
      if(ball.x < 10){ ball.x = 10; ball.vx = Math.abs(ball.vx); }
      if(ball.x > 310){ ball.x = 310; ball.vx = -Math.abs(ball.vx); }
      if(vsCpu){
        var track = ball.vy < 0 ? ball.x : 160 + Math.sin(Date.now() / 500) * 20;
        cpuX += Math.max(-cpuSpeed, Math.min(cpuSpeed, track - cpuX));
        if(ball.vy < 0 && ball.y < 34 && ball.y > 8 && Math.abs(ball.x - cpuX) < 52){
          ball.vy = Math.abs(ball.vy) * 1.03; ball.vx += (ball.x - cpuX) / 30; beep(500, 0.04);
        }
        if(ball.y < -12){ point("you"); }
      } else if(ball.y < 10){ ball.y = 10; ball.vy = Math.abs(ball.vy); pScore++; el("pgYou").textContent = pScore; beep(700, 0.04); }
      if(ball.vy > 0 && ball.y > 364 && ball.y < 388 && Math.abs(ball.x - padX) < 52){
        ball.vy = -Math.abs(ball.vy) * 1.03; ball.vx += (ball.x - padX) / 30;
        ball.vx = Math.max(-4.6, Math.min(4.6, ball.vx));
        beep(760, 0.04);
      }
      if(ball.y > 412){ point("cpu"); }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over) raf = requestAnimationFrame(step); }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    C.cv.addEventListener("pointerdown", function(e){ padX = Math.max(42, Math.min(278, cvPoint(C.cv, e).x)); if(!running) draw(); });
    C.cv.addEventListener("pointermove", function(e){ padX = Math.max(42, Math.min(278, cvPoint(C.cv, e).x)); if(!running) draw(); });
    el("pgStart").addEventListener("click", function(){
      tap(); pScore = 0; cScore = 0;
      el("pgYou").textContent = "0"; if(vsCpu) el("pgCpu").textContent = "0";
      running = true; over = false;
      el("pgStart").textContent = "↻ Restart";
      serve(true);
      startLoop();
    });
    draw();
  }

  /* ================= Copter Rescue ================= */
  function engCopter(g){
    var y = 170, vy = 0, walls = [], score = 0, dist = 0, holding = false, running = false, over = false, raf = null, frame = 0;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Gates", '<b id="cpScore">0</b>'], ["Best", '<b id="cpBest">' + bestOf(g.id) + '</b>'], ["Control", "Hold / Release"]]) +
      '<canvas id="cpCv" class="gcanvas" width="320" height="360" aria-label="Copter Rescue game area"></canvas>' +
      '<div class="msg" id="cpMsg">Hold anywhere to climb, release to sink. Thread the gates!</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="cpStart">▶ Start</button></div>';
    var C = cvSetup("cpCv", 320, 360), ctx = C.ctx;
    var best = bestOf(g.id), speed = state.difficulty === "Hard" ? 2.6 : 2.1;
    function draw(){
      var grad = ctx.createLinearGradient(0, 0, 0, 360);
      grad.addColorStop(0, "#7FB2D9"); grad.addColorStop(1, "#D9ECFA");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, 320, 360);
      ctx.fillStyle = "#5D4037";
      walls.forEach(function(w){
        ctx.fillRect(w.x, 0, 34, w.gapY - w.gapH / 2);
        ctx.fillRect(w.x, w.gapY + w.gapH / 2, 34, 360 - (w.gapY + w.gapH / 2));
      });
      ctx.font = "34px serif"; ctx.textAlign = "center";
      ctx.fillText("🚁", 62, y + 12);
    }
    function step(){
      if(!running || over) return;
      if(isPaused){ raf = requestAnimationFrame(step); return; }
      frame++;
      vy += holding ? -0.32 : 0.24;
      vy = Math.max(-4.6, Math.min(5.2, vy));
      y += vy;
      dist += speed;
      if(frame % 130 === 0) walls.push({ x: 330, gapY: 80 + rnd(200), gapH: state.difficulty === "Easy" ? 128 : state.difficulty === "Hard" ? 104 : 116, passed: false });
      walls.forEach(function(w){ w.x -= speed; });
      walls = walls.filter(function(w){ return w.x > -40; });
      for(var i = 0; i < walls.length; i++){
        var w = walls[i];
        if(!w.passed && w.x + 34 < 62){ w.passed = true; score++; el("cpScore").textContent = score; beep(980, 0.06); }
        if(Math.abs(w.x + 17 - 62) < 34 && (y - 14 < w.gapY - w.gapH / 2 || y + 14 > w.gapY + w.gapH / 2)){
          over = true; stopLoop(); beep(150, 0.3);
          best = Math.max(best, score); bestSet(g.id, best); el("cpBest").textContent = best;
          showGameOver("Clipped the canyon wall! Gates cleared: " + score + " (best " + best + ").");
          draw(); return;
        }
      }
      if(y < 12 || y > 348){
        over = true; stopLoop();
        best = Math.max(best, score); bestSet(g.id, best); el("cpBest").textContent = best;
        showGameOver(y < 12 ? "You flew into the canyon roof!" : "You hit the canyon floor! Gates cleared: " + score + ".");
        draw(); return;
      }
      draw();
      raf = requestAnimationFrame(step);
    }
    function startLoop(){ if(!raf && running && !over) raf = requestAnimationFrame(step); }
    function stopLoop(){ if(raf){ cancelAnimationFrame(raf); raf = null; } }
    gameStopFn = function(){ running = false; stopLoop(); };
    gameHooks.pause = stopLoop;
    gameHooks.resume = function(){ if(running) startLoop(); };
    C.cv.addEventListener("pointerdown", function(){ holding = true; });
    ["pointerup","pointerleave","pointercancel"].forEach(function(ev){ C.cv.addEventListener(ev, function(){ holding = false; }); });
    gameHooks.key = function(k){ if(k === "Space") holding = true; };
    el("cpStart").addEventListener("click", function(){
      tap(); y = 170; vy = 0; walls = []; score = 0; frame = 0;
      running = true; over = false;
      el("cpScore").textContent = "0";
      el("cpStart").textContent = "↻ Restart";
      startLoop();
    });
    draw();
  }


  /* ================= Skill-shot family (archery / tank / bomber / hoops / bowling / darts / chute / lander) ================= */
  function engShot(g){
    var mode = g.theme, lvl = g.levels ? lvlOf(g.id) : 1;
    playTitle.textContent = g.name + " — play!";

    /* ---------- ARCHERY ---------- */
    if(mode === "archery"){
      var arrows = 0, score = 0, over = false, t = 0, timer = null, wind = 0, flying = null;
      var targetScore = 52 + lvl * 4;
      var cx = 218, cy = 150, R = 92 - Math.min(30, (lvl - 1) * 5);
      playBody.innerHTML =
        hudLine([["Score", '<b id="arScore">0</b>'], ["Arrows", '<b id="arLeft">10</b> left'], ["Target", targetScore]]) +
        '<canvas id="arCv" class="gcanvas" width="320" height="300" aria-label="Archery target"></canvas>' +
        '<div class="msg" id="arMsg">The aim drifts — tap SHOOT at the right moment. Watch the wind!</div>' +
        '<div class="btn-row"><button class="mini-btn orange" id="arShoot">🏹 SHOOT</button><button class="mini-btn" id="arStart">▶ New Round</button></div><div id="arNext"></div>';
      var C = cvSetup("arCv", 320, 300), ctx = C.ctx;
      gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
      function newWind(){ wind = pick([-2, -1, -1, 0, 1, 1, 2]); }
      newWind();
      function draw(){
        ctx.fillStyle = "#BDE7FF"; ctx.fillRect(0, 0, 320, 300);
        ctx.fillStyle = "#7DB35A"; ctx.fillRect(0, 238, 320, 62);
        var rings = [[1, "#fff"], [0.8, "#263238"], [0.6, "#2E9BFF"], [0.38, "#E5322D"], [0.18, "#FFC531"]];
        rings.forEach(function(r){ ctx.beginPath(); ctx.fillStyle = r[1]; ctx.arc(cx, cy, R * r[0], 0, 7); ctx.fill(); });
        ctx.fillStyle = "#263238"; ctx.font = "800 14px Nunito, sans-serif"; ctx.textAlign = "left";
        ctx.fillText("Wind: " + (wind === 0 ? "calm" : (wind > 0 ? "▶".repeat(wind) : "◀".repeat(-wind))), 12, 24);
        ctx.font = "30px serif"; ctx.fillText("🏹", 18, cy + 40);
        var ax = cx + Math.sin(t / 26) * R * 0.95, ay = cy + Math.cos(t / 19) * R * 0.6;
        if(!flying){
          ctx.strokeStyle = "#D90429"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(ax - 13, ay); ctx.lineTo(ax + 13, ay); ctx.moveTo(ax, ay - 13); ctx.lineTo(ax, ay + 13); ctx.stroke();
        } else {
          ctx.fillStyle = "#263238"; ctx.beginPath(); ctx.arc(flying.x, flying.y, 4, 0, 7); ctx.fill();
          ctx.strokeStyle = "#263238"; ctx.beginPath(); ctx.moveTo(flying.x - 14, flying.y); ctx.lineTo(flying.x, flying.y); ctx.stroke();
        }
        return { ax: ax, ay: ay };
      }
      var curAim = draw();
      timer = setInterval(function(){
        if(isPaused || over) return;
        t++;
        if(flying){ flying.x += 26; if(flying.x >= flying.hitX){ score += flying.pts; el("arScore").textContent = score; el("arMsg").textContent = flying.pts > 0 ? "+" + flying.pts + " points!" : "Missed the target!"; flying = null; newWind(); checkEnd(); } }
        curAim = draw();
      }, 30);
      function checkEnd(){
        if(arrows >= 10 && !over){
          over = true; clearInterval(timer);
          if(score >= targetScore){
            lvlSet(g.id, lvl + 1); winJingle();
            el("arMsg").textContent = "Target beaten — " + score + " points! Level " + lvl + " cleared. 🏆";
            el("arNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
            el("arNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          } else showGameOver("You scored " + score + " — the target was " + targetScore + ". So close!");
        }
      }
      el("arShoot").addEventListener("click", function(){
        if(over || isPaused || flying || arrows >= 10) return;
        arrows++; el("arLeft").textContent = (10 - arrows);
        var landX = curAim.ax + wind * 13 + (Math.random() * 6 - 3), landY = curAim.ay + (Math.random() * 6 - 3);
        var d = Math.hypot(landX - cx, landY - cy);
        var pts = d <= R * 0.18 ? 10 : d <= R * 0.38 ? 8 : d <= R * 0.6 ? 6 : d <= R * 0.8 ? 4 : d <= R ? 2 : 0;
        beep(500, 0.05);
        flying = { x: 44, y: landY, hitX: landX, pts: pts };
      });
      el("arStart").addEventListener("click", function(){ tap(); startNewGame(g); });
      return;
    }

    /* ---------- TANK ---------- */
    if(mode === "tank"){
      var shells = 6, over = false, charging = false, power = 0, chargeTimer = null, shellAnim = null, rafT = null;
      var tx = 238 + rnd(50), ty = 218, tr = Math.max(15, 24 - lvl);
      var windT = pick([-6, -3, 0, 3, 6]);
      playBody.innerHTML =
        hudLine([["Shells", '<b id="tkLeft">' + shells + '</b>'], ["Wind", '<b id="tkWind"></b>'], ["Level", lvl]]) +
        '<canvas id="tkCv" class="gcanvas" width="320" height="280" aria-label="Tank battlefield"></canvas>' +
        '<div style="display:flex;align-items:center;gap:8px;margin-top:6px"><b style="font-size:13.5px">Angle</b><input type="range" id="tkAngle" min="15" max="80" value="45" style="flex:1" aria-label="Barrel angle"><b id="tkAngVal">45°</b></div>' +
        '<div class="gx-meter"><div class="gx-meter" style="margin:0"><div id="tkPowFill" style="height:100%;width:0%;background:linear-gradient(90deg,#3CB54A,#FFC531,#D90429)"></div></div></div>' +
        '<div class="msg" id="tkMsg">Set the angle, then HOLD Fire to charge and RELEASE to shoot!</div>' +
        '<div class="btn-row"><button class="mini-btn orange" id="tkFire">🔥 HOLD TO CHARGE — RELEASE TO FIRE</button></div><div id="tkNext"></div>';
      var C2 = cvSetup("tkCv", 320, 280), ctx2 = C2.ctx;
      el("tkWind").textContent = windT === 0 ? "calm" : (windT > 0 ? "▶ " + windT : "◀ " + (-windT));
      gameStopFn = function(){ over = true; if(chargeTimer) clearInterval(chargeTimer); if(rafT) cancelAnimationFrame(rafT); };
      function drawScene(proj){
        ctx2.fillStyle = "#BDE7FF"; ctx2.fillRect(0, 0, 320, 280);
        ctx2.fillStyle = "#8D6E63"; ctx2.beginPath(); ctx2.moveTo(0, 280); ctx2.lineTo(0, 226); ctx2.quadraticCurveTo(90, 196, 160, 232); ctx2.quadraticCurveTo(240, 258, 320, 224); ctx2.lineTo(320, 280); ctx2.fill();
        ctx2.font = "36px serif"; ctx2.textAlign = "center";
        ctx2.fillText("🚜", 38, 232);
        var ang = parseInt(el("tkAngle").value, 10) * Math.PI / 180;
        ctx2.strokeStyle = "#263238"; ctx2.lineWidth = 6;
        ctx2.beginPath(); ctx2.moveTo(38, 208); ctx2.lineTo(38 + Math.cos(ang) * 30, 208 - Math.sin(ang) * 30); ctx2.stroke();
        ctx2.font = "30px serif";
        ctx2.fillText("🎯", tx, ty + 8);
        ctx2.beginPath(); ctx2.strokeStyle = "rgba(217,4,41,.55)"; ctx2.lineWidth = 2; ctx2.arc(tx, ty, tr, 0, 7); ctx2.stroke();
        if(proj){ ctx2.fillStyle = "#263238"; ctx2.beginPath(); ctx2.arc(proj.x, proj.y, 5, 0, 7); ctx2.fill(); }
      }
      drawScene(null);
      el("tkAngle").addEventListener("input", function(){ el("tkAngVal").textContent = el("tkAngle").value + "°"; drawScene(null); });
      function fire(){
        if(over || shells <= 0 || shellAnim) return;
        shells--; el("tkLeft").textContent = shells;
        var ang = parseInt(el("tkAngle").value, 10) * Math.PI / 180;
        var v = 5 + power / 100 * 9.5;
        var p = { x: 40 + Math.cos(ang) * 32, y: 206 - Math.sin(ang) * 32, vx: Math.cos(ang) * v + windT * 0.09, vy: -Math.sin(ang) * v };
        shellAnim = p;
        beep(240, 0.15);
        (function anim(){
          if(over) return;
          p.x += p.vx; p.y += p.vy; p.vy += 0.16;
          drawScene(p);
          var hit = Math.hypot(p.x - tx, p.y - ty) <= tr + 4;
          if(hit){
            shellAnim = null;
            over = true; lvlSet(g.id, lvl + 1); winJingle();
            ctx2.font = "44px serif"; ctx2.fillText("💥", tx, ty + 10);
            el("tkMsg").textContent = "DIRECT HIT! Target destroyed — Level " + lvl + " cleared. 🏆";
            el("tkNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
            el("tkNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
            return;
          }
          if(p.x > 330 || p.y > 285){
            shellAnim = null;
            el("tkMsg").textContent = "Missed — the shell landed " + (p.x < tx - tr ? "short. More power or angle!" : "long. Ease off!") + " " + shells + " shells left.";
            if(shells <= 0){ over = true; showGameOver("Out of shells! The target survived this time."); }
            drawScene(null);
            return;
          }
          rafT = requestAnimationFrame(anim);
        })();
      }
      var fireBtn = el("tkFire");
      fireBtn.addEventListener("pointerdown", function(e){
        e.preventDefault();
        if(over || shellAnim) return;
        charging = true; power = 0;
        chargeTimer = setInterval(function(){
          power = Math.min(100, power + 2.4);
          el("tkPowFill").style.width = power + "%";
        }, 16);
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function(ev){
        fireBtn.addEventListener(ev, function(){
          if(!charging) return;
          charging = false;
          if(chargeTimer) clearInterval(chargeTimer);
          fire();
          setTimeout(function(){ el("tkPowFill").style.width = "0%"; }, 250);
        });
      });
      return;
    }

    /* ---------- BOMBER ---------- */
    if(mode === "bomber"){
      var planeX = -40, bombs = [], targetsL = [], hits = 0, passes = 0, over = false, rafB = null, running = true;
      var need = Math.min(5, 2 + lvl), maxPasses = 8;
      var tw = Math.max(22, 40 - lvl * 2);
      for(var ti = 0; ti < 5; ti++) targetsL.push({ x: 20 + ti * 58 + rnd(18), hit: false });
      playBody.innerHTML =
        hudLine([["Hits", '<b id="bmHits">0</b> / ' + need], ["Passes", '<b id="bmPass">0</b> / ' + maxPasses], ["Level", lvl]]) +
        '<canvas id="bmCv" class="gcanvas" width="320" height="300" aria-label="Bomber Run sky"></canvas>' +
        '<div class="msg" id="bmMsg">Tap DROP as you pass over a target — the bomb keeps the plane\'s speed, so drop a little early!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="bmDrop">💣 DROP</button></div><div id="bmNext"></div>';
      var C3 = cvSetup("bmCv", 320, 300), ctx3 = C3.ctx;
      var speedB = 2.2 + lvl * 0.25;
      function drawB(){
        ctx3.fillStyle = "#9ED1F2"; ctx3.fillRect(0, 0, 320, 300);
        ctx3.fillStyle = "#7DB35A"; ctx3.fillRect(0, 262, 320, 38);
        ctx3.font = "30px serif"; ctx3.textAlign = "center";
        targetsL.forEach(function(t){ ctx3.fillText(t.hit ? "💥" : "🎯", t.x + tw / 2, 258); });
        ctx3.font = "34px serif";
        ctx3.fillText("✈️", planeX, 52);
        bombs.forEach(function(b){ ctx3.font = "17px serif"; ctx3.fillText("💣", b.x, b.y); });
      }
      function stepB(){
        if(over) return;
        if(isPaused){ rafB = requestAnimationFrame(stepB); return; }
        planeX += speedB;
        if(planeX > 350){
          planeX = -40; passes++;
          el("bmPass").textContent = Math.min(maxPasses, passes);
          if(passes >= maxPasses && !over){
            over = true;
            showGameOver("Out of passes! You hit " + hits + " of " + need + " needed targets.");
            drawB(); return;
          }
        }
        for(var i = bombs.length - 1; i >= 0; i--){
          var b = bombs[i];
          b.x += speedB; b.y += b.vy; b.vy += 0.22;
          if(b.y >= 252){
            var hitT = targetsL.filter(function(t){ return !t.hit && Math.abs(b.x - (t.x + tw / 2)) <= tw / 2 + 4; })[0];
            if(hitT){
              hitT.hit = true; hits++;
              el("bmHits").textContent = hits;
              beep(300, 0.2);
              el("bmMsg").textContent = "Direct hit! " + hits + " of " + need + ".";
              if(hits >= need){
                over = true; lvlSet(g.id, lvl + 1); winJingle();
                el("bmMsg").textContent = "All targets destroyed — Level " + lvl + " cleared. 🏆";
                el("bmNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
                el("bmNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
                drawB(); return;
              }
            } else beep(190, 0.1);
            bombs.splice(i, 1);
          }
        }
        drawB();
        rafB = requestAnimationFrame(stepB);
      }
      gameStopFn = function(){ over = true; if(rafB) cancelAnimationFrame(rafB); };
      gameHooks.pause = function(){ if(rafB) cancelAnimationFrame(rafB); rafB = null; };
      gameHooks.resume = function(){ if(!over && !rafB) rafB = requestAnimationFrame(stepB); };
      el("bmDrop").addEventListener("click", function(){
        if(over || isPaused || planeX < 0 || planeX > 320) return;
        bombs.push({ x: planeX, y: 62, vy: 0.6 });
        beep(420, 0.06);
      });
      C3.cv.addEventListener("pointerdown", function(){ el("bmDrop").click(); });
      rafB = requestAnimationFrame(stepB);
      drawB();
      return;
    }

    /* ---------- HOOPS ---------- */
    if(mode === "hoops"){
      var scoreB = 0, streak = 0, timeLeft = 60, phase = "aim", aimT = 0, powT = 0, lockedAim = 0, timerH = null, overH = false;
      playBody.innerHTML =
        hudLine([["Baskets", '<b id="hpScore">0</b>'], ["Time", '<b id="hpTime">60</b>s'], ["Streak", '<b id="hpStreak">0</b>']]) +
        '<canvas id="hpCv" class="gcanvas" width="320" height="280" aria-label="Basketball hoop"></canvas>' +
        '<div class="gx-meter" id="hpMeter" hidden><div class="zone" style="left:55%;width:20%"></div><div class="needle" id="hpNeedle" style="left:0%"></div></div>' +
        '<div class="msg" id="hpMsg">Tap once to lock the aim over the hoop, tap again to shoot in the green power zone!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="hpTap">🎯 LOCK AIM</button></div>';
      var C4 = cvSetup("hpCv", 320, 280), ctx4 = C4.ctx;
      gameStopFn = function(){ overH = true; if(timerH) clearInterval(timerH); };
      function drawH(){
        ctx4.fillStyle = "#F3E5D8"; ctx4.fillRect(0, 0, 320, 280);
        ctx4.fillStyle = "#8D6E63"; ctx4.fillRect(0, 244, 320, 36);
        ctx4.fillStyle = "#fff"; ctx4.strokeStyle = "#D90429"; ctx4.lineWidth = 3;
        ctx4.fillRect(228, 58, 64, 48); ctx4.strokeRect(228, 58, 64, 48);
        ctx4.strokeStyle = "#FF6B1A"; ctx4.lineWidth = 4;
        ctx4.beginPath(); ctx4.ellipse(260, 112, 22, 6, 0, 0, 7); ctx4.stroke();
        ctx4.font = "38px serif"; ctx4.textAlign = "center"; ctx4.fillText("🏀", 52, 238);
        var ax = phase === "aim" ? 260 + Math.sin(aimT / 15) * 95 : lockedAim;
        ctx4.strokeStyle = "#D90429"; ctx4.lineWidth = 2;
        ctx4.beginPath(); ctx4.moveTo(ax - 12, 128); ctx4.lineTo(ax + 12, 128); ctx4.moveTo(ax, 116); ctx4.lineTo(ax, 140); ctx4.stroke();
      }
      drawH();
      timerH = setInterval(function(){
        if(isPaused || overH) return;
        if(phase === "aim"){ aimT++; drawH(); }
        else if(phase === "power"){
          powT += 2.6; if(powT > 100) powT = 0;
          el("hpNeedle").style.left = powT + "%";
        }
        if(!timerH) return;
      }, 30);
      var clock = setInterval(function(){
        if(isPaused || overH) return;
        timeLeft--; el("hpTime").textContent = Math.max(0, timeLeft);
        if(timeLeft <= 0){ overH = true; clearInterval(timerH); clearInterval(clock); showGameOver("Time! You scored " + scoreB + " baskets."); }
      }, 1000);
      gameStopFn = function(){ overH = true; if(timerH) clearInterval(timerH); clearInterval(clock); };
      el("hpTap").addEventListener("click", function(){
        if(overH || isPaused) return;
        if(phase === "aim"){
          lockedAim = 260 + Math.sin(aimT / 15) * 95;
          phase = "power"; powT = 0;
          el("hpMeter").hidden = false;
          el("hpTap").textContent = "🏀 SHOOT!";
          el("hpMsg").textContent = "Aim locked. Shoot with the needle in the GREEN zone!";
          beep(600, 0.06);
        } else {
          phase = "aim";
          el("hpMeter").hidden = true;
          el("hpTap").textContent = "🎯 LOCK AIM";
          var aimGood = Math.abs(lockedAim - 260) <= 20;
          var powGood = powT >= 55 && powT <= 75;
          if(aimGood && powGood){
            scoreB++; streak++;
            if(streak % 3 === 0){ scoreB++; el("hpMsg").textContent = "SWISH! Streak bonus — that's " + scoreB + " baskets!"; }
            else el("hpMsg").textContent = "SWISH! Basket " + scoreB + ".";
            beep(990, 0.1);
          } else {
            streak = 0;
            el("hpMsg").textContent = !aimGood ? "The aim was off the hoop. Center it first!" : "Power outside the green zone — " + Math.round(powT) + "% won't drop.";
            beep(230, 0.13);
          }
          el("hpScore").textContent = scoreB;
          el("hpStreak").textContent = streak;
        }
      });
      return;
    }

    /* ---------- BOWLING ---------- */
    if(mode === "bowling"){
      var frame = 1, ballInFrame = 0, framePins = [], totalScore = 0, pinsUp = [1,1,1,1,1,1,1,1,1,1], phaseB = "aim", aimB = 0, powB = 0, timerB = null, overB = false, thirdBall = false;
      playBody.innerHTML =
        hudLine([["Frame", '<b id="bwFrame">1</b> / 10'], ["Pins", '<b id="bwPins">10</b>'], ["Score", '<b id="bwScore">0</b>']]) +
        '<canvas id="bwCv" class="gcanvas" width="320" height="290" aria-label="Bowling lane"></canvas>' +
        '<div class="gx-meter" id="bwMeter" hidden><div class="zone" style="left:58%;width:22%"></div><div class="needle" id="bwNeedle" style="left:0%"></div></div>' +
        '<div class="msg" id="bwMsg">Tap to set your aim line, then tap again to roll with the power shown. Green zone is strongest!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="bwTap">🎯 SET AIM</button></div>';
      var C5 = cvSetup("bwCv", 320, 290), ctx5 = C5.ctx;
      gameStopFn = function(){ overB = true; if(timerB) clearInterval(timerB); };
      var PINPOS = [[0,-46],[ -16,-30],[16,-30],[-32,-14],[0,-14],[32,-14],[-48,2],[-16,2],[16,2],[48,2]];
      function drawLane(){
        ctx5.fillStyle = "#D9A05B"; ctx5.fillRect(0, 0, 320, 290);
        ctx5.fillStyle = "#C78F45"; ctx5.fillRect(0, 0, 42, 290); ctx5.fillRect(278, 0, 42, 290);
        ctx5.strokeStyle = "rgba(120,72,0,.35)";
        for(var l = 1; l < 6; l++){ ctx5.beginPath(); ctx5.moveTo(42 + l * 39.3, 0); ctx5.lineTo(42 + l * 39.3, 290); ctx5.stroke(); }
        ctx5.textAlign = "center";
        pinsUp.forEach(function(up, i){
          if(!up) return;
          ctx5.font = "17px serif";
          ctx5.fillText("🎳", 160 + PINPOS[i][0] * 0.9, 66 + PINPOS[i][1] * 0.55 + 40);
        });
        ctx5.font = "30px serif"; ctx5.fillText("🔮", 160 + (phaseB === "aim" ? Math.sin(aimB / 13) * 88 : aimB), 268);
        if(phaseB === "aim"){
          var ax = 160 + Math.sin(aimB / 13) * 88;
          ctx5.strokeStyle = "rgba(217,4,41,.6)"; ctx5.setLineDash([5, 5]);
          ctx5.beginPath(); ctx5.moveTo(ax, 250); ctx5.lineTo(ax, 96); ctx5.stroke(); ctx5.setLineDash([]);
        }
      }
      drawLane();
      timerB = setInterval(function(){
        if(isPaused || overB) return;
        if(phaseB === "aim"){ aimB++; drawLane(); }
        else { powB += 3; if(powB > 100) powB = 0; el("bwNeedle").style.left = powB + "%"; }
      }, 30);
      function pinsStanding(){ return pinsUp.reduce(function(a, b){ return a + b; }, 0); }
      function roll(){
        var aimOff = Math.abs(aimB) / 88;
        var powErr = Math.abs(powB - 69) / 55;
        var quality = Math.max(0, 1 - aimOff * 0.85 - powErr * 0.75);
        var standing = pinsStanding();
        var knocked = Math.min(standing, Math.round(quality * 10 * (0.75 + Math.random() * 0.3)));
        var left = standing;
        for(var i = 0; i < pinsUp.length && knocked > 0; i++){
          if(pinsUp[i] && Math.random() < 0.85){ pinsUp[i] = 0; knocked--; }
        }
        var got = left - pinsStanding();
        framePins.push(got);
        beep(300 + got * 40, 0.1);
        return got;
      }
      function frameDone(){
        var fp = framePins.slice();
        var fs = fp.reduce(function(a, b){ return a + b; }, 0);
        var note = "";
        if(fp[0] === 10){ fs += 10; note = "STRIKE! +10 bonus. "; }
        else if(fp.length >= 2 && fp[0] + fp[1] === 10){ fs += 5; note = "SPARE! +5 bonus. "; }
        totalScore += fs;
        el("bwScore").textContent = totalScore;
        el("bwMsg").textContent = note + "Frame " + frame + " scored " + fs + ". Total: " + totalScore + ".";
        framePins = []; ballInFrame = 0; thirdBall = false;
        frame++;
        if(frame > 10){
          overB = true; clearInterval(timerB);
          showGameOver("Game complete! Your final bowling score is " + totalScore + " (a perfect game is 300).");
          return;
        }
        el("bwFrame").textContent = frame;
        pinsUp = [1,1,1,1,1,1,1,1,1,1];
        el("bwPins").textContent = 10;
      }
      el("bwTap").addEventListener("click", function(){
        if(overB || isPaused) return;
        if(phaseB === "aim"){
          aimB = Math.sin(aimB / 13) * 88;
          phaseB = "power"; powB = 0;
          el("bwMeter").hidden = false;
          el("bwTap").textContent = "🎳 ROLL!";
          beep(600, 0.05);
        } else {
          phaseB = "aim";
          el("bwMeter").hidden = true;
          el("bwTap").textContent = "🎯 SET AIM";
          var got = roll();
          ballInFrame++;
          el("bwPins").textContent = pinsStanding();
          drawLane();
          var isTenth = frame === 10;
          if(!isTenth){
            if(framePins[0] === 10 || ballInFrame >= 2) frameDone();
            else el("bwMsg").textContent = "You knocked " + got + ". " + pinsStanding() + " pins left — ball 2!";
          } else {
            if(ballInFrame === 1 && got === 10) thirdBall = true;
            if(ballInFrame === 2){
              if(framePins[0] + framePins[1] >= 10 || framePins[0] === 10) { /* one more ball */ }
              else { frameDone(); return; }
            }
            if(ballInFrame >= 3 || (ballInFrame === 2 && framePins[0] !== 10 && framePins[0] + framePins[1] < 10)) frameDone();
            else el("bwMsg").textContent = "You knocked " + got + ". Ball " + (ballInFrame + 1) + " of the 10th frame!";
            if(ballInFrame === 1 && framePins[0] === 10){ pinsUp = [1,1,1,1,1,1,1,1,1,1]; el("bwPins").textContent = 10; drawLane(); }
            if(ballInFrame === 2 && framePins[0] !== 10 && framePins[0] + framePins[1] === 10){ pinsUp = [1,1,1,1,1,1,1,1,1,1]; el("bwPins").textContent = 10; drawLane(); }
          }
        }
      });
      return;
    }

    /* ---------- DARTS 301 ---------- */
    if(mode === "darts"){
      var remain = 301, darts = state.difficulty === "Easy" ? 15 : state.difficulty === "Hard" ? 9 : 12, tD = 0, overD = false, timerD = null;
      playBody.innerHTML =
        hudLine([["Remaining", '<b id="dtRem">301</b>'], ["Darts", '<b id="dtLeft">' + darts + '</b>'], ["Last dart", '<b id="dtLast">—</b>']]) +
        '<canvas id="dtCv" class="gcanvas" width="320" height="300" aria-label="Dartboard"></canvas>' +
        '<div class="msg" id="dtMsg">Your aim drifts — tap THROW at the perfect moment. Reach exactly 0!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="dtThrow">🎯 THROW</button></div>';
      var C6 = cvSetup("dtCv", 320, 300), ctx6 = C6.ctx;
      gameStopFn = function(){ overD = true; if(timerD) clearInterval(timerD); };
      var BC = { x: 160, y: 148, R: 118 };
      function drawDart(aimOnly, hx, hy){
        var rings = [[1, "#263238"], [0.78, "#F5E9C9"], [0.55, "#E5322D"], [0.34, "#F5E9C9"], [0.16, "#3CB54A"], [0.07, "#E5322D"]];
        ctx6.fillStyle = "#4A3220"; ctx6.fillRect(0, 0, 320, 300);
        rings.forEach(function(r){ ctx6.beginPath(); ctx6.fillStyle = r[1]; ctx6.arc(BC.x, BC.y, BC.R * r[0], 0, 7); ctx6.fill(); });
        if(aimOnly){
          ctx6.strokeStyle = "#FFC531"; ctx6.lineWidth = 2.5;
          ctx6.beginPath(); ctx6.moveTo(hx - 14, hy); ctx6.lineTo(hx + 14, hy); ctx6.moveTo(hx, hy - 14); ctx6.lineTo(hx, hy + 14); ctx6.stroke();
        } else {
          ctx6.font = "22px serif"; ctx6.textAlign = "center"; ctx6.fillText("📌", hx, hy + 6);
        }
      }
      var aimPt = { x: BC.x, y: BC.y };
      timerD = setInterval(function(){
        if(isPaused || overD) return;
        tD++;
        aimPt = { x: BC.x + Math.sin(tD / 17) * BC.R * 0.92, y: BC.y + Math.cos(tD / 13) * BC.R * 0.8 };
        drawDart(true, aimPt.x, aimPt.y);
      }, 30);
      drawDart(true, BC.x, BC.y);
      el("dtThrow").addEventListener("click", function(){
        if(overD || isPaused) return;
        darts--; el("dtLeft").textContent = darts;
        var hx = aimPt.x + (Math.random() * 14 - 7), hy = aimPt.y + (Math.random() * 14 - 7);
        var d = Math.hypot(hx - BC.x, hy - BC.y) / BC.R;
        var pts = d <= 0.07 ? 50 : d <= 0.16 ? 25 : d <= 0.34 ? 20 : d <= 0.55 ? 10 : d <= 0.78 ? 5 : d <= 1 ? 1 : 0;
        drawDart(false, hx, hy);
        beep(pts >= 25 ? 1050 : 620, 0.07);
        el("dtLast").textContent = pts;
        if(pts > remain){
          el("dtMsg").textContent = "BUST! " + pts + " is more than your remaining " + remain + " — the dart doesn't count.";
          beep(200, 0.15);
        } else {
          remain -= pts;
          el("dtRem").textContent = remain;
          el("dtMsg").textContent = pts > 0 ? "+" + pts + " points! " + remain + " to go." : "Missed the board entirely!";
        }
        if(remain === 0){
          overD = true; clearInterval(timerD); winJingle();
          el("dtMsg").textContent = "EXACT FINISH! You cleared 301 — championship throwing! 🏆";
        } else if(darts <= 0){
          overD = true; clearInterval(timerD);
          showGameOver("Out of darts with " + remain + " points still to go. So close!");
        }
      });
      return;
    }

    /* ---------- PARACHUTE DROP ---------- */
    if(mode === "chute"){
      var px2 = 40, py2 = 26, open2 = false, windC = pick([-1.4, -0.8, 0.8, 1.4]), overC = false, rafC = null, steer = 0;
      var padW = Math.max(46, 92 - lvl * 7), padX = 90 + rnd(140);
      playBody.innerHTML =
        hudLine([["Wind", windC > 0 ? "▶ " + Math.abs(windC).toFixed(1) : "◀ " + Math.abs(windC).toFixed(1)], ["Pad", "Level " + lvl], ["Status", '<b id="chSt">Falling</b>']]) +
        '<canvas id="chCv" class="gcanvas" width="320" height="360" aria-label="Parachute drop sky"></canvas>' +
        '<div class="msg" id="chMsg">You are falling and drifting with the wind. Open the chute at the right moment, then steer with ◀ ▶.</div>' +
        '<div class="btn-row"><button class="mini-btn" id="chL">◀</button><button class="mini-btn orange" id="chOpen">🪂 OPEN CHUTE</button><button class="mini-btn" id="chR">▶</button></div><div id="chNext"></div>';
      var C7 = cvSetup("chCv", 320, 360), ctx7 = C7.ctx;
      function drawC(){
        var gr = ctx7.createLinearGradient(0, 0, 0, 360);
        gr.addColorStop(0, "#63B8F0"); gr.addColorStop(1, "#D9ECFA");
        ctx7.fillStyle = gr; ctx7.fillRect(0, 0, 320, 360);
        ctx7.fillStyle = "#7DB35A"; ctx7.fillRect(0, 330, 320, 30);
        ctx7.fillStyle = "#D90429"; ctx7.fillRect(padX, 326, padW, 7);
        ctx7.fillStyle = "#FFC531"; ctx7.fillRect(padX + padW / 2 - 9, 326, 18, 7);
        ctx7.font = "30px serif"; ctx7.textAlign = "center";
        if(open2){ ctx7.font = "36px serif"; ctx7.fillText("🪂", px2, py2); ctx7.font = "22px serif"; ctx7.fillText("🧍", px2, py2 + 26); }
        else ctx7.fillText("🪂", px2, py2);
        if(!open2){ ctx7.font = "20px serif"; ctx7.fillText("🧍", px2, py2 + 24); }
      }
      function stepC(){
        if(overC) return;
        if(isPaused){ rafC = requestAnimationFrame(stepC); return; }
        px2 += windC * (open2 ? 0.55 : 1) + steer * (open2 ? 1.7 : 0);
        py2 += open2 ? 1.15 : 2.9;
        px2 = Math.max(14, Math.min(306, px2));
        if(py2 >= 322){
          overC = true;
          var center = padX + padW / 2;
          if(px2 >= padX && px2 <= padX + padW){
            var dc = Math.abs(px2 - center);
            var pts = dc <= 9 ? 50 : dc <= padW / 4 ? 30 : 15;
            lvlSet(g.id, lvl + 1); winJingle();
            el("chSt").textContent = "Landed!";
            el("chMsg").textContent = "Touchdown on the pad — +" + pts + " points! Level " + lvl + " cleared. 🏆";
            el("chNext").innerHTML = nextLevelBtn("▶ Next Jump — Level " + (lvl + 1));
            el("chNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          } else {
            showGameOver("You missed the pad and landed in the field! The wind was " + (windC > 0 ? "pushing right" : "pushing left") + ".");
          }
          drawC(); return;
        }
        drawC();
        rafC = requestAnimationFrame(stepC);
      }
      gameStopFn = function(){ overC = true; if(rafC) cancelAnimationFrame(rafC); };
      gameHooks.pause = function(){ if(rafC) cancelAnimationFrame(rafC); rafC = null; };
      gameHooks.resume = function(){ if(!overC && !rafC) rafC = requestAnimationFrame(stepC); };
      el("chOpen").addEventListener("click", function(){
        if(open2 || overC) return;
        open2 = true; el("chSt").textContent = "Chute open";
        el("chMsg").textContent = "Steer with ◀ ▶ — land on the red pad, center if you can!";
        beep(700, 0.08);
      });
      function holdS(id, dir){
        var b = el(id);
        b.addEventListener("pointerdown", function(){ steer = dir; });
        ["pointerup", "pointerleave", "pointercancel"].forEach(function(ev){ b.addEventListener(ev, function(){ steer = 0; }); });
      }
      holdS("chL", -1); holdS("chR", 1);
      rafC = requestAnimationFrame(stepC);
      drawC();
      return;
    }

    /* ---------- ROCKET LANDER ---------- */
    if(mode === "lander"){
      var rx = 150, ry = 26, rvy = 0.4, thrust = false, fuel = 100, overL = false, rafL = null;
      var grav = 0.045 + lvl * 0.006, safeV = Math.max(1.1, 2.1 - (lvl - 1) * 0.15);
      var lpadX = 96 + rnd(80), lpadW = 96;
      playBody.innerHTML =
        hudLine([["Speed", '<b id="rlSpd">0.0</b>'], ["Safe landing", "≤ " + safeV.toFixed(1)], ["Fuel", '<b id="rlFuel">100</b>%']]) +
        '<canvas id="rlCv" class="gcanvas" width="320" height="340" aria-label="Moon landing"></canvas>' +
        '<div class="msg" id="rlMsg">HOLD the thrust button to slow your fall. Land ON the pad, slower than the safe speed!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="rlThrust" style="min-width:210px">🔥 HOLD — THRUST</button></div><div id="rlNext"></div>';
      var C8 = cvSetup("rlCv", 320, 340), ctx8 = C8.ctx;
      function drawL(){
        ctx8.fillStyle = "#0B0F2E"; ctx8.fillRect(0, 0, 320, 340);
        ctx8.fillStyle = "#fff";
        for(var s = 0; s < 30; s++) ctx8.fillRect((s * 53 + 17) % 320, (s * 89 + 31) % 260, 2, 2);
        ctx8.fillStyle = "#C9C2D9"; ctx8.fillRect(0, 312, 320, 28);
        ctx8.fillStyle = "#3CB54A"; ctx8.fillRect(lpadX, 306, lpadW, 7);
        ctx8.font = "34px serif"; ctx8.textAlign = "center";
        ctx8.fillText("🚀", rx, ry + 10);
        if(thrust && fuel > 0){ ctx8.font = "18px serif"; ctx8.fillText("🔥", rx, ry + 30); }
      }
      function stepL(){
        if(overL) return;
        if(isPaused){ rafL = requestAnimationFrame(stepL); return; }
        rvy += grav;
        if(thrust && fuel > 0){ rvy -= 0.11; fuel = Math.max(0, fuel - 0.55); el("rlFuel").textContent = Math.round(fuel); }
        ry += rvy * 1.6;
        rx += Math.sin(ry / 30) * 0.2;
        el("rlSpd").textContent = Math.abs(rvy * 1.6).toFixed(1);
        el("rlSpd").style.color = Math.abs(rvy * 1.6) <= safeV ? "var(--green)" : "#D90429";
        if(ry >= 296){
          overL = true;
          var onPad = rx >= lpadX && rx <= lpadX + lpadW;
          var soft = Math.abs(rvy * 1.6) <= safeV;
          if(onPad && soft){
            lvlSet(g.id, lvl + 1); winJingle();
            el("rlMsg").textContent = "TOUCHDOWN! A perfect moon landing — Level " + lvl + " cleared. 🏆";
            el("rlNext").innerHTML = nextLevelBtn("▶ Next Landing — Level " + (lvl + 1));
            el("rlNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          } else {
            showGameOver(!onPad ? "You landed off the pad on the rough moon surface!" : "Too fast! You hit at " + Math.abs(rvy * 1.6).toFixed(1) + " — safe speed was " + safeV.toFixed(1) + ".");
          }
          drawL(); return;
        }
        drawL();
        rafL = requestAnimationFrame(stepL);
      }
      gameStopFn = function(){ overL = true; if(rafL) cancelAnimationFrame(rafL); };
      gameHooks.pause = function(){ if(rafL) cancelAnimationFrame(rafL); rafL = null; };
      gameHooks.resume = function(){ if(!overL && !rafL) rafL = requestAnimationFrame(stepL); };
      var th = el("rlThrust");
      th.addEventListener("pointerdown", function(e){ e.preventDefault(); thrust = true; });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function(ev){ th.addEventListener(ev, function(){ thrust = false; }); });
      C8.cv.addEventListener("pointerdown", function(){ thrust = true; });
      C8.cv.addEventListener("pointerup", function(){ thrust = false; });
      rafL = requestAnimationFrame(stepL);
      drawL();
      return;
    }
  }

  /* ================= Mini Golf ================= */
  function engGolf(g){
    var lvl = lvlOf(g.id);
    var HOLES = [
      { ball:[46,300], hole:[272,58], walls:[] },
      { ball:[46,300], hole:[272,58], walls:[[140,140,16,120]] },
      { ball:[40,60], hole:[280,300], walls:[[80,160,160,16]] },
      { ball:[160,316], hole:[160,44], walls:[[60,170,80,16],[180,170,80,16]] },
      { ball:[44,180], hole:[276,180], walls:[[140,60,16,110],[164,190,16,110]] },
      { ball:[48,48], hole:[272,312], walls:[[140,120,16,120],[220,40,60,16]] },
      { ball:[160,320], hole:[160,44], walls:[[110,150,100,16],[110,220,100,16]] },
      { ball:[40,312], hole:[280,48], walls:[[70,200,110,16],[140,90,110,16]] },
      { ball:[160,180], hole:[288,180], walls:[[100,60,16,90],[204,210,16,90],[140,140,40,80]] }
    ];
    var holeIdx = 0, totalStrokes = 0, strokes = 0, ball = null, vel = null, moving = false, over = false, rafG = null;
    var parTotal = 30 - Math.min(8, (lvl - 1) * 2);
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Hole", '<b id="glHole">1</b> / 9'], ["Strokes", '<b id="glStrokes">0</b>'], ["Total", '<b id="glTotal">0</b>']]) +
      '<canvas id="glCv" class="gcanvas" width="320" height="360" aria-label="Mini golf course"></canvas>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-top:6px"><b style="font-size:13.5px">Power</b><div class="gx-meter" style="flex:1;margin:0"><div class="zone" style="left:45%;width:35%"></div><div class="needle" id="glNeedle" style="left:0%"></div></div></div>' +
      '<div class="msg" id="glMsg">Drag on the course to aim (line shows direction), release… then set power and tap PUTT. Beat ' + parTotal + ' total strokes to win the round!</div>' +
      '<div class="btn-row"><button class="mini-btn" id="glAimL">◀ Aim</button><button class="mini-btn orange" id="glPutt">⛳ PUTT</button><button class="mini-btn" id="glAimR">Aim ▶</button></div>';
    var C = cvSetup("glCv", 320, 360), ctx = C.ctx;
    var aimAng = -Math.PI / 4, powOsc = 0, powTimer = null, putting = false;
    gameStopFn = function(){ over = true; if(rafG) cancelAnimationFrame(rafG); if(powTimer) clearInterval(powTimer); };
    function loadHole(){
      var h = HOLES[holeIdx];
      ball = { x: h.ball[0], y: h.ball[1] };
      vel = { x: 0, y: 0 }; moving = false; strokes = 0;
      el("glHole").textContent = holeIdx + 1;
      el("glStrokes").textContent = "0";
      aimAng = Math.atan2(h.hole[1] - ball.y, h.hole[0] - ball.x);
      drawG();
    }
    function drawG(){
      var h = HOLES[holeIdx];
      ctx.fillStyle = "#558B2F"; ctx.fillRect(0, 0, 320, 360);
      ctx.fillStyle = "#4C7A28";
      for(var s = 0; s < 8; s++) ctx.fillRect(s * 40, 0, 20, 360);
      ctx.fillStyle = "#6D4C41";
      h.walls.forEach(function(w){ ctx.fillRect(w[0], w[1], w[2], w[3]); });
      ctx.fillStyle = "#263238";
      ctx.beginPath(); ctx.arc(h.hole[0], h.hole[1], 10, 0, 7); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.moveTo(h.hole[0], h.hole[1]); ctx.lineTo(h.hole[0], h.hole[1] - 26); ctx.stroke();
      ctx.fillStyle = "#D90429"; ctx.beginPath(); ctx.moveTo(h.hole[0], h.hole[1] - 26); ctx.lineTo(h.hole[0] + 14, h.hole[1] - 21); ctx.lineTo(h.hole[0], h.hole[1] - 16); ctx.fill();
      if(!moving && !over){
        ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.setLineDash([6, 5]); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ball.x, ball.y); ctx.lineTo(ball.x + Math.cos(aimAng) * 54, ball.y + Math.sin(aimAng) * 54); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ball.x, ball.y, 7, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,.3)"; ctx.beginPath(); ctx.arc(ball.x, ball.y, 7, 0, 7); ctx.stroke();
    }
    function stepG(){
      if(over) return;
      if(isPaused){ rafG = requestAnimationFrame(stepG); return; }
      if(moving){
        var h = HOLES[holeIdx];
        ball.x += vel.x; ball.y += vel.y;
        vel.x *= 0.985; vel.y *= 0.985;
        if(ball.x < 8){ ball.x = 8; vel.x = Math.abs(vel.x); }
        if(ball.x > 312){ ball.x = 312; vel.x = -Math.abs(vel.x); }
        if(ball.y < 8){ ball.y = 8; vel.y = Math.abs(vel.y); }
        if(ball.y > 352){ ball.y = 352; vel.y = -Math.abs(vel.y); }
        h.walls.forEach(function(w){
          if(ball.x > w[0] - 7 && ball.x < w[0] + w[2] + 7 && ball.y > w[1] - 7 && ball.y < w[1] + w[3] + 7){
            var dl = Math.abs(ball.x - (w[0] - 7)), dr = Math.abs(ball.x - (w[0] + w[2] + 7)), dt2 = Math.abs(ball.y - (w[1] - 7)), db = Math.abs(ball.y - (w[1] + w[3] + 7));
            var m = Math.min(dl, dr, dt2, db);
            if(m === dl || m === dr) vel.x = -vel.x; else vel.y = -vel.y;
            ball.x += vel.x * 1.6; ball.y += vel.y * 1.6;
          }
        });
        var spd = Math.hypot(vel.x, vel.y);
        var dh = Math.hypot(ball.x - h.hole[0], ball.y - h.hole[1]);
        if(dh < 11 && spd < 3.4){
          moving = false;
          totalStrokes += strokes;
          el("glTotal").textContent = totalStrokes;
          beep(1050, 0.12);
          holeIdx++;
          if(holeIdx >= 9){
            over = true;
            if(totalStrokes <= parTotal){ lvlSet(g.id, lvl + 1); winJingle(); el("glMsg").textContent = "Round complete in " + totalStrokes + " strokes (target " + parTotal + ")! Level " + lvl + " cleared. 🏆"; playBody.insertAdjacentHTML("beforeend", nextLevelBtn("▶ Next Round — Level " + (lvl + 1))); var nb = playBody.querySelector("[data-nextlvl]"); if(nb) nb.addEventListener("click", function(){ tap(); startNewGame(g); }); }
            else showGameOver("Round complete in " + totalStrokes + " strokes — the target was " + parTotal + ". So close!");
            drawG(); return;
          }
          el("glMsg").textContent = "Holed! On to hole " + (holeIdx + 1) + ". Total strokes: " + totalStrokes + ".";
          loadHole(); drawG();
          rafG = requestAnimationFrame(stepG);
          return;
        }
        if(spd < 0.12){
          moving = false;
          if(strokes >= 8){
            el("glMsg").textContent = "Eight strokes — moving on to the next hole with 8 counted.";
            totalStrokes += 8; el("glTotal").textContent = totalStrokes;
            holeIdx++;
            if(holeIdx >= 9){ over = true; showGameOver("Round complete in " + totalStrokes + " strokes — the target was " + parTotal + "."); drawG(); return; }
            loadHole();
          } else el("glMsg").textContent = "Stopped. Stroke " + strokes + " of 8 — aim again!";
        }
        drawG();
      }
      rafG = requestAnimationFrame(stepG);
    }
    powTimer = setInterval(function(){
      if(isPaused || over || moving) return;
      powOsc += 3.2; if(powOsc > 100) powOsc = 0;
      el("glNeedle").style.left = powOsc + "%";
    }, 30);
    C.cv.addEventListener("pointerdown", function(e){
      if(moving || over) return;
      var p = cvPoint(C.cv, e);
      aimAng = Math.atan2(p.y - ball.y, p.x - ball.x);
      drawG();
    });
    C.cv.addEventListener("pointermove", function(e){
      if(moving || over || !e.buttons) return;
      var p = cvPoint(C.cv, e);
      aimAng = Math.atan2(p.y - ball.y, p.x - ball.x);
      drawG();
    });
    el("glAimL").addEventListener("click", function(){ aimAng -= 0.09; drawG(); });
    el("glAimR").addEventListener("click", function(){ aimAng += 0.09; drawG(); });
    el("glPutt").addEventListener("click", function(){
      if(moving || over || isPaused) return;
      var p = 1.2 + powOsc / 100 * 7.6;
      vel = { x: Math.cos(aimAng) * p, y: Math.sin(aimAng) * p };
      moving = true; strokes++;
      el("glStrokes").textContent = strokes;
      beep(420, 0.06);
      if(!rafG) rafG = requestAnimationFrame(stepG);
    });
    loadHole();
    rafG = requestAnimationFrame(stepG);
  }

  /* ================= Penalty Shootout ================= */
  function engPenalty(g){
    var ZONES = ["Top Left", "Top Center", "Top Right", "Bottom Left", "Bottom Center", "Bottom Right"];
    var round = 1, youScore = 0, cpuScore = 0, phase = "shoot", over = false, sudden = false;
    var diffSave = state.difficulty === "Easy" ? 0.3 : state.difficulty === "Hard" ? 0.62 : 0.48;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You", '<b id="pnYou">0</b>'], ["Round", '<b id="pnRound">1 / 5</b>'], ["CPU", '<b id="pnCpu">0</b>']]) +
      '<div id="pnGoal" style="position:relative;background:linear-gradient(180deg,#2E7D32,#1C471E);border:4px solid #fff;border-bottom:0;border-radius:10px 10px 0 0;height:190px;max-width:320px;margin:10px auto 0">' +
      '<div id="pnBall" style="position:absolute;font-size:34px;left:50%;top:64%;transform:translate(-50%,-50%)">⚽</div>' +
      '<div id="pnKeeper" style="position:absolute;font-size:38px;left:50%;top:34%;transform:translate(-50%,-50%)">🧍</div></div>' +
      '<div class="gx-grid" id="pnZones" style="grid-template-columns:repeat(3,1fr);margin-top:8px"></div>' +
      '<div class="msg" id="pnMsg">Your kick — pick where to shoot!</div>';
    var zonesEl = el("pnZones");
    gameStopFn = function(){ over = true; };
    function remaining(){ return sudden ? 0 : 5 - round + 1; }
    function decided(){
      if(sudden) return youScore !== cpuScore;
      var rem = 5 - round;
      return youScore > cpuScore + rem || cpuScore > youScore + rem;
    }
    function renderZones(){
      zonesEl.innerHTML = "";
      ZONES.forEach(function(z, zi){
        var b = document.createElement("button");
        b.className = "gx-cell"; b.style.aspectRatio = "1.6"; b.style.fontSize = "13px"; b.textContent = z;
        b.addEventListener("click", function(){ pick(zi); });
        zonesEl.appendChild(b);
      });
    }
    function ballTo(zi, scored){
      var pos = [[14, 16], [50, 12], [86, 16], [14, 58], [50, 62], [86, 58]];
      var ball = el("pnBall");
      ball.style.left = pos[zi][0] + "%"; ball.style.top = pos[zi][1] + "%";
      ball.textContent = scored ? "⚽" : "🧤";
    }
    function pick(zi){
      if(over || isPaused) return;
      var ball = el("pnBall"), keeper = el("pnKeeper");
      if(phase === "shoot"){
        var kz = rnd(6);
        var saved = kz === zi ? Math.random() < 0.92 : Math.random() < (1 - diffSave) * 0.22;
        keeper.style.left = [14, 50, 86, 14, 50, 86][kz] + "%";
        keeper.style.top = [30, 26, 30, 52, 56, 52][kz] + "%";
        if(!saved){ youScore++; el("pnYou").textContent = youScore; ballTo(zi, true); beep(980, 0.1); el("pnMsg").textContent = "GOAL! You buried it " + ZONES[zi].toLowerCase() + "! Now save the computer's kick — pick your dive!"; }
        else { ballTo(zi, false); beep(220, 0.15); el("pnMsg").textContent = "SAVED! The keeper read it. Now YOU are the keeper — pick your dive!"; }
        phase = "save";
      } else {
        var sz = rnd(6);
        var youSave = sz === zi ? Math.random() < 0.9 : Math.random() < 0.18;
        keeper.style.left = [14, 50, 86, 14, 50, 86][zi] + "%";
        keeper.style.top = [30, 26, 30, 52, 56, 52][zi] + "%";
        if(youSave){ ballTo(sz, false); beep(900, 0.1); el("pnMsg").textContent = "SAVED! Brilliant keeping!"; }
        else { cpuScore++; el("pnCpu").textContent = cpuScore; ballTo(sz, true); beep(220, 0.15); el("pnMsg").textContent = "Goal to the computer — it went " + ZONES[sz].toLowerCase() + "."; }
        phase = "shoot";
        if(decided() || round >= 5){
          if(!sudden && youScore === cpuScore && round >= 5){ sudden = true; el("pnMsg").textContent = "Level after 5 rounds — SUDDEN DEATH! Your kick:"; }
          else if(decided()){
            over = true;
            zonesEl.innerHTML = "";
            if(youScore > cpuScore){ winJingle(); el("pnMsg").textContent = "YOU WIN THE SHOOTOUT " + youScore + "–" + cpuScore + "! 🏆"; playBody.insertAdjacentHTML("beforeend", '<div class="btn-row"><button class="mini-btn orange" id="pnAgain">↻ Play Again</button></div>'); el("pnAgain").addEventListener("click", function(){ tap(); startNewGame(g); }); }
            else showGameOver("The computer wins the shootout " + cpuScore + "–" + youScore + ".");
            return;
          }
        }
        if(phase === "shoot" && !sudden){ round++; }
        if(sudden){ el("pnRound").textContent = "Sudden death"; }
        else el("pnRound").textContent = Math.min(5, round) + " / 5";
        later(function(){
          ball.style.left = "50%"; ball.style.top = "64%"; ball.textContent = "⚽";
          keeper.style.left = "50%"; keeper.style.top = "34%";
          if(!over) el("pnMsg").textContent = phase === "shoot" ? "Your kick — pick where to shoot!" : el("pnMsg").textContent;
        }, 1200);
      }
    }
    renderZones();
  }

  /* ================= Timing Hit (cricket / goalkeeper) ================= */
  function engTimingHit(g){
    playTitle.textContent = g.name + " — play!";
    if(g.theme === "cricket"){
      var runs = 0, balls = 0, wickets = 0, ballY = -20, speed = state.difficulty === "Easy" ? 3 : state.difficulty === "Hard" ? 4.6 : 3.8;
      var running = false, over = false, timer = null, swung = false;
      playBody.innerHTML =
        hudLine([["Runs", '<b id="crRuns">0</b>'], ["Balls", '<b id="crBalls">0</b> / 12'], ["Wickets", '<b id="crWk">0</b> / 3']]) +
        '<div id="crPitch" style="position:relative;height:300px;max-width:320px;margin:0 auto;background:linear-gradient(180deg,#C9A86A,#B8934F);border-radius:12px;overflow:hidden">' +
        '<div style="position:absolute;left:0;right:0;bottom:64px;height:44px;background:rgba(60,181,74,.4);border-top:2px dashed #fff;border-bottom:2px dashed #fff"></div>' +
        '<div style="position:absolute;left:50%;bottom:44px;transform:translateX(-50%);font-size:26px">🏏</div>' +
        '<div id="crBall" style="position:absolute;left:50%;top:-30px;transform:translateX(-50%);font-size:24px">🔴</div>' +
        '<div style="position:absolute;left:50%;top:6px;transform:translateX(-50%);font-size:22px">🧍</div></div>' +
        '<div class="msg" id="crMsg">Tap SWING as the ball enters the green hitting zone!</div>' +
        '<div class="btn-row"><button class="mini-btn orange" id="crStart">▶ Start Innings</button><button class="mini-btn" id="crSwing">🏏 SWING</button></div>';
      var ballEl = el("crBall");
      gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
      function newBall(){
        ballY = -26; swung = false;
        ballEl.style.top = ballY + "px";
      }
      function endBall(note){
        balls++; el("crBalls").textContent = Math.min(12, balls);
        el("crMsg").textContent = note;
        if(wickets >= 3){ over = true; clearInterval(timer); showGameOver("All out! You scored " + runs + " runs from " + balls + " balls."); return; }
        if(balls >= 12){ over = true; clearInterval(timer); showGameOver("Innings over! You scored " + runs + " runs" + (runs >= 40 ? " — a brilliant knock! 🏆" : ".")); return; }
        newBall();
      }
      function tick(){
        if(isPaused || over || !running) return;
        ballY += speed;
        ballEl.style.top = ballY + "px";
        var zoneTop = 300 - 64 - 44, zoneBot = 300 - 64;
        if(!swung && ballY > zoneBot + 16){
          wickets++; el("crWk").textContent = wickets;
          beep(160, 0.25);
          endBall("BOWLED! You didn't swing. " + wickets + " wicket" + (wickets > 1 ? "s" : "") + " down.");
          return;
        }
        if(ballY > 330) newBall();
      }
      el("crSwing").addEventListener("click", function(){
        if(!running || over || isPaused || swung) return;
        swung = true;
        var zoneTop = 300 - 64 - 44, zoneBot = 300 - 64, sweet = (zoneTop + zoneBot) / 2;
        var d = Math.abs(ballY + 10 - sweet);
        if(ballY + 10 >= zoneTop - 16 && ballY + 10 <= zoneBot + 10){
          if(d <= 13){ runs += 6; beep(1150, 0.12); endBall("SIX! Perfect timing — clean over the ropes!"); }
          else if(d <= 26){ runs += 4; beep(980, 0.1); endBall("FOUR! Great shot to the boundary!"); }
          else { runs += 2; beep(760, 0.08); endBall("Good contact — 2 runs."); }
          el("crRuns").textContent = runs;
        } else if(ballY < zoneTop - 16){
          endBall("Too early — swung and missed. Dot ball.");
          beep(300, 0.1);
        } else {
          wickets++; el("crWk").textContent = wickets;
          beep(160, 0.25);
          endBall("Too late — BOWLED! " + wickets + " wicket" + (wickets > 1 ? "s" : "") + " down.");
        }
      });
      el("crStart").addEventListener("click", function(){
        tap(); if(timer) clearInterval(timer);
        runs = 0; balls = 0; wickets = 0; running = true; over = false;
        el("crRuns").textContent = "0"; el("crBalls").textContent = "0"; el("crWk").textContent = "0";
        el("crStart").textContent = "↻ Restart";
        el("crMsg").textContent = "The bowler is running in…";
        newBall();
        timer = setInterval(tick, 16);
      });
      return;
    }
    /* goalkeeper */
    var lvl2 = lvlOf(g.id);
    var saves = 0, conceded = 0, needSaves = 5 + lvl2, shotState = "idle", shotZone = 1, shotT = 0, timer2 = null, over2 = false;
    var shotSpeed = (state.difficulty === "Easy" ? 46 : state.difficulty === "Hard" ? 30 : 38) - Math.min(10, lvl2);
    playBody.innerHTML =
      hudLine([["Saves", '<b id="gkSaves">0</b> / ' + needSaves], ["Conceded", '<b id="gkConc">0</b> / 3'], ["Level", lvl2]]) +
      '<div id="gkGoal" style="position:relative;background:linear-gradient(180deg,#2E7D32,#1C471E);border:4px solid #fff;border-bottom:0;border-radius:10px 10px 0 0;height:210px;max-width:320px;margin:10px auto 0;overflow:hidden">' +
      '<div id="gkBall" style="position:absolute;font-size:16px;left:50%;top:12%;transform:translate(-50%,-50%)">⚽</div>' +
      '<div id="gkYou" style="position:absolute;font-size:40px;left:50%;top:56%;transform:translate(-50%,-50%)">🧍</div></div>' +
      '<div class="btn-row"><button class="mini-btn" id="gkL">⬅ DIVE LEFT</button><button class="mini-btn" id="gkC">DIVE CENTER</button><button class="mini-btn" id="gkR">DIVE RIGHT ➡</button></div>' +
      '<div class="msg" id="gkMsg">Watch the shot and dive the same way!</div>' +
      '<div style="text-align:center"><button class="mini-btn orange" id="gkStart">▶ Start</button></div><div id="gkNext"></div>';
    var ballG = el("gkBall"), youG = el("gkYou");
    gameStopFn = function(){ over2 = true; if(timer2) clearInterval(timer2); };
    function newShot(){
      shotZone = rnd(3);
      shotT = 0; shotState = "flying";
      ballG.style.left = "50%"; ballG.style.top = "12%"; ballG.style.fontSize = "16px";
    }
    function resolveShot(dive){
      if(shotState !== "flying") return;
      shotState = "done";
      var zx = [16, 50, 84][shotZone];
      ballG.style.left = zx + "%"; ballG.style.top = "62%"; ballG.style.fontSize = "36px";
      youG.style.left = [16, 50, 84][dive] + "%";
      if(dive === shotZone){
        saves++; el("gkSaves").textContent = saves;
        beep(950, 0.1);
        if(saves >= needSaves){
          over2 = true; clearInterval(timer2); lvlSet(g.id, lvl2 + 1); winJingle();
          el("gkMsg").textContent = "Wall of a keeper! Level " + lvl2 + " cleared. 🏆";
          el("gkNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl2 + 1));
          el("gkNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          return;
        }
        el("gkMsg").textContent = "SAVED! " + (needSaves - saves) + " more saves needed.";
      } else {
        conceded++; el("gkConc").textContent = conceded;
        beep(200, 0.18);
        el("gkMsg").textContent = "Goal! It went " + ["left", "center", "right"][shotZone] + ".";
        if(conceded >= 3){ over2 = true; clearInterval(timer2); showGameOver("Three goals conceded! You made " + saves + " saves."); return; }
      }
      later(function(){ if(!over2){ youG.style.left = "50%"; newShot(); } }, 800);
    }
    function tickG(){
      if(isPaused || over2) return;
      if(shotState === "flying"){
        shotT++;
        var p = shotT / shotSpeed;
        var zx = [16, 50, 84][shotZone];
        ballG.style.left = (50 + (zx - 50) * p) + "%";
        ballG.style.top = (12 + 50 * p) + "%";
        ballG.style.fontSize = (16 + 20 * p) + "px";
        if(p >= 1) resolveShot(-1);
      }
    }
    [ ["gkL", 0], ["gkC", 1], ["gkR", 2] ].forEach(function(pair){
      el(pair[0]).addEventListener("click", function(){ resolveShot(pair[1]); });
    });
    el("gkStart").addEventListener("click", function(){
      tap(); if(timer2) clearInterval(timer2);
      saves = 0; conceded = 0; over2 = false;
      el("gkSaves").textContent = "0"; el("gkConc").textContent = "0";
      el("gkStart").textContent = "↻ Restart";
      el("gkMsg").textContent = "Here comes the first shot…";
      newShot();
      timer2 = setInterval(tickG, 16);
    });
  }

  /* ================= Drag Race ================= */
  function engDrag(g){
    var lvl = lvlOf(g.id);
    var phase = "wait", lightTimer = [], raceTimer = null, over = false;
    var youP = 0, cpuP = 0, cpuRate = 0.55 + lvl * 0.09 + Math.random() * 0.1;
    var speedo = 0, gear = 1, bogged = 0;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Gear", '<b id="drGear">—</b>'], ["Rival class", lvl], ["Lights", '<b id="drLight">🔴</b>']]) +
      '<div style="font-weight:800;font-size:13px;color:var(--muted)">YOU</div><div class="gx-track"><span class="gx-runner" id="drYou" style="left:0%">🏎️</span></div>' +
      '<div style="font-weight:800;font-size:13px;color:var(--muted)">RIVAL</div><div class="gx-track"><span class="gx-runner" id="drCpu" style="left:0%">🏍️</span></div>' +
      '<div class="gx-meter"><div class="zone" style="left:68%;width:20%"></div><div class="needle" id="drNeedle" style="left:0%"></div></div>' +
      '<div class="msg" id="drMsg">Tap START, wait for GREEN, then LAUNCH. Shift when the needle is in the green!</div>' +
      '<div class="btn-row"><button class="mini-btn" id="drStart">▶ Start</button><button class="mini-btn orange" id="drAction">🚦 LAUNCH</button></div><div id="drNext"></div>';
    gameStopFn = function(){ over = true; lightTimer.forEach(clearTimeout); if(raceTimer) clearInterval(raceTimer); };
    function setRunner(id, p){
      var trackW = el(id).parentElement.clientWidth || 300;
      el(id).style.left = "calc(" + Math.min(96, p) + "% )";
    }
    el("drStart").addEventListener("click", function(){
      tap();
      lightTimer.forEach(clearTimeout);
      if(raceTimer) clearInterval(raceTimer);
      phase = "wait"; over = false; youP = 0; cpuP = 0; gear = 1; speedo = 0; bogged = 0;
      cpuRate = 0.55 + lvl * 0.09 + Math.random() * 0.1;
      el("drYou").style.left = "0%"; el("drCpu").style.left = "0%";
      el("drGear").textContent = "—";
      el("drLight").textContent = "🔴";
      el("drMsg").textContent = "Lights are red… wait for green!";
      el("drStart").textContent = "↻ Restart";
      lightTimer.push(setTimeout(function(){ el("drLight").textContent = "🟠"; beep(440, 0.1); }, 700 + rnd(600)));
      lightTimer.push(setTimeout(function(){
        phase = "go"; el("drLight").textContent = "🟢"; beep(880, 0.16);
        el("drMsg").textContent = "GREEN! LAUNCH!";
        el("drAction").textContent = "⬆ SHIFT";
      }, 1500 + rnd(1400)));
    });
    el("drAction").addEventListener("click", function(){
      if(over || isPaused) return;
      if(phase === "wait"){
        over = true;
        lightTimer.forEach(clearTimeout);
        showGameOver("FALSE START! You launched on a red light — disqualified.");
        return;
      }
      if(phase === "go"){
        phase = "race";
        el("drGear").textContent = "1";
        el("drMsg").textContent = "Launched! SHIFT when the needle hits the green zone!";
        raceTimer = setInterval(function(){
          if(isPaused || over) return;
          speedo += 3.4; if(speedo > 100) speedo = 100;
          el("drNeedle").style.left = speedo + "%";
          var rate = 0.34 + gear * 0.13 - bogged * 0.05;
          if(bogged > 0) bogged--;
          youP += rate * 0.42;
          cpuP += cpuRate * 0.42;
          el("drYou").style.left = Math.min(94, youP) + "%";
          el("drCpu").style.left = Math.min(94, cpuP) + "%";
          if(youP >= 100 || cpuP >= 100){
            clearInterval(raceTimer); over = true;
            if(youP >= cpuP){
              lvlSet(g.id, lvl + 1); winJingle();
              el("drMsg").textContent = "YOU WIN THE RACE! Class " + lvl + " beaten. 🏆";
              el("drNext").innerHTML = nextLevelBtn("▶ Next Class — Level " + (lvl + 1));
              el("drNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
            } else showGameOver("The rival takes it by a nose! Level " + lvl + " stands — run it again.");
          }
        }, 50);
        return;
      }
      if(phase === "race"){
        if(speedo >= 68 && speedo <= 88){
          gear = Math.min(5, gear + 1);
          el("drGear").textContent = gear;
          speedo = 30;
          beep(920, 0.07);
          el("drMsg").textContent = "Perfect shift! Gear " + gear + ".";
        } else {
          bogged = 14;
          speedo = Math.max(18, speedo - 30);
          beep(220, 0.13);
          el("drMsg").textContent = speedo < 68 ? "Shifted too early — the engine bogs down!" : "Too late — you hit the redline!";
        }
      }
    });
  }

  /* ================= Tap Race (Derby Dash) ================= */
  function engTapRace(g){
    var pos = [0, 0, 0, 0], running = false, over = false, timer = null;
    var rates = [0, 0.55 + Math.random() * 0.25, 0.6 + Math.random() * 0.25, 0.5 + Math.random() * 0.3];
    playTitle.textContent = g.name + " — play!";
    var NAMES = ["YOU 🐎", "Comet", "Thunder", "Biscuit"];
    var rowsHtml = NAMES.map(function(n, i){
      return '<div style="font-weight:800;font-size:12.5px;color:var(--muted)">' + n + '</div><div class="gx-track"><span class="gx-runner" id="tr' + i + '" style="left:0%">' + (i === 0 ? "🏇" : "🐎") + '</span></div>';
    }).join("");
    playBody.innerHTML =
      hudLine([["Race", "100m dash"], ["Rivals", 3], ["Your taps", '<b id="trTaps">0</b>']]) +
      rowsHtml +
      '<div class="msg" id="trMsg">Tap GALLOP as fast as you can when the race starts!</div>' +
      '<div class="btn-row"><button class="mini-btn" id="trStart">▶ Start</button><button class="mini-btn orange" id="trTap" style="min-width:170px">🐎 GALLOP!</button></div>';
    var taps = 0;
    gameStopFn = function(){ over = true; if(timer) clearInterval(timer); };
    el("trTap").addEventListener("click", function(){
      if(!running || over || isPaused) return;
      taps++; el("trTaps").textContent = taps;
      pos[0] += 0.9 + Math.random() * 0.9;
      el("tr0").style.left = Math.min(94, pos[0]) + "%";
      beep(500 + rnd(200), 0.03);
      checkEnd();
    });
    function checkEnd(){
      if(over) return;
      var winner = -1;
      pos.forEach(function(p, i){ if(p >= 100 && winner < 0) winner = i; });
      if(winner >= 0){
        over = true; running = false; if(timer) clearInterval(timer);
        if(winner === 0){ winJingle(); el("trMsg").textContent = "YOUR HORSE WINS THE DERBY! 🏆 " + taps + " gallops!"; playBody.insertAdjacentHTML("beforeend", '<div class="btn-row"><button class="mini-btn orange" id="trAgain">↻ Race Again</button></div>'); el("trAgain").addEventListener("click", function(){ tap(); startNewGame(g); }); }
        else showGameOver(NAMES[winner] + " wins the derby — your horse finished " + (pos[0] >= pos[1] && pos[0] >= pos[2] && pos[0] >= pos[3] ? "1st" : "behind") + " at " + Math.floor(pos[0]) + "m.");
      }
    }
    el("trStart").addEventListener("click", function(){
      tap(); if(timer) clearInterval(timer);
      pos = [0, 0, 0, 0]; taps = 0;
      rates = [0, 0.55 + Math.random() * 0.25, 0.6 + Math.random() * 0.25, 0.5 + Math.random() * 0.3];
      running = true; over = false;
      el("trTaps").textContent = "0";
      for(var i = 0; i < 4; i++) el("tr" + i).style.left = "0%";
      el("trStart").textContent = "↻ Restart";
      el("trMsg").textContent = "And they're off! GALLOP!";
      var elapsed = 0;
      timer = setInterval(function(){
        if(isPaused || over) return;
        elapsed++;
        for(var i = 1; i < 4; i++){
          var surge = elapsed > 130 && i === 2 ? 0.22 : 0;
          pos[i] += (rates[i] + surge) * (0.7 + Math.random() * 0.6);
          el("tr" + i).style.left = Math.min(94, pos[i]) + "%";
        }
        checkEnd();
      }, 50);
    });
  }


  /* ================= Connect Four ================= */
  function engConnect4(g){
    var COLS = 7, ROWS = 6, board = [], turn = "R", over = false;
    for(var i = 0; i < COLS * ROWS; i++) board.push("");
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You", "🔴 Red"], ["CPU", "🟡 Yellow"], ["Status", '<b id="c4St">Your move</b>']]) +
      '<div class="gx-board" id="c4Board" style="grid-template-columns:repeat(7,1fr);background:#1565C0;padding:8px;border-radius:14px"></div>' +
      '<div class="msg" id="c4Msg">Tap a column to drop your disc. Connect 4 to win!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="c4New">↻ New game</button></div>';
    var box = el("c4Board");
    gameStopFn = function(){ over = true; };
    function winAt(idx, who){
      var x = idx % COLS, y = Math.floor(idx / COLS);
      var dirs = [[1,0],[0,1],[1,1],[1,-1]];
      for(var d = 0; d < 4; d++){
        var count = 1;
        for(var s = -1; s <= 1; s += 2){
          var nx = x, ny = y;
          while(true){
            nx += dirs[d][0] * s; ny += dirs[d][1] * s;
            if(nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || board[ny * COLS + nx] !== who) break;
            count++;
          }
        }
        if(count >= 4) return true;
      }
      return false;
    }
    function dropRow(col){
      for(var y = ROWS - 1; y >= 0; y--) if(!board[y * COLS + col]) return y;
      return -1;
    }
    function render(){
      box.innerHTML = "";
      board.forEach(function(v, idx){
        var d = document.createElement("button");
        d.className = "gx-disc";
        d.style.background = v === "R" ? "radial-gradient(circle at 35% 35%, #FF8A80, #C62828)" : v === "Y" ? "radial-gradient(circle at 35% 35%, #FFE082, #F9A825)" : "#E3F2FD";
        d.style.border = "0";
        d.setAttribute("aria-label", "Column " + (idx % COLS + 1));
        d.addEventListener("click", function(){ play(idx % COLS); });
        box.appendChild(d);
      });
    }
    function cpuMove(){
      if(over) return;
      var col = -1, c, r, placed = -1;
      for(c = 0; c < COLS; c++){
        r = dropRow(c);
        if(r >= 0){
          board[r * COLS + c] = "Y";
          if(winAt(r * COLS + c, "Y")){ col = c; placed = r * COLS + c; break; }
          board[r * COLS + c] = "";
        }
      }
      if(col < 0){
        for(c = 0; c < COLS; c++){
          r = dropRow(c);
          if(r >= 0){
            board[r * COLS + c] = "R";
            var blocks = winAt(r * COLS + c, "R");
            board[r * COLS + c] = "";
            if(blocks){ col = c; break; }
          }
        }
      }
      if(col < 0){
        var avail = [0,1,2,3,4,5,6].filter(function(cc){ return dropRow(cc) >= 0; });
        if(!avail.length) return;
        if(state.difficulty === "Easy") col = pick(avail);
        else {
          var pref = [3,2,4,1,5,0,6].filter(function(cc){ return avail.indexOf(cc) >= 0; });
          col = (state.difficulty === "Hard" || Math.random() < 0.6) ? pref[0] : pick(pref);
        }
      }
      if(placed < 0){
        r = dropRow(col);
        if(r < 0) return;
        board[r * COLS + col] = "Y";
        placed = r * COLS + col;
      }
      finishTurn(placed, "Y");
    }
    function finishTurn(idx, who){
      render();
      if(winAt(idx, who)){
        over = true;
        if(who === "R"){ winJingle(); el("c4St").textContent = "You win!"; el("c4Msg").textContent = "Four in a row — you beat the computer! 🏆"; }
        else { el("c4St").textContent = "CPU wins"; showGameOver("The computer connected four first. Run it back!"); }
        return;
      }
      if(board.every(function(v){ return v; })){
        over = true; el("c4St").textContent = "Draw";
        el("c4Msg").textContent = "The board is full — a draw!";
        return;
      }
      el("c4St").textContent = who === "R" ? "CPU thinking…" : "Your move";
    }
    function play(col){
      if(over || isPaused || turn !== "R") return;
      var r = dropRow(col);
      if(r < 0) return;
      board[r * COLS + col] = "R";
      beep(700, 0.06);
      turn = "Y";
      finishTurn(r * COLS + col, "R");
      if(!over) later(function(){ cpuMove(); turn = "R"; if(!over) el("c4St").textContent = "Your move"; }, 420);
    }
    el("c4New").addEventListener("click", function(){ tap(); startNewGame(g); });
    render();
  }

  /* ================= Reversi ================= */
  function engReversi(g){
    var N = 8, board = [], turn = "B", over = false;
    for(var i = 0; i < N * N; i++) board.push("");
    board[27] = "W"; board[28] = "B"; board[35] = "B"; board[36] = "W";
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You ⚫", '<b id="rvB">2</b>'], ["CPU ⚪", '<b id="rvW">2</b>'], ["Turn", '<b id="rvTurn">You</b>']]) +
      '<div class="gx-board" id="rvBoard" style="grid-template-columns:repeat(8,1fr);background:#00695C;padding:7px;border-radius:14px;gap:3px"></div>' +
      '<div class="msg" id="rvMsg">Tap a glowing square to place and flip. Trap white discs in a line!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="rvNew">↻ New game</button></div>';
    var box = el("rvBoard");
    gameStopFn = function(){ over = true; };
    function flips(idx, who){
      if(board[idx]) return [];
      var foe = who === "B" ? "W" : "B", x = idx % N, y = Math.floor(idx / N), out = [];
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(d){
        var line = [], nx = x, ny = y;
        while(true){
          nx += d[0]; ny += d[1];
          if(nx < 0 || nx >= N || ny < 0 || ny >= N) { line = []; break; }
          var v = board[ny * N + nx];
          if(v === foe) line.push(ny * N + nx);
          else if(v === who) break;
          else { line = []; break; }
        }
        if(line.length && board[(y + d[1] * (line.length + 1)) * N + (x + d[0] * (line.length + 1))] === who) out = out.concat(line);
      });
      return out;
    }
    function movesFor(who){
      var m = [];
      for(var i = 0; i < N * N; i++) if(flips(i, who).length) m.push(i);
      return m;
    }
    function counts(){
      var b = 0, w = 0;
      board.forEach(function(v){ if(v === "B") b++; else if(v === "W") w++; });
      el("rvB").textContent = b; el("rvW").textContent = w;
      return { b: b, w: w };
    }
    function render(){
      box.innerHTML = "";
      var myMoves = turn === "B" ? movesFor("B") : [];
      board.forEach(function(v, idx){
        var d = document.createElement("button");
        d.className = "gx-disc";
        d.style.borderRadius = "6px";
        d.style.border = "0";
        d.style.background = myMoves.indexOf(idx) >= 0 ? "#26A69A" : "#00897B";
        d.innerHTML = v ? '<span style="width:78%;height:78%;border-radius:50%;display:block;background:' + (v === "B" ? "radial-gradient(circle at 35% 35%, #616161, #111)" : "radial-gradient(circle at 35% 35%, #fff, #BDBDBD)") + '"></span>' : (myMoves.indexOf(idx) >= 0 ? '<span style="width:34%;height:34%;border-radius:50%;display:block;background:rgba(255,255,255,.5)"></span>' : "");
        d.addEventListener("click", function(){
          if(over || isPaused || turn !== "B") return;
          var f = flips(idx, "B");
          if(!f.length) return;
          board[idx] = "B";
          f.forEach(function(fi){ board[fi] = "B"; });
          beep(700, 0.06);
          turn = "W"; counts(); render(); afterTurn();
        });
        box.appendChild(d);
      });
    }
    function endCheck(){
      var c = counts();
      over = true;
      if(c.b > c.w){ winJingle(); el("rvMsg").textContent = "You win " + c.b + "–" + c.w + "! Board mastered. 🏆"; el("rvTurn").textContent = "You win!"; }
      else if(c.w > c.b) showGameOver("The computer wins " + c.w + "–" + c.b + ". The flips went its way!");
      else el("rvMsg").textContent = "A perfect draw, " + c.b + "–" + c.w + "!";
    }
    function afterTurn(){
      if(over) return;
      var wm = movesFor("W"), bm = movesFor("B");
      if(!wm.length && !bm.length){ endCheck(); return; }
      if(turn === "W"){
        if(!wm.length){ el("rvMsg").textContent = "CPU has no move — your turn again!"; turn = "B"; el("rvTurn").textContent = "You"; render(); return; }
        el("rvTurn").textContent = "CPU";
        later(function(){
          if(over) return;
          var mv = movesFor("W");
          var choice;
          if(state.difficulty === "Easy") choice = pick(mv);
          else {
            mv.sort(function(a, b){ return flips(b, "W").length - flips(a, "W").length; });
            choice = state.difficulty === "Hard" ? mv[0] : (Math.random() < 0.4 ? pick(mv) : mv[0]);
          }
          var f = flips(choice, "W");
          board[choice] = "W";
          f.forEach(function(fi){ board[fi] = "W"; });
          beep(460, 0.06);
          turn = "B"; counts(); render();
          el("rvTurn").textContent = "You";
          if(!movesFor("B").length && !movesFor("W").length) endCheck();
          else if(!movesFor("B").length){ el("rvMsg").textContent = "You have no move — CPU plays again!"; turn = "W"; afterTurn(); }
        }, 480);
      }
    }
    el("rvNew").addEventListener("click", function(){ tap(); startNewGame(g); });
    counts();
    render();
  }

  /* ================= Dots & Boxes ================= */
  function engDots(g){
    var N = 3; /* 3x3 boxes, 4x4 dots */
    var hLines = {}, vLines = {}, owners = {}, turn = "you", over = false, scores = { you: 0, cpu: 0 };
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You", '<b id="dbYou">0</b> boxes'], ["CPU", '<b id="dbCpu">0</b> boxes'], ["Turn", '<b id="dbTurn">You</b>']]) +
      '<div id="dbBoard" style="position:relative;width:280px;height:280px;margin:10px auto;background:var(--chip);border-radius:14px"></div>' +
      '<div class="msg" id="dbMsg">Tap a gap between dots to draw a line. Complete a box to claim it and draw again!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="dbNew">↻ New game</button></div>';
    var boardEl = el("dbBoard");
    gameStopFn = function(){ over = true; };
    var STEP = 280 / N, DOT = 14;
    function boxDone(bx, by){
      return hLines[by + "," + bx] && hLines[(by + 1) + "," + bx] && vLines[by + "," + bx] && vLines[by + "," + (bx + 1)];
    }
    function allEdges(){
      var e = [];
      for(var y = 0; y <= N; y++) for(var x = 0; x < N; x++) if(!hLines[y + "," + x]) e.push(["h", y, x]);
      for(var y2 = 0; y2 < N; y2++) for(var x2 = 0; x2 <= N; x2++) if(!vLines[y2 + "," + x2]) e.push(["v", y2, x2]);
      return e;
    }
    function claim(who){
      var claimed = 0;
      for(var by = 0; by < N; by++) for(var bx = 0; bx < N; bx++){
        if(!owners[by + "," + bx] && boxDone(bx, by)){ owners[by + "," + bx] = who; scores[who]++; claimed++; }
      }
      el("dbYou").textContent = scores.you;
      el("dbCpu").textContent = scores.cpu;
      return claimed;
    }
    function gameEnd(){
      over = true;
      if(scores.you > scores.cpu){ winJingle(); el("dbMsg").textContent = "You win " + scores.you + "–" + scores.cpu + " boxes! 🏆"; el("dbTurn").textContent = "You win!"; }
      else if(scores.cpu > scores.you) showGameOver("The computer wins " + scores.cpu + "–" + scores.you + " boxes.");
      else el("dbMsg").textContent = "A draw — " + scores.you + " boxes each!";
    }
    function render(){
      boardEl.innerHTML = "";
      for(var by = 0; by < N; by++) for(var bx = 0; bx < N; bx++){
        var own = owners[by + "," + bx];
        if(own){
          var sq = document.createElement("div");
          sq.style.cssText = "position:absolute;left:" + (bx * STEP + DOT / 2) + "px;top:" + (by * STEP + DOT / 2) + "px;width:" + (STEP - DOT) + "px;height:" + (STEP - DOT) + "px;border-radius:8px;background:" + (own === "you" ? "rgba(229,50,45,.35)" : "rgba(46,107,255,.35)") + ";display:grid;place-items:center;font-size:26px";
          sq.textContent = own === "you" ? "🔴" : "🔵";
          boardEl.appendChild(sq);
        }
      }
      function lineBtn(kind, y, x){
        var taken = kind === "h" ? hLines[y + "," + x] : vLines[y + "," + x];
        var b = document.createElement("button");
        var base = "position:absolute;border:0;padding:0;border-radius:99px;";
        if(kind === "h") b.style.cssText = base + "left:" + (x * STEP + DOT) + "px;top:" + (y * STEP + DOT / 2 - 5) + "px;width:" + (STEP - DOT) + "px;height:10px;background:" + (taken ? "#5D4037" : "rgba(93,64,55,.28)");
        else b.style.cssText = base + "left:" + (x * STEP + DOT / 2 - 5) + "px;top:" + (y * STEP + DOT) + "px;width:10px;height:" + (STEP - DOT) + "px;background:" + (taken ? "#5D4037" : "rgba(93,64,55,.28)");
        b.setAttribute("aria-label", (kind === "h" ? "Horizontal" : "Vertical") + " line " + (y + 1) + "," + (x + 1));
        if(!taken) b.addEventListener("click", function(){ draw(kind, y, x, "you"); });
        boardEl.appendChild(b);
      }
      for(var y = 0; y <= N; y++) for(var x = 0; x < N; x++) lineBtn("h", y, x);
      for(var y2 = 0; y2 < N; y2++) for(var x2 = 0; x2 <= N; x2++) lineBtn("v", y2, x2);
      for(var dy = 0; dy <= N; dy++) for(var dx = 0; dx <= N; dx++){
        var dot = document.createElement("div");
        dot.style.cssText = "position:absolute;width:" + DOT + "px;height:" + DOT + "px;border-radius:50%;background:#3E2723";
        dot.style.left = Math.min(dx * STEP, 280 - DOT) + "px"; dot.style.top = Math.min(dy * STEP, 280 - DOT) + "px";
        boardEl.appendChild(dot);
      }
    }
    function draw(kind, y, x, who){
      if(over) return;
      if(kind === "h") hLines[y + "," + x] = true; else vLines[y + "," + x] = true;
      beep(who === "you" ? 700 : 460, 0.05);
      var claimed = claim(who);
      render();
      if(!allEdges().length){ gameEnd(); return; }
      if(claimed > 0){
        el("dbMsg").textContent = (who === "you" ? "You" : "CPU") + " claimed " + claimed + " box" + (claimed > 1 ? "es" : "") + " — " + (who === "you" ? "draw again!" : "CPU draws again!");
        if(who === "cpu") later(cpuTurn, 550);
        return;
      }
      if(who === "you"){
        turn = "cpu"; el("dbTurn").textContent = "CPU";
        later(cpuTurn, 550);
      } else {
        turn = "you"; el("dbTurn").textContent = "You";
        el("dbMsg").textContent = "Your turn — tap a gap to draw.";
      }
    }
    function cpuTurn(){
      if(over) return;
      var edges = allEdges();
      if(!edges.length) return;
      var choice = null;
      /* take a completing edge first */
      for(var i = 0; i < edges.length; i++){
        var e = edges[i];
        if(e[0] === "h") hLines[e[1] + "," + e[2]] = true; else vLines[e[1] + "," + e[2]] = true;
        var completes = false;
        for(var by = 0; by < N && !completes; by++) for(var bx = 0; bx < N; bx++) if(!owners[by + "," + bx] && boxDone(bx, by)) completes = true;
        if(e[0] === "h") delete hLines[e[1] + "," + e[2]]; else delete vLines[e[1] + "," + e[2]];
        if(completes){ choice = e; break; }
      }
      if(!choice){
        if(state.difficulty === "Easy") choice = pick(edges);
        else {
          var safe = edges.filter(function(e){
            if(e[0] === "h") hLines[e[1] + "," + e[2]] = true; else vLines[e[1] + "," + e[2]] = true;
            var danger = false;
            for(var by2 = 0; by2 < N && !danger; by2++) for(var bx2 = 0; bx2 < N; bx2++){
              var cnt = (hLines[by2 + "," + bx2] ? 1 : 0) + (hLines[(by2 + 1) + "," + bx2] ? 1 : 0) + (vLines[by2 + "," + bx2] ? 1 : 0) + (vLines[by2 + "," + (bx2 + 1)] ? 1 : 0);
              if(cnt === 3 && !owners[by2 + "," + bx2]) danger = true;
            }
            if(e[0] === "h") delete hLines[e[1] + "," + e[2]]; else delete vLines[e[1] + "," + e[2]];
            return !danger;
          });
          choice = safe.length ? pick(safe) : pick(edges);
        }
      }
      draw(choice[0], choice[1], choice[2], "cpu");
    }
    el("dbNew").addEventListener("click", function(){ tap(); startNewGame(g); });
    render();
  }

  /* ================= Sea Battle ================= */
  function engShip(g){
    var N = 6, ships = [], shots = state.difficulty === "Easy" ? 22 : state.difficulty === "Hard" ? 15 : 18;
    var fired = {}, hits = 0, totalCells = 0, over = false;
    var sizes = [3, 2, 2];
    sizes.forEach(function(sz){
      var placedOk = false, guard = 0;
      while(!placedOk && guard++ < 300){
        var horiz = Math.random() < 0.5;
        var x = rnd(horiz ? N - sz + 1 : N), y = rnd(horiz ? N : N - sz + 1);
        var cells = [];
        for(var k = 0; k < sz; k++) cells.push(horiz ? y * N + x + k : (y + k) * N + x);
        var clash = ships.some(function(s){ return s.some(function(c){ return cells.indexOf(c) >= 0; }); });
        if(!clash){ ships.push(cells); placedOk = true; totalCells += sz; }
      }
    });
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["Shots", '<b id="sbShots">' + shots + '</b>'], ["Hits", '<b id="sbHits">0</b> / ' + totalCells], ["Ships", "3 (sizes 3, 2, 2)"]]) +
      '<div class="gx-ship-grid" id="sbGrid"></div>' +
      '<div class="msg" id="sbMsg">Tap a square to fire. Sink all 3 ships before your shots run out!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="sbNew">↻ New game</button></div>';
    var box = el("sbGrid");
    gameStopFn = function(){ over = true; };
    function shipAt(idx){ return ships.filter(function(s){ return s.indexOf(idx) >= 0; })[0] || null; }
    for(var i = 0; i < N * N; i++){
      (function(idx){
        var b = document.createElement("button");
        b.className = "gx-ship-cell"; b.textContent = "🌊";
        b.setAttribute("aria-label", "Sea square " + (idx + 1));
        b.addEventListener("click", function(){
          if(over || isPaused || fired[idx]) return;
          fired[idx] = true;
          shots--; el("sbShots").textContent = shots;
          var ship = shipAt(idx);
          if(ship){
            hits++; el("sbHits").textContent = hits;
            var sunk = ship.every(function(c){ return fired[c]; });
            b.className = "gx-ship-cell " + (sunk ? "sunk" : "hit");
            b.textContent = sunk ? "💥" : "🔥";
            beep(sunk ? 980 : 760, 0.1);
            el("sbMsg").textContent = sunk ? "Ship sunk! " + (totalCells - hits) + " sections remain." : "HIT! That ship is still afloat.";
            if(hits >= totalCells){
              over = true; winJingle();
              el("sbMsg").textContent = "Fleet destroyed with " + shots + " shots to spare! 🏆";
              return;
            }
          } else {
            b.className = "gx-ship-cell miss";
            b.textContent = "💧";
            beep(320, 0.07);
            el("sbMsg").textContent = "Splash — a miss. " + shots + " shots left.";
          }
          if(shots <= 0 && !over){
            over = true;
            ships.forEach(function(s){ s.forEach(function(c){ if(!fired[c]){ box.children[c].textContent = "🚢"; } }); });
            showGameOver("Out of shots! The fleet survives — the ships were where the 🚢 marks show.");
          }
        });
        box.appendChild(b);
      })(i);
    }
    el("sbNew").addEventListener("click", function(){ tap(); startNewGame(g); });
  }

  /* ================= Snakes & Ladders ================= */
  function engSnakes(g){
    var LADDERS = { 4: 25, 13: 46, 33: 49, 42: 63, 50: 69, 62: 81, 74: 92 };
    var SNAKES = { 99: 41, 89: 53, 76: 58, 66: 45, 55: 25, 43: 18, 27: 5 };
    var you = 1, cpu = 1, over = false, busy = false;
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You 🔴", '<b id="snlYou">1</b>'], ["CPU 🔵", '<b id="snlCpu">1</b>'], ["Dice", '<b id="snlDice">—</b>']]) +
      '<div class="gx-sq100" id="snlBoard"></div>' +
      '<div class="dice-face" id="snlFace" style="width:72px;height:72px;font-size:38px">🎲</div>' +
      '<div class="msg" id="snlMsg">Your turn — roll the dice!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="snlRoll">🎲 Roll Dice</button><button class="mini-btn" id="snlNew">↻ New game</button></div>';
    var boardEl = el("snlBoard");
    gameStopFn = function(){ over = true; };
    function render(){
      boardEl.innerHTML = "";
      for(var s = 100; s >= 1; s--){
        var d = document.createElement("div");
        var row = Math.floor((100 - s) / 10);
        d.textContent = (you === s && cpu === s) ? "🔴🔵" : you === s ? "🔴" : cpu === s ? "🔵" : (LADDERS[s] ? "🪜" : SNAKES[s] ? "🐍" : s);
        if(s === 100) d.className = "end";
        else if(you === s) d.className = "me";
        else if(cpu === s) d.className = "cpu2";
        boardEl.appendChild(d);
      }
      el("snlYou").textContent = you;
      el("snlCpu").textContent = cpu;
    }
    var FACES = ["⚀","⚁","⚂","⚃","⚄","⚅"];
    function move(who, roll){
      var pos = who === "you" ? you : cpu;
      pos = Math.min(100, pos + roll);
      var note = "";
      if(LADDERS[pos]){ note = " — ladder! Up to " + LADDERS[pos] + "."; pos = LADDERS[pos]; }
      if(SNAKES[pos]){ note = " — snake! Down to " + SNAKES[pos] + "."; pos = SNAKES[pos]; }
      if(who === "you") you = pos; else cpu = pos;
      render();
      return note;
    }
    function checkEnd(){
      if(you >= 100){ over = true; winJingle(); el("snlMsg").textContent = "You reached 100 first — you win! 🏆"; return true; }
      if(cpu >= 100){ over = true; showGameOver("The computer reached square 100 first!"); return true; }
      return false;
    }
    el("snlRoll").addEventListener("click", function(){
      if(over || busy || isPaused) return;
      busy = true;
      var roll = 1 + rnd(6);
      el("snlFace").textContent = FACES[roll - 1];
      el("snlDice").textContent = roll;
      beep(500 + roll * 40, 0.08);
      var note = move("you", roll);
      el("snlMsg").textContent = "You rolled " + roll + note;
      if(checkEnd()){ busy = false; return; }
      later(function(){
        if(over) return;
        var croll = 1 + rnd(6);
        el("snlFace").textContent = FACES[croll - 1];
        el("snlDice").textContent = croll;
        var cnote = move("cpu", croll);
        el("snlMsg").textContent = "CPU rolled " + croll + cnote + " Your turn!";
        checkEnd();
        busy = false;
      }, 750);
    });
    el("snlNew").addEventListener("click", function(){ tap(); startNewGame(g); });
    render();
  }

  /* ================= Checkers (Draughts) ================= */
  function engDraughts(g){
    var N = 8, board = [], turn = "you", sel = -1, over = false, mustJumpFrom = -1;
    for(var i = 0; i < N * N; i++) board.push(null);
    for(var y = 0; y < 3; y++) for(var x = 0; x < N; x++) if((x + y) % 2 === 1) board[y * N + x] = { who: "cpu", king: false };
    for(var y2 = 5; y2 < 8; y2++) for(var x2 = 0; x2 < N; x2++) if((x2 + y2) % 2 === 1) board[y2 * N + x2] = { who: "you", king: false };
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You 🔴", '<b id="dkYou">12</b>'], ["CPU 🔵", '<b id="dkCpu">12</b>'], ["Turn", '<b id="dkTurn">You</b>']]) +
      '<div class="gx-board" id="dkBoard" style="grid-template-columns:repeat(8,1fr);gap:2px"></div>' +
      '<div class="msg" id="dkMsg">Tap one of your red pieces, then a glowing square. Jump blue pieces to capture them!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="dkNew">↻ New game</button></div>';
    var box = el("dkBoard");
    gameStopFn = function(){ over = true; };
    function dirsFor(p){
      if(p.king) return [[1,1],[-1,1],[1,-1],[-1,-1]];
      return p.who === "you" ? [[1,-1],[-1,-1]] : [[1,1],[-1,1]];
    }
    function movesFrom(idx, onlyJumps){
      var p = board[idx]; if(!p) return [];
      var x = idx % N, y = Math.floor(idx / N), out = [];
      dirsFor(p).forEach(function(d){
        var mx = x + d[0], my = y + d[1], jx = x + d[0] * 2, jy = y + d[1] * 2;
        if(jx >= 0 && jx < N && jy >= 0 && jy < N && !board[jy * N + jx]){
          var mid = board[my * N + mx];
          if(mid && mid.who !== p.who) out.push({ to: jy * N + jx, cap: my * N + mx });
        }
        if(!onlyJumps && mx >= 0 && mx < N && my >= 0 && my < N && !board[my * N + mx]) out.push({ to: my * N + mx, cap: -1 });
      });
      return out;
    }
    function allMoves(who){
      var jumps = [], quiet = [];
      for(var i = 0; i < N * N; i++){
        if(board[i] && board[i].who === who){
          movesFrom(i, true).forEach(function(m){ jumps.push({ from: i, to: m.to, cap: m.cap }); });
          movesFrom(i, false).forEach(function(m){ if(m.cap < 0) quiet.push({ from: i, to: m.to, cap: -1 }); });
        }
      }
      return { jumps: jumps, quiet: quiet };
    }
    function countsD(){
      var a = 0, b = 0;
      board.forEach(function(p){ if(p){ if(p.who === "you") a++; else b++; } });
      el("dkYou").textContent = a; el("dkCpu").textContent = b;
      return { a: a, b: b };
    }
    function endIfDone(){
      var c = countsD();
      var ym = allMoves("you"), cm = allMoves("cpu");
      if(c.b === 0 || (!cm.jumps.length && !cm.quiet.length)){ over = true; winJingle(); el("dkMsg").textContent = "You win! All blue pieces captured or blocked. 🏆"; el("dkTurn").textContent = "You win!"; return true; }
      if(c.a === 0 || (turn === "you" && !ym.jumps.length && !ym.quiet.length)){ over = true; showGameOver("The computer wins this game of checkers."); return true; }
      return false;
    }
    function render(){
      box.innerHTML = "";
      var targets = sel >= 0 ? movesFrom(sel, mustJumpFrom === sel) : [];
      var jumpSet = {};
      if(turn === "you"){
        var am = allMoves("you");
        if(am.jumps.length) am.jumps.forEach(function(m){ jumpSet[m.from] = true; });
      }
      board.forEach(function(p, idx){
        var x = idx % N, y = Math.floor(idx / N);
        var b = document.createElement("button");
        b.className = "gx-disc";
        b.style.borderRadius = "5px";
        b.style.border = "0";
        b.style.background = (x + y) % 2 === 1 ? "#8D6E63" : "#D7CCC8";
        var isTarget = targets.some(function(m){ return m.to === idx; });
        if(isTarget) b.style.boxShadow = "inset 0 0 0 3px #FFC531";
        if(sel === idx) b.style.boxShadow = "inset 0 0 0 3px #FF6B1A";
        if(p) b.innerHTML = '<span style="width:80%;height:80%;border-radius:50%;display:grid;place-items:center;font-size:11px;background:' + (p.who === "you" ? "radial-gradient(circle at 35% 35%, #FF8A80, #C62828)" : "radial-gradient(circle at 35% 35%, #90CAF9, #1565C0)") + ';color:#fff;font-weight:800">' + (p.king ? "♛" : "") + '</span>';
        else if(jumpSet[idx]) b.innerHTML = '<span style="width:30%;height:30%;border-radius:50%;display:block;background:rgba(255,197,49,.8)"></span>';
        b.addEventListener("click", function(){ cellTap(idx); });
        box.appendChild(b);
      });
    }
    function applyMove(from, m, who){
      var p = board[from];
      board[m.to] = p; board[from] = null;
      if(m.cap >= 0) board[m.cap] = null;
      var y = Math.floor(m.to / N);
      if(!p.king && ((who === "you" && y === 0) || (who === "cpu" && y === N - 1))){ p.king = true; el("dkMsg").textContent = (who === "you" ? "Your piece" : "A blue piece") + " is crowned KING! ♛"; }
      beep(m.cap >= 0 ? 880 : 600, 0.06);
      countsD();
      if(m.cap >= 0){
        var more = movesFrom(m.to, true);
        if(more.length){ return m.to; }
      }
      return -1;
    }
    function cellTap(idx){
      if(over || isPaused || turn !== "you") return;
      if(sel >= 0){
        var opts = movesFrom(sel, mustJumpFrom === sel);
        var m = opts.filter(function(mm){ return mm.to === idx; })[0];
        if(m){
          var from = sel;
          var again = applyMove(from, m, "you");
          sel = -1;
          if(again >= 0){ mustJumpFrom = again; sel = again; el("dkMsg").textContent = "Another jump available — keep going!"; render(); return; }
          mustJumpFrom = -1;
          render();
          if(endIfDone()) return;
          turn = "cpu"; el("dkTurn").textContent = "CPU";
          render();
          later(cpuTurnD, 500);
          return;
        }
      }
      var p = board[idx];
      if(p && p.who === "you"){
        var am = allMoves("you");
        if(am.jumps.length && !am.jumps.some(function(mm){ return mm.from === idx; })){
          el("dkMsg").textContent = "A capture is available — you must take it! (glowing piece)";
          beep(240, 0.1);
          return;
        }
        sel = idx; render();
      }
    }
    function cpuTurnD(){
      if(over) return;
      var am = allMoves("cpu");
      var pool = am.jumps.length ? am.jumps : am.quiet;
      if(!pool.length){ endIfDone(); return; }
      var m;
      if(state.difficulty === "Easy") m = pick(pool);
      else if(am.jumps.length) m = pool[0];
      else {
        pool.sort(function(a2, b2){
          var ka = board[a2.to] && false ? 1 : 0;
          return 0;
        });
        m = state.difficulty === "Hard" ? pool[0] : pick(pool);
      }
      var again = applyMove(m.from, m, "cpu");
      render();
      if(endIfDone()) return;
      if(again >= 0){ later(cpuTurnDContinue(again), 450); return; }
      turn = "you"; el("dkTurn").textContent = "You";
      el("dkMsg").textContent = "Your move.";
      render();
    }
    function cpuTurnDContinue(fromIdx){
      return function(){
        if(over) return;
        var more = movesFrom(fromIdx, true);
        if(!more.length){ turn = "you"; el("dkTurn").textContent = "You"; render(); return; }
        var m = more[0];
        var again = applyMove(fromIdx, m, "cpu");
        render();
        if(endIfDone()) return;
        if(again >= 0) later(cpuTurnDContinue(again), 450);
        else { turn = "you"; el("dkTurn").textContent = "You"; render(); }
      };
    }
    el("dkNew").addEventListener("click", function(){ tap(); startNewGame(g); });
    countsD();
    render();
  }

  /* ================= Rock Paper Scissors ================= */
  function engRps(g){
    var you = 0, cpu = 0, over = false;
    var BEATS = { rock: "scissors", scissors: "paper", paper: "rock" };
    var EMO = { rock: "✊", paper: "✋", scissors: "✌️" };
    playTitle.textContent = g.name + " — play!";
    playBody.innerHTML =
      hudLine([["You", '<b id="rpYou">0</b>'], ["First to", 10], ["CPU", '<b id="rpCpu">0</b>']]) +
      '<div style="display:flex;justify-content:center;gap:26px;align-items:center;margin:14px 0">' +
      '<div style="text-align:center"><div id="rpYouHand" style="font-size:56px">❔</div><div style="font-weight:800;font-size:13px;color:var(--muted)">YOU</div></div>' +
      '<div style="font-family:\'Baloo 2\',cursive;font-size:22px">VS</div>' +
      '<div style="text-align:center"><div id="rpCpuHand" style="font-size:56px">❔</div><div style="font-weight:800;font-size:13px;color:var(--muted)">CPU</div></div></div>' +
      '<div class="btn-row"><button class="mini-btn" data-rps="rock" style="font-size:19px">✊ Rock</button><button class="mini-btn" data-rps="paper" style="font-size:19px">✋ Paper</button><button class="mini-btn" data-rps="scissors" style="font-size:19px">✌️ Scissors</button></div>' +
      '<div class="msg" id="rpMsg">Pick your hand!</div>';
    gameStopFn = function(){ over = true; };
    var lastCpu = "";
    playBody.querySelectorAll("[data-rps]").forEach(function(b){
      b.addEventListener("click", function(){
        if(over || isPaused) return;
        var mine = b.getAttribute("data-rps");
        var theirs;
        if(state.difficulty === "Hard" && lastCpu && Math.random() < 0.4){
          theirs = pick(["rock", "paper", "scissors"].filter(function(h){ return BEATS[h] === mine; }).concat(["rock"]));
          theirs = ["rock", "paper", "scissors"].filter(function(h){ return BEATS[h] === mine; })[0] || pick(["rock","paper","scissors"]);
          if(Math.random() < 0.6) theirs = pick(["rock", "paper", "scissors"]);
        } else theirs = pick(["rock", "paper", "scissors"]);
        lastCpu = theirs;
        el("rpYouHand").textContent = EMO[mine];
        el("rpCpuHand").textContent = EMO[theirs];
        if(mine === theirs){ el("rpMsg").textContent = "Draw — both chose " + mine + ". Go again!"; beep(500, 0.08); }
        else if(BEATS[mine] === theirs){
          you++; el("rpYou").textContent = you; beep(880, 0.09);
          el("rpMsg").textContent = mine + " beats " + theirs + " — point to you!";
        } else {
          cpu++; el("rpCpu").textContent = cpu; beep(240, 0.12);
          el("rpMsg").textContent = theirs + " beats " + mine + " — point to the CPU.";
        }
        if(you >= 10){ over = true; winJingle(); el("rpMsg").textContent = "You win the match " + you + "–" + cpu + "! 🏆"; }
        else if(cpu >= 10){ over = true; showGameOver("The computer wins the match " + cpu + "–" + you + "."); }
      });
    });
  }

  /* ================= Cards family (war / twenty-one / higher-lower) ================= */
  var SUITS = ["♠", "♥", "♦", "♣"];
  var RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  function drawCard(){
    var r = rnd(13);
    return { rank: RANKS[r], val: r + 1, suit: pick(SUITS), red: Math.random() < 0.5 };
  }
  function cardHtml(c){
    return '<span class="gx-card ' + (c.red ? "red" : "blk") + '">' + c.rank + '<small style="font-size:17px">' + c.suit + '</small></span>';
  }
  function engCards(g){
    playTitle.textContent = g.name + " — play!";
    if(g.theme === "war"){
      var you = 0, cpu = 0, rounds = 0, over = false;
      playBody.innerHTML =
        hudLine([["You", '<b id="cwYou">0</b>'], ["Round", '<b id="cwRound">0</b> / 20'], ["CPU", '<b id="cwCpu">0</b>']]) +
        '<div class="gx-cards"><div style="text-align:center"><div id="cwYouCard"><span class="gx-card back">★</span></div><small style="font-weight:800;color:var(--muted)">YOU</small></div>' +
        '<div style="text-align:center"><div id="cwCpuCard"><span class="gx-card back">★</span></div><small style="font-weight:800;color:var(--muted)">CPU</small></div></div>' +
        '<div class="msg" id="cwMsg">Tap Flip — the higher card takes the point. Ace is highest!</div>' +
        '<div style="text-align:center"><button class="mini-btn orange" id="cwFlip">🃏 Flip Cards</button></div>';
      gameStopFn = function(){ over = true; };
      el("cwFlip").addEventListener("click", function(){
        if(over || isPaused) return;
        var a = drawCard(), b = drawCard();
        a.val = a.rank === "A" ? 14 : a.val; b.val = b.rank === "A" ? 14 : b.val;
        el("cwYouCard").innerHTML = cardHtml(a);
        el("cwCpuCard").innerHTML = cardHtml(b);
        rounds++; el("cwRound").textContent = rounds;
        if(a.val > b.val){ you++; el("cwMsg").textContent = "Your " + a.rank + " beats " + b.rank + "!"; beep(880, 0.08); }
        else if(b.val > a.val){ cpu++; el("cwMsg").textContent = "CPU's " + b.rank + " beats your " + a.rank + "."; beep(240, 0.11); }
        else { el("cwMsg").textContent = "A tie — no points."; beep(500, 0.07); }
        el("cwYou").textContent = you; el("cwCpu").textContent = cpu;
        if(rounds >= 20){
          over = true;
          if(you > cpu){ winJingle(); el("cwMsg").textContent = "You win the war " + you + "–" + cpu + "! 🏆"; }
          else if(cpu > you) showGameOver("The computer wins the war " + cpu + "–" + you + ".");
          else el("cwMsg").textContent = "The war ends in a perfect draw, " + you + "–" + cpu + "!";
        }
      });
      return;
    }
    if(g.theme === "hl"){
      var lvl = lvlOf(g.id);
      var need = 4 + lvl, streak = 0, cur = drawCard(), over = false;
      cur.val = cur.rank === "A" ? 14 : cur.val;
      playBody.innerHTML =
        hudLine([["Streak", '<b id="hlStreak">0</b> / ' + need], ["Level", lvl], ["Card", '<b id="hlCount">1</b>']]) +
        '<div class="gx-cards"><div id="hlCard">' + cardHtml(cur) + '</div></div>' +
        '<div class="msg" id="hlMsg">Will the next card be HIGHER or LOWER than ' + cur.rank + '? (Ace is highest — a tie breaks the streak!)</div>' +
        '<div class="btn-row"><button class="mini-btn" id="hlLower">⬇ LOWER</button><button class="mini-btn orange" id="hlHigher">⬆ HIGHER</button></div><div id="hlNext"></div>';
      var count = 1;
      gameStopFn = function(){ over = true; };
      function guess(higher){
        if(over || isPaused) return;
        var nxt = drawCard();
        nxt.val = nxt.rank === "A" ? 14 : nxt.val;
        count++; el("hlCount").textContent = count;
        el("hlCard").innerHTML = cardHtml(nxt);
        var good = higher ? nxt.val > cur.val : nxt.val < cur.val;
        if(nxt.val === cur.val){
          over = true;
          showGameOver("A tie — another " + nxt.rank + "! Your streak ends at " + streak + " (needed " + need + ").");
          return;
        }
        if(good){
          streak++; el("hlStreak").textContent = streak;
          beep(760 + streak * 30, 0.07);
          cur = nxt;
          if(streak >= need){
            over = true; lvlSet(g.id, lvl + 1); winJingle();
            el("hlMsg").textContent = "Streak of " + need + "! Level " + lvl + " cleared. 🏆";
            el("hlNext").innerHTML = nextLevelBtn("▶ Next Level — Level " + (lvl + 1));
            el("hlNext").querySelector("[data-nextlvl]").addEventListener("click", function(){ tap(); startNewGame(g); });
          } else el("hlMsg").textContent = "Right! Streak " + streak + " — will the next beat " + cur.rank + "?";
        } else {
          over = true;
          showGameOver("Wrong way! The card was " + nxt.rank + ". Your streak ends at " + streak + " (needed " + need + ").");
        }
      }
      el("hlHigher").addEventListener("click", function(){ guess(true); });
      el("hlLower").addEventListener("click", function(){ guess(false); });
      return;
    }
    /* twenty-one (blackjack) */
    var chips = 100, hand = [], dealer = [], phase = "idle", over = false;
    playBody.innerHTML =
      hudLine([["Chips", '<b id="bjChips">100</b>'], ["Your hand", '<b id="bjYou">—</b>'], ["Dealer", '<b id="bjDealer">?</b>']]) +
      '<div style="text-align:center;font-weight:800;color:var(--muted);font-size:12.5px">DEALER</div><div class="gx-cards" id="bjDCards"></div>' +
      '<div style="text-align:center;font-weight:800;color:var(--muted);font-size:12.5px">YOU</div><div class="gx-cards" id="bjYCards"></div>' +
      '<div class="msg" id="bjMsg">Tap Deal to start a hand (bet 10 chips). Get closer to 21 than the dealer — without going over!</div>' +
      '<div class="btn-row"><button class="mini-btn orange" id="bjDeal">🂡 Deal (bet 10)</button><button class="mini-btn" id="bjHit" hidden>➕ Hit</button><button class="mini-btn" id="bjStand" hidden>✋ Stand</button></div>';
    gameStopFn = function(){ over = true; };
    function bjVal(cards){
      var t = 0, aces = 0;
      cards.forEach(function(c){
        if(c.rank === "A"){ aces++; t += 11; }
        else if(["K", "Q", "J"].indexOf(c.rank) >= 0) t += 10;
        else t += parseInt(c.rank, 10);
      });
      while(t > 21 && aces > 0){ t -= 10; aces--; }
      return t;
    }
    function renderBj(reveal){
      el("bjDCards").innerHTML = dealer.map(function(c, i){
        return (!reveal && i === 1) ? '<span class="gx-card back">★</span>' : cardHtml(c);
      }).join("");
      el("bjYCards").innerHTML = hand.map(cardHtml).join("");
      el("bjYou").textContent = hand.length ? bjVal(hand) : "—";
      el("bjDealer").textContent = reveal && dealer.length ? bjVal(dealer) : "?";
      el("bjChips").textContent = chips;
    }
    function endHand(){
      phase = "idle";
      el("bjHit").hidden = true; el("bjStand").hidden = true; el("bjDeal").hidden = false;
      renderBj(true);
      var y = bjVal(hand), d = bjVal(dealer);
      if(y > 21){ el("bjMsg").textContent = "Bust with " + y + "! You lose 10 chips."; beep(220, 0.15); }
      else if(d > 21){ chips += 20; el("bjMsg").textContent = "Dealer busts with " + d + "! You win 20 chips."; winJingle(); }
      else if(y > d){ chips += 20; el("bjMsg").textContent = "You win " + y + " vs " + d + " — +20 chips!"; winJingle(); }
      else if(d > y){ el("bjMsg").textContent = "Dealer wins " + d + " vs " + y + ". You lose 10 chips."; beep(220, 0.15); }
      else { chips += 10; el("bjMsg").textContent = "A push at " + y + " — your bet comes back."; }
      el("bjChips").textContent = chips;
      if(chips <= 0){
        over = true; el("bjDeal").hidden = true;
        showGameOver("Out of chips! The dealer takes the table this time.");
      } else if(chips >= 200){
        over = true; el("bjDeal").hidden = true;
        winJingle();
        el("bjMsg").textContent = "You doubled your stack to " + chips + " chips — table champion! 🏆";
      }
    }
    el("bjDeal").addEventListener("click", function(){
      if(over || isPaused || chips < 10) return;
      chips -= 10;
      hand = [drawCard(), drawCard()];
      dealer = [drawCard(), drawCard()];
      phase = "play";
      el("bjDeal").hidden = true; el("bjHit").hidden = false; el("bjStand").hidden = false;
      renderBj(false);
      el("bjMsg").textContent = "You have " + bjVal(hand) + ". Hit for another card, or Stand?";
      beep(640, 0.06);
      if(bjVal(hand) === 21){ el("bjMsg").textContent = "BLACKJACK! Stand and collect!"; }
    });
    el("bjHit").addEventListener("click", function(){
      if(phase !== "play" || isPaused) return;
      hand.push(drawCard());
      renderBj(false);
      beep(700, 0.05);
      if(bjVal(hand) > 21) endHand();
      else el("bjMsg").textContent = "You have " + bjVal(hand) + ". Hit or Stand?";
    });
    el("bjStand").addEventListener("click", function(){
      if(phase !== "play" || isPaused) return;
      while(bjVal(dealer) < 17) dealer.push(drawCard());
      endHand();
    });
  }

  /* ================= New-game dispatcher ================= */
  function startNewGame(g){
    playTitle.textContent = g.name + " — play!";
    switch(g.eng){
      case "quiz": engQuiz(g); break;
      case "classify": engClassify(g); break;
      case "simon": engSimon(g); break;
      case "gridfind": engGridFind(g); break;
      case "nummemory": engNumMemory(g); break;
      case "posmemory": engPosMemory(g); break;
      case "pairs": engPairs(g); break;
      case "typing": engTyping(g); break;
      case "slide": engSlide(g); break;
      case "lights": engLights(g); break;
      case "hanoi": engHanoi(g); break;
      case "mastermind": engMastermind(g); break;
      case "flood": engFlood(g); break;
      case "sudoku": engSudoku(g); break;
      case "magic": engMagic(g); break;
      case "binary": engBinary(g); break;
      case "wordsearch": engWordSearch(g); break;
      case "scramble": engScramble(g); break;
      case "hangman": engHangman(g); break;
      case "dodge": engDodge(g); break;
      case "runner": engRunner(g); break;
      case "catch": engCatch(g); break;
      case "tap": engTap(g); break;
      case "stack": engStack(g); break;
      case "bounce": engBounce(g); break;
      case "pong": engPong(g); break;
      case "copter": engCopter(g); break;
      case "shot": engShot(g); break;
      case "golf": engGolf(g); break;
      case "penalty": engPenalty(g); break;
      case "timinghit": engTimingHit(g); break;
      case "drag": engDrag(g); break;
      case "taprace": engTapRace(g); break;
      case "connect4": engConnect4(g); break;
      case "reversi": engReversi(g); break;
      case "dots": engDots(g); break;
      case "ship": engShip(g); break;
      case "snakes": engSnakes(g); break;
      case "draughts": engDraughts(g); break;
      case "rps": engRps(g); break;
      case "cards": engCards(g); break;
      default: buildOwnerGame(g.id);
    }
  }
  NEW_GAMES.forEach(function(g){ NEW_BUILDERS[g.id] = function(){ startNewGame(g); }; });


  /* ---------- Add Your Game form ---------- */
  var addForm = document.getElementById("addForm");
  addForm.addEventListener("submit", function(e){
    e.preventDefault(); tap();
    var fd = new FormData(addForm);
    var lines = [
      "Game name: " + fd.get("gname"),
      "Developer: " + fd.get("devname"),
      "WhatsApp: " + fd.get("whatsapp"),
      "Email: " + fd.get("email"),
      "Category: " + fd.get("gcat"),
      "Description: " + fd.get("gdesc"),
      "Game files: " + fd.get("gfiles")
    ];
    document.getElementById("addSummary").textContent = lines.join("\n");
    document.getElementById("sendSubWA").href = "https://wa.me/923352710980?text=" + encodeURIComponent(lines.join("\n"));
    var done = document.getElementById("addDone");
    done.hidden = false;
    done.scrollIntoView({behavior:"smooth", block:"start"});
  });
  document.getElementById("copySub").addEventListener("click", function(){
    tap();
    var btn = document.getElementById("copySub");
    var txt = document.getElementById("addSummary").textContent;
    function ok(){ btn.textContent = "✓ Copied — send it to the owner on WhatsApp"; }
    function fail(){ btn.textContent = "Copy failed — select the text above and copy it"; }
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fail);
    else fail();
  });

  /* ---------- Admin (PIN + dashboard) ---------- */
  function fmtNum(n){ return (""+n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function renderAdmin(){
    var tp = 0, tl = 0, sess = 0;
    GAMES.forEach(function(g){ tp += displayPlays(g); tl += g.likes; sess += (sessionPlays[g.id]||0); });
    if(!liveOK) tp = sess;
    document.getElementById("stPlays").textContent = fmtNum(tp);
    document.getElementById("stLikes").textContent = fmtNum(tl);
    document.getElementById("stGames").textContent = GAMES.length;
    document.getElementById("stLive").textContent = GAMES.length;
    var dev = document.getElementById("devSessionPlays");
    if(dev) dev.textContent = fmtNum(sess);
    var sorted = GAMES.slice().sort(function(a,b){ return displayPlays(b) - displayPlays(a); });
    var max = sorted.length ? displayPlays(sorted[0]) : 0;
    var box = document.getElementById("adminBars"); box.innerHTML = "";
    sorted.forEach(function(g){
      var n = displayPlays(g);
      var row = document.createElement("div"); row.className = "bar-row";
      row.innerHTML = '<div class="bar-head"><span>' + esc(g.name) + '</span><span>' + fmtNum(n) + ' plays</span></div>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' + (max > 0 ? Math.round(n / max * 100) : 0) + '%"></div></div>';
      box.appendChild(row);
    });
    var ol = document.getElementById("ownerGameList");
    if(ol){
      ol.innerHTML = "";
      var owners = GAMES.filter(function(g){ return g.owner; });
      if(!owners.length && !getPendingDeletes().length){
        var none = document.createElement("p");
        none.className = "ag-note"; none.style.margin = "0";
        none.textContent = "No owner-added games yet.";
        ol.appendChild(none);
      }
      owners.forEach(function(g){
        var orow = document.createElement("div"); orow.className = "owner-row";
        var info = document.createElement("div"); info.className = "owner-info";
        info.innerHTML = "<b>" + esc(g.name) + "</b><small>" + esc(g.cat) + "</small>";
        var del = document.createElement("button");
        del.type = "button"; del.className = "mini-btn danger"; del.textContent = "Delete";
        del.setAttribute("aria-label", "Delete the owner-added game " + g.name);
        del.addEventListener("click", function(){
          del.disabled = true; /* a delete in flight cannot be fired twice */
          deleteOwnerGame(g.id);
        });
        orow.appendChild(info); orow.appendChild(del);
        ol.appendChild(orow);
      });
      getPendingDeletes().forEach(function(p){
        var prow = document.createElement("div"); prow.className = "owner-row";
        var pinfo = document.createElement("div"); pinfo.className = "owner-info";
        pinfo.innerHTML = "<b>" + esc(p.name || "Owner game") + "</b><small>Delete pending — will retry. The delete has not reached the cloud yet, so the game is hidden here but may still show on other devices.</small>";
        prow.appendChild(pinfo);
        ol.appendChild(prow);
      });
    }
  }
  document.getElementById("pinForm").addEventListener("submit", function(e){
    e.preventDefault();
    var v = document.getElementById("fPin").value.trim();
    if(v === "1234"){
      state.adminUnlocked = true;
      document.getElementById("pinErr").hidden = true;
      document.getElementById("fPin").value = "";
      tap(); renderAdmin(); showView("admin"); refreshPlayCounts(); retryPendingDeletes(); refreshOwnerGames();
    } else {
      document.getElementById("pinErr").hidden = false;
      beep(200, 0.2);
    }
  });
  /* ---------- Admin: Add Game (owner, saved on this device) ---------- */
  var agPic = document.getElementById("agPic"), agPreview = document.getElementById("agPreview");
  agPic.addEventListener("change", function(){
    var f = agPic.files && agPic.files[0];
    if(f){ agPreview.src = URL.createObjectURL(f); agPreview.style.display = "block"; }
    else { agPreview.style.display = "none"; }
  });
  /* Shrink the uploaded picture before saving: max 720px on the long edge,
     WebP at quality 75, drawn through a canvas. If anything in that path is
     unsupported, fall back to the original file read as a data URL — the
     game is still added, never blocked by the picture step. */
  function readFileAsDataURL(file, cb){
    if(window.FileReader){
      var reader = new FileReader();
      reader.onload = function(){ cb(typeof reader.result === "string" ? reader.result : __CG_IMGS.logo); };
      reader.onerror = function(){ cb(__CG_IMGS.logo); };
      try{ reader.readAsDataURL(file); }catch(e){ cb(__CG_IMGS.logo); }
    } else cb(__CG_IMGS.logo);
  }
  function downscaleImage(file, cb){
    var url = null;
    try{ url = URL.createObjectURL(file); }catch(e){ readFileAsDataURL(file, cb); return; }
    var img = new Image();
    img.onload = function(){
      try{
        var w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
        if(!w || !h) throw new Error("no size");
        var scale = Math.min(1, 720 / Math.max(w, h));
        var cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(w * scale));
        cv.height = Math.max(1, Math.round(h * scale));
        var ctx = cv.getContext("2d");
        if(!ctx) throw new Error("no canvas");
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        var out = cv.toDataURL("image/webp", 0.75);
        URL.revokeObjectURL(url);
        if(out && out.indexOf("data:") === 0){ cb(out); return; }
        throw new Error("no data url");
      }catch(err){
        try{ URL.revokeObjectURL(url); }catch(e){}
        readFileAsDataURL(file, cb);
      }
    };
    img.onerror = function(){ try{ URL.revokeObjectURL(url); }catch(e){} readFileAsDataURL(file, cb); };
    img.src = url;
  }
  document.getElementById("adminAddForm").addEventListener("submit", function(e){
    e.preventDefault();
    var form = e.target;
    var name = document.getElementById("agName").value.trim();
    var cat = document.getElementById("agCat").value;
    var desc = document.getElementById("agDesc").value.trim();
    var type = document.getElementById("agType").value;
    if(!name || !desc) return;
    var f = agPic.files && agPic.files[0];
    var submitBtn = form.querySelector('button[type="submit"]');
    function finish(img){
      var maxAdded = 0;
      GAMES.forEach(function(x){ if(x.added > maxAdded) maxAdded = x.added; });
      var now = Date.now();
      var g = {
        id:"owner-" + now, name:name, cat:cat, img:img, desc:desc,
        plays:0, likes:0, trend:50, added:maxAdded + 1, isNew:true, owner:true, fileType:type,
        createdTs:now, steps: ownerGameSteps()
      };
      GAMES.push(g);
      sessionPlays[g.id] = 0;
      /* Always kept on this device too (the offline cache). */
      saveOwnerGames();
      /* The newest game always takes position #1: switch the list back to
         Newest-first so the just-published game is the first tile on Home. */
      setSort("newest");
      renderAdmin();
      form.reset();
      agPreview.style.display = "none";
      tap();
      /* Now the cloud save — the ONLY write this form makes. The result box
         is shown only after the answer comes back, so the message is always
         honest: cloud success says so, failure says NOT saved to the cloud. */
      document.getElementById("agDone").hidden = true;
      document.getElementById("agErr").hidden = true;
      if(submitBtn) submitBtn.disabled = true;
      saveOwnerGameToCloud(g).then(function(){
        document.getElementById("agDoneName").textContent = name;
        document.getElementById("agDone").hidden = false;
      }, function(){
        document.getElementById("agErrName").textContent = name;
        document.getElementById("agErr").hidden = false;
      }).then(function(){ if(submitBtn) submitBtn.disabled = false; });
    }
    if(f) downscaleImage(f, finish);
    else finish(__CG_IMGS.logo);
  });

  document.getElementById("adminLock").addEventListener("click", function(){
    tap(); state.adminUnlocked = false; showView("adminpin");
  });
  /* ---------- Premium modal ---------- */
  var modal = document.getElementById("premModal");
  document.querySelectorAll("[data-plan]").forEach(function(b){
    b.addEventListener("click", function(){
      tap();
      document.getElementById("modalText").innerHTML = "You chose <b>" + b.getAttribute("data-plan") + "</b>. Subscriptions are not available in this web version. Monthly Rs 99 and Yearly Rs 499 will be available in the Play Store app through <b>Google Play Billing</b> only. No payment has been taken.";
      modal.classList.add("open");
    });
  });
  document.getElementById("modalOk").addEventListener("click", function(){ tap(); modal.classList.remove("open"); });
  modal.addEventListener("click", function(e){ if(e.target===modal) modal.classList.remove("open"); });

  document.addEventListener("keydown", function(e){
    if(e.key==="Escape"){ closeMenu(); modal.classList.remove("open"); }
    if(!inPlay || isPaused || !state.current) return;
    if(state.current.id==="snake" && snakeTimer){
      var map = { ArrowUp:"up", ArrowDown:"down", ArrowLeft:"left", ArrowRight:"right" };
      if(map[e.key]){ e.preventDefault(); var btn = playBody.querySelector('[data-dir="'+map[e.key]+'"]'); if(btn) btn.click(); }
      return;
    }
    if(gameHooks.key && (e.key.indexOf("Arrow") === 0 || e.key === " ")){
      e.preventDefault();
      gameHooks.key(e.key === " " ? "Space" : e.key);
    }
  });

  window.addEventListener("hashchange", function(){
    if(window.location.hash === "#/admin") openAdmin();
    else if(document.body.classList.contains("admin-mode")) showView("home");
  });

  restoreOwnerGames();
  renderGrid();
  refreshPlayCounts();
  retryPendingDeletes();
  refreshOwnerGames();
  if(window.location.hash === "#/admin") openAdmin();
})();
