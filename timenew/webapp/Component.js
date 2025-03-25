sap.ui.define([
    "sap/ui/core/UIComponent",
    "timenew/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("timenew.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            console.log("Component init called");

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            console.log("Device model set");

            // enable routing
            const router = this.getRouter();
            console.log("Router before initialization:", router);
            router.initialize();
            console.log("Router initialized");
            
            // Log the routes in the manifest
            console.log("Manifest routes:", this.getManifestEntry("sap.ui5").routing.routes);
        }
    });
});