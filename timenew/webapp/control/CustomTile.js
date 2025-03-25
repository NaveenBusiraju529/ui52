sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/GenericTile"
], function (Control, GenericTile) {
    "use strict";

    return Control.extend("timenew.control.CustomTile", {
        metadata: {
            properties: {
                title: { type: "string", defaultValue: "" },
                icon: { type: "string", defaultValue: "" },
                press: { type: "function" }
            },
            events: {
                press: {}
            }
        },

        init: function () {
            // Initialize the control
        },

        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("customTile");
            oRm.openEnd();

            // Create and render GenericTile
            var oTile = new GenericTile({
                header: oControl.getTitle(),
                frameType: "OneByOne",
                press: function() {
                    oControl.firePress();
                }
            });

            if (oControl.getIcon()) {
                oTile.setTileIcon(oControl.getIcon());
            }

            oRm.renderControl(oTile);
            oRm.close("div");
        }
    });
});
