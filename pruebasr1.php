<?php
function array2json($data){
    $data = json_encode($data);

    $tabCount = 0;
    $result = '';
    $quotes = false;
    $separator = "\t";
    $newLine = "\n";

    for($i=0;$i<strlen($data);$i++){
        $c = $data[$i];
        if($c=='"' && $data[$i-1]!='\\') $quotes = !$quotes;
        if($quotes){
            $result .= $c;
            continue;
        }
        switch($c){
            case '{':
            case '[':
                $result .= $c . $newLine . str_repeat($separator, ++$tabCount);
                break;
            case '}':
            case ']':
                $result .= $newLine . str_repeat($separator, --$tabCount) . $c;
                break;
            case ',':
                $result .= $c;
                if($data[$i+1]!='{' && $data[$i+1]!='[') $result .= $newLine . str_repeat($separator, $tabCount);
                break;
            case ':':
                $result .= $c . ' ';
                break;
            default:
                $result .= $c;
        }
    }
    return  $result;
}
//Vamos a recibir los datos
//Establecemos conexión con la BD
$mysqli = new mysqli("localhost", "rootbdgregasa", "@*gUg1&Es4", "admin_gregasa");
# Recibimos los datos leídos de php://input
$datosRecibidos = file_get_contents("php://input");
# No los hemos decodificado, así que lo hacemos de una vez:
$usur = json_decode($datosRecibidos);
# Ahora podemos acceder a los datos, accederemos a unos pocos para demostrar
$nombreDePersona = $usur->identifier;
$datos_contra = md5($usur->password);
//Ahora comprobamos el usuario y contraseña

$insertar_datos = mysqli_query($mysqli, "INSERT INTO test (campo1,campo2) VALUES ('$nombreDePersona','$datos_contra')");

$consulta = "SELECT * FROM usuarios WHERE usuario = '$nombreDePersona' AND contra='$datos_contra'";
$inicio = mysqli_query($mysqli, $consulta);
if (mysqli_num_rows($inicio) > 0) {
            $id = "621b6a05b11e733304a5dc49";
            $tok = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWI2YTA1YjExZTczMzMwNGE1ZGM0OSIsImlhdCI6MTY0Njk0OTg4OCwiZXhwIjoxNjQ5NTQxODg4fQ.48ko6Adw5w5cnGUj3WmbACZW52QodfujuxR-pXCwJYs";
            $nombre = "PACO RECIBIDO DESDE GESLUNAS";

//Y ahora preparamos y enviamos la respuesta
            $user = array(
                'id' => $id,
                'token' => $tok,
                'username' => $nombre,

            );
            $data['user'] = $user;
            $data['recibidos'] = $datarecceived;
            $json = array2json($data);

            header('Content-Type: application/json; charset=utf-8');
            echo $json;
        }else{
            $data['statusCode'] = "Error 404";
            $json = array2json($data);

            header('Content-Type: application/json; charset=utf-8');
            echo $json;
        }

?>
