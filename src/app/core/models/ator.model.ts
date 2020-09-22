import { Filme } from "./filme.model"

export interface Ator {
    _id: String
    nome: String
    imagem?: String
    idade?: Number
    filmes?: Filme[]

}