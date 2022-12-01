import {FormControl} from "@angular/forms";

export interface RegisterFormInterface {
  groupName: FormControl<string>
  teamName: FormControl<string>
  countMembers: FormControl<number>
}
