'use strict';
const W=1080,H=1920,DUR=90,GOLD='#D8AD55',NAVY='#101C35',BLK='#080808',GRY='#929292';
const C=document.getElementById('c'),x=C.getContext('2d'),$=id=>document.getElementById(id);
C.width=W;C.height=H;
/* ---------- Guion (duración en segundos; ajusta d si tu narración dura más) ---------- */
const SC=[
{d:8,n:'Algunos nacen con talento. Otros necesitan demostrarlo. Pero Luka Dončić nació para cambiar las reglas del juego.'},
{d:12,n:'Nacido en Liubliana, Eslovenia, el 28 de febrero de 1999, Luka comenzó a jugar baloncesto desde muy pequeño. Su talento lo llevaría a España cuando apenas tenía 13 años, para incorporarse a las categorías inferiores del Real Madrid.'},
{d:14,n:'En Madrid, Luka dejó de ser una promesa para convertirse en una realidad. Con apenas 16 años debutó con el primer equipo. Y en 2018, con solo 19 años, conquistó la Euroliga y fue elegido MVP de la competición y de su Final Four.'},
{d:15,n:'Su siguiente destino era Estados Unidos. En el Draft de 2018 fue seleccionado en el tercer puesto y sus derechos terminaron en Dallas. En su primera temporada conquistó el premio al Novato del Año. El mundo comenzaba a conocer a Luka Magic.'},
{d:15,n:'Con Dallas, Luka construyó una carrera extraordinaria. Su visión, sus pases imposibles y su capacidad para decidir partidos lo llevaron hasta las Finales de la NBA en 2024. Ya no era solamente una promesa: era una superestrella.'},
{d:13,n:'Pero el baloncesto siempre tiene nuevas sorpresas. En febrero de 2025, Luka fue traspasado a Los Angeles Lakers. Un nuevo equipo, una nueva ciudad y otro capítulo en una historia que todavía está escribiéndose.'},
{d:13,n:'Desde las calles de Eslovenia hasta las luces de la NBA. Luka Dončić demuestra que el talento puede abrir puertas, pero la pasión y el trabajo construyen una leyenda. Y lo mejor de su historia... todavía está por escribirse.'}];
const ST=[];SC.reduce((a,s,i)=>(ST[i]=a,a+s.d),0);
const HI=new Set(['TALENTO','ESLOVENIA','MADRID','NBA','SUPERESTRELLA','LAKERS','LEYENDA','EUROLIGA','DALLAS','MVP']);
/* ---------- Utilidades ---------- */
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),eo=v=>1-Math.pow(1-cl(v),3);
const rn=s=>{s=Math.sin(s*127.1)*43758.5453;return s-Math.floor(s)};
const IM={};['nino','madrid','euroliga','draft','finales','lakers','retrato','escudo'].forEach(k=>{const i=new Image();i.onload=()=>IM[k]=i;i.src='assets/'+k+(k==='escudo'?'.png':'.jpg')});
function photo(k,p,a=.6,z0=1.05,z1=1.25){const i=IM[k];if(!i)return false;const s=Math.max(W/i.width,H/i.height)*(z0+(z1-z0)*p),w=i.width*s,h=i.height*s;x.save();x.globalAlpha=a;x.drawImage(i,(W-w)/2,(H-h)/2,w,h);x.restore();const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(8,8,8,.7)');g.addColorStop(.5,'rgba(8,8,8,.1)');g.addColorStop(1,'rgba(8,8,8,.9)');x.fillStyle=g;x.fillRect(0,0,W,H);return true}
function T(s,px,py,sz,col='#fff',fam='A',a=1,ls=0,al='center'){x.save();x.globalAlpha=x.globalAlpha*cl(a);x.font=(fam==='M'?'700 ':'')+sz+'px '+({A:'Anton,Impact',M:'Montserrat,Arial',I:'Inter,Arial'}[fam])+',sans-serif';x.fillStyle=col;x.textAlign=al;x.textBaseline='middle';if('letterSpacing'in x)x.letterSpacing=ls+'px';x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=18;x.fillText(s,px,py);x.restore()}
const ty=(s,t)=>s.slice(0,Math.max(0,Math.floor(t*22)));
function ball(X,Y,r){x.save();x.shadowBlur=0;x.fillStyle='#d4692a';x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.strokeStyle='#2a1208';x.lineWidth=Math.max(1,r/10);x.beginPath();x.arc(X,Y,r,0,7);x.moveTo(X-r,Y);x.lineTo(X+r,Y);x.moveTo(X,Y-r);x.lineTo(X,Y+r);x.stroke();x.restore()}
function player(cx,cy,s,col,glow,arm=1){x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle=col;x.strokeStyle=col;x.shadowColor=glow;x.shadowBlur=40;x.beginPath();x.arc(0,-330,48,0,7);x.fill();x.beginPath();x.moveTo(-70,-270);x.lineTo(70,-270);x.lineTo(60,-40);x.lineTo(-60,-40);x.closePath();x.fill();x.fillRect(-60,-60,48,300);x.fillRect(12,-60,48,300);x.lineWidth=34;x.lineCap='round';x.beginPath();x.moveTo(60,-250);x.lineTo(120,-380-arm*60);x.stroke();x.beginPath();x.moveTo(-60,-250);x.lineTo(-110,-120);x.stroke();x.restore()}
function court(a,col=GOLD){x.save();x.strokeStyle=col;x.globalAlpha=a;x.lineWidth=4;x.strokeRect(140,500,800,900);x.beginPath();x.arc(540,1400,300,Math.PI,0);x.stroke();x.beginPath();x.arc(540,1400,560,Math.PI*1.1,Math.PI*1.9);x.stroke();x.strokeRect(390,1100,300,300);x.restore()}
function trail(k,p,col=GOLD){const sx=200+rn(k)*300,ex=540+rn(k+9)*300-100,pk=500+rn(k+3)*300,Y=u=>1500-(1500-pk)*Math.sin(Math.PI*u*.9),X=u=>sx+(ex-sx)*u;x.save();x.shadowColor=col;x.shadowBlur=30;x.strokeStyle=col;x.lineWidth=8;x.lineCap='round';x.beginPath();for(let i=0;i<=40*p;i++){const u=i/40;i?x.lineTo(X(u),Y(u)):x.moveTo(X(u),Y(u))}x.stroke();ball(X(p),Y(p),38);x.restore()}
function trophy(cx,cy,s){x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle=GOLD;x.strokeStyle=GOLD;x.shadowColor=GOLD;x.shadowBlur=50;x.beginPath();x.moveTo(-90,-120);x.lineTo(90,-120);x.quadraticCurveTo(80,40,0,60);x.quadraticCurveTo(-80,40,-90,-120);x.fill();x.fillRect(-12,50,24,80);x.fillRect(-60,130,120,28);x.lineWidth=14;x.beginPath();x.arc(-95,-70,40,Math.PI*.5,Math.PI*1.5);x.stroke();x.beginPath();x.arc(95,-70,40,-Math.PI*.5,Math.PI*.5);x.stroke();x.restore()}
function rays(cx,cy,r,rot,a){x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle='rgba(216,173,85,'+a+')';for(let i=0;i<20;i++){x.rotate(Math.PI/10);x.beginPath();x.moveTo(0,0);x.lineTo(r,-30);x.lineTo(r,30);x.fill()}x.restore()}
function jersey(cx,cy,s,f,tr,n,a=1){x.save();x.globalAlpha=a;x.translate(cx,cy);x.scale(s,s);x.beginPath();x.moveTo(-150,-260);x.lineTo(-70,-260);x.quadraticCurveTo(0,-170,70,-260);x.lineTo(150,-260);x.lineTo(210,-120);x.lineTo(150,-90);x.lineTo(150,260);x.lineTo(-150,260);x.lineTo(-150,-90);x.lineTo(-210,-120);x.closePath();x.fillStyle=f;x.fill();x.lineWidth=14;x.strokeStyle=tr;x.stroke();x.restore();x.save();x.globalAlpha=a;T(n,cx,cy+40*s,260*s,tr,'A');x.restore()}
function dot(P,lb,t){x.save();x.fillStyle=GOLD;x.shadowColor=GOLD;x.shadowBlur=30;x.beginPath();x.arc(P[0],P[1],14,0,7);x.fill();const q=t*1.3%1;x.globalAlpha=.5*(1-q);x.strokeStyle=GOLD;x.lineWidth=4;x.beginPath();x.arc(P[0],P[1],14+60*q,0,7);x.stroke();x.restore();T(lb,P[0],P[1]+64,30,'#fff','M',1,4)}
/* ---------- Escenas ---------- */
const SF=[
t=>{x.fillStyle='#000';x.fillRect(0,0,W,H);
 if(t>1){x.save();x.globalAlpha=t<5.3?eo(t-1):cl(1-(t-5.3)*2);player(540,1180,1.5,'#0c1428',GOLD);
  if(t>2.5){const r=260*eo(t-2.5),g=x.createRadialGradient(540,690,0,540,690,r+1);g.addColorStop(0,'rgba(255,240,210,.9)');g.addColorStop(1,'rgba(216,173,85,0)');x.fillStyle=g;x.fillRect(0,300,W,800)}x.restore()}
 if(t>2.5&&t<2.85){x.fillStyle='rgba(255,255,255,'+(1-(t-2.5)*3)+')';x.fillRect(0,0,W,H)}
 if(t>3&&t<5.3){court(.4);trail(Math.floor((t-3)/.77)+2,((t-3)%.77)/.77)}
 if(t>5.3){const q=eo((t-5.3)/.45),s=2.4-1.4*q,sh=t<5.9?(rn(t*50)-.5)*16*(1-q):0;x.save();x.translate(540+sh,880);x.scale(s,s);T('LUKA',0,-150,330,'#fff','A',q);T('DONČIĆ',0,150,330,GOLD,'A',q);x.restore()}
 if(t>6.6)T('THE MAGIC OF BASKETBALL.',540,1130,46,'#fff','M',eo((t-6.6)/.5),8)},
t=>{const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,NAVY);g.addColorStop(1,BLK);x.fillStyle=g;x.fillRect(0,0,W,H);photo('nino',t/12,.45);
 const A=[800,520],B=[240,900],K=[520,380],p=eo((t-.5)/3.5);
 x.save();x.strokeStyle=GRY;x.globalAlpha=.22;x.lineWidth=2;for(let i=0;i<14;i++){x.beginPath();x.moveTo(0,300+i*60);x.lineTo(W,300+i*60);x.stroke()}x.restore();
 x.save();x.strokeStyle=GOLD;x.lineWidth=8;x.shadowColor=GOLD;x.shadowBlur=25;x.setLineDash([26,18]);x.beginPath();for(let i=0;i<=60*p;i++){const u=i/60,X=(1-u)**2*A[0]+2*(1-u)*u*K[0]+u*u*B[0],Y=(1-u)**2*A[1]+2*(1-u)*u*K[1]+u*u*B[1];i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.restore();
 dot(A,'LIUBLIANA',t);if(t>3.6)dot(B,'MADRID',t);
 player(880,1260,.5,'#0c1428',GOLD);if(t>2)ball(720,1250-Math.abs(Math.sin(t*4))*170,34);
 if(t>4.5)T(ty('1999 — LJUBLJANA, ESLOVENIA.',t-4.5),90,1030,48,'#fff','M',1,2,'left');
 if(t>7.5)T(ty('2012 — REAL MADRID.',t-7.5),90,1110,48,GOLD,'M',1,2,'left');
 if(t>9){const q=eo((t-9)/.6);x.save();x.globalAlpha=q;if(IM.escudo)x.drawImage(IM.escudo,740,1000,180,180);else{x.strokeStyle=GOLD;x.lineWidth=6;x.beginPath();x.arc(830,1090,80,0,7);x.stroke();T('REAL',830,1070,34,'#fff','M');T('MADRID',830,1110,30,GOLD,'M')}x.restore()}},
t=>{x.fillStyle=BLK;x.fillRect(0,0,W,H);photo('euroliga',t/14,.5);
 const pa=t<6.6?1:cl(1-(t-6.6)*3);
 if(pa>0){x.save();x.globalAlpha=pa;x.translate(540,700);const sc=.85+.15*eo(t/.5);x.scale(sc,sc);x.rotate(-.04);x.save();x.beginPath();x.rect(-400,-400,800,780);x.clip();x.fillStyle=NAVY;x.fillRect(-400,-400,800,780);x.fillStyle='rgba(216,173,85,.25)';for(let i=0;i<20;i++)for(let j=0;j<20;j++){x.beginPath();x.arc(-390+i*42+(j%2)*21,-390+j*40,6+j*.25,0,7);x.fill()}
  player(-40,330,1.1,'#050b18',GOLD);const b=eo((t-1)/2);ball(80+b*240,-120-Math.sin(b*Math.PI)*120-b*140,34);x.restore();x.strokeStyle='#fff';x.lineWidth=14;x.strokeRect(-400,-400,800,780);x.restore()}
 if(t>1.5)T('16 AÑOS — DEBUT PROFESIONAL.',540,1190,44,'#fff','M',eo((t-1.5)/.4),3);
 if(t>5)T('2018 — CAMPEÓN DE EUROLIGA.',540,1255,44,GOLD,'M',eo((t-5)/.4),3);
 if(t>7){const tt=Math.min(t,10),q=eo((t-7)/.8);rays(540,700,1400,tt*.3,.18*q);trophy(540,700,2.2*q)}
 if(t>8.5)T('EUROLEAGUE MVP.',540,1320,60,'#fff','A',eo((t-8.5)/.4),6);
 if(t>10&&t<10.2){x.fillStyle='rgba(255,255,255,.5)';x.fillRect(0,0,W,H)}
 if(t>10){x.save();x.strokeStyle='rgba(255,255,255,.5)';x.lineWidth=6;x.strokeRect(40,40,W-80,H-80);x.restore()}},
t=>{x.fillStyle='#050a14';x.fillRect(0,0,W,H);photo('draft',t/15,.4);court(.12,'#6f8fd0');
 T('2018 NBA DRAFT.',540,330,66,GOLD,'M',eo(t/.6),8);
 if(t>1.2&&t<8.4){const q=eo((t-1.2)/.8),s=(.35+.65*q)*(t>7?1-eo((t-7)/1.2)*.8:1);x.save();x.globalAlpha=t>7?1-eo((t-7)/1):1;x.translate(540,760);x.scale(s,s);T('3',0,0,1300,'#fff','A');x.restore()}
 if(t>2.2)T('PICK #3.',540,1200,96,'#fff','A',eo((t-2.2)/.5),6);
 if(t>7.2){const q=eo((t-7.2)/1);jersey(540,740,1.5*(.6+.4*q),'#1d4e8f','#fff','77',q)}
 if(t>9.6)T('2019 — ROOKIE OF THE YEAR.',540,1290,52,GOLD,'M',eo((t-9.6)/.5),4)},
t=>{x.fillStyle='#050a14';x.fillRect(0,0,W,H);photo('finales',t/15,.55);
 x.save();x.setLineDash([22,16]);x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=5;for(let i=0;i<3;i++){x.beginPath();x.moveTo(160+i*300,1150);x.quadraticCurveTo(300+i*250,700,420+i*220,520);x.stroke()}x.restore();court(.3);
 if(t<9){const u=t*(.9+.09*t),f=u%1;trail(Math.floor(u)+40,f);if(f<.12){x.fillStyle='rgba(255,255,255,'+(.4-f*3)+')';x.fillRect(0,0,W,H)}}
 else{player(540,1250,1.3,'#0c1428',GOLD);trail(77,eo((t-9)/2.4)*.8+.1)}
 if(t>10.8)T('2024 — NBA FINALS.',540,330,66,GOLD,'M',eo((t-10.8)/.5),6);
 if(t>12.2){const q=eo((t-12.2)/.4);x.save();x.translate(540,700);x.scale(1.4-.4*q,1.4-.4*q);T('LUKA',0,-100,260,'#fff','A',q);T('MAGIC',0,130,260,GOLD,'A',q);x.restore()}},
t=>{x.fillStyle=BLK;x.fillRect(0,0,W,H);photo('lakers',t/13,.45);
 const sa=t<3?1:cl(1-(t-3)*2),ma=t<3?0:t<7?cl((t-3)*2):cl(1-(t-7)*2),ja=cl((t-7.2)*1.5),wp=eo(t/1.2);
 if(sa>0){x.save();x.globalAlpha=sa;x.beginPath();x.rect(0,0,W*wp,H);x.clip();
  x.beginPath();x.moveTo(0,0);x.lineTo(W,0);x.lineTo(W,900);x.lineTo(0,1100);x.closePath();x.fillStyle='#0a1d3d';x.fill();
  x.beginPath();x.moveTo(0,1100);x.lineTo(W,900);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fillStyle='#2b1450';x.fill();
  x.strokeStyle=GOLD;x.lineWidth=8;x.beginPath();x.moveTo(0,1100);x.lineTo(W,900);x.stroke();x.restore();
  x.save();x.globalAlpha=sa;T('DALLAS',540,460,170,'#fff','A');T('LOS ANGELES',540,1300,120,GOLD,'A');x.restore()}
 if(t>1)T('FEBRERO 2025.',540,250,54,GOLD,'M',eo((t-1)/.5)*sa,6);
 if(ma>0){x.save();x.globalAlpha=ma;x.strokeStyle='rgba(216,173,85,.6)';x.lineWidth=5;x.beginPath();[[140,880],[300,820],[560,830],[640,800],[900,820],[960,900],[930,1000],[860,1080],[800,1180],[720,1130],[620,1100],[520,1130],[360,1060],[220,1000],[150,960]].forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.closePath();x.stroke();
  const pr=eo((t-3.5)/2.5);x.setLineDash([20,14]);x.lineWidth=8;x.beginPath();x.moveTo(680,1000);x.lineTo(680+(230-680)*pr,1000+(940-1000)*pr);x.stroke();x.restore();dot([680,1000],'DALLAS',t);dot([230,940],'LOS ÁNGELES',t);T('NEW CHAPTER.',540,420,120,'#fff','A',ma)}
 if(ja>0){x.save();x.globalAlpha=ja;rays(540,800,1400,t*.15,.12);x.restore();jersey(540,800,1.5,'#552583','#FDB927','77',ja);T('LOS ANGELES LAKERS — #77.',540,1250,42,GOLD,'M',ja,3)}},
t=>{x.fillStyle=BLK;x.fillRect(0,0,W,H);photo('retrato',t/13,.6,1.05,1.15);
 if(t<5.5){const u=t*2.2;court(.2);trail(Math.floor(u)+20,u%1);x.save();x.globalAlpha=cl(1-Math.max(0,t-4.5));player(150+t/5.5*780,1200,1.2,'#0c1428',GOLD);x.restore()}
 if(t>6){const q=eo((t-6)/.6);x.save();x.translate(540,640);x.scale(1.3-.3*q,1.3-.3*q);T('LUKA',0,-120,250,'#fff','A',q);T('DONČIĆ',0,120,250,GOLD,'A',q);x.restore()}
 if(t>8.3)T('DE ESLOVENIA AL MUNDO.',540,960,54,'#fff','M',eo((t-8.3)/.5),4);
 if(t>10.2)T('THE STORY CONTINUES.',540,1050,38,GOLD,'M',eo((t-10.2)/.5),12);
 if(t>12.2){x.fillStyle='rgba(0,0,0,'+cl((t-12.2)/.8)+')';x.fillRect(0,0,W,H)}}];
/* ---------- Transiciones, subtítulos y acabado ---------- */
function trans(si,t,d){
 if(si===1&&t<.5){x.fillStyle='rgba(255,255,255,'+(1-t/.5)+')';x.fillRect(0,0,W,H)}
 if(si===2&&t<.8){x.save();x.beginPath();x.rect(0,0,W,H);x.arc(540,960,eo(t/.8)*1300,0,7);x.fillStyle=BLK;x.fill('evenodd');x.restore()}
 if(si===2&&t>d-.7)ball(540,960,eo((t-(d-.7))/.7)*1500);
 if(si===3&&t<.7)ball(540,960,(1-eo(t/.7))*1500);
 if(si===4&&t<.5){x.save();for(let i=0;i<14;i++){x.fillStyle='rgba(255,255,255,'+.35*(1-t/.5)+')';x.fillRect(-W+t/.5*2.4*W+rn(i+9)*400,rn(i)*H,W*.9,40+rn(i+5)*140)}x.restore()}
 if(si===6&&t<.9){x.fillStyle='rgba(0,0,0,'+(1-t/.9)+')';x.fillRect(0,0,W,H)}}
function subs(si,t){const s=SC[si],w=s.n.split(' '),t0=.4,t1=s.d-.4;let c=t0;
 for(let i=0;i<w.length;i+=6){const b=w.slice(i,i+6),dur=(t1-t0)*b.length/w.length;
  if(t>=c&&t<c+dur){const vis=Math.ceil((t-c)/dur*b.length*1.3),h=Math.ceil(b.length/2),L=[b.slice(0,h),b.slice(h)];let n=0;
   x.save();x.font='700 64px Montserrat,Arial,sans-serif';x.textBaseline='middle';x.textAlign='left';x.lineJoin='round';x.shadowColor='#000';x.shadowBlur=14;x.shadowOffsetY=4;
   L.forEach((ln,r)=>{const sp=x.measureText(' ').width,tw=ln.reduce((a,q)=>a+x.measureText(q).width+sp,-sp);let px=(W-tw)/2;
    ln.forEach(q=>{n++;if(n<=vis){x.lineWidth=10;x.strokeStyle='rgba(0,0,0,.85)';x.strokeText(q,px,1450+r*84);x.fillStyle=HI.has(q.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g,''))?GOLD:'#fff';x.fillText(q,px,1450+r*84)}px+=x.measureText(q).width+sp})});x.restore();break}
  c+=dur}}
