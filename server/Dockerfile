FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

EXPOSE 3003

CMD ["npx", "tsx", "src/Index.ts"]
