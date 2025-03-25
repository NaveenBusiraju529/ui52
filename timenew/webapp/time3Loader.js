sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

    return {
        // Initialize the component and navigate directly to time3
        init: function () {
            sap.ui.require(["sap/ui/core/Component"], function (Component) {
                Component.create({
                    name: "timenew",
                    settings: {
                        id: "timenew"
                    }
                }).then(function (oComponent) {
                    // Create component container
                    new ComponentContainer({
                        component: oComponent
                    }).placeAt("content");
                    
                    // Navigate to time3 view
                    setTimeout(function() {
                        oComponent.getRouter().navTo("Routetime3");
                    }, 500);
                });
            });
        }
    };
}); 