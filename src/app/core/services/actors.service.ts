  
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { Ator } from "./../models/ator.model"
import { API_URL } from "./../api"

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(
    private http: HttpClient
  ) { }

  findAllActors(): Observable<HttpResponse<Ator[]>> {
    return this.http.get<Ator[]>(`${API_URL}/atores/visualizarTodos`, { observe: 'response' })
  }

  createNewActor(body: Ator): Observable<HttpResponse<Ator>> {
    return this.http.post<Ator>(`${API_URL}/atores/criar`, body, { observe: 'response' })
  }

  validatorUniqueActorName(actorName: string){
    let myParams = new HttpParams()
    myParams = myParams.append('nome', actorName)
    return this.http.get<any>(`${API_URL}/atores/validarNomeAtor`, {params: myParams})
  }

  findActorByName(actorName: String): Observable<HttpResponse<Ator>> {
    return this.http.get<Ator>(`${API_URL}/atores/visualizarUm/${actorName}`, { observe: 'response' })
  }
}