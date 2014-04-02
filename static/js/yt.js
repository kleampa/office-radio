(function(g){var d={};d.ytplayers={};d.inits=[];d.iframeScriptInited=false;d.inited=false;g.tubeplayer={};g.tubeplayer.defaults={afterReady:function(){},stateChange:function(a){var b=this.onPlayer;return function(c){if(typeof c=="object")c=c.data;switch(c){case -1:return b.unstarted[a]();case 0:return b.ended[a]();case 1:return b.playing[a]();case 2:return b.paused[a]();case 3:return b.buffering[a]();case 5:return b.cued[a]();default:return null}}},onError:function(a){var b=this.onErr;return function(c){if(typeof c==
"object")c=c.data;switch(c){case 2:return b.invalidParameter[a]();case 100:return b.notFound[a]();case 101:case 150:return b.notEmbeddable[a]();default:return null}}},qualityChange:function(a){var b=this;return function(c){if(typeof c=="object")c=c.data;return b.onQualityChange[a](c)}},onQualityChange:{},onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},onErr:{notFound:{},notEmbeddable:{},invalidParameter:{}}};var j={width:425,height:355,allowFullScreen:"true",initialVideo:"DkoeNLuMbcI",
start:0,preferredQuality:"default",showControls:true,showRelated:false,autoPlay:false,autoHide:true,theme:"dark",color:"red",showinfo:false,modestbranding:true,wmode:"transparent",swfobjectURL:"http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",loadSWFObject:true,allowScriptAccess:"always",playerID:"tubeplayer-player-container",iframed:true,onPlay:function(){},onPause:function(){},onStop:function(){},onSeek:function(){},onMute:function(){},onUnMute:function(){},onPlayerUnstarted:function(){},
onPlayerEnded:function(){},onPlayerPlaying:function(){},onPlayerPaused:function(){},onPlayerBuffering:function(){},onPlayerCued:function(){},onQualityChange:function(){},onErrorNotFound:function(){},onErrorNotEmbeddable:function(){},onErrorInvalidParameter:function(){}};g.fn.tubeplayer=function(a,b){var c=g(this),f=typeof a;if(arguments.length==0||f=="object")return c.each(function(){d.init(g(this),a)});else if(f=="string")return c.triggerHandler(a+".tubeplayer",b||null)};var h=function(a){return function(b,
c){var f=d.getPkg(b);if(f.ytplayer){b=a(b,c,f);if(typeof b=="undefined")b=f.$player;return b}return f.$player}};g.tubeplayer.getPlayers=function(){return d.ytplayers};d.init=function(a,b){if(a.hasClass("jquery-youtube-tubeplayer"))return a;b=g.extend({},j,b);b.playerID=b.playerID+(new Date).valueOf()+"_"+Math.random();a.addClass("jquery-youtube-tubeplayer").data("opts.tubeplayer",b);for(e in i)a.bind(e+".tubeplayer",a,i[e]);d.initDefaults(g.tubeplayer.defaults,b);jQuery("<div></div>").attr("id",b.playerID).appendTo(a);
d.initPlayer(a,b);return a};d.getPkg=function(a){a=a.data;var b=a.data("opts.tubeplayer");return{$player:a,opts:b,ytplayer:d.ytplayers[b.playerID]}};d.iframeReady=function(a){d.inits.push(function(){new YT.Player(a.playerID,{videoId:a.initialVideo,width:a.width,height:a.height,playerVars:{autoplay:a.autoPlay?1:0,autohide:a.autoHide?1:0,controls:a.showControls?1:0,rel:a.showRelated?1:0,fs:a.allowFullScreen?1:0,wmode:a.wmode,showinfo:a.showinfo?1:0,modestbranding:a.modestbranding?1:0,start:a.start,
theme:a.theme,color:a.color},events:{onReady:function(b){d.ytplayers[a.playerID]=b.target;b=g(b.target).parents(".jquery-youtube-tubeplayer");g.tubeplayer.defaults.afterReady(b)},onPlaybackQualityChange:g.tubeplayer.defaults.qualityChange(a.playerID),onStateChange:g.tubeplayer.defaults.stateChange(a.playerID),onError:g.tubeplayer.defaults.onError(a.playerID)}})});if(d.inits.length>=1&&!d.inited)return function(){for(var b=0;b<d.inits.length;b++)d.inits[b]();d.inited=true};d.inited&&d.inits.pop()();
return onYouTubePlayerAPIReady};d.supportsHTML5=function(){return!!document.createElement("video").canPlayType};d.initDefaults=function(a,b){var c=b.playerID,f=a.onPlayer;f.unstarted[c]=b.onPlayerUnstarted;f.ended[c]=b.onPlayerEnded;f.playing[c]=b.onPlayerPlaying;f.paused[c]=b.onPlayerPaused;f.buffering[c]=b.onPlayerBuffering;f.cued[c]=b.onPlayerCued;a.onQualityChange[c]=b.onQualityChange;a=a.onErr;a.notFound[c]=b.onErrorNotFound;a.notEmbeddable[c]=b.onErrorNotEmbeddable;a.invalidParameter[c]=b.onErrorInvalidParameter};
d.initPlayer=function(a,b){b.iframed&&d.supportsHTML5()?d.initIframePlayer(a,b):d.initFlashPlayer(a,b)};d.initIframePlayer=function(a,b){if(!d.iframeScriptInited){a=document.createElement("script");a.src="http://www.youtube.com/player_api";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c);d.iframeScriptInited=true}onYouTubePlayerAPIReady=d.iframeReady(b)};d.initFlashPlayer=function(a,b){b.loadSWFObject?g.getScript(b.swfobjectURL,d.initFlashPlayerFN(b)):d.initFlashPlayerFN(b)()};
d.initFlashPlayerFN=function(a){return function(){var b=["//www.youtube.com/v/"];b.push(a.initialVideo);b.push("?fs="+(a.allowFullScreen?1:0));b.push("&enablejsapi=1&version=3");b.push("&playerapiid="+a.playerID);b.push("&rel= "+(a.showRelated?1:0));b.push("&autoplay="+(a.autoPlay?1:0));b.push("&autohide="+(a.autoHide?1:0));b.push("&controls="+(a.showControls?1:0));b.push("&showinfo="+(a.showinfo?1:0));b.push("&modestbranding="+(a.modestbranding?1:0));b.push("&start="+a.start);b.push("&theme="+a.theme);
b.push("&color="+a.color);swfobject.embedSWF(b.join(""),a.playerID,a.width,a.height,"8",null,null,{allowScriptAccess:a.allowScriptAccess,wmode:a.wmode,allowFullScreen:a.allowFullScreen},{id:a.playerID});onYouTubePlayerReady=function(c){var f=document.getElementById(c);d.ytplayers[c]=f;f.addEventListener("onStateChange","$.tubeplayer.defaults.stateChange('"+c+"')");f.addEventListener("onError","$.tubeplayer.defaults.onError('"+c+"')");f.addEventListener("onPlaybackQualityChange","$.tubeplayer.defaults.qualityChange('"+
c+"')");c=g(f).parents(".jquery-youtube-tubeplayer");g.tubeplayer.defaults.afterReady(c)}}};d.getVideoIDFromURL=function(a){var b=a.indexOf("?");a=a.substring(b,a.length);b=a.indexOf("v=");if(b>-1){var c=a.indexOf("&",b);if(c==-1)c=a.length;return videoParam=a.substring(b+2,c)}return""};var i={cue:h(function(a,b,c){c.ytplayer.cueVideoById(b,c.opts.preferredQuality)}),play:h(function(a,b,c){if(typeof b=="object")c.ytplayer.loadVideoById(b.id,b.time,c.opts.preferredQuality);else b?c.ytplayer.loadVideoById(b,
0,c.opts.preferredQuality):c.ytplayer.playVideo();c.opts.onPlay(b)}),pause:h(function(a,b,c){c.ytplayer.pauseVideo();c.opts.onPause()}),stop:h(function(a,b,c){c.ytplayer.stopVideo();c.opts.onStop()}),seek:h(function(a,b,c){c.ytplayer.seekTo(b,true);c.opts.onSeek(b)}),mute:h(function(a,b,c){c.$player.attr("data-prev-mute-volume",c.ytplayer.getVolume());c.ytplayer.mute();c.opts.onMute()}),unmute:h(function(a,b,c){c.ytplayer.unMute();c.ytplayer.setVolume(c.$player.attr("data-prev-mute-volume")||50);
c.opts.onUnMute()}),isMuted:h(function(a,b,c){return c.ytplayer.isMuted()}),volume:h(function(a,b,c){if(b){c.ytplayer.setVolume(b);c.$player.attr("data-prev-mute-volume",c.ytplayer.getVolume())}else return c.ytplayer.getVolume()||0}),quality:h(function(a,b,c){if(b)c.ytplayer.setPlaybackQuality(b);else return c.ytplayer.getPlaybackQuality()}),data:h(function(a,b,c){a={};c=c.ytplayer;a.bytesLoaded=c.getVideoBytesLoaded();a.bytesTotal=c.getVideoBytesTotal();a.startBytes=c.getVideoStartBytes();a.state=
c.getPlayerState();a.currentTime=c.getCurrentTime();a.availableQualityLevels=c.getAvailableQualityLevels();a.duration=c.getDuration();a.videoURL=c.getVideoUrl();a.getVideoEmbedCode=c.getVideoEmbedCode();a.videoID=d.getVideoIDFromURL(a.videoURL);return a}),videoId:h(function(a,b,c){return d.getVideoIDFromURL(c.ytplayer.getVideoUrl())}),size:h(function(a,b,c){if(b.width&&b.height){c.ytplayer.setSize(b.width,b.height);g(c.ytplayer).css(b)}}),destroy:h(function(a,b,c){c.$player.removeClass("jquery-youtube-tubeplayer").data("opts.tubeplayer",
null).unbind(".tubeplayer").html("");delete d.ytplayers[c.opts.playerID];g(c.ytplayer).remove();return null}),player:h(function(a,b,c){return c.ytplayer})}})(jQuery);


(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);