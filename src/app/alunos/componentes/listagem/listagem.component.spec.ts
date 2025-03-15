import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemComponent } from './listagem.component';
import { By } from '@angular/platform-browser';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let fixture: ComponentFixture<ListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit alunoRemovido when excluir() is called', () => {
    spyOn(component.alunoRemovido, 'emit');

    component.excluir(1);
    expect(component.alunoRemovido.emit).toHaveBeenCalledWith(1);
  });

  it('should emit alunoEditado when editar() is called', () => {
    spyOn(component.alunoEditado, 'emit');

    component.editar(2);
    expect(component.alunoEditado.emit).toHaveBeenCalledWith(2);
  });

  it('should render the correct number of rows in the table', () => {
    component.alunos = [
      {id:10, nome: 'Aluno 1', nota1: 8, nota2: 7 },
      {id:11, nome: 'Aluno 2', nota1: 6, nota2: 9 },
      {id:12, nome: 'Aluno 3', nota1: 6, nota2: 9 },
    ];
    fixture.detectChanges();

    const rowElements = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rowElements.length).toBe(3);
  });

  it('should render correct student data in table', () => {
    component.alunos = [{ id:10, nome: 'Aluno Teste', nota1: 9, nota2: 8 }];
    fixture.detectChanges();

    const row = fixture.debugElement.query(By.css('tbody tr'));
    const cells = row.queryAll(By.css('td'));

    expect(cells[1].nativeElement.textContent.trim()).toBe('Aluno Teste');
    expect(cells[2].nativeElement.textContent.trim()).toBe('9');
    expect(cells[3].nativeElement.textContent.trim()).toBe('8');
  });

  it('should disable buttons when emEdicao is true', () => {
    component.alunos = [{id:10, nome: 'Aluno Teste', nota1: 9, nota2: 8 }];
    component.emEdicao = true;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons.forEach((btn) => {
      expect(btn.nativeElement.disabled).toBeTruthy();
    });
  });




});
