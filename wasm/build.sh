echo 'Removing existing builds...'
rm -r -f public/wasm/main.js
rm -r -f public/wasm/main.wasm
rm -r -f public/wasm/main.html
rm -r -f wasm/build/main.js
rm -r -f wasm/build/main.wasm
rm -r -f wasm/build/main.html

echo 'Building wasm...'
emcc -o wasm/build/main.html wasm/source/*.cpp \
    -lm \
    -sENVIRONMENT='web' \
    -sEXPORTED_FUNCTIONS=_main,_say_hi,_random_between \
    -sUSE_SDL=2 \
    -sEXPORTED_RUNTIME_METHODS=cwrap 
echo 'Copying wasm files...'
cp wasm/build/main.wasm public/wasm/ 
cp wasm/build/main.js public/wasm/ 



cmake -B ./build -S ./source