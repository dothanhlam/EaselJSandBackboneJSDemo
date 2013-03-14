/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 3/11/13
 * Time: 8:32 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var applicationSetting = new ApplicationSetting();
    var gameView = new GameView({model: applicationSetting});
});