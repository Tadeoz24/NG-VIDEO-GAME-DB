import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Home Component Route with default path
  //Home Component Route ნაგულისხმევი გზით
  {
    path: '',
    component: HomeComponent,
  },

  //All of out searches to land on this page
  //ყველა ძიება რომ შესაბამის გვერდზე გადავიდეს
  {
    path: 'search/:game-search',
    component: HomeComponent,
  },

  /*

  New Route for Details Component.(id: which we are sending from our home page) and we are catching that id
   of the game which, we will be using for showing the details of our game

  */

  /*

  ახალი Route - Details კომპონენტისთვის (:id - რომელსაც ჩვენ ვაგზავნით Home Page-დან და ჩვენ ვიჭერთ
  იმ თამაშის id-ს, რომელსაც გამოვიყენებთ ჩვენი თამაშის დეტალების საჩვენებლად)

  */

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
