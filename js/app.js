/* ====== EDIT YOUR CONTENT HERE ====== */
const CONFIG = {
  owner: "Abhisek",
  fullName: "Abhisek Sahoo",
  role: "Java Full Stack Developer",
  intro: "I build secure banking and payment integrations for Canara Bank at Aurionpro. Have a look around.",
  replyEndpoint: "", // optional: your Google Apps Script URL to receive visitor replies
  sections: {
    "About me": { html: "<p>Java Full Stack Developer with 3+ years of experience building scalable backend systems for banking and financial services: Spring Boot microservices, REST APIs, Hibernate/JPA and Kafka, with React and Angular on the front end.</p><p>Based in Bangalore. Currently at Aurionpro Solutions Ltd, working on Canara Bank’s Digital Banking &amp; Transaction Management System.</p>" },
    "Experience": { html: "<p><b>Software Engineer, Aurionpro Solutions Ltd</b> (client: Canara Bank)<br>April 2026 – Present</p><ul><li>FSCM integrations for Dealer Finance and Supplier Finance: onboarding, limits, transactions, repayments and callback APIs</li><li>Token-based authentication for banking APIs</li><li>Kafka-based event processing for transaction and status updates</li></ul><p style='margin-top:14px'><b>Software Engineer, M3 Solutions Pvt. Ltd</b> (client: Wipro)<br>Aug 2023 – Mar 2026</p><ul><li>Spring Boot microservices and REST APIs, integrated with a React.js front end</li><li>Kafka, MongoDB, MySQL and AWS; JUnit and Mockito tests; Jenkins CI/CD; SonarQube and Splunk monitoring</li></ul>" },
    "Skills": { rows: [["Languages","Java (Core + DSA), SQL, PL/SQL, Shell Scripting"],["Java tech","Spring Boot, Spring MVC, Microservices, REST APIs, JDBC, Servlet, JSP, JUnit, Mockito, Kafka"],["Databases","Oracle SQL, PL/SQL, MySQL, MongoDB"],["Frontend","React.js, Angular, HTML, CSS, JavaScript, Thymeleaf"],["Cloud &amp; DevOps","AWS, Docker, Jenkins, Harness, CI/CD"],["Monitoring","SonarQube, Splunk"],["Tools","Git, GitHub, Postman, Maven, Gradle, Jira, Confluence, IntelliJ IDEA, VS Code"]] },
    "Projects": { html: "<p><b>Digital Banking &amp; Transaction Management System</b><br>Canara Bank Head Office · team of 11<br>A supply chain finance integration platform connecting Canara FSCM with banking and transaction systems: program onboarding, limit fetching, transaction processing, repayments and secure token-based APIs.</p><p style='margin-top:14px'><b>QuickTechLearners (QTL)</b><br>Wipro · EdTech · team of 12<br>A collaborative learning platform with structured courses, hands-on practice and progress tracking for instructors. Spring Boot microservices, React.js, MySQL and MongoDB.</p>" },
    "Education": { rows: [["MCA","KIIT University, Bhubaneswar · Oct 2022 – May 2024 · CGPA 7.75"],["BSc Computer Science","Utkal University, Bhubaneswar · Jun 2019 – Aug 2022 · CGPA 8.76"]] },
    "Contact": { list: ['<a href="mailto:abhiseksahoo0804@gmail.com">abhiseksahoo0804@gmail.com</a>','<a href="tel:+917735937661">+91 7735937661</a>','Bangalore, India','<a href="https://github.com/i-Abhisek" target="_blank" rel="noopener">GitHub</a>','<a href="https://www.linkedin.com/in/sahoo-abhisek/" target="_blank" rel="noopener">LinkedIn</a>'] }
  }
};
/* ===================================== */
const $=s=>document.querySelector(s), sleep=ms=>new Promise(r=>setTimeout(r,ms));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let skipping=false, visitorName='', following=false, camTarget=null, doorOpen=false, free=false, introOn=true, askRes=null;
const treeTops=[],players=[],people=[];
addEventListener('error',e=>{const b=$('#err');b.style.display='block';b.textContent='Error: '+e.message});
$('#brand').textContent=CONFIG.owner.toUpperCase()+'’S OFFICE';
$('#wTitle').textContent='Welcome to '+CONFIG.owner+'’s office';

/* ---------- renderer, camera, lights ---------- */
const scene=new THREE.Scene();
scene.background=new THREE.Color('#bcd9e8');scene.fog=new THREE.Fog('#bcd9e8',55,110);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);
const camera=new THREE.PerspectiveCamera(30,1,.1,220);
scene.add(new THREE.HemisphereLight(0xffffff,0x8aa88a,.85));
const sun=new THREE.DirectionalLight(0xfff0d8,.8);sun.position.set(14,28,10);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-36,right:36,top:36,bottom:-36,far:90});
scene.add(sun);

