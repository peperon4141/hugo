T = 投稿

start:
	hugo server

# make post T="投稿名"
post:
	hugo new post/${T}.md

build:
	hugo