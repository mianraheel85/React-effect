import React, { useState, useEffect } from "react";
import axios from "axios";

function CardDeck() {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    // Fetch a new deck when the component mounts
    async function fetchNewDeck() {
      try {
        const response = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/"
        );
        setDeckId(response.data.deck_id);
        setRemaining(response.data.remaining);
      } catch (error) {
        console.error("Error fetching new deck:", error);
      }
    }

    fetchNewDeck();
  }, []);

  const drawCard = async () => {
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
      );

      if (response.data.remaining === 0) {
        // If no cards remaining, show an alert
        alert("Error: no cards remaining");
      } else {
        // Update remaining count and current card
        setRemaining(response.data.remaining);
        setCurrentCard(response.data.cards[0]);
      }
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  };

  return (
    <div>
      <h1>Deck of Cards App</h1>
      {deckId && (
        <>
          <p>Remaining Cards: {remaining}</p>
          <button onClick={drawCard}>Draw a Card</button>
          {currentCard && (
            <div>
              <img src={currentCard.image} alt={currentCard.code} />
              <p>
                {currentCard.value} of {currentCard.suit}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CardDeck;
