import { useState } from 'react';
import './App.css';
import SpongebobHouse from './assets/Spongebob House.png';
import Springfield from './assets/Springfield.jpg';
import JimmyNeutron from './assets/Jimmy Neutron.jpg';
import FairlyGodparents from './assets/Fairly Godparents.png';
import FourElements from './assets/Four Elements.jpg';
import Luffy from './assets/Luffy.jpg';
import NarutoSageMode from './assets/Naruto Sage Mode.jpg';
import Goku from './assets/Goku.jpg';
import LLawliet from './assets/L Lawliet.jpg';
import ShotoTodoroki from './assets/Shoto Todoroki.png';

const App = () => {
  const initialFlashcards = [
    { question: 'Are you ready to start the quiz?', answer: 'Lets get it started' },
    { question: 'Who lives in a pineapple under the sea?', answer: 'Spongebob Squarepants', 
      difficulty:'easy', category: 'Spongebob',
       /*https://www.citypng.com/photo/9231/hd-spongebob-pineapple-house-transparent-png */
      image: SpongebobHouse },
    { question: 'What is the name of the city where the Simpsons live?', answer: 'Springfield', 
      difficulty:'medium', category: 'The Simpsons', 
       /*https://www.pinterest.com/pin/18084835993850800/ */ 
      image: Springfield },
    { question: 'How many villans does Jimmy Neutron has?', answer: '14', 
      difficulty:'medium', category: 'Jimmy Neutron', 
      /*https://www.redbubble.com/i/art-print/Jimmy-Neutron-by-WalrusClothesCo/23641479.1G4ZT  */
      image: JimmyNeutron },
    { question: "What are Timmy Turner's fairy godparents' names?", answer: 'Cosmo and Wanda', 
      difficulty:'easy', category: 'Fairly OddParents', 
       /*https://loathsomecharacters.miraheze.org/wiki/Cosmo_and_Wanda_%28seasons_9_and_10%29  */
      image: FairlyGodparents },
    { question: 'Name four chracters who has these elements', answer: 'Aang, Katara, Toph, and Zuko', 
      difficulty:'medium', category: 'Avatar: The Last Airbender', 
      /*https://ekostories.com/2012/09/08/avatar-airbender-forces-change/  */ 
      image: FourElements },
    { question: 'What is Monkey D. Luffy crew names"?', answer: 'Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, and Jinbe', 
      difficulty:'hard', category: 'One Piece', 
      /*https://www.pinterest.com/pin/one-piece--171629435793296822/  */
      image: Luffy },
    { question: 'What did people call Naruto Uzumaki before he became a ninja?', answer: 'The knucklehead ninja', 
      difficulty:'hard', category: 'Naruto', 
       /*https://www.deviantart.com/thepi7on/art/Naruto-Sage-Mode-4k-vector-674021687  */
      image: NarutoSageMode },
    { question: 'In Dragon Ball Z, what is Goku’s real name?', answer: 'Kakarot', 
      difficulty:'easy', category: 'Dragon Ball Z', 
      /*https://www.deviantart.com/fryquest/art/Goku-Depth-Effect-Wallpaper-954815691  */
      image: Goku },
    { question: 'In Death Note, Who is L rival?', answer: 'Light Yagami', 
      difficulty:'easy', category: 'Death Note', 
      /*https://vocal.media/journal/l-lawliet  */ 
      image: LLawliet },
    { question: 'In My Hero Academia, How many siblings does Shoto Todoroki', answer: '3', 
      difficulty:'medium', category: 'My Hero Academia', 
      /*https://ultrarumble.com/character/4  */ 
      image: ShotoTodoroki},
  ];

  // allow updating flashcards (for shuffle, mastered, etc.)
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  const currentCard = flashcards[currentFlashcardIndex];
 // This function is to go to the next flashcard
  const nextFlashcard = () => {
    /**/
    if (currentFlashcardIndex < flashcards.length - 1) {
      // Reset flip state when moving to the next card
      setFlip(false);
      setFeedback('');
      setUserAnswer('');
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    }
  };
// This function that it goes to the previous flashcard
  const backFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setFlip(false);
      setFeedback('');
      setUserAnswer('');
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentFlashcardIndex(0);
    setFlip(false);
    setFeedback('');
    setUserAnswer('');
  };

  // normalize for punctuation-insensitive, case-insensitive matching
  const normalize = (str = '') => str.toLowerCase().replace(/[^\w\s]|_/g, '').trim();

  const submitAnswer = () => {
    // normalize both answers
    const user = normalize(userAnswer);
    const correct = normalize(currentCard?.answer || '');

    // guard: require some input
    if (!user) {
      setFeedback('Please type an answer before submitting.');
      return;
    }
    // check if the normalized answers match (exact or partial)
    const isCorrect = correct.includes(user) || user.includes(correct);
    /* update feedback and streaks */
    if (isCorrect) {
      setFeedback('✅ That is Correct!');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setHighestStreak(prev => Math.max(prev, newStreak));
    } else {
      setFeedback('❌ Incorrect, The correct answer is: ' + currentCard.answer);
      setCurrentStreak(0);
    }
  };

  return (
    /* Dynamic class based on category for background styling */
    <div className={`App ${currentCard?.category ? currentCard.category.toLowerCase() : ''}`}>
      <h1>Greatest Cartoon and Anime Quiz 2</h1>
      <h2>Let's see how much you know about cartoons and anime! Do your Best!!</h2>
      <p>Total Flashcards: {flashcards.length}</p>
      <p>Click on the card to flip and see the answer!</p>
      <p>Flashcard {currentFlashcardIndex + 1} of {flashcards.length}</p>
      <p>Card {currentFlashcardIndex + 1} Difficulty: {currentCard?.difficulty || 'n/a'} | Category: {currentCard?.category || 'n/a'}</p>
      <p>Current Streak: {currentStreak}</p>
      <p>Highest Streak: {highestStreak}</p>

      <div
      // Flip card container with dynamic classes based on difficulty and flip state
        className={`flip-card ${currentCard?.difficulty?.toLowerCase() || ''} ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
      > 
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {currentCard?.image && <img src={currentCard.image} alt="Flashcard visual" className="card-image" />}
            <h2>{currentCard?.question}</h2>
          </div>
          <div className="flip-card-back">
            <h2>{currentCard?.answer}</h2>
          </div>
        </div>
      </div>
      
      <input
        type="text"
        placeholder="Type your answer here..."
        className="answer-input"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={submitAnswer} className="submit-button">Submit Answer</button>
      <p className="feedback">{feedback}</p>

      <button onClick={shuffleCards} className="shuffle-button">Shuffle Cards</button>

      <div className="navigation-buttons">
        <button
          onClick={backFlashcard}
          disabled={currentFlashcardIndex === 0}
          style={{
            opacity: currentFlashcardIndex === 0 ? 0.5 : 1,
            cursor: currentFlashcardIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Back Question
        </button>
        
        <button
          onClick={nextFlashcard}
          disabled={currentFlashcardIndex === flashcards.length - 1}
          style={{
            opacity: currentFlashcardIndex === flashcards.length - 1 ? 0.5 : 1,
            cursor: currentFlashcardIndex === flashcards.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default App;

