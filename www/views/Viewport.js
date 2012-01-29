IQRAUniversity.views.Viewport = Ext.extend(Ext.Panel, {
	fullscreen : true,
	layout : 'card',

	tabBar : {
		dock : 'bottom',
		layout : {
			pack : 'center'
		}
	},

	initComponent : function() {
		Ext.apply(IQRAUniversity.views, {
			LoginCard : new IQRAUniversity.views.LoginCard(),
			AttendanceCard : new IQRAUniversity.views.AttendanceCard()
		});

		Ext.apply(this, {
			activeItem : (this.isLoggedIn() ? 1 : 0),
			items : [IQRAUniversity.views.LoginCard, IQRAUniversity.views.AttendanceCard]
		});

		IQRAUniversity.views.Viewport.superclass.initComponent.apply(this, arguments);
	},
	isLoggedIn : function() {
		return ((window.localStorage.getItem("id") != null) && (window.localStorage.getItem("pwd") != null));
	}
});
