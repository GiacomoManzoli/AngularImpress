/**
 * Created by gmanzoli on 30/04/15.
 */

/** Classe Node
 * Metodo costruttore
 * @param {JSON} data - Oggetto contenente i dati necessari all'inizializzazione del nodo*/
function Node(data){
    this.contens = {}; //Nel diagramma si chiama 'data', cambiato il nome per disambiguare il parametro del costruttore
    this.id = data.id;
}

/** Metodo che restituisce tutti i dati contenuti nel nodo.
 * @return {JSON}
 */
Node.prototype.getContents= function(){

};

/** Metodo che restituisce il titolo del nodo.
 * @return {String}
 */
Node.prototype.getTitle= function(){

};