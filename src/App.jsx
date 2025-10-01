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
  // Flashcards data with questions, answers, categories, and images

  const [flashcards] = useState([
    { question: 'Are you ready to start the quiz?', answer: 'Lets get it started' },
    { question: 'Who lives in a pineapple under the sea?', answer: 'Spongebob Squarepants', 
      category: 'Spongebob', 
      /*https://www.citypng.com/photo/9231/hd-spongebob-pineapple-house-transparent-png */
      image: SpongebobHouse },
    { question: 'What is the name of the city where the Simpsons live?', answer: 'Springfield', 
      category: 'The Simpsons',
      /*https://www.pinterest.com/pin/18084835993850800/ */ 
      image: Springfield },
    { question: 'What does Jimmy Neutron call himself?', answer: 'The Boy Genius', 
      category: 'Jimmy Neutron',
      /*https://www.redbubble.com/i/art-print/Jimmy-Neutron-by-WalrusClothesCo/23641479.1G4ZT  */ 
      image: JimmyNeutron },
    { question: "What are Timmy Turner's fairy godparents' names?", answer: 'Cosmo and Wanda', 
      category: 'Fairly OddParents', 
      /*https://loathsomecharacters.miraheze.org/wiki/Cosmo_and_Wanda_%28seasons_9_and_10%29  */
      image: FairlyGodparents},
    { question: 'What does Aang have to master to become the Avatar?', answer: 'The four elements (water, earth, fire, air)', 
      category: 'Avatar: The Last Airbender',
      /*https://ekostories.com/2012/09/08/avatar-airbender-forces-change/  */ 
      image: FourElements },
    { question: 'Whose catchphrase is "I\'m gonna be king of the pirates!"?', answer: 'Monkey D. Luffy from One Piece', 
      category: 'One Piece', 
      /*https://www.pinterest.com/pin/one-piece--171629435793296822/  */
      image: Luffy },
    { question: 'What did people call Naruto Uzumaki before he became a ninja?', answer: 'The knucklehead ninja', 
      category: 'Naruto', 
      /*https://www.deviantart.com/thepi7on/art/Naruto-Sage-Mode-4k-vector-674021687  */
      image: NarutoSageMode },
    { question: 'In Dragon Ball Z, what is Goku’s real name?', answer: 'Kakarot', 
      category: 'Dragon Ball Z',
      /*https://www.deviantart.com/fryquest/art/Goku-Depth-Effect-Wallpaper-954815691  */ 
      image: Goku },
    { question: 'In Death Note, what is L’s last name?', answer: 'L Lawliet', 
      category: 'Death Note',
      /*https://vocal.media/journal/l-lawliet  */ 
      image: LLawliet },
    { question: 'In My Hero Academia, which character has a quirk that is half-hot and half-cold?', answer: 'Shoto Todoroki', 
      category: 'My Hero Academia',
      /*https://ultrarumble.com/character/4  */ 
      image: ShotoTodoroki },
  ]);

  // State to track the current flashcard index and flip status
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  // This function is to go to the next flashcard
  const nextFlashcard = () => {
    // Reset flip state when moving to the next card
    setFlip(false);
    // Ensure the next card is different from the current one
    let randomIndex = Math.floor(Math.random() * flashcards.length);
    // Keep generating a new index until it's different from the current one
    while (randomIndex === currentFlashcardIndex && flashcards.length > 1) {

      randomIndex = Math.floor(Math.random() * flashcards.length);
    }
    // Update the current flashcard index to the new random index
    setCurrentFlashcardIndex(randomIndex);
    
  };

// This function that it goes to the previous flashcard
  const backFlashcard = () => {
    // To reset flip state when moving to the previous card
    setFlip(false)
    setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  }
  // App.jsx (The final, corrected return block)

const currentCard = flashcards[currentFlashcardIndex];
return (
  // 1. Apply the category class to the main App div for styling
  //    (We use .toLowerCase() because CSS class names are usually lowercase)
  <div className={`App ${currentCard.category ? currentCard.category.toLowerCase() : ''}`}>
    <h1>Greatest Cartoon and Anime Quiz</h1>
    <h2>Let's see how much you know about cartoons and anime!</h2>
    <p>Total Flashcards: {flashcards.length}</p>

    <div 
    // 4. Flip card functionality
      className={`flip-card ${flip ? 'flip' : ''}`} 
      /* Toggle flip state on click */
      onClick={() => setFlip(!flip)}
    >
      
      <div className="flip-card-inner">
        <div className="flip-card-front">
          
          {/* Conditionally render the image if the current card has one */}
          
          {currentCard.image && (
            <img src={currentCard.image} alt="Flashcard visual" className="card-image" />
          )}
          
          {/* Use currentCard variable */}
          <h2>{currentCard.question}</h2>
        </div>
        <div className="flip-card-back">
          {/* Use currentCard variable */}
          <h2>{currentCard.answer}</h2>
        </div>
      </div>
    </div>
    {/* 5. Buttons to navigate flashcards*/}
    <button onClick={backFlashcard}> Back Question</button>
    <button onClick={nextFlashcard}>Next Question</button>
  </div>
);
};
export default App;
