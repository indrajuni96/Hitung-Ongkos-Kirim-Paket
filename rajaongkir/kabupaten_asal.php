<?php 

$provinsi_asal_id = $_GET['prov_asal_id'];

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => "http://api.rajaongkir.com/starter/city?province=$provinsi_asal_id",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "key: ..."
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

  if ($err) {
    echo "cURL Error #:" . $err;
  } else {
   
    }
  $data = json_decode($response, true);
  for ($i=0; $i < count($data['rajaongkir']['results']); $i++) { 
        echo "<option value='".$data['rajaongkir']['results'][$i]['city_id']."'>".$data['rajaongkir']['results'][$i]['city_name']."</option>";
  }

?>