FROM node

RUN npm install -g serve
COPY ./build /home/build
CMD ["serve", "-p", "80", "-s", "/home/build"]