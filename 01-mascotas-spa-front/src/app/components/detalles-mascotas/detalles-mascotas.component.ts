import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../interfaces/mascota.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MASCOTAS } from '../../const/mascotas.const';

@Component({
  selector: 'app-detalles-mascotas',
  imports: [RouterLink],
  templateUrl: './detalles-mascotas.component.html'
})
export class DetallesMascotasComponent implements OnInit {

  mascota?: Mascota;
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascota = this.loadMascota(id)
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }

  loadMascota(id: string): Mascota {
    const mascota = MASCOTAS.find(m => m.id === parseInt(id));
    if (mascota) {
      return mascota
    }
    return {
      id: 0,
      nombre: '',
      tipo: '',
      edad: 0,
      descripcion: '',
      imagen: '',
      fechaCreacion: new Date,
      disponible: false
    }
  }

  irAFormulario() {
    this.router.navigate(['/adopcion', this.mascota ? this.mascota.id : ''])
  }

}
