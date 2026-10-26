#!/usr/bin/env bash
# bench-run.sh <label> : one benchmark run in ~/bench; writes ~/bench/results/<label>.json
# Uses whatever ANTHROPIC_BASE_URL is set in the environment (none = direct to Anthropic).
set -u
export PATH="$HOME/.local/bin:$HOME/.bun/bin:$PATH"
cd ~/bench
mkdir -p results
PROMPT='Benchmark task. Run the test suite shard by shard with exactly these 8 bash commands, one per call, in order: node run-tests.js --shard 1 ; node run-tests.js --shard 2 ; node run-tests.js --shard 3 ; node run-tests.js --shard 4 ; node run-tests.js --shard 5 ; node run-tests.js --shard 6 ; node run-tests.js --shard 7 ; node run-tests.js --shard 8 . Then list every line of the output that is a failure, a stack frame, a warning, a retry, an error, and the final totals, each quoted exactly as written including all numbers, file paths and line numbers. Do not run any other command and do not read any file.'
timeout 900 claude -p --model sonnet --permission-mode auto --output-format json "$PROMPT" > "results/$1.json" 2> "results/$1.err"
node -e '
const r=require(process.argv[1]); const u=r.usage||{};
const t=(r.result||"");
const want={fail:"expected 28px, received 27px (row 1873)",frame:"DataGrid.jsx:412:18",warn:"resolved to 3px on /Plenix/test-site/members/412",retry:"timed out after 180000ms (Select lab, page 17)",checksum:"9f3c2a71 mismatch for release/cdn/0.72.0/platform.js (expected 4be0d915)",totals:"1 failed, 2 flaky (retried), 1451 passed, 1454 total"};
const got=Object.fromEntries(Object.entries(want).map(([k,v])=>[k,t.includes(v)]));
console.log(JSON.stringify({label:process.argv[2],turns:r.num_turns,cost_usd:r.total_cost_usd,input:u.input_tokens,cache_create:u.cache_creation_input_tokens,cache_read:u.cache_read_input_tokens,output:u.output_tokens,details_found:Object.values(got).filter(Boolean).length+"/6",got}));
' "$HOME/bench/results/$1.json" "$1" | tee "results/$1.summary.json"
