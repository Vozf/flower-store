'use strict';





var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			// console.log(req.originalUrl)
			req.session.redirectTo = req.originalUrl;
			res.redirect('/signin');
		}
	}

	function isAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.role == "admin") {
			return next();
		}
		else {
			res.redirect('/');
		}
	}

	var clickHandler = new ClickHandler();
	


	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/signin')
		.get(function(req, res) {
			res.sendFile(path + '/public/signin.html');
		})
		.post(function(req, res, next) {

			let red = req.session.redirectTo ? req.session.redirectTo : '/';
			delete req.session.redirectTo;
			passport.authenticate('local', (err, user, info) => {
				
				if (err) {
					next(err);
					
						return res.status(400).json({
							success: false,
							message: err.message
						});
		
				}else if(info){
					return res.status(400).json({
							success: false,
							message: info.message
						});
				}
				else {
					req.logIn(user,function(err){
						if (err) { return next(err); }
						else
				return res.json({
					success: true,
					message: 'You have successfully logged in!',
					redirect:red
				});
						
					})
				}
			})(req, res, next);
		});


		
		
	app.route('/signup')
		.get(function(req, res) {
			
			res.sendFile(path + '/public/signup.html');
		})
		.post(clickHandler.signUp);

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/signin');
		});

	app.route('/profile')
		.get(isLoggedIn, function(req, res) {
			if (req.user.role == "admin")
				res.sendFile(path + '/public/admProfile.html');
			else
				res.sendFile(path + '/public/profile.html');
		})
		.post(isLoggedIn, clickHandler.updateInfo);

	app.route('/item/:id')
		.get(function(req, res) {
			res.sendFile(path + '/public/item.html');
		})
		.post(clickHandler.redirectFromItem);


	app.route('/search/')
		.get(function(req, res) {
			res.sendFile(path + '/public/search.html');
		});
		
	app.route('/howTo')
		.get(function(req, res) {
			res.sendFile(path + '/public/howTo.html');
		});
	app.route('/about')
		.get(function(req, res) {
			res.sendFile(path + '/public/about.html');
		});
	app.route('/customers')
		.get(function(req, res) {
			res.sendFile(path + '/public/customers.html');
		});
	app.route('/shipping')
		.get(function(req, res) {
			res.sendFile(path + '/public/shipping.html');
		});
		
	app.route("/api/addOrder/:item")
		.post(clickHandler.addOrder)
	app.route('/api/auth')
		.get(function(req, res) {
			
			res.json({
				isAuthenticated: req.user != null
			});
		});
	app.route('/api/profile')
		.get(isLoggedIn, clickHandler.profile);
	app.route('/api/allpurchases')
		.get(isAdmin, clickHandler.allPurchases);
	app.route("/api/togglefinished")
		.get(isAdmin, clickHandler.toggleFinished);
	app.route('/api/items/id/')
		.get(clickHandler.getItemById);
	app.route('/api/items/')
		.get(clickHandler.getItems);
	app.route('/api/sideCategories/')
		.get(clickHandler.sideCategories);
	app.route('/api/slideShow/')
		.get(clickHandler.slideShow);

	app.route('/api/addItem/')
		.post(isAdmin, clickHandler.addItem);
	app.route('/api/removeItem/')
		.post(isAdmin, clickHandler.removeItem);
	app.route('/api/updateItem/')
		.post(isAdmin, clickHandler.updateItem);


};
