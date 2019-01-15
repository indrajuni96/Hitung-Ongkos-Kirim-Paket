<?php
// Memanggil Daftar provinsi di indonesia dengan API RajaOngkir

// $provinsi_id = $_GET['prov_id'];

$curl = curl_init();

//Memanggil data daftar provinsinya dengan API di RajaOngkir dan Key Yang tadi kita sudah daftarkan
curl_setopt_array($curl, array(
  CURLOPT_URL => "http://api.rajaongkir.com/starter/province",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "key: ....."
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

// apabila berhasil memanggil daftar provinsinya maka akan keluar hasilnya, apabila tidak berhasil akan muncul pesan kesalahan...
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  // echo $response;

  echo "<label>Provinsi Tujuan</label>";
  echo "<select class='form-control' name='provinsitujuan' id='provinsitujuan'>";
  echo "<option>Pilih Provinsi Tujuan</option>";
  
  $data = json_decode($response, true);
  for ($i=0; $i < count($data['rajaongkir']['results']); $i++) {
    echo "<option value='".$data['rajaongkir']['results'][$i]['province_id']."'>".$data['rajaongkir']['results'][$i]['province']."</option>";
  }
  echo "</select><br>";
}
?>