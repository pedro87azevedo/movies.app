import { Ator } from "./ator.model"

export interface Filme {
    _id: String
    nome: String
    imagem: String
    genero?: String
    sinopse?: String
    ano?: Number
    maior18?: Boolean
    ator?: Ator
}