<?php 
	
	$asal = $_POST['asal'];
	$id_kabupaten = $_POST['tujuan'];
	$kurir = $_POST['kurir'];
	$berat = $_POST['berat'];

	$curl = curl_init();
	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://api.rajaongkir.com/starter/cost",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "origin=".$asal."&destination=".$id_kabupaten."&weight=".$berat."&courier=".$kurir."",
	  CURLOPT_HTTPHEADER => array(
	    "content-type: application/x-www-form-urlencoded",
	    "key: ...."
	  ),
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  	echo "cURL Error #:" . $err;
	} else {
		$json = json_decode($response);
		$results = $json->rajaongkir->results;

		echo '<table border="1" bordercolor="#0000FF">';

		if(!empty($results)){
			foreach($results as $r):
				foreach($r->costs as $rc):
					foreach($rc->cost as $rcc):
						//echo '<label>'.$r->code.'<br/>'.$rc->service.'<br/>'.$rc->description.'<br/>'.$rcc->etd.' Rp.'.number_format($rcc->value).'</label><br/>';
						echo '  <tr><td style="text-transform: uppercase";>'.$r->code.'</td>
								<td>'.$rc->service.'</td>
								<td>'.$rc->description.'</td>
								<td>'.$rcc->etd.'</td>
								<td>Rp.'.number_format($rcc->value).'</td>
								<tr>';
					endforeach;
				endforeach;
			endforeach;
		}else{
		 	echo 'paket tidak tersedia';
		}

			echo '</table>';
	}
?>