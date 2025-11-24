FROM node

RUN npm install -g serve
COPY ./build /home/build
CMD ["serve", "-s", "/home/build"]