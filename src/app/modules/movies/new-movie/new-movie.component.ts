import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { Subscription } from "rxjs"
import { Ator } from "./../../../core/models/ator.model"
import { ActorsService } from "./../../../core/services/actors.service"
import { MyToastrService } from "./../../../core/services/toastr.service"
import { MoviesService } from "./../../../core/services/movies.service"

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  actorFormGroup: FormGroup
  isNewActor: boolean = false
  atores: Ator[]
  stepActorLabel: String = 'Ator'
  movieFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private actorsService: ActorsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.findAllActors()
    this.initializeSelectActorFormGroup()
    this.initializeMovieFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllActors(): void {
    this.httpRequest = this.actorsService.findAllActors().subscribe(response => {
      this.atores = response.body['data']
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectActorFormGroup(): void {
    this.actorFormGroup = this.builder.group({
      ator: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewActorFormGroup(): void {
    this.actorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required]),
      imagem: this.builder.control(null),
      biografia: this.builder.control(null)
    })
  }

  initializeMovieFormGroup(): void {
    this.movieFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required]),
      genero: this.builder.control(null, [Validators.required]),
      imagem: this.builder.control(null, [Validators.required]),
      sinopse: this.builder.control(null, [Validators.required]),
      classificacaoIndicativa: this.builder.control(null),
      duracao: this.builder.control(null),
      dataLancamento: this.builder.control(null),
      ator: this.builder.control(null, [Validators.required])
    })
  }

  newActor(): void {
    this.isNewActor = !this.isNewActor
    this.initializeNewActorFormGroup()
  }

  selectActor(): void {
    this.isNewActor = !this.isNewActor
    this.findAllActors()
    this.initializeSelectActorFormGroup()
  }

  nextStep(): void {
    if (this.isNewActor) {
      this.createNewActor(this.actorFormGroup.value)
    } else {
      this.movieFormGroup.controls['ator'].setValue(this.actorFormGroup.value['ator']['_id'])
      this.stepActorLabel = `Ator: ${this.actorFormGroup.value['ator']['nome']}`
    }
  }

  createNewActor(formValueActor: Ator): void {
    this.httpRequest = this.actorsService.createNewActor(formValueActor).subscribe(response => {
      this.movieFormGroup.controls['ator'].setValue(response.body['data']['_id'])
      this.stepActorLabel = `Ator: ${response.body['data']['nome']}`
      this.toastr.showToastrSuccess(`O ator ${response.body['data']['nome']} foi adicionado com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

  createNewMovie(): void {
    this.httpRequest = this.moviesService.createNewMovie(this.movieFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O filme ${response.body['data']['nome']} foi adicionado com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

}