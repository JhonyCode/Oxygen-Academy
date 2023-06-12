<?php

namespace App\Entity;

use App\Repository\ConversionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConversionRepository::class)]
class Conversion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $originalValue = null;

    #[ORM\Column(length: 100)]
    private ?string $convertedValue = null;

    #[ORM\Column(length: 50)]
    private ?string $type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOriginalValue(): ?string
    {
        return $this->originalValue;
    }

    public function setOriginalValue(string $originalValue): static
    {
        $this->originalValue = $originalValue;

        return $this;
    }

    public function getConvertedValue(): ?string
    {
        return $this->convertedValue;
    }

    public function setConvertedValue(string $convertedValue): static
    {
        $this->convertedValue = $convertedValue;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }
}
