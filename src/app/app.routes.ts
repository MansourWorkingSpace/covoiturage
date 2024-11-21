import { Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { BgImageComponent } from './bg-image/bg-image.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RechercherAnnonceComponent } from './rechercher-annonce/rechercher-annonce.component';
import { PublierAnnonceComponent } from './publier-annonce/publier-annonce.component';
import { ProfilComponent } from './profil/profil.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';

export const routes: Routes = [
    {path : 'bg_image' , component : BgImageComponent},
    { path: '', redirectTo: '/bg_image', pathMatch: 'full' },
    {path : 'inscription' , component : InscriptionComponent},
    {path : 'connexion' , component : ConnexionComponent},
    {path : 'rechercher' , component : RechercherAnnonceComponent},
    {path : 'publier' , component : PublierAnnonceComponent},
    {path : 'profil' , component : ProfilComponent},
    {path: 'modifier_profil',component:ModifierProfilComponent}
];
