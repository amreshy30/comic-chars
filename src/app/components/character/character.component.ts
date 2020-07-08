import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComicVineService } from '../../services/comic-vine.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  id: string;

  character;

  constructor(private comicService: ComicVineService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCharacter();
  }

  ngOnDestroy(): void {
    this.getCharacter().unsubscribe();
  }

  getCharacter(): Subscription {
    return this.comicService.getCharacter(this.id)
      .subscribe(
        data => this.character = data.results,
        (err: Error) => console.error(err)
      );
  }

}