/* ---------- helpers ---------- */
const MAT={};const mat=c=>MAT[c]||(MAT[c]=new THREE.MeshLambertMaterial({color:c}));
const gmat=new THREE.MeshLambertMaterial({color:'#bfe0dc',transparent:true,opacity:.28,depthWrite:false});
function put(m,x,y,z,p=scene){m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;p.add(m);return m}
function box(w,h,d,c,x,y,z){return put(new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof c==='string'?mat(c):c),x,y+h/2,z)}
function cyl(r,h,c,x,y,z,seg=16){return put(new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,seg),mat(c)),x,y+h/2,z)}
function glass(w,d,x,z){const m=box(w,.9,d,gmat,x,0,z);m.castShadow=false;box(w,.06,d,'#2b2f33',x,.9,z)}
function plant(x,z){cyl(.28,.4,'#a97a45',x,0,z);put(new THREE.Mesh(new THREE.SphereGeometry(.5,12,10),mat('#2f7a50')),x,.95,z)}
function tree(x,z,s=1){cyl(.18*s,1.2*s,'#6b4426',x,0,z,8);treeTops.push(put(new THREE.Mesh(new THREE.ConeGeometry(1*s,3*s,10),mat('#2d6a45')),x,2.6*s,z))}
function lamp(x,z){cyl(.06,3.2,'#21503b',x,0,z,6);put(new THREE.Mesh(new THREE.SphereGeometry(.22,8,6),new THREE.MeshBasicMaterial({color:'#fff6c8'})),x,3.3,z)}
function carMesh(color,x,z,rot=0){
  const g=new THREE.Group();
  put(new THREE.Mesh(new THREE.BoxGeometry(2.6,.7,1.3),mat(color)),0,.65,0,g);
  put(new THREE.Mesh(new THREE.BoxGeometry(1.4,.5,1.15),mat('#dfe6e8')),-.1,1.2,0,g);
  [[-.9,-.65],[.9,-.65],[-.9,.65],[.9,.65]].forEach(([a,b])=>{const w=put(new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.2,10),mat('#1c1c1c')),a,.3,b,g);w.rotation.x=Math.PI/2});
  g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);return g;
}
function label(text,parent,y=2){
  const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');
  g.fillStyle='#1d2a24';g.beginPath();g.roundRect?g.roundRect(8,10,240,44,22):g.rect(8,10,240,44);g.fill();
  g.fillStyle='#fff';g.font='600 26px Figtree,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(text,128,33);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));
  s.scale.set(2,.5,1);s.position.y=y;s.renderOrder=9;parent.add(s);
}
function winMat(w,h,color){
  const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');
  g.fillStyle=color;g.fillRect(0,0,64,64);g.fillStyle='#9cc3d4';g.fillRect(12,12,40,34);g.fillStyle='#6a93a4';g.fillRect(12,28,40,3);
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(w/3,h/3);return new THREE.MeshLambertMaterial({map:t});
}

/* ---------- city ---------- */
box(160,.3,160,'#9cc59a',0,-.3,0);
box(160,.04,5,'#3b3f40',0,0,13);                       // road
box(160,.08,2.2,'#bdb8a8',0,0,9.4);                    // sidewalk
for(let i=0;i<9;i++)box(.6,.06,5,'#efefe6',-12+i*1.1,.02,13); // zebra crossing
for(let x=-40;x<=40;x+=6)box(2.2,.06,.14,'#e8e8e0',x,.02,13.6);
// background buildings
[[-26,-30,10,14],[-6,-32,8,10],[16,-30,12,16],[38,-28,9,12],[-48,-24,9,11]].forEach(([x,z,w,h])=>{
  put(new THREE.Mesh(new THREE.BoxGeometry(w,h,9),winMat(w,h,x%2?'#b5654a':'#c9b48e')),x,h/2,z);
});
// parking lot (west) and football pitch (east)
box(9,.05,15,'#4a4e50',-23,0,-1);
for(let i=0;i<5;i++)box(.1,.06,3,'#e8e8e0',-26+ (i%2?0:0)+0,.02,-7+i*3.2); 
[['#b8312f',-24.5,-5.5],['#2f5f9a',-24.5,-2.3],['#d9d2bd',-24.5,.9],['#2d6a45',-24.5,4.1]].forEach(([c,x,z])=>carMesh(c,x,z,Math.PI/2));
box(11,.05,17,'#79bd77',25,0,-1);
box(11,.06,.12,'#f2f2ea',25,.02,-1);cyl(1.6,.06,'#f2f2ea',25,.02,-1,24);
for(const x of [19.6,30.4])for(const z of [-2.4,.4])cyl(.08,1.2,'#f2f2ea',x,0,z,6);
[[-4,-9],[4,-9]].forEach(()=>0);
[[-30,-8],[-31,2],[-30,10],[34,-12],[34,10],[8,-14],[-14,-14],[20,22],[-20,22],[0,22],[40,0]].forEach(([x,z])=>tree(x,z,1+((x+z)%3)*.1));
[-14,-2,10,22].forEach(x=>lamp(x,8.6));

