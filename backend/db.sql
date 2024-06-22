-- Active: 1707508737568@@127.0.0.1@5432@pilkosis

CREATE TYPE role AS ENUM('admin', 'user');

CREATE TABLE siswa (
    id SERIAL NOT NULL,
    nama VARCHAR(255) NOT NULL,
    paswd VARCHAR(255) NOT NULL,
    pilihan INTEGER,
    role_user role,
    ayah VARCHAR(255),
    ibu VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE calon (
    id SERIAL NOT NULL,
    nomor_urut INTEGER NOT NULL,
    nama VARCHAR(255) NOT NULL,
    caksis VARCHAR(255) NOT NULL,
    cawaksis VARCHAR(255) NOT NULL,
    visi TEXT,
    misi TEXT,
    total INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE feedback (
    id SERIAL NOT NULL,
    nama VARCHAR(255) NOT NULL,
    kritik TEXT,
    saran TEXT,
    PRIMARY KEY (id)
)