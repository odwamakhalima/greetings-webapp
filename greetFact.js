module.exports = function greetings(storeNames) {

    var counter = 0
    var regex = /(\+|\-)?[0-9!@#$%^&*();,.?" ^$:^\d+=/${/'}`''"\[.*?\]|<>]/i
    var namesGreeted = storeNames || {};
    var myNames;
    var check = false
    var result;
    var list = []
    var newList = []
    var errorM = ''
    var countr = 0;

    function addNames(type) {
        var myTest = regex.test(type)
        if (myTest === false || type === '') {
            myNames = type.trim();
            myNames = myNames.toUpperCase()
        }
        else {
            errorM = 'Not A Valid Name Try Again'
        }
        return true
    }

    function count() {
        var myKey = Object.keys(namesGreeted)
        counter = myKey.length
        return counter
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
                result = Xhosa + myNames
            }
            else if (languageType === 'English') {
                result = English + myNames
            }
            else if (languageType === 'Afrikaans') {
                result = Afrikaans + myNames
            }
        }
        else {
            errorM = 'Please Select A Language'
        }
        return result;
    }
    
    function storedNames(names) {
        myNames = names
        var myTest = regex.test(myNames)
        if (myTest === false) {
            newList.push(myNames)
            if (myNames.trim()) {
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
                            count()
                        }
                    }
                }
            }
        }
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


    function getCount(newList, value) {
        console.log(newList)
        countr = 0;
        newList.forEach((v) => (v === value && countr++));
        list.push({
            allNames: myNames,
            counts: countr
        })
        return countr;
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
        getCount
    }
}