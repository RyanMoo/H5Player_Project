var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var songList;
var dataUrl = '.../mock/data.json';
var render = root.render;
var controlManager;
var audioManager = new root.audioManager();
var processor = root.processor;
var playlist = root.playlist;
var flag = true;

//绑定bind事件
function bindTouch() {
    $sliderPoint = $scope.find('.slider-point');
    $offset = $scope.find('.pro-wrapper').offset();
    $left = $offset.left;
    $width = $offset.width;
    $sliderPoint.on('touchstart', function () {
        processor.stop();
        audioManager.pause();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - $left) / $width; 
        if(percent >= 1) {
            percent = 1;
        }else if(percent < 0) {
            percent = 0
        }
        processor.upDate(percent);        
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - $left) / $width; 
        if(percent >= 1) {
            percent = 1;
        }else if(percent < 0) {
            percent = 0
        }
        var index =controlManager.index;
        var curSong = songList[index];
        var curTime = Math.round(curSong.duration * percent);
        // audioManager.jump(curTime);
        audioManager.audio.currentTime = curTime;
        audioManager.audio.play();
        processor.renderStart(curTime);
        audioManager.state = 'pause';
        if(audioManager.state === 'pause') {
            $scope.find('.play-btn').addClass('playing');
            audioManager.state = 'play';
        }
    })
}


$scope.on('play:change', function (e, index) {
    var curData = songList[index];
    render(curData);
    audioManager.setAudioSource(curData.audio);
    processor.render(curData.duration);
    processor.upDate(0);
    playlist.renderSong(index);  
    ifLike = songList[index].isLike;
    if(audioManager.state == 'play') {
        audioManager.play();
    }
})

$scope.on('click', '.prev-btn', function () {
    var index = controlManager.prev();
    $scope.trigger('play:change', index);
    if(audioManager.state === 'play') {
        processor.renderStart(audioManager.audio.currentTime);
    }
})

$scope.on('click', '.next-btn', function () {
    var index = controlManager.next();
    $scope.trigger('play:change', index);
    // console.log(audioManager.audio.currentTime)
    if(audioManager.state === 'play') {
        processor.renderStart(audioManager.audio.currentTime);
    }
}) 

$scope.on('click', '.play-btn', function () {
    // console.log(audioManager.state)
    if(audioManager.state === 'play') {
        audioManager.pause();
        processor.stop();
        $scope.find('.play-btn').removeClass('playing');
    }else {
        audioManager.play();
        processor.renderStart(audioManager.audio.currentTime);
        $scope.find('.play-btn').addClass('playing')        
    }
})

$scope.on('click', '.list-btn', function () {
    console.log(flag)
    if(flag) {
        $scope.find('.list-wrapper').addClass('show');
        flag = false;    
    }
    $scope.find('.play-foot').click(function () {
        console.log(flag)
        $scope.find('.list-wrapper').removeClass('show');
        flag = true;
    })
})
 
$scope.on('click', '.like-btn', function () {
    $(this).toggleClass('liked');
})

$scope.on('click', '.wrap li', function () {
    var index = $(this).index();
    processor.renderStart(0);
    audioManager.play();
    $scope.find('.play-btn').addClass('playing');
    $scope.trigger('play:change', index);
    $scope.find('.list-wrapper').removeClass('show');
    flag = true;
})

function successCallback(data) {
    songList = data;
    $scope.trigger('play:change', 0);    
    controlManager = new root.controlManager(data.length);
    bindTouch();
    audioManager.end();
    playlist.renderList(data);
    playlist.renderSong(0);
}

function getData(url, callback) {
    $.ajax({
        url: url,
        type: "GET",
        success: callback,
        error: function () {
            console.log('error');
        }
    })
}

getData(dataUrl, successCallback);
