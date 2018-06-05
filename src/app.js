  const currancyContainer = document.querySelector("#currancy-container");
  const searchInpt = document.querySelector("#my-search-input");
  const sortByRankBtn = document.querySelector("#sort-by-rank");
  const sortByNameBtn = document.querySelector("#sort-by-name");
  const sortByPriceBtn = document.querySelector("#sort-by-price");
  const myRank = document.querySelector("#myRank");
  const myPriceArrow = document.querySelector("#my-price-arrow");
  const myNameArrow = document.querySelector("#my-name-arrow");
  const searchBtn = document.querySelector("#search-btn");
  const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000';

  let coins = [];
  let rankUpDown = 'down';
  let nameUpDown = 'down';
  let priceUpDown = 'down';
  let lastAction = 'none';
  let filterValue;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      /* Get coin Elements */
      coins.push.apply(coins,myJson);
      displayCoins(coins);
  });

  
  /* ------------ My functions ------------------*/
  function displayCoins(coinsObjects){
    /* Clear the parent div */ 
    clearCoinsContainer(currancyContainer);

    coinsObjects.forEach(function(element) {
      /* Create coin elements */
      const coinElementDiv = document.createElement('div');
      coinElementDiv.className = "currancy-element";
      
      const img = document.createElement('img');
      img.src ='images/logo.png';

      const name = document.createElement('div');
      name.className ='nameDiv';
      name.innerText =element.name;
      
      const symbol = document.createElement('div');
      const symbolSpan1 = document.createElement('span');
      symbolSpan1.innerText ='Symbol: ';
      symbolSpan1.className ='label';
      const symbolSpan2 = document.createElement('span');
      symbolSpan2.innerText =element.symbol;
      symbol.appendChild(symbolSpan1); 
      symbol.appendChild(symbolSpan2);

      const rank = document.createElement('div');
      const rankSpan1 = document.createElement('span');
      rankSpan1.innerText ='Rank: ';
      rankSpan1.className ='label';
      const rankSpan2 = document.createElement('span');
      rankSpan2.innerText =element.rank;
      rank.appendChild(rankSpan1); 
      rank.appendChild(rankSpan2);

      const price_usd = document.createElement('div');
      const price_usdSpan1 = document.createElement('span');
      price_usdSpan1.innerText ='Price-USD: ';
      price_usdSpan1.className ='label';
      const price_usdSpan2 = document.createElement('span');
      price_usdSpan2.innerText =element.price_usd;
      price_usd.appendChild(price_usdSpan1); 
      price_usd.appendChild(price_usdSpan2);

      const price_btc = document.createElement('div');
      const price_btcSpan1 = document.createElement('span');
      price_btcSpan1.innerText ='Price-BTC: ';
      price_btcSpan1.className ='label';
      const price_btcSpan2 = document.createElement('span');
      price_btcSpan2.innerText =element.price_btc;
      price_btc.appendChild(price_btcSpan1); 
      price_btc.appendChild(price_btcSpan2);

      const percent_change_1h = document.createElement('div');
      const percent_change_1hpan1 = document.createElement('span');
      percent_change_1hpan1.innerText ='Change-1h(%): ';
      percent_change_1hpan1.className ='label';
      const percent_change_1hSpan2 = document.createElement('span');
      percent_change_1hSpan2.innerText =element.percent_change_1h;
      percent_change_1h.appendChild(percent_change_1hpan1); 
      percent_change_1h.appendChild(percent_change_1hSpan2);

      const percent_change_24h = document.createElement('div');
      const percent_change_24hSpan1 = document.createElement('span');
      percent_change_24hSpan1.innerText ='Change-24h(%): ';
      percent_change_24hSpan1.className ='label';
      const percent_change_24hSpan2 = document.createElement('span');
      percent_change_24hSpan2.innerText =element. percent_change_24h;
      percent_change_24h.appendChild(percent_change_24hSpan1); 
      percent_change_24h.appendChild(percent_change_24hSpan2);

      const percent_change_7d = document.createElement('div');
      const percent_change_7dSpan1 = document.createElement('span');
      percent_change_7dSpan1.innerText ='Change-7d(%): ';
      percent_change_7dSpan1.className ='label';
      const percent_change_7dSpan2 = document.createElement('span');
      percent_change_7dSpan2.innerText =element.percent_change_7d;
      percent_change_7d.appendChild(percent_change_7dSpan1); 
      percent_change_7d.appendChild(percent_change_7dSpan2);

      /* Append new coin Element */
      coinElementDiv.appendChild(img);
      coinElementDiv.appendChild(name);
      coinElementDiv.appendChild(rank);       
      coinElementDiv.appendChild(symbol);
      coinElementDiv.appendChild(price_usd);
      coinElementDiv.appendChild(price_btc);
      coinElementDiv.appendChild(percent_change_1h);
      coinElementDiv.appendChild(percent_change_24h);
      coinElementDiv.appendChild(percent_change_7d);

      currancyContainer.appendChild(coinElementDiv);
    });
  }
  
  const filteredCoins = function(exp){
    return  coins.filter(coin => (coin.name).toUpperCase().match((exp.toUpperCase())) != null);
  }

  const sortCoins = function(coins, sortType){
    //const myCoins = coins.slice(0);
    if(sortType === 'byRank'){
      if(rankUpDown === 'up'){  
        myRank.className = "fa fa-arrow-down";
        rankUpDown = 'down'; 
        return coins.sort((a, b) => Number(a.rank) - Number(b.rank)); 
      }
      else{
        myRank.className = "fa fa-arrow-up";
        rankUpDown = 'up'; 
        return coins.sort((a, b) => Number(b.rank) - Number(a.rank)); 
      }
    }
    else if(sortType === 'byName'){
      if(nameUpDown === 'up'){  
        myNameArrow.className = "fa fa-arrow-down";
        nameUpDown = 'down';
        return coins.sort(function (a, b) {
          if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
          else if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
          return 0;
        });
      }
      else{
        myNameArrow.className = "fa fa-arrow-up";
        nameUpDown = 'up';
        return coins.sort(function (a, b) {
          if (a.name.toUpperCase() > b.name.toUpperCase() ) return -1;
          else if (a.name.toUpperCase() < b.name.toUpperCase()) return 1;
          return 0;
        }); 
      }
    }
    else if(sortType === 'byPrice'){
      if(priceUpDown === 'up'){  
        myPriceArrow.className = "fa fa-arrow-down";
        priceUpDown = 'down'; 
        return coins.sort((a, b) => Number(a.price_usd) - Number(b.price_usd)); 
      }
      else{
        myPriceArrow.className = "fa fa-arrow-up";
        priceUpDown = 'up'; 
        return coins.sort((a, b) => Number(b.price_usd) - Number(a.price_usd)); 
      }
    }
}


