#curl -o car.jpg https://app.platerecognizer.com/static/demo.jpg
curl -F "upload=@g_usb_inf.jpg" -F regions=us \
-H "Authorization: Token bf32501f4a38c52dbe1dd344c38d1335f33481ef" \
http://api.platerecognizer.com/v1/plate-reader
echo "\n"

#curl -o lpr/development/loteye_ESP32_cpp/Imagenes/thecar.jpg http://api.platerecognizer.com/static/demo.jpg
#curl -F "upload=@lpr/development/loteye_ESP32_cpp/Imagenes/theCar.jpg" -F regions=co \
#-H "Authorization: Token 45fc79169c27175d831c07604944aa00e2be4b31" \
#http://api.platerecognizer.com/v1/plate-reader

