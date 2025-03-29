sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "timenew/controller/common/CalendarController",
    "timenew/controller/common/TileActionsController",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "sap/ui/core/Element",
    "sap/m/Dialog",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/Label",
    "sap/m/ObjectStatus",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/List",
    "sap/m/StandardListItem"
], function (Controller, CalendarController, TileActionsController, JSONModel, ChartFormatter, Format, Element, Dialog, VBox, HBox, Label, ObjectStatus, Button, Text, List, StandardListItem) {
    "use strict";

    return Controller.extend("timenew.controller.time4", {
        onInit: function () {
            console.log("VALIDATION: time4 controller initializing");
             
            // Load the booking data model
            this._loadBookingDataModel();
            
            // Load timesheet approval model
            this._loadTimeSheetApprovalModel();

            // Initialize the calendar controller
            this._calendarController = new CalendarController(this);
            console.log("VALIDATION: time4 - Calendar controller initialized");
             
            // Initialize the tile actions controller
            this._tileActionsController = new TileActionsController(this);
            console.log("VALIDATION: time4 - Tile actions controller initialized");
        },
        
        // Load booking data for the horizontal bar chart
        _loadBookingDataModel: function() {
            var oBookingModel = new JSONModel();
            
            // Load the booking data from the JSON file
            jQuery.ajax({
                url: sap.ui.require.toUrl("timenew/model/bookingData.json"),
                dataType: "json",
                success: function(oData) {
                    oBookingModel.setData(oData);
                    console.log("VALIDATION: Booking data loaded successfully");
                    
                    // Find the booking tile and set the model on it directly
                    var oBookingTile = sap.ui.getCore().byId(this.getView().getId() + "--bookingTileContainer");
                    if (oBookingTile) {
                        oBookingTile.setModel(oBookingModel);
                        
                        // Set the project array binding for the ComparisonMicroChart
                        setTimeout(function() {
                            try {
                                var oComparisonChart = sap.ui.getCore().byId(this.getView().getId() + "--projectComparisonChart");
                                if (oComparisonChart) {
                                    // Bind the projects array to the chart data
                                    var oBindingInfo = {
                                        path: "/projects",
                                        template: oComparisonChart.getAggregation("data")[0].clone(),
                                        templateShareable: true
                                    };
                                    oComparisonChart.bindAggregation("data", oBindingInfo);
                                    
                                    // Log success for project data binding
                                    console.log("VALIDATION: Project data binding applied to ComparisonMicroChart");
                                    
                                    // Apply custom colors using the customData from model
                                    setTimeout(function() {
                                        try {
                                            var aChartData = oComparisonChart.getAggregation("data");
                                            if (aChartData && aChartData.length > 0) {
                                                // Apply any additional customization to chart data items
                                                console.log("VALIDATION: Found " + aChartData.length + " chart data items");
                                            }
                                        } catch (e) {
                                            console.error("Error customizing chart data:", e);
                                        }
                                    }, 100);
                                } else {
                                    console.log("VALIDATION: Could not find project comparison chart");
                                }
                            } catch (e) {
                                console.error("Error setting chart binding:", e);
                            }
                        }.bind(this), 500);
                    }
                    
                    // Also set on the view with both named and unnamed models for flexibility
                    this.getView().setModel(oBookingModel, "bookingModel");
                    this.getView().setModel(oBookingModel);
                }.bind(this),
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("VALIDATION: Error loading booking data", textStatus, errorThrown);
                }
            });
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
        
        // Manage Bookings press
        onManageBookingsPress: function (oEvent) {
            this._tileActionsController.onViewBookingsPress();
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
            // Ensure calendar appointments with approval/rejection status are properly displayed
            var that = this;
            
            // Add a small delay to make sure calendar is rendered
            setTimeout(function() {
                // Check if we have approval data
                var oApprovalModel = that.getView().getModel("approvalModel");
                
                if (oApprovalModel) {
                    var aTimesheetApprovals = oApprovalModel.getProperty("/timesheetApprovals");
                    
                    if (aTimesheetApprovals && aTimesheetApprovals.length > 0) {
                        console.log("VALIDATION: Found " + aTimesheetApprovals.length + " timesheet approvals to display in calendar");
                        
                        // Refresh the calendar controller's model
                        if (that._calendarController) {
                            that._calendarController.refreshCalendarAppointments(aTimesheetApprovals);
                            
                            // Additionally, try to find the SinglePlanningCalendar control and update its model directly
                            try {
                                var spcId = that.getView().getId() + "--SPC1";
                                var oSPC = sap.ui.getCore().byId(spcId);
                                
                                if (oSPC) {
                                    console.log("VALIDATION: Found SinglePlanningCalendar control, ensuring model is set");
                                    // Get the model from the view - should have been updated by the refreshCalendarAppointments call
                                    var oModel = that.getView().getModel();
                                    if (oModel) {
                                        // Force the SPC to refresh by explicitly setting the model
                                        oSPC.setModel(oModel);
                                        console.log("VALIDATION: Explicitly set model on SinglePlanningCalendar");
                                    }
                                } else {
                                    console.log("WARNING: Could not find SinglePlanningCalendar control with ID: " + spcId);
                                }
                            } catch (e) {
                                console.error("Error updating SinglePlanningCalendar:", e);
                            }
                        }
                    } else {
                        console.log("VALIDATION: No timesheet approvals found in approval model");
                    }
                } else {
                    console.log("VALIDATION: Approval model not found in view");
                }
            }, 1000);
        }
    });
}); 