FROM node:20-alpine

WORKDIR /travelife

# Dependency
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Travelife app
COPY . .

# Install SSH server
RUN apk add --no-cache openssh-server

# Generate SSH keys
RUN ssh-keygen -A

RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN echo "root:travelife" | chpasswd

# Expose SSH port
EXPOSE 22

CMD [ "sh", "-c", "/usr/sbin/sshd && yarn start" ]