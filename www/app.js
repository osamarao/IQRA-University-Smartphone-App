/**
 * Application Config
 */
var BaseURL;
BaseURL = "../service/";
BaseURL = "http://umairashraf.me/testing/IU/v2/service/";

/**
 * For console that can't suck errors
 */
window.onerror = function(msg, url, line) {
	console.log(line + ": " + msg);
};

/**
 * Sencha Touch application instance
 */
var IQRAUniversity = new Ext.Application({
	name : 'IQRAUniversity',

	launch : function() {
		this.launched = true;
		this.network = false;
		this.mainLaunch();
	},
	mainLaunch : function() {
		if(!Ext.is.Desktop) {
			if(!device || !this.launched) {
				return;
			}
			this.network = !(navigator.network.connection.type == Connection.NONE);
		}
		this.views.Viewport = new this.views.Viewport();
	}
});

/**
 * Phonegap ready listener to start the app
 */
document.addEventListener("deviceready", IQRAUniversity.mainLaunch, false);
