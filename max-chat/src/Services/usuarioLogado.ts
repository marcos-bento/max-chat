export class UsuarioLogado{
    private usuarioLogado: boolean = false;
    private usuarioId: string;

    constructor(_usuarioId: string){
        this.usuarioLogado = true;
        this.usuarioId = _usuarioId;
    };

    get _usuarioId(){
        return this.usuarioId;
    };

    get _usuarioLogado(){
        return this.usuarioLogado;
    };

};
