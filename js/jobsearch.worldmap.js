  	var map;
  	var allCountries;
	var excludedCountries;
	var myCustomColors = new Object();
	var greyOutColor = "#ffffff";
	
	/*
	It gets all the countries from the map object
	*/
	var getAllCountries = function(map){
			var allCountries = []; 
			for (var i in map.regions){
				allCountries.push(i);
			}
			return allCountries;	
	};
	
	/*
	The following function removes the useless countries from the allCountries array.
	It works by only keeping the useful countries (listed in JSCountries) and removing the others
	*/
	var removeExcludedCountries = function(){
		
		//this function extract all the keys of the JScountries object
		var validCountries = Object.keys(JScountries);
		
		var selCountries = [];
		
		for (var i=0; i<allCountries.length; i++){
			if ($.inArray(allCountries[i], validCountries) > -1){
				selCountries.push(allCountries[i]);
			}
		}
		return selCountries;
	};
	
	
	var getExcludedCountries = function(){
		
		//this function extract all the keys of the JScountries object
		var excludedCountries = Object.keys(JScountries);
		
		var excCountries = [];
		
		for (var i=0; i<allCountries.length; i++){
			if ($.inArray(allCountries[i], excludedCountries) == -1){
				excCountries.push(allCountries[i]);
				
				//add the country to the myCustomColor
				myCustomColors[allCountries[i]] = greyOutColor;
				
			}
		}
		return excCountries;
	};
	
	
	
  
    $(function(){	
			
		$('#world-map').vectorMap({
	
		
			map: 'WorldNVS',
      		backgroundColor: 'transparent',
			
			
			series: {
        		regions: [{
            		values: excludedCountries,
            		attribute: 'fill',
        		}]
    		},
			
			
      		regionStyle: {
            	
				initial: {
                  fill: '#f6eee0', // this adds color too all regions,
				  stroke: "#9c8673",
				  "stroke-opacity": 1,
				  "stroke-width": 1 
             	},
				hover: {
    				"fill-opacity": 0.8,
					fill: '#f9c16c'
  				},
				selected: {
    				fill: '#f9c16c'
 				},
       		},
			
			onRegionOver: function(e, code) {
				if ($.inArray(code, excludedCountries) !== -1){
					// the hovered region is part of the regionResults, show hand cursor
					e.preventDefault();	
				}
				else{
					document.body.style.cursor = 'pointer';
				}
    		},
			onRegionOut: function(e, code) {
            	// return to normal cursor
            	document.body.style.cursor = 'default';
        	},
			onRegionLabelShow: function(e, el, code){
   				if ($.inArray(code, excludedCountries) !== -1){
					// the hovered region is part of the regionResults, show hand cursor
					//document.body.style.cursor = 'pointer';
					e.preventDefault();	
				} 
  		     },
			 
			 onRegionClick: function(e,code){
				 
				 map = $('#world-map').vectorMap('get', 'mapObject');
				 
				if ($.inArray(code, excludedCountries) == -1){
					// the hovered region is part of the regionResults, show hand cursor
					//document.body.style.cursor = 'pointer';
					e.preventDefault();	
					
					alert(code);
				}  
				//methods.search(_jsInterface.country.dataset, code);			
	
			 },
			 
		
    	});
		
		
		
	map = $('#world-map').vectorMap('get', 'mapObject');		
		
		
	allCountries = getAllCountries(map);
	excludedCountries = getExcludedCountries();
	map.series.regions[0].setValues(myCustomColors);
	
		
});
