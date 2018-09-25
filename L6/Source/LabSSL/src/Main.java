import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.cert.CertificateException;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;

public class Main {
	// Get the key store from the test3.jks file.
	public static KeyStore getKeyStore() throws KeyStoreException, NoSuchProviderException, NoSuchAlgorithmException, CertificateException, IOException {
		// Create file stream.
		InputStream fileInputStream = new FileInputStream("test3.jks");
		
		// Create key store.
		KeyStore keyStore = KeyStore.getInstance("JKS", "SUN");
		
		// Load key store.
		keyStore.load(fileInputStream, "rootroot".toCharArray());
		return keyStore;
	}
	
	public static void main(String[] args) throws Exception {
		// Create TLS context.
		SSLContext context = SSLContext.getInstance("TLS");
		
		// Create key manager factory.
		KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance("SunX509");
		
		// Initialize key manager factory with the key store for the method above.
		// It loads the key store from file.
		keyManagerFactory.init(getKeyStore(), "rootroot".toCharArray());
		
		// Initialize the TLS context with the key managers.
		context.init(keyManagerFactory.getKeyManagers(), null, null);
		
		// Create server socket factory.
		SSLServerSocketFactory socketFactory = context.getServerSocketFactory(); 
		
		// Create socket (from factory) on PORT. 
		SSLServerSocket serverSocket = (SSLServerSocket) socketFactory.createServerSocket(443);
		
		// Keep running forever.
		while (true)
		{
			// Accept any incoming new connections as a new socket.
			SSLSocket socket = (SSLSocket) serverSocket.accept();

			// Create a print stream.
			PrintStream out = new PrintStream(socket.getOutputStream());
			
			// Print part of the "HTTP protocol". 
			out.println("HTTP/1.1 200 OK");
			out.println("Content-Type: text/html");
			out.println("Content-Length: 13");
			out.println();
			out.println("Hello World!");
			
			// Close everything.
			out.close();
			socket.close();
		}
	}
}