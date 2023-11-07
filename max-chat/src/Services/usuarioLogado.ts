export class UsuarioLogado{
    private usuarioLogado: boolean = false;
    private usuarioId: string;
    private usuarioNome: string;
    private usuarioEmail: string;

    constructor(_usuarioId: string, _usuarioNome: string, _usuarioEmail: string){
        this.usuarioLogado = true;
        this.usuarioId = _usuarioId;
        this.usuarioNome = _usuarioNome;
        this.usuarioEmail = _usuarioEmail;
    };

    get _usuarioId(){
        return this.usuarioId;
    };

    get _usuarioLogado(){
        return this.usuarioLogado;
    };

    get _usuarioNome(){
        return this.usuarioNome;
    };

    get _usuarioEmail(){
        return this.usuarioEmail;
    };
};