/* ---------- the office ---------- */
function signTex(text,w,h,bg,fg,font,border){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,w,h);if(border){g.strokeStyle=border;g.lineWidth=10;g.strokeRect(5,5,w-10,h-10)}g.fillStyle=fg;g.font=font;g.textAlign='center';g.textBaseline='middle';g.fillText(text,w/2,h/2+4);return new THREE.CanvasTexture(c)}
function plank(base,line,rx,ry){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=base;g.fillRect(0,0,128,128);g.fillStyle=line;for(let i=0;i<4;i++){g.fillRect(0,i*32,128,2);g.fillRect((i*47)%128,i*32,2,32)}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);return new THREE.MeshLambertMaterial({map:t})}
const WALL='#e6e0cf',WL=1.0,WT=2.8,DARK='#1b1e21';
box(28,.15,16,plank('#ece8da','#d8d2c0',14,8),0,0,-1);        // light plank floor
box(5.6,.17,7.6,plank('#cfa874','#b68f5f',3,4),11,0,-5);       // boss hardwood
box(28.4,WT,.4,WALL,0,0,-9);box(.4,WT,16,WALL,14,0,-1);        // tall back walls (north, east)
box(.4,WL,16,WALL,-14,0,-1);                                  // west (low)
box(4,WL,.4,WALL,-12,0,7);box(20,WL,.4,WALL,4,0,7);           // south (low), entrance gap x -10..-6
box(5,WL,.4,WALL,-11.5,0,1);                                  // lobby wall
const cutters=[];
function cutWall(w,h,d,x,y,z,hide){const m=box(w,h,d,WALL,x,y,z);cutters.push({m,h,y:hide?y:0,hide});return m}
cutWall(.4,WT,3,8,0,-7.5);cutWall(.4,WT,3,8,0,-2.5);cutWall(6,WT,.4,11,0,-1);cutWall(.4,.7,2,8,2.1,-5,true);
const bossSign=new THREE.Mesh(new THREE.PlaneGeometry(2,.5),new THREE.MeshBasicMaterial({map:signTex('BOSS CABIN',512,128,'#7ea594','#ffffff','500 56px Newsreader,serif','#c8975c')}));
bossSign.position.set(7.78,2.45,-5);bossSign.rotation.y=-Math.PI/2;scene.add(bossSign);cutters.push({m:bossSign,h:.5,y:2.45,hide:true});
box(.45,1.7,.45,'#21503b',-6,0,7);box(.45,1.7,.45,'#21503b',-10,0,7);
// door (hinged, swings into the chamber)
const door=new THREE.Group();door.position.set(8,0,-6);scene.add(door);
put(new THREE.Mesh(new THREE.BoxGeometry(.12,2.1,2),mat('#b07a45')),0,1.05,1,door);
put(new THREE.Mesh(new THREE.BoxGeometry(.14,.9,1.4),mat('#9a6a3a')),0,1.25,1,door);
put(new THREE.Mesh(new THREE.SphereGeometry(.07,8,6),mat('#d8c36a')),-.1,1.05,1.8,door);
// entrance banner
(function(){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(5.5,1.4),new THREE.MeshBasicMaterial({map:signTex(CONFIG.owner.toLowerCase()+'.dev',512,128,'#7ea594','#ffffff','500 54px Newsreader,serif','#c8975c')}));
  m.position.set(-8,3.2,7.2);scene.add(m);box(.15,2.6,.15,'#21503b',-10.8,0,7.2);box(.15,2.6,.15,'#21503b',-5.2,0,7.2);
})();
box(2.4,1.8,1.8,WALL,-12.5,0,9.4);box(2.9,.25,2.3,'#21503b',-12.5,1.8,9.4);   // security booth

function palm(x,z){cyl(.12,.35,'#a97a45',x,0,z);cyl(.05,1.2,'#7a5a3a',x,.35,z,6);
  for(let i=0;i<6;i++){const l=new THREE.Mesh(new THREE.ConeGeometry(.1,1.2,4),mat('#2f7a50'));const g=new THREE.Group();g.position.set(x,1.6,z);g.rotation.y=i*1.05;l.position.set(.45,-.05,0);l.rotation.z=-1.2;l.castShadow=true;g.add(l);scene.add(g)}}
