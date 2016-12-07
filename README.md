ThereWillBeLed
by ben0bi@web4me in 2016

Autostarting node LED array server.
Needs a Raspberry-Pi running Node.js.

The ws2811-LED Panel/Strip must be connected to pin 6 and have its own power.

******************************************************************************

Short Installment:

On your Raspi, do that:

# install node if not installed.
# install apache2 if not installed. (node only maybe later.)

cd /home/pi/Documents
git clone https://github.com/ben0bi/ThereWillBeLED
sudo cp -r ThereWillBeLED/client_html/* /var/www

# /var/www is apaches default web directory. Use another one if you want.
# ok, now you have the stuff in the right directories, now..

sudo nano /etc/rc.local

# at the end, before the endifs, add

/home/pi/Documents/ThereWillBeLED/autoboot/autostart

# Press Ctrl-O to save the file, Ctrl-X to exit.

# Done. Restart your Pi and it should run.
# If all went good, the LEDs should show the local IP if the raspi is connected.
# Over that IP you can now change text and stuff.

******************************************************************************
Extended, for debugging reasons and stuff:

0. Set path in autoboot/autostart
1. Set password in autoboot/sudo_passwd
2. Call autoboot/autostart in your /etc/rc.local file. 
	This is the/a linux autostart file.
	2.1 (Set another startup file in autoboot/autostart_after for your own needs.)
3. Copy the content of client_html into your web directory.
	(Maybe you need to install apache first...full node support maybe later.)
3. Restart your machine: It should run now.

4. You can access the running program with "screen -R" or autoboot/stop

5. On startup, the box shows its own local IP if it is connected to the LAN.
You can connect to that IP and change the text, without having to use a 
display for the RaspbPi.

6. Have Fun!
