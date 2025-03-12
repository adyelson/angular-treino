import { Component } from '@angular/core';
import { MediaalunosComponent } from "./alunos/componentes/mediaalunos/mediaalunos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediaalunosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-certificado';
}
