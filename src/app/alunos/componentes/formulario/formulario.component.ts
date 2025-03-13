import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Aluno } from '../../models/aluno';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {

  @Input() emEdicao = false;
  @Input() indice: number = -1;
  @Input() alunos: Aluno[] = [];

  @Input() form: FormGroup = new FormGroup({});

      @Output() alunoAdicionado = new EventEmitter<Aluno>();
      @Output() cancelarEdicao = new EventEmitter<void>();

      salvar() {
          this.alunoAdicionado.emit(this.form.value as Aluno);
      }
      cancelar() {
        this.cancelarEdicao.emit();
      }
}
