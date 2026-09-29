export const FLOOR=-5.25, CEILING=5.25, RADIUS=.48;
export const speed=s=>Math.min(7.1,4.2+s.distance*.004);
export function fresh(){return {mode:'playing',y:0,vy:0,distance:0,lives:3,charge:3,nextDrain:100,invulnerable:1.8,crashTime:0,landed:false,hits:0};}
export function crash(s){if(s.mode!=='playing')return;s.mode='crashing';s.vy=Math.min(s.vy,0);s.crashTime=0;}
export function damage(s,side=0){if(s.mode!=='playing'||s.invulnerable>0)return false;s.lives--;s.hits++;s.invulnerable=1.65;if(s.lives<=0)crash(s);else{s.vy=side===1?-2.6:side===-1?3.8:-s.vy*.6;s.y=Math.max(FLOOR+RADIUS+.1,Math.min(CEILING-RADIUS-.1,s.y));}return true;}
export function updateThreats(s,dt,obstacles){if(s.mode!=='playing')return;for(const o of obstacles){if(!o.special){if(o.kind==='bat'){o.age=(o.age||0)+dt;o.y=o.baseY+Math.sin(o.age*2+o.phase)*.8;}continue;}
 if(!o.stage&&o.x-s.distance<speed(s)*1.9&&o.x>s.distance){o.stage='warning';o.timer=0;}
 if(o.stage==='warning'){o.timer+=dt;if(o.timer>=.75){o.stage='active';o.timer=0;}}
 else if(o.stage==='active'){o.timer+=dt;if(o.kind==='rock'){o.drop=Math.max(-14,-4.4*o.timer*o.timer);}else{o.y=Math.min(4.7,o.baseY+4.2*o.timer);}}
}}
export function step(s,dt,thrust,obstacles=[]){let hit=false;if(s.mode==='playing'){
 s.distance+=dt*speed(s);updateThreats(s,dt,obstacles);
 // Consume whole bars on distance milestones. Pickups add one bar, capped at three.
 while(s.distance>=s.nextDrain){s.charge=Math.max(0,s.charge-1);s.nextDrain+=100;}
 for(const o of obstacles)if(o.kind==='battery'&&!o.collected&&Math.abs(o.x-s.distance)<.95&&Math.abs(s.y-o.y)<.95){o.collected=true;s.charge=Math.min(3,s.charge+1);}
 if(s.charge===0){crash(s);return false;}
 s.invulnerable=Math.max(0,s.invulnerable-dt);s.vy+=(thrust?12:-8.5)*dt;s.vy*=Math.exp(-.85*dt);s.vy=Math.max(-5.4,Math.min(4.8,s.vy));s.y+=s.vy*dt;
 if(s.y-RADIUS<FLOOR){hit=damage(s,-1);s.y=FLOOR+RADIUS;if(s.mode==='playing')s.vy=Math.max(1.6,s.vy);}else if(s.y+RADIUS>CEILING){hit=damage(s,1);s.y=CEILING-RADIUS;if(s.mode==='playing')s.vy=Math.min(-1.6,s.vy);}
 for(const o of obstacles){if(o.hit||o.kind==='battery')continue;const dx=Math.abs(o.x-s.distance);if(o.kind==='bat'){if((dx/1.0)**2+((s.y-o.y)/.64)**2<1){if(damage(s)){o.hit=true;hit=true;}}}else if(dx<o.width+.65){const edge=Math.max(0,1-Math.max(0,dx-.55)/o.width),h=o.height*edge,drop=o.drop||0;const touch=o.top?s.y+RADIUS>CEILING+drop-h&&(!o.special||s.y-RADIUS<CEILING+drop):s.y-RADIUS<FLOOR+h;if(touch&&damage(s,o.top?1:-1)){o.hit=true;hit=true;}}}
 }else if(s.mode==='crashing'){s.crashTime+=dt;s.vy-=10*dt;s.y+=s.vy*dt;if(s.y<FLOOR+.25){s.y=FLOOR+.25;s.vy=0;s.landed=true;}if(s.landed&&s.crashTime>2.3)s.mode='over';}return hit;}
