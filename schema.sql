DROP TABLE IF EXISTS saved_res;
CREATE TABLE saved_res (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(255),
  resName VARCHAR(255),
  walkTime VARCHAR(255),
  waitTime VARCHAR(255),
  totalTime VARCHAR(255),
  price VARCHAR(255),
  rating VARCHAR(255)
);


INSERT INTO saved_res (userName, resName, walkTime, waitTime, totalTime, price, rating)VALUES(
  'Matthew',
  'Subway',
  '4',
  '2',
  '10',
  '$',
  '★★★☆'
  );