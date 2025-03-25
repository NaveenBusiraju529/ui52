sap.ui.define([
    "timenew/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "timenew/controller/common/CalendarController"
], (BaseController, JSONModel, MessageToast, CalendarController) => {
    "use strict";

    return BaseController.extend("timenew.controller.time2", {
        onInit() {
            console.log("VALIDATION: time2 controller initializing");
            
            // Initialize the calendar controller
            this._calendarController = new CalendarController(this);
            console.log("VALIDATION: time2 - Calendar controller initialized");
            
            // Try to set content density, but handle if component is not available
            try {
                if (this.getOwnerComponent() && this.getOwnerComponent().getContentDensityClass) {
                    this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
                }
            } catch (e) {
                console.log("Could not set content density class: " + e.message);
            }
        },
        
        // Timesheet Tile handlers
        onTimesheetTilePress: function() {
            MessageToast.show(this.getResourceBundle().getText("timesheetTilePressed"));
            // Navigation to Entry page
            this._navigateToTimeEntry();
        },
        
        _navigateToTimeEntry: function() {
            MessageToast.show("Navigating to Time Entry");
            // Implement navigation logic here
        },
        
        // My Reports Tile handlers
        onMyReportsTilePress: function() {
            MessageToast.show(this.getResourceBundle().getText("myReportsTilePressed"));
            // Show options dialog or navigate to default report
            this._showReportOptions();
        },
        
        _showReportOptions: function() {
            MessageToast.show("Showing Report Options");
            // Implement dialog or navigation logic here
        },
        
        // My Reports specific link handlers
        onActivityReportPress: function() {
            MessageToast.show("Navigating to Activity Report");
            this._navigateToFeature("ActivityReport");
        },
        
        onCustomerTimesheetPress: function() {
            MessageToast.show("Navigating to Customer Timesheet");
            this._navigateToFeature("CustomerTimesheet");
        },
        
        onHomeWorkingReportPress: function() {
            MessageToast.show("Navigating to Home Working Report");
            this._navigateToFeature("HomeWorkingReport");
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
        
        // Navigation
        onNavToTime3: function () {
            // Get router
            const oRouter = this.getOwnerComponent().getRouter();
            // Navigate to time3 view
            oRouter.navTo("Routetime3");
        },
        
        _navigateToFeature: function(sFeatureName) {
            // To be implemented
            console.log("Navigate to feature: " + sFeatureName);
        }
    });
});