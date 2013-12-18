exports.handle = function(request, response){
  response.send(helloWorld());
};

exports.apiEntry = {
  title: 'Hello World',
  routes: [
    {
      url: '/helloworld',
      shortDescription: 'And hello to you too!'
    }
  ],
  description: 'Returns hello world in a random programming language!'
};

var helloWorld = function() {
  var helloWorlds = [
    '#  cat test.jl\
    println("Hello World")',
    'object HelloWorld {\
      def main(args: Array[String]) {\
        println("Hello World")\
      }\
    }',
    '#include<stdio.h>\
    main()\
    {\
      printf("Hello World");\
    }',
    'print("Hello World")',
    'PRINT *, "Hello World"\
    END',
    'console.log("Hello World")',
    'puts "Hello World"',
    '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.',
    'class HelloWorldApp {\
       public static void main(String[] args) {\
       System.out.println("Hello World!");\
      }\
    }'
  ];
  return helloWorlds[~~(Math.random()*helloWorlds.length)];
};