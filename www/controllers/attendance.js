IQRAUniversity.views.AttendanceList = Ext.extend(Ext.List, {
	store : atendanceStore,
	selectedItemCls : '',
	grouped : true,
	itemTpl : '<div>' + '<div class="attendance-item-course">{course}</div>' + '<div class="attendance-item-info">{absents} absents + {presents} presents / {sessions} sessions</div>' + '</div>',
	plugins : [{
		ptype : 'pullrefresh',
		refreshFn : function(callback, plugin) {
			var store = plugin.list.getStore();
			store.load({
				params : {
					id : window.localStorage.getItem("id"),
					pwd : window.localStorage.getItem("pwd")
				},
				callback : function(records, operation, success) {
					callback.call(plugin);
				}
			});
		}
	}]
});

IQRAUniversity.views.AttendanceCard = Ext.extend(Ext.Panel, {
	title : "Attendance",
	layout : "fit",
	cls : 'attendance',
	iconCls : 'attendance',

	initComponent : function() {
		Ext.apply(IQRAUniversity.views, {
			AttendanceList : new IQRAUniversity.views.AttendanceList()
		});

		Ext.apply(this, {
			dockedItems : [{
				xtype : "toolbar",
				title : "Attendance",
				items : [{
					xtype : 'spacer'
				}, {
					xtype : 'button',
					text : 'Logout',
					handler : function() {
						window.localStorage.removeItem("id");
						window.localStorage.removeItem("pwd");

						var anim;

						if(Ext.is.iOS) {
							anim = {
								type : 'flip',
								duration : 500,
								direction : 'left'
							};
						} else {
							anim = {
								type : 'slide',
								direction : 'right'
							};
						}

						IQRAUniversity.views.Viewport.setActiveItem(0, anim);
					}
				}]
			}],
			items : [IQRAUniversity.views.AttendanceList],
			listeners : {
				activate : function() {
					IQRAUniversity.views.AttendanceList.getStore().load({
						params : {
							id : window.localStorage.getItem("id"),
							pwd : window.localStorage.getItem("pwd")
						}
					});
				}
			}
		});

		IQRAUniversity.views.AttendanceCard.superclass.initComponent.apply(this, arguments);
	}
});
