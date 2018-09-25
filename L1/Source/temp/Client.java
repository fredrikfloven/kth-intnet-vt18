import java.net.*;
import java.util.Scanner;
import java.io.*;


public class Client {

	public static void main(String[] args) throws UnknownHostException, IOException {
		System.out.println("Enter Username: ");
		
		//Creates new scanner and reads username
		@SuppressWarnings("resource")
		Scanner scanner = new Scanner(System.in);
		String username = scanner.nextLine();
		
		String address = "130.229.189.21";
		if(args.length>0) {
			address = args[0];
		}
		
		//Creates socket to server on port 1337
		Socket socket = new Socket(address, 1337);
		
		//Creating in and out readers and writers
		BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		PrintStream out = new PrintStream(socket.getOutputStream());
		
		//Writes username to server, first thing before chat function
		out.println(username);
		
		//Start new thread, reads run on separate thread so that we can process inputs in parallel
		new Thread(new ClientSocketReaderThread(in)).start();
		
		//Read inputs from terminal, write to socket
		while(true) {
			String data = scanner.nextLine();
			out.println(data);
			
		}
		
	}

}
