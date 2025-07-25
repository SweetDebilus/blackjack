import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService, Card, Suit } from '../card.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('fadeCard', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class GameComponent {
  points = 100;
  bet = 0;
  gameOver = false;
  gameStarted = false;
  result: string = '';

  playerHand: Card[] = [];
  dealerHand: Card[] = [];

  playerScore = 0;
  dealerScore = 0;

  dealerReveal = false;

  constructor(public cardService: CardService, private router: Router) {
    this.resetGame();
  }

  startRound(): void {
    if (this.bet <= 0 || this.bet > this.points) return;

    this.playerHand = [this.cardService.drawCard(), this.cardService.drawCard()];
    this.dealerHand = [this.cardService.drawCard(), this.cardService.drawCard()];

    this.playerScore = this.cardService.getHandValue(this.playerHand);
    this.dealerScore = this.cardService.getHandValue(this.dealerHand);

    this.gameStarted = true;
    this.result = '';
    this.dealerReveal = false;

    if (this.cardService.isBlackjack(this.playerHand)) {
      this.points += Math.floor(this.bet * 1.5);
      this.result = 'Blackjack 🎉';
      this.bet = 0;
      this.gameStarted = false;
      this.dealerReveal = true;
      this.checkGameOver();
    }
  }

  hit(): void {
    if (!this.gameStarted) return;

    this.playerHand.push(this.cardService.drawCard());
    this.playerScore = this.cardService.getHandValue(this.playerHand);

    if (this.playerScore > 21) {
      this.dealerReveal = true;
      this.endRound();
    }
  }

  stand(): void {
    if (!this.gameStarted) return;

    while (this.cardService.getHandValue(this.dealerHand) < 17) {
      this.dealerHand.push(this.cardService.drawCard());
    }

    this.dealerScore = this.cardService.getHandValue(this.dealerHand);
    this.dealerReveal = true;

    this.endRound();
  }

  endRound(): void {
    if (this.playerScore > 21 || (this.dealerScore <= 21 && this.dealerScore > this.playerScore)) {
      this.points -= this.bet;
      this.result = 'Lose 😢';
    } else if (this.playerScore === this.dealerScore) {
      this.result = 'Tie 🤝';
    } else {
      this.points += this.bet;
      this.result = 'Win 🏆';
    }

    this.bet = 0;
    this.gameStarted = false;
    this.checkGameOver();
  }

  resetGame(): void {
    this.points = 100;
    this.bet = 0;
    this.playerHand = [];
    this.dealerHand = [];
    this.result = '';
    this.gameOver = false;
    this.gameStarted = false;
    this.playerScore = 0;
    this.dealerScore = 0;
    this.dealerReveal = false;
  }

  increaseBet(): void {
    if (this.points - this.bet >= 10) this.bet += 10;
  }

  decreaseBet(): void {
    if (this.bet >= 10) this.bet -= 10;
  }

  allIn(): void {
    this.bet = this.points;
  }

  checkGameOver(): void {
    this.gameOver = this.points <= 0;
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
    this.resetGame();
  }

  getSuitClass(suit: Suit): string {
    switch (suit) {
      case '♥': return 'hearts';
      case '♦': return 'diamonds';
      case '♣': return 'clubs';
      case '♠': return 'spades';
      default: return '';
    }
  }
}
