#include <stdio.h>
#include <emscripten.h>
#include <string.h>

EM_JS(void, call_alert, (), {
  alert('hello world!');
  throw 'all done';
});

extern "C" {

int main() {
  call_alert();
  return 0;
}

EMSCRIPTEN_KEEPALIVE
int test() {
    return 1;
}

EMSCRIPTEN_KEEPALIVE
string say_hi() {
  printf("Hi!\n");
  return "hi"
}

}