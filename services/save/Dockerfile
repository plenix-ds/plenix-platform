# Plenix save service (batch 258): Node 22 and git, nothing else. Built and run on the Plenix VM by services/save/deploy.sh.
FROM node:22-alpine
RUN apk add --no-cache git
WORKDIR /srv
COPY server.js .
USER node
ENV DATA=/data PORT=8781
EXPOSE 8781
CMD ["node", "server.js"]
