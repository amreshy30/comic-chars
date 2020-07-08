import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ComicVineService } from "../../services/comic-vine.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.css"],
})
export class CharactersComponent implements OnInit {
  characters = [];
  currentP = 1;

  constructor(
    private comicService: ComicVineService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  ngOnDestroy(): void {
    this.getCharacters().unsubscribe();
  }

  getCharacters(): Subscription {
    return this.comicService.getCharacters(100).subscribe(
      (data) => (this.characters = data.results),
      (err: Error) => console.error(err)
    );
  }

  toCharacter(char): void {
    const id = this.getId(char.site_detail_url);
    console.log(id);
    this.router.navigate(["character", id], { relativeTo: this.route });
  }

  getId(value: string): string {
    const fragments = value.split("/");
    return fragments[fragments.length - 2]; // id
  }
}
