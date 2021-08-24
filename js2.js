const url = "https://api.atlasacademy.io/export/NA/basic_servant.json";
async function gacharoll() {
    
    const response = await fetch(url);
    const servants = await response.json();
    

    
      function* generateRandomRareServant(servants, rarity){
      var used_servants = []
      while(true){
        var servant = servants[Math.floor(Math.random()*servants.length)];
        if(servant.rarity <= rarity && !used_servants.includes(servant.name))
        {
          used_servants.push(servant.name);
          yield 'Servant Name: ' + servant.name + ', ' + servant.rarity +' star' + '</br> ';
        }
      }
    }
    var generator = generateRandomRareServant(servants, 3);

    var result = Array.from({length: 5}, () => generator.next().value).join('');
    
    document.getElementById("Bros, this code...").innerHTML = result;
    console.log(result);
}
gacharoll();