import { Action } from '@ngrx/store';

export const AGREGAR_TODO = '[Todo] Agregar_Todo';
export const TOOGLE_TODO = '[Todo] Toggle_Todo';
export const EDITAR_TODO = '[Todo] Editar_Todo';
export const BORRAR_TODO = '[Todo] Borrar_Todo';
export const TOGGLE_ALL_TODO = '[Todo] Toggle_All_Todo';
export const BORRAR_COMPLETADOS_TODO = '[Todo] Borrar_Completados_Todo';

export class AgregarTodoAction implements Action {
  readonly type = AGREGAR_TODO;
  constructor(public texto: string) {}
}

export class ToggleTodoAction implements Action {
  readonly type = TOOGLE_TODO;
  constructor(public id: number) {}
}

export class ToggleAllTodoAction implements Action {
  readonly type = TOGGLE_ALL_TODO;
  constructor(public completado: boolean) {}
}

export class EditarTodoAction implements Action {
  readonly type = EDITAR_TODO;
  constructor(public id: number, public texto: string) {}
}

export class BorrarTodoAction implements Action {
  readonly type = BORRAR_TODO;
  constructor(public id: number) {}
}

export class BorrarAllTodoAction implements Action {
  readonly type = BORRAR_COMPLETADOS_TODO;
}

export type TodoActions = AgregarTodoAction |
                          ToggleTodoAction |
                          EditarTodoAction |
                          BorrarTodoAction |
                          BorrarAllTodoAction |
                          ToggleAllTodoAction;
