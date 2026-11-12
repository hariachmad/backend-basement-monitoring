export interface IEvent<K extends string =string,T =unknown> {
    name: K;
    payload : T;
}