import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({nome: new FormControl('', [
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

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });



  ////

  it('should emit alunoAdicionado when salvar() is called', () => {
    spyOn(component.alunoAdicionado, 'emit');

    component.form.setValue({ id:10, nome: 'Teste', nota1: 8, nota2: 7 });
    component.salvar();

    expect(component.alunoAdicionado.emit).toHaveBeenCalledWith({id:10, nome: 'Teste', nota1: 8, nota2: 7 });
  });

  it('should emit cancelarEdicao when cancelar() is called', () => {
    spyOn(component.cancelarEdicao, 'emit');

    component.cancelar();

    expect(component.cancelarEdicao.emit).toHaveBeenCalled();
  });
});
