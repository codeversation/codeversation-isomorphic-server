import { log } from 'utilities';

require('vendor/opal.min.js');
require('vendor/opal-parser.min.js');

Opal.require('opal-parser');

export default ::Opal.compile;
