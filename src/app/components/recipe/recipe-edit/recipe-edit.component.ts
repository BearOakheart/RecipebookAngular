import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Route } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  title: string; // page title
  recipe: Recipe; // actual content
  form: FormGroup; // form
  editMode: boolean; // editMode if true, edit else create

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder, @Inject('BASE_URL') private baseUrl: string) {
    this.recipe = <Recipe>{};

    this.createForm();

    var id = this.activatedRoute.snapshot.params["id"];

    if (id) {
      this.editMode = true;

      var url = this.baseUrl + "api/recipes/" + id;

      this.http.get<Recipe>(url).subscribe(
        result => {
          this.recipe = result;
          this.title = "Edit - " + this.recipe.Title;

          this.updateForm();
        },
        error => {
          console.log(error)
        }
      );
    }

  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      Description: '',
      Instructions: ''
    })
  }

  updateForm(){
    this.form.setValue({
      Title: this.recipe.Title,
      Description : this.recipe.Description || '',
      Instructions : this.recipe.Instructions || ''
    })
  }

  onSubmit() {

    //build a temporary quiz object from values
    var tempRecipe = <Recipe>{};

    tempRecipe.Title = this.form.value.Title;
    tempRecipe.Description = this.form.value.Description;
    tempRecipe.Instructions = this.form.value.Instructions;

    var url = this.baseUrl + "api/recipe";

    if (this.editMode) {

        // do not forget to set the tempRecipe id,
        // otherwise the EDIT would fail.

        tempRecipe.Id = this.recipe.Id;

        this.http
            .put<Recipe>(url, tempRecipe)
            .subscribe(result => {
                var v = result;
                console.log("Recipe " + v.Id + " has been updated.");
                this.router.navigate(["home"]);
            }, error => console.log(error));
    }
    else {
        this.http
            .post<Recipe>(url, tempRecipe)
            .subscribe(result => {
                var v = result;
                console.log("Recipe " + v.Id + " has been created.");
                this.router.navigate(["home"]);
            }, error => console.log(error));
    }
}

getFormControl(name: string) {
    return this.form.get(name);
}

isValid(name: string) {
    var e = this.getFormControl(name);
    return e && e.valid;
}

isChanged(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
}

hasError(name: string) {
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
}

onBack() {
    this.router.navigate(["home"]);
}

}
