(function(){
  var pages=[].slice.call(document.querySelectorAll('.page'));
  var dots=document.getElementById('dots');
  pages.slice(0,6).forEach(function(){dots.appendChild(document.createElement('i'))});
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var back=document.getElementById('back'),cur=1,hist=[];
  function show(n){
    cur=n;back.classList.toggle('show',hist.length>0);
    pages.forEach(function(p,i){p.classList.toggle('on',i===n-1);if(i===n-1)p.scrollTop=0});
    [].forEach.call(dots.children,function(d,i){d.classList.toggle('on',i===Math.min(n,6)-1)});
    var b=pages[n-1].querySelector('button');if(b)setTimeout(function(){b.focus({preventScroll:true})},750);
  }

  function burst(x,y,count){
    if(reduce)return;
    var set=['💗','💖','💕','💜','🌸','✨','💞'];
    for(var i=0;i<count;i++){
      var s=document.createElement('span');s.className='burst';
      s.textContent=set[Math.floor(Math.random()*set.length)];
      var a=Math.random()*Math.PI*2,r=90+Math.random()*220;
      s.style.left=x+'px';s.style.top=y+'px';
      s.style.setProperty('--bx',Math.cos(a)*r+'px');
      s.style.setProperty('--by',(Math.sin(a)*r-60)+'px');
      s.style.setProperty('--br',(Math.random()*120-60)+'deg');
      document.body.appendChild(s);
      setTimeout(function(el){el.remove()},2000,s);
    }
  }

  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-go]');if(!t)return;
    var r=t.getBoundingClientRect();
    burst(r.left+r.width/2,r.top+r.height/2,t.id==='yes'?46:12);
    hist.push(cur);show(+t.dataset.go);
    if(t.id==='yes')setTimeout(function(){burst(innerWidth/2,innerHeight/2,40)},700);
  });

  var pe=document.getElementById('petals');
  if(!reduce){
    var sym=['💗','🌸','💜','💕','🌷'];
    for(var i=0;i<16;i++){
      var p=document.createElement('span');p.className='petal';
      p.textContent=sym[i%sym.length];
      p.style.left=Math.random()*100+'vw';
      p.style.fontSize=(14+Math.random()*16)+'px';
      p.style.animationDuration=(11+Math.random()*12)+'s';
      p.style.animationDelay=(-Math.random()*20)+'s';
      p.style.setProperty('--dx',(Math.random()*160-80)+'px');
      pe.appendChild(p);
    }
  }
  back.addEventListener('click',function(){if(hist.length)show(hist.pop())});
  var ily=document.querySelector('.iloveyou');
  'I LOVE YOU'.split('').forEach(function(ch,i){
    var s=document.createElement('span');s.style.setProperty('--i',i);
    if(ch===' ')s.className='sp';else s.textContent=ch;ily.appendChild(s);
  });
  document.querySelectorAll('.letter .l').forEach(function(p,i){p.style.setProperty('--d',(2.4+i*1.2)+'s')});
  var icons=['💗','💖','💕','💜','🌸'];
  setInterval(function(){
    if(cur!==6||reduce)return;
    var h=document.createElement('span');h.className='rise';
    h.textContent=icons[Math.floor(Math.random()*icons.length)];
    h.style.left=Math.random()*100+'vw';h.style.fontSize=(16+Math.random()*22)+'px';
    h.style.setProperty('--rx',(Math.random()*120-60)+'px');
    document.body.appendChild(h);setTimeout(function(el){el.remove()},6200,h);
  },380);
  show(1);
})();
