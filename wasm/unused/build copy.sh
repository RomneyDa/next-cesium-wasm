echo 'Removing existing builds...'
rm -r -f public/wasm/main.js
rm -r -f public/wasm/main.wasm
rm -r -f public/wasm/main.html
rm -r -f wasm/build/main.js
rm -r -f wasm/build/main.wasm
rm -r -f wasm/build/main.html

# echo 'Building wasm module...'
# emcc -o wasm/build/module.js wasm/source/module.cpp -lm -sMODULARIZE -sEXPORTED_RUNTIME_METHODS=ccall,cwrap # -g
# emcc -o wasm/build/module.js wasm/source/module.cpp -lm -sMODULARIZE -sEXPORTED_RUNTIME_METHODS=ccall,cwrap
# emcc test/hello_function.cpp -o function.html -sEXPORTED_FUNCTIONS=_test -sEXPORTED_RUNTIME_METHODS=ccall,cwrap

# echo 'Copying wasm module files...'
# cp wasm/build/module.wasm public/wasm/ 
# cp wasm/build/module.js public/wasm/ 

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