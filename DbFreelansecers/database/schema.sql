
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    gender VARCHAR(10),
    status VARCHAR(50) NOT NULL
);

CREATE TABLE authorizations (
    auth_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    user_login VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    last_login_time TIMESTAMP
);

CREATE TABLE employers (
    employer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    card_number VARCHAR(20) UNIQUE
);

CREATE TABLE freelancers (
    freelancer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    skills TEXT NOT NULL,
    description TEXT NOT NULL,
    card_number VARCHAR(20) UNIQUE
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    employer_id INT NOT NULL REFERENCES employers(employer_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    required_skills TEXT NOT NULL,
    expected_payment DECIMAL(10, 2) NOT NULL,
    deadline TIMESTAMP NOT NULL
);

CREATE TABLE order_responses (
    response_id SERIAL PRIMARY KEY,
    freelancer_id INT NOT NULL REFERENCES freelancers(freelancer_id) ON DELETE CASCADE,
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (freelancer_id, order_id)
);

CREATE TABLE contracts (
    contract_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL UNIQUE REFERENCES orders(order_id) ON DELETE CASCADE,
    freelancer_id INT NOT NULL REFERENCES freelancers(freelancer_id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    conclusion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    employer_rating INT,
    freelancer_rating INT
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL REFERENCES contracts(contract_id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE portfolios (
    album_id SERIAL PRIMARY KEY,
    freelancer_id INT NOT NULL REFERENCES freelancers(freelancer_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description TEXT,
    file_links JSONB NOT NULL
);

CREATE TYPE order_status AS ENUM (
    'open',
    'in_progress',
    'completed',
    'cancelled'
);