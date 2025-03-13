import { Component } from '@angular/core';
import { FormularioComponent } from "../formulario/formulario.component";
import { ListagemComponent } from '../listagem/listagem.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../../models/aluno';

@Component({
  selector: 'app-mediaalunos',
  standalone: true,
  imports: [ReactiveFormsModule, ListagemComponent, FormularioComponent],
  templateUrl: './mediaalunos.component.html',
  styleUrl: './mediaalunos.component.css'
})
export class MediaalunosComponent {

  arquivoDuplicado: Aluno[] = [];
  emEdicao = false;
  indice: number = -1;
  alunos: Aluno[] = [
    { nome: 'João', nota1: 7, nota2: 8 },
    { nome: 'Maria', nota1: 8, nota2: 9 },
    { nome: 'José', nota1: 5, nota2: 6 },
    { nome: 'Pedro', nota1: 3, nota2: 4 },
    { nome: 'Paulo', nota1: 9, nota2: 10 },
  ];

  form: FormGroup = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    nota1: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]),
    nota2: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ]),
  });

  salvar(aluno: Aluno) {
    if (this.emEdicao) {
      this.alunos[this.indice] = aluno;
      this.emEdicao = false;
    } else if (!this.checkDuplicate()) {
      this.alunos.push(aluno);
    } else {
      alert('Aluno já cadastrado');
      return;
    }
    this.form.reset();
  }

  excluir(indice: number) {
    this.alunos.splice(indice, 1);
  }

  editar(indice: number) {
    this.form.setValue(this.alunos[indice]);
    this.indice = indice;
    this.emEdicao = true;
  }

  cancelar() {
    this.form.reset();
    this.emEdicao = false;
    this.indice = -1;
  }

  checkDuplicate() {
    this.arquivoDuplicado = this.alunos.filter(
      (item) => item.nome.toLowerCase() === this.form.value.nome.toLowerCase()
    );
    if (this.arquivoDuplicado.length > 0) {
      return true;
    }
    return false;
  }
}
