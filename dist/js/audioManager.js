//控制音频
(function ($, root) {
    var audioManager = function () {
        this.audio = new Audio();
        this.state = 'pause';
    }
    audioManager.prototype = {
        //播放结束
        end: function () {
            $(this.audio).on('ended', function () {
                $scope.find('.next-btn').trigger('click');
                this.play();
            })
        },
        //播放功能
        play: function () {
            this.audio.play();
            this.state = 'play';
        },
        //暂停功能
        pause: function () {
            this.audio.pause();
            this.state = 'pause';
        },
        //设置音频地址
        setAudioSource: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        load: function () {
            this.audio.load();
        }
    }
    root.audioManager = audioManager;
})(window.Zepto,window.player||(window.player = {}))