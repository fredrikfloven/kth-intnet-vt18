import java.net.*;
import java.util.ArrayList;
import java.io.*;

public class ServerThread implements Runnable {
	private Socket socket;
	private ServerThreadManager stm;
	private BufferedReader in;
	private PrintStream out;
	private String username;

	ServerThread(Socket socket, ServerThreadManager stm) throws IOException {
		this.socket = socket;
		this.stm = stm;
		// Creating in and out readers and writers
		in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		out = new PrintStream(socket.getOutputStream());
	}

	public synchronized BufferedReader getIn() {
		return in;
	}

	public synchronized PrintStream getOut() {
		return out;
	}

	public synchronized String getUsername() {
		return username;
	}

	@Override
	public void run() {
		try {
			System.out.println("Thread running");

			// Reads the username sent from client
			username = in.readLine();

			System.out.println("User " + username + " connected.");
			
			//Get all threads, when new user joins, send that they joined to all
			ArrayList<ServerThread> threads = stm.getThreads();
			for (ServerThread st : threads) {
				PrintStream output = st.getOut();
				output.println("Username " + username + " connected");
			}

			// Keep thread alive
			while (true) {
				String data = in.readLine();
				
				//Check that data isn't empty
				if (data != null && data.length() > 0) {
					System.out.println(username + ": " + data);
					//Update all threads
					threads = stm.getThreads();
					
					//Check if data is a whisper
					if (data.startsWith("/w ")) {
						data = data.replaceFirst("/w ", "");
						
						//Check if whisper contains whitespace
						if (data.contains(" ")) {
							//Extract target username and message
							String[] split = data.split(" ");
							String target = split[0];
							data = data.replaceFirst(target + " ", "");
							
							//Send message to target username's thread, break when target thread is found
							for (ServerThread st : threads) {
								if (st.getUsername().equals(target)) {
									PrintStream output = st.getOut();
									output.println(username + " whispers: " + data);
									break;
								}
							}

						}
					}
					//Else send message to all threads, including own
					else {
						for (ServerThread st : threads) {
							// if(st != this) {
							PrintStream output = st.getOut();
							output.println(username + ": " + data);
							// }
						}
					}
				}
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}

}
