/* Summary: Move #182's repeated Card-part rules to Card's own layout contract.
   Usage: node tools/agent/migrate-182.cjs
   Behavior: Idempotent; JSX callers are migrated by hand. */
const fs=require('fs');
const feature='platform/patterns/FeatureCard/feature-card.css';
const user='platform/patterns/UserCard/user-card.css';
let css=fs.readFileSync(feature,'utf8');
css=css.replace(/^\.plx-feature-card > \.plx-card__body.*\r?\n/m,'').replace(/^\.plx-feature-card \.plx-card__title.*\r?\n/m,'');
css=css.replace(/^\.plx-card\.plx-feature-card--horizontal\{.*\}/m,'.plx-feature-card--horizontal{--plx-comp-card-layout-gap:var(--plx-comp-feature-card-horizontal-gap);}');
css=css.replace(/^\.plx-feature-card--horizontal > \.plx-card__(?:header|meta|body).*\r?\n/gm,'');
fs.writeFileSync(feature,css);
css=fs.readFileSync(user,'utf8').replace(/^\.plx-user-card > \.plx-card__body\{.*\}/m,'.plx-user-card{--plx-comp-card-body-gap:var(--plx-comp-user-card-gap);}');
fs.writeFileSync(user,css);
