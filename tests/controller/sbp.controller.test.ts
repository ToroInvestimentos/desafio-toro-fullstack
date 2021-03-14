jest.mock('../../src/infrastructure/repositories/account.repository');
jest.mock('../../src/service/account.service');

import 'reflect-metadata';
import req from 'supertest';
import { Server } from "../../src/server";
import { SbpController } from "../../src/controller/sbp.controller";
import { AccountRepository } from "../../src/infrastructure/repositories/account.repository";
import { AccountService } from "../../src/service/account.service";
import { TargetDto } from '../../src/infrastructure/dto/target.dto';
import { OriginDto } from '../../src/infrastructure/dto/origin.dto';
import { DepositDto } from '../../src/infrastructure/dto/deposit.dto';
import { InvalidDtoException } from '../../src/infrastructure/exceptions/invalidDto.exception';
import { InvalidOperationException } from '../../src/infrastructure/exceptions/invalidOperation.exception';

describe('SbpController', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should return 200 when operation is ok', async () => {
        // Arrange
        const targetDto = new TargetDto('352', '0001', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);
        
        const accountRepositoryMock = new AccountRepository();
        const accountServiceMock = new AccountService(accountRepositoryMock);

        const sbpController = new SbpController(accountServiceMock);
        const sut = new Server(sbpController);
        
        // Act/Assert
        await req(sut.server).post('/sbp/events')
            .send(depositDto)
            .expect(200);
        
    });

    test('should return 400 when target does not match to Toro information', async () => {
        // Arrange
        const targetDto = new TargetDto('999', '9999', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);
        
        const accountRepositoryMock = new AccountRepository();
        const accountServiceMock = new AccountService(accountRepositoryMock);

        const mockedDepositValue = jest.fn();
        mockedDepositValue.mockImplementation((value) => {
            throw new InvalidDtoException();
        });
        accountServiceMock.DepositValue = mockedDepositValue;

        const sbpController = new SbpController(accountServiceMock);
        const sut = new Server(sbpController);
        
        // Act/Assert
        await req(sut.server).post('/sbp/events')
            .send(depositDto)
            .expect('Content-Type', /json/)
            .expect(400);
        
    });

    test('should return 422 when CPF does not match', async () => {
        // Arrange
        const targetDto = new TargetDto('352', '0001', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);
        
        const accountRepositoryMock = new AccountRepository();
        const accountServiceMock = new AccountService(accountRepositoryMock);

        const mockedDepositValue = jest.fn();
        mockedDepositValue.mockImplementation((value) => {
            throw new InvalidOperationException();
        });
        accountServiceMock.DepositValue = mockedDepositValue;

        const sbpController = new SbpController(accountServiceMock);
        const sut = new Server(sbpController);
        
        // Act/Assert
        await req(sut.server).post('/sbp/events')
            .send(depositDto)
            .expect('Content-Type', /json/)
            .expect(422);
        
    });

    test('should return 500 when there is an internal error', async () => {
        // Arrange
        const targetDto = new TargetDto('352', '0001', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);
        
        const accountRepositoryMock = new AccountRepository();
        const accountServiceMock = new AccountService(accountRepositoryMock);

        const mockedDepositValue = jest.fn();
        mockedDepositValue.mockImplementation((value) => {
            throw new Error();
        });
        accountServiceMock.DepositValue = mockedDepositValue;

        const sbpController = new SbpController(accountServiceMock);
        const sut = new Server(sbpController);
        
        // Act/Assert
        await req(sut.server).post('/sbp/events')
            .send(depositDto)
            .expect('Content-Type', /json/)
            .expect(500);
        
    });
})