// Guarded UserCard migration: only exact expected inputs are replaced.
const fs=require('fs');function rep(file,from,to,n=1){let s=fs.readFileSync(file,'utf8');if(s.split(from).length!==n+1)throw Error('Expected '+n+' matches: '+file+' '+from);fs.writeFileSync(file,s.split(from).join(to));}
const css='platform/patterns/UserCard/user-card.css',jsx='platform/patterns/UserCard/UserCard.jsx',lab='lanes/207-user/design-system/parts/w08A.labs.js';
rep(css,'/* Plenix · UserCard', '@property --plx-state-user-card-direction{syntax:"*";inherits:false;}\n@property --plx-state-user-card-text-gap{syntax:"*";inherits:false;}\n@property --plx-state-user-card-name-size{syntax:"*";inherits:false;}\n@property --plx-state-user-card-actions-wrap{syntax:"*";inherits:false;}\n/* Plenix · UserCard');
rep(css,'   avatar with the name, line and role, the details list and the actions. The compact form is one row. */','   avatar with the name, line and role, the details list and the actions. Parts carry cover or compact state; each property is assigned once. */');
rep(css,'.plx-user-card__identity{display:flex;flex-direction:column;','.plx-user-card__identity{display:flex;flex-direction:var(--plx-state-user-card-direction,column);');
rep(css,'row-gap:var(--plx-comp-user-card-text-gap);','row-gap:var(--plx-state-user-card-text-gap,var(--plx-comp-user-card-text-gap));');
rep(css,'font-size:var(--plx-comp-user-card-name-font-size);','font-size:var(--plx-state-user-card-name-size,var(--plx-comp-user-card-name-font-size));');
rep(css,'flex-wrap:wrap;','flex-wrap:var(--plx-state-user-card-actions-wrap,wrap);');
rep(css,'.plx-user-card--cover .plx-user-card__identity','.plx-user-card__identity--cover');
rep(css,'.plx-user-card--cover .plx-user-card__avatar','.plx-user-card__avatar--cover');
rep(css,'.plx-user-card--compact .plx-user-card__identity{align-items:center;column-gap:var(--plx-comp-user-card-compact-gap);flex-direction:row;}','.plx-user-card__identity--compact{--plx-state-user-card-direction:row;align-items:center;column-gap:var(--plx-comp-user-card-compact-gap);}');
rep(css,'.plx-user-card--compact .plx-user-card__text{flex-basis:0%;flex-grow:1;row-gap:0;}','.plx-user-card__text--compact{--plx-state-user-card-text-gap:0;flex-basis:0%;flex-grow:1;}');
rep(css,'.plx-user-card--compact .plx-user-card__name,.plx-user-card--compact .plx-user-card__secondary','.plx-user-card__name--compact,.plx-user-card__secondary--compact');
rep(css,'.plx-user-card--compact .plx-user-card__name{font-size:var(--plx-comp-user-card-compact-name-font-size);}','.plx-user-card__name--compact{--plx-state-user-card-name-size:var(--plx-comp-user-card-compact-name-font-size);}');
rep(css,'.plx-user-card--compact .plx-user-card__actions{flex-shrink:0;flex-wrap:nowrap;}','.plx-user-card__actions--compact{--plx-state-user-card-actions-wrap:nowrap;flex-shrink:0;}');
rep(jsx,'   Behavior:\n','   Behavior:\n     Cover and compact layout state is carried by each part, so nested cards keep their own layout.\n');
rep(jsx,'className="plx-user-card__identity"',"className={cx('plx-user-card__identity', withCover && 'plx-user-card__identity--cover', compact && 'plx-user-card__identity--compact')}");
for(const part of ['text','name','secondary'])rep(jsx,'className="plx-user-card__'+part+'"',"className={cx('plx-user-card__"+part+"', compact && 'plx-user-card__"+part+"--compact')}");
rep(jsx,'className="plx-user-card__avatar"',"className={cx('plx-user-card__avatar', withCover && 'plx-user-card__avatar--cover')}");
rep(jsx,'className="plx-user-card__actions"',"className={cx('plx-user-card__actions', compact && 'plx-user-card__actions--compact')}",2);
for(const part of ['actions','text','name','secondary'])rep(lab,'class="plx-user-card__'+part+'"',"class=\"plx-user-card__"+part+"' + (compact ? ' plx-user-card__"+part+"--compact' : '') + '\"");
rep(lab,'plx-user-card__avatar"',"plx-user-card__avatar' + (cover ? ' plx-user-card__avatar--cover' : '') + '\"");
rep(lab,'class="plx-user-card__identity"',"class=\"plx-user-card__identity' + (compact ? ' plx-user-card__identity--compact' : cover ? ' plx-user-card__identity--cover' : '') + '\"");