function glassWall(len,axis,cx,cz,h=1.55){
  const X=axis==='x';box(X?len:.04,h,X?.04:len,gmat,cx,.08,cz).castShadow=false;
  box(X?len:.07,.06,X?.07:len,DARK,cx,h+.08,cz);box(X?len:.07,.06,X?.07:len,DARK,cx,.05,cz);
  const n=Math.max(2,Math.round(len/2)+1);
  for(let i=0;i<n;i++){const o=-len/2+i*len/(n-1);box(.07,h+.1,.07,DARK,cx+(X?o:0),.05,cz+(X?0:o))}
}
function chair(x,z,rot,col='#2f5d46'){
  const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rot;scene.add(g);
  const p=(geo,c,px,py,pz)=>put(new THREE.Mesh(geo,mat(c)),px,py,pz,g);
  p(new THREE.BoxGeometry(.58,.1,.58),col,0,.5,0);p(new THREE.BoxGeometry(.56,.7,.09),col,0,.9,-.28);
  p(new THREE.CylinderGeometry(.04,.04,.4,6),'#222',0,.28,0);p(new THREE.CylinderGeometry(.3,.3,.04,5),'#222',0,.08,0);
}
function laptop(x,y,z,rot){
  const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=rot;scene.add(g);
  put(new THREE.Mesh(new THREE.BoxGeometry(.7,.03,.5),mat('#c9ccd0')),0,.015,0,g);
  const s=put(new THREE.Mesh(new THREE.BoxGeometry(.7,.44,.03),mat('#20262a')),0,.25,.22,g);s.rotation.x=.25;
  const f=new THREE.Mesh(new THREE.BoxGeometry(.6,.36,.01),new THREE.MeshBasicMaterial({color:'#2f9d6a'}));f.position.z=-.02;s.add(f);
}
function desk(x,z,w,rot){
  box(w,.07,1.5,'#d8b07e',x,.74,z);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>box(.06,.74,.06,DARK,x+a*(w/2-.12),0,z+b*.62));
  laptop(x,.81,z+(rot?.2:-.2),rot);cyl(.07,.1,'#d9a15a',x+w/2-.4,.81,z+(rot?-.4:.4),8);
}
// reception + lobby lounge
box(4,1,1.4,'#d8b07e',-9.5,0,3);box(4.2,.08,1.6,'#a97a45',-9.5,1,3);
const rs=new THREE.Mesh(new THREE.PlaneGeometry(2.8,.5),new THREE.MeshBasicMaterial({map:signTex('RECEPTION',512,92,'#7ea594','#ffffff','500 46px Newsreader,serif')}));rs.position.set(-9.5,.55,3.72);scene.add(rs);
laptop(-9.5,1.08,3,0);
box(2.8,.5,1,'#3f6f57',-12,0,-3);box(2.8,.9,.3,'#3f6f57',-12,0,-3.6);box(1.2,.4,1.2,'#a97a45',-12,0,-5.6);
cyl(2.2,.03,'#c9d8cb',-11.5,.15,-4.2,32);
// meeting room (glass)
glassWall(4,'x',-6,-8.2);glassWall(4,'x',-6,-4.2);glassWall(4,'z',-8,-6.2);glassWall(4,'z',-4,-6.2);
cyl(1.05,.06,'#d8b07e',-6,.72,-6.2,24);cyl(.12,.72,DARK,-6,0,-6.2,8);
[[-1.5,0],[1.5,0],[0,-1.4],[0,1.4]].forEach(([a,b])=>chair(-6+a,-6.2+b,Math.atan2(-a,-b)+Math.PI));
// north wall decor
function board(x,w,h,col){box(w+.12,h+.12,.05,'#efe9d8',x,1.25,-8.77);box(w,h,.06,col,x,1.31,-8.74)}
board(-11,1.6,1,'#c99a62');board(-9.2,1.6,1,'#c99a62');board(-7.4,1.6,1,'#c99a62');
for(let i=0;i<6;i++)box(.28,.34,.02,'#f4f1e6',-11.6+i*.62+(i>2?.06:0),1.55,-8.69);
function art(x){box(2.3,1.3,.05,'#efe9d8',x,1.2,-8.77);box(.95,.62,.06,'#2f6a52',x-.5,1.55,-8.74);box(.75,.5,.06,'#d9764a',x+.45,1.4,-8.74);box(1.3,.04,.07,DARK,x,1.25,-8.72)}
art(-1);art(4.5);
// east wall decor (inside the chamber)
art(11);box(2.4,1.3,.5,'#8a5a32',13.5,0,-6.5);
[[-13,5],[13,6],[7,-8.2],[-13,-8.2],[7,6]].forEach(p=>palm(...p));
cyl(.28,.4,'#a97a45',-5.6,0,-1.6);
// open-office desks, chairs, glass
glassWall(9.4,'x',1.5,-5);glassWall(6.4,'z',1.5,-5.4);glassWall(2.8,'z',1.5,3);
// boss chamber
cyl(2.6,.03,'#d3c3a6',11,.17,-4.6,32);
desk(11.5,-6.8,3.4,0);chair(11.5,-8.3,0,'#2b2f33');

