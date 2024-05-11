# PFR_mobileshop

starting stuff
DB(in server)
	docker build -t my_mongo_image .
	docker run -p 6000:27017 -it --name my_mongo_container -d my_mongo_image
Server
	npm run build
	npm run start
Client
	ng serve

posibble error
	on win need to set execution policy
	node version needs to be at least v18.13
	install typescript if missing
	bycrypt might need a reinstall for good architecture
		npm cache clean --force
		npm rebuild bcrypt --build-from-source
		npm uninstall bcrypt
		npm install bcrypt
		node -p "process.arch"
		npm install --global windows-build-tools
		npm run start
	in packeges.json this route can give error
		"build": "node ./node_modules/typescript/bin/tsc",

to populate database with some data(mobile)
1. Install TypeScript
	npm install -g typescript
2. Install Required Packages
	npm install mongoose
3. Compile TypeScript
	tsc populate-mobile.ts
4. Run the Script
	node populate-mobile.js