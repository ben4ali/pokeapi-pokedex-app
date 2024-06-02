import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../service/pokemon.service';
import { sharedPokemonService } from '../service/shared-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchName: string = '';
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService, private sharedService: sharedPokemonService) { }

  ngOnInit() {
    this.getPokemons();
    this.filteredPokemons = this.pokemons;
  }

  getPokemons(): void {
    this.pokemonService.getAllPokemon().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.filteredPokemons = pokemons;
    });
  }

  searchPokemon(name: string): void {
    if (!name) {
      this.getPokemons();
      return;
    }
    
    this.pokemonService.getPokemon(name.toLowerCase()).subscribe(pokemons => {
      this.pokemons = pokemons;
      this.filteredPokemons = pokemons;
      this.searchName = name;
    });
  }

  selectPokemon(pokemon: Pokemon): void {
    this.sharedService.selectPokemon(pokemon);
  }
}
