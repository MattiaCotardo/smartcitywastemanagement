export interface Disposal {
  id?: string
  tipologia: string
  idCassonetto: string
  giorno: number
  mese: number
  anno: number
  peso: number
  emailCittadino: string|null
}
