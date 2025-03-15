import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaalunosComponent } from './mediaalunos.component';
import { Aluno } from '../../models/aluno';
import { By } from '@angular/platform-browser';
import { FormularioComponent } from '../formulario/formulario.component';
import { ListagemComponent } from '../listagem/listagem.component';

describe('MediaalunosComponent', () => {
  let component: MediaalunosComponent;
  let fixture: ComponentFixture<MediaalunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaalunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaalunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  ///testes


  it('deve criar um formulário com os campos nome, nota1 e nota2', () => {
    expect(component.form.contains('nome')).toBeTruthy();
    expect(component.form.contains('nota1')).toBeTruthy();
    expect(component.form.contains('nota2')).toBeTruthy();
  });

  it('deve ser obrigatório o campo nome', () => {
    const control = component.form.get('nome');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('deve ser obrigatório o campo nota1', () => {
    const control = component.form.get('nota1');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  } );

  it('deve ser obrigatório o campo nota2', () => {
    const control = component.form.get('nota2');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  } );

  it('deve ser válido o campo nome', () => {
    const control = component.form.get('nome');
    control?.setValue('João');
    expect(control?.valid).toBeTruthy();
  } );

  it('deve ser válido o campo nota1', () => {
    const control = component.form.get('nota1');
    control?.setValue(7);
    expect(control?.valid).toBeTruthy();
  } );

  it('deve ser válido o campo nota2', () => {
    const control = component.form.get('nota2');
    control?.setValue(8);
    expect(control?.valid).toBeTruthy();
  }   );

  it('deve adicionar um aluno', () => {
    component.form.setValue({ nome: 'Felix', nota1: 7, nota2: 8 });
    component.salvar(component.form.value as Aluno);
    expect(component.alunos.length).toBe(6);
  });
  it('deve atualziar nota1 do aluno novo', () => {
    component.form.setValue({ nome: 'Felix', nota1: 7, nota2: 8 });
    component.salvar(component.form.value as Aluno);
    component.emEdicao = true;
    component.indice = 5;
    component.form.setValue({ nome: 'Felix', nota1: 10, nota2: 8 });
    component.salvar(component.form.value as Aluno);
    expect(component.alunos[5].nota1).toBe(10);
  });
  it('deve excluir um aluno', () => {
    component.excluir(0);
    expect(component.alunos.length).toBe(4);
  });
  it('deve tornar emEdicao true', () => {
    component.editar(0);
    expect(component.emEdicao).toBe(true);
  });
  it('deve cancelar a edição de um aluno', () => {
    component.cancelar();
    expect(component.emEdicao).toBe(false);
    expect(component.indice).toBe(-1);
  });

  it('deve verificar se o aluno já está cadastrado', () => {
    spyOn(window, 'alert');
    component.form.setValue({ nome: 'João', nota1: 7, nota2: 8 });
    expect(component.checkDuplicate()).toBe(true);
    component.salvar(component.form.value as Aluno);
    expect(window.alert).toHaveBeenCalledWith('Aluno já cadastrado');
    expect(component.alunos.length).toBe(5);
  });

  it('deve verificar se o aluno não está cadastrado', () => {
    component.form.setValue({ nome: 'Felix', nota1: 7, nota2: 8 });
    expect(component.checkDuplicate()).toBe(false);
  });

  //talvez sejam desnecessários os testes abaixo:

  it('should call salvar() when FormularioComponent emits alunoAdicionado', () => {
    spyOn(component, 'salvar').and.callThrough();

    const formularioDebug = fixture.debugElement.query(By.directive(FormularioComponent));
    const formularioComponent = formularioDebug.componentInstance as FormularioComponent;

    const alunoMock: Aluno = { id:10, nome: 'Teste', nota1: 9, nota2: 10 };

    formularioComponent.alunoAdicionado.emit(alunoMock);
    fixture.detectChanges();

    expect(component.salvar).toHaveBeenCalledWith(alunoMock);
  });

  it('should call cancelar() when FormularioComponent emits cancelarEdicao', () => {
    spyOn(component, 'cancelar').and.callThrough();

    const formularioDebug = fixture.debugElement.query(By.directive(FormularioComponent));
    const formularioComponent = formularioDebug.componentInstance as FormularioComponent;

    formularioComponent.cancelarEdicao.emit();
    fixture.detectChanges();

    expect(component.cancelar).toHaveBeenCalled();
  });

  it('should call excluir() when ListagemComponent emits alunoRemovido', () => {
    spyOn(component, 'excluir').and.callThrough();

    const listagemDebug = fixture.debugElement.query(By.directive(ListagemComponent));
    const listagemComponent = listagemDebug.componentInstance as ListagemComponent;

    listagemComponent.alunoRemovido.emit(1);
    fixture.detectChanges();

    expect(component.excluir).toHaveBeenCalledWith(1);
  });

  it('should call editar() when ListagemComponent emits alunoEditado', () => {
    spyOn(component, 'editar').and.callThrough();

    const listagemDebug = fixture.debugElement.query(By.directive(ListagemComponent));
    const listagemComponent = listagemDebug.componentInstance as ListagemComponent;

    listagemComponent.alunoEditado.emit(2);
    fixture.detectChanges();

    expect(component.editar).toHaveBeenCalledWith(2);
  });

});
