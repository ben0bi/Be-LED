<?php
echo "[Failsafe] Trying to start the server...";
$result2=exec("/home/pi/Documents/ThereWillBeLED/autoboot/client/client_autostart", $output, $retval);
echo "Result: $result<br />";
foreach($output as $o)
	echo "$o<br />";
echo "Retval: $retval<br />";
echo "DONE &lt;3<br /><br />";
echo "<a href='index.html'>Go To Main Page</a>";

?>
