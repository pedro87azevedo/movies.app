import { Component, OnInit, Input } from '@angular/core';
import { Ator } from "./../../../core/models/ator.model"

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent implements OnInit {

  @Input() Ator: Ator

  constructor() { }

  ngOnInit(): void {
  }

  sliceSnyposis(value: String): String {
    return `${value.slice(0, 100)}...`
  }

}