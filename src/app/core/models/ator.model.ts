import { Filme } from "./filme.model";

export interface Ator {
    _id: String,
    nome: String,
    imagem?: String,
    idade?: Number,
    biografia: String,
    data_nascimento?: Date,
    nacionalidade?: String,
    filmes: Filme[]
}