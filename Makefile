build:
	docker-compose build
	docker-compose run --rm main npm run migrations:run
up:
	docker-compose up
down: 
	docker-compose down
