'use strict';

var Users = require('../models/users.js');
var Items = require('../models/items');
var Purchases = require('../models/purchases');
	// var adm=new Users();
	// adm.username="user@site.com";
	// adm.password="user";
	// //adm.role="admin";
	// adm.phone="375291234567";
	// adm.save();

// Users.findOne({role:"admin"},function(err,doc){
// 	if(err) throw err;
// 			    let arr=[{img:"https://www.ftdimg.com/pics/products/FMTP_200x225.jpg",name:"Tulip Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/FCRS_200x225.jpg",name:"Shine Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/FFGD_200x225.jpg",name:"Gerbera Daisy Bouquet",tags:["Best Seller","Birthday","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/C15-4790_200x225.jpg",name:"Precious Heart Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/CDL_200x225.jpg",name:"Purple Pop Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/S7-4450_200x225.jpg",name:"Affection Arrangement",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/CDB_200x225.jpg",name:"Beyond Blue Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/FBBX_200x225.jpg",name:"Blessings Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/HG1_200x225.jpg",name:"Meadows Bouquet",tags:["Best Seller","Birthday","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/C3-4793_200x225.jpg",name:"The Sentiments Bouquet",tags:["Best Seller","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/BD2_263x295.jpg",name:"Birthday Bright Bouquet",tags:["Birthday","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/FFBR_200x225.jpg",name:"Rainbow Rose Bouquet",tags:["Birtday","flowers","Best Seller"]},
// 			    {img:"https://www.ftdimg.com/pics/products/D5-4894X_200x225.jpg",name:"Happy Bloom Basket",tags:["Birthday","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/4P09_200x225.jpg",name:"Serene Peace Plant",tags:["Best Seller","plant"]},
// 			    {img:"https://www.ftdimg.com/pics/products/PH30_200x225.jpg",name:"Tranquility Garden Plant",tags:["plant"]},
// 			    {img:"https://www.ftdimg.com/pics/products/MR37_200x225.jpg",name:"Smiling Spirit Gift",tags:["Birthday","plant"]},
// 			    {img:"https://www.ftdimg.com/pics/products/9D03_200x225.jpg",name:"Hugs for You Plush Bear",tags:["gift"]},
// 			    {img:"https://www.ftdimg.com/pics/products/W229_200x225.jpg",name:"Veuve Clicquot & Godiva",tags:["gift"]},
// 			    {img:"https://www.ftdimg.com/pics/products/GF66_200x225.jpg",name:"Fruit Basket",tags:["gift","Best Seller"]},
// 			    {img:"https://www.ftdimg.com/pics/products/MH5165_200x225.jpg",name:"Birthday Strawberries",tags:["Birthday","gift"]},
// 			    {img:"https://www.ftdimg.com/pics/products/C6-5035_200x225.jpg",name:"Light & Lovely Bouquet",tags:["Just Because","flowers"]},
// 			    {img:"https://www.ftdimg.com/pics/products/DRVD_200x225.jpg",name:"Mixed flower Bouquet",tags:["Just Because","flowers","Best Seller"]},
// 			    {img:"https://www.ftdimg.com/pics/products/FKFR_200x225.jpg",name:"Emotion Rose Bouquet",tags:["Just Because","flowers"]},
			    
			    
// 		    ];
// 			arr.forEach(function(val,i){
// 				val.creator=doc._id;
// 				let obj=new Items(val);
// 				obj.href=process.env.APP_URL+"item/"+obj._id; ;
// 				obj.price=Math.floor((Math.random() * 6) + 1)*5+20;
// 				if(i%5==0)
// 					obj.oldPrice=obj.price+15;
// 				obj.save();
			
// 			})
// });

