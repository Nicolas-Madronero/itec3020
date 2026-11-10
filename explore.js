//Variables
            const n_cities = 6; //temporal
            let searchquery = " ";
            let found = 0;
            let result = [];

            const cards = ["A", "B", "C", "D", "E", "F"];

            let search_complete = false;
            let showingFavorites = false;
            let favoritesStorageAvailable = true;
            //functions

            //backend stuff
            function updateResults(){
                //Reset card visibility: 
                if (search_complete == true){
                    //turn all cards invisible
                    for (let i = 0; i<found; i++){

                        turnInvisible(cards[i]); 
                    }
                    //empty results array
                    for (let i = 0; i<found; i++){
                        result[i] = "";
                    }
                    //erase research status
                    search_complete = false;
                    found = 0;
                }

                //look for results
                for (let i = 0; i < n_cities; i++){
                    //In the Favorites view, skip cities that are not favorites.
                    if (showingFavorites && !cities[i].isFavorite){
                        continue;
                    }
                    let newCity = getMatches(searchquery, cities[i]); //Returns a city name or an empty string
                    if(newCity != ""){ 
                        result[found++] = newCity;
                            
                    }else{
                        continue;
                    }
                }
                

                //Turn cards visible
                for (let i = 0; i < found; i++){
                    turnVisible(cards[i]);
                }
                    
                search_complete = true;

                //Insert results information in cards//
                for (let i = 0; i < found; i++){
                    let city = getCityByName(result[i]);
                    let image = document.getElementById("image"+cards[i]);
                    let favoriteButton = document.getElementById("favButton"+cards[i]);
                    let bookButton = document.getElementById("bookButton"+cards[i]);

                    image.src = city.image;
                    image.alt = city.imageAlt || "View of " + city.name;
                    document.getElementById("title"+cards[i]).textContent = city.name;
                    favoriteButton.textContent = returnFavoriteState(city);
                    favoriteButton.setAttribute("aria-pressed", city.isFavorite);
                    bookButton.textContent = returnBookedState(city);
                    bookButton.setAttribute("aria-pressed", city.isBooked);
                    document.getElementById("details"+cards[i]).innerHTML = "Cost: $" + city.cost.toLocaleString() + "<br>Duration: " + city.days + " days";
                }

                //Show which list is open and explain when it is empty.
                if (showingFavorites){
                    document.getElementById("results-title").textContent = "Favorites";
                }else{
                    document.getElementById("results-title").textContent = "Destinations";
                }
                if (found == 0){
                    if (showingFavorites){
                        document.getElementById("results").textContent = "No favorite destinations found.";
                    }else{
                        document.getElementById("results").textContent = "No destinations found. Try a different search.";
                    }
                }else{
                    document.getElementById("results").textContent = "";
                }
                if (!favoritesStorageAvailable){
                    document.getElementById("results").textContent += " Favorites could not be saved in this browser.";
                }
            }
            
            function createKeyword(city){
                return city.name + " " + city.continent + " " + city.country;   
            }
            function getMatches(word, city){
                if (city.keywords.toLowerCase().includes(word.toLowerCase())){
                    return city.name;
                }
                return "";
            }
           function getCityByName(cityname){
                for(let i = 0; i < n_cities; i++){
                    if (cities[i].name == cityname){
                        return cities[i];
                    }
                }
           }

           //for hiding or unhiding the options///
           function turnVisible(cardID){
                document.getElementById(cardID).hidden = false;
           }
            function turnInvisible(cardID){
                document.getElementById(cardID).hidden = true;
           }
           
           
           //getting user requests when they search///
           function searchTrip(){
                searchquery = document.getElementById("search").value.trim();
                updateResults();
            }

            function showFavorites(){
                showingFavorites = true;
                document.getElementById("search").value = "";
                searchquery = "";
                updateResults();
            }

            //Keep the list in sync with the Favorites link and the browser's back button.
            function showCurrentPage(){
                if (window.location.hash == "#favorites"){
                    showFavorites();
                }else{
                    showingFavorites = false;
                    const params = new URLSearchParams(window.location.search);
                    document.getElementById("search").value = params.get("search") || "";

                    searchTrip();
                }
            }
            
            //favorite functionality//
            function loadFavorites(){
                try{
                    for (let i = 0; i < cities.length; i++){
                        cities[i].isFavorite = localStorage.getItem("brokeAbroadFavorite_" + cities[i].name) == "true";
                    }
                }catch(error){
                    favoritesStorageAvailable = false;
                }
            }

            function addToFavorites(index){
                let city = getCityByName(document.getElementById("title"+cards[index]).textContent);
                if(city.isFavorite){
                    unaddFromFavorites(index);
                }
                
                else{ 
                    city.isFavorite = true;
                    document.getElementById("favButton"+cards[index]).textContent = "Added to favorites";
                    document.getElementById("favButton"+cards[index]).setAttribute("aria-pressed", "true");
                }

                //save it if the favorite toggle is on it uses browser cache.
                try{
                    localStorage.setItem("brokeAbroadFavorite_" + city.name, city.isFavorite);
                    favoritesStorageAvailable = true;
                }catch(error){
                    favoritesStorageAvailable = false;
                }
                updateResults();
            }

            function unaddFromFavorites(index){
                getCityByName(document.getElementById("title"+cards[index]).textContent).isFavorite = false;
                document.getElementById("favButton"+cards[index]).textContent = "Add to favorites";
                document.getElementById("favButton"+cards[index]).setAttribute("aria-pressed", "false");
            }
            function returnFavoriteState(city){
                if(city.isFavorite){
                    return "Added to favorites";
                }else{
                    return "Add to favorites";
                }
            }

            //booking function//
            function bookTrip(index){
                if(getCityByName(document.getElementById("title"+cards[index]).textContent).isBooked){
                    unbookTrip(index);
                }
                
                else{ 
                    getCityByName(document.getElementById("title"+cards[index]).textContent).isBooked = true;
                    document.getElementById("bookButton"+cards[index]).textContent = "Booked";
                    document.getElementById("bookButton"+cards[index]).setAttribute("aria-pressed", "true");
                }
            }

            function unbookTrip(index){
                getCityByName(document.getElementById("title"+cards[index]).textContent).isBooked = false;
                document.getElementById("bookButton"+cards[index]).textContent = "Book";
                document.getElementById("bookButton"+cards[index]).setAttribute("aria-pressed", "false");
            }
            function returnBookedState(city){
                if(city.isBooked){
                    return "Booked";
                }else{
                    return "Book";
                }
            }

            
            //objects
            //cities
            let tokyo = {name: "Tokyo", cost: 2000, days: 25, country: "japan", continent: "asia", keywords: " ", isFavorite: false,isBooked: false, image: "TokyoCard.jpeg" };
            tokyo.keywords = createKeyword(tokyo);
            let osaka = {name: "Osaka", cost: 1800, days: 20, country: "japan", continent: "asia", keywords: " ", isFavorite: false, isBooked: false,image: "OsakaCard.jpeg" };
            osaka.keywords = createKeyword(osaka);
            let seoul = {name: "Seoul", cost: 1900, days: 30, country: "south korea", continent: "asia", keywords: " ", isFavorite: false,isBooked: false,image: "Seoul.jpeg"};
            seoul.keywords = createKeyword(seoul);
            let busan = {name: "Busan", cost: 1700, days: 20, country: "south korea", continent: "asia", keywords: " ", isFavorite: false,isBooked: false,image: "busan.png"};
            busan.keywords = createKeyword(busan);
            let vancouver = {name: "Vancouver", cost: 1900, days: 25, country: "canada", continent: "north america", keywords: " ", isFavorite: false, isBooked: false, image: "VancouverCard.jpg", imageAlt: "Illustration of an airplane in flight" };
            vancouver.keywords = createKeyword(vancouver);
            let madrid = {name: "Madrid", cost: 1600, days: 30, country: "spain", continent: "europe", keywords: " ", isFavorite: false, isBooked: false, image: "MadridCard.jpg" };
            madrid.keywords = createKeyword(madrid);

            //allcities
            const cities = [tokyo, osaka, vancouver, madrid, seoul, busan];

            //Load saved favorites before showing destinations.
            document.addEventListener("DOMContentLoaded", function(){
                loadFavorites();
                showCurrentPage();
            });
            window.addEventListener("hashchange", showCurrentPage);

          
