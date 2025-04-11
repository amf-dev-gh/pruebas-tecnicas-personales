import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../interfaces/mascota.interface';
import { MascotaComponent } from '../mascota/mascota.component';
import { CommonModule } from '@angular/common';
import { MASCOTAS } from '../../const/mascotas.const';

@Component({
  selector: 'app-mascotas-list',
  imports: [MascotaComponent, CommonModule],
  templateUrl: './mascotas-list.component.html'
})
export class MascotasListComponent implements OnInit {

  mascotas: Mascota[] = MASCOTAS;
  loading: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  }

}
