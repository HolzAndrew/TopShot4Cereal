const checkElement = async selector => {
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  }
  return document.querySelector(selector); 
};  

function extractData(nodeList) {
  for (i = 1; i < nodeList.length; i++ ) {
    value = nodeList[i].value;
    innerHTML = nodeList[i].innerHTML;
    splitString = innerHTML.split('$');
    splitAgain = splitString[1].split(' ');
    price = parseFloat(splitAgain[0]) * 1000;
    DPC = calcDollarPerCereal(value, price);
    appendDPC(nodeList[i], DPC);
  }
  console.log('IM SUPER CEREAL!');
}

function calcDollarPerCereal (value, price) {
  const dollarPerCereal = (price/value).toFixed(2);
  return dollarPerCereal;
}

function appendDPC (node, DPC) {
 node.innerHTML += ' Dollar Per Cereal: $' + DPC;
}

function init() {
  checkElement('#moment-detailed-serialNumber').then((selector) => {
    const listingParentElement = document.getElementById('moment-detailed-serialNumber');
    const listingsNodes = listingParentElement.childNodes;
    extractData(listingsNodes);
  });
};

init();