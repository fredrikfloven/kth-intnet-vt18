import java.io.*;
import java.net.*;
import java.util.StringTokenizer;

public class HttpServer{

    public static void main(String[] args) throws IOException{
	ServerSocket ss = new ServerSocket(4711);
	while(true){
	    Socket s = ss.accept();
	    BufferedReader request =
		new BufferedReader(new InputStreamReader(s.getInputStream()));
	    String str = request.readLine();
	    System.out.println(str);
	    StringTokenizer tokens =
		new StringTokenizer(str," ?");
	    tokens.nextToken();
	    String requestedDocument = tokens.nextToken();
	    while( (str = request.readLine()) != null && str.length() > 0){
			System.out.println(str);
	    }
	    s.shutdownInput();
	 
 
	    PrintStream response =
		new PrintStream(s.getOutputStream());
	    response.println("HTTP/1.0 200 OK");
	    response.println("Server : Slask 0.1 Beta");
	    if(requestedDocument.indexOf(".html") != -1)
			response.println("Content-Type: text/html");
	    if(requestedDocument.indexOf(".gif") != -1)
			response.println("Content-Type: image/gif");
	    
	    response.println("Set-Cookie: clientId=1; expires=Wednesday,31-Dec-2017 21:00:00 GMT");

	    response.println();
	    File f = new File("."+requestedDocument);
	    FileInputStream infil = new FileInputStream(f);
	    byte[] b = new byte[1024];
	    while( infil.available() > 0){
			response.write(b,0,infil.read(b));
	    }
	    s.shutdownOutput();
	    s.close();
	}
    }
}

