class MemoryGame {
    constructor() {
        this.cards = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🥝', '🥝', '🍉', '🍉'];
        this.board = document.getElementById('gameBoard');
        this.movesDisplay = document.getElementById('moves');
        this.moves = 0;
        this.flippedCards = [];
        this.matchedPairs = 0;

        this.init();
    }

    init() {
        this.shuffle();
        this.render();
    }

    shuffle() {
        // Fisher-Yates Shuffle
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    render() {
        this.board.innerHTML = "";
        this.cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;
            card.dataset.emoji = emoji;
            card.addEventListener('click', () => this.flipCard(card));
            this.board.appendChild(card);
        });
    }

    flipCard(card) {
        // Rules:
        // 1. Agar already flipped hai ya matched hai, to ignore karo
        // 2. Agar 2 cards already flipped hain, to ignore karo
        if (card.classList.contains('flipped') || card.classList.contains('matched') || this.flippedCards.length >= 2) return;

        card.classList.add('flipped');
        card.innerText = card.dataset.emoji;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesDisplay.innerText = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found!
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.flippedCards = [];
            this.matchedPairs++;

            if (this.matchedPairs === 8) {
                setTimeout(() => alert(`You won in ${this.moves} moves! 🎉`), 500);
            }
        } else {
            // No match, flip back
            setTimeout(() => {
                card1.classList.remove('flipped');
                card1.innerText = "";
                card2.classList.remove('flipped');
                card2.innerText = "";
                this.flippedCards = [];
            }, 1000);
        }
    }

    restart() {
        this.moves = 0;
        this.matchedPairs = 0;
        this.movesDisplay.innerText = 0;
        this.flippedCards = [];
        this.init();
    }
}

// Game start karo
const game = new MemoryGame();
