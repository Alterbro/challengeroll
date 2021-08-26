const url = "https://api.atlasacademy.io/export/NA/basic_servant.json";
async function rollgacha() {
  const response = await fetch(url);
  const servants = await response.json();

  var selected_type = document.querySelector('input[name="rarity"]:checked');
  var roll_type = (selected_type === null) ? default_rarity : selected_type.value;
  var result = '';
  function* generateRandomRareServant(servants, min_rarity, max_rarity){
    var used_servants = [];
    while(true){
      var servant = servants[Math.floor(Math.random()*servants.length)];
      if(min_rarity <= servant.rarity && servant.rarity <= max_rarity && !used_servants.includes(servant.name))
      {
        used_servants.push(servant.name);
        yield '<p>Name: ' + servant.name + ', ' + servant.rarity + ' star, ' + servant.className + '</p>';
      }
    }
  }
  function rollServants(servants, min_rarity, max_rarity, len){
    var generator = generateRandomRareServant(servants, min_rarity, max_rarity);
    result = Array.from({length: len}, () => generator.next().value).join('');
    return result;
}
if (roll_type == 1) {
  result += rollServants(servants, 1, 3, 5);
} else if (roll_type == 2) {
  result += rollServants(servants, 1, 3, 4);
  result += rollServants(servants, 4, 4, 1);
} else if (roll_type == 3) {
  result += rollServants(servants, 1, 3, 3);
  result += rollServants(servants, 4, 4, 1);
  result += rollServants(servants, 5, 5, 1);
}
  document.getElementById("Bros, this code...").innerHTML = result;
}
document.getElementById('myButton').addEventListener('click', function(rollgacha) {
  rollgacha.preventDefault();
});
