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
        Type05: "Type05"
    };

    return BaseObject.extend("timenew.controller.common.CalendarController", {
        /**
         * Constructor
         * @param {sap.ui.core.mvc.Controller} owner - The owner controller
         */
        constructor: function(owner) {
            console.log("VALIDATION: Calendar controller constructor called");
            this._owner = owner;
            this._selectedAppointment = null;
            this._initCalendarModel();
        },

        /**
         * Initialize the calendar model with sample data
         * @private
         */
        _initCalendarModel: function() {
            var oModel = new JSONModel();
            var oDate = new Date();
            var oStartDate = new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(), 8, 0);

            // Sample appointment types
            var aAppointmentTypes = [{
                type: CalendarDayType.Type01,
                title: "Client Meeting",
                color: "#FF0000"
            }, {
                type: CalendarDayType.Type02,
                title: "Internal Meeting",
                color: "#0070F2"
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
            }];

            // Sample appointments
            var aAppointments = [{
                title: "Client Meeting",
                text: "ACME Inc.",
                type: CalendarDayType.Type01,
                startDate: new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(), 9, 0),
                endDate: new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(), 10, 30)
            }, {
                title: "Internal Meeting",
                text: "Team Sync",
                type: CalendarDayType.Type02,
                startDate: new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate() + 1, 10, 0),
                endDate: new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate() + 1, 11, 30)
            }, {
                title: "Training",
                text: "SAPUI5 Advanced",
                type: CalendarDayType.Type03,
                startDate: new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate() + 2, 13, 0),
                endDate: new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate() + 2, 17, 30)
            }];

            oModel.setData({
                startDate: oStartDate,
                appointments: aAppointments,
                appointmentTypes: aAppointmentTypes,
                viewKey: "Month"  // Set Month as default view
            });

            this._owner.getView().setModel(oModel);
            
            console.log("VALIDATION: Calendar model initialized with " + aAppointments.length + " appointments");
        },

        /**
         * Handle appointment selection event
         * @param {sap.ui.base.Event} oEvent - The event object
         */
        onAppointmentSelect: function(oEvent) {
            console.log("VALIDATION: Appointment select event received in CalendarController");
            
            var oAppointment = oEvent.getParameter("appointment");
            if (oAppointment) {
                // Store the selected appointment for editing
                this._selectedAppointment = oAppointment;
                MessageToast.show("Appointment selected: " + oAppointment.getTitle());
            } else {
                var aAppointments = oEvent.getParameter("appointments");
                MessageToast.show(aAppointments.length + " appointments selected");
                
                // Clear the selected appointment
                this._selectedAppointment = null;
            }
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