Useless API
==========
# About #

Useless API is a collection of endpoints that return useless information. Currently, the API can return information on weather in the Antarctic, facts about shadows, and if sent a sorted list, it can un-sort it.

## Why?

Useless API is a chance for people to make fun code. Have a silly idea? Issue a pull request! Great ideas will be non-trivial to implement, and will be encapsulated in a module that has a handle function that handles the requests and an apiEntry property that describes the endpoint. Check out all our awesomely irrelevant endpoints at [uselessAPI](uselessapi.azurewebsites.net).

## Syntax for apiEntry
See code in api folder for more examples.

    exports.module.apiEntry = {
      title: 'An awesome title',
      routes: [
        {
          url: '/anewroute',
          shortDescription: 'click for exciting things!'
        },
        { 
          url: '/urlsareaewsome',
        }
     ],
     [needDate: true,
     paramKeys: ['name', 'anotherkey']]
     description: 'This is a pretty sweet endpoint that you should totally click'
  };
