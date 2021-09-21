<?php

namespace App\Exceptions;

class HumanReadableException extends Base implements Interfaces\HumanReadable {
    protected string $userMessage;
    private ?string $title;

    public function __construct(string $userMessage, ?string $title = null)
    {
        $this->userMessage = $userMessage;
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getUserMessage(): string
    {
        return $this->userMessage;
    }

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }
}