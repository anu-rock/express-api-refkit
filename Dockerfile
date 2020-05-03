FROM node:12

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
ENV NODE_ENV development

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node .env.example ./.env

# This step may seem redudant since we are already defining a volume in our Compose file.
# See this for explanation:
# https://docs.docker.com/compose/faq/#should-i-include-my-code-with-copyadd-or-a-volume
COPY --chown=node:node . .

CMD ["npm", "run", "watch-debug"]

EXPOSE 3000