import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from"@angular/material/dialog"
import { Subscription } from "rxjs"
import { Ator } from "./../../../core/models/ator.model"
import { ActorsService } from "./../../../core/services/actors.service"
import { MyToastrService } from "./../../../core/services/toastr.service"
import { MoviesService } from "./../../../core/services/movies.service"
import { ActorValidator} from "./../../../core/validators/ator.validator"
import { MovieValidator } from "./../../../core/validators/filme.validator"
import * as moment from "moment"

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
    private moviesService: MoviesService,
    private dialogRef: MatDialogRef<NewMovieComponent>,
    private actorValidator: ActorValidator,
    private movieValidator: MovieValidator 
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
      this.atores = response.body['atores']
      console.log(this.atores)
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
      nome: this.builder.control(null, [Validators.required], this.actorValidator.validatorUniqueActorName() ),
      imagem: this.builder.control(null),
      biografia: this.builder.control(null)
    })
  }

  initializeMovieFormGroup(): void {
    this.movieFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.movieValidator.validatorUniqueMoviesName()),
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
    this.setDateFormattedOnMovieForm(this.movieFormGroup.value['dataLancamento'])
    this.httpRequest = this.moviesService.createNewMovie(this.movieFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O filme ${response.body['data']['nome']} foi adicionado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      this.dialogRef.close(false)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

  setDateFormattedOnMovieForm(value: string): void{
    if(value){
      let dateFormatted: string = moment.utc(value).local().format('YYYY-MM-DD')
      this.movieFormGroup.controls['dataLancamento'].setValue(dateFormatted)
    }
  }

  actorNameExists(): boolean {
    return this.actorFormGroup.get('nome').hasError('actorNameExists')
  }

  movieNameExists(): boolean {
    return this.movieFormGroup.get('nome').hasError('movieNameExists')
  }

}
