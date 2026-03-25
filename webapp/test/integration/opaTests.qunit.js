/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["basicproject/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
