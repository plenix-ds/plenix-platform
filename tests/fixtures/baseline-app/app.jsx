// A pretend application for tests/baseline-scan-273.test.js (never run): one finding of each kind.
const P = window.Plenix;
export function Cases({ rows }) {
  return (
    <div>
      <P.DataGrid label="Cases" data={rows} uniformPillWidths={true} />
      <p style={{ fontSize: 14 }}>A written size.</p>
      <span className="plx-u-p-16px">Uses --plx-sys-color-primary, a name Plenix no longer has.</span>
    </div>
  );
}