/* ---------- people ---------- */
const setRot=(p,a)=>{p.rotation.y=p.targetRot=a},wave=(p,on)=>{p.waving=on};
function capsuleGeometry(radius,length,capSegments=4,radialSegments=8){
  // Compatible rounded limb geometry for Three.js builds without CapsuleGeometry.
  const geo=new THREE.SphereGeometry(radius,radialSegments,Math.max(6,capSegments*3));
  geo.scale(1,(length+2*radius)/(2*radius),1);
  return geo;
}
function person(color,name,x,z,seated,o={}){
  const skin=o.skin||['#e0ac84','#c68b62','#8d5a3b','#f0c8a0'][Math.floor(Math.abs(x*7+z*3))%4];
  const hair=o.hair||'#211914',pants=o.pants||'#24272d';
  const g=new THREE.Group();
  const part=(geo,c,px,py,pz,par=g)=>{const m=new THREE.Mesh(geo,mat(c));m.position.set(px,py,pz);m.castShadow=true;m.receiveShadow=true;par.add(m);return m};
  // Stylized, human-proportioned low-poly character, matching the reference video's office people.
  const torso=part(new THREE.BoxGeometry(.34,.43,.20),color,0,1.16,0);
  torso.scale.set(1,1,.92);
  part(new THREE.SphereGeometry(.205,10,7),color,0,1.36,0).scale.set(1.18,.58,.88); // shoulders
  // Lower jacket/waist gives the torso a tailored silhouette.
  part(new THREE.BoxGeometry(.30,.17,.205),color,0,.94,0);
  part(new THREE.CylinderGeometry(.062,.07,.105,8),skin,0,1.49,0);
  // Head, ears, hairline and fringe.
  g.head=part(new THREE.SphereGeometry(.158,12,9),skin,0,1.675,.018);
  const cap=part(new THREE.SphereGeometry(.164,12,8,0,Math.PI*2,0,Math.PI*.58),hair,0,1.72,-.006);
  cap.scale.set(1.04,.98,1.02);
  // Hair at the back and a swept fringe; optional longer hair for selected characters.
  part(new THREE.BoxGeometry(.245,.16,.075),hair,0,1.61,-.105);
  part(new THREE.SphereGeometry(.075,8,6),hair,-.065,1.755,.095).scale.set(1.1,.5,.7);
  part(new THREE.SphereGeometry(.035,7,5),skin,-.16,1.66,0);
  part(new THREE.SphereGeometry(.035,7,5),skin,.16,1.66,0);
  if(o.long){
    part(new THREE.BoxGeometry(.255,.25,.075),hair,0,1.57,-.085);
    part(new THREE.BoxGeometry(.065,.20,.07),hair,-.13,1.62,-.01);
    part(new THREE.BoxGeometry(.065,.20,.07),hair,.13,1.62,-.01);
  }
  // Face details facing the character's forward (+Z) direction.
  part(new THREE.SphereGeometry(.014,6,5),'#29221d',-.052,1.69,.166);
  part(new THREE.SphereGeometry(.014,6,5),'#29221d',.052,1.69,.166);
  part(new THREE.BoxGeometry(.026,.012,.012),hair,-.052,1.714,.166);
  part(new THREE.BoxGeometry(.026,.012,.012),hair,.052,1.714,.166);
  part(new THREE.ConeGeometry(.018,.045,5),skin,0,1.655,.176).rotation.x=Math.PI/2;
  part(new THREE.BoxGeometry(.055,.012,.012),'#75483b',0,1.625,.166);
  // Shirt collar and tie or shirt placket.
  if(o.formal!==false){
    part(new THREE.BoxGeometry(.10,.075,.022),'#f2eee3',0,1.405,.105);
    part(new THREE.BoxGeometry(.035,.19,.018),o.tie||'#8e4439',0,1.285,.116);
    part(new THREE.BoxGeometry(.085,.035,.014),'#f2eee3',0,1.375,.119);
  } else {
    part(new THREE.BoxGeometry(.07,.12,.014),o.shirt||'#d8ded8',0,1.29,.108);
  }
  // Jacket lapels and a small pocket add visible detail at close camera angles.
  part(new THREE.BoxGeometry(.045,.20,.018),o.lapel||color,-.105,1.27,.105).rotation.z=-.12;
  part(new THREE.BoxGeometry(.045,.20,.018),o.lapel||color,.105,1.27,.105).rotation.z=.12;
  part(new THREE.BoxGeometry(.065,.055,.014),o.pocket||'#e4e0d3',.105,1.18,.112);
  g.legs=[];g.knees=[];g.arms=[];g.elbows=[];
  [-1,1].forEach((side)=>{
    const hip=new THREE.Group();hip.position.set(side*.105,.88,0);g.add(hip);
    part(capsuleGeometry(.067,.30,4,7),pants,0,-.19,0,hip);
    part(new THREE.SphereGeometry(.067,8,6),pants,0,-.34,0,hip);
    const knee=new THREE.Group();knee.position.set(0,-.36,0);hip.add(knee);
    part(capsuleGeometry(.058,.29,4,7),pants,0,-.15,0,knee);
    const shoe=part(new THREE.BoxGeometry(.125,.065,.22),o.shoes||'#191b1d',0,-.315,.055,knee);
    shoe.rotation.x=-.04;
    part(new THREE.BoxGeometry(.126,.018,.15),'#55534c',0,-.343,.07,knee);
    g.legs.push(hip);g.knees.push(knee);
    const arm=new THREE.Group();arm.position.set(side*.235,1.34,0);g.add(arm);
    const sleeve=part(capsuleGeometry(.064,.23,4,7),color,side*.025,-.15,0,arm);
    sleeve.rotation.z=side*-.12;
    const cuff=part(new THREE.CylinderGeometry(.047,.047,.055,7),o.cuff||color,side*.025,-.285,0,arm);
    cuff.rotation.z=side*-.12;
    const elbow=new THREE.Group();elbow.position.set(side*.025,-.29,0);arm.add(elbow);
    part(capsuleGeometry(.041,.19,4,7),skin,0,-.12,.005,elbow);
    part(new THREE.SphereGeometry(.046,8,6),skin,0,-.235,.01,elbow);
    g.arms.push(arm);g.elbows.push(elbow);
  });
  g.position.set(x,seated?-.35:0,z);g.base=g.position.y;g.t=0;g.targetRot=0;people.push(g);
  if(seated){
    g.legs.forEach(l=>l.rotation.x=-Math.PI/2);
    g.knees.forEach(k=>k.rotation.x=Math.PI/2);
    g.elbows.forEach(e=>e.rotation.x=-1);
  }
  if(name)label(name,g,2.15);
  scene.add(g);return g;
}
const guard=person('#1d3a2c','Security',-10.8,9.4);setRot(guard,Math.PI/2);
const recep=person('#7ea594','Reception',-9.5,2,false,{long:true,skin:'#e0ac84'});
const boss=person('#1f3a2c',CONFIG.owner,11.5,-8.3,true,{skin:'#d9a378'});
const vis=person('#d9622b','',-8,17);vis.visible=false;
const workers=[];
const outfit=['#2a2d33','#1f3a2c','#3a3f4a','#232a38','#40342d','#2a2d33'],skins=['#e0ac84','#c68b62','#f0c8a0','#8d5a3b','#d9a378','#e0ac84'];
[[-7,-5.6,Math.PI],[-3,-4.4,0],[3,1.5,0]].forEach(([z,cz,rot],r)=>{
  [-1,4].forEach((x,i)=>{
    const n=r*2+i;desk(x,z,3.2,rot);chair(x,cz,rot);
    const w=person(outfit[n],'',x,cz,true,{skin:skins[n],long:n%3===1});setRot(w,rot);w.phase=n;workers.push(w);
  });
});
const cars=[['#b8312f',-55,12.2,0,6],['#2f5f9a',-20,12.2,0,7.5],['#d9d2bd',30,14.3,Math.PI,-6.5],['#2d6a45',60,14.3,Math.PI,-8]].map(([c,x,z,r,v])=>({m:carMesh(c,x,z,r),v}));
const ball=put(new THREE.Mesh(new THREE.SphereGeometry(.25,10,8),mat('#ffffff')),25,.25,-1);

