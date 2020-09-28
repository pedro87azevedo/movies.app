import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { MatDialogRef } from"@angular/material/dialog"
import { Subscription } from "rxjs"
import { Filme } from "./../../../core/models/filme.model"
import { MoviesService } from "./../../../core/services/movies.service"
import { MyToastrService } from "./../../../core/services/toastr.service"
import { ActorsService } from "./../../../core/services/actors.service"
import { ActorValidator} from "./../../../core/validators/ator.validator"
import { MovieValidator } from "./../../../core/validators/filme.validator"
import * as moment from "moment"

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrls: ['./new-actor.component.css']
})
export class NewActorComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  movieFormGroup: FormGroup
  isNewActor: boolean = false
  filmes: Filme[]
  stepActorLabel: String = 'Filme'
  actorFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private moviesService: MoviesService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private actorsService: ActorsService,
    private dialogRef: MatDialogRef<NewActorComponent>,
    private actorValidator: ActorValidator,
    private movieValidator: MovieValidator 
  ) { }

  ngOnInit(): void {
    this.findAllMovies()   
    this.initializeActorFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllMovies(): void {
    this.httpRequest = this.moviesService.findAllMovies().subscribe(response => {
      this.filmes = response.body['filmes']
      console.log(this.filmes)
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectActorFormGroup(): void {
    this.movieFormGroup = this.builder.group({
      filme: this.builder.control(null, [Validators.required])
    })
  }
  
  initializeActorFormGroup(): void {
    this.actorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required], this.actorValidator.validatorUniqueActorName()),
      imagem: this.builder.control(null, [Validators.required]),
      idade: this.builder.control(null, [Validators.required]),
      nacionalidade: this.builder.control(null, [Validators.required]),
      biografia: this.builder.control(null, [Validators.required]),
      data_nascimento: this.builder.control(null),
      filmes: this.builder.control(null, [Validators.required])
    })
  }

  createNewActor(): void {
    this.setDateFormattedOnActorForm(this.actorFormGroup.value['dataLancamento'])
    this.httpRequest = this.actorsService.createNewActor(this.actorFormGroup.value).subscribe(response => {
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

  setDateFormattedOnActorForm(value: string): void{
    if(value){
      let dateFormatted: string = moment.utc(value).local().format('YYYY-MM-DD')
      this.movieFormGroup.controls['data_nascimento'].setValue(dateFormatted)
    }
  } 

  actorNameExists(): boolean {
    return this.actorFormGroup.get('nome').hasError('actorNameExists')
  } 

}
