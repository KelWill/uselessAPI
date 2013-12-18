exports.handle = function(request, response){
  if (!request.body){
    response.writeHead(400);
    response.end();
  }
  var dob = request.body;
  if (request.url === '/amiprime'){
    if (isValidDob(dob)){
      response.send(JSON.stringify(
        //insert function here
        ));
    } else {
      response.writeHead(400);
      response.end("Let's try a date in the past.  Please use Arabic numerals next separated by '/' next time.  Like this: 'mm/dd/year'.");
    }
  } else if (request.url === "/mostlysort"){
    if (checkArray(array)){
      response.send(JSON.stringify(mostlySort(array)));
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

var dobInDays = function(dob){
  var date = newDate(dob);
  var milli = new Date() - date.dateObj;
  var days = Math.ceil(milli / (1000*60*60*24));
  return days;
};

var isPrime = function(days){
  if (days < 2 || days === 4) { return false; }
  if (days === 2) { return true; }
  
  var sqrt = Math.ceil(Math.sqrt(days));

  for (var i=3; i<=sqrt; i+=2){
    if (days % i === 0){
      return false;
    }
  }
  return true;
};

var isAlreadySorted = function(array){
  var ascending;
  if (!array.length) return array;
  if (typeof array[0] !== "number" || typeof array[1] !== "number") return false;
  if (array.length < 2) return array;

  var i = 0;
  if (array[i] < array[i + 1])    ascending = true;
  else if (array[i] > array[i+1]) ascending = false;
  while (array[i + 1] !== undefined && array[i] === array[i + 1]){
    i++;
    if (array[i] < array[i + 1])    ascending = true;
    else if (array[i] > array[i+1]) ascending = false;
  }

  for (i; i < array.length - 1; i++){
    if (typeof array[i] !== "number") return false;
    if (ascending){
      if (array[i] > array[i + 1])    return false;
    } else {
      if (array[i] < array[i + 1])    return false;
    }
  }
  return true;
};


var mostlySort = function(array){
  if (array.length <=  2) return array;
  var index = ~~(Math.random() * array.length);
  var otherIndex;
  if (array[index + 1]) {
    otherIndex = index + 1;
  } else {
    otherIndex = index - 1;
  }
  var temp = array[index];
  array[index] = array[otherIndex];
  array[otherIndex] = temp;
  return array;
};

var unsortArray1 = function(array){
  if (array.length < 2) return array;
  var temp;
  for (var i = 0; i < array.length - 1; i = i + 2){
    temp = array[i];
    array[i] = array[i + 1];
    array[i + 1] = temp;
  }
  if (array.length === 3) return array;
  return unsortArray2(array);
};

exports.apiEntry = {
  title: 'Primes',
  routes: [
    {
      url: '/unsortmyarray',
      needsData: true,
      shortDescription: "Enter a sorted array for fun and profit"
    },
    {
      url: '/mostlysort',
      needsData: true,
      shortDescription: "Ehhh, it's close enough."
    }
  ],
  description: 'Need to unsort an array, but don\'t want it to? Want to get an array mostly sorted? Look no further!'
};