(function(){
  const ROUNDS = 10;
  const POINTS = [10,9,8,7,6,5,4,3,2,1];
  const KEY = 'ladder-live-v6';

  const app = document.getElementById('app');
  const grid = document.getElementById('grid');
  const totalLeftEl = document.getElementById('totalLeft');
  const totalRightEl = document.getElementById('totalRight');
  const teamLeftEl = document.getElementById('teamLeft');
  const teamRightEl = document.getElementById('teamRight');
  const resetBtn = document.getElementById('resetBtn');
  const undoBtn = document.getElementById('undoBtn');

  let state = load() || { teams:{left:'5.W.4.T', right:'Opposants'}, rounds:Array(ROUNDS).fill(0) };
  let history = [];

  function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)); }catch(e){ return null; } }
  function vibrate(ms=10){ if (navigator.vibrate) navigator.vibrate(ms); }

  function render(){
    teamLeftEl.textContent = state.teams.left;
    teamRightEl.textContent = state.teams.right;

    grid.innerHTML = '';
    for (let i=0;i<ROUNDS;i++){
      const row = document.createElement('div'); row.className = 'row';
      const rank = document.createElement('div'); rank.className = 'cell rank'; rank.textContent = (i+1).toString();
      const left = document.createElement('div'); left.className = 'cell';
      const right = document.createElement('div'); right.className = 'cell';

      const leftBtn = document.createElement('div'); leftBtn.className = 'play left'; leftBtn.dataset.index=i;
      const rightBtn= document.createElement('div'); rightBtn.className = 'play right'; rightBtn.dataset.index=i;

      const leftStar= document.createElement('span'); leftStar.className='star'; leftStar.textContent = state.rounds[i]===1 ? '⭐' : ' ';
      const rightStar= document.createElement('span'); rightStar.className='star'; rightStar.textContent = state.rounds[i]===2 ? '⭐' : ' ';

      if (state.rounds[i]===1) leftBtn.classList.add('win');
      if (state.rounds[i]===2) rightBtn.classList.add('win');

      leftBtn.appendChild(leftStar); rightBtn.appendChild(rightStar);
      left.appendChild(leftBtn); right.appendChild(rightBtn);
      row.appendChild(rank); row.appendChild(left); row.appendChild(right); 
      grid.appendChild(row);

      leftBtn.addEventListener('click', ()=>{ pushHist(); state.rounds[i] = state.rounds[i]===1?0:1; if(state.rounds[i]===1) vibrate(8); updateTotals(); save(); render(); });
      rightBtn.addEventListener('click', ()=>{ pushHist(); state.rounds[i] = state.rounds[i]===2?0:2; if(state.rounds[i]===2) vibrate(8); updateTotals(); save(); render(); });
    }
    updateTotals();
    requestAnimationFrame(autoFit);
  }

  function updateTotals(){
    let l=0, r=0;
    for (let i=0;i<ROUNDS;i++){
      if (state.rounds[i]===1) l += POINTS[i];
      if (state.rounds[i]===2) r += POINTS[i];
    }
    totalLeftEl.textContent = l;
    totalRightEl.textContent = r;
  }

  function pushHist(){ history.push(JSON.stringify(state)); }

  function promptRename(side){
    const current = state.teams[side];
    const next = prompt("Nom de l'équipe:", current);
    if(next && next.trim().length){ pushHist(); state.teams[side] = next.trim(); save(); render(); }
  }
  teamLeftEl.addEventListener('click', ()=>promptRename('left'));
  teamRightEl.addEventListener('click', ()=>promptRename('right'));

  resetBtn.addEventListener('click', ()=>{
    if(confirm('Réinitialiser tous les rangs ?')){ pushHist(); state.rounds = Array(ROUNDS).fill(0); save(); render(); }
  });
  undoBtn.addEventListener('click', ()=>{
    if(history.length){ const prev = history.pop(); try{ state = JSON.parse(prev); save(); render(); vibrate(6);}catch(e){} }
  });

  // Auto-fit scale
  function setScale(val){ const c = Math.max(0.70, Math.min(1.00, val||1)); document.documentElement.style.setProperty('--scale', c.toString()); }
  function autoFit(){
    setScale(1);
    const rect = app.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.height > vh){ setScale(vh / rect.height); }
  }
  window.addEventListener('resize', ()=> requestAnimationFrame(autoFit));
  window.addEventListener('orientationchange', ()=> setTimeout(()=>requestAnimationFrame(autoFit), 300));

  render();
})();