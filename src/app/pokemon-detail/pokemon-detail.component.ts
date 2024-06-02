import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../service/pokemon.service';
import { sharedPokemonService } from '../service/shared-pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  pokemon : Pokemon = new Pokemon();
  pokemonNumber : Number | undefined;
  constructor(private pokemonService : PokemonService, private sharedSerivce : sharedPokemonService) { }

  ngOnInit(): void {
    this.getPokemon('1');
    this.sharedSerivce.selectedPokemon$.subscribe(pokemon => {
      if (pokemon !== null) {
        this.pokemon = pokemon;
        this.pokemonNumber = pokemon.number;
      }
    });
  }
  getPokemon(name: string): void {
    this.pokemonService.getPokemon(name).subscribe(pokemons => {
      this.pokemon = pokemons[0];
      this.pokemonNumber = pokemons[0].number;
    });
  }

  getNextPokemon(): void {
    if (this.pokemonNumber as number + 1 <= 1025) { 
      this.getPokemon((this.pokemonNumber as number + 1).toString());
      this.pokemonNumber = (this.pokemonNumber as number + 1);
    }
  }
  getPreviousPokemon(): void {
    if (this.pokemonNumber as number - 1 >= 1) {
      this.getPokemon((this.pokemonNumber as number - 1).toString());
      this.pokemonNumber = (this.pokemonNumber as number - 1);
    }
  }

}
