//Variables
            const n_cities = 4; //temporal
            let searchquery = " ";
            let found = 0;
            let result = [];

            const cards = ["A", "B", "C", "D"];

            let search_complete = false;
            //Functions
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
                
                //Insert results information in cards
                for (let i = 0; i < found; i++){
                    document.getElementById("title"+cards[i]).innerHTML = result[i];
                }

                //show results
                for (let i = 0; i < found; i++){
                    turnVisible(cards[i]);
                }
                    
                search_complete = true;

            }
            function searchTrip(){
                try{
                    searchquery = document.getElementById("search").value;
                }
                catch(TypeError){
                    searchquery = "Is Empty";
                }
                
                updateResults();
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

           //test functions
           function turnVisible(cardID){
                document.getElementById(cardID).style.visibility="visible";
           }
            function turnInvisible(cardID){
                document.getElementById(cardID).style.visibility="hidden";
                //before city name
           }
           

            //objects
            //cities
            let tokio = {name: "tokio", cost: 5000, country: "japan", continent: "asia", keywords: " ", isFavorite: false};
            tokio.keywords = createKeyword(tokio);
            let osaka = {name: "osaka", cost: 5000, country: "japan", continent: "asia", keywords: " ", isFavorite: false};
            osaka.keywords = createKeyword(osaka);
            let seul = {name: "seul", cost: 5000, country: "south korea", continent: "asia", keywords: " ", isFavorite: false};
            seul.keywords = createKeyword(seul);
            let busan = {name: "busan", cost: 5000, country: "south korea", continent: "asia", keywords: " ", isFavorite: false};
            busan.keywords = createKeyword(busan);
            let vancouver = {name: "vancouver", cost: 5000, country: "canada", continent: "north america", keywords: " ", isFavorite: false};
            vancouver.keywords = createKeyword(vancouver);
            let madrid = {name: "madrid", cost: 5000, country: "spain", continent: "europe", keywords: " ", isFavorite: false};
            madrid.keywords = createKeyword(madrid);

            //allcities
            const cities = [tokio, osaka, vancouver, madrid];
            
            //testing

            console.log(print(madrid.keywords));
