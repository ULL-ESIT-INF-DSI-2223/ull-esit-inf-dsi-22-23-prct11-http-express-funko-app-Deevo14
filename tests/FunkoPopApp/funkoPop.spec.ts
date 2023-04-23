import 'mocha';
import {expect} from 'chai';
import {FunkoPop} from '../../src/FunkoPopApp/funko.js'
import {FunkoPopType} from '../../src/FunkoPopApp/funkoPopType.js';
import {FunkoPopGenre} from '../../src/FunkoPopApp/funkoPopGenre.js'

describe('FunkoPop Tests', () => {
    it('should create a FunkoPop object', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko).to.be.an.instanceOf(FunkoPop);
    });
    it('Get ID', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.ID).to.equal(1);
    });
    it('Set ID', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.ID = 2;
        expect(funko.ID).to.equal(2);
    });
    it('Get Name', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Name).to.equal('Classic Sonic');
    });
    it('Set Name', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Name = 'Classic Tails';
        expect(funko.Name).to.equal('Classic Tails');
    });
    it('Get Description', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Description).to.equal('The best Sonic Funko ever');
    });
    it('Set Description', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Description = 'The best Tails Funko ever';
        expect(funko.Description).to.equal('The best Tails Funko ever');
    });
    it('Get Type', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Type).to.equal(0);
    });
    it('Set Type', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Type = FunkoPopType['Vynil Gold'];
        expect(funko.Type).to.equal(3);
    });
    it('Get Genre', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Genre).to.equal(0);
    });
    it('Set Genre', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Genre = FunkoPopGenre.Comics;
        expect(funko.Genre).to.equal(6);
    });
    it('Get Franchise', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Franchise).to.equal('Sonic');
    });
    it('Set Franchise', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Franchise = 'Tails';
        expect(funko.Franchise).to.equal('Tails');
    });
    it('Get Number', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Num).to.equal(2);
    });
    it('Set Number', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Num = 3;
        expect(funko.Num).to.equal(3);
    });
    it('Get Exclusive', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.Exclusive).to.equal(false);
    });
    it('Set Exclusive', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.Exclusive = true;
        expect(funko.Exclusive).to.equal(true);
    });
    it('Get Special Features', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.SpecialFeatures).to.equal('None');
    });
    it('Set Special Features', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.SpecialFeatures = 'Big Head';
        expect(funko.SpecialFeatures).to.equal('Big Head');
    });
    it('Get MarketValue', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        expect(funko.MarketValue).to.equal(15);
    });
    it('Set MarketValue', () => {
        const funko = new FunkoPop(1, 'Classic Sonic', 'The best Sonic Funko ever', FunkoPopType['Pop!'], FunkoPopGenre.Animación, 'Sonic', 2, false, 'None', 15);
        funko.MarketValue = 20;
        expect(funko.MarketValue).to.equal(20);
    });
});
