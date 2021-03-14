CREATE DATABASE Toro;
\c Toro

CREATE SEQUENCE account_id_sequence;

CREATE TABLE Account (
    Id INT PRIMARY KEY NOT NULL DEFAULT nextval('account_id_sequence'),
    Balance FLOAT,
    OwnerCPF VARCHAR(11) UNIQUE
);

CREATE TABLE "User" (
    CPF VARCHAR(11) PRIMARY KEY,
    Name VARCHAR
);

CREATE TABLE UserAsset (
    Id SERIAL PRIMARY KEY,
    AssetId VARCHAR,
    OwnerCPF VARCHAR(11)
);

CREATE TABLE Asset (
    Id VARCHAR PRIMARY KEY,
    CurrentValue FLOAT,
    NegotiationRate FLOAT
);

INSERT INTO "User" VALUES ('45358996060', 'Test user');
INSERT INTO Account VALUES ('300123', 0, '45358996060');
