
        document.addEventListener('DOMContentLoaded', () => {
            const symbols = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒'];
            const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

            const memoryGame = document.getElementById('memory-game');

            let selectedCards = [];
            let matchedPairs = 0;
            let isClickable = true;

            for (let i = 0; i < shuffledSymbols.length; i++) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.index = i;
                card.addEventListener('click', handleCardClick);
                memoryGame.appendChild(card);
            }

            function handleCardClick(event) {
                if (!isClickable) {
                    return;
                }

                const clickedCard = event.target;

                if (!selectedCards.includes(clickedCard) && selectedCards.length < 2) {
                    selectedCards.push(clickedCard);
                    clickedCard.textContent = shuffledSymbols[clickedCard.dataset.index];

                    if (selectedCards.length === 2) {
                        isClickable = false;
                        setTimeout(checkMatch, 1000);
                    }
                }
            }

            function checkMatch() {
                const [card1, card2] = selectedCards;

                if (card1.textContent === card2.textContent) {
                    card1.removeEventListener('click', handleCardClick);
                    card2.removeEventListener('click', handleCardClick);
                    matchedPairs++;

                    if (matchedPairs === symbols.length) {
                        alert('Congratulations! You matched all pairs!');
                        resetGame();
                    }
                } else {
                    card1.textContent = '';
                    card2.textContent = '';
                }

                selectedCards = [];
                isClickable = true;
            }

            function resetGame() {
                selectedCards = [];
                matchedPairs = 0;
                isClickable = true;

                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.textContent = '';
                    card.addEventListener('click', handleCardClick);
                });

                // Shuffle symbols for a new game
                shuffledSymbols.sort(() => Math.random() - 0.5);
            }
        });