/* Helper function to clear the child elements of the parent */
function clearCoinsContainer(parent){
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

/* My eventLisners */
searchInpt.addEventListener('input', e => {
  const exp = searchInpt.value;
  displayCoins(filteredCoins(e.target.value));
  lastAction = 'filter';
  filterValue = e.target.value;
});

sortByRankBtn.addEventListener('click', e => {
  if(lastAction === 'filter'){
    displayCoins(sortCoins(filteredCoins(filterValue), 'byRank'));
    lastAction = 'filter';
  }
  else {
    displayCoins(sortCoins(coins, 'byRank'));
    lastAction = 'sort';
  }
 });

sortByNameBtn.addEventListener('click', e => {
  if(lastAction === 'filter'){
    displayCoins(sortCoins(filteredCoins(filterValue), 'byName'));
    lastAction = 'filter';
  }
  else {
    displayCoins(sortCoins(coins, 'byName'));
    lastAction = 'sort';
  }
});
 
sortByPriceBtn.addEventListener('click', e => {
  if(lastAction === 'filter'){
    displayCoins(sortCoins(filteredCoins(filterValue), 'byPrice'));
    lastAction = 'filter';
  }
  else {
    displayCoins(sortCoins(coins, 'byPrice'));
    lastAction = 'sort';
  }
 });



  