exports.handle = function(request, response){
  if (request.url === '/amioutside'){
    response.send(eightBall[~~(Math.random()*eightBall.length)]);
  } else if (request.url === '/almostrandomcointoss') {
    response.send(almostRandomCoinToss());
  } else if (request.url === '/alternatingcointoss'){
    response.send(alternatingCoinToss());
  }
};

exports.apiEntry = {
  title: 'Help',
  routes: [
    {
      url: '/almostrandomcointoss',
      shortDescription: 'Even better than random!'
    },
    {
      url: '/amioutside',
      shortDescription: 'Know thy location'
    },
    {
      url: '/alternationcointoss',
      shortDescription: 'It looks random!'
    }
  ],
  description: 'Don\'t have a coin? One of our endpoints will definitely help. ' +
  'And, if you\'re not sure if you\'re outside, /amioutside will surely come in useful'
};

var eightBall = [
'Probably not',
'Sources say no',
'It\'s unlikely',
'Chances are...probably not',
'Ask again later, calculation inconclusive',
'There\'s an 83% chance you\'re inside',
'I\'d bet not'
];

var coin = 'H';
var alternationCoinToss = function(){
  if (coin === 'H'){
    coin = 'T';
  } else {
    coin = 'H';
  }
  return coin;
};

// So that the chances change over time
var almostRandomCoinToss = function(){
  var date = new Date();
  var day = date.getDate();
  var start = Math.random() * 100;
  var result = start - ((day - 15) / 2);
  if (result < 50){
    return 'H';
  } else {
    return 'T';
  }
};