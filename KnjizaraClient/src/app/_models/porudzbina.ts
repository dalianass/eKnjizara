import { Book } from './book';
export interface Porudzbina {
  id: number;
  kolicinaKnjiga: number;
  ukupnoZaPlacanje: number;
  isFinished: boolean;
  appUserId?: number;
  knjige?: any;
}
