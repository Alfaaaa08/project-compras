<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

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
     */
    public function toMail(object $notifiable): MailMessage {
        return (new MailMessage)
            ->subject(Lang::get('Redefinir Senha'))
            ->greeting('Olá!')
            ->line(Lang::get('Você está recebendo este e-mail porque nós recebemos uma solicitação de redefinição de senha para sua conta.'))
            ->action(Lang::get('Redefinir Senha'), url(config('app.url').route('password.reset', $this->token, false)))
            ->line(Lang::get('Este link de redefinição de senha expirará em :count minutos.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
            ->line(Lang::get('Se você não solicitou uma redefinição de senha, nenhuma ação adicional é necessária.'));
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
