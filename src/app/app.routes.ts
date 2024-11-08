import { Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { BgImageComponent } from './bg-image/bg-image.component';
import { ConnexionComponent } from './connexion/connexion.component';

export const routes: Routes = [
    {path : 'bg_image' , component : BgImageComponent},
    { path: '', redirectTo: '/bg_image', pathMatch: 'full' },
    {path : 'inscription' , component : InscriptionComponent},
    {path : 'connexion' , component : ConnexionComponent},
];
