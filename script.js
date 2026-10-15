
(function(){
  var root=document.documentElement;

  // Theme toggle (kept in memory; storage guarded)
  try{var saved=localStorage.getItem("theme");if(saved)root.setAttribute("data-theme",saved);}catch(e){}
  document.getElementById("theme").addEventListener("click",function(){
    var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches);
    var next=dark?"light":"dark";
    root.setAttribute("data-theme",next);
    try{localStorage.setItem("theme",next);}catch(e){}
  });

  // Mobile menu
  var menu=document.getElementById("menu"),mb=document.getElementById("menuBtn");
  mb.addEventListener("click",function(){
    var open=menu.classList.toggle("open");mb.setAttribute("aria-expanded",open);
  });
  menu.addEventListener("click",function(e){if(e.target.tagName==="A"){menu.classList.remove("open");mb.setAttribute("aria-expanded","false");}});

  // Code sample, revealed line by line
  var lines=[
    '<span class="k">class</span> Developer:',
    '    name = <span class="s">"Meera Nair"</span>',
    '    stack = [<span class="s">"FastAPI"</span>, <span class="s">"Django"</span>]',
    '',
    '    <span class="k">def</span> build(self, idea):',
    '        <span class="c"># tested, typed, documented</span>',
    '        <span class="k">return</span> ship(idea)'
  ];
  var pre=document.getElementById("code"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){pre.innerHTML=lines.join("\n");}
  else{
    var i=0;pre.innerHTML='<span class="cursor"></span>';
    (function next(){
      if(i>=lines.length)return;
      pre.innerHTML=lines.slice(0,++i).join("\n")+'\n<span class="cursor"></span>';
      setTimeout(next,380);
    })();
  }

  // Count-up stats
  document.querySelectorAll("[data-count]").forEach(function(el){
    var end=+el.dataset.count;
    if(reduce){el.textContent=end;return;}
    var n=0,step=Math.max(1,Math.round(end/30));
    var t=setInterval(function(){n+=step;if(n>=end){n=end;clearInterval(t);}el.textContent=n;},40);
  });

  // Project filters
  var btns=document.querySelectorAll(".filters button"),cards=document.querySelectorAll("#grid .card");
  btns.forEach(function(b){
    b.addEventListener("click",function(){
      btns.forEach(function(x){x.setAttribute("aria-pressed",x===b);});
      cards.forEach(function(c){c.hidden=!(b.dataset.f==="all"||c.dataset.c===b.dataset.f);});
    });
  });

  document.getElementById("yr").textContent=new Date().getFullYear();
})();
