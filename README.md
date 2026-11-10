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

This function is called in 'updateResults()' in order to filter through 'cities', check which cities contain the 'searchQuery' string in their respective 'keywords', and store their names in an string array called 'results'.  

### Show cards in the screen: 
For showing the actual cards in the screen it is used a function called 'updateResults()'. Every card has a fixed position in the HTML file, but the cities information is injected in them through 'updateResults()' in order to create the ilussion that the cards are changing of position. 

After filtering all the cities that are going to be shown and having deposited their names in 'results', 'updateResults()' updates the inner HTML data of each one of the cards (from left to right, up to down) with the data in each one of the the cities that can be retrieved from 'results'. 

Although 'results' only stores names, cities can still be extracted from it by using dupplementary functions like 'getCityByName(name)'. 

### Favorites Button functionality. 
When the favorite button is clicked on a card, the system uses local storage to store that card in a JSON, and display it in favorites.js. 

Every city is stored in a set called 'favorites' by using the 'addToFavorites(index)' function. Afterwards they are stored in 





