const url = "https://api.atlasacademy.io/export/NA/basic_servant.json";
async function rollgacha() {
    const response = await fetch(url);
    const servants = await response.json();
    var default_rarity = 3
    var selected_rarity = document.querySelector('input[name="rarity"]:checked');
    var rarity = (selected_rarity === null) ? default_rarity : selected_rarity.value;
      function* generateRandomRareServant(servants, rarity){
      var used_servants = []
      while(true){
        var servant = servants[Math.floor(Math.random()*servants.length)];
        if(servant.rarity <= rarity && !used_servants.includes(servant.name))
        {
          used_servants.push(servant.name);
          yield 'Name: ' + servant.name + ', ' + servant.rarity + ' star' + '</br>'+'</br>';
        }
      }
    }
    var generator = generateRandomRareServant(servants, rarity);
    var result = Array.from({length: 5}, () => generator.next().value).join('');
    document.getElementById("Bros, this code...").innerHTML = result;
}
document.getElementById('myButton').addEventListener('click', function(rollgacha) {
    rollgacha.preventDefault();
  });