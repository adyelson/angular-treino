import { Aluno } from './aluno';

describe('Aluno', () => {
  it('should create an instance', () => {
    expect(new Aluno('João', 7.5, 8.0)).toBeTruthy();
  });
});
