<?php
	$dir = 'uploads';

	$files = scandir($dir);

	foreach ($files as $imgsrc) {
		if ($imgsrc != '.' && $imgsrc != '..') {

			try {
				ob_start();
				//header("Content-type: image/jpeg");


				// code to get original image
				$imgPath = $dir . '/' . $imgsrc;
				list($width,$height,$type) = getimagesize($imgPath);

				switch ($type) {
			        case IMAGETYPE_GIF:
			            $img = imagecreatefromgif($imgPath);
			            break;
			        case IMAGETYPE_JPEG:
			            $img = imagecreatefromjpeg($imgPath);
			            break;
			        case IMAGETYPE_PNG:
			            $img = imagecreatefrompng($imgPath);
			            break;
			        default:
			        	throw new Exception('Unknown Image type:' . $type);
			    }


			    // code to calculate how to place and/or scale the original in the thumbnail
			    $tw = 100;
			    $th = 100;

			    $thumbnail = imagecreatetruecolor($tw, $th);
				$thumbnail_bkgd_color = imagecolorallocate($thumbnail, 255, 255, 255);
				imagefill($thumbnail, 0, 0, $thumbnail_bkgd_color);

				$thumbnail_width = $tw;
				$thumbnail_height = $th;

			    if ($width < $tw || $height < $th) {

					if ($width < $tw) {
						$thumbnail_width = $width;
					}
					if ($height < $th) {
						$thumbnail_height = $height;
					}

					$x = ($tw - $thumbnail_width) / 2;
					$y = ($th - $thumbnail_height) / 2;

					imagecopyresampled($thumbnail, $img, $x, $y, 0, 0, $thumbnail_width, $thumbnail_height, $width, $height);
				}
				else {
					imagecopyresampled($thumbnail, $img, 0, 0, 0, 0, $thumbnail_width, $thumbnail_height, $width, $height);
				}

				// code to generate the watermark
				$stamp = imagecreatetruecolor(25, 25);
				$stamp_color = imagecolorallocate($stamp, 255, 0, 0);
				$stamp_text_color = imagecolorallocate($stamp, 255, 255, 255);
				imagefill($stamp, 0, 0, $stamp_color);
				imagestring($stamp, 5, 5, 5, "RR", $stamp_text_color);

				imagecopymerge($thumbnail, $stamp, 75, 75, 0, 0, 25, 25, 50);

				imagejpeg($thumbnail, NULL, 100);

				$ib = ob_get_clean();

				echo "<div><img src='data:image/jpeg;base64," . base64_encode($ib) . "' /></div>";

				imagedestroy($img);
				imagedestroy($thumbnail);
			}
			catch (Exception $e) {
				echo 'Caught exception: ',  $e->getMessage(), "\n";
			}
		}
	}
?>