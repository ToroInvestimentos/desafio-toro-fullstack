jest.mock('../../src/infrastructure/repositories/account.repository');

import 'reflect-metadata';
import { Account } from '../../src/domain/account.model';
import { User } from '../../src/domain/user.model';
import { DepositDto } from '../../src/infrastructure/dto/deposit.dto';
import { OriginDto } from '../../src/infrastructure/dto/origin.dto';
import { TargetDto } from '../../src/infrastructure/dto/target.dto';
import { InvalidOperationException } from '../../src/infrastructure/exceptions/invalidOperation.exception';
import { AccountRepository } from "../../src/infrastructure/repositories/account.repository";
import { AccountService } from "../../src/service/account.service";

describe('AccountService', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should deposit value', async () => {
        // Arrange

        const targetDto = new TargetDto('352', '0001', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);

        const user = new User('MOCKED USER', '01234567890');
        const account = new Account(user, 999999, 10);

        const mockGetAccountById = jest.fn();
        mockGetAccountById.mockResolvedValue(account);

        const mockUpdateAccount = jest.fn();
        
        const accountRepositoryMock = new AccountRepository();
        accountRepositoryMock.getAccountById = mockGetAccountById;
        accountRepositoryMock.updateAccount = mockUpdateAccount;

        const sut = new AccountService(accountRepositoryMock);
        
        // Act
        await sut.DepositValue(depositDto);
        
        // Assert
        expect(accountRepositoryMock.getAccountById).toHaveBeenCalledTimes(1);
        expect(accountRepositoryMock.updateAccount).toHaveBeenCalledTimes(1);
        
    });

    test('should fail to deposit when CPFs are different', async () => {
        // Arrange

        const targetDto = new TargetDto('352', '0001', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);

        const user = new User('MOCKED USER', '09876543210');
        const account = new Account(user, 999999, 10);

        const mockGetAccountById = jest.fn();
        mockGetAccountById.mockResolvedValue(account);

        const mockUpdateAccount = jest.fn();
        
        const accountRepositoryMock = new AccountRepository();
        accountRepositoryMock.getAccountById = mockGetAccountById;
        accountRepositoryMock.updateAccount = mockUpdateAccount;

        const sut = new AccountService(accountRepositoryMock);
        
        // Act/Assert
        expect(sut.DepositValue(depositDto))
            .rejects
            .toThrow(InvalidOperationException);

        expect(accountRepositoryMock.getAccountById).toHaveBeenCalledTimes(1);
        expect(accountRepositoryMock.updateAccount).not.toHaveBeenCalledTimes(1);
        
    });

    test('should fail to deposit when bank number is different than 352', async () => {
        // Arrange

        const targetDto = new TargetDto('123', '0001', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);

        const accountRepositoryMock = new AccountRepository();

        const sut = new AccountService(accountRepositoryMock);
        
        // Act/Assert
        expect(sut.DepositValue(depositDto))
            .rejects
            .toThrow(InvalidOperationException);
    });

    test('should fail to deposit when branch number is different than 0001', async () => {
        // Arrange

        const targetDto = new TargetDto('352', '9999', 1);
        const originDto = new OriginDto('001', '1234', '01234567890');
        const depositDto = new DepositDto('TRANSFER', targetDto, originDto, 15);

        const accountRepositoryMock = new AccountRepository();

        const sut = new AccountService(accountRepositoryMock);
        
        // Act/Assert
        expect(sut.DepositValue(depositDto))
            .rejects
            .toThrow(InvalidOperationException);
    });

})