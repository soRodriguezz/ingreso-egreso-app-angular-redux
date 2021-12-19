

export class Usuario {

    static fromFirestore( { email, nombre, uid }: any ) {
        return new Usuario(
            uid,
            nombre,
            email
        );
    }
    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ) {}
}