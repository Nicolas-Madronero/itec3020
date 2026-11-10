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

## JavaScript Functionality:
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

Every city is stored in a set called 'favorites' by using the 'addToFavorites(index)' function. Afterwards they are stored in local sotorage as JSON by using JSON.parse(localSotrage.setItem("favorites") || "[]") in 'saveFavorites().

For preventing the page refresh to erasing the information in the cards, once the user switches to the 'favorites.html' page, a window.addEventListener(DOMContentLoaded", function()) is added in order to show the favorites in 'favorite.html' as long as there are changes in the DOM content.

### Form Validation:

The `support.js` file controls the interactions for the Customer Support contact form.

When the HTML page finishes loading, the script uses the `DOMContentLoaded` event to find the contact form, input fields, error-message elements, and success message. This prevents JavaScript errors caused by trying to access HTML elements before they are available.

When the user clicks **Submit Question**, JavaScript prevents the page from refreshing using `event.preventDefault()`. It then validates the email address and phone number.

The email field must contain an `@` symbol. If the email is empty or does not contain an `@`, an error message appears below the email field, the input box is highlighted in red, and the success message remains hidden.

The phone number field must contain exactly 10 digits. The script removes spaces, dashes, brackets, and other non-digit characters before counting the digits. If the phone number has fewer than 10 digits, an error message says that it has too few digits. If it has more than 10 digits, an error message says that it has too many digits.

The name and question fields do not require validation.

As the user types in the email or phone number field, JavaScript removes the previous error message and red highlighting. If both the email and phone number pass validation, the script displays a success message saying that the question was submitted successfully, clears the form, and removes any validation highlights.







