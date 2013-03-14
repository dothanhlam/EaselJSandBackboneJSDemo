/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 3/12/13
 * Time: 11:24 PM
 * To change this template use File | Settings | File Templates.
 */
var ApplicationSetting = Backbone.Model.extend({
    defaults: {
        framerate: 60,

        manifest: [
            {src:"assets/images/runningGrant.png", id:"grant"},
            {src:"assets/images/sky.png", id:"sky"},
            {src:"assets/images/ground.png", id:"ground"},
            {src:"assets/images/parallaxHill1.png", id:"hill"},
            {src:"assets/images/parallaxHill2.png", id:"hill2"}
        ]
    }
});
