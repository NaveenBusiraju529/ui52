sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageToast"
], function (BaseObject, MessageToast) {
    "use strict";

    return BaseObject.extend("timenew.controller.common.TileActionsController", {
        /**
         * Constructor
         * @param {sap.ui.core.mvc.Controller} owner - The owner controller
         */
        constructor: function(owner) {
            console.log("VALIDATION: TileActionsController constructor called");
            this._owner = owner;
        },

        // General tile press events
        onTimesheetTilePress: function() {
            console.log("VALIDATION: Timesheet tile pressed in TileActionsController");
            MessageToast.show("Timesheet Tile Pressed");
        },

        onMyReportsTilePress: function() {
            console.log("VALIDATION: Reports tile pressed in TileActionsController");
            MessageToast.show("My Reports Tile Pressed");
        },
        
        onMyBookingTilePress: function() {
            console.log("VALIDATION: Booking tile pressed in TileActionsController");
            MessageToast.show("My Booking Tile Pressed");
        },
        
        onManageTeamTilePress: function() {
            console.log("VALIDATION: Team tile pressed in TileActionsController");
            MessageToast.show("Manage Team Tile Pressed");
        },
        
        onManageProjectTilePress: function() {
            console.log("VALIDATION: Project tile pressed in TileActionsController");
            MessageToast.show("Manage Project Tile Pressed");
        },

        // Timesheet tile actions
        onTimesheetEntryPress: function() {
            console.log("VALIDATION: Timesheet entry link pressed in TileActionsController");
            MessageToast.show("Timesheet Entry Selected");
        },

        // My Reports tile actions
        onActivityReportPress: function() {
            console.log("VALIDATION: Activity report link pressed in TileActionsController");
            MessageToast.show("Activity Report Selected");
        },

        onCustomerTimesheetPress: function() {
            console.log("VALIDATION: Customer timesheet link pressed in TileActionsController");
            MessageToast.show("Customer Timesheet Selected");
        },

        onHomeWorkingReportPress: function() {
            console.log("VALIDATION: Home working report link pressed in TileActionsController");
            MessageToast.show("Home Working Report Selected");
        },
        
        // My Booking tile actions
        onAddBookingPress: function() {
            console.log("VALIDATION: Add booking link pressed in TileActionsController");
            MessageToast.show("Add Booking Selected");
        },
        
        onViewBookingsPress: function() {
            console.log("VALIDATION: View bookings link pressed in TileActionsController");
            MessageToast.show("View Bookings Selected");
        },
        
        // Manage Team tile actions
        onTeamOverviewPress: function() {
            console.log("VALIDATION: Team overview link pressed in TileActionsController");
            MessageToast.show("Team Overview Selected");
        },
        
        onTeamCalendarPress: function() {
            console.log("VALIDATION: Team calendar link pressed in TileActionsController");
            MessageToast.show("Team Calendar Selected");
        },
        
        onApprovalsPress: function() {
            console.log("VALIDATION: Approvals link pressed in TileActionsController");
            MessageToast.show("Approvals Selected");
        },
        
        // Manage Project tile actions
        onProjectOverviewPress: function() {
            console.log("VALIDATION: Project overview link pressed in TileActionsController");
            MessageToast.show("Project Overview Selected");
        },
        
        onResourcePlanningPress: function() {
            console.log("VALIDATION: Resource planning link pressed in TileActionsController");
            MessageToast.show("Resource Planning Selected");
        },
        
        onProjectReportsPress: function() {
            console.log("VALIDATION: Project reports link pressed in TileActionsController");
            MessageToast.show("Project Reports Selected");
        }
    });
}); 