// Preset criteria:

function Feature(name){							//class Feature only has a name
	this.name = name
};
function Plan(name, cost){ 						// class Plan has a name, cost, and array of object of class Feature called features
	this.name = name;
	this.cost = cost;
	this.features = [];
};
var allPlans = [];							//array of class Plans
var selectedFeatures = []; 						//array of user selected Features. Assume it is an array of strings and not the object itself.

// ALGORITHM

permutation = function(allPlans, selectedFeat){								// Function goes through all plans combinations. A, AB, ABC...C, CD...CDE...etc. 
	for (var i = 0; i < allPlans.length; i++) {							// If the plan contains user selected features, then it checks for if it's cheaper than previous. 
		var runner = i;										// If so, cheapest gets updated and cheapestCombo gets updated.
													// runner is used to end the while loop, i.e. if you are on index A, the while loop should end when you hit 'plan F'
		var planCombo = { 																
			plans: [],
			cost: 0,
			features: []
		};
		while(runner < allPlans.length){
			var selectedFeatCopy = selectedFeat.slice(0);  					//returns a true array copy, not by reference
			planCombo.plans = planCombo.plans.concat(allPlans[runner]);			// update plancombo as you run through the rest of the plans
			planCombo.features = planCombo.features.concat(allPlans[runner].features);
			planCombo.cost += allPlans[runner].cost;
			if(hasAllFeatures(planCombo.features, selectedFeatCopy)){			//for each combo, check that the combo contains all the features; i.e. returns true
				if(typeof cheapest === 'undefined'){					//if undefined set cheapest
					var cheapestCombo = JSON.parse(JSON.stringify(planCombo));			
					var cheapest = cheapestCombo.cost;
				}
				else {									//else check if plancombo's cost is cheaper than the cheapest known, if so update it.
					if(planCombo.cost < cheapest){	
						cheapestCombo = JSON.parse(JSON.stringify(planCombo));
						cheapest = cheapestCombo.cost;	
					}
				}		
			}
			runner++;
		}
	}
	if(typeof cheapest === 'undefined'){
		return null;
	}
	else {
		return cheapestCombo;
	}
};

hasAllFeatures = function(planComboFeat, selectedFeat){				// Keep track of feature length. As you run through the plan Combo features,
	var selectedFeatLength = selectedFeat.length;				// if you find any that match, then remove it from the array. 
	for (var i = 0; i < planComboFeat.length; i++) {
		for (var j = 0; j < selectedFeatLength; j++) {
			if(selectedFeat[j] == planComboFeat[i].name){
				selectedFeat.splice(j, 1);
				selectedFeatLength--;
			}
		}
	}
	if(selectedFeat.length == 0){						//if all feature requirements are met, return true. This combo has all the features
		return true;							//the user is looking for.
	}
	else {
		return false;
	}
};

// TESTS
var feat1 = new Feature('email');
var feat2 = new Feature('voice');
var feat3 = new Feature('archiving');
var feat4 = new Feature('help');
var planA = new Plan('A', 300);
var planB = new Plan('B', 400);
var planC = new Plan('C', 100);
var planD = new Plan('D', 50);
var planE = new Plan('E', 110);
var planF = new Plan('F', 120);
selectedFeatures = ['email', 'voice', 'archiving']; 	//predetermine the user selected features
planA.features = [feat1, feat2, feat3];			//check for a plan that is an exact match, but is more expensive than individual
planB.features = [feat1, feat2, feat3, feat4];		//check for a plan contains the exact match, plust one more
planC.features = [feat1];				//plan C, D, and E when combined are the cheapest.
planD.features = [feat2];							
planE.features = [feat3];							
planF.features = [feat4];				//check for a plan that contains no match
allPlans = [planA, planB, planC, planD,planE,planF];  		
permutation(allPlans, selectedFeatures);
