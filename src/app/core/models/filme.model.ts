import { Ator } from "./ator.model"

export interface Filme {
    _id: String,
    nome: String,
    genero: String,
    classificacaoIndicativa?: String,
    dataLancamento?: Date,
    duracao?: String,
    imagem: String,
    sinopse: String,
    ator: Ator
}