export const pokemonData = {
  trainers: [
    {
      trainer_id: 1,
      username: "AshKanto"
    }
  ],

  teams: [
    {
      team_id: 1,
      trainer_id: 1,
      team_name: "Elite Kanto Squad"
    }
  ],

  types: [
    { type_id: 1, type_name: "Grass" },
    { type_id: 2, type_name: "Poison" },
    { type_id: 3, type_name: "Fire" },
    { type_id: 4, type_name: "Flying" },
    { type_id: 5, type_name: "Water" },
    { type_id: 6, type_name: "Bug" },
    { type_id: 7, type_name: "Normal" },
    { type_id: 8, type_name: "Electric" },
    { type_id: 9, type_name: "Ground" },
    { type_id: 10, type_name: "Fairy" }
  ],

  pokemon: [
    {
      pokemon_id: 1,
      species_name: "Bulbasaur",
      base_hp: 45,
      base_attack: 49,
      base_defense: 49,
      base_speed: 45,
      primary_type_id: 1,
      secondary_type_id: 2,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },

    {
      pokemon_id: 2,
      species_name: "Ivysaur",
      base_hp: 60,
      base_attack: 62,
      base_defense: 63,
      base_speed: 60,
      primary_type_id: 1,
      secondary_type_id: 2,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
    },

    {
      pokemon_id: 3,
      species_name: "Charmander",
      base_hp: 39,
      base_attack: 52,
      base_defense: 43,
      base_speed: 65,
      primary_type_id: 3,
      secondary_type_id: null,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },

    {
      pokemon_id: 4,
      species_name: "Charizard",
      base_hp: 78,
      base_attack: 84,
      base_defense: 78,
      base_speed: 100,
      primary_type_id: 3,
      secondary_type_id: 4,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    },

    {
      pokemon_id: 5,
      species_name: "Squirtle",
      base_hp: 44,
      base_attack: 48,
      base_defense: 65,
      base_speed: 43,
      primary_type_id: 5,
      secondary_type_id: null,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },

    {
      pokemon_id: 6,
      species_name: "Butterfree",
      base_hp: 60,
      base_attack: 45,
      base_defense: 50,
      base_speed: 70,
      primary_type_id: 6,
      secondary_type_id: 4,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"
    },

    {
      pokemon_id: 7,
      species_name: "Pidgeot",
      base_hp: 83,
      base_attack: 80,
      base_defense: 75,
      base_speed: 101,
      primary_type_id: 7,
      secondary_type_id: 4,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png"
    },

    {
      pokemon_id: 8,
      species_name: "Pikachu",
      base_hp: 35,
      base_attack: 55,
      base_defense: 40,
      base_speed: 90,
      primary_type_id: 8,
      secondary_type_id: null,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },

    {
      pokemon_id: 9,
      species_name: "Sandshrew",
      base_hp: 50,
      base_attack: 75,
      base_defense: 85,
      base_speed: 40,
      primary_type_id: 9,
      secondary_type_id: null,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png"
    },

    {
      pokemon_id: 10,
      species_name: "Clefairy",
      base_hp: 70,
      base_attack: 45,
      base_defense: 48,
      base_speed: 35,
      primary_type_id: 10,
      secondary_type_id: null,
      image_url:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
    }
  ],

  team_members: [
    {
      team_member_id: 1,
      team_id: 1,
      pokemon_id: 4,
      member_nickname: "Blaze"
    },

    {
      team_member_id: 2,
      team_id: 1,
      pokemon_id: 8,
      member_nickname: "Sparky"
    },

    {
      team_member_id: 3,
      team_id: 1,
      pokemon_id: 5,
      member_nickname: "ShellShock"
    }
  ],

  type_chart: [
    {
      attacker_type_id: 3,
      defender_type_id: 1,
      damage_multiplier: 2.0
    },

    {
      attacker_type_id: 5,
      defender_type_id: 3,
      damage_multiplier: 2.0
    },

    {
      attacker_type_id: 8,
      defender_type_id: 5,
      damage_multiplier: 2.0
    },

    {
      attacker_type_id: 1,
      defender_type_id: 5,
      damage_multiplier: 2.0
    },

    {
      attacker_type_id: 9,
      defender_type_id: 8,
      damage_multiplier: 2.0
    }
  ]
}

export default pokemonData