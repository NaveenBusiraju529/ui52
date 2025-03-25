sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "timenew/controller/common/CalendarController",
    "timenew/controller/common/TileActionsController"
], function (Controller, CalendarController, TileActionsController) {
    "use strict";

    // Define day types as constants
    var CalendarDayType = {
        Type01: "Type01",
        Type02: "Type02",
        Type03: "Type03",
        Type04: "Type04",
        Type05: "Type05"
    };

    return Controller.extend("timenew.controller.time4", {
        onInit: function () {
            console.log("VALIDATION: time4 controller initializing");
            
            // Initialize the calendar controller
            this._calendarController = new CalendarController(this);
            console.log("VALIDATION: time4 - Calendar controller initialized");
            
            // Initialize the tile actions controller
            this._tileActionsController = new TileActionsController(this);
            console.log("VALIDATION: time4 - Tile actions controller initialized");
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
        
        onMyBookingTilePress: function (oEvent) {
            this._tileActionsController.onMyBookingTilePress();
        },
        
        onManageTeamTilePress: function (oEvent) {
            this._tileActionsController.onManageTeamTilePress();
        },
        
        onManageProjectTilePress: function (oEvent) {
            this._tileActionsController.onManageProjectTilePress();
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
        
        // My Booking tile actions
        onAddBookingPress: function (oEvent) {
            this._tileActionsController.onAddBookingPress();
        },
        
        onViewBookingsPress: function (oEvent) {
            this._tileActionsController.onViewBookingsPress();
        },
        
        // Manage Team tile actions
        onTeamOverviewPress: function (oEvent) {
            this._tileActionsController.onTeamOverviewPress();
        },
        
        onTeamCalendarPress: function (oEvent) {
            this._tileActionsController.onTeamCalendarPress();
        },
        
        onApprovalsPress: function (oEvent) {
            this._tileActionsController.onApprovalsPress();
        },
        
        // Manage Project tile actions
        onProjectOverviewPress: function (oEvent) {
            this._tileActionsController.onProjectOverviewPress();
        },
        
        onResourcePlanningPress: function (oEvent) {
            this._tileActionsController.onResourcePlanningPress();
        },
        
        onProjectReportsPress: function (oEvent) {
            this._tileActionsController.onProjectReportsPress();
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
        
        onAfterRendering: function() {
            // Add a small delay to ensure the DOM is fully rendered
            setTimeout(function() {
                // Log heights of left column tiles
                var leftTiles = document.querySelectorAll(".time4TileColumn:first-child .time4Tile");
                console.log("--- LEFT COLUMN TILES ---");
                var leftTotalHeight = 0;
                var leftTotalWithMargins = 0;
                for (var i = 0; i < leftTiles.length; i++) {
                    var height = leftTiles[i].offsetHeight;
                    var style = window.getComputedStyle(leftTiles[i]);
                    var marginBottom = parseInt(style.marginBottom, 10);
                    console.log("Left tile " + (i+1) + " height: " + height + "px, margin-bottom: " + marginBottom + "px");
                    leftTotalHeight += height;
                    leftTotalWithMargins += height + (i < leftTiles.length - 1 ? marginBottom : 0);
                }
                console.log("Total left tiles height: " + leftTotalHeight + "px");
                console.log("Total left tiles height with margins: " + leftTotalWithMargins + "px");
                
                // Log heights of right column tiles
                var rightTiles = document.querySelectorAll(".time4TileColumn:last-child .time4Tile");
                console.log("--- RIGHT COLUMN TILES ---");
                var rightTotalHeight = 0;
                var rightTotalWithMargins = 0;
                for (var i = 0; i < rightTiles.length; i++) {
                    var height = rightTiles[i].offsetHeight;
                    var style = window.getComputedStyle(rightTiles[i]);
                    var marginBottom = parseInt(style.marginBottom, 10);
                    console.log("Right tile " + (i+1) + " height: " + height + "px, margin-bottom: " + marginBottom + "px");
                    rightTotalHeight += height;
                    rightTotalWithMargins += height + (i < rightTiles.length - 1 ? marginBottom : 0);
                }
                console.log("Total right tiles height: " + rightTotalHeight + "px");
                console.log("Total right tiles height with margins: " + rightTotalWithMargins + "px");
                
                // Log column heights
                var leftColumn = document.querySelector(".time4TileColumn:first-child");
                var rightColumn = document.querySelector(".time4TileColumn:last-child");
                console.log("Left column height: " + leftColumn.offsetHeight + "px");
                console.log("Right column height: " + rightColumn.offsetHeight + "px");
                
                // Check if the heights are balanced
                console.log("--- HEIGHT COMPARISON ---");
                console.log("Height difference (without margins): " + Math.abs(leftTotalHeight - rightTotalHeight) + "px");
                console.log("Height difference (with margins): " + Math.abs(leftTotalWithMargins - rightTotalWithMargins) + "px");
                
                // Check calculations
                var leftColumnHeight = leftColumn.offsetHeight;
                console.log("--- CALCULATIONS ---");
                console.log("Expected left tile height: " + ((leftColumnHeight - 10)/3) + "px");
                console.log("Expected right tile height: " + ((leftColumnHeight - 5)/2) + "px");
            }, 500);
        }
    });
}); 