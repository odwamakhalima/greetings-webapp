module.exports = function greetRoute(setFact){




    
    function indexs(req,res){
        res.render('index', {
            counting: setFact.count(),
            greet: setFact.displayer(req.body.langItemType)
        })
       
    }

    function postData(req,res){

   setFact.storedNames(req.body.namesUpdate);
   setFact.greetName(req.body.langItemType)

        let name = req.body.namesUpdate
        let lang = req.body.langItemType
 
        console.log(setFact.getCount(setFact.storeAllName(),name))
        if(name.length<=0){
        req.flash('error', 'Please Enter A Name Below')
        }
  
    res.redirect('/')

    }

    function getAction(req,res){
        res.render('greeted',{actions:setFact.nameList()})
    }
    return{
        indexs,
        postData,
        getAction
    }

}