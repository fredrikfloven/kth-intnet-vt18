import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

public class ServerThread implements Runnable{

	private Socket socket;
	private BufferedReader in;
	private PrintStream out;
	private static ArrayList<Session> sessions = new ArrayList<Session>();
	
	ServerThread(Socket socket) throws IOException{
		this.socket = socket;
		in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
		out = new PrintStream(socket.getOutputStream());
	}
	
	//Read index file
	public String[] getFileContent(String filename) throws IOException {
		String currentDir = System.getProperty("user.dir");
		List<String> list = Files.readAllLines(Paths.get(currentDir + "/" + filename), StandardCharsets.UTF_8);
		
		return list.toArray(new String[list.size()]);
	}

	@Override
	public void run() {
			
		try {
			// TODO Auto-generated method stub
			String methodHeader = null;
			String cookieHeader = null;
			//Read data endlessly until break
			while(true) {
				
				String data = in.readLine();
				
				if(data != null && !data.equals("")) {

					if(data.startsWith("GET")) {
						methodHeader = data;
					}
					
					else if(data.startsWith("Cookie:")){
						cookieHeader = data;
					}
				}
				else {
					break;
				}
			}
			
			if(methodHeader == null) {
				throw new Exception();
			}
			
			System.out.println("Got request: " + methodHeader);
			System.out.println("Got cookie: " + cookieHeader);
			
			//Find or create session
			Session newSession = null;
			
			//If there is a cookie with the request
			if(cookieHeader != null) {
				try {
					// Then extract the cookie id
					int id = Integer.parseInt(cookieHeader.substring(11, 15));
					System.out.println("Session id: " + id);
					// Search through all sessions
					for(Session s:sessions) {
						// If it is found among the current sessions, set this sessions to it and stop searching
						if(s.getId() == id) {
							newSession = s;
							break;
						}
					}
				}
				catch(Exception e){
					
				}
			}
			
			// If newSession is null, there was no cookie
			if(newSession == null) {
				
				// Then assign a session id and answer(correctGuess) to this session
				newSession = new Session();
				// And add it to sessions list
				sessions.add(newSession);
			}
			
			// If user has pressed reset button, reset everything but id and cookie
			if(methodHeader.contains("?reset=")) {

				newSession.reset();
			}
			// If a user has made a guess
			if(methodHeader.startsWith("GET /?guess=")) {
				
				try {
					//Set newgGuess to the new guess, convert it to int
					String newGuess = methodHeader.replaceFirst(Pattern.quote("GET /?guess="), "");
					newGuess = newGuess.replaceFirst(" HTTP/1.1", "");
					int guess = Integer.parseInt(newGuess);

					//Game logic
					newSession.tryGuess(guess);
				}
				catch(Exception e){
					
				}
			}
			
			//Get html files as an array of lines
			String[] htmlLines = getFileContent("Index.html");
			int length = 0;

			//For each line
			for(int i = 0; i < htmlLines.length ; i++) {

				//If the line has __TEXT__, we know this is the message displayed
				if(htmlLines[i].contains("__TEXT__")) {
					
					//If the last guess was the correct answer, replace the line with winning message
					if(newSession.getLastGuess() == newSession.getCorrectGuess()) {
						htmlLines[i] = htmlLines[i].replaceFirst("__TEXT__", 
								"You made it!!! "
								+ "You have made " + newSession.getNumberOfGuesses() + " guesses.");
					}
					
					else {
						//If there have been no guesses, it should be the first time, or the user has guessed invalid guesses(not a number)
						if(newSession.getNumberOfGuesses() == 0) {
							htmlLines[i] = htmlLines[i].replaceFirst("__TEXT__", 
									"Welcome to the Number Guess Game. Guess a number "
									+ "between 1 and 100.");
						}
						//If there have been guesses
						else if(newSession.getNumberOfGuesses() > 0) {
							
							String firstLine = "";
							//If the last guess was more than max or less than min
							if (newSession.getLastGuess() > newSession.getMax() || newSession.getLastGuess() < newSession.getMin()) {
								firstLine = "Nope, guess a number between " + newSession.getMin() +
										" and " + newSession.getMax();
							}
							//Otherwise, respond with whether the correct answer is higher or lower
							else 
							{
								if(newSession.getLastGuess() < newSession.getCorrectGuess()) {
									firstLine = "Nope, guess higher";
								}
								else if(newSession.getLastGuess() > newSession.getCorrectGuess()) {
									firstLine = "Nope, guess lower";
								}
							}
							
							//And respond with firstLine + amount of guesses
							htmlLines[i] = htmlLines[i].replaceFirst("__TEXT__", 
									 firstLine + " <br> You have made " +
											newSession.getNumberOfGuesses() + " guess(es)");
							
							
						}
					}
				}
				
				//add length of string and length of new line, 
				//which we later add with println
				length += htmlLines[i].length() + 2; 
			}
			
			//Return request to browser
			out.println("HTTP/1.1 200 OK");
			out.println("Content-Type: text/html");
			out.println("Content-Length: " + length);
			out.println("Set-Cookie: id=" + newSession.getId() + ";");
			//Needed to show that what comes next is html code
			out.println();
			
			for(String str:htmlLines) {
				out.println(str);
			}

			//Close the socket
			socket.close();

		}
			catch(Exception e){
				System.out.println(e.getMessage());
			}
	}
}
