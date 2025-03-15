import { Routes } from '@angular/router';
import { MediaalunosComponent } from './alunos/componentes/mediaalunos/mediaalunos.component';
import { FormularioComponent } from './alunos/componentes/formulario/formulario.component';
import { ListagemComponent } from './alunos/componentes/listagem/listagem.component';

export const routes: Routes = [
  {
    path: '',
    component:MediaalunosComponent
  },
  { path: '**', redirectTo: ''}
];
