import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Itask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  todoForm !:FormGroup;
  tasks : Itask []=[];
  inprogress :Itask []=[];
  done :Itask  []=[];
  updateIndex:any;
  isEditEnabled: boolean =false;

  constructor( private fb :FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item:['',Validators.required]
    })
  }


addTask(){
  this.tasks.push({
    description:this.todoForm.value.item,
    done:false
  })
  this.todoForm.reset();
}

deleteTask(i:number){
this.tasks.splice(i,1)
}

deleteInprogressTask(i:number){
  this.inprogress.splice(i,1)
  }

deleteDoneTask(i:number){
    this.done.splice(i,1)
    }


onEdit(item : Itask,i :number){
  this.todoForm.controls['item'].setValue(item.description)
  this.updateIndex=i;
  this.isEditEnabled=true;
}
updateTask(){
  this.tasks[this.updateIndex].description=this.todoForm.value.item;
  this.tasks[this.updateIndex].done = false;
  this.todoForm.reset();
  this.updateIndex=undefined;
  this.isEditEnabled= false;
}

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
