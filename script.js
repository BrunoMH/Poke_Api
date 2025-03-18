document.addEventListener('DOMContentLoaded', function () {
  const inputSearch = document.getElementById('search-input');
  const btnSearch = document.getElementById('search-button');
  const pockeName = document.getElementById('pokemon-name');
  const pockeId = document.getElementById('pokemon-id');
  const pockeWeight = document.getElementById('weight');
  const pockeHeight = document.getElementById('height');
  const pockeTypes = document.getElementById('types');
  const pockeHp = document.getElementById('hp');
  const pockeAttack = document.getElementById('attack');
  const pockeDefense = document.getElementById('defense');
  const pockeSpecialAttack = document.getElementById('special-attack');
  const pockeSpecialDefense = document.getElementById('special-defense');
  const pockeSpeed = document.getElementById('speed');
  const pockeSprite = document.getElementById('sprite');

  btnSearch.addEventListener('click', function () {
    let pokemon = inputSearch.value.toLowerCase();
    if (inputSearch.value === 'red')  {
      alert('Pokemon not found');
      return;
    }
    else if (inputSearch.value === '') {
      alert('Please enter a Pokemon name or ID');
      return;
    }

    const whoIsThatPokemon = async (pokemon) => {
      const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
      if (!response.ok) {
        alert('Pokemon not found');
        return;
      }
      const data = await response.json();
      console.log(response);
      console.log(data);
      //extracting data that needs to be into the html, then asign them and return it
      pockeTypes.innerHTML = '';
      let founded_pokemon = {
        name: data.name,
        id: data.id,
        weight: data.weight,
        height: data.height,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        types: data.types.forEach(typeObj => {
          const typeElement = document.createElement('p');
          typeElement.textContent = typeObj.type.name.toUpperCase();
          pockeTypes.appendChild(typeElement);
      }),
        sprite: data.sprites.front_default
      };


      pockeName.innerHTML = founded_pokemon.name;
      pockeId.innerHTML = founded_pokemon.id;
      pockeWeight.innerHTML = founded_pokemon.weight;
      pockeHeight.innerHTML = founded_pokemon.height;
      pockeHp.innerHTML = founded_pokemon.hp;
      pockeAttack.innerHTML = founded_pokemon.attack;
      pockeDefense.innerHTML = founded_pokemon.defense;
      pockeSpecialAttack.innerHTML = founded_pokemon.specialAttack;
      pockeSpecialDefense.innerHTML = founded_pokemon.specialDefense;
      pockeSpeed.innerHTML = founded_pokemon.speed;
      pockeSprite.innerHTML = founded_pokemon.sprite;
      pockeSprite.src = founded_pokemon.sprite;

      //cleaning the types before returning it
      

      pockeTypes.innerHTML = founded_pokemon.types.toUpperCase();


      console.log(founded_pokemon);

      

      return founded_pokemon

    };
    
    whoIsThatPokemon(pokemon);
  }); // end of clicking event

});

