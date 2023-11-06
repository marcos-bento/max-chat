export class UsuarioLogado{
    private usuarioLogado: boolean = false;
    private usuarioId: string;
    private usuarioNome: string;

    constructor(_usuarioId: string, _usuarioNome: string){
        this.usuarioLogado = true;
        this.usuarioId = _usuarioId;
        this.usuarioNome = _usuarioNome;
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
};
