import { Container } from 'inversify';
import { SbpController } from './controller/sbp.controller';
import { AccountRepository } from './infrastructure/repositories/account.repository';
import { Server } from './server';
import { AccountService } from './service/account.service';

const DiContainer = new Container();

DiContainer.bind<Server>(Server).toSelf();

DiContainer.bind<SbpController>(SbpController).toSelf().inRequestScope();
DiContainer.bind<AccountService>(AccountService).toSelf().inRequestScope();
DiContainer.bind<AccountRepository>(AccountRepository).toSelf().inSingletonScope();

export default DiContainer;
