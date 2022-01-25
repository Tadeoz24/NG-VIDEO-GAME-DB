import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'search/:game-search',
    component: HomeComponent,
  },

  /*ახალი Route - Details კომპონენტისთვის (:id - რომელსაც ჩვენ ვაგზავნით Home Page-დან და ჩვენ ვიჭერთ
  იმ თამაშის id-ს, რომელსაც გამოვიყენებთ ჩვენი თამაშის დეტალების საჩვენებლად)*/

  /* New Route for Details Component.(id: which we are sending from our home page) and we are catching that id
   of the game which, we will be using for showing the details of our game */
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
