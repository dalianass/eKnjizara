export interface Book {
  id: number;
  cena: number;
  naslov: string;
  izdavac: string;
  godinaIzdanja: number;
  kolicinaUMagacinu: number;
  autor: string;
  photoUrl?: any; //treba da se promeni u photos[], tako je u api
  about: string;
}
