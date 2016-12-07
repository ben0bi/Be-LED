ThereWillBeLed
by ben0bi@web4me in 2016

Autostarting node LED array server.
Needs a Raspberry-Pi running Node.js.

The ws2811-LED Panel/Strip must be connected to pin 6 and have its own power.

0. Set path in autoboot/autostart
1. Set password in autoboot/sudo_passwd
2. Call autoboot/autostart in your /etc/rc.locale file.
	2.1 (Set another startup file in autoboot/autostart_after for your own needs.)
3. Copy the content of client_html into your web directory.
	(Maybe you need to install apache first...full node support maybe later.)
3. Restart your machine: It should run now.

4. You can access the program with "screen -R" or autoboot/stop

5. On startup, the box shows its own local IP if it is connected to the LAN.
You can connect to that IP and change the text, without having to use a screen for the RaspbPi.

6. Have Fun!
