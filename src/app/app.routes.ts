import { Routes } from '@angular/router';
import { MediaalunosComponent } from './alunos/componentes/mediaalunos/mediaalunos.component';

export const routes: Routes = [
  {
    path: '',
    component:MediaalunosComponent
  },
  { path: '**', redirectTo: ''}
];
