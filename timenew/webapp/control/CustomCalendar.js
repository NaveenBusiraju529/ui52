sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/SinglePlanningCalendar"
], function (Control, SinglePlanningCalendar) {
    "use strict";

    return Control.extend("timenew.control.CustomCalendar", {
        metadata: {
            properties: {
                title: { type: "string", defaultValue: "Calendar" },
                startDate: { type: "object", defaultValue: new Date() }
            },
            aggregations: {
                appointments: { type: "sap.ui.unified.CalendarAppointment", multiple: true, singularName: "appointment" }
            },
            events: {
                appointmentSelect: {}
            }
        },

        init: function () {
            // Initialize the control
        },

        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("customCalendar");
            oRm.openEnd();

            // Create and render SinglePlanningCalendar
            var oCalendar = new SinglePlanningCalendar({
                title: oControl.getTitle(),
                startDate: oControl.getStartDate(),
                appointmentSelect: function(oEvent) {
                    oControl.fireAppointmentSelect({
                        appointment: oEvent.getParameter("appointment")
                    });
                }
            });

            // Add appointments from the aggregation
            var aAppointments = oControl.getAppointments();
            if (aAppointments && aAppointments.length > 0) {
                var oGrid = oCalendar.getAggregation("_grid");
                if (oGrid) {
                    aAppointments.forEach(function(oAppointment) {
                        oGrid.addAppointment(oAppointment);
                    });
                }
            }

            oRm.renderControl(oCalendar);
            oRm.close("div");
        }
    });
});
