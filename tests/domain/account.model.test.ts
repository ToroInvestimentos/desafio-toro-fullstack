import { Account } from "../../src/domain/account.model";
import { User } from "../../src/domain/user.model";
import { InsufficientFundsError } from "../../src/infrastructure/exceptions/insufficientFunds.exception";
import { InvalidValueError } from "../../src/infrastructure/exceptions/invalidValue.exception";

describe('AccountModel', () => {

    test('should deposit value', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const sut = new Account(user, '0001', 10);
        
        // Act
        sut.deposit(10);
        
        // Assert
        expect(sut.balance).toBe(20);
    });

    test('should withdraw value', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const sut = new Account(user, '0001', 10);
        
        // Act
        sut.withdraw(5);
        
        // Assert
        expect(sut.balance).toBe(5);
        
    });

    test('should fail when try to deposit with an invalid value', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const sut = new Account(user, '0001', 10);
        
        // Assert
        expect(() => { sut.deposit(-10) }).toThrow(InvalidValueError); 
    });

    test('should fail when try to withdraw with an invalid value', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const sut = new Account(user, '0001', 10);
        
        // Assert
        expect(() => { sut.withdraw(-10) }).toThrow(InvalidValueError); 
    });

    test('should fail when try to withdraw with insufficient funds', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const sut = new Account(user, '0001', 10);
        
        // Assert
        expect(() => { sut.withdraw(100) }).toThrow(InsufficientFundsError); 
    });

})