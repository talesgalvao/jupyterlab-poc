import * as React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';

import {
  Kernel,
  // KernelAPI,
  KernelManager,
  // KernelMessage
} from '@jupyterlab/services';

async function alertar(param: any){
   // Start a python kernel
  console.log('Starting kernel');

  let kernelManager = new KernelManager();
  // let kernel = await kernelManager.startNew({ name: 'AR2TECH' });
  console.log('List all Kernels');
  const runningKernels = await Kernel.listRunning()
  console.log(runningKernels[0]['id'])
  const kernel = await kernelManager.connectTo({id: '057c14a9-6c24-43d8-b65e-c13e4cc58e92', name: 'test'})
  // console.log(kernel);

  // Register a callback for when the kernel changes state.
  kernel.statusChanged.connect((_, status) => {
    // console.log(`Status: ${status}`);
  });

  console.log('Saving a variable');
  let future = kernel.requestExecute({ code: `geo = "${param}"` });
  // Handle iopub messages
  future.onIOPub = msg => {
    if (msg.header.msg_type !== 'status') {
      console.log(msg.content);
    }
  };
  await future.done;
  // console.log('Execution is done');

  // console.log('Send an inspect message');
  // let request: KernelMessage.IInspectRequestMsg['content'] = {
  //   code: 'a',
  //   cursor_pos: 4,
  //   detail_level: 0
  // };
  // let inspectReply = kernel.requestInspect(request);
  // console.log('Looking at reply');
  // if (inspectReply.content.status === 'ok') {
  //   console.log('Inspect reply:');
  //   console.log(inspectReply.content.data);
  // }

  // console.log('Interrupting the kernel');
  // kernel.interrupt();
}

export class Testing extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { username: '' };
  }

  myChangeHandler = (event: any) => {
    this.setState({username: event.target.value});
    alertar(event.target.value)
  }

  render() {
    return (
      <form>
        <h1>Hello {this.state.username}</h1>
        <p>A value to variable testing:</p>
        <input
          type='text'
          placeholder='Type "geo" variable content'
          width='200'
          onChange={this.myChangeHandler}
        />
      </form>
    );
  }
}

export class Test extends ReactWidget {
  render(){
    return (
      <div>
        <Testing />
      </div>
    )
  }
}
