import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public static connected: boolean = false;
  public static users: any[] = [
    {
      id: 0,
      username: 'ali',
      name: 'ali mansour',
      telephone: '51138031',
      email: 'mansour.tech.contact@gmail.com',
      password: 'a',
      adress: 'mahdia',
      age: 39,
      voitures: [
        {
          marque: 'Mercedes',
          immatriculation: '123tun145',
          couleur: 'rouge',
          places: 5,
          type: 'familial',
        },
      ],
      annonces: [
        {
          description: 'test',
          dateDepart: '2024-11-30',
          heureDepart: '15:45:30',
          dateArrivee: '2024-11-30',
          heureArrivee: '16:45:30',
          lieuDepart: 'Mahdia',
          lieuArrivee: 'Sousse',
          vehicule: {
            marque: 'Mercedes',
            immatriculation: '123tun145',
            couleur: 'rouge',
            places: 5,
            type: 'familial',
          },
          indexParticipants: [],
          prixParPlace: 12,
          allerRetour: true,
          animauxAutorises: true,
        },
      ],
    },
    {
      id: 1,
      username: 'john_doe',
      name: 'John Doe',
      telephone: '52228031',
      email: 'john.doe.contact@gmail.com',
      password: 'password123',
      adress: 'Tunis',
      age: 28,
      voitures: [
        {
          marque: 'Toyota',
          immatriculation: '456tun987',
          couleur: 'bleu',
          places: 4,
          type: 'compact',
        },
      ],
      annonces: [
        {
          description: 'Ride from Tunis to Sousse',
          dateDepart: '2024-12-05',
          heureDepart: '09:00:00',
          dateArrivee: '2024-12-05',
          heureArrivee: '11:00:00',
          lieuDepart: 'Tunis',
          lieuArrivee: 'Sousse',
          vehicule: {
            marque: 'Toyota',
            immatriculation: '456tun987',
            couleur: 'bleu',
            places: 4,
            type: 'compact',
          },
          indexParticipants: [],
          prixParPlace: 15,
          allerRetour: false,
          animauxAutorises: true,
        },
      ],
    },
  ];
  public static nb_users = 0;
  public static current_user_id: number;
  constructor() {}
}
