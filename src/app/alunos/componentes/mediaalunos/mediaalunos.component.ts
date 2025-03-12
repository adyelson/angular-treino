import { Component } from '@angular/core';
import { FormularioComponent } from "../formulario/formulario.component";
import { ListagemComponent } from '../listagem/listagem.component';

@Component({
  selector: 'app-mediaalunos',
  standalone: true,
  imports: [FormularioComponent, ListagemComponent],
  templateUrl: './mediaalunos.component.html',
  styleUrl: './mediaalunos.component.css'
})
export class MediaalunosComponent {

}
