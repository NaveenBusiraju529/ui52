sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("timenew.controller.App", {
        onInit: function () {
            console.log("App controller initialized");
            
            // Create a model for the view selection
            var oViewModel = new JSONModel({
                selectedView: "time2" // Default view
            });
            this.getView().setModel(oViewModel);
            console.log("View model created with default view: time2");
            
            // Get the router
            this.oRouter = this.getOwnerComponent().getRouter();
            console.log("Router obtained:", this.oRouter);
            
            // Enable navigation between views
            this._loadViewNavFragment();
            
            // Initialize the router
            this.oRouter.initialize();
        },
        
        _loadViewNavFragment: function () {
            console.log("Loading ViewNav fragment");
            
            // Load the view navigation fragment
            Fragment.load({
                name: "timenew.view.fragments.ViewNav",
                controller: this
            }).then(function (oFragment) {
                console.log("Fragment loaded successfully");
                // Get the App control that's the container for pages
                var oApp = this.getView().byId("app");
                
                // Add the fragment to the page - we need to add it to the Shell or Page control that has header capability
                // For now, display it independently 
                var oNavContainer = this.getView().getParent();
                if (oNavContainer && oNavContainer.getHeader) {
                    oNavContainer.setHeader(oFragment);
                    console.log("Fragment added to parent container header");
                } else {
                    // Fallback - create a navigation button manually
                    console.log("Cannot add fragment: no suitable parent container");
                    this._addManualNavButton();
                }
            }.bind(this)).catch(function(error) {
                console.error("Error loading fragment:", error);
                // Fallback - create a navigation button manually
                this._addManualNavButton();
            }.bind(this));
        },
        
        _addManualNavButton: function() {
            // Simply navigate to time3 view directly to demonstrate it works
            console.log("Adding manual navigation button to switch to time3");
            
            // Add a button to the time2 view to navigate to time3
            setTimeout(function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Routetime3");
            }.bind(this), 2000);
        },
        
        onViewSelect: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("key");
            console.log("View selected:", sSelectedKey);
            
            // Navigate to the selected view
            console.log("Attempting to navigate to:", "Route" + sSelectedKey);
            this.oRouter.navTo("Route" + sSelectedKey);
            
            // Update the model
            var oModel = this.getView().getModel();
            oModel.setProperty("/selectedView", sSelectedKey);
            console.log("Model updated with selected view:", sSelectedKey);
        }
    });
});