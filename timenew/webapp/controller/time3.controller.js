sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "timenew/controller/common/CalendarController",
    "timenew/controller/common/TileActionsController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, CalendarController, TileActionsController, JSONModel, MessageToast) {
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
            
            // Load timesheet approval model
            this._loadTimeSheetApprovalModel();
        },
        
        _loadTimeSheetApprovalModel: function() {
            var oApprovalModel = new JSONModel();
            jQuery.ajax({
                url: sap.ui.require.toUrl("timenew/model/timesheetApprovals.json"),
                dataType: "json",
                success: function(oData) {
                    oApprovalModel.setData(oData);
                    this.getView().setModel(oApprovalModel, "approvalModel");
                    console.log("VALIDATION: Timesheet approval model loaded");
                }.bind(this),
                error: function(error) {
                    console.log("ERROR: Failed to load timesheet approval model", error);
                }
            });
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

        // General tile press events - delegated to tile actions controller
        onTimesheetTilePress: function (oEvent) {
            this._tileActionsController.onTimesheetTilePress();
        },

        onMyReportsTilePress: function (oEvent) {
            this._tileActionsController.onMyReportsTilePress();
        },
        
        onManageTeamTilePress: function (oEvent) {
            this._tileActionsController.onManageTeamTilePress();
        },
        
        onLMTilePress: function (oEvent) {
            this._tileActionsController.onManageTeamTilePress();
        },

        // Timesheet tile actions
        onTimesheetEntryPress: function (oEvent) {
            this._tileActionsController.onTimesheetEntryPress();
        },

        // My Reports tile actions
        onActivityReportPress: function (oEvent) {
            this._tileActionsController.onActivityReportPress();
        },

        onCustomerTimesheetPress: function (oEvent) {
            this._tileActionsController.onCustomerTimesheetPress();
        },

        onHomeWorkingReportPress: function (oEvent) {
            this._tileActionsController.onHomeWorkingReportPress();
        },
        
        // Team Management tile actions
        onTeamOverviewPress: function (oEvent) {
            this._tileActionsController.onTeamOverviewPress();
        },
        
        onTeamCalendarPress: function (oEvent) {
            this._tileActionsController.onTeamCalendarPress();
        },
        
        onApprovalsPress: function (oEvent) {
            this._tileActionsController.onApprovalsPress();
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
        onPMTilePress: function() {
            sap.m.MessageToast.show("Project Manager Tile Pressed");
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