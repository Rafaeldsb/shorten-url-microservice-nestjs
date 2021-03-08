import { Observable } from "rxjs";

export interface IHandler<M, R> {
  execute(data: M): Observable<R>;
}
