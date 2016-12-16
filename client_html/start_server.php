<?php
$result2=exec("/home/pi/Documents/ThereWillBeLED/autoboot/client/client_autostart", $output, $retval);
echo "Result: $result<br />";
foreach($output as $o)
	echo "$o<br />";
echo "Retval: $retval<br />";
echo "DONE &lt;3<br />";
?>
