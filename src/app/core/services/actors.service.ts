  
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http"
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
    return this.http.get<Ator[]>(`${API_URL}/ator/listarTodos`, { observe: 'response' })
  }

  createNewActor(body: Ator): Observable<HttpResponse<Ator>> {
    return this.http.post<Ator>(`${API_URL}/ator/criar`, body, { observe: 'response' })
  }
}