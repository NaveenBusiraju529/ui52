sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "timenew/controller/common/CalendarController",
    "timenew/controller/common/TileActionsController"
], function (Controller, CalendarController, TileActionsController) {
    "use strict";

    return Controller.extend("timenew.controller.time3", {
        onInit: function () {
            console.log("VALIDATION: time3 controller initializing");
            
            // Initialize the calendar controller
            this._calendarController = new CalendarController(this);
            console.log("VALIDATION: time3 - Calendar controller initialized");
            
            // Initialize the tile actions controller
            this._tileActionsController = new TileActionsController(this);
            console.log("VALIDATION: time3 - Tile actions controller initialized");
        },

        // Navigation functions
        onNavToTime2: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Routetime2");
        },
        
        onNavToTime4: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Routetime4");
        },

        // Calendar event handlers - delegated to calendar controller
        onAppointmentSelect: function (oEvent) {
            this._calendarController.onAppointmentSelect(oEvent);
        },

        handleAppointmentCreateDialog: function (oEvent) {
            this._calendarController.handleAppointmentCreateDialog();
        },

        handleAppointmentEdit: function (oEvent) {
            this._calendarController.handleAppointmentEdit();
        },
        
        handleCancel: function (oEvent) {
            this._calendarController.handleCancel();
        },
        
        handleAppointmentDelete: function() {
            this._calendarController.handleAppointmentDelete();
        },

        // Tile press events - delegated to tile actions controller
        onTimesheetTilePress: function() {
            this._tileActionsController.onTimesheetTilePress();
        },
        
        onMyReportsTilePress: function() {
            this._tileActionsController.onMyReportsTilePress();
        },
        
        onPMTilePress: function() {
            sap.m.MessageToast.show("Project Manager Tile Pressed");
        },
        
        onLMTilePress: function() {
            sap.m.MessageToast.show("Line Manager Tile Pressed");
        },
        
        // Link handlers for timesheet tile
        onTimesheetEntryPress: function() {
            this._tileActionsController.onTimesheetEntryPress();
        },
        
        // Link handlers for reports tile
        onActivityReportPress: function() {
            this._tileActionsController.onActivityReportPress();
        },
        
        onCustomerTimesheetPress: function() {
            this._tileActionsController.onCustomerTimesheetPress();
        },
        
        onHomeWorkingReportPress: function() {
            this._tileActionsController.onHomeWorkingReportPress();
        },
        
        // Link handlers for PM tile - keep directly in time3 controller as they are specific to time3
        onPMApproveTimePress: function() {
            sap.m.MessageToast.show("PM Approve Time Selected");
        },
        
        onPMTimeReportsPress: function() {
            sap.m.MessageToast.show("PM Time Reports Selected");
        },
        
        onPMAssignmentLMPress: function() {
            sap.m.MessageToast.show("PM Assignment Report (LM) Selected");
        },
        
        onPMAssignmentPMPress: function() {
            sap.m.MessageToast.show("PM Assignment Report (PM) Selected");
        },
        
        onPMHomeWorkingPress: function() {
            sap.m.MessageToast.show("PM Home Working Report Selected");
        },
        
        onPMTimesheetInsightsPress: function() {
            sap.m.MessageToast.show("PM Timesheet Insights Selected");
        },
        
        // Link handlers for LM tile - keep directly in time3 controller as they are specific to time3
        onLMApproveTimePress: function() {
            sap.m.MessageToast.show("LM Approve Time Selected");
        },
        
        onLMTimeReportsPress: function() {
            sap.m.MessageToast.show("LM Time Reports Selected");
        },
        
        onLMAssignmentLMPress: function() {
            sap.m.MessageToast.show("LM Assignment Report (LM) Selected");
        },
        
        onLMAssignmentPMPress: function() {
            sap.m.MessageToast.show("LM Assignment Report (PM) Selected");
        },
        
        onLMHomeWorkingPress: function() {
            sap.m.MessageToast.show("LM Home Working Report Selected");
        },
        
        onLMTimesheetInsightsPress: function() {
            sap.m.MessageToast.show("LM Timesheet Insights Selected");
        }
    });
}); 