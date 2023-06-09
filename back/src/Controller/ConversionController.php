<?php

namespace App\Controller;

use App\Entity\Conversion;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConversionController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/conversions', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $conversions = $this->entityManager->getRepository(Conversion::class)->findAll();
        $data = [];

        foreach ($conversions as $conversion) {
            $data[] = [
                'id' => $conversion->getId(),
                'originalValue' => $conversion->getOriginalValue(),
                'convertedValue' => $conversion->getConvertedValue(),
                'type' => $conversion->getType(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/conversions', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);

        $conversion = new Conversion();
        $conversion->setOriginalValue($requestData['originalValue']);
        $conversion->setConvertedValue($requestData['convertedValue']);
        $conversion->setType($requestData['type']);

        $this->entityManager->persist($conversion);
        $this->entityManager->flush();

        $data = [
            'id' => $conversion->getId(),
            'originalValue' => $conversion->getOriginalValue(),
            'convertedValue' => $conversion->getConvertedValue(),
            'type' => $conversion->getType(),
        ];

        return new JsonResponse($data, Response::HTTP_CREATED);
    }

    #[Route('/conversions/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $conversion = $this->entityManager->getRepository(Conversion::class)->find($id);

        if (!$conversion) {
            return new JsonResponse(['error' => 'Conversion not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($conversion);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Conversion deleted'], Response::HTTP_OK);
    }
}
