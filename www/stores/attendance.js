var atendanceStore = new Ext.data.Store({
	model : 'Attendance',
	proxy : {
		type : 'ajax',
		url : BaseURL + 'Attendance.php',
		reader : {
			type : 'json'
		}
	},
	getGroupString : function(record) {
		if(record && record.data.semester) {
			return record.get('semester');
		} else {
			return '';
		}
	}
});
