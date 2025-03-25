sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/unified/CalendarLegendItem",
    "sap/ui/unified/DateTypeRange",
    "sap/ui/core/format/DateFormat",
    "sap/m/Dialog",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/DateTimePicker",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/m/Button"
], function (BaseObject, JSONModel, MessageToast, CalendarLegendItem, DateTypeRange, DateFormat,
    Dialog, Label, Input, DateTimePicker, Select, Item, Button) {
    "use strict";

    // Define day types as constants
    var CalendarDayType = {
        Type01: "Type01",
        Type02: "Type02",
        Type03: "Type03",
        Type04: "Type04",
        Type05: "Type05",
        Type06: "Type06",
        Type07: "Type07",
        Type08: "Type08"
    };

    return BaseObject.extend("timenew.controller.common.CalendarController", {
        /**
         * Constructor
         * @param {sap/ui/core.mvc.Controller} owner - The owner controller
         */
        constructor: function(owner) {
            console.log("VALIDATION: Calendar controller constructor called");
            this._owner = owner;
            this._initCalendarModel();
            console.log("VALIDATION: Calendar model initialized");
        },
        
        /**
         * Initialize the calendar model with sample data
         * @private
         */
        _initCalendarModel: function() {
            console.log("VALIDATION: Initializing calendar model");
            
            var oDate = new Date();
            var oStartDate = new Date(oDate.getFullYear(), oDate.getMonth(), 1);
            
            var oModel = new JSONModel();
            
            // Define appointment types for legend
            var aAppointmentTypes = [{
                type: CalendarDayType.Type01,
                title: "Client Work",
                color: "#0070b1"  // Atos blue
            }, {
                type: CalendarDayType.Type02,
                title: "Internal Meetings",
                color: "#1d2d3e"  // Atos dark blue
            }, {
                type: CalendarDayType.Type03,
                title: "Training",
                color: "#00BB00"
            }, {
                type: CalendarDayType.Type04,
                title: "Administration",
                color: "#FFA500"
            }, {
                type: CalendarDayType.Type05,
                title: "Public Holiday",
                color: "#6B1C9E"
            }, {
                type: CalendarDayType.Type06,
                title: "Approved Timesheet",
                color: "#2b7d2b"  // Green for approved
            }, {
                type: CalendarDayType.Type07,
                title: "Rejected Timesheet",
                color: "#bb0000"  // Red for rejected
            }, {
                type: CalendarDayType.Type08,
                title: "Pending Timesheet",
                color: "#e78c07"  // Orange for pending
            }];

            // Initialize with an empty appointments array instead of sample appointments
            var aAppointments = [];
            
            // Load timesheet approvals from the model and create appointments
            this._loadTimesheetAppointments(function(aTimesheetAppointments) {
                if (aTimesheetAppointments && aTimesheetAppointments.length > 0) {
                    aAppointments = aTimesheetAppointments;
                }
                
                oModel.setData({
                    startDate: oStartDate,
                    appointments: aAppointments,
                    appointmentTypes: aAppointmentTypes,
                    viewKey: "Month"  // Set Month as default view
                });
                
                console.log("VALIDATION: Calendar model initialized with " + aAppointments.length + " appointments");
            });

            this._owner.getView().setModel(oModel);
        },
        
        /**
         * Load timesheet data from approval model and convert to calendar appointments
         * @private
         * @param {Function} fnCallback Callback function to handle appointment data
         */
        _loadTimesheetAppointments: function(fnCallback) {
            var that = this;
            jQuery.ajax({
                url: sap.ui.require.toUrl("timenew/model/timesheetApprovals.json"),
                dataType: "json",
                success: function(oData) {
                    var aTimesheetApprovals = oData.timesheetApprovals || [];
                    var aAppointments = that._convertTimesheetsToAppointments(aTimesheetApprovals);
                    fnCallback(aAppointments);
                },
                error: function(err) {
                    console.log("ERROR: Failed to load timesheet approvals for calendar", err);
                    fnCallback([]);
                }
            });
        },
        
        /**
         * Convert timesheet data to calendar appointments with status indicators
         * @private
         * @param {Array} aTimesheets Timesheet data
         * @returns {Array} Calendar appointments
         */
        _convertTimesheetsToAppointments: function(aTimesheets) {
            var aAppointments = [];
            
            aTimesheets.forEach(function(oTimesheet) {
                // Determine type based on status
                var sType = CalendarDayType.Type08; // Default is Type08 (pending)
                var sIcon = "sap-icon://alert"; // Default icon for pending
                
                if (oTimesheet.status === "approved") {
                    sType = CalendarDayType.Type06; // Type06 for approved
                    sIcon = "sap-icon://accept"; // Checkmark for approved
                } else if (oTimesheet.status === "rejected") {
                    sType = CalendarDayType.Type07; // Type07 for rejected
                    sIcon = "sap-icon://error"; // Error icon for rejected
                }
                
                // Parse the date string to create Date objects
                var oDateParts = oTimesheet.date.split("-");
                var oStartDate = new Date(parseInt(oDateParts[0]), parseInt(oDateParts[1]) - 1, parseInt(oDateParts[2]), 9, 0); // 9 AM start
                var oEndDate = new Date(parseInt(oDateParts[0]), parseInt(oDateParts[1]) - 1, parseInt(oDateParts[2]), 17, 0);  // 5 PM end
                
                // Create a calendar appointment for this day
                var oAppointment = {
                    text: oTimesheet.project + " (" + oTimesheet.hours + " hrs)",
                    type: sType,
                    icon: sIcon,
                    startDate: oStartDate,
                    endDate: oEndDate,
                    timesheetId: oTimesheet.id
                };
                
                aAppointments.push(oAppointment);
            });
            
            return aAppointments;
        },

        /**
         * Handle appointment selection event
         * @param {sap.ui.base.Event} oEvent - The event object
         */
        onAppointmentSelect: function(oEvent) {
            console.log("VALIDATION: Appointment select event received in CalendarController");
            
            var oAppointment = oEvent.getParameter("appointment");
            if (oAppointment) {
                // Get the appointment data
                var oBindingContext = oAppointment.getBindingContext();
                var oAppointmentData = oBindingContext.getObject();
                
                // Find the corresponding timesheet entry
                this._showTimesheetDetails(oAppointmentData.timesheetId);
            } else {
                var aAppointments = oEvent.getParameter("appointments");
                MessageToast.show(aAppointments.length + " appointments selected");
            }
        },
        
        /**
         * Show timesheet details dialog
         * @param {string} sTimesheetId - Timesheet ID to show details for
         * @private
         */
        _showTimesheetDetails: function(sTimesheetId) {
            var that = this;
            
            // Load timesheet data
            jQuery.ajax({
                url: sap.ui.require.toUrl("timenew/model/timesheetApprovals.json"),
                dataType: "json",
                success: function(oData) {
                    // Find the timesheet entry by ID
                    var aTimesheetApprovals = oData.timesheetApprovals || [];
                    var oTimesheet = null;
                    
                    for (var i = 0; i < aTimesheetApprovals.length; i++) {
                        if (aTimesheetApprovals[i].id === sTimesheetId) {
                            oTimesheet = aTimesheetApprovals[i];
                            break;
                        }
                    }
                    
                    if (!oTimesheet) {
                        MessageToast.show("Timesheet details not found");
                        return;
                    }
                    
                    // Determine status icon and state
                    var sIcon = "sap-icon://alert";
                    var sState = "Warning";
                    
                    if (oTimesheet.status === "approved") {
                        sIcon = "sap-icon://accept";
                        sState = "Success";
                    } else if (oTimesheet.status === "rejected") {
                        sIcon = "sap-icon://error";
                        sState = "Error";
                    }
                    
                    // Create a dialog to show timesheet details
                    var oDialog = new sap.m.Dialog({
                        title: "Timesheet Details - " + oTimesheet.date,
                        contentWidth: "400px",
                        content: [
                            new sap.m.VBox({
                                items: [
                                    new sap.m.ObjectHeader({
                                        title: oTimesheet.dayOfWeek,
                                        number: oTimesheet.hours,
                                        numberUnit: "hours",
                                        attributes: [
                                            new sap.m.ObjectAttribute({
                                                title: "Project",
                                                text: oTimesheet.project
                                            })
                                        ],
                                        statuses: [
                                            new sap.m.ObjectStatus({
                                                text: oTimesheet.status.charAt(0).toUpperCase() + oTimesheet.status.slice(1),
                                                state: sState,
                                                icon: sIcon
                                            })
                                        ]
                                    }),
                                    new sap.m.Panel({
                                        headerText: "Approval Information",
                                        expandable: false,
                                        expanded: true,
                                        content: [
                                            new sap.m.List({
                                                items: [
                                                    new sap.m.DisplayListItem({
                                                        label: "Approver",
                                                        value: oTimesheet.approver || "Not yet approved"
                                                    }),
                                                    new sap.m.DisplayListItem({
                                                        label: "Approval Date",
                                                        value: oTimesheet.approvalDate || "Not yet approved"
                                                    }),
                                                    new sap.m.DisplayListItem({
                                                        label: "Comments",
                                                        value: oTimesheet.comments || "No comments"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ],
                                class: "sapUiSmallMargin"
                            })
                        ],
                        beginButton: new sap.m.Button({
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
                error: function(err) {
                    console.log("ERROR: Failed to load timesheet approvals for details", err);
                    MessageToast.show("Failed to load timesheet details");
                }
            });
        },
        
        /**
         * Handle appointment creation dialog
         */
        handleAppointmentCreateDialog: function() {
            console.log("VALIDATION: Create appointment dialog requested in CalendarController");
            
            // Open the appointment creation dialog with default dates (now and one hour later)
            var oStartDate = new Date();
            var oEndDate = new Date();
            oEndDate.setHours(oEndDate.getHours() + 1);
            
            this._openAppointmentDialog(oStartDate, oEndDate);
        },

        /**
         * Handle appointment edit
         */
        handleAppointmentEdit: function() {
            console.log("VALIDATION: Edit appointment requested in CalendarController");
            
            // Check if an appointment is selected
            if (!this._selectedAppointment) {
                MessageToast.show("Please select an appointment to edit");
                return;
            }
            
            // Get the appointment data
            var oBindingContext = this._selectedAppointment.getBindingContext();
            var oAppointment = oBindingContext.getObject();
            
            // Open the appointment dialog with the appointment data
            this._openAppointmentDialog(oAppointment.startDate, oAppointment.endDate, oAppointment);
        },
        
        /**
         * Open appointment dialog for create or edit
         * @param {Date} oStartDate - Start date of the appointment
         * @param {Date} oEndDate - End date of the appointment
         * @param {Object} oAppointment - Appointment data (optional, for edit mode)
         * @private
         */
        _openAppointmentDialog: function(oStartDate, oEndDate, oAppointment) {
            console.log("VALIDATION: Opening appointment dialog, edit mode:", !!oAppointment);
            
            var that = this;
            
            // Create a dialog for appointment creation/editing
            var oDialog = new Dialog({
                title: oAppointment ? "Edit Appointment" : "Create Appointment",
                contentWidth: "400px",
                content: [
                    new Label({
                        text: "Title",
                        labelFor: "titleInput"
                    }),
                    new Input("titleInput", {
                        width: "100%",
                        value: oAppointment ? oAppointment.title : ""
                    }),
                    new Label({
                        text: "Description",
                        labelFor: "descInput"
                    }),
                    new Input("descInput", {
                        width: "100%",
                        value: oAppointment ? oAppointment.text : ""
                    }),
                    new Label({
                        text: "Type",
                        labelFor: "typeSelect"
                    }),
                    new Select("typeSelect", {
                        width: "100%",
                        items: {
                            path: "/appointmentTypes",
                            template: new Item({
                                key: "{type}",
                                text: "{title}"
                            })
                        },
                        selectedKey: oAppointment ? oAppointment.type : "Type01"
                    }),
                    new Label({
                        text: "Start Date",
                        labelFor: "startDatePicker"
                    }),
                    new DateTimePicker("startDatePicker", {
                        width: "100%",
                        dateValue: oStartDate
                    }),
                    new Label({
                        text: "End Date",
                        labelFor: "endDatePicker"
                    }),
                    new DateTimePicker("endDatePicker", {
                        width: "100%",
                        dateValue: oEndDate
                    })
                ],
                beginButton: new Button({
                    text: "Save",
                    type: "Emphasized",
                    press: function() {
                        // Get the values from the dialog
                        var sTitle = sap.ui.getCore().byId("titleInput").getValue();
                        var sDesc = sap.ui.getCore().byId("descInput").getValue();
                        var sType = sap.ui.getCore().byId("typeSelect").getSelectedKey();
                        var oStartDate = sap.ui.getCore().byId("startDatePicker").getDateValue();
                        var oEndDate = sap.ui.getCore().byId("endDatePicker").getDateValue();
                        
                        // Validate input
                        if (!sTitle || !oStartDate || !oEndDate) {
                            MessageToast.show("Please fill all required fields");
                            return;
                        }
                        
                        if (oEndDate < oStartDate) {
                            MessageToast.show("End date must be after start date");
                            return;
                        }
                        
                        // Create or update appointment
                        if (oAppointment) {
                            // Update existing appointment
                            oAppointment.title = sTitle;
                            oAppointment.text = sDesc;
                            oAppointment.type = sType;
                            oAppointment.startDate = oStartDate;
                            oAppointment.endDate = oEndDate;
                            
                            // Refresh the model to update the UI
                            that._owner.getView().getModel().refresh(true);
                            MessageToast.show("Appointment updated");
                        } else {
                            // Create new appointment
                            var oNewAppointment = {
                                title: sTitle,
                                text: sDesc,
                                type: sType,
                                startDate: oStartDate,
                                endDate: oEndDate
                            };
                            
                            // Add to the model
                            var oModel = that._owner.getView().getModel();
                            var aAppointments = oModel.getProperty("/appointments");
                            aAppointments.push(oNewAppointment);
                            oModel.setProperty("/appointments", aAppointments);
                            MessageToast.show("Appointment created");
                        }
                        
                        // Close the dialog
                        oDialog.close();
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
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

        /**
         * Handle cancel button press
         */
        handleCancel: function() {
            console.log("VALIDATION: Cancel action in CalendarController");
            MessageToast.show("Action cancelled");
        },
        
        /**
         * Delete the selected appointment
         */
        handleAppointmentDelete: function() {
            console.log("VALIDATION: Delete appointment requested in CalendarController");
            
            // Check if an appointment is selected
            if (!this._selectedAppointment) {
                MessageToast.show("Please select an appointment to delete");
                return;
            }
            
            // Get the appointment data
            var oBindingContext = this._selectedAppointment.getBindingContext();
            var oAppointment = oBindingContext.getObject();
            var iIndex = parseInt(oBindingContext.getPath().split("/").pop(), 10);
            
            // Remove from the model
            var oModel = this._owner.getView().getModel();
            var aAppointments = oModel.getProperty("/appointments");
            aAppointments.splice(iIndex, 1);
            oModel.setProperty("/appointments", aAppointments);
            
            // Clear the selected appointment
            this._selectedAppointment = null;
            
            MessageToast.show("Appointment deleted");
        }
    });
}); 