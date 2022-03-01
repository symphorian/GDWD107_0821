<?php

set_time_limit(0);

header( 'Content-type: text/html; charset=utf-8' );

for ($i = 0; $i<10; $i++){
	ob_start();

    echo "<br> Line to show.";
    echo str_pad('',4096) . "\n";    

    ob_flush();
    flush();

    ob_end_clean();

    sleep(10);
}

echo "Done.";

?>