import { BrowserModule } from '@angular/platform-browser'; // figure this out
import { NgModule } from '@angular/core'; // import angular Ng Module
import { RouterModule } from '@angular/router'; // import router
import {CommonModule} from '@angular/common'; // figure out this
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; // for service interceptors
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// own components
import {AppComponent} from './components/app/app.component';
import {NavComponent} from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ReviewComponent } from './components/review/review.component';
import { UserComponent } from './components/user/user.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PagenotfoundComponent,
    RecipeComponent,
    ReviewComponent,
    UserComponent,
    RecipeListComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'home', component:HomeComponent},
      {path: 'recipe', component:RecipeComponent},
      { path: '**', component: PagenotfoundComponent }
    ])
  ],
  providers: [{provide: 'BASE_URL', useFactory:getBaseUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}