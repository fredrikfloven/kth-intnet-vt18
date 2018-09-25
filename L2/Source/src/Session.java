import java.util.Random;

public class Session {

	private int id;
	private int numberOfGuesses;
	private int correctGuess;
	private int lastGuess;
	private int max = 100;
	private int min = 1;
	private static int lastId = 1000;
	Random r = new Random();
	
	public Session() throws Exception {
		// TODO Auto-generated constructor stub
		if(lastId > 9999) {
			throw new Exception("Game full");
		}
		this.id = lastId;
		lastId++;
		this.correctGuess = 1 + r.nextInt(99);
		this.numberOfGuesses = 0;
		this.lastGuess = 0;
	}
	
	public void tryGuess(int guess) {
		//If the last guess wasn't the correct guess
		if(getLastGuess() != getCorrectGuess()) {
			
			//Increment amount of guesses, and set lastGuess to the new guess
			incrementGuesses();
			setLastGuess(guess);
			
			//If the new guess is larger than the correct answer and smaller than the max, set new max
			if(guess > getCorrectGuess() && guess < getMax()) {
				setMax(guess);
			}
			//If the new guess is smaller than the correct answer and larger than the min, set new min
			else if(guess < getCorrectGuess() && guess > getMin()) {
				setMin(guess);
				
			}
		}
	}
	
	public void incrementGuesses() {
		numberOfGuesses += 1;
	}
	
	public int getId() {
		return id;
	}
	
	public int getNumberOfGuesses() {
		return numberOfGuesses;
	}
	
	public int getCorrectGuess() {
		return correctGuess;
	}
	
	public int getLastGuess() {
		return lastGuess;
	}
	
	public void setLastGuess(int newValue) {
		lastGuess = newValue;
	}

	public int getMax() {
		return max;
	}
	
	public int getMin() {
		return min;
	}
	
	public void setMax(int newValue) {
		max = newValue;
	}
	
	public void setMin(int newValue) {
		min = newValue;
	}
	
	public void reset() {
		
		this.correctGuess = 1 + r.nextInt(99);
		this.numberOfGuesses = 0;
		this.lastGuess = 0;
		max = 100;
		min = 1;
	}
}
