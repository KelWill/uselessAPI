exports.handle = function(request, response){
  if (!request.body){
    response.writeHead(400);
    response.end();
  }
  var dob = request.body;
  if (request.url === '/amiprime'){
    if (isValidDob(dob)){
      response.send(JSON.stringify(dobIsPrime(dob)));
    } else {
      response.writeHead(400);
      response.end("Let's try a date in the past.  Please use Arabic numerals separated by '/' next time.  Like this: 'mm/dd/year'.");
    }
  }
};

//  Making sure array is already sorted (descending or ascending order works)
//  Could refactor to use native sort function for clarity

var newDate = function(dob){
  var instance = {};

  instance.date = dob.split('/');
  instance.month = instance.date[0] - 1;
  instance.day = instance.date[1];
  instance.year = instance.date[2];
  instance.dateObj = new Date(instance.year, instance.month, instance.day);

  return instance;
};

var isValidDob = function(dob){
  var bday = newDate(dob);
  for (var i=0; i<bday.date.length; i++){
    if (isNaN(bday.date[i])){
      return false;
    }
  }
  if (bday.month > 12){
    return false;
  }
  if ((bday.month === 1 || bday.month === 3 || bday.month === 5 || bday.month === 7 || bday.month === 8 || bday.month === 10 || bday.month === 12) && bday.day > 31){
    return false;
  }
  if ((bday.month === 4 || bday.month === 6 || bday.month === 9 || bday.month === 11) && bday.day > 30){
    return false;
  }
  if (bday.month === 2 && (bday.day === 28 || bday.day === 29)){
    return false;
  }
  if (bday.month === 2 && bday.day === 29 && !isLeapYear(bday.year)){
    return false;
  }
  if (new Date() - bday.dateObj < 0){
    return false;
  }
  return true;
};

var isLeapYear = function(year){
  return new Date(year, 1, 29).getMonth() === 1;
};

var isPrime = function(num){
  if (num < 2) { return false; }
  if (num === 2) { return true; }
  if (num % 2 === 0) { return false; }
  
  var sqrt = Math.ceil(Math.sqrt(num));

  for (var i=3; i<=sqrt; i+=2){
    if (num % i === 0){
      return false;
    }
  }
  return true;
};

var dobIsPrime = function(dob){
  var date = newDate(dob);
  var milli = new Date() - date.dateObj;
  var days = Math.ceil(milli / (1000*60*60*24));
  var val = isPrime(days);
  return val ? "Your mother was right, you are special." : "A very uninteresting (wo)man of the crowd";
};

exports.apiEntry = {
  title: 'Math Like Me',
  routes: [
    {
      url: '/amiprime',
      needsData: true,
      shortDescription: "Enter your birthday: mm/dd/yyyy"
    }
  ],
  description: 'Are you special? Let\'s find out.'
};