import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { BorrarAllTodoAction } from '../todo.actions';


@Component({
  selector: 'app-todos-footer',
  templateUrl: './todos-footer.component.html',
  styleUrls: ['./todos-footer.component.css']
})
export class TodosFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos','completados','pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes:number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }


  cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {
    this.store.dispatch(new fromFiltro.SetFiltroAction(nuevoFiltro));
  }

  borrarCompletados(){
    this.store.dispatch(new BorrarAllTodoAction());
  }
}
