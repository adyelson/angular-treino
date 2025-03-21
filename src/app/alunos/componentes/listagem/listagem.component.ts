import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaPipe } from '../../pipe/media.pipe';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Aluno } from '../../models/aluno';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, MediaPipe, ReactiveFormsModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css',
})
export class ListagemComponent {
  @Input() emEdicao: any;
  @Input() alunos: Aluno[] = [  ];
  @Output() alunoRemovido = new EventEmitter<number>();
  @Output() alunoEditado = new EventEmitter<number>();


  excluir(indice:number) {
    this.alunoRemovido.emit(indice);
  }

  editar(indice:number) {
    this.alunoEditado.emit(indice);
  }
}
