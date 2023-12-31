#include <iostream>
#include <string>
#include <locale>
#include <algorithm>
#include <future>
#include <chrono>

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>

std::string makeUpperCase(const std::string &in) {
    auto str = in;

    std::transform(str.begin(), str.end(), str.begin(), [](unsigned char c) {
        return std::toupper(c);
    });

    return str;
}

class MyClass {
public:
    MyClass(int x, std::string y)
        : x(x), y(y)
    {
    }

    void incrementX(){
        ++x;
    }

    int getX() const { return x; }
    void setX(int x_) { x = x_; }

    static std::string getStringFromInstance(const MyClass &instance){
        return instance.y;
    }

private:
    int x;
    std::string y;
};


//////////////////////////////////////////////////////////////////
EM_JS(void, call_js, (), {
    jsMethod();
});

bool callJsBack(){
    call_js();
    return true;
}

//////////////////////////////////////////////////////////////////
EM_JS(void, call_js_agrs, (const char *title, int lentitle, const char *msg, int lenmsg), {
    jsMethodAgrs(UTF8ToString(title, lentitle), UTF8ToString(msg, lenmsg));
});

bool callJsBackWithArgs(){
    const std::string title = "Hello from C++";
    const std::string msg = "This string is passed as a paramter from C++ code!";
    call_js_agrs(title.c_str(), title.length(), msg.c_str(), msg.length());
    return true;
}

//////////////////////////////////////////////////////////////////
EM_JS(void, callback, (int index, const char *msg, int lenmsg), {
    functionMap(index, UTF8ToString(msg, lenmsg));
});

void cppFunctionWithJsCallback(int index) {
    const std::string msg = "Js callback called with this data from C++ code!";
    callback(index, msg.c_str(), msg.length());
}

EMSCRIPTEN_BINDINGS(module)
{
    emscripten::function("makeUpperCase", &makeUpperCase);
    emscripten::function("callJsBack", &callJsBack);
    emscripten::function("callJsBackWithArgs", &callJsBackWithArgs);
    emscripten::function("cppFunctionWithJsCallback", &cppFunctionWithJsCallback);

    emscripten::class_<MyClass>("MyClass")
        .constructor<int, std::string>()
        .function("incrementX", &MyClass::incrementX)
        .property("x", &MyClass::getX, &MyClass::setX)
        .class_function("getStringFromInstance", &MyClass::getStringFromInstance);
}
