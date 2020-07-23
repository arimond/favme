require('dotenv').config();

module.exports = class Payment {
    static validatePrice(price){
        return price < process.env.MAX_PRICE*100;
    }
    static calculateProductPay(price){
        const percentage = parseInt(process.env.FEE_PERCENTAGE);
        const fee = Math.floor(price * percentage / 100);
        const income = price - fee;
        return {
            fee: fee,
            income: income
        };
    }
}
