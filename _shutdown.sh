#!/bin/bash

sudo echo "3" > /sys/class/gpio/export # Number pin (GPIO2) 
sudo echo "in" > /sys/class/gpio/gpio3/direction # Status pin (in or out)

while true; do
	if [ "$state" = "0" ];then # Condition of the button state
		shutdown 0
	fi
done
