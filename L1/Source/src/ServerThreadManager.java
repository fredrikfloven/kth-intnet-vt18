import java.util.ArrayList;

public class ServerThreadManager {

	ArrayList <ServerThread> threads = new ArrayList <ServerThread>();

	public synchronized void addThread(ServerThread st) {
		threads.add(st);
	}
	
	public synchronized ArrayList <ServerThread> getThreads (){
		return threads;
	}
}
