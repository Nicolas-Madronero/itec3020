//Variables
            const n_cities = 4; //temporal
            let searchquery = " ";
            let found = 0;
            let result = [];

            const cards = ["A", "B", "C", "D"];

            let search_complete = false;
            //-----------FUNCTIONS---------------------------//

            //-------------Backend oprations---------------//
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
                    let newCity = getMatches(searchquery, cities[i]) // (Lines 56-59) Returns city name or empty string
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
                    document.getElementById("image"+cards[i]).src = getCityByName(result[i]).image;
                    document.getElementById("title"+cards[i]).innerHTML = result[i];
                    document.getElementById("cost"+cards[i]).innerHTML = "Cost: " + getCityByName(result[i]).cost;
                    document.getElementById("duration"+cards[i]).innerHTML = "Duration: " + getCityByName(result[i]).days + " days"; 
                    document.getElementById("favButton"+cards[i]).innerHTML = returnFavoriteState(getCityByName(result[i]))
                    //Recommend change: reuslt should be a city array, not a string array. returnFavoriteState(getCityByName(result[i]))
                }

            }
            
            function createKeyword(city){
                return city.name + " " + city.continent + " " + city.country;   
            }
            function getMatches(word, city){
                flag = new RegExp(word, "gi");
                return getCityByKeyword(city, flag);
            }
           function getCityByKeyword(city, flag){
                try{
                if (city.keywords.match(flag) != null){
                    return city.name;
                }else{
                    return "";
                }
            }catch(TypeError){
                return null;
            }
           }
           function getCityByName(cityname){
                for(let i = 0; i < n_cities; i++){
                    if (cities[i].name == cityname){
                        return cities[i];
                    }
                }
           }

           //--------Update content----------------------------------------///
           function turnVisible(cardID){
                document.getElementById(cardID).style.visibility="visible";
           }
            function turnInvisible(cardID){
                document.getElementById(cardID).style.visibility="hidden";
                //before city name
           }
           
           
           //-----------------------Get User Requests-------------------///
           function searchTrip(){
                try{
                    searchquery = document.getElementById("search").value;
                }
                catch(TypeError){
                    searchquery = "Is Empty";
                }
                
                updateResults();
            }
            //function sendID(){}
            
            
            function addToFavorites(index){
                if(getCityByName(document.getElementById("title"+cards[index]).innerHTML).isFavorite){
                    unaddFromFavorites(index);
                }
                
                else{ 
                    getCityByName(document.getElementById("title"+cards[index]).innerHTML).isFavorite = true
                    document.getElementById("favButton"+cards[index]).innerHTML = "Added to favorites";  
                }
            }

            function unaddFromFavorites(index){
                getCityByName(document.getElementById("title"+cards[index]).innerHTML).isFavorite = false;
                document.getElementById("favButton"+cards[index]).innerHTML = "Add to favorites";   
            }
            function returnFavoriteState(city){
                if(city.isFavorite){
                    return "Added to favorites";
                }else{
                    return "Add to favorites";
                }
            }

            
            //objects
            //cities
            let tokyo = {name: "Tokyo", cost: 5000, days: 30, country: "japan", continent: "asia", keywords: " ", isFavorite: false,isBooked: false, image: "TokyoCard.jpeg" };
            tokyo.keywords = createKeyword(tokyo);
            let osaka = {name: "Osaka", cost: 5000, days: 30, country: "japan", continent: "asia", keywords: " ", isFavorite: false, isBooked: false,image: "OsakaCard.jpeg" };
            osaka.keywords = createKeyword(osaka);
            let seul = {name: "Seul", cost: 5000, days: 30, country: "south korea", continent: "asia", keywords: " ", isFavorite: false,isBooked: false,};
            seul.keywords = createKeyword(seul);
            let busan = {name: "busan", cost: 5000, days: 30, country: "south korea", continent: "asia", keywords: " ", isFavorite: false,isBooked: false,};
            busan.keywords = createKeyword(busan);
            let vancouver = {name: "Vancouver", cost: 5000, days: 30, country: "canada", continent: "north america", keywords: " ", isFavorite: false, isBooked: false,image: "VancouverCard.jpg" };
            vancouver.keywords = createKeyword(vancouver);
            let madrid = {name: "Madrid", cost: 5000, days: 30, country: "spain", continent: "europe", keywords: " ", isFavorite: false, isBooked: false, image: "MadridCard.jpg" };
            madrid.keywords = createKeyword(madrid);

            //allcities
            const cities = [tokyo, osaka, vancouver, madrid];
            
            //testing

          
