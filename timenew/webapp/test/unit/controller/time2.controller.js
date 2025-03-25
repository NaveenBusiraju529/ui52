/*global QUnit*/

sap.ui.define([
	"timenew/controller/time2.controller"
], function (Controller) {
	"use strict";

	QUnit.module("time2 Controller");

	QUnit.test("I should test the time2 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
