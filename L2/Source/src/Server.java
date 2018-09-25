import java.net.*;
import java.io.*;

public class Server {

	public static void main(String[] args) {
		
		try {
			//Create socket at localhost on port 80 (HTTP)
			@SuppressWarnings("resource")
			ServerSocket serverSocket = new ServerSocket(80);
		
		while(true) {
			//Wait for new connection
			Socket newConnection = serverSocket.accept();
			System.out.println("New thread created");
			
			//Create new server thread from class ServerThread
			ServerThread serverThread = new ServerThread(newConnection);
			Thread newThread = new Thread(serverThread);
			
			//Start the thread
			newThread.start();
			
			System.out.println("Thread started");
			
			
		}
		
		}
		catch(Exception e){
			System.err.println(e.getMessage());
			System.exit(1);
		}
	}

}
