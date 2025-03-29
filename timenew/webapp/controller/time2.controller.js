sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "timenew/controller/common/CalendarController",
    "timenew/controller/common/TileActionsController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, CalendarController, TileActionsController, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("timenew.controller.time2", {
        onInit: function () {
            console.log("VALIDATION: time2 controller initializing");
             
            // Initialize the calendar controller
            this._calendarController = new CalendarController(this);
            console.log("VALIDATION: time2 - Calendar controller initialized");
             
            // Initialize the tile actions controller
            this._tileActionsController = new TileActionsController(this);
            console.log("VALIDATION: time2 - Tile actions controller initialized");
            
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

        // Navigation methods
        onNavToTime3: function() {
            // Get the router
            var oRouter = this.getOwnerComponent().getRouter();
            // Navigate to time3 view
            oRouter.navTo("Routetime3");
        },
        
        // General tile press events - delegated to tile actions controller
        onTimesheetTilePress: function (oEvent) {
            this._tileActionsController.onTimesheetTilePress();
        },

        onMyReportsTilePress: function (oEvent) {
            this._tileActionsController.onMyReportsTilePress();
        },
        
        onTeamManageTilePress: function (oEvent) {
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
        }
    });
});