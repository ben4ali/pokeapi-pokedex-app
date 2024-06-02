// shared/pokemon.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class sharedPokemonService {
  private selectedPokemonSubject = new BehaviorSubject<Pokemon | null>(null);
  selectedPokemon$ = this.selectedPokemonSubject.asObservable();

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemonSubject.next(pokemon);
  }
}
