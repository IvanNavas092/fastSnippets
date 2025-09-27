import { ChangeDetectorRef, Component } from '@angular/core';
import { IaAgentService } from '@/app/core/services/ia-agent-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-ia-agent',
  imports: [FormsModule, CommonModule],
  templateUrl: './ia-agent.html',
  styleUrls: ['./ia-agent.css'],
})
export class IaAgent {
  userInput = '';
  messages: Message[] = [];
  loading = false;
  count = 0;

  constructor(private iaAgentService: IaAgentService) {}

  submitMessage() {
    const message = this.userInput.trim();
    if (!message) return;
    this.count++;
    this.messages.push({ id: this.count, sender: 'user', text: message });
    this.userInput = '';
    this.loading = true;

    this.iaAgentService.sendMessage(message).subscribe({
      next: (response) => {
        this.messages.push({ id: this.count, sender: 'bot', text: response });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.messages.push({ id: this.count, sender: 'bot', text: 'ha ocurrido un error, intenta de nuevo' });

        console.log(this.messages);
      },
    });
  }

  trackByMsg(msg: Message) {
    return msg.id;
  }
}
