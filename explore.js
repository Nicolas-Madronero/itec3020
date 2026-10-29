//Variables
            const n_cities = 4; //temporal
            let searchquery = " ";

            //Functions
            function updateResults(){
                //document.getElementById("results").innerHTML = searchquery;
                //document.getElementById("results").innerHTML = getMatches(searchquery, tokio).name;
                let result = "";
                try{
                    //4 is the current number of cities
                    for (let i = 0; i < 4; i++){
                        let newCity = getMatches(searchquery, cities[i])
                        if(newCity != ""){
                            result +=  newCity + "<br> ";
                        }else{
                            continue;
                        }
                    }
                    document.getElementById("results").innerHTML = result;
                    
                }
                catch(TypeError){
                    document.getElementById("results").innerHTML = searchquery;
                }
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
                flag = city.keywords.match(new RegExp(word, "gi"));
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

            //allcities
            const cities = [tokio, osaka, seul, busan];
            
            //testing

            console.log(searchquery);
