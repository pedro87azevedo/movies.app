import { Filme } from "./filme.model"

export interface Ator {
    _id: String
    nome: String
    imagem?: String
    idade?: Number
    localidade?: String
    estado?: String
    cep?: Number
    filmes?: Filme[]

}