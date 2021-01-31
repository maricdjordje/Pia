<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('location: ../index.php');
}
else{ 
    if ($_SESSION['status'] != "admin") {
        header('location: ../korisnik/index.php');
    }
}

include('../kontroler/konekcija.php');

$id=$_REQUEST['id'];
$query = "SELECT * from korisnici where korisnikID='$id'"; 
$r = $conn -> query($query);
$row = $r->fetch_assoc();

if (isset($_POST['update'])) {
    $fullname=$_POST['fname'];
    $email = $_POST['email'];
    $username = strtolower($_POST['username']);
    $password = $_POST['password'];

    //Validation
    $q = "SELECT * FROM korisnici WHERE korisnickoime = '$username' OR email = '$email'";

    $res = $conn->query($q);
    $num = mysqli_num_rows($res);  

    if ($num > 1) {
            echo "Greška";
            header('location: korisnici.php#error');
    } else {
        //$sql = "INSERT INTO userdata (Username,Pass,Fullname,Email) values('$username','$password','$fullname','$email')";

        $sql = "UPDATE korisnici SET pravoime='$fullname',korisnickoime='$username',lozinka = '$password', email='$email' WHERE korisnikID='$id'";

        $result = $conn -> query($sql);

            header('location: korisnici.php#updatesuccess');  
    }
}

    

    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Izmena podataka</title>
    <!--<link href='https://fonts.googleapis.com/css?family=Arimo' rel='stylesheet'>-->

    
    <link rel=" stylesheet " href="../css/bootstrap.min.css ">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/popup.css">
    <link rel="stylesheet" href="../css/request.css">

</head>
<body>
    <nav class="navbar navbar-expand-sm bg-secondary navbar-dark fixed-top ">
       
        <!--<a class="navbar-brand " href="#">
            <img src="../image/icon.png " alt="logo "> MoviesInfo
        </a>-->

        
        <ul class="navbar-nav mr-auto ">
        </ul>
       
        <ul class="navbar-nav ">
            <li class="nav-item ">
                <a class="nav-link active " href="# ">Početna</a>
            </li>
            <li class="nav-item ">
                <a class="nav-link " href="korisnici.php">Lista korisnika</a>
            </li>
            
            <li class="nav-item dropdown dropleft">
                <!--<a class="nav-link" href="#" data-toggle="dropdown">
                    <img src="../image/default-user.png" style="width:30px; border-radius:50%;" alt="logo ">
                </a>-->
                <div class="dropdown-menu">
                    <!--<a class="dropdown-item disabled" style="color:silver; text-transform:lowercase;" href="#"></a>--><?/*php echo $_SESSION['username'] */?>
                    <a class="dropdown-item" style="color:#fff;" href="../kontroler/logout.php">Odjavi se</a>
                </div>
            </li>
        </ul>
    </nav>

    <header>
        <div class="container req-box" >
        <center><h3 style="margin-bottom:50px;"><span style="font-weight:bold; color: #6AC045">Izmeni podatke korisnika</span></h3></center>
            <form action="" method="post">
                <div class="row">
                    <div class="col-md-6 box1">
                        
                        <label for="title">Ime i prezime:</label><br>
                        <input type="text" name="fname" class="input" value="<?php echo $row['pravoime'];?>" required  ><br>
                        <label for="title">Email adresa:</label><br>
                        <input type="email" name="email" class="input" value="<?php echo $row['email'];?>" required><br>
                    
                    </div>
                    <div class="col-md-6 box1">
                        <label for="title">Korisničko ime:</label><br>
                        <input type="text" name="username" class="input" value="<?php echo $row['korisnickoime'];?>" required><br>
                        <label for="title">Lozinka:</label><br>
                        <input type="text" name="password" class="input" value="<?php echo $row['lozinka'];?>" required><br>
                        <input type="submit"  class="btn" name="update" value="Izmeni podatke korisnika">
                    </div>
                </div>   
            </form>
        </div>
    </header>

    <div class="footer">
        <p></p>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>

    
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</body>
</html>