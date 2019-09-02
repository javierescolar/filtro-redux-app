import * as fromTodo from "./todo.actions";
import { Todo } from "./models/todo.model";
import { BORRAR_COMPLETADOS_TODO } from './todo.actions';

const todo1 = new Todo("Aprender Angular");
const todo2 = new Todo("Aprender Patrón Redux");
const todo3 = new Todo("Crear nuevas apss SPA");

todo1.completado = true;

const estadioInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(
  state = estadioInicial,
  action: fromTodo.TodoActions
): Todo[] {
  switch (action.type) {
    case fromTodo.AGREGAR_TODO:
      const todo = new Todo(action.texto);
      return [...state, todo];
    case fromTodo.TOOGLE_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            completado: !todoEdit.completado
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodo.EDITAR_TODO:
      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            texto: action.texto
          };
        } else {
          return todoEdit;
        }
      });
    case fromTodo.BORRAR_TODO:
      return state.filter(todoEdit => todoEdit.id !== action.id);
    case fromTodo.TOGGLE_ALL_TODO:
      return state.map(todoEdit => {
        return { ...todoEdit, completado: action.completado };
      });

      case fromTodo.BORRAR_COMPLETADOS_TODO:
          return state.filter(todoEdit => !todoEdit.completado);
    default:
      return state;
  }
}
