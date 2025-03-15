import { Component, OnInit } from '@angular/core';
import { FormularioComponent } from "../formulario/formulario.component";
import { ListagemComponent } from '../listagem/listagem.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../../models/aluno';
import { AlunosService } from '../../services/alunos.service';

@Component({
  selector: 'app-mediaalunos',
  standalone: true,
  imports: [ReactiveFormsModule, ListagemComponent, FormularioComponent],
  templateUrl: './mediaalunos.component.html',
  styleUrl: './mediaalunos.component.css'
})
export class MediaalunosComponent implements OnInit {

  arquivoDuplicado: Aluno[] = [];
  emEdicao = false;
  indice: number = -1;
  alunos: Aluno[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
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


  constructor(private alunoService: AlunosService) { }

  ngOnInit(): void {
    this.refresh();
  }



  //métodos

  refresh() {
    this.alunoService.getAlunos().subscribe(data => {
      this.alunos = data;
    });
  }

  salvar(aluno: Aluno) {
    if (this.emEdicao) {
      this.alunoService.updateAluno(aluno).subscribe(() => {
        this.refresh();
      });
      this.emEdicao = false;
    } else if (!this.checkDuplicate()) {
      // Remova o ID para evitar problemas no JSON Server
      const { id, ...alunoSemId } = aluno;
      this.alunoService.addAluno(alunoSemId).subscribe(() => {
        this.refresh();
      });
    } else {
      alert('Aluno já cadastrado');
      return;
    }

    this.form.reset();
  }

  excluir(aluno: Aluno) {
    this.alunoService.deleteAluno(aluno).subscribe(() => {
      this.refresh();
    });
  }

  editar(aluno: Aluno) {
    this.emEdicao = true;
    this.alunoService.getAluno(aluno).subscribe(
      data => {
        this.form.setValue(data);
        this.refresh();
      }
    );
  }

  cancelar() {
    this.form.reset();
    this.emEdicao = false;

  }

  checkDuplicate() {
    const nome = this.form.value.nome?.trim().toLowerCase();
    return this.alunos.some(aluno => aluno.nome.toLowerCase() === nome);
  }
}
