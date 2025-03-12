import { Pipe, PipeTransform } from '@angular/core';
import { Aluno } from '../models/aluno';

@Pipe({
  name: 'media',
  standalone: true
})
export class MediaPipe implements PipeTransform {

  transform(aluno:any): number {
    return (aluno.nota1+aluno.nota2)/2;
  }

}
