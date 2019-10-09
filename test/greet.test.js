let assert = require("assert");
var greetings = require('../greetFact')

describe('Greeting-App function', function () {

    it('should return the list of all the names greeted', function () {

        var setFact = greetings()

        setFact.storedNames('odwa')
        setFact.storedNames('jesse')
        setFact.storedNames('jason')

        assert.deepEqual(['odwa','jesse','jason'], setFact.storeAllName());
    });


    it('should return the number of names and ignore duplicates', function () {

        var setFact = greetings()

        setFact.storedNames('odwa')
        setFact.storedNames('odwa')
        setFact.storedNames('jesse')
        setFact.storedNames('jesse')

        assert.deepEqual(2, setFact.count());
    });

    it('should greet the name in xhosa,english and afrikaans', function () {

        var setFact = greetings()

        setFact.storedNames('odwa')
        

        assert.deepEqual('Molo ODWA', setFact.greetName('Xhosa'));
        assert.deepEqual('Hello ODWA', setFact.greetName('English'));
        assert.deepEqual('Hallo ODWA', setFact.greetName('Afrikaans'));
    });
});