/* ---------- movement ---------- */
const tasks=[];
function walk(p,pts,speed=3.4){
  return new Promise(res=>{let i=0;tasks.push(dt=>{
    if(i>=pts.length){p.legs.forEach(l=>l.rotation.x=0);p.knees.forEach(l=>l.rotation.x=0);p.arms.forEach(a=>a.rotation.x=0);p.position.y=p.base;res();return true}
    const [tx,tz]=pts[i],dx=tx-p.position.x,dz=tz-p.position.z,d=Math.hypot(dx,dz);
    const k=((p===vis||p===recep)&&(skipping||reduce))?25:1,s=speed*k*dt;
    p.t+=dt*speed*2.6;const sw=Math.sin(p.t);
    p.legs[0].rotation.x=sw*.7;p.legs[1].rotation.x=-sw*.7;p.knees[0].rotation.x=Math.max(0,-sw)*.9;p.knees[1].rotation.x=Math.max(0,sw)*.9;p.arms[0].rotation.x=-sw*.5;p.arms[1].rotation.x=sw*.5;
    p.position.y=p.base+Math.abs(sw)*.05;
    if(d<=s){p.position.x=tx;p.position.z=tz;i++}
    else{p.position.x+=dx/d*s;p.position.z+=dz/d*s;p.targetRot=Math.atan2(dx,dz)}
    return false})});
}
const face=(p,a)=>{p.targetRot=a};
let AC;function thump(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=120;g.gain.setValueAtTime(.5,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.14);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.15)}catch(e){}}
function knock(p){return new Promise(res=>{let el=0,n=0;tasks.push(dt=>{
  el+=dt*(skipping?12:1);const ph=el%.3,k=Math.floor(el/.3);
  if(k>n&&k<=3){n=k;thump()} if(el===dt*(skipping?12:1))thump();
  p.arms[1].rotation.x=k<3?-1.45+(ph<.1?.3:0):-.2;
  door.position.x=8+((k<3&&ph<.06)?.04:0);
  if(el>1.2){p.arms[1].rotation.x=0;door.position.x=8;res();return true}return false})})}
// ambient life
async function pace(p,a,b,sp){while(true){await walk(p,[b],sp);await walk(p,[a],sp)}}
pace(person('#3b6ea8','',-34,9.4),[-34,9.4],[34,9.4],1.6);
pace(person('#b08a2e','',26,9.9),[26,9.9],[-30,9.9],1.9);
async function wander(p){while(true)await walk(p,[[20.5+Math.random()*9,-8.5+Math.random()*15]],2.4+Math.random())}
['#d33','#d33','#2f5fb8','#2f5fb8','#d33','#2f5fb8'].forEach((c,i)=>{const p=person(c,'',22+i*1.2,-4+i);players.push(p);wander(p)});

