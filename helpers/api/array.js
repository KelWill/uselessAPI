exports.handle = function(request, response){
  if (!request.body){
    response.writeHead(400);
    response.end();
  }
  var array = request.body;
  if (request.url === "/unsortmyarray"){
    if (checkArray(array) && isAlreadySorted(array)){
      response.send(JSON.stringify(unsortMethods[~~(Math.random() * unsortMethods.length)](array)));
    } else {
      response.writeHead(400);
      response.end("Must send a sorted numerical array");
    }
  } else if (request.url === "/mostlysort"){
    if (checkArray(array)){
      response.send(JSON.stringify(mostlySort(array)));
    }
  } else if (request.url === '/sixthelementorkangaroo'){
    response.send(JSON.stringify(sixthElementOrKangaroo(array)));
  }
};

//  Type Checking
var checkArray = function(body){
  if (!(Array.isArray(body))) return false;
  else return true;
};

//  Making sure array is already sorted (descending or ascending order works)
//  Could refactor to use native sort function for clarity
var isAlreadySorted = function(array){
  var ascending;
  if (!array.length) return array;
  if (typeof array[0] !== "number" || typeof array[1] !== "number") return false;
  if (array.length <= 2) return false;

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
  array = array.sort(function(a, b){
    return (parseInt(a) - parseInt(b));
  });
  var index = ~~(Math.random() * array.length);
  var otherIndex;
  if (array[index + 1] !== undefined) {
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

var unsortArray2 = function(array){
  if (array.length < 2) return array;
  var index1 = ~~(Math.random() * array.length);
  var index2 = ~~(Math.random() * array.length);
  //In case returns the same number
  while (index1 === index2){
    index2 = ~~(Math.random() * array.length);
  }
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  return array;
};

var unsortArray3 = function(array){
  if (array.length < 2)  return array;
  var i = ~~(Math.random() * array.length);
  var firstHalf = array.slice(0, i);
  var secondHalf = array.slice(i, array.length);

  return secondHalf.concat(firstHalf);
};

//   Contains all the different methods you can use to unsort an array
var unsortMethods = [];
unsortMethods.push(unsortArray1);
unsortMethods.push(unsortArray2);
unsortMethods.push(unsortArray3);

var sixthElementOrKangaroo = function(array) {
  if (typeof array[5] === 'undefined') {
    return "kangaroo";
  } else {
    return array[5];
  }
};

//dataNeedsParsing is only relevant for example requests
exports.apiEntry = {
  title: 'Arrays',
  routes: [
    {
      url: '/unsortmyarray',
      needsData: true,
      dataNeedsParsing: true,
      dataExample: JSON.stringify([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]),
      shortDescription: "Enter a sorted array for fun and profit"
    },
    {
      url: '/mostlysort',
      needsData: true,
      dataNeedsParsing: true,
      dataExample: JSON.stringify([1, 6, 3, 2, 24, 9, 12, 87, 4, 5]),
      shortDescription: "Ehhh, it's close enough."
    },
    {
      url: '/sixthelementorkangaroo',
      needsData: true,
      dataNeedsParsing: true,
      dataExample: JSON.stringify([1, 2, 3, 4]),
      shortDescription: 'Because you need to know'
    }
  ],
  description: 'Need to unsort an array, but don\'t want it to be random? Want to get an array mostly sorted? Look no further!'
};
