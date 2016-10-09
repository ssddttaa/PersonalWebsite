/**
 * Created by SadatShaik on 8/15/16.
 */


/* Setting up the navbar and its actions.*/
$(document).ready(function () {
    var $navbar = $('#navbar');
    var mainBar = new navbarMain($navbar);
    mainBar.setupButtons();
    var $videoView = $('#video-view');
    var videos = new videoView($videoView);
    // videos.setupVideos();
    // setupScrollActions();
});

function setupScrollActions(){
   // $(document.on('scroll'), function(){
   //     if($(this).scrollTop()) >= $()
   // })
}

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

var videoView = function($element){
    this.$videoView = $element;
    this.alreadyInit = false;
}

videoView.prototype.setupVideos = function(){
    var xhr;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var videoViewObject = this;
    xhr.onreadystatechange = function () {
        if(xhr.responseText && !videoViewObject.alreadyInit){
            videoViewObject.alreadyInit = true;
            var parsedJSON = JSON.parse(xhr.responseText);
            for(var i = 0 ; i < parsedJSON.videos.length ; i++) {
                var currentRow = 0;
                var $currentRowJQuery;
                var $newRow;
                if(i%3 == 0){
                    currentRow++;
                    $newRow = $('<div>');
                    $newRow.addClass('row');
                    $newRow.addClass('video-row');
                    $newRow.data('row-id', currentRow);
                    videoViewObject.$videoView.append($newRow);
                    $currentRowJQuery = $newRow;
                }
                var $newCard = $('<div>');
                $newCard.addClass('col-xs-4');
                if(i == 0){
                    $newCard.addClass('active');
                    videoViewObject.$selected = $newCard;
                }
                $newCard.addClass('col-xs-4');
                $newCard.addClass('flipper');
                $newCard.append($('<h4>' + parsedJSON.videos[i]['video-title'] + '</h4>'));
                if(parsedJSON.videos[i]['youtube-url'] !== '')
                {
                    $newCard.append($('<iframe src = '+parsedJSON.videos[i]['youtube-url']+' class = "video-thumbnail" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>'));
                }
                if(parsedJSON.videos[i]['github-url']+'' !== '')
                {
                    $newCard.append($('<a class="btn btn-social-icon btn-github" target = "blank" href = ' + parsedJSON.videos[i]['github-url'] + '><span class="fa fa-github"></span></a>'));
                }
                $newCard.append($('<a class="btn btn-social-icon btn-pinterest" href = '+parsedJSON.videos[i]['youtube-url']+'><span class="fa fa-youtube"></span></a>'));
                var $maskDiv = $('<div class = "mask-div"></div>');
                $newCard.append($maskDiv);
                $newCard.append($('</div>'));
                $newRow.append($newCard);
                $newCard.attr('card-id', i);
                console.log($maskDiv.get(0));
                $maskDiv.get(0).onmouseover = function($toAdd, $card) {
                    return function() {
                        $toAdd.css('cursor', 'pointer');
                        $toAdd.css('cursor', 'hand');
                        $card.css('background-color','#ECECEC');
                    };
                }($maskDiv, $newCard);
                $maskDiv.get(0).onmouseout = function($toAdd, $card) {
                    return function() {
                        $toAdd.css('cursor', 'default');
                        $card.css('background-color','white');
                    };
                }($maskDiv, $newCard);
                $maskDiv.get(0).onmousedown = function($card, num){
                    return function() {
                        $(document).find('#video-iframe').attr('src', parsedJSON.videos[num]['youtube-url']);
                        $(document).find('#video-iframe').fadeOut('fast', function(){
                            $(document).find('#video-iframe').fadeIn('fast');
                        });
                    }
                }($newCard, i);
            }
            var $videoPreviewer = $('#video-previewer');
            $('#video-previewer').css('height', $videoPreviewer.width());
        } else {
            console.log('Error: Could not retrieve JSON file.');
        }
    }
    xhr.open("GET", 'data/video_data.json');
    xhr.send();
}