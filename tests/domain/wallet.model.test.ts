import { Account } from "../../src/domain/account.model";
import { Asset } from "../../src/domain/asset.model";
import { User } from "../../src/domain/user.model";
import { UserAsset } from "../../src/domain/userAsset.model";
import { Wallet } from "../../src/domain/wallet.model";
import { InsufficientAssetsException } from "../../src/infrastructure/exceptions/insufficientAssets.exception";
import { UserDoesntHaveAccountException } from "../../src/infrastructure/exceptions/userDoesntHaveAccount.exception";

describe('WalletModel', () => {

    test('should buy asset', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const account = new Account(user, '0001', 10);
        user.account = account;
        const asset = new Asset('TEST1', 1);
        const sut = new Wallet(user);
        
        
        // Act
        sut.buyAsset(asset, 5);
        
        // Assert
        expect(sut.assets).toHaveLength(1);
        expect(sut.assets[0].asset).toBe(asset);
        expect(sut.assets[0].quantity).toBe(5);
        expect(account.balance).toBe(5);
        
    });

    test('should sell all assets', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const account = new Account(user, '0001', 10);
        user.account = account;
        
        const asset = new Asset('TEST1', 1);
        const userAssets = new Array<UserAsset>();
        userAssets.push(new UserAsset(5, asset));

        const sut = new Wallet(user, userAssets);
        
        // Act
        sut.sellAsset(asset, 5);
        
        // Assert
        expect(sut.assets).toHaveLength(0);
        expect(account.balance).toBe(15);
        
    });

    test('should sell one asset of the wallet', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const account = new Account(user, '0001', 10);
        user.account = account;
        
        const asset = new Asset('TEST1', 1);
        const userAssets = new Array<UserAsset>();
        userAssets.push(new UserAsset(5, asset));

        const sut = new Wallet(user, userAssets);
        
        // Act
        sut.sellAsset(asset, 1);
        
        // Assert
        expect(sut.assets).toHaveLength(1);
        expect(sut.assets[0].asset).toBe(asset);
        expect(sut.assets[0].quantity).toBe(4);
        expect(account.balance).toBe(11);
        
    });

    test('should fail to sell insufficient assets of the wallet', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        const account = new Account(user, '0001', 10);
        user.account = account;
        
        const asset = new Asset('TEST1', 1);
        const userAssets = new Array<UserAsset>();
        userAssets.push(new UserAsset(5, asset));

        const sut = new Wallet(user, userAssets);
        
        // Assert
        expect(()=> { sut.sellAsset(asset, 10) }).toThrow(InsufficientAssetsException);
        
    });

    test('should fail to buy assets if user doesnt have an account', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        
        const asset = new Asset('TEST1', 1);
        const userAssets = new Array<UserAsset>();
        userAssets.push(new UserAsset(5, asset));

        const sut = new Wallet(user, userAssets);
        
        // Assert
        expect(()=> { sut.buyAsset(asset, 10) }).toThrow(UserDoesntHaveAccountException);
        
    });

    test('should fail to sell assets if user doesnt have an account', () => {
        // Arrange
        const user = new User('Test user', '01234567890');
        
        const asset = new Asset('TEST1', 1);
        const userAssets = new Array<UserAsset>();
        userAssets.push(new UserAsset(5, asset));

        const sut = new Wallet(user, userAssets);
        
        // Assert
        expect(()=> { sut.sellAsset(asset, 5) }).toThrow(UserDoesntHaveAccountException);
        
    });

});