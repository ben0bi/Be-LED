ThereWillBeLED
a.k.a.
Be+LED

v0.2.0

by ben0bi@web4me in 2016

Autostarting node LED array server.
Needs a Raspberry-Pi running Node.js.

The ws2811-LED Panel/Strip must be connected to pin 6 and have its own power.

0. Important
1. Short installation manual.
2. Extended installation manual for debugging.
3. Administering the Box.

******************************************************************************
Important:
You NEED to operate from the ROOT DIR of this application.
(You can NOT "cd autoboot" and then "./autostart_after", 
it must be "autoboot/autostart_after". Also, as far as I know, 
you can also NOT "cd node_client" and then "sudo node node_LED_server.js ...",
you need to "sudo node node_client/node_LED_server.js ...". Sorry for that. 

******************************************************************************

Short Installment:

On your Raspi, do that:

+ install node if not installed.
+ install apache2 if not installed. 
+ The apache page is there because the box can always respond then,
	also if the node server does not run.

cd /home/pi/Documents

git clone https://github.com/ben0bi/ThereWillBeLED

sudo cp -r ThereWillBeLED/client_html/* /var/www

(you can also use "./deploy_html" ;) )

+ /var/www is apaches default web directory. Use another one if you want.
+ ok, now you have the stuff in the right directories, now..

sudo nano /etc/rc.local

+ at the end, before the endifs, add

/home/pi/Documents/ThereWillBeLED/autoboot/autostart

+ Press Ctrl-O to save the file, Ctrl-X to exit.
+ Done. Restart your Pi and it should run.
+ If all went good, the LEDs should show the local IP if the raspi is connected.
+ Over that IP you can now change text and stuff.

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

*******************************************************************************

(TODO)

Administering the Box + NOT YET FUNCTIONAL

Go to BoxIP/admin.html and input the password you provided.
If there is no password set, a password creation page pops up.
If you forgot your password, just delete the admin_password file.

The password will be SHA2 encoded in the file and when you send it.
The administer page will be sent as whole by node, if you input the right password.
So, no one can change admin stuff (-html) if he does not know the password.

You can also change the password on the admin page. [not yet]
