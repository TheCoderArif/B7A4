export interface registerPayload {
    name  :   String ;
    email  :  String  ;
    password :String;
    phone?  :  String;
    address? :  String;
    role? : 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
}