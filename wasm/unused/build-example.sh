echo 'Removing existing builds...'
rm -r -f public/wasm/example/example.js
rm -r -f public/wasm/example/example.wasm
rm -r -f public/wasm/example/example.html
rm -r -f wasm/example/example.js
rm -r -f wasm/example/example.wasm
rm -r -f wasm/example/example.html

echo 'Building wasm...'
emcc -o wasm/build/example.js wasm/example/*.cpp \
    -lm \
    -sENVIRONMENT='web'
echo 'Copying wasm files...'
cp wasm/example/*.wasm public/wasm/example
cp wasm/example/*.js public/wasm/example