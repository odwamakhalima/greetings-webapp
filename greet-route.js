module.exports = function greetRoute(setFact) {

    async function indexs(req, res) {


        res.render('index', {
            counting: await setFact.count(),
            greet: setFact.displayer(req.body.langItemType)
        })
    }

    async function postData(req, res) {
        await setFact.storedNames(req.body.namesUpdate);

        var name = req.body.namesUpdate

        if (req.body.button2 === 'button2') {
            await setFact.resetDb()
        }


        await setFact.greetName(req.body.langItemType)
        await setFact.count()



        if (name.length <= 0) {
            req.flash('error', 'Please Enter A Name Below')
        }

        res.redirect('/')

    }

    function getAction(req, res) {
        res.render('greeted', { actions: setFact.getData() })
    }

    return {
        indexs,
        postData,
        getAction,
    }

}