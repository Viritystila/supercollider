#!/bin/bash
make scsynth
cp server/scsynth/*.js ../wasm/
cp server/scsynth/*.wasm ../wasm/

cp server/scsynth/*.js ../wasmSuperCollider/
cp server/scsynth/*.wasm ../wasmSuperCollider/

cp ../wasm/sc_wasm.js ../wasmSuperCollider/