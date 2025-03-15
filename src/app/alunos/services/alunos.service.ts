import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private apiUrl = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) { }

  getAlunos():Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAluno(aluno: Aluno):Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${aluno.id}`);
  }

  addAluno(aluno: Aluno):Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }


  deleteAluno(aluno: Aluno):Observable<any> {
    return this.http.delete(`${this.apiUrl}/${aluno.id}`);
  }

  updateAluno(aluno: Aluno):Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${aluno?.id}`, aluno);
  }


}
