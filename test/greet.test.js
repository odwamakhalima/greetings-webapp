const assert = require('assert');
var greetings = require('../greetFact')
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = 'postgresql://codex:codex123@localhost/greetnames';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from allnames;");
    });

    it('should return the number of names greeted', async function(){
        
        // the Factory Function is called CategoryService
        var setGreetings = greetings(pool);
        await setGreetings.storedNames("odwa");
        await setGreetings.storedNames("jesse");

        
        assert.equal(2, await setGreetings.count());

    });
    

    it('should return the number of names greeted and ignore duplicates', async function(){
        
        // the Factory Function is called CategoryService
        var setGreetings = greetings(pool);
        await setGreetings.storedNames("odwa");
        await setGreetings.storedNames("odwa");
        await setGreetings.storedNames("jesse");
        await setGreetings.storedNames("jesse");
        await setGreetings.storedNames("jason");

        
        assert.equal(1, await setGreetings.count());

    });

    it('should greet the name with the selected language', async function(){
        
        // the Factory Function is called CategoryService
        var setGreetings = greetings(pool);
        await setGreetings.storedNames("odwa");

        
        assert.equal('Molo ODWA', await setGreetings.greetName('Xhosa'));

    });

    it('should greet the name with the selected language and ignore duplicates', async function(){
        
        // the Factory Function is called CategoryService
        var setGreetings = greetings(pool);
        await setGreetings.storedNames("odwa");
        await setGreetings.storedNames("odwa");


        
        assert.equal('Hello ODWA', await setGreetings.greetName('English'));
      
    });


    it('should return 0 because the database is reseted', async function(){
        
        // the Factory Function is called CategoryService
        var setGreetings = greetings(pool);
        await setGreetings.storedNames("odwa");
        await setGreetings.storedNames("jesse");
        await setGreetings.storedNames("jason");
        await setGreetings.storedNames("siwe");

        await setGreetings.resetDb()

    
        assert.equal(0, await setGreetings.count());

    });

    after(function(){
        pool.end();
    })
});