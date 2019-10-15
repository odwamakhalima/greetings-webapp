module.exports = function greetings(storeNames) {

    var counter;
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

    function addNames(type) {
        var myTest = regex.test(type)
        if (myTest === false || type === '') {
            myNames = type.trim();
            myNames = myNames.toUpperCase()
        }

        return true
    }

    async function count() {
        var counter = await pool.query('select count(*) from allnames')
        for(var i = 0;i<counter.rows.length;i++){
            var checkCount = counter.rows[i]
        }
        return checkCount.count
    }

    function output() {
        return namesGreeted
    }

    function greetName(language) {
        var languageType = language
        var English = 'Hello '
        var Xhosa = 'Molo '
        var Afrikaans = 'Hallo '
        var myTest = regex.test(myNames)

        if (myTest === false) {
            if (languageType === 'Xhosa') {
                if(myNames.length>0){
            result = Xhosa + myNames
                }
                
            }
            else if (languageType === 'English') {
                if(myNames.length>0){
                result = English + myNames
                }
            }
            else if (languageType === 'Afrikaans') {
                if(myNames.length>0){
                result = Afrikaans + myNames
            }
        }
        }

        return result;
    }

    async function storedNames(names) {
        myNames = names
        var myTest = regex.test(myNames)

        known = await pool.query('select distinct greet_name, greet_count from allnames ORDER BY greet_name')
        if(myNames.length>0){
        if (myTest === false) {
            newList.push(myNames)
            
                if (addNames(myNames)) {
                    var allData = []
                    allData = Object.keys(namesGreeted)
                    for (var i = 0; i < allData.length; i++) {
                        if (allData === myNames) {
                            check = true
                        }
                    }
                    if (check === false) {
                        if (namesGreeted[myNames] === undefined) {
                            namesGreeted[myNames] = 0;
                            
                            var store = await pool.query('select * from allnames WHERE greet_name = $1',[myNames])

                            if(store.rowCount === 1){
                                await pool.query('UPDATE allnames SET greet_count = greet_count + 1 WHERE greet_name = $1',[myNames])
                            }
                            else{
                                await pool.query('insert into allnames (greet_name, greet_count) values ($1, $2)' , [myNames, 1]);
                            }
                            count()
                        }
                }
            }
        }   
    }
}

    function getData(){
        storedNames(myNames)
        return known.rows
    }

   async function resetDb(){
        await pool.query('DELETE from allnames')
    }

    function nameList() {
        return list
    }

    function displayer(input) {
        var show;
        if (check === true) {
            show = 'already there'
            return show
        }
        show = greetName(input);
        return show
    }

    function errors() {
        return errorM
    }

    function storeAllName() {
        return newList
    }

    return {
        addNames,
        storedNames,
        greetName,
        count,
        displayer,
        output,
        nameList,
        errors,
        storeAllName,
        getData,
        resetDb
    }
}