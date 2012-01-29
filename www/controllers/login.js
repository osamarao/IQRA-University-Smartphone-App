IQRAUniversity.views.LoginForm = Ext.extend(Ext.form.FormPanel, {
	cls : 'form',
	items : [{
		xtype : 'textfield',
		name : 'username',
		placeHolder : 'Reg. No.',
		value : window.localStorage.getItem("id") || ''
	}, {
		xtype : 'passwordfield',
		name : 'password',
		placeHolder : 'Password',
		value : window.localStorage.getItem("pwd") || ''
	}],
	listeners : {
		beforesubmit : function() {
			// check if it's right and return
			var form = this.getValues();
			if(form.username.replace(/ /g, "").length <= 0) {
				Ext.Msg.alert("Oops!", "Reg. No. is required.", Ext.emptyFn);
				return;
			}

			if(form.password.replace(/ /g, "").length <= 0) {
				Ext.Msg.alert("Oops!", "Password is required.", Ext.emptyFn);
				return;
			}

			var loader = new Ext.LoadMask(Ext.getBody(), {
				msg : "Please Wait..."
			});
			loader.show();

			var conn = new Ext.data.Connection();
			conn.request({
				url : BaseURL + 'Login.php',
				method : 'POST',
				params : {
					id : form.username,
					pwd : form.password
				},
				success : function(response) {
					try {
						if(response && response.responseText) {
							var data = JSON.parse(response.responseText);
							if(data && data.login) {
								if(data.login > 0) {
									window.localStorage.setItem("id", form.username);
									window.localStorage.setItem("pwd", form.password);

									var anim;
									
									if(Ext.is.iOS) {
										anim = {
											type : 'flip',
											duration : 500,
											direction : 'left'
										};
									}
									else {
										anim = {
											type : 'slide',
											direction : 'left'
										};
									}

									IQRAUniversity.views.Viewport.setActiveItem(1, anim);

									return;
								}
							}
						}
						Ext.Msg.alert("Oops!", "Login failed. Please check your reg. no. and password.", Ext.emptyFn);
					} catch (ex) {
						Ext.Msg.alert("Oops!", "Login failed. Please check your reg. no. and password.", Ext.emptyFn);
					}
				},
				failure : function() {
					Ext.Msg.alert("Oops!", "Login failed. Please check your reg. no. and password.", Ext.emptyFn);
				},
				callback : function() {
					loader.hide();
				}
			});
			return false;
		}
	}
});

IQRAUniversity.views.LoginCard = Ext.extend(Ext.Panel, {
	cls : 'login',
	title : "SIC Login",
	iconCls : 'login',

	initComponent : function() {
		Ext.apply(IQRAUniversity.views, {
			LoginForm : new IQRAUniversity.views.LoginForm()
		});

		Ext.apply(this, {
			dockedItems : [{
				xtype : "toolbar",
				title : "SIC Login",
			}, {
				xtype : 'tabbar',
				dock : 'bottom',
				cls : 'buttons',
				layout : {
					pack : 'center'
				},
				items : [{
					xtype : 'button',
					ui : 'submit-large',
					text : 'Login',
					cls : 'button',
					handler : function() {
						IQRAUniversity.views.LoginForm.submit();
					}
				}]
			}],
			items : [{
				xtype : 'panel',
				cls : 'content',
				items : [{
					xtype : 'panel',
					cls : 'header',
					html : 'Type your IQRA SIC credentials'
				}, IQRAUniversity.views.LoginForm, {
					xtype : "panel",
					cls : "developer",
					html : "<a href=\"http://umairashraf.me/\" target=\"_blank\">umairashraf.me</a>"
				}]
			}]
		});

		IQRAUniversity.views.AttendanceCard.superclass.initComponent.apply(this, arguments);
	}
});
