# README
## General Information: 
### Group members: 
- Nicolas Madronero Martinez
  - 222017792
- Ash Lee
  - 221928585
- Parsa Hosseinpouriantaheri
  - 220762274

### Website Theme: 
Travel Agency 

## JavaScript Functionality - explore.js: 
Every city in the system is represented in 'explore.js' as an object with several attributes, like name, isFavorite, etc; and every city is contained in an array called 'cities'. 
The system assigns to each city a non-unique identifier called 'keywords' which allows the system to filter through every city in cities and retrieve the ones that the user might look for. 
### Search functionality 
The system utilizes a function called 'searchTrip()' in order to retrieve the String information entered by the user and put it into the global variable 'searchQuery'. 
### Filter functionality
The system then utilized the 'getMatches(word, city)' - which specifically uses RegExp functions to check if a word is in a 'city.keywords' and retrieve either the city's name or an empty string. 

This function is called in 'updateResults()' in order to filter through 'cities', check which cities contain the 'searchQuery' string in their respective 'keywords', and store them in an array called results.  