/* ---------- loop ---------- */
const DEF=new THREE.Vector3(-9,13,12),OFF=DEF.clone(),offT=DEF.clone(),look=new THREE.Vector3(-8,0,13),want=look.clone();
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.fov=w/h<1?50:30;camera.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
boss.phase=1;const typists=[...workers,boss];
const clock=new THREE.Clock();let bt=0,bp=null;
(function tick(){
  requestAnimationFrame(tick);
  const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;
  for(let i=tasks.length-1;i>=0;i--)if(tasks[i](dt))tasks.splice(i,1);
  people.forEach(p=>{let d=p.targetRot-p.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));p.rotation.y+=d*Math.min(1,dt*9);
    const tz=p.waving?2.5+Math.sin(t*12)*.3:0;p.arms[1].rotation.z+=(tz-p.arms[1].rotation.z)*Math.min(1,dt*10)});
  typists.forEach((w,i)=>{w.rotation.z=Math.sin(t*2+w.phase)*.03;w.head.rotation.y=Math.sin(t*.6+i)*.6;
    const on=w.typing!==false;w.arms[0].rotation.x=on?-.6+Math.sin(t*15+i*2)*.1:0;w.arms[1].rotation.x=on?-.6+Math.sin(t*13+i*3)*.1:0;
    w.elbows.forEach(e=>{e.rotation.x=on?-1:-.15})});
  cars.forEach(c=>{c.m.position.x+=c.v*dt;if(c.m.position.x>62)c.m.position.x=-62;if(c.m.position.x<-62)c.m.position.x=62});
  treeTops.forEach((m,i)=>{m.rotation.z=Math.sin(t*1.3+i)*.035});
  bt-=dt;if(bt<=0){bt=1+Math.random()*1.2;bp=players[(Math.random()*players.length)|0]}
  if(bp){const k=Math.min(1,dt*3);ball.position.x+=(bp.position.x+.5-ball.position.x)*k;ball.position.z+=(bp.position.z-ball.position.z)*k}
  ball.position.y=.25+Math.abs(Math.sin(t*9))*.12;
  door.rotation.y=THREE.MathUtils.lerp(door.rotation.y,doorOpen?1.5:0,.07);
  const inside=vis.visible&&vis.position.x>8.3&&vis.position.z<-1.2;
  cutters.forEach(c=>{const k=THREE.MathUtils.lerp(c.k??1,inside?.28:1,.08);c.k=k;if(c.hide)c.m.visible=!inside;else{c.m.scale.y=k;c.m.position.y=c.h*k/2}});
  if(camTarget)want.copy(camTarget.position);
  look.lerp(want,.05);OFF.lerp(offT,.05);
  camera.position.copy(look).add(OFF);camera.lookAt(look);
  renderer.render(scene,camera);
})();

/* ---------- story ---------- */
const cap=$('#caption'),status=t=>$('#status').textContent=t;
async function say(who,text,ms=2600){
  cap.style.opacity=1;cap.querySelector('.who').textContent=who;cap.querySelector('.say').textContent=text;
  await sleep(skipping?0:ms);
}
async function story(){
  storyOn=true;
  $('#skip').style.display='block';
  vis.visible=true;camTarget=vis;label(visitorName,vis,2.1);
  status('Arriving at the office');
  await walk(vis,[[-8,9.4]]);face(vis,-Math.PI/2);
  wave(guard,true);await say('Security','Hi '+visitorName+'! Reception is straight ahead.');wave(guard,false);
  status('Reception');
  await walk(vis,[[-8,5.2]]);face(vis,Math.PI);
  wave(recep,true);await say('Reception','Welcome, '+visitorName+'! Please follow me. '+CONFIG.owner+' is expecting you.');wave(recep,false);
  status('Walking with the receptionist');
  const p1=walk(recep,[[-6.8,1.9],[-5,-1],[7,-1],[7.3,-5]]);
  await sleep(skipping?0:900);
  const p2=walk(vis,[[-6.3,2.8],[-5,-1],[6,-1],[6,-4.2]]);
  await p1;face(recep,Math.PI/2);camTarget=recep;
  await p2;face(vis,1.15);
  status('At the boss’s door');
  await say('Reception','One moment, I’ll let him know you’re here.',1800);
  await knock(recep);
  await say(CONFIG.fullName+' (inside)','Yes, please come in.',1500);
  doorOpen=true;await sleep(skipping?0:900);
  await walk(recep,[[8.9,-5.2],[9.2,-6.2]]);face(recep,2.27);
  await say('Reception','Good afternoon, sir. May I introduce '+visitorName+'? '+visitorName+' is visiting your portfolio today and would like to know more about your work.',5200);
  boss.typing=false;wave(boss,true);
  await say(CONFIG.fullName,'Of course. Welcome, '+visitorName+'. Please, come in.',2600);
  wave(boss,false);camTarget=vis;
  await walk(vis,[[7.4,-5],[11.4,-5.1]]);face(vis,Math.PI);
  walk(recep,[[8.9,-5.2],[7.2,-5],[7,-1],[-5,-1],[-6.8,1.9],[-9.5,2]]).then(()=>face(recep,0));
  setTimeout(()=>{doorOpen=false},skipping?200:3500);
  status(CONFIG.owner+'’s chamber');
  wave(boss,true);
  await say(CONFIG.fullName,'Hey '+visitorName+'! I’m '+CONFIG.fullName+', a '+CONFIG.role+'. '+CONFIG.intro,5200);
  wave(boss,false);
  if(!skipping)await ask();
  await say(CONFIG.owner,'Have a look around, '+visitorName+'.',1800);
  storyOn=false;$('#skip').style.display='none';buildNav();$('#nav').classList.add('show');
  camTarget=null;want.set(10,0,-4);free=true;
}
$('#skip').onclick=()=>{skipping=true};

