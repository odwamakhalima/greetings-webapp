module.exports = function greetings(storeNames) {

    var regex = /(\+|\-)?[0-9!@#$%^&*();,.?" ^$:^\d+=/${/'}`''"\[.*?\]|<>]/i
    var namesGreeted = storeNames || {};
    var myNames;
    var check = false
    var result;
    var list = []
    var newList = []
    var errorM = ''
    var known;


    const connectionString = 'postgresql://codex:codex123@localhost/greetnames';
    const pg = require("pg");
    const Pool = pg.Pool;

    const pool = new Pool({
        connectionString
    });


    async function count() {
        var counter = await pool.query('select count(*) from allnames')
        for (var i = 0; i < counter.rows.length; i++) {
            var checkCount = counter.rows[i]
        }
        return checkCount.count
    }

    function output() {
        return namesGreeted
    }

    async function greetName(language) {
        var languageType = language
        var English = 'Hello '
        var Xhosa = 'Molo '
        var Afrikaans = 'Hallo '
        var myTest = regex.test(myNames)

        if (myTest === false) {
            if (languageType === 'Xhosa') {
                if (myNames.length > 0) {
                    result = Xhosa + myNames
                }

            }
            else if (languageType === 'English') {
                if (myNames.length > 0) {
                    result = English + myNames
                }
            }
            else if (languageType === 'Afrikaans') {
                if (myNames.length > 0) {
                    result = Afrikaans + myNames
                }
            }
        }
        
        return result;
    }

    async function storedNames(names) {
        myNames = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
        var myTest = regex.test(myNames)

        if (myTest === false) {
            known = await pool.query('select distinct greet_name, greet_count from allnames ORDER BY greet_name')

            if (myNames.length > 0) {
                var store = await pool.query('select * from allnames WHERE greet_name = $1', [myNames])

                if (store.rowCount === 1) {
                    await pool.query('UPDATE allnames greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1', [myNames])
                }
                else {
                    await pool.query('insert into allnames (greet_name, greet_count) values ($1, $2)', [myNames, 1]);
                }
            }
        }
    }

    async function getData() {
        known = await pool.query('select distinct greet_name, greet_count from allnames ORDER BY greet_name')
        return known.rows
    }

    async function resetDb() {
        await pool.query('DELETE from allnames')
    }


    async function displayer(input) {
        var show;
        if (check === true) {
            show = 'already there'
            return show
        }
        show = greetName(input);
        
        return await show
        
        
    }

    return {
        storedNames,
        greetName,
        count,
        displayer,
        output,
        getData,
        resetDb
    }

}