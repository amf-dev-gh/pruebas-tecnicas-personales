import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { MascotasListComponent } from './components/mascotas-list/mascotas-list.component';
import { DetallesMascotasComponent } from './components/detalles-mascotas/detalles-mascotas.component'

export const routes: Routes = [
  {path:"", component: MascotasListComponent},
  {path:"mascotas", component: MascotasListComponent},
  {path: 'mascota/:id', component: DetallesMascotasComponent},
  {path:"quienes-somos", component: QuienesSomosComponent},
  {path:"**", component: MascotasListComponent}
];
