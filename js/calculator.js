//////////////// PRICING CALCULATOR ////////////////
var base_prices = new Array();
base_prices["head"]=3000;
base_prices["partial"]=3600;
base_prices["partial-full"]=4200;
base_prices["fullsuit"]=7700;

var fur_prices = new Array();
fur_prices["fur1"]=0;
fur_prices["fur3"]=55;
fur_prices["fur4"]=110;
fur_prices["fur5"]=165;
fur_prices["fur6"]=220;

var mochi_prices = new Array();
mochi_prices["mochi1"]=0;
mochi_prices["mochi3"]=55;
mochi_prices["mochi4"]=110;
mochi_prices["mochi5"]=165;
mochi_prices["mochi6"]=220;

var head_addon_prices = new Array();
head_addon_prices["fan"] = 75;
head_addon_prices["eyelids"] = 50;
head_addon_prices["tongues"] = 30;
head_addon_prices["teeth"] = 30;
head_addon_prices["bangs"] = 50;
head_addon_prices["mohawk"] = 100;
head_addon_prices["hair"] = 150;
head_addon_prices["piercings"] = 50;
head_addon_prices["horns"] = 50;
head_addon_prices["antlers"] = 250;

var partial_addon_prices = new Array();
partial_addon_prices["handpaw-claws"] = 50;
// partial_addon_prices["feetpaws"] = 600;
// partial_addon_prices["sockpaws"] = 600;
// partial_addon_prices["feetpaw-claws"] = 50;
partial_addon_prices["tail-nub"] = 0;
partial_addon_prices["tail-curly"] = 150;
partial_addon_prices["tail-feline"] = 150;
partial_addon_prices["tail-floor"] = 250;
partial_addon_prices["tail-articulated"] = 600;

var partial_full_addon_prices = new Array();
partial_full_addon_prices["feetpaws"] = 600;
partial_full_addon_prices["sockpaws"] = 600;
partial_full_addon_prices["feetpaw-claws"] = 50;
partial_full_addon_prices["tail-nub"] = 0;
partial_full_addon_prices["tail-curly"] = 150;
partial_full_addon_prices["tail-feline"] = 150;
partial_full_addon_prices["tail-floor"] = 250;
partial_full_addon_prices["tail-articulated"] = 600;

var fullsuit_addon_prices = new Array();
fullsuit_addon_prices["wings-small"] = 400;
fullsuit_addon_prices["spikes"] = 200;
fullsuit_addon_prices["hidden-pocket"] = 50;
fullsuit_addon_prices["handpaw-claws"] = 50;
fullsuit_addon_prices["feetpaw-claws"] = 50;
// fullsuit_addon_prices["feetpaw-indoor"] = 600;
fullsuit_addon_prices["tail-nub"] = 0;
fullsuit_addon_prices["tail-curly"] = 150;
fullsuit_addon_prices["tail-feline"] = 150;
fullsuit_addon_prices["tail-floor"] = 250;
fullsuit_addon_prices["tail-articulated"] = 600;

var complexity_prices = new Array();
complexity_prices["Simple"] = 1;
complexity_prices["Moderate"] = 1.1;
complexity_prices["Complex"] = 1.3;
complexity_prices["Very Complex"] = 1.5;

// BASE PRICING
function getBasePrice()
{
    var basePrice=0;
    var theForm = document.forms["calculator"];
    var selectedBase = theForm.elements["commType"];
    basePrice = base_prices[selectedBase.value];

    return basePrice;
}

// FUR PRICING
function getFurPrice()
{
    var furPrice=0;
    var theForm = document.forms["calculator"];
    var selectedBase = theForm.elements["furColors"];
    furPrice = fur_prices[selectedBase.value];

    return furPrice;
}

// MOCHI PRICING
function getMochiPrice()
{
    var mochiPrice=0;
    var theForm = document.forms["calculator"];
    var selectedBase = theForm.elements["mochiColors"];
    mochiPrice = mochi_prices[selectedBase.value];

    return mochiPrice;
}

// DESIGN COMPLEXITY
function getComplexityPrice()
{
    var complexityPrice=0;
    var theForm = document.forms["calculator"];
    var complexity = theForm.elements["complexity"];

    for(var i = 0; i < complexity.length; i++)
    {
        if(complexity[i].checked)
        {
            complexityPrice = complexity_prices[complexity[i].value];
            break;
        }
    }

    return complexityPrice;
}

