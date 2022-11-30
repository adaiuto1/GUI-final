DROP DATABASE IF EXISTS db; -- why are we dropping an existing database?

-- create database db
CREATE DATABASE IF NOT EXISTS db;

-- use newly create database
USE db;

-- create table in db
create table applications
(
    tenent      int        null,
    landlord    int        not null,
    property_id int        not null,
    approved    tinyint(1) null,
    response    int        null,
    primary key (landlord, property_id),
    constraint applications_Users_null_fk
        foreign key (landlord) references Users (user_id),
    constraint applications_Users_null_fk2
        foreign key (tenent) references Users (user_id),
    constraint applications_property_table_null_fk
        foreign key (property_id) references property_table (propertyId)
);

create table comments
(
    property_id int  not null
        primary key,
    user_id     int  not null,
    comment     text not null,
    constraint comments_Users_null_fk
        foreign key (user_id) references Users (user_id),
    constraint comments_property_table_null_fk
        foreign key (property_id) references property_table (propertyId)
);

create table landlord_rating
(
    num_rating  int   default 0 null,
    rating      float default 0 null,
    landlord_id int             not null
        primary key,
    constraint landlord_rating_Users_null_fk
        foreign key (landlord_id) references Users (user_id)
);

create table profiles
(
    user_id     int                  not null
        primary key,
    firstname   varchar(255)         not null,
    lastname    varchar(255)         not null,
    smoker      tinyint(1) default 0 null,
    petFriendly tinyint(1) default 0 null,
    bio         text                 null,
    tag1        tinyint(1) default 0 null,
    tag2        tinyint(1) default 0 null,
    tag3        tinyint(1) default 0 null,
    tag4        tinyint(1) default 0 not null,
    tag5        tinyint(1) default 0 null,
    tag6        tinyint(1) default 0 null,
    constraint user_id
        foreign key (user_id) references Users (user_id)
);

create table property_table
(
    address       varchar(255)         not null,
    city          varchar(255)         null,
    zipcode       int                  null,
    propertyId    int auto_increment   not null
        primary key,
    monthlyRent   int                  null,
    owner         int                  null,
    ratingSum     double               null,
    numRatings    int                  null,
    capacity      int                  null,
    sqft          int                  null,
    allowsPets    tinyint(1) default 0 null,
    allowsSmoking tinyint(1) default 0 null,
    img           varchar(255)         null,
    tag1          tinyint(1) default 0 null,
    tag2          tinyint(1) default 0 null,
    tag3          tinyint(1) default 0 null,
    tag4          tinyint(1) default 0 null,
    tag5          tinyint(1) default 0 null,
    tag6          tinyint(1) default 0 null,
    tag7          tinyint(1) default 0 null,
    constraint owner
        foreign key (owner) references Users (user_id)
);

create table Users
(
    user_id      int auto_increment
        primary key,
    password     varchar(255)  not null,
    username     varchar(35)   not null,
    account_type int default 1 null,
    constraint Users_username_uindex
        unique (username)
);

