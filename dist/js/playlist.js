//播放列表
(function ($, root) {
    var $playlist = $('<div class="list-wrapper">' +
                            '<div class="play-head">播放列表</div>' +
                            '<ul class="wrap"></ul>' +
                            '<div class="play-foot">关闭</div>' +
                      '</div>');
    var $scope = $(document.body);

    function renderList(data) {
        var html = '';
        var len = data.length;
        for(i = 0; i < len; i++) {
            html += '<li><h3>' + data[i].song + '</h3>-<span>' + data[i].singer + '</span></li>';
        }
        $playlist.find('.wrap').html(html);
        $scope.append($playlist);
    }

    function renderSong(index) {
        $playlist.find('.wrap li').removeClass('nowShow');        
        $playlist.find('.wrap li').eq(index).addClass('nowShow');
    }
    
    root.playlist = {
        renderList: renderList,
        renderSong: renderSong
    }

})(window.Zepto, window.player || (window.player = {}))