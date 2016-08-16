/**
 * Created by SadatShaik on 8/15/16.
 */


/* Setting up the navbar and its actions.*/
$(document).ready(function () {
    var $navbar = $('#navbar');
    var mainBar = new navbarMain($navbar);
    mainBar.setupButtons();
});

var navbarMain = function($element){
    this.$navbar = $element;
    this.$selectedNav = $element.find('.active').eq(0);
}

navbarMain.prototype.setupButtons = function(){
    var $buttonArray = this.$navbar.find('.nav-button');
    for(var i = 0 ; i < $buttonArray.length ; i++){
        var navbar = this;
        $buttonArray.eq(i).click(function () {
            navbar.$selectedNav.removeClass('active');
            $(this).addClass('active');
            navbar.$selectedNav = $(this);
        });
    }
}
