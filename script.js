var NAME='Roro',CODE='15112011',$=function(i){return document.getElementById(i)};
document.querySelectorAll('[data-name]').forEach(function(e){e.textContent=NAME});
var cur='intro',hooks={};
function show(id){$(cur).classList.remove('on');cur=id;$(id).classList.add('on');if(hooks[id])hooks[id]();}
/* ===== canvas lights ===== */
var cv=$('bg'),x=cv.getContext('2d'),W,H,D=Math.min(devicePixelRatio||1,2),orbs=[],hts=[],sp=[],mx=-999,my=-999;
function rs(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;x.setTransform(D,0,0,D,0,0);}
rs();addEventListener('resize',rs);
for(var i=0;i<26;i++)orbs.push({x:Math.random()*W,y:Math.random()*H,r:25+Math.random()*80,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,h:320+Math.random()*50,a:.08+Math.random()*.14});
for(i=0;i<30;i++)hts.push({x:Math.random()*W,y:Math.random()*H,s:8+Math.random()*18,vy:.2+Math.random()*.6,p:Math.random()*6});
function burst(px,py,n,gold){for(var i=0;i<n;i++){var a=Math.random()*6.283,v=1+Math.random()*(gold?7:4);sp.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,h:gold?(Math.random()<.5?45:335):320+Math.random()*40,s:2+Math.random()*3,ht:Math.random()<.3})}}
function rain(){for(var i=0;i<120;i++)sp.push({x:Math.random()*W,y:-20,vx:(Math.random()-.5)*2,vy:2+Math.random()*3,l:2,h:Math.random()*360,s:5,ht:Math.random()<.4?2:(Math.random()<.5?1:0)})}
function fw(){burst(W*(.15+Math.random()*.7),H*(.15+Math.random()*.4),70,1);}
var stars=[];for(var q=0;q<70;q++)stars.push({x:Math.random(),y:Math.random(),r:Math.random()*1.6+.4,p:Math.random()*6});
function loop(t){x.clearRect(0,0,W,H);stars.forEach(function(s){x.globalAlpha=.25+.75*Math.abs(Math.sin(t/700+s.p));x.fillStyle='#fff';x.beginPath();x.arc(s.x*W,s.y*H,s.r,0,6.283);x.fill()});x.globalAlpha=1;x.globalCompositeOperation='lighter';
orbs.forEach(function(o){o.x+=o.vx;o.y+=o.vy;if(o.x<-100)o.x=W+100;if(o.x>W+100)o.x=-100;if(o.y<-100)o.y=H+100;if(o.y>H+100)o.y=-100;
var g=x.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);g.addColorStop(0,'hsla('+o.h+',100%,65%,'+o.a+')');g.addColorStop(1,'hsla('+o.h+',100%,65%,0)');x.fillStyle=g;x.fillRect(o.x-o.r,o.y-o.r,o.r*2,o.r*2);});
if(mx>0){var g=x.createRadialGradient(mx,my,0,mx,my,160);g.addColorStop(0,'rgba(255,120,180,.35)');g.addColorStop(1,'rgba(255,120,180,0)');x.fillStyle=g;x.fillRect(mx-160,my-160,320,320);}
x.globalCompositeOperation='source-over';x.shadowColor='#ff4d94';x.shadowBlur=12;x.textAlign='center';
hts.forEach(function(h){h.y-=h.vy;h.x+=Math.sin(t/900+h.p)*.4;if(h.y<-30){h.y=H+30;h.x=Math.random()*W}x.font=h.s+'px serif';x.fillStyle='rgba(255,120,175,'+(.25+.25*Math.sin(t/600+h.p))+')';x.fillText('♥',h.x,h.y)});
x.shadowBlur=0;x.globalCompositeOperation='lighter';
sp=sp.filter(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.vx*=.99;p.l-=.012;return p.l>0&&p.y<H+30});
sp.forEach(function(p){var a=Math.min(p.l,1);x.fillStyle='hsla('+p.h+',100%,70%,'+a+')';if(p.ht===2){x.fillRect(p.x,p.y,p.s*1.4,p.s*.7)}else if(p.ht){x.font=(p.s*3)+'px serif';x.fillText('♥',p.x,p.y)}else{x.beginPath();x.arc(p.x,p.y,p.s*a,0,6.283);x.fill()}});
requestAnimationFrame(loop)}
requestAnimationFrame(loop);
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(Math.random()<.35)sp.push({x:mx,y:my,vx:(Math.random()-.5)*1.5,vy:-Math.random()*1.5,l:.8,h:330+Math.random()*40,s:2.5,ht:0})});
/* 3D tilt */
document.querySelectorAll('[data-tilt]').forEach(function(e){e.addEventListener('pointermove',function(ev){var r=e.getBoundingClientRect(),dx=(ev.clientX-r.left)/r.width-.5,dy=(ev.clientY-r.top)/r.height-.5;e.style.transform='rotateY('+dx*18+'deg) rotateX('+(-dy*18)+'deg)'});e.addEventListener('pointerleave',function(){e.style.transform=''})});
/* ===== music (generated, no files) ===== */
var AC,mg,an,on=false,step=0,tm,song=null,EMBED='assets/song.mp3',hooked=false;
if(EMBED)song=new Audio(EMBED);
$('songin').onchange=function(e){var fl=e.target.files[0];if(!fl)return;song=new Audio(URL.createObjectURL(fl));hooked=false;e.target.parentNode.firstChild.textContent='✅ '+fl.name+' '};
var CH=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],SC=[69,72,74,76,79,81];
function f(m){return 440*Math.pow(2,(m-69)/12)}
function note(m,d,type,v){var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=type;o.frequency.value=f(m);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(mg);o.start(t);o.stop(t+d+.05)}
function tick(){if(!on||(song&&!song.paused&&!song.ended))return;var c=CH[Math.floor(step/8)%4],s=step%8;
if(s===0)c.forEach(function(m){note(m-12,4,'sine',.22)});
if(s%2===0)note(c[(s/2)%3]+12,1.2,'triangle',.18);
if(Math.random()<.4)note(SC[Math.floor(Math.random()*6)],1.6,'sine',.14);step++}
function music(){if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();mg.gain.value=.55;an=AC.createAnalyser();an.fftSize=64;
var d=AC.createDelay(),fb=AC.createGain();d.delayTime.value=.38;fb.gain.value=.45;mg.connect(an);an.connect(AC.destination);mg.connect(d);d.connect(fb);fb.connect(d);d.connect(an);
tm=setInterval(tick,480)}AC.resume();if(song){if(!hooked){hooked=true;try{AC.createMediaElementSource(song).connect(an)}catch(e){}}if(song.ended)song.currentTime=0;song.play()}on=true;$('snd').textContent='🔊';$('vinyl').classList.add('p');$('pp').textContent='⏸'}
function mute(){on=false;if(song)song.pause();if(AC)AC.suspend();$('snd').textContent='🔇';$('vinyl').classList.remove('p');$('pp').textContent='▶'}
function tog(){on?mute():music()}
$('snd').onclick=tog;$('pp').onclick=tog;
var eq=$('eq');for(var i=0;i<18;i++)eq.appendChild(document.createElement('i'));
setInterval(function(){var b=eq.children,a=an&&on?new Uint8Array(an.frequencyBinCount):null;if(a)an.getByteFrequencyData(a);
for(var i=0;i<b.length;i++)b[i].style.height=(a?4+a[i%a.length]/255*36:4)+'px'},90);
/* ===== flow ===== */
$('begin').onclick=function(){music();$('snd').style.display='block';burst(W/2,H/2,90,1);rain();show('lock')};
document.querySelectorAll('.hf input').forEach(function(i){i.onchange=function(){var fl=i.files[0];if(!fl)return;var r=new FileReader();r.onload=function(){i.parentNode.style.backgroundImage='url('+r.result+')';if(i.parentNode.firstElementChild.tagName==='SPAN')i.parentNode.firstElementChild.style.display='none'};r.readAsDataURL(fl)}});
/* keypad */
var inp='',go,sl=$('slots'),pd=$('pad');
for(var k=0;k<CODE.length;k++)sl.appendChild(document.createElement('span'));
function draw(){sl.querySelectorAll('span').forEach(function(s,i){s.textContent=i<inp.length?'♥':'';s.className=i<inp.length?'f':''});go.disabled=inp.length<CODE.length}
['1','2','3','4','5','6','7','8','9','⌫','0','♥'].forEach(function(k){var b=document.createElement('button');b.textContent=k;
if(k==='♥'){b.className='go';go=b;b.disabled=true;b.onclick=chk}
else if(k==='⌫')b.onclick=function(){inp=inp.slice(0,-1);draw();$('msg').textContent=''};
else b.onclick=function(){if(navigator.vibrate)navigator.vibrate(12);if(inp.length<CODE.length){inp+=k;draw()}};pd.appendChild(b)});
function chk(){if(inp===CODE){$('msg').textContent='Unlocked 💗';burst(W/2,H/2,120,1);setTimeout(function(){show('gifts')},900)}
else{$('msg').textContent='Wrong code, try again 💔';sl.classList.add('shake');setTimeout(function(){sl.classList.remove('shake');inp='';draw()},450)}}
/* gifts */
var opened={},gg=$('gg');
[['tulips','Gift 1'],['playlist','Gift 2'],['letter','Gift 3']].forEach(function(a){var b=document.createElement('button');b.className='gift';b.dataset.to=a[0];b.setAttribute('aria-label',a[1]);
b.innerHTML='<svg viewBox="0 0 120 130"><use href="#gb"/><use href="#gl" class="lid"/></svg>';
b.onclick=function(){if(b.classList.contains('open'))return;b.classList.add('open');var r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height*.4,80,1);setTimeout(function(){b.classList.remove('open');show(a[0])},1100)};gg.appendChild(b)});
document.querySelectorAll('[data-done]').forEach(function(b){b.onclick=function(){var id=b.dataset.done;opened[id]=1;document.querySelector('.gift[data-to="'+id+'"]').classList.add('done');
if(Object.keys(opened).length===3){show('finale')}else show('gifts')}});
var blown=0;
hooks.finale=function(){rain();fw();var n=0,iv=setInterval(function(){if(cur!=='finale'||blown||++n>40)return clearInterval(iv);fw()},1300)};
function hbd(){if(!on)music();var N=[[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,2],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]],t=0;
N.forEach(function(a){setTimeout(function(){note(a[0],a[1]*.5+.3,'triangle',.4)},t*1000);t+=a[1]*.45})}
function blow(){if(blown){location.hash='';location.reload();return}blown=1;$('cake').classList.add('out');$('fmsg').innerHTML='Make a wish… ✨ <span class="ar">اتمنّي أمنية يا حبيبتي 💗</span>';$('blow').textContent='Replay ♥';
hbd();rain();var n=0,iv=setInterval(function(){fw();if(++n>14)clearInterval(iv)},500);setTimeout(rain,2500);setTimeout(rain,5000)}
$('blow').onclick=blow;$('cake').onclick=function(){if(!blown)blow()};
(function(){var b=$('bunt'),L='HAPPYBIRTHDAY',c=['#ff4d94','#ffd98a','#7ad7ff','#b48cff','#7dffb2','#ff9a5c'];
for(var i=0;i<L.length;i++){var d=document.createElement('i');d.textContent=L[i];d.style.setProperty('--c',c[i%6]);d.style.animationDelay=(i*.15)+'s';b.appendChild(d)}
var B=$('bl');setInterval(function(){if(document.hidden||B.children.length>14)return;var e=document.createElement('b'),du=9+Math.random()*7;e.textContent='🎈';
e.style.left=Math.random()*95+'%';e.style.fontSize=(34+Math.random()*30)+'px';e.style.setProperty('--hr',Math.floor(Math.random()*360)+'deg');e.style.setProperty('--dx',(Math.random()*80-40)+'px');e.style.animationDuration=du+'s';
B.appendChild(e);setTimeout(function(){e.remove()},du*1000)},1300)})();
/* letter typewriter */
var TXT='My dearest '+NAME+',\nحبيبتي '+NAME+'،\nYou make my life feel more beautiful and meaningful.\nبتخلّي حياتي أحلى وليها معنى.\nYou make me smile, you make me feel safe.\nبتضحّكيني وبتحسّسيني بالأمان.\nThank you for filling my heart with so much love. No matter what happens, I will always choose you.\nشكراً إنك مالية قلبي حب. مهما حصل، هفضل أختارك دايماً.\n\nAlways, forever 💗\nدايماً وللأبد 💗',ty;
hooks.letter=function(){var p=$('paper'),i=0;p.textContent='';clearInterval(ty);ty=setInterval(function(){if(i>=TXT.length){clearInterval(ty);return}p.textContent+=TXT[i++]||'';if(p.textContent.slice(-1)==='\n')p.innerHTML=p.innerHTML;},38);p.style.whiteSpace='pre-wrap'};

document.querySelectorAll('.hbd').forEach(function(h){var t=h.dataset.hb,d=document.createElement('div');d.className='hl';
for(var i=0;i<t.length;i++){var sp=document.createElement('span');sp.textContent=t[i]===' '?'\u00a0':t[i];sp.style.setProperty('--i',i);d.appendChild(sp)}h.insertBefore(d,h.firstChild)});
document.querySelectorAll('.pf input').forEach(function(i){i.onchange=function(){var fl=i.files[0];if(!fl)return;var r=new FileReader();r.onload=function(){i.parentNode.querySelector('img').src=r.result};r.readAsDataURL(fl)}});
addEventListener('pointerdown',function(e){burst(e.clientX,e.clientY,16,0)});

document.addEventListener('pointerdown',function(e){var t=e.target.closest&&e.target.closest('.btn,.pad button,.pp,#snd');if(!t)return;var r=t.getBoundingClientRect(),d=Math.max(r.width,r.height),sp=document.createElement('span');sp.className='rip';
sp.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';t.appendChild(sp);setTimeout(function(){sp.remove()},700)});