/* ---------- menu + modal ---------- */
function buildNav(){
  const n=$('#nav');n.innerHTML='';
  Object.keys(CONFIG.sections).forEach(k=>{const b=document.createElement('button');b.textContent=k;b.onclick=()=>openSection(k);n.appendChild(b)});
  const r=document.createElement('button');r.textContent='Replay walkthrough';r.onclick=()=>location.reload();n.appendChild(r);
}
function openSection(k){
  const s=CONFIG.sections[k];let h='<h2>'+k+'</h2>';
  if(s.html)h+=s.html;
  if(s.rows)h+=s.rows.map(([a,b])=>'<p><b>'+a+':</b> '+b+'</p>').join('');
  if(s.chips)h+='<div class="chips">'+s.chips.map(c=>'<span>'+c+'</span>').join('')+'</div>';
  if(s.list)h+='<ul>'+s.list.map(c=>'<li>'+c+'</li>').join('')+'</ul>';
  h+='<p style="margin-top:18px"><button class="main" id="close">Close</button></p>';
  $('#mcard').innerHTML=h;$('#modal').style.display='grid';$('#close').focus();$('#close').onclick=closeM;
}
function closeM(){$('#modal').style.display='none';if(askRes){const r=askRes;askRes=null;r()}}
function ask(){return new Promise(res=>{
  askRes=res;
  $('#mcard').innerHTML='<h2>'+CONFIG.owner+' asks</h2><p>How do you like the website?</p><textarea id="rp" rows="3" placeholder="Type your reply"></textarea><p style="margin-top:14px;display:flex;gap:8px"><button class="main" id="snd">Send reply</button><button id="skp">Skip</button></p>';
  $('#modal').style.display='grid';$('#rp').focus();
  $('#snd').onclick=()=>{const r=$('#rp').value.trim();if(r&&CONFIG.replyEndpoint){try{fetch(CONFIG.replyEndpoint,{method:'POST',mode:'no-cors',body:JSON.stringify({name:visitorName,reply:r,time:new Date().toISOString()})})}catch(e){}}closeM()};
  $('#skp').onclick=closeM;
})}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeM()});
addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});

const PLACES=[['Reception',[-9,0,3],[-6,7,8]],['Work Studio',[1.5,0,-5],[-9,10,10]],['Design Room',[1.5,0,3],[-8,8,8]],['Meeting Room',[-6,0,-6.2],[-6,7,7]],['Operations',[6,0,-1],[-8,9,9]],['The Lounge',[-11.5,0,-4.2],[-5,7,7]],['Boss Cabin',[9,0,-5],[-7,9,9]]];
let storyOn=false;
PLACES.forEach(([k,l,o],i)=>{const b=document.createElement('button');b.innerHTML='<i>0'+(i+1)+'</i>'+k;b.onclick=()=>{if(storyOn)return;introOn=false;camTarget=null;want.set(...l);offT.set(...o)};$('#places').appendChild(b)});
/* drag to orbit, wheel to zoom (after the walkthrough) */
let drag=null;const UP=new THREE.Vector3(0,1,0);
addEventListener('pointerdown',e=>{if(free&&e.target===renderer.domElement)drag=e.clientX});
addEventListener('pointermove',e=>{if(drag!==null){offT.applyAxisAngle(UP,-(e.clientX-drag)*.008);drag=e.clientX}});
addEventListener('pointerup',()=>{drag=null});
addEventListener('wheel',e=>{if(free){offT.multiplyScalar(THREE.MathUtils.clamp(1+e.deltaY*.001,.9,1.1));const l=offT.length();if(l<10)offT.setLength(10);if(l>50)offT.setLength(50)}},{passive:true});

/* cinematic office tour behind the name card */
const SHOTS=[{l:[-6,0,5],o:[-10,14,12],t:'Welcome to the office'},{l:[-9,1,9],o:[-5,5,8],t:'Small details. A living world.'},{l:[2,0,-3],o:[-8,9,9],t:'An office that feels alive'},{l:[25,0,-1],o:[-9,10,14],t:'More than a building'},{l:[8,0,-4],o:[-8,8,8],t:'The boss cabin'}];
async function intro(){let i=0;while(introOn){const s=SHOTS[i++%SHOTS.length];want.set(...s.l);offT.set(...s.o);cap.style.opacity=1;cap.querySelector('.who').textContent='Office tour';cap.querySelector('.say').textContent=s.t;await sleep(4500)}}
/* ---------- start ---------- */
$('#go').onclick=()=>{
  const v=$('#nm').value.trim();if(!v){$('#nm').focus();return}
  visitorName=v;introOn=false;offT.copy(DEF);$('#welcome').style.display='none';thump();story();
};
$('#nm').addEventListener('keydown',e=>{if(e.key==='Enter')$('#go').click()});
$('#nm').focus();
intro();
