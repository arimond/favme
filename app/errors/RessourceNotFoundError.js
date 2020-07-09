module.exports = class RessourceNotFoundError extends Error {
    constructor(){
        super();
        this.status = 404;
        this.message = "Ressource not found";
    }
}