import { Component, OnInit } from '@angular/core';

import { ComicVineService } from '../../services/comic-vine.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters = [];

  constructor(private comicService: ComicVineService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  ngOnDestroy(): void {
    this.getCharacters().unsubscribe();
  }

  getCharacters(): Subscription {
    return this.comicService.getCharacters(3)
      .subscribe(
        data => this.characters = data.results as Array<any>,
        (err: Error) => console.error(err)
      )
  }
}
