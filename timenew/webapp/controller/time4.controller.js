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
            
            // Load the booking data model
            this._loadBookingDataModel();
            
            // Load the timesheet approval model
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
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("VALIDATION: Error loading booking data", textStatus, errorThrown);
                }
            });
            
            // Set the model to the view
            this.getView().setModel(oBookingModel, "bookingModel");
        },
        
        /**
         * Load Timesheet Approval Data Model
         * @private
         */
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

        /**
         * Handle timesheet approval item press
         * @param {sap.ui.base.Event} oEvent Event object
         */
        onTimesheetApprovalItemPress: function(oEvent) {
            var oItem = oEvent.getSource();
            var sTimesheetId = oItem.data("timesheetId");
            var oApprovalModel = this.getView().getModel("approvalModel");
            var aApprovals = oApprovalModel.getProperty("/timesheetApprovals");
            
            // Find the selected timesheet
            var oSelectedTimesheet = aApprovals.find(function(approval) {
                return approval.id === sTimesheetId;
            });
            
            if (oSelectedTimesheet) {
                // Show timesheet details in a dialog
                var oDialog = new Dialog({
                    title: "Timesheet Details - " + oSelectedTimesheet.employeeName,
                    contentWidth: "400px",
                    content: new VBox({
                        items: [
                            new HBox({
                                items: [
                                    new Label({ text: "Status: ", design: "Bold" }),
                                    new ObjectStatus({
                                        text: oSelectedTimesheet.status.charAt(0).toUpperCase() + oSelectedTimesheet.status.slice(1),
                                        state: oSelectedTimesheet.status === "approved" ? "Success" : 
                                               oSelectedTimesheet.status === "rejected" ? "Error" : "Warning",
                                        icon: oSelectedTimesheet.status === "approved" ? "sap-icon://accept" : 
                                              oSelectedTimesheet.status === "rejected" ? "sap-icon://error" : "sap-icon://alert"
                                    })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Employee ID: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.employeeId })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Week: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.week })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Total Hours: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.totalHours })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Submission Date: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.submissionDate })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Approver: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.approver || "Not yet approved" })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Approval Date: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.approvalDate || "N/A" })
                                ]
                            }),
                            new HBox({
                                items: [
                                    new Label({ text: "Comments: ", design: "Bold" }),
                                    new Text({ text: oSelectedTimesheet.comments || "None" })
                                ]
                            })
                        ],
                        class: "sapUiSmallMargin"
                    }),
                    beginButton: new Button({
                        text: "Close",
                        press: function() {
                            oDialog.close();
                        }
                    }),
                    afterClose: function() {
                        oDialog.destroy();
                    }
                });
                
                oDialog.open();
            }
        },
        
        // My Reports tile handlers
        onReportsTilePress: function() {
            this._tileActionsController.onReportsTilePress();
        },
        
        onTimeReportsPress: function() {
            this._tileActionsController.onTimeReportsPress();
        },
        
        onUtilizationReportsPress: function() {
            this._tileActionsController.onUtilizationReportsPress();
        },
        
        onProjectReportsPress: function() {
            this._tileActionsController.onProjectReportsPress();
        },

        // Approvals tile handlers
        onApprovalsTilePress: function() {
            this._showApprovalsList();
        },
        
        onViewAllApprovalsPress: function() {
            this._showApprovalsList();
        },
        
        _showApprovalsList: function() {
            var oApprovalModel = this.getView().getModel("approvalModel");
            
            // Create a dialog with the full list of approvals
            var oDialog = new Dialog({
                title: "Timesheet Approvals",
                contentWidth: "800px",
                contentHeight: "600px",
                content: new VBox({
                    items: [
                        new List({
                            items: {
                                path: "approvalModel>/timesheetApprovals",
                                template: new StandardListItem({
                                    title: "{approvalModel>employeeName} - {approvalModel>week}",
                                    description: "{approvalModel>totalHours} hours - Submitted: {approvalModel>submissionDate}",
                                    info: {
                                        path: "approvalModel>status",
                                        formatter: function(sStatus) {
                                            return sStatus.charAt(0).toUpperCase() + sStatus.slice(1);
                                        }
                                    },
                                    infoState: {
                                        path: "approvalModel>status",
                                        formatter: function(sStatus) {
                                            return sStatus === "approved" ? "Success" : 
                                                   sStatus === "rejected" ? "Error" : "Warning";
                                        }
                                    },
                                    firstStatus: new ObjectStatus({
                                        icon: {
                                            path: "approvalModel>status",
                                            formatter: function(sStatus) {
                                                return sStatus === "approved" ? "sap-icon://accept" : 
                                                       sStatus === "rejected" ? "sap-icon://error" : "sap-icon://alert";
                                            }
                                        },
                                        state: {
                                            path: "approvalModel>status",
                                            formatter: function(sStatus) {
                                                return sStatus === "approved" ? "Success" : 
                                                       sStatus === "rejected" ? "Error" : "Warning";
                                            }
                                        }
                                    }),
                                    type: "Active",
                                    press: function(oEvent) {
                                        var oItem = oEvent.getSource();
                                        var sPath = oItem.getBindingContext("approvalModel").getPath();
                                        var oSelectedItem = oApprovalModel.getProperty(sPath);
                                        this.onTimesheetApprovalItemPress({
                                            getSource: function() {
                                                return {
                                                    data: function() {
                                                        return oSelectedItem.id;
                                                    }
                                                };
                                            }
                                        });
                                    }.bind(this)
                                })
                            }
                        })
                    ],
                    class: "sapUiSmallMargin"
                }),
                beginButton: new Button({
                    text: "Close",
                    press: function() {
                        oDialog.close();
                    }
                }),
                afterClose: function() {
                    oDialog.destroy();
                }
            });
            
            oDialog.open();
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
            // Configure the booking VizFrame chart
            this._configureBookingChart();
            
            // Add a small delay to ensure the DOM is fully rendered
            setTimeout(function() {
                // Debug the booking tile chart specifically
                console.log("--- BOOKING TILE DEBUG ---");
                var bookingTile = document.getElementById("myBookingTile");
                if (bookingTile) {
                    console.log("Booking tile found, height: " + bookingTile.offsetHeight + "px");
                    
                    var chartContainer = document.getElementById("horizontalBarChart");
                    if (chartContainer) {
                        console.log("Chart container found, height: " + chartContainer.offsetHeight + "px");
                        
                        var chartRows = chartContainer.querySelectorAll(".chartRow");
                        console.log("Number of chart rows found: " + chartRows.length);
                        
                        for (var i = 0; i < chartRows.length; i++) {
                            var computedStyle = window.getComputedStyle(chartRows[i]);
                            console.log("Row " + (i+1) + " height: " + chartRows[i].offsetHeight + 
                                        "px, display: " + computedStyle.display + 
                                        ", visibility: " + computedStyle.visibility + 
                                        ", position: " + computedStyle.position);
                        }
                    } else {
                        console.log("Chart container not found");
                    }
                    
                    // Log the bookingModel data
                    var bookingModelData = this.getView().getModel("bookingModel");
                    if (bookingModelData) {
                        console.log("Booking model data:", bookingModelData.getData());
                    } else {
                        console.log("Booking model not found");
                    }
                } else {
                    console.log("Booking tile not found");
                }

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
                
                // Apply dynamic heights if needed
                this._balanceTileHeights(leftColumn, rightColumn);
            }.bind(this), 500);
        },
        
        // Helper method to balance tile heights if they're significantly different
        _balanceTileHeights: function(leftColumn, rightColumn) {
            var bookingTile = document.getElementById("myBookingTile");
            
            if (bookingTile) {
                // Ensure content is visible without forcing height
                var bookingTileContent = bookingTile.querySelector(".tileContent");
                var horizontalBarChart = bookingTile.querySelector(".horizontalBarChart");
                
                // Make sure the bar chart has proper visibility
                if (horizontalBarChart) {
                    // Count the number of chart rows
                    var chartRows = horizontalBarChart.querySelectorAll(".chartRow");
                    var itemCount = chartRows.length;
                    console.log("Number of chart rows found: " + itemCount);
                    
                    // Apply styles to make the chart fully visible
                    horizontalBarChart.style.maxHeight = "none";
                    horizontalBarChart.style.height = "auto";
                    horizontalBarChart.style.overflow = "visible";
                    
                    // Make sure each bar row is visible
                    if (chartRows && chartRows.length > 0) {
                        chartRows.forEach(function(row, index) {
                            row.style.display = "flex";
                            row.style.visibility = "visible";
                            
                            // Get the progress bar in this row
                            var progressBar = row.querySelector(".projectBar");
                            if (progressBar) {
                                progressBar.style.visibility = "visible";
                                progressBar.style.display = "block";
                            }
                        });
                    }
                }
                
                // Make sure content container is visible without fixed height
                if (bookingTileContent) {
                    bookingTileContent.style.maxHeight = "none";
                    bookingTileContent.style.overflow = "visible";
                }
                
                // Make sure the tile body is visible
                var tileBody = bookingTile.querySelector(".tileBody");
                if (tileBody) {
                    tileBody.style.maxHeight = "none";
                    tileBody.style.overflow = "visible";
                }
            }
            
            // Force all tiles to have proper heights
            var allTiles = document.querySelectorAll(".time4Tile");
            allTiles.forEach(function(tile) {
                if (tile.id !== "myBookingTile") {
                    // Set other tiles to a reasonable height
                    tile.style.minHeight = "12rem";
                }
            });
            
            // Balance columns based on actual content height
            console.log("Ensuring columns are balanced...");
            
            // Get the actual height of the booking tile
            var bookingTileHeight = bookingTile ? bookingTile.offsetHeight : 0;
            var targetHeight = Math.max(bookingTileHeight + 20, 300); // Ensure minimum height of 300px
            
            leftColumn.style.minHeight = targetHeight + "px";
            rightColumn.style.minHeight = targetHeight + "px";
            console.log("Set both column heights to: " + targetHeight + "px");
        },
        
        _configureBookingChart: function() {
            // Initialize formatter
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
            
            // Get reference to VizFrame and Popover
            var oVizFrame = this.getView().byId("bookingVizFrame");
            if (!oVizFrame) {
                // Try to find it in the fragment - this is necessary since the chart is in a fragment
                var bookingTileFragment = sap.ui.getCore().byId("bookingVizFrame");
                if (!bookingTileFragment) {
                    console.log("Could not find booking viz frame - will try again later");
                    // Schedule another attempt after the fragment is rendered
                    setTimeout(this._configureBookingChart.bind(this), 500);
                    return;
                }
                oVizFrame = bookingTileFragment;
            }
            
            console.log("Configuring booking chart");
            
            // Configure the chart properties for larger, more readable display
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        visible: true, // Show data labels
                        formatString: formatPattern.SHORTFLOAT_MFD2,
                        style: {
                            fontSize: "11px"
                        }
                    },
                    colorPalette: ['#0070b1', '#b7d4e5'], // Use Atos blue color scheme
                    dataShape: {
                        primaryAxis: ["bar"]
                    }
                },
                valueAxis: {
                    label: {
                        formatString: formatPattern.SHORTFLOAT,
                        style: {
                            fontSize: "11px"
                        }
                    },
                    title: {
                        visible: true,
                        text: "Days",
                        style: {
                            fontSize: "12px"
                        }
                    },
                    gridline: {
                        visible: true,
                        color: "#e5e5e5"
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    },
                    label: {
                        rotation: 0,
                        style: {
                            fontSize: "11px"
                        }
                    }
                },
                title: {
                    visible: false
                },
                legend: {
                    visible: true,
                    position: "bottom",
                    label: {
                        fontSize: "11px"
                    }
                },
                interaction: {
                    selectability: {
                        mode: "EXCLUSIVE"
                    }
                }
            });
            
            // Create a popover for detailed information on hover
            var oPopOver = sap.ui.getCore().byId("bookingPopOver");
            if (!oPopOver) {
                oPopOver = new sap.viz.ui5.controls.Popover({});
                oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
                oPopOver.connect(oVizFrame.getVizUid());
            } else {
                oPopOver.connect(oVizFrame.getVizUid());
                oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
            }
        }
    });
}); 