function post(t){const g=x.createRadialGradient(540,960,500,540,960,1250);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.75)');x.fillStyle=g;x.fillRect(0,0,W,H);
 const f=Math.floor(t*24);x.fillStyle='#fff';for(let i=0;i<260;i++){x.globalAlpha=.05+rn(i+f)*.05;x.fillRect(rn(i*3.1+f)*W,rn(i*7.7+f)*H,2,2)}x.globalAlpha=1;
 const u=((t*.12)%1)*W*2-W/2,l=x.createLinearGradient(u-300,0,u+300,0);l.addColorStop(0,'rgba(216,173,85,0)');l.addColorStop(.5,'rgba(216,173,85,.07)');l.addColorStop(1,'rgba(216,173,85,0)');x.fillStyle=l;x.fillRect(0,0,W,H)}
const sceneAt=t=>{let i=0;while(i<6&&t>=ST[i+1])i++;return i};
function draw(t){const si=sceneAt(t),lt=t-ST[si],d=SC[si].d,z=1+lt/d*.04;x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.clearRect(0,0,W,H);
 x.save();x.translate(540,960);x.scale(z,z);x.translate(-540,-960);SF[si](lt);x.restore();trans(si,lt,d);subs(si,lt);post(t)}
/* ---------- Audio (Web Audio, sin licencias) ---------- */
let AC,master,dest,bus,nbuf,hasNar=false;const nar=new Audio('audio/narracion.mp3');nar.preload='auto';nar.oncanplaythrough=()=>hasNar=true;
function initAudio(){if(AC)return;AC=new AudioContext();master=AC.createGain();dest=AC.createMediaStreamDestination();master.connect(AC.destination);master.connect(dest);nbuf=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=nbuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;try{AC.createMediaElementSource(nar).connect(master)}catch(e){}}
function kick(t,v=.9){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(40,t+.2);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.35);o.connect(g).connect(bus);o.start(t);o.stop(t+.4)}
function nz(t,d,v,f,ty='highpass'){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=nbuf;fl.type=ty;fl.frequency.value=f;g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.3);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(fl).connect(g).connect(bus);s.start(t);s.stop(t+d+.05)}
function whoosh(t){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=nbuf;fl.type='bandpass';fl.Q.value=2;fl.frequency.setValueAtTime(300,t);fl.frequency.exponentialRampToValueAtTime(5000,t+.7);g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.5,t+.5);g.gain.linearRampToValueAtTime(0,t+.8);s.connect(fl).connect(g).connect(bus);s.start(t);s.stop(t+.9)}
function tone(f,t,d,v,ty='triangle'){const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(bus);o.start(t);o.stop(t+d+.05)}
function sched(from){bus=AC.createGain();bus.gain.value=.55;bus.connect(master);const base=AC.currentTime-from,at=e=>base+e,ok=e=>e>=from;
 const P=[[0,0],[3,.05],[34,.08],[49,.12],[77,.16],[88,.1],[90,0]];
 [55,82.41,110,164.81].forEach((f,i)=>[0,7].forEach(dt=>{const o=AC.createOscillator(),lp=AC.createBiquadFilter(),g=AC.createGain();o.type='sawtooth';o.frequency.value=f;o.detune.value=dt*(i+1)*.5-3;lp.type='lowpass';lp.frequency.value=600;let v=0;P.forEach(p=>{if(p[0]<=from)v=p[1]});g.gain.setValueAtTime(v/4,AC.currentTime);P.filter(p=>p[0]>from).forEach(p=>g.gain.linearRampToValueAtTime(p[1]/4,at(p[0])));o.connect(lp).connect(g).connect(bus);o.start();o.stop(base+90.1)}));
 for(let e=0;e<1.9;e+=.45)ok(e)&&kick(at(e),.45);
 [5.3,8,20,34,49,64,77,83,87.2].forEach(e=>{if(ok(e)){kick(at(e),e===87.2?1.2:.9);nz(at(e),1.6,.45,200,'lowpass')}});
 [7.5,19.5,33.4,48.5,63.5,76.4].forEach(e=>ok(e)&&whoosh(at(e)));
 for(let e=20;e<34;e+=.6)ok(e)&&tone([220,261.6,329.6,392,329.6,261.6][Math.round((e-20)/.6)%6],at(e),.5,.12);
 for(let e=34;e<88;e+=.6)ok(e)&&kick(at(e),.45+Math.min(e-34,40)/100);
 for(let e=49;e<87;e+=.3)ok(e)&&nz(at(e),.06,.12,7000);
 for(let e=64.3;e<87;e+=1.2)ok(e)&&nz(at(e),.18,.3,1800,'bandpass');
 if(from<49)nz(at(Math.max(49,from)),14,.1,900,'lowpass')}
