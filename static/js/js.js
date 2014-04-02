$(document).ready(function() {
	reload_list();
	window.setInterval(reload_list, 10000);
	afla_nume();
});

function volum() {
    var volum = $('input[name=volum]').val();
    var volum = parseInt(volum);
    
    if(volum < 0 || volum > 100) {
        alert('Volum incorect!');    
    }
    else {
        $.ajax({
    	   type: "POST",
    	   url: "index.php?act=ajax&op=volum",
    	   data: "volum="+volum
        });
    }
}

function reload_list() {
	$.ajax({
	   type: "POST",
	   url: "index.php?act=ajax&op=reload",
	   data: "",
	   success: function(msg){
			var exp = msg.split('***tmp***');
			$('#playlist').html(exp[0]);
			$('#acum').find('span').html(exp[1]);
            var volum = exp[2];
            $('input[name=volum]').val(volum);
            
            //schimba volumul la player server
            var server = $('input[name=server]').val();
            if(server == 1) { 
                $("#video").tubeplayer("volume",volum);
            }

	   }
	 });
	 
	 var server = $('input[name=server]').val();
	 if(server == 1) {
		var actual = $('#video').html();
		
		if(actual.search("embed")==-1) {
			urmatoarea();
		}
		else {}
	}
}

function incarca(id) {

	$('#video_area').hide();
	$('#video').show();

	$("#video").tubeplayer('destroy');
	
	$("#video").tubeplayer({
		width: 640,
		height: 360,
		allowFullScreen: "true",
		initialVideo: id,
		autoPlay: true,
		preferredQuality: "default",
		onPlayerEnded: function(){
			urmatoarea();
		},
		onErrorNotFound: function(){
			urmatoarea();
		},
		onErrorNotEmbeddable: function(){
			urmatoarea();
		},
		onErrorInvalidParameter: function(){
			urmatoarea();
		}
	});

	sterge(id);
}

function sterge(id) {
	$.ajax({
	   type: "POST",
	   url: "index.php?act=ajax&op=sterge",
	   data: "id="+id,
	   success: function(msg){
			if(msg == "playlist_gol") { $('#playlist_gol').show(); }
			$('.'+id).remove();
	   }
	 });
}

function adauga() {
	var link = $('input[name=link]').val();
	if(link == "") {
		alert("Pai si ... linkul ???");
	}
	else {
		if(link.search("youtube.com")==-1) {
			alert("Ma hotomane! Am zis YOUTUBE!!!");
		}
		else {
			//e link de youtube
			$.ajax({
			   type: "POST",
			   url: "index.php?act=ajax&op=adauga",
			   data: "link="+escape(link),
			   success: function(msg){
					$('#playlist_gol').hide();
					$('#playlist').prepend(msg);  
					
					//daca nu e o melodie in rulare se ruleaza asta
					var server = $('input[name=server]').val();
					if(server == 1) {
						var actual = $('#video').html();
						
						if(actual.search("embed")==-1) {
							incarca(id_youtube(link));
						}
						else {}
					}
					
					$('input[name=link]').val('');
					mesaj('Adaugata cu succes!');
			   }
			 });
		}
	}
}

function mesaj(continut) {
	/*
	$('#mesaj').html(continut);
	$('#mesaj').fadeIn();
	$('#mesaj').fadeOut(5000);
	*/
}

function goleste() {
	if(confirm('Sigur vrei sa stergi playlist-ul?')) { 
	
		$.ajax({
		   type: "POST",
		   url: "index.php?act=ajax&op=goleste",
		   data: "",
		   success: function(msg){
				$('.song').each(function() {
					$(this).remove();
				});
				$('#playlist_gol').show();
		   }
		 });
		 
	}
	else {
		return false;
	}
}

function urmatoarea() {
	//gaseste primul video din playlist
	$.ajax({
	   type: "POST",
	   url: "index.php?act=ajax&op=urmatoarea",
	   data: "",
	   success: function(msg){
			if(msg == "") {
				//nu mai sunt videouri
				$('#playlist_gol').show();
				$('#video_area').show();
				$('#video').hide();
			}
			else {
				incarca(msg);
			}
	   }
	 });
}

function id_youtube(link) {
      var ytid = link.split("v=")[1];
      if (ytid) {
        ytid = ytid.substring(0, 11);
      }
      else {
		ytid = '';
      }
	return ytid;
}


function afla_nume() {

	var nume = $.cookie('nume');
	if(nume == "" || nume == null) {
		var nume = prompt('Numele tau:', '');
		if(nume == null) {
			afla_nume();
		}
		else {
			$.cookie('nume', nume, { expires: 360 });
			mesaj('Bine ai revenit '+nume+'!');
		}
	}
	else {
		//are nume
	}
}