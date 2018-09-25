import java.io.BufferedReader;
import java.io.IOException;

public class ClientSocketReaderThread implements Runnable{
	BufferedReader in;
	
	ClientSocketReaderThread (BufferedReader in){
		this.in = in;
	}
	
	@Override
	public void run() {
		while(true) {
			try {
				//Get data from socket and print to terminal
				String data = in.readLine();
				if (data != null && data.length()>0) {
					System.out.println(data);
				}
			
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
