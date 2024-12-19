import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;
  @ViewChild('emai') emai!: ElementRef;
  @ViewChild('pass') pass!: ElementRef;




  submit() {
    let p = {
      email: this.email,
      password: this.password
    }

    fetch('http://localhost:4200/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }


  ngAfterViewInit() {
    this.emai.nativeElement.nextElementSibling.focus();
  }





  input() {



    if (this.email && !this.emai.nativeElement.classList.contains('top')) {
      this.emai.nativeElement.classList.add('top');
    }
    if (this.password && !this.pass.nativeElement.classList.contains('top')) {
      this.pass.nativeElement.classList.add('top');
    }
  }


  check() {

    if (!this.email) {
      this.emai.nativeElement.classList.remove('top');
    }
    if (!this.password) {
      this.pass.nativeElement.classList.remove('top');
    }
  }






  click(pp: MouseEvent) {
    let e = pp.target as HTMLElement;


    let element = e.nextElementSibling as HTMLElement;
    if (element) {
      element.focus();
    }
  }
}
