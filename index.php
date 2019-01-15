<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- jQuery-->
    <script type="text/javascript" src="js/jquery.js"></script>
    <!-- Custome CSS -->
    <link rel="stylesheet" href="css/master.css">

    <link href='image/Deliver.jpg' rel='shortcut icon'>
    <title>Ongkir Kirim</title>
  </head>
  <body>
    <div class="jumbotron cs-jumbotron">
      <div class="container">
       <h1>Hitung Ongkos Kirim Paket</h1>
       <p>Kirim Paket Se Indonesia</p>
      </div>
    </div>
    
    <div class="container konten1">
      <h3>Masukan Data</h3>
      <div class="row">
    
        <!-- Awal Data Asal -->
          <!-- Memulai mengambil daftar nama provinsi di indonesia -->
        <div class="col-md-3">     
          <?php  
             include("rajaongkir/provinsi_asal.php");
          ?>
        </div> 
        <br>
        <div class="col-md-3">
          <!-- Kabupaten asal -->
          <label>Kabupaten Asal</label>
            <select class="form-control" id="asal" name="asal">
              <option>Kabupaten</option>
            </select>
            <br><br> 
        </div> 
        <div class="col-md-2">
          <label>Kode Pos</label>
          <div id="pos_asal">
            <input type="text" class="form-control" name="" readonly>
          </div>
        </div>          
        <!-- Akhir Data Asal -->

        <div class="col-md-2">
          <!-- Jenis Layanan Pengiriman -->
         
            <label>Layanan</label>
              <select class="form-control" name="kurir" id="kurir">
                <!-- <option value="all">semua</option> -->
                <option value="jne">JNE</option>
                <option value="pos">POS</option>
                <option value="tiki">TIKI</option>
              </select> 
        </div>
        <div class="col-md-2 btn-cek">
            <label>  </label>
            <button type="button" class="btn btn-primary " id="cek">Cek Harga</button>
          <!-- <input type="submit" id="cek" value="Cek Harga"> -->
        </div>
      </div> <!-- Batas Akhir Row Pertama -->

        
      <div class="row">
        <div class="col-md-3">
          <?php 
          include("rajaongkir/provinsi_tujuan.php"); 
          ?>
        </div>
        <div class="col-md-3">
          <!-- Kabupaten Tujuan -->
          <label>Kabupaten Tujuan</label>
            <select class="form-control" id="tujuan" name="tujuan">
              <option>Kabupaten</option>
            </select>   
        </div> 
         <div class="col-md-2">
          <label>Kode Pos</label>
          <div id="pos_tujuan">
            <input type="text" class="form-control" name="" readonly>
          </div>
        </div>           
        <div class="col-md-2">
          <label>Berat (gram)</label>
          <input type="text" class="form-control" name="berat" id="berat" value="0">
        </div>    
      </div>
    </div>
     
     
    <div class="container konten2">
    	<h3>Detail Ongkos Kirim</h3>
      <table class="table table-hover">
        <thead>
        <tr>
          <th>Kurir</th>
          <th>Servis</th>
          <th>Deskripsi Servis</th>
          <th>Lama Kirim (hari)</th>
          <th>Total Biaya (Rp)</th>
        </tr>
        </thead>
        <tbody id="ongkir"></tbody>
      </table>  
    </div>

  </body>
</html>

<script type="text/javascript">
   
  $(document).ready(function(){
    $('#provinsiasal').change(function(){
      // Mengambil provinsi asal yang tadi di pilih
      var provasal = $('#provinsiasal').val();

      $.ajax({
              type : 'GET',
              url  : 'http://localhost/xml/latihan/master/rajaongkir/kabupaten_asal.php',
              data : 'prov_asal_id=' + provasal,
          success: function (data) {      
              //jika data berhasil didapatkan, tampilkan ke dalam option select kabupaten asal
              $("#asal").html(data);
          }
      });
    });

    $('#provinsitujuan').change(function(){
      // Mengambil provinsi tujuan yang tadi di pilih
      var provtujuan = $('#provinsitujuan').val();

      $.ajax({
              type : 'GET',
              url  : 'http://localhost/xml/latihan/master/rajaongkir/kabupaten_tujuan.php',
              data : 'prov_tujuan_id=' + provtujuan,
          success: function (data) {      
              //jika data berhasil didapatkan, tampilkan ke dalam option select kabupaten asal
              $("#tujuan").html(data);
          }
      });
    });

// Kode
    $("#asal").change(function(){
      var provinsi_asal = $('#provinsiasal').val();
      var kab_asal = $('#asal').val();

      $.ajax({
              type : 'GET',
              url  : 'http://localhost/xml/latihan/master/rajaongkir/pos_asal.php',
              data :  {'pro_asal' : provinsi_asal, 'kab_asal' : kab_asal},
          success: function (data) {      
              //jika data berhasil didapatkan, tampilkan ke dalam option select kabupaten asal
              $("#pos_asal").html(data);
          }
      });
    });

    $("#tujuan").change(function(){
      var provinsi_tujuan = $('#provinsitujuan').val();
      var kab_tujuan = $('#tujuan').val();

      $.ajax({
              type : 'GET',
              url  : 'http://localhost/xml/latihan/master/rajaongkir/pos_tujuan.php',
              data :  {'pro_tujuan' : provinsi_tujuan, 'kab_tujuan' : kab_tujuan},
          success: function (data) {      
              //jika data berhasil didapatkan, tampilkan ke dalam option select kabupaten asal
              $("#pos_tujuan").html(data);
          }
      });
    });
// akhir kode

    $("#cek").click(function(){
      //Mengambil value dari option select provinsi asal, kabupaten, kurir, berat kemudian parameternya dikirim menggunakan ajax 
      var kab_asal = $('#asal').val();
      var kab_tujuan = $('#tujuan').val();
      var kurir = $('#kurir').val();
      var berat = $('#berat').val();

      $.ajax({
              type : 'POST',
              url : 'http://localhost/xml/latihan/RajaOngkir Php/cek_ongkir.php',
              data :  {'tujuan' : kab_tujuan, 'kurir' : kurir, 'asal' : kab_asal, 'berat' : berat},
          success: function (data) {
               //jika data berhasil didapatkan, tampilkan ke dalam element div ongkir
              $("#ongkir").html(data);
          }
      });

    });
  });
</script>
