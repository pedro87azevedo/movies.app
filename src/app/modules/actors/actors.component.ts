import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs"
import { Ator } from "./../../core/models/ator.model"
import { ActorsService } from "./../../core/services/movies.service"
import { MatDialog } from "@angular/material/dialog"
import { NewActorComponent } from "./new-movie/new-actor.component"

@Component({
  selector: 'app-actor',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Atores: Ator[]
  hasError: boolean = false

  constructor(
    private actorsService: ActorsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllActors()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllMovies(): void {
    this.httpRequest = this.actorsService.findAllMovies().subscribe(response => {
      this.Atores = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openNewMovieModal(): void {
    const dialogRef = this.dialog.open(NewActorComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newActorAdded => {
      if (newActorAdded) {
        this.Atores = undefined
        this.findAllActors()
      }
    })
  }

}