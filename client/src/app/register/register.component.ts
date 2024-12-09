import { Component, inject, input, output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  cancelRegister = output<boolean>();
  model: any = {};
private accountService = inject(AccountService);

  // constructor(private accountService: AccountService) { }
  register() {
    this.accountService.register(this.model).subscribe( {
      next: response => {
        console.log(response);
      this.cancel();
      },
      error: error => console.log(error),
      complete: () => console.log('Request completed')
      
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
