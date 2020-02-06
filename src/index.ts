import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the jupyterlab-poc extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-poc',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-poc is activated!');
  }
};

export default extension;
