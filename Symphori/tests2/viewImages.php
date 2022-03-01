<?php
	$dir = 'uploads';

	$files = scandir($dir);

	foreach ($files as $imgsrc) {
		if ($imgsrc != '.' && $imgsrc != '..') {

			$imgsize = getimagesize($dir . '/' . $imgsrc);
			$width = $imgsize[0];
			$height = $imgsize[1];

			if ($width > 100) {
				$width = 100;
			}

			if ($height > 100) {
				$height = 100;
			}

			$x = (100 - $width) / 2;
			$y = (100 - $height) / 2;

			echo "<div><img style='position:relative; top:" . $x . "; left:" . $y . "' width='" . $width . "' height='" . $height . "' src='" . $dir . '/' . $imgsrc . "' /></div>";
		}
	}
?>