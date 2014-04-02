<?php
error_reporting(0);

//include module
if(isset($_GET['act'])) {
    $include = 'module/'.$_GET['act'].'.php';
    if(file_exists($include)) { include($include); die(); }
}
?>

<html lang="en">
<head>
  <title>Radio "Birou"</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script src="static/js/yt.js" type="text/javascript"></script>
  <script src="static/js/js.js" type="text/javascript"></script>
  <script type="text/javascript">
  $(document).ready(function() {
	<?php
	if($_GET['server'] == 1) { echo'urmatoarea();'; }
	?>
  });
  </script>
  <link rel="stylesheet" href="static/css/style.css"/>
</head>

<body>
<br/><br/>
<input type="hidden" name="server" value="<?=$_GET['server']?>"/>
<div id="mesaj" style="display:none;"></div>
<div id="content">
	<div id="mainarea">
		<div id="title">Radio "Birou"</div>
		<br style="clear:both;"/>
		
		<div id="acum">Ultima melodie: <span>-</span></div>
        
		<div id="instructions">
			Link de YouTube: <input type="text" size="60" name="link"/> <input type="button" value="Adauga" onclick="adauga();"/>
		</div>
		
        <div id="volum" style="text-align: left;">
            Volum: <input type="text" name="volum" size="2" value="100"/> <input type="button" value="Salveaza" onclick="volum();"/>
        </div>
		  
		  <?
		  if($_GET['server'] == 1) {
			echo'<div id="video_area"><table width="100%" height="100%"><tr><td align="center">Nu exista melodii in playlist!</td></tr></table></div>
				<div id="video"></div>';
		  }
		  ?>
		  
		<div class="search_result">
			<br/>
			Ce urmeaza?
			<div id="playlist"> </div>
		</div>
	</div>
	<br/>

</div>
  
  
</body>
</html>
