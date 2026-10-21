const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),contract=require('../build-types-contracts');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'plenix-types-202-'));
try {
  assert.ok(contract('useCollectionView',root).includes('export interface CollectionView<Row>'));
  fs.mkdirSync(path.join(root,'hooks'));
  const adjacent='export declare function useCollectionView(): "adjacent lane contract";';
  fs.writeFileSync(path.join(root,'hooks/useCollectionView.types.d.ts'),adjacent);
  assert.equal(contract('useCollectionView',root),adjacent,'preserve the adjacent declaration supplied by lane201 after integration');
  assert.equal(contract('Unknown',root),null);
  console.log('TYPE_CONTRACTS_202_OK standalone fallback and adjacent lane declaration precedence');
} finally {fs.rmSync(root,{recursive:true,force:true});}
