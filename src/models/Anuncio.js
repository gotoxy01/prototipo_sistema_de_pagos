export class Anuncio {
    constructor(id, titulo, costoPorClic) {
        this.id = id;
        this.titulo = titulo;
        this.costoPorClic = costoPorClic;
        this.clics = 0;
    }

    registrarClic() {
        this.clics = this.clics + 1;
        return this.costoPorClic; 
    }
}