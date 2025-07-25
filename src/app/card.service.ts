import { Injectable } from '@angular/core';

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
}

@Injectable({ providedIn: 'root' })
export class CardService {
  private deck: Card[] = [];
  private discardedCards: Card[] = [];

  constructor() {
    this.resetDeck();
  }

  private resetDeck(numDecks: number = 1): void {
    const suits: Suit[] = ['♠', '♥', '♦', '♣'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    this.deck = [];

    for (let i = 0; i < numDecks; i++) {
      this.deck.push(...suits.flatMap(suit => ranks.map(rank => ({ suit, rank }))));
    }

    this.shuffleDeck();
    this.discardedCards = [];
  }

  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  drawCard(): Card {
    if (this.deck.length === 0) {
      this.resetDeck(); // Remélange complet
    }
    const card = this.deck.pop()!;
    this.discardedCards.push(card);
    return card;
  }

  getHandValue(cards: Card[]): number {
    let value = 0;
    let aces = 0;

    for (const card of cards) {
      if (card.rank === 'A') {
        value += 11;
        aces++;
      } else if (['K', 'Q', 'J'].includes(card.rank)) {
        value += 10;
      } else {
        value += parseInt(card.rank);
      }
    }

    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  }

  formatCard(card: Card): string {
    return `${card.rank}${card.suit}`;
  }

  isBlackjack(cards: Card[]): boolean {
    return cards.length === 2 && this.getHandValue(cards) === 21;
  }

  resetAll(): void {
    this.resetDeck();
    this.discardedCards = [];
  }

  getRemainingCards(): number {
    return this.deck.length;
  }

  getDiscardedCards(): Card[] {
    return [...this.discardedCards];
  }
}
