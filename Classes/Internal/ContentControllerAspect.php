<?php
declare(strict_types=1);

namespace Sandstorm\ImagorStudio\Internal;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Aop\JoinPointInterface;
use Neos\Flow\ResourceManagement\ResourceManager;

#[Flow\Aspect]
class ContentControllerAspect
{

    public function __construct(private readonly ResourceManager $resourceManager)
    {
    }

    #[Flow\Around("method(Neos\Neos\Controller\Backend\ContentController->getImagePreviewData())")]
    public function afterGetImagePreviewData(JoinPointInterface $joinPoint)
    {
        $res = $joinPoint->getAdviceChain()->proceed($joinPoint);
        $image = $joinPoint->getMethodArgument('image');
        assert($image instanceof \Neos\Media\Domain\Model\Image);
        $stream = $this->resourceManager->getStreamByResource($image->getResource());
        if ($stream !== false) {
            $meta = stream_get_meta_data($stream);
            $fullPath = $meta['uri'];
            if (str_starts_with($fullPath, FLOW_PATH_DATA)) {
                $fullPath = substr($fullPath, strlen(FLOW_PATH_DATA));
            }
            $res['imagorStudioImagepath'] = $fullPath;
        }

        return $res;
    }
}
