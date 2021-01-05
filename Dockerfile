# FROM node:alpine as build

# # создание директории приложения
# RUN mkdir /app && mkdir /src
# WORKDIR /src

# RUN npm i lerna -g
# RUN npm i webpack -g
# RUN npm i cross-env -g
# RUN npm i typescript -g
# RUN npm i rimraf -g

# # установка зависимостей
# # символ астериск ("*") используется для того чтобы по возможности 
# # скопировать оба файла: package.json и package-lock.json
# COPY package*.json ./
# COPY /packages/server/package*.json ./packages/server/
# COPY /packages/client/package*.json ./client/server/
# COPY lerna.json ./

# # Если вы создаете сборку для продакшн
# RUN npm ci --only=production
# RUN lerna bootstrap
# # копируем исходный код
# # Добавляем в образ весь проект

# # Устанавливаем зависимости, собираем проект и удаляем зависимости
# COPY . .

# WORKDIR /src/packages/client
# RUN npm install -D
# RUN npm run build

# WORKDIR /src/packages/server
# RUN npm install -D

# RUN npm run build

# # В результате получается образ, состоящий из одного слоя
# FROM node:alpine
# WORKDIR /src
# # Копируем собранные файлы из папки build в папку app
# COPY --from=build ./packages/server/dist/* /app/packages/server/dist/
# COPY --from=build ./packages/client/dist/* /app/packages/client/dist/
# # COPY /src/packages/server/dist/* /app/packages/server/dist/
# # COPY /src/packages/client/dist/* /app/packages/client/dist/
# ENTRYPOINT ["/app"]

# EXPOSE 3000:3000
# CMD [ "npm", "start" ]

##=====================================================================================================================

# FROM node:latest

# WORKDIR /usr/src/app

# RUN npm i lerna -g --loglevel notice

# COPY package.json .
# COPY lerna.json .

# RUN npm install --loglevel notice
# RUN lerna bootstrap

# RUN npm run build
# COPY packages/client/dist ./packages/client/dist
# COPY packages/server/dist ./packages/server/dist


# EXPOSE 3000:3000
# CMD [ "npm", "start" ]

#==========================================================================================


FROM node:12.13.0

SHELL ["/bin/bash", "-c"]

RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY packages/client/package.json /app/packages/client/package.json
COPY packages/server/package.json /app/packages/server/package.json
COPY lerna.json /app/lerna.json
RUN ["/bin/bash", "-c", "yarn install"]

# Bundle app source
COPY . /app
RUN ["/bin/bash", "-c", "yarn bootstrapdocker"]
RUN ["/bin/bash", "-c", "yarn builddocker"]

EXPOSE 3000

CMD [ "yarn", "startdocker" ]
