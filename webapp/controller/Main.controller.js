sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, library, JSONModel) {
    "use strict";
    var urlobject= library.URLHELPER;

    return Controller.extend("projetocodigodebarra.controller.Main", {
        onInit: function () { // Funciona como uma inicialização no ABAP
            let produto ={};
            let productModel = new JSONModel(produto);
            let view = this.getView();
            view.setModel(productModel,"Modeloproduto");

        },   
        onClickimage: function(oEvent){
            urlobject.redirect(oEvent.getSource(), true);
        },
        onpressBuscar: function(){
            let Input;
            Input = this.byId("inpbusca");
            let valor = Input.getValue();

            let parameters = {
                url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                method : "GET",
                async : true,
                crossDomain: true
            }

            $.ajax(parameters).done(function(response) { 

                let oprodutoModel = this.getView().getModel("Modeloproduto");
                // clear
                oprodutoModel.setData({});
                oprodutoModel.refresh();

                oprodutoModel.setData(response);
                oprodutoModel.refresh();
            }.bind(this)) // Sucess
            .fail(function(){
                debugger
            }); // exception 
        },
    });
});
