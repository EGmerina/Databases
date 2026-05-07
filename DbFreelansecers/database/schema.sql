CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
CREATE TYPE user_status AS ENUM ('active', 'blocked', 'deleted');
CREATE TYPE order_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE response_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE contract_status AS ENUM ('active', 'completed', 'cancelled', 'disputed');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE CHECK (birth_date <= CURRENT_DATE),
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    gender gender_enum,
    status user_status NOT NULL DEFAULT 'active',
    card_number VARCHAR(20) UNIQUE
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
    description TEXT NOT NULL
);

CREATE TABLE freelancers (
    freelancer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    skills TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    employer_id INT NOT NULL REFERENCES employers(employer_id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    required_skills TEXT NOT NULL,
    expected_payment DECIMAL(10, 2) NOT NULL CHECK (expected_payment > 0),
    deadline TIMESTAMP NOT NULL,
    status order_status NOT NULL DEFAULT 'open',
    CONSTRAINT orders_deadline_check CHECK (deadline > publication_date)
);

CREATE TABLE order_responses (
    response_id SERIAL PRIMARY KEY,
    freelancer_id INT NOT NULL REFERENCES freelancers(freelancer_id) ON DELETE CASCADE,
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    status response_status NOT NULL DEFAULT 'pending',
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (freelancer_id, order_id)
);

CREATE TABLE contracts (
    contract_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL UNIQUE REFERENCES orders(order_id) ON DELETE RESTRICT,
    freelancer_id INT NOT NULL REFERENCES freelancers(freelancer_id) ON DELETE RESTRICT,
    status contract_status NOT NULL DEFAULT 'active',
    conclusion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL CHECK (payment_amount > 0),
    deadline TIMESTAMP NOT NULL CHECK (deadline > conclusion_date),
    employer_rating INT CHECK (employer_rating BETWEEN 1 AND 5),
    freelancer_rating INT CHECK (freelancer_rating BETWEEN 1 AND 5)
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL REFERENCES contracts(contract_id) ON DELETE RESTRICT,
    status transaction_status NOT NULL DEFAULT 'pending',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0)
);

CREATE TABLE portfolios (
    album_id SERIAL PRIMARY KEY,
    freelancer_id INT NOT NULL REFERENCES freelancers(freelancer_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description TEXT,
    file_links JSONB NOT NULL
);

