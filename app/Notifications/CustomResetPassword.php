<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomResetPassword extends Notification
{
    use Queueable;

    /** @var object */
    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct($token) {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */    public function toMail(object $notifiable): MailMessage {
        return (new MailMessage)
            ->subject('Redefinir Senha')
            ->greeting('Olá!')
            ->line('Você solicitou a redefinição de sua senha.')
            ->action('Redefinir Senha', url(config('app.url').route('password.reset', $this->token, false)))
            ->line('Se você não solicitou a redefinição, ignore este e-mail.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array {
        return [
        ];
    }
}
