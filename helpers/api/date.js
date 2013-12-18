
exports.handle = function(request, response){
  if (request.url === '/tomacaulayculkintime') {
    response.send(JSON.stringify(toMacaulayCulkinTime()));
  } else if (request.url === '/areweintheunixera'){
    response.send(JSON.stringify(areWeInTheUNIXEra()));
  } else if (request.url === '/onedayago'){
    response.send(JSON.stringify(oneDayAgo()));
  }
};

exports.apiEntry = {
  title: 'Dates',
  routes: [
    {
      url: '/tomacaulayculkintime',
      shortDescription: 'Yes, you want to know'
    },
    {
      url: '/areweintheunixera',
      shortDescription: 'Things might change'
    },
    {
      url: '/onedayago',
      shortDescription: 'Was yesterday'
    }
  ],
  description: 'Need to know the current age of Macaulay Culkin in milliseconds? ' +
  'How about whether or not we are in the UNIX era?'
};


var toMacaulayCulkinTime = function(date) {
  date = date || new Date();
  return date - 1019433600000;
};

var areWeInTheUNIXEra = function() {
  return (new Date() - 0 >= 0);
};

var oneDayAgo = function(){
  return (new Date() - 86400000);
};


