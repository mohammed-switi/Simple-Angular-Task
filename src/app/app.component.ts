import { Component } from '@angular/core';



interface User{
  id:number
  name:string,
  dateOfBirth:Date
  location:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
    users:User[]= [];
    newUser:User  = { id:0, name: '', dateOfBirth: new Date, location: '' };
    editMode:boolean = false;
    editUserId:number = 0;

    trackByUserId(index: number, user: any) {
        return user.id;
    }

    onSubmit() {
        if (this.editMode) {
            this.updateUser();
        } else {
            this.addUser();
        }
    }

    addUser() {

      if(!(this.newUser.dateOfBirth && this.newUser.name && this.newUser.location ))
          alert("Please Fill All the fields")
        
        const newUser = { ...this.newUser, id: this.users.length + 1 };
        this.users.push(newUser);
        this.resetForm();
    }

    onEdit(user:User) {
        this.newUser = { ...user }; // Copy the user's data to the form
        this.editUserId = user.id;
        this.editMode = true;
    }

    updateUser() {
        const index = this.users.findIndex(user => user.id === this.editUserId);
        if (index > -1) {
            this.users[index] = { ...this.newUser, id: this.editUserId };
        }
        this.resetForm();
    }

    onDelete(userId:number) {
        this.users = this.users.filter(user => user.id !== userId);
    }

    resetForm() {
        this.newUser = { id: 0, name: '', dateOfBirth: new Date, location: '' };
        this.editMode = false;
        this.editUserId = 0;
    }
}

