import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AllumettesService {

    constructor() { }

    // retourne un tableau de 10 à 20  allumettes pour jouer.
    loadAllumettes(): Observable<Array<number>> {
        const min = Math.ceil(10);
        const max = Math.floor(20);
        const nbAllumettes = Math.floor(Math.random() * (max - min + 1)) + min;
        return of(Array(nbAllumettes));
    }
}