function ClickHandler () {


	
	this.signUp = function(req, res, next) {
		var adm = new Users();
		console.log(req.body.username + "||" + req.body.password);
		adm.username = req.body.username;
		adm.password = req.body.password;
		adm.phone = req.body.phone.slice(req.body.phone.lastIndexOf("+")+1);
		adm.name = req.body.name;
		

		adm.save(function(err) {
			if (err){
				
				console.log(err)

				res.json({
					success: false,
					message: 'UserName or Phone already taken',
					
				});
			}
			else{
			let red = req.session.redirectTo ? req.session.redirectTo : '/';
			delete req.session.redirectTo;
			req.logIn(adm,function(err){
				console.log("err",err)
			});
			res.json({
				
					success: true,
					message: 'You have successfully signed up!',
					redirect:red
				});
				next();
			}
		});

	};
	this.updateInfo=function(req,res){


		Users.findOne({_id:req.user._id},function(err,doc){
			
			if(doc.checkPassword(req.body.confirmPassword)){
				for (var variableKey in req.body){
    				if (req.body.hasOwnProperty(variableKey)&&req.body[variableKey]==""){
        			delete req.body[variableKey];
    				}
				}
				Object.assign(doc,req.body);
				doc.save(function(err){
					if(err){
					return res.json({
						success: false,
						message: 'Couldn\'t save this changes',
						
				});
					}
					else
					{
					return res.json({
						success: true,
						message: 'You have successfully changed your profile!',
						
				});
					}
				});
			}
			else
				return res.json({
						success: false,
						message: 'Wrong password',
						
				});
		})
	}
	
	this.getItems=function(req,res){
		let dbreq;
		if(req.query.q=="all")
			dbreq=Items.find();
		else
			dbreq=Items.find({$text:{$search: req.query.q}});
			
		dbreq.exec(function(err,arr){
			if(arr==null||arr.length==0){
				arr="Not Found"
			}
			let query=req.query.q;
    		let items={items:{arr,query}};
    		//console.log(items.items.arr[0]);
		    res.json(items);
		})

	};
	
	this.getItemById=function(req,res){
		//console.log(req.query);
		Items.findOne({_id: req.query.id},{__v:false}).exec(function(err,doc){
			if(doc==null){
				doc="Not Found"
			}
    		let item={item:doc};
    		//console.log(items.items.arr[0]);
		    res.json(item);
		})

	};
	
	this.profile=function(req,res){
		 Purchases.find({user:req.user._id}).populate('item').exec(function(err,arr){

			res.json({account:{name:req.user.name,phone:req.user.phone,username:req.user.username,purchases:arr}});
		 });

	}
	this.allPurchases=function(req,res){
		Purchases.find({}).populate('item').populate('user').sort({date: -1}).exec(function(err, arr){

			res.json({purchases:arr});
		 });
	}
	this.toggleFinished=function(req,res){
		console.log(req.user.role,req.query)
		if(req.user.role=="admin"&&req.query.id)
		Purchases.findOne({_id:req.query.id}).exec(function(err, doc){
			doc.finished=!doc.finished;
			doc.save();
			res.json({finished:doc.finished});
		 });
	}
	this.redirectFromItem=function(req,res){
		req.session.redirectTo=req.originalUrl;
		res.redirect("/signin");
	}
	this.addOrder=function(req,res){
		//console.log(req.body,req.params);
		if(req.params.item){
			let pur=new Purchases();
			pur.user=req.user?req.user._id:undefined;
			pur=Object.assign(pur,req.params);
			pur.info=Object.assign(pur.info,req.body.phone?req.body:{name:req.user.name,phone:req.user.phone})
			pur.save(function(err){
				if(err){
					console.log(err);
					res.redirect('back');
				}
				else{
					
					res.redirect(req.user?"/profile":"/")
				}
			});
			
		}
		else
		res.redirect("/");
	}
	
	
	this.addItem=function(req,res){
		
		
		let obj=req.body;
		
		obj.creator=req.user._id;
		obj=new Items(obj);
		obj.save(function(err){
			if (err)
			{
				console.log(err)
				return res.json({
						success: false,
						message: 'Wrong form input',
						
				});
				
			}
			else{
				return res.json({
						success: true,
						message: "OK link= "+obj.href,
						
				});
				
				}
		})
		
	}
	this.updateItem=function(req,res){

		let obj=req.body;


			
		Items.findOne({_id: obj._id}).exec(function(err,doc){
    		if (err)
			{
				console.log(err)
				return res.json({
						success: false,
						message: 'Wrong form input',
						
				});
			}
			else if(doc==null){
				return res.json({
						success: false,
						message: 'Nothing found',
						
				});
			}
			else{
				Object.assign(doc,obj);
				
				if(obj.oldPrice=="null")
					doc.oldPrice=undefined;
					
				doc.save(function(err){
					if (err) 
					{
						console.log(err);
						return res.json({
							success: false,
							message: 'Couldn\'t save',
							
					});
					}
					else{
					return res.json({
						success: true,
						message: 'OK',
						
				});
					}	
				});
				}
		})
	}
	this.removeItem=function(req,res){
		
		let obj=req.body;
		Items.findOne({_id: obj._id}).remove().exec(function(err,doc){
    		if (err)
			{
				console.log(err)
				return res.json({
						success: false,
						message: 'Couldn\'t delete',
						
				});
			}
			else{
				//console.log(doc);
				return res.json({
						success: true,
						message: 'Deleted',
						
				});
				}
		})
	}
	
	
	this.sideCategories=function(req,res){		//side menu
			let sideCategories=[{href:"/howTo",text:"Test Accounts"},{href:"/search?q=birthday",text:"Birthday"}, {href:"/search?q=just+because",text:"Just Because"},
			{href:"/search?q=plant",text:"Plants"}, {href:"/search?q=best+seller",text:"Best Sellers"}, {href:"/search?q=gift",text:"Gifts"} ]

			res.json(sideCategories);
	}
	this.slideShow=function(req,res){		//slideshow
	
			let slideShow=[{href:"https://flower-store-vozf.c9users.io/search?q=just+because",img:"https://www.ftdimg.com/pics/products/cday16_promo_full_size_justbecause_2999.jpg"},
			{href:"https://flower-store-vozf.c9users.io/search?q=best+seller",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_studio_np.jpg"}, {href:"https://flower-store-vozf.c9users.io/search?q=plants",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_plants_np.jpg"},
	{href:"https://flower-store-vozf.c9users.io/search?q=birthday",img:"https://www.ftdimg.com/pics/products/eday17_hpslide_bday_np.jpg"}, {href:"https://flower-store-vozf.c9users.io/search?q=sale",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_weekendsale_50_alt3.jpg"}]
		
		res.json(slideShow);
		
		
	}

}

module.exports = ClickHandler;
