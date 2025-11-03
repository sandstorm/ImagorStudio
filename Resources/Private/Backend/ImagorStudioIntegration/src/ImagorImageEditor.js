import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { neos } from '@neos-project/neos-ui-decorators';
import { $transform } from 'plow-js';
import { selectors } from '@neos-project/neos-ui-redux-store';
import { connect } from 'react-redux';
import { Button } from '@neos-project/react-ui-components';
import FullscreenReferencesMultiselect from './FullscreenReferencesMultiselect';

/*const getDataLoaderOptionsForProps = props => ({
    contextNodePath: props.focusedNodePath,
    dataSourceIdentifier: props.options.dataSourceIdentifier,
    dataSourceUri: props.options.dataSourceUri,
    dataSourceAdditionalData: props.options.dataSourceAdditionalData,
    dataSourceDisableCaching: Boolean(props.options.dataSourceDisableCaching)
});
@neos(globalRegistry => ({
    dataSourcesDataLoader: globalRegistry.get('dataLoaders').get('DataSources')
}))
@connect($transform({
    focusedNodePath: selectors.CR.Nodes.focusedNodePathSelector
}))
*/
@neos(globalRegistry => ({
	imagorJwt: globalRegistry.get('frontendConfiguration').get('Sandstorm.ImagorStudio').imagorJwt
}))
export default class ImagorImageEditor extends PureComponent {

    render() {
			console.log("IMAGOR JWT", this.props);
			const {sourceImage, cropConfiguration, onComplete, imagorJwt} = this.props;

			return <iframe
				src={`http://localhost:5173/?token=${imagorJwt}&path=${sourceImage.image.imagorStudioImagepath}&theme=dark`}
				width="100%"
				height="100%"
				frameBorder="0"
				title="Image Editor"
			>
			</iframe>
		}

}
