T = 投稿

# make post T="投稿名"
post:
	hugo new post/${T}.md

start:
	hugo server

build:
	rm -rf public && hugo