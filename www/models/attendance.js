Ext.regModel('Attendance', {
	fields : [{
		name : 'semester',
		type : 'string'
	}, {
		name : 'course',
		type : 'string'
	}, {
		name : 'sessions',
		type : 'int',
		defaultValue : 0
	}, {
		name : 'presents',
		type : 'int',
		defaultValue : 0
	}, {
		name : 'absents',
		type : 'int',
		defaultValue : 0
	}]
});
