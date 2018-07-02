var express = require('express');
var router = express.Router();

var comments ={}

function html_encode(str){
	var s = '';
	if(str.length==0){
		return ""
	}
	s=str.replace(/&/g,"&gt;");
	s = s.replace(/</g,"&lt;");
	s = s.replace(/>/g,"&gt;");
	s = s.replace(/\s/g,"&nbsp;");
	s = s.replace(/\'/g,"&#39");
	s = s.replace(/\"/g,"&quot;");
	s = s.replace(/\n/g,"<br>");
	return s
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('X-XSS-Protection',0)//禁用XSS保护
  res.render('index', {title: 'XSS攻防测试',xss:req.query.xss });
});

router.get('/comment',function(req,res,next){

   // comments.v = html_encode(req.query.comment)//过滤
    comments.v = req.query.comment

})
router.post('/login',function(req,res,next){
	  var user_name=req.body.user;  
      var pass_word=req.body.password; 
      console.log(req,res,next)
      req.session.user = user_name;
      req.session.password = pass_word;
      console.log(user_name,pass_word);
      res.end();
})
router.get('/session',function(req,res,next){
	
        res.send({user:req.session.user,
        	password:req.session.password
        })
        res.end();
})

router.get('/getComment',function(req,res,next){
  
   res.json({
   	comment:comments.v
   })


})

module.exports = router;
