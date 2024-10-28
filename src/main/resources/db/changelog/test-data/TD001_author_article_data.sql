--liquibase formatted SQL

--changeset ahmedM:TD001
--comment: Inserting Test Data for Author and Article

-- Clear existing data (if needed)
DELETE FROM article;
DELETE FROM author;

-- Reset sequences (if needed)
ALTER SEQUENCE author_id_seq RESTART WITH 1;
ALTER SEQUENCE article_id_seq RESTART WITH 1;

-- Insert Authors
INSERT INTO author (first_name, last_name, email, bio, created_at, updated_at) VALUES
('John', 'Smith', 'john.smith@email.com', 'Senior Java Developer with 10 years of experience in enterprise applications.', NOW(), NOW()),
('Emma', 'Wilson', 'emma.wilson@email.com', 'Technical writer and Spring Framework enthusiast.', NOW(), NOW()),
('Michael', 'Johnson', 'michael.j@email.com', 'Software architect specializing in microservices.', NOW(), NOW()),
('Sarah', 'Davis', 'sarah.davis@email.com', 'Full-stack developer and open source contributor.', NOW(), NOW()),
('Robert', 'Brown', 'robert.brown@email.com', 'DevOps engineer and cloud computing expert.', NOW(), NOW()),
('Lisa', 'Anderson', 'lisa.anderson@email.com', 'AI researcher and technical blogger.', NOW(), NOW()),
('David', 'Martinez', 'david.m@email.com', 'Security specialist and conference speaker.', NOW(), NOW()),
('Jennifer', 'Taylor', 'jennifer.t@email.com', 'Agile coach and technology consultant.', NOW(), NOW()),
('William', 'White', 'william.white@email.com', 'Database administrator and performance tuning specialist.', NOW(), NOW()),
('Maria', 'Garcia', 'maria.g@email.com', 'UI/UX designer and frontend developer.', NOW(), NOW());

-- Insert Articles
INSERT INTO article (title, content, publishing_date, author_id, created_at, updated_at) VALUES
('Getting Started with Spring Boot 3', 'Spring Boot 3 brings exciting new features...', NOW() - INTERVAL '30 days', 1, NOW(), NOW()),
('Microservices Best Practices', 'When designing microservices architecture...', NOW() - INTERVAL '25 days', 3, NOW(), NOW()),
('JPA and Hibernate Tips', 'Optimize your database operations with these JPA tips...', NOW() - INTERVAL '20 days', 1, NOW(), NOW()),
('Security in Spring Applications', 'Essential security practices for your Spring apps...', NOW() - INTERVAL '15 days', 7, NOW(), NOW()),
('React vs Angular in 2024', 'Comparing modern frontend frameworks...', NOW() - INTERVAL '10 days', 10, NOW(), NOW()),
('Docker Deployment Strategies', 'Learn various deployment patterns using Docker...', NOW() - INTERVAL '8 days', 5, NOW(), NOW()),
('Clean Code Principles', 'Writing maintainable and scalable code...', NOW() - INTERVAL '7 days', 2, NOW(), NOW()),
('API Design Guidelines', 'RESTful API best practices and standards...', NOW() - INTERVAL '6 days', 4, NOW(), NOW()),
('Database Optimization Techniques', 'Improve your database performance...', NOW() - INTERVAL '5 days', 9, NOW(), NOW()),
('Agile Development Tips', 'Practical tips for agile teams...', NOW() - INTERVAL '4 days', 8, NOW(), NOW()),
('Cloud Native Applications', 'Building scalable cloud applications...', NOW() - INTERVAL '3 days', 5, NOW(), NOW()),
('Machine Learning with Spring', 'Implementing ML models in Spring...', NOW() - INTERVAL '2 days', 6, NOW(), NOW()),
('Testing Spring Boot Applications', 'Comprehensive testing strategies...', NOW() - INTERVAL '1 day', 1, NOW(), NOW()),
('Kubernetes in Production', 'Real-world Kubernetes deployment scenarios...', NOW(), 5, NOW(), NOW()),
('Advanced Git Workflows', 'Mastering Git for team collaboration...', NOW() - INTERVAL '12 days', 4, NOW(), NOW()),
('Spring Security OAuth2', 'Implementing OAuth2 authentication...', NOW() - INTERVAL '18 days', 7, NOW(), NOW()),
('GraphQL vs REST', 'Choosing the right API approach...', NOW() - INTERVAL '22 days', 3, NOW(), NOW()),
('CI/CD Pipeline Setup', 'Setting up robust CI/CD pipelines...', NOW() - INTERVAL '27 days', 5, NOW(), NOW()),
('MongoDB with Spring Data', 'Working with NoSQL databases in Spring...', NOW() - INTERVAL '29 days', 1, NOW(), NOW()),
('Reactive Programming', 'Introduction to reactive programming...', NOW() - INTERVAL '35 days', 2, NOW(), NOW());

-- Insert an article without an author (for testing null author scenarios)
INSERT INTO article (title, content, publishing_date, created_at, updated_at) VALUES
('Legacy System Migration', 'Steps to migrate legacy systems...', NOW() - INTERVAL '40 days', NOW(), NOW());

--rollback