/* ---------- Reproducción y exportación ---------- */
let playing=false,t0=0,cur=0,exporting=false,rec,spoken=-1;
const fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
function speak(si){if(hasNar||exporting||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(SC[si].n);u.lang='es-MX';u.rate=1.05;speechSynthesis.speak(u)}
function play(from=cur){initAudio();AC.resume();if(from>=DUR-.05)from=0;cur=from;sched(from);if(hasNar){nar.currentTime=from;nar.play().catch(()=>{})}playing=true;t0=performance.now()-from*1000;spoken=-1;$('pp').textContent='Pausa'}
function pause(){playing=false;if(bus)bus.disconnect();nar.pause();if(window.speechSynthesis)speechSynthesis.cancel();$('pp').textContent='Reproducir'}
function loop(){if(playing){cur=(performance.now()-t0)/1000;const si=sceneAt(cur);if(si!==spoken){spoken=si;speak(si)}if(cur>=DUR){cur=DUR-.001;pause();if(exporting)setTimeout(()=>rec&&rec.state!=='inactive'&&rec.stop(),400)}}
 draw(cur);$('seek').value=cur;$('tm').textContent=fmt(cur)+' / 1:30';requestAnimationFrame(loop)}
function exportVid(){initAudio();AC.resume();const mt=['video/mp4;codecs=avc1.42E01E,mp4a.40.2','video/mp4','video/webm;codecs=vp9,opus','video/webm'].find(m=>window.MediaRecorder&&MediaRecorder.isTypeSupported(m));if(!mt){alert('Este navegador no soporta MediaRecorder. Usa Chrome o Edge.');return}
 const st=C.captureStream(30);dest.stream.getAudioTracks().forEach(k=>st.addTrack(k));const ch=[];rec=new MediaRecorder(st,{mimeType:mt,videoBitsPerSecond:8e6});
 rec.ondataavailable=e=>e.data.size&&ch.push(e.data);
 rec.onstop=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(ch,{type:mt}));a.download='luka-doncic-documental.'+(mt.includes('mp4')?'mp4':'webm');a.click();exporting=false;$('ex').disabled=false;$('ex').textContent='Exportar video'};
 exporting=true;$('ex').disabled=true;$('ex').textContent='Grabando… 90 s';pause();rec.start(1000);play(0)}
$('pp').onclick=()=>playing?pause():play();
$('rs').onclick=()=>{pause();cur=0;play(0)};
$('seek').oninput=e=>{const v=+e.target.value,w=playing;if(w)pause();cur=v;if(w)play(v)};
$('ex').onclick=exportVid;
loop();
