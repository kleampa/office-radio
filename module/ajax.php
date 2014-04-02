<?php
switch($_GET['op']) {
	
	case'goleste':
	file_put_contents("db/bd.txt","");
	break;
	
	case'adauga':
	$link = urldecode($_POST['link']);
	
	$exp = explode('v=',$link);
	$id_youtube = substr($exp[1],0,11);
	
	$feed = simplexml_load_file('https://gdata.youtube.com/feeds/api/videos/'.$id_youtube);
	$denumire =(string)$feed->title;
	$descriere =(string)$feed->content;
	$descriere = 'Adaugat la: '.date('d.m.Y H:i:s');
	
	echo'
	<div class="song '.$id_youtube.'">
		<table>
			<tr>
				<td class="sr_img" width="125"><a href="http://www.youtube.com/watch?v='.$id_youtube.'" target="_blank"><img alt="'.$denumire.'" src="http://i.ytimg.com/vi/'.$id_youtube.'/default.jpg"></a></td>
				<td class="sr_text" valign="top">
					<b>'.$denumire.'</b>
					<br/>
					'.$descriere.'
					<div class="autor">DJ: '.$_COOKIE['nume'].'</div>
				</td>
			</tr>
		</table>
	</div>';
	
	$actual = file_get_contents("db/bd.txt");
	$actual.="{$id_youtube}|{$denumire}|{$descriere}|{$_COOKIE['nume']}\n";
	file_put_contents("db/bd.txt",$actual);
	break;
	
	case'sterge':
	$id = $_POST['id'];
	$arr = file("db/bd.txt");
	$temp="";
	foreach($arr AS $val) {
		$exp = explode('|',$val);
		if($exp[0] == $id OR $exp[0] == "") {
			//sterge linia asta
		}
		else {
			$temp[] = $val;
		}
	}
	file_put_contents("db/bd.txt",implode($temp));
	if(count($temp) == 0 OR $temp == "") { echo"playlist_gol"; }
	break;
	
	case'urmatoarea':
	$arr = file("db/bd.txt");
	if(count($arr) == 0) {}
	else {
		$exp = explode('|',$arr[0]);
		file_put_contents("db/acum.txt",'<a href="http://www.youtube.com/watch?v='.$exp[0].'" target="_blank">'.$exp[1].'</a> (DJ:'.$exp[3].')');
		echo $exp[0];
	}
	break;
	
	case'reload':
	$arr = file("db/bd.txt");
	$canta_acum = file_get_contents("db/acum.txt");
	$volum = file_get_contents("db/volum.txt");
	if($canta_acum == "") { $canta_acum='-'; }
	
	if(count($arr) == 0) {
		echo'
		<div id="playlist_gol">
			<i>Playlist gol!</i>
		</div>';
	}
	else {
		foreach($arr AS $line) {
			$exp = explode('|',$line);
			echo'
			<div class="song '.$exp[0].'">
				<table>
					<tr>
						<td width="125"><a href="http://www.youtube.com/watch?v='.$exp[0].'" target="_blank"><img alt="'.$exp[0].'" src="http://i.ytimg.com/vi/'.$exp[0].'/default.jpg"></a></td>
						<td class="sr_text" valign="top">
							<b>'.$exp[1].'</b><br/>
							'.$exp[2].'
							<div class="autor">DJ: '.$exp[3].'</div>
						</td>
					</tr>
				</table>
			</div>';
		}
	}
	echo'***tmp***'.$canta_acum.'***tmp***'.$volum.'';
	break;
	
	case'volum':
	file_put_contents("db/volum.txt",$_POST['volum']);
	break;
}
?>