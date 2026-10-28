# Plenix login service: Node 22, nothing else. Built and run on the Plenix VM by services/login/deploy.sh.
FROM node:22-alpine
WORKDIR /srv
COPY server.js accounts.js favicon.svg ./
USER node
# CDN: the Platform release the sign-in page loads (deploy.sh passes the version in package.json)
ENV DATA=/data PORT=8782 TRUST_PROXY=1
EXPOSE 8782
CMD ["node", "server.js"]
