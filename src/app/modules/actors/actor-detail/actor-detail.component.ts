import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import {Subscription } from 'rxjs';
import { ActorsService} from "./../../../core/services/actors.service"
import { Ator } from "./../../../core/models/ator.model"


@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit, OnDestroy{

  private httpRequest: Subscription
  Ator: Ator
  hasError: boolean = false

  constructor(
    private activatedRout: ActivatedRoute,
    private actorsService: ActorsService
  ) { }

  ngOnInit(): void {
    const actorName = this.activatedRout.snapshot.params['actorName'] 
    this.findActorByName(actorName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findActorByName(actorName: String): void {
    this.httpRequest = this.actorsService.findActorByName(actorName).subscribe(response => {
      this.Ator = response.body['data'] 
      console.log(this.Ator)     
      }, err => {
        this.hasError = true
      })
  }

}
