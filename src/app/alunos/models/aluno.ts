export class Aluno {
  id?: number;
  nome: string;
  nota1: number;
  nota2: number;

  constructor(id:number, nome: string, nota1: number, nota2: number) {
    this.id = id;
    this.nome = nome;
    this.nota1 = nota1;
    this.nota2 = nota2;
  }
}

