import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  Widget
} from '@phosphor/widgets';

// import {
//   Kernel,
//   // KernelAPI,
//   KernelManager,
//   KernelMessage
// } from '@jupyterlab/services';

import {
  Test,
} from './form'

/**
 * Initialization data for the jupyterlab-poc extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_apod',
  autoStart: true,
  requires: [ICommandPalette],
  activate: async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension AR2TECH POC is activated!');

    // Create a blank content widget inside of a MainAreaWidget
    // const content = new Test({});
    // const widget = new ReactWidget({content});

    const widget: Widget = new Test();

    widget.id = 'apod-jupyterlab';
    widget.title.label = 'AR2TECH POC';
    widget.title.closable = true;

    // Add an application command
    const command: string = 'apod:open';
    app.commands.addCommand(command, {
      label: 'AR2TECH POC',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });


    // Add the command to the palette.
    palette.addItem({command, category: 'Geostatistics'});

    // Add an image element to the content
    let img = document.createElement('img');
    // content.node.appendChild(img);
    img.src = 'https://www.ar2tech.com/assets/images/ar2/ColorTetraLoDef2.png';
    img.title = 'ar2tech';

    // sconst test = new Test()


    //  // Start a python kernel
    // console.log('Starting kernel');

    // let kernelManager = new KernelManager();
    // // let kernel = await kernelManager.startNew({ name: 'AR2TECH' });
    // console.log('List all Kernels');
    // const runningKernels = await Kernel.listRunning()
    // debugger
    // console.log(runningKernels[0]['id'])
    // const kernel = await kernelManager.connectTo({id: '46bfe3dd-9328-4aa9-8524-95ae60e95e5a', name: 'test'})
    // // console.log(kernel);

    // // Register a callback for when the kernel changes state.
    // kernel.statusChanged.connect((_, status) => {
    //   // console.log(`Status: ${status}`);
    // });

    // console.log('Saving a variable');
    // let future = kernel.requestExecute({ code: 'a = "A simple variable AR2TECH"' });
    // // Handle iopub messages
    // future.onIOPub = msg => {
    //   if (msg.header.msg_type !== 'status') {
    //     console.log(msg.content);
    //   }
    // };
    // await future.done;
    // // console.log('Execution is done');

    // console.log('Send an inspect message');
    // let request: KernelMessage.IInspectRequestMsg['content'] = {
    //   code: 'a',
    //   cursor_pos: 4,
    //   detail_level: 0
    // };
    // let inspectReply = await kernel.requestInspect(request);
    // console.log('Looking at reply');
    // if (inspectReply.content.status === 'ok') {
    //   console.log('Inspect reply:');
    //   console.log(inspectReply.content.data);
    // }

    // console.log('Interrupting the kernel');
    // await kernel.interrupt();

  }
};

export default extension;
