module.exports = class RessourceNotFoundError extends Error {
    constructor(){
        super();
        this.status = 401;
        this.message = "Ressource not found";
    }
}