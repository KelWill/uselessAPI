var fs = require('fs');
var path = require('path');

var numCats = 20;

exports.handle = function(request, response){
  var num = ~~(Math.random() *  numCats);
  var catPath = path.join(__dirname, '/images/cats/cat', num, '.jpg');
  console.log('catPath', catPath);
  var stream = fs.createReadStream(catPath);
  stream.pipe(response);
  stream.on('end', function(){
    response.end();
  });
};

exports.apiEntry = {
  title: 'Mediocre Cat Pics',
  routes: [
    {
      url : '/mediocrecatpic',
      shortDescription : undefined
    }
  ],
  description: 'Finding cute pictures of cats is trivial--get your mediocre ones here'
};