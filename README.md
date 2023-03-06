# serverless-canvas
## Example configuration of serverless function using node-canvas


I created this repo after struggling through https://github.com/Automattic/node-canvas/issues/1779 
and https://answers.netlify.com/t/node-canvas-error-libuuid-so-1-cannot-open-shared-object-file-no-such-file-or-directory/30179/30. 
Both threads follow the myriad problems when trying to deploy [node-canvas](https://github.com/Automattic/node-canvas/) to a serverless 
environment like that provided by [netlify](https://netlify.app) functions.
This also bled over into alternative `canvas` libraries as might be interesting / relevant and documented in issues [here](https://github.com/Brooooooklyn/canvas/issues/647)
and [here](https://github.com/samizdatco/skia-canvas/issues/138) wrt https://github.com/Brooooooklyn/canvas and https://github.com/samizdatco/skia-canvas respectively.

My post in the netlify forum is [here](https://answers.netlify.com/t/node-canvas-error-libuuid-so-1-cannot-open-shared-object-file-no-such-file-or-directory/30179/33?u=okwme) but the instrucitons are as follows:

* use build image Focal 20.04
* use https://github.com/Automattic/node-canvas with v2.11.0
* add the following environment variables to netlify deploy settings (not to the .env file)
  * `LD_LIBRARY_PATH` to `/var/task/node_modules/canvas/build/Release`
* Ensure the version of node is `16.19.1` by adding a `.nvmrc` file to the project root containing that version
