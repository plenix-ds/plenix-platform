// Guarded FeatureCard part-state migration; every input must match once.
const fs=require('fs');function replace(file,from,to){let s=fs.readFileSync(file,'utf8');if(s.split(from).length!==2)throw Error('Expected one match: '+file);fs.writeFileSync(file,s.replace(from,to));}
const css='platform/patterns/FeatureCard/feature-card.css',jsx='platform/patterns/FeatureCard/FeatureCard.jsx',lab='lanes/207-feature/design-system/parts/w08A.labs.js';
replace(css,'.plx-feature-card--image .plx-feature-card__media--image','.plx-feature-card__media--bleed');
replace(css,'.plx-feature-card--image .plx-feature-card__image','.plx-feature-card__image--image');
replace(css,'.plx-feature-card--horizontal .plx-feature-card__image','.plx-feature-card__image--horizontal');
replace(css,'   surface, the title (its opener covers the card) and the description (its meta line); this sheet places the media. */','   surface, the title (its opener covers the card) and the description (its meta line); each media part carries its own layout. */');
replace(jsx,'className="plx-feature-card__image"','className={cx("plx-feature-card__image", "plx-feature-card__image--" + v)}');
replace(jsx,"picture && 'plx-feature-card__media--image'","picture && 'plx-feature-card__media--image', v === 'image' && 'plx-feature-card__media--bleed'");
replace(jsx,'   Behavior:\n','   Behavior:\n     Media and image parts carry the layout as their own class, never an ancestor selector.\n');
replace(lab,"plx-feature-card__media plx-feature-card__media--image\"><span", "plx-feature-card__media plx-feature-card__media--image' + (variant === 'image' ? ' plx-feature-card__media--bleed' : '') + '\"><span");
replace(lab,"is-loaded plx-feature-card__image\"><img", "is-loaded plx-feature-card__image plx-feature-card__image--' + variant + '\"><img");
