module.exports = function greetRoute(setFact) {

    var regex = /(\+|\-)?[0-9!@#$%^&*();,.?" ^$:^\d+=/${/'}`''"\[.*?\]|<>]/i

    async function indexs(req, res) {

        res.render('index', {
            counting: await setFact.count(),
            greet: await setFact.displayer(req.body.langItemType)
        })
    }

    async function postData(req, res) {
        await setFact.storedNames(req.body.namesUpdate);

        var name = req.body.namesUpdate

        if (req.body.button2 === 'button2') {
            await setFact.resetDb()
        }

        await setFact.greetName(req.body.langItemType)

        if (name.length <= 0) {
            req.flash('error', 'Please Enter A Name Below')
        }

        if(req.body.langItemType == undefined){
            req.flash('error', 'Please Select A Language')
        }

        var myTest = regex.test(name)

        if (myTest === true) {
            req.flash('error', 'Please Enter A Valid Name')
        }

        res.redirect('/')

    }

    async function getAction(req, res) {
        res.render('greeted', { actions: await setFact.getData() })
    }

    return {
        indexs,
        postData,
        getAction,
    }

}