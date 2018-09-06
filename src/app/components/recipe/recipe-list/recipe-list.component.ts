import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Input() class: string; // if want to initiate with class value do get different result
  title: string;
  // interface
  selectedRecipe : Recipe;
  recipes : Recipe[];


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.http = http;
    this.baseUrl = baseUrl;
    console.log(baseUrl);
  }

  ngOnInit() {

    console.log("QuizListComponent " +
      " instantiated with the following class: "
      + this.class);

    var url = this.baseUrl + "api/recipes/";

    switch (this.class) {

      case "latest":
      default:
        this.title = "Latest recipes";
        url += "latest/";
        break;
      case "byTitle":
        this.title = "Recipes by Title";
        url += "title/";
        break;
      case "random":
        this.title = "Recipes in random order";
        url += "random/";
        break;
    }
    console.log(url);
    this.http.get<Recipe[]>(url).subscribe(result => {
        this.recipes = result;
        console.log(this.recipes);
    }, error => console.error(error));

  }

  onSelect(recipe : Recipe){
    this.selectedRecipe = recipe;

    // for debugging
    console.log('Recipe with Id '
      + this.selectedRecipe.Id 
      + ' has been selected');

    this.router.navigate(["recipe", this.selectedRecipe.Id]);  
  }

}