// ADD-ONS
function getAddonsPrice() {
    var commDrop = document.getElementById("commType");
    var selectedValue = commDrop.options[commDrop.selectedIndex].value;
   
    var addonsCost = 0;
    var theForm = document.forms["calculator"];
	var headAddons = theForm.elements["head-addons"];
    var partialAddons = theForm.elements["partial-addons"];
    var partialFullAddons = theForm.elements["partial-full-addons"];
    var fullsuitAddons = theForm.elements["fullsuit-addons"];

    const expr = selectedValue;

    // Calculate head addons
    for (var i = 0; i < headAddons.length; i++) {
        if (headAddons[i].checked) {
            addonsCost = addonsCost + head_addon_prices[headAddons[i].value];
        }
    };
        
    // Calculate partial or fullsuit addons
    switch (expr) {
    case 'partial':
        for (var i = 0; i < partialAddons.length; i++) {
            if (partialAddons[i].checked) {
                addonsCost = addonsCost + partial_addon_prices[partialAddons[i].value];
            }
        };
    break;
    case 'partial-full':
    for (var i = 0; i < partialFullAddons.length; i++) {
        if (partialFullAddons[i].checked) {
            addonsCost = addonsCost + partial_full_addon_prices[partialFullAddons[i].value];
        }
    };
    break;
    case 'fullsuit':
        for (var i = 0; i < fullsuitAddons.length; i++) {
            if (fullsuitAddons[i].checked) {
                addonsCost = addonsCost + fullsuit_addon_prices[fullsuitAddons[i].value];
            }
        }
    break;
    };

    return addonsCost;
}

// TOTAL CALCULATION
function calculateTotal()
{
    var addComplexity = Math.round(getBasePrice()*getComplexityPrice());
    var totalPrice = addComplexity + getFurPrice() + getMochiPrice() + getAddonsPrice();

    document.getElementById('totalPrice').innerHTML =
        "$"+totalPrice;
}

// CHANGE COMMISSION TYPE 
// Show or hide head/partial/fullsuit options, and clear when necessary
function changeType()
{
    var commDrop = document.getElementById("commType");
    var selectedValue = commDrop.options[commDrop.selectedIndex].value;
        
    const expr = selectedValue;
    switch (expr) {
    case 'head':
        document.getElementById('head').style.display = 'block';
        document.getElementById('partial').style.display = 'none';
        document.getElementById('feetpaws-partial').style.display = 'none';
        document.getElementById('tail-partial').style.display = 'none';
        document.getElementById('partial-full').style.display = 'none';
        document.getElementById('tail-partial-full').style.display = 'none';
        document.getElementById('tail-fullsuit').style.display = 'none';
        document.getElementById('fullsuit').style.display = 'none';
        break;
    case 'partial':
        document.getElementById('head').style.display = 'block';
        document.getElementById('partial').style.display = 'block';
        document.getElementById('tail-partial').style.display = 'block';
        document.getElementById('partial-full').style.display = 'none';
        document.getElementById('tail-partial-full').style.display = 'none';
        document.getElementById('feetpaws-partial').style.display = 'none';
        document.getElementById('tail-fullsuit').style.display = 'none';
        document.getElementById('fullsuit').style.display = 'none';
        break;
    case 'partial-full':
        document.getElementById('head').style.display = 'block';
        document.getElementById('partial').style.display = 'none';
        document.getElementById('feetpaws-partial').style.display = 'block';
        document.getElementById('tail-partial').style.display = 'none';
        document.getElementById('partial-full').style.display = 'block';
        document.getElementById('tail-partial-full').style.display = 'block';
        document.getElementById('tail-fullsuit').style.display = 'none';
        document.getElementById('fullsuit').style.display = 'none';
        break;
    case 'fullsuit':
        document.getElementById('head').style.display = 'block';
        document.getElementById('feetpaws-partial').style.display = 'none';
        document.getElementById('partial').style.display = 'none';
        document.getElementById('tail-partial').style.display = 'none';
        document.getElementById('partial-full').style.display = 'none';
        document.getElementById('tail-partial-full').style.display = 'none';
        document.getElementById('tail-fullsuit').style.display = 'block';
        document.getElementById('fullsuit').style.display = 'block';
        break;
    default:
        console.log('Hi c:');
    }
}

changeType();


