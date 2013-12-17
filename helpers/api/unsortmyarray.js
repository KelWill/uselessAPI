//TODO: refactor to choose a random unsorting algorithm and unsort it in different ways each time
exports.handle = function(request, response){
  if (!request.body){
    response.writeHead(400);
    response.end();
  }
  console.log("request.body", request.body);
  var result = checkArray(request.body);
  console.log(result);
  if (!result){
    response.writeHead(400);
    response.end();
  } else {
    response.send(result);
  }
};

//  Type Checking
var checkArray = function(body){
  if (typeof body === "string"){
    body = JSON.parse(body);
  }
  if (!(Array.isArray(body))){
    return false;
  } else {
    return isAlreadySorted(body);
  }
};

//  Making sure array is already sorted (descending or ascending order works)
var isAlreadySorted = function(array){
  var ascending;
  if (!array.length) return array;
  if (typeof array[0] !== "number" || typeof array[1] !== "number") return false;
  if (array.length < 2) return array;

  var i = 0;
  if (array[i] < array[i + 1]){
    ascending = true;
  } else if (array[i] > array[i+1]) {
    ascending = false;
  }
  while (array[i + 1] !== undefined && array[i] === array[i + 1]){
    i++;
    if (array[i] < array[i + 1]){
      ascending = true;
    } else if (array[i] > array[i+1]) {
      ascending = false;
    }
  }

  for (i; i < array.length - 1; i++){
    if (typeof array[i] !== "number"){
      return false;
    }
    if (ascending){
      if (array[i] > array[i + 1]){
        return false;
      }
    } else {
      if (array[i] < array[i + 1]){
        return false;
      }
    }
  }
  return unsortArray(array);
};

var unsortArray = function(array){
  if (array.length < 2){
    return array;
  }
  var temp;
  for (var i = 0; i < array.length - 1; i = i + 2){
    temp = array[i];
    array[i] = array[i + 1];
    array[i + 1] = temp;
  }
  return array;
};

exports.apiEntry = {
  title: 'Unsorted Arrays',
  routes: [{
    url: '/unsortmyarray',
    needsData: true,
    shortDescription: "Enter a sorted array for fun and profit"
  }],
  description: 'Need to unsort an array? Simply make a request to /unsortmyarray ' +
  'and it will return an unsorted, but not randomized, array. Only arrays of numbers ' +
  'will be accepted.'
};
