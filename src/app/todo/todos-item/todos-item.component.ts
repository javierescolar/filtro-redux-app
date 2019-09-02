import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Todo } from "../models/todo.model";
import { FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as fromTodoAction from "../todo.actions";

@Component({
  selector: "app-todos-item",
  templateUrl: "./todos-item.component.html",
  styleUrls: ["./todos-item.component.css"]
})
export class TodosItemComponent implements OnInit {
  @Input() todo: Todo;
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  @ViewChild("txtInputFisico", { static: false }) txtInputFisico: ElementRef;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges.subscribe(value =>
      this.store.dispatch(new fromTodoAction.ToggleTodoAction(this.todo.id))
    );
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 100);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    this.store.dispatch(
      new fromTodoAction.EditarTodoAction(this.todo.id, this.txtInput.value)
    );
  }

  borrar() {
    this.store.dispatch(new fromTodoAction.BorrarTodoAction(this.todo.id));
  }
}
