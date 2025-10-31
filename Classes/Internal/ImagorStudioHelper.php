<?php
declare(strict_types=1);

namespace Sandstorm\ImagorStudio\Internal;

use Firebase\JWT\JWT;
use Neos\Flow\Annotations as Flow;
use Neos\Eel\ProtectedContextAwareInterface;

class ImagorStudioHelper implements ProtectedContextAwareInterface
{

    #[Flow\InjectConfiguration(path: 'jwtSecret')]
    protected $jwtSecret;

    public function generateJwt()
    {
        $payload = [
            'exp' => time() + (60 * 60), // 1 hour
            // 'path_prefix' => "users/{$userId}", // Optional: restrict access
        ];

        return JWT::encode($payload, $this->jwtSecret, 'HS256');
    }

    public function allowsCallOfMethod($methodName)
    {
        return true;
    }
}
