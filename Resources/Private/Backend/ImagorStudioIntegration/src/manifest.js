import manifest from '@neos-project/neos-ui-extensibility';
import ImagorImageEditor from "./ImagorImageEditor";

manifest('Sandstorm.ImagorStudio/ImagorStudioIntegration', {}, globalRegistry => {
	const secondaryEditorsRegistry = globalRegistry.get('inspector').get('secondaryEditors');
	secondaryEditorsRegistry.set('Neos.Neos/Inspector/Secondary/Editors/ImageCropper', {
		component: ImagorImageEditor
	});
});
