import { Component, OnInit } from '@angular/core';
import { AllumettesService } from './services/allumette.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Tableau d'allumettes
  allumettes: Array<number>;
  // Nombre d'allumette au début du jeu
  nbAllumettes: number;
  // retourne true si un des joueurs a jouer
  hasplayed = true;

  constructor(private allumettesService: AllumettesService, private toastr: ToastrService) { }

  ngOnInit() {
    // Le tableau d'allumette est alimenté suite à un observable
    this.allumettesService.loadAllumettes().subscribe(
      allumettes => {
        this.allumettes = allumettes;
        this.nbAllumettes = this.allumettes.length;
      }
    );
  }

  // Jouer successivement jusqu'a ce que la partie se termine et annonce le gagnant
  jouer(hasplayed: boolean, nbAllumetteRetire: number) {
    // Retire le nombre d'allumettes souhaité par le joueur.
    if (this.allumettes.length > nbAllumetteRetire) {
      this.allumettes.length = this.allumettes.length - nbAllumetteRetire;
    } else {
      this.allumettes.length = 0;
    }
    this.hasplayed = !this.hasplayed;

    // quand la partie est terminé on affiche une notif pour annoncer le gagnant et une nouvelle partie debute
    if (this.allumettes.length === 0) {
      this.toastr.success(' Le gagnant est "Le joueur "' + (this.hasplayed ? '2' : '1') + '!', 'Felicitations!');

      // nouvelle partie
      this.allumettesService.loadAllumettes().subscribe(
        allumettes => {
          this.allumettes = allumettes;
          this.nbAllumettes = this.allumettes.length;
        }
      );
    }
  }
}
