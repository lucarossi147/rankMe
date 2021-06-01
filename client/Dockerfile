#Tell docker to use this image, node, as base image
FROM node:16

# Set a envirnoment variable to use later
ENV WORKINGDIR=/app
ENV PATH /app/node_modules/.bin:$PATH

#Set working directory as default for operations
WORKDIR ${WORKINGDIR}

#Copy file with dependencies for npm install
COPY package*.json ./

# Install dependencies
RUN	npm install --silent

#Bundle app source
COPY . .

#Indicate port to expose to the extern
EXPOSE 5000

#Set comand to launch at start
CMD ["npm", "run", "start"]
