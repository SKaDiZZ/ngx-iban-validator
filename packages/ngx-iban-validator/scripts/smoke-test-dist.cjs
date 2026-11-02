// Checks that the built package can be loaded from Node with both require() and import.
const assert = require("node:assert/strict");

const valid = "AT611904300234573201";

const cjs = require("ngx-iban-validator");
assert.equal(cjs.isValidIBAN(valid), true);
assert.equal(cjs.validateIBAN({ value: valid }), null);

import("ngx-iban-validator").then((esm) => {
  assert.equal(esm.isValidIBAN(valid), true);
  assert.equal(esm.validateIBAN({ value: valid }), null);
  console.log("dist smoke test passed (require + import)");
});
