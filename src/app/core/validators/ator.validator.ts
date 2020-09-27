import {Injectable} from "@angular/core"
import {AsyncValidatorFn} from "@angular/forms"
import {map, debounceTime, distinctUntilChanged, switchMap, first} from "rxjs/operators"
import {ActorsService} from "./../services/actors.service"

@Injectable({
    providedIn: 'root'
})
export class ActorValidator {

    constructor(
        private actorsService: ActorsService
    ) { }

    validatorUniqueActorName(): AsyncValidatorFn {
        return control => control.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(value => this.actorsService.validatorUniqueActorName(value)),
                map((response) => {
                    if(response['data'] == 0 && control.value != null && control.value != '' ){
                        return null
                    }else {
                        return {'actorNameAlreadyExists': true}
                    }
                }),
                first()
            )
    }

}