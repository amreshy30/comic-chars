import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { CharactersComponent } from "./components/characters/characters.component";
import { CharacterComponent } from "./components/character/character.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "characters",
    children: [
      { path: "", component: CharactersComponent },
      { path: "character/:id", component: CharacterComponent },
    ],
  },
  { path: "*", redirectTo: "/home", pathMatch: "full" },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
