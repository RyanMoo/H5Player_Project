//管理进度条动画

(function ($, root) {
    var $scope = $(document.body);
    var startTime;
    var durTime;
    var frameId;
    var markTime;
    //转换时间
    function changeTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - (minute * 60);
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10) {
            second  = '0' + second;
        }
        return minute + ':' + second;
    }
    //渲染总时长
    function render(duration) {
        durT = duration;
        markTime = 0;
        var allTime = changeTime(duration);
        $scope.find('.all-time').text(allTime);
    }

    //渲染当前时间和进度条
    function upDate(percentage) {      
        var curT = durT * percentage;
        var time = changeTime(curT);
        var percent = percentage * 100;
        $scope.find('.current-time').text(time);
        // console.log(time)
        $scope.find('.pro-top').css({
            'transform': 'translateX(' + (percent - 100) + '%)'
        })
    }
    //渲染开始时间
    function renderStart(time) {
        cancelAnimationFrame(frameId);        
        startTime = Date.now();
        markTime = time * 1000;
        // console.log(markTime)
        function frame() {
            var curTime = Date.now() + markTime;
            var percentage = (curTime - startTime) / (durT * 1000);
            // console.log(percentage)
            if(percentage < 1) {
                upDate(percentage);
                frameId = requestAnimationFrame(frame);
            }else {
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }

    function stop() {
        markTime += Date.now() - startTime;
        cancelAnimationFrame(frameId);
    }
    root.processor = {
        render: render,
        renderStart: renderStart,
        stop: stop,
        upDate: upDate,
        markTime: markTime
    }

})(window.Zepto, window.player || (window.player = {}))