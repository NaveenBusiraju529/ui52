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
            
            // Get the booking model data
            var oView = this._owner.getView();
            var oModel = oView.getModel("bookingModel");
            
            if (oModel) {
                var oData = oModel.getData();
                var totalAllocated = 0;
                var totalFilled = 0;
                var projectSummary = "";
                
                // Calculate totals and build project summary
                oData.projects.forEach(function(project, index) {
                    totalAllocated += project.allocatedDays;
                    totalFilled += project.filledDays;
                    
                    // Calculate completion percentage
                    var completion = Math.round((project.filledDays / project.allocatedDays) * 100);
                    
                    // Add to summary string
                    projectSummary += project.projectName + ": " + 
                                     project.filledDays + "/" + project.allocatedDays + 
                                     " days (" + completion + "%)\n";
                });
                
                // Calculate total completion percentage
                var totalCompletion = Math.round((totalFilled / totalAllocated) * 100);
                
                // Show a dialog with the detailed information
                if (!this._oBookingDialog) {
                    this._oBookingDialog = new sap.m.Dialog({
                        title: "Booking Details for " + oData.month,
                        contentWidth: "400px",
                        content: [
                            new sap.m.VBox({
                                items: [
                                    new sap.m.Text({
                                        text: "Project Allocations:"
                                    }).addStyleClass("sapUiSmallMarginBottom sapUiSmallMarginTop dialogTitle"),
                                    new sap.m.TextArea({
                                        value: projectSummary,
                                        rows: 6,
                                        width: "100%",
                                        editable: false
                                    }),
                                    new sap.m.Text({
                                        text: "Summary:"
                                    }).addStyleClass("sapUiSmallMarginBottom sapUiSmallMarginTop dialogTitle"),
                                    new sap.m.Text({
                                        text: "Total Projects: " + oData.projects.length
                                    }),
                                    new sap.m.Text({
                                        text: "Total Days Allocated: " + totalAllocated
                                    }),
                                    new sap.m.Text({
                                        text: "Total Days Filled: " + totalFilled
                                    }),
                                    new sap.m.Text({
                                        text: "Total Completion: " + totalCompletion + "%"
                                    }).addStyleClass("sapUiSmallMarginBottom")
                                ]
                            }).addStyleClass("sapUiContentPadding")
                        ],
                        beginButton: new sap.m.Button({
                            text: "Close",
                            press: function () {
                                this._oBookingDialog.close();
                            }.bind(this)
                        }),
                        afterClose: function() {
                            // Update dialog content on close for next time
                            var textArea = this._oBookingDialog.getContent()[0].getItems()[1];
                            textArea.setValue(projectSummary);
                            
                            // Update title
                            this._oBookingDialog.setTitle("Booking Details for " + oData.month);
                        }.bind(this)
                    });
                    
                    // Add dialog to owner view for lifecycle management
                    oView.addDependent(this._oBookingDialog);
                }
                
                // Open the dialog
                this._oBookingDialog.open();
            } else {
                MessageToast.show("Booking data not available");
            }
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