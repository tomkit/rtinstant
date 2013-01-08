define(['views/bodyview'], function(BodyView) {
    var Router = Backbone.Router.extend({
        routes : {
//            '' : 'loadMain',
            '*actions' : 'loadRTInstant',
//            '/' : 'loadMain',
//            'rtinstant' : 'loadRTInstant',
//            'rtinstant/' : 'loadRTInstant',
//            'rtinstant/*actions' : 'loadRTInstant',
//            '/*actions' : 'loadMain'
        },
        
        initialize : function() {
            console.log('initialize');
            _.bindAll(this, 'loadMain', 'loadRTInstant');
        },
        
        loadRTInstant : function() {
            this.bodyView = new BodyView();
            console.log('loadRTInstant');
        },
        
        loadMain : function() {
            
            console.log('loadMain');
        }
    });
    
    return Router;
});