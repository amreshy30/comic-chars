import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ComicVineService {
  private key = "22aaff9644e6d1db44d127c8808a00097edd540c";
  private URL = "https://comicvine.gamespot.com/api";
  private format = "&format=json";

  constructor(private http: HttpClient) {}

  getCharacters(quantity: number): Observable<any> {
    return this.http
      .get(
        this.URL +
          `/characters/` +
          `?api_key=${this.key}` +
          `&limit=${quantity}` +
          this.format
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getCharacter(id: string): Observable<any> {
    return this.http
      .get(
        this.URL + `/character/${id}/` + `?api_key=${this.key}` + this.format
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error ocurred:", error.message);
    } else {
      console.error(error);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
