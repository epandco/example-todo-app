import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as config from './config/config';
import { UnthinkExpressGenerator } from '@epandco/unthink-foundation-express';
import { renderTemplateWithContextAdded } from './nunjucks-renderer';
import { UnthinkGenerator } from '@epandco/unthink-foundation';
import resourceDefinitions from './resource-definitions';

const app: express.Application = express();
app.use(cookieParser());

app.use('/public/', express.static(path.join(process.cwd(), 'public')));

const expressGen = new UnthinkExpressGenerator(app, renderTemplateWithContextAdded, 'debug');
const unthinkGen = new UnthinkGenerator(expressGen);

resourceDefinitions.forEach(rd => unthinkGen.add(rd));

unthinkGen.printRouteTable();
unthinkGen.generate();

app.listen(config.expressServerPort);
