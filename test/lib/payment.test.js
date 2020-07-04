const assert = require('chai').assert;
const payment = require('../../app/lib/payment');

describe('Test Payment', () => {
    describe('CalculateProductPay', () => {
        it('No rounding: should calculate fee 150 and income 850', () => {
            const payData = payment.calculateProductPay(1000);
            assert.equal(payData.fee,150);
            assert.equal(payData.income, 850);
        });
        it('Rounding: should calculate fee 999 and income 5667', () => {
            const payData = payment.calculateProductPay(6666);
            assert.equal(payData.fee,999);
            assert.equal(payData.income, 5667);
        });
    